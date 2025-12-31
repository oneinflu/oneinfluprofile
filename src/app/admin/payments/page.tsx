"use client";

import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";

export default function AdminPaymentsPage() {
    const { token, user } = useAuth();
    const formatINR = useMemo(() => new Intl.NumberFormat("en-IN"), []);
    const [payments, setPayments] = useState<Array<{ id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; txId?: string; proofUrl?: string }>>([]);
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username) return;
                const res = await api.get<{
                    payments: Array<{ id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; txId?: string | null; proofUrl?: string | null }>;
                }>(`/users/${user.username}/payments`, { token });
                if (!alive) return;
                setPayments((res.payments || []).map((p) => ({ ...p, txId: p.txId || undefined, proofUrl: p.proofUrl || undefined })));
            } catch {}
        })();
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.username, token]);
    const totals = useMemo(() => {
        const now = new Date();
        const mon = now.getMonth();
        const yr = now.getFullYear();
        const parseAmount = (a: number) => (typeof a === "number" ? a : 0);
        const received = payments.filter((p) => p.status === "received").reduce((s, p) => s + parseAmount(p.amount), 0);
        const pending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + parseAmount(p.amount), 0);
        const month = payments
            .filter((p) => {
                // naive month check from date string (e.g., "12 Dec"); for real data, parse ISO
                try {
                    const parts = p.date.split(" ");
                    const d = new Date(`${parts[1]} ${parts[0]} ${yr}`);
                    return d.getMonth() === mon;
                } catch {
                    return false;
                }
            })
            .filter((p) => p.status === "received")
            .reduce((s, p) => s + parseAmount(p.amount), 0);
        return { received, pending, month };
    }, [payments]);
    const statusColor: Record<"received" | "pending", import("@/components/base/badges/badge-types").BadgeColors> = {
        received: "success",
        pending: "warning",
    };

    const [addOpen, setAddOpen] = useState(false);
    const [draft, setDraft] = useState<{ brand: string; service: string; amount?: number; mode: "UPI" | "Bank" | "Cash" | "Other"; txId?: string; date: string; status: "received" | "pending"; proofUrl?: string; notes?: string }>({
        brand: "",
        service: "Reel Promo",
        amount: undefined,
        mode: "UPI",
        txId: "",
        date: new Date().toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
        status: "received",
        proofUrl: undefined,
        notes: "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const offerOptions = [
        { id: "Reel Promo", label: "Instagram Reel Promotion" },
        { id: "YouTube Integration", label: "YouTube Integration" },
        { id: "Story Set", label: "Instagram Story Set" },
        { id: "Link in Bio", label: "Link in Bio" },
        { id: "Custom", label: "Custom purpose" },
    ];
    const creator = { name: "Sonia", upiIds: ["sonia@upi", "sonia@ybl"] };
    const [genOpen, setGenOpen] = useState(false);
    const [genDraft, setGenDraft] = useState<{ amount?: number; service: string; purpose: string; payer?: string; note?: string; method: "UPI"; upiId: string }>(
        { amount: undefined, service: "Reel Promo", purpose: "Instagram Reel Promotion", payer: "", note: "", method: "UPI", upiId: creator.upiIds[0] },
    );
    const [generatedLink, setGeneratedLink] = useState<string | null>(null);
    const [receiptOpen, setReceiptOpen] = useState(false);
    const [receiptItem, setReceiptItem] = useState<typeof payments[number] | null>(null);
    const [recordOpen, setRecordOpen] = useState(false);
    const [recordTargetId, setRecordTargetId] = useState<string | null>(null);
    const [recordDraft, setRecordDraft] = useState<{ amount?: number; mode: "UPI" | "Bank" | "Cash" | "Other"; txId?: string; date: string; proofUrl?: string; notes?: string }>({ amount: undefined, mode: "UPI", txId: "", date: new Date().toLocaleDateString(undefined, { day: "2-digit", month: "short" }), proofUrl: undefined, notes: "" });
    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="sticky top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Payments</h1>
                            <p className="text-md text-tertiary">Track and manage your payments</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" color="secondary" onClick={() => setGenOpen(true)}>+ Generate Payment Request</Button>
                            <Button size="sm" color="secondary" onClick={() => setAddOpen(true)}>+ Add Payment (Manual)</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">Total Received</p>
                            <p className="text-display-sm font-semibold text-primary">₹{formatINR.format(totals.received)}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">Total Pending</p>
                            <p className="text-display-sm font-semibold text-primary">₹{formatINR.format(totals.pending)}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">This Month</p>
                            <p className="text-display-sm font-semibold text-primary">₹{formatINR.format(totals.month)}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt">
                        <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wide text-secondary">
                            <div>Date</div>
                            <div>Brand / Payer</div>
                            <div>Service</div>
                            <div>Amount</div>
                            <div>Mode</div>
                            <div className="justify-self-end">Status</div>
                        </div>
                        <ul className="divide-y divide-secondary">
                            {payments.map((p) => (
                                <li key={p.id} className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] items-center gap-3 px-4 py-3">
                                    <div className="text-sm text-secondary">{p.date}</div>
                                    <div className="truncate text-md font-medium text-primary">{p.brand}</div>
                                    <div className="truncate text-sm text-tertiary">{p.service}</div>
                                    <div className="truncate text-sm text-primary">₹{formatINR.format(p.amount)}</div>
                                    <div className="truncate text-sm text-secondary">{p.mode}</div>
                                    <div className="justify-self-end flex items-center gap-2">
                                        <Badge size="sm" color={statusColor[p.status]}>{p.status === "received" ? "Received" : "Pending"}</Badge>
                                        {p.status === "received" && (
                                            <Button size="sm" color="secondary" onClick={() => { setReceiptItem(p); setReceiptOpen(true); }}>Generate Receipt</Button>
                                        )}
                                        {p.status === "pending" && (
                                            <Button size="sm" color="secondary" onClick={() => {
                                                setRecordTargetId(p.id);
                                                setRecordDraft({ amount: p.amount, mode: p.mode, txId: p.txId || "", date: p.date, proofUrl: undefined, notes: "" });
                                                setRecordOpen(true);
                                            }}>Record Payment</Button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <AddPaymentModal
                isOpen={addOpen}
                onOpenChange={setAddOpen}
                draft={draft}
                setDraft={setDraft}
                onSave={async () => {
                    if (!draft.brand.trim() || !draft.service.trim() || typeof draft.amount !== "number") return;
                    try {
                        if (!user?.username || !token) throw new Error("unauthorized");
                        const res = await api.post<{ payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; txId?: string | null } }>(
                            `/users/${user.username}/payments`,
                            {
                                brand: draft.brand.trim(),
                                service: draft.service.trim(),
                                amount: draft.amount,
                                mode: draft.mode,
                                txId: draft.txId || null,
                                date: draft.date,
                                status: draft.status,
                                notes: draft.notes || null,
                            },
                            { token },
                        );
                        const p = res.payment;
                        const next = {
                            id: p.id,
                            date: p.date,
                            brand: p.brand,
                            service: p.service,
                            amount: p.amount,
                            mode: p.mode,
                            status: p.status,
                            txId: p.txId || undefined,
                        } as typeof payments[number];
                        setPayments((prev) => [next, ...prev]);
                    } catch {} finally {
                        setAddOpen(false);
                    }
                }}
            />
            <GenerateRequestModal
                isOpen={genOpen}
                onOpenChange={(open) => {
                    setGenOpen(open);
                    if (!open) setGeneratedLink(null);
                }}
                draft={genDraft}
                setDraft={setGenDraft}
                offerOptions={offerOptions}
                creator={creator}
                generatedLink={generatedLink}
                onGenerate={async () => {
                    if (typeof genDraft.amount !== "number" || !genDraft.amount || !genDraft.purpose.trim()) return;
                    const pn = creator.name;
                    const pa = genDraft.upiId;
                    const am = genDraft.amount;
                    const tn = genDraft.purpose.trim();
                    const link = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&am=${encodeURIComponent(String(am))}&tn=${encodeURIComponent(tn)}`;
                    setGeneratedLink(link);
                    try {
                        if (!user?.username || !token) throw new Error("unauthorized");
                        const res = await api.post<{ payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending" } }>(
                            `/users/${user.username}/payments/request`,
                            {
                                amount: am,
                                purpose: tn,
                                service: genDraft.service === "Custom" ? tn : genDraft.service,
                                payer: (genDraft.payer || "").trim(),
                                method: "UPI",
                                upiId: pa,
                            },
                            { token },
                        );
                        const p = res.payment;
                        setPayments((prev) => [
                            {
                                id: p.id,
                                date: p.date,
                                brand: p.brand,
                                service: p.service,
                                amount: p.amount,
                                mode: p.mode,
                                status: p.status,
                            },
                            ...prev,
                        ]);
                    } catch {}
                }}
            />
            {receiptItem && (
                <ReceiptModal
                    isOpen={receiptOpen}
                    onOpenChange={(open) => setReceiptOpen(open)}
                    payment={receiptItem}
                    creator={creator}
                    onDownload={() => {
                        const p = receiptItem;
                        if (!p) return;
                        const html = `<!doctype html><html><head><meta charset=\"utf-8\"/><title>Payment Receipt</title><style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;color:#111}h1{font-size:20px;margin:0 0 8px}h2{font-size:14px;margin:16px 0 6px;color:#555}table{width:100%;border-collapse:collapse}td{padding:8px;border-bottom:1px solid #eee}footer{margin-top:16px;font-size:12px;color:#666}</style></head><body><h1>Payment Receipt (Non-Tax)</h1><table><tr><td>Creator</td><td>${creator.name}</td></tr><tr><td>Brand / Payer</td><td>${p.brand || ""}</td></tr><tr><td>Service</td><td>${p.service}</td></tr><tr><td>Amount</td><td>₹${formatINR.format(p.amount)}</td></tr><tr><td>Date</td><td>${p.date}</td></tr><tr><td>Payment mode</td><td>${p.mode}</td></tr>${p.txId ? `<tr><td>Transaction ID</td><td>${p.txId}</td></tr>` : ""}</table><footer>Generated by INFLU • This is a payment receipt, not a tax invoice.</footer></body></html>`;
                        const w = window.open("", "_blank");
                        if (!w) return;
                        w.document.write(html);
                        w.document.close();
                        w.focus();
                        w.print();
                    }}
                    onShare={async () => {
                        const p = receiptItem;
                        if (!p) return;
                        const text = `Payment Receipt (Non-Tax)\nCreator: ${creator.name}\nPayer: ${p.brand || ""}\nService: ${p.service}\nAmount: ₹${formatINR.format(p.amount)}\nDate: ${p.date}\nMode: ${p.mode}${p.txId ? `\nTransaction ID: ${p.txId}` : ""}`;
                        try {
                            if (navigator.share) {
                                await navigator.share({ text });
                            } else {
                                await navigator.clipboard.writeText(text);
                            }
                        } catch (_) {}
                    }}
                />
            )}
            <RecordPaymentModal
                isOpen={recordOpen}
                onOpenChange={(open) => setRecordOpen(open)}
                draft={recordDraft}
                setDraft={setRecordDraft}
                onSave={async () => {
                    if (!recordTargetId) return;
                    try {
                        if (!user?.username || !token) throw new Error("unauthorized");
                        const res = await api.patch<{ payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; txId?: string | null; proofUrl?: string | null } }>(
                            `/users/${user.username}/payments/${recordTargetId}`,
                            {
                                amount: typeof recordDraft.amount === "number" ? recordDraft.amount : undefined,
                                mode: recordDraft.mode,
                                txId: recordDraft.txId || null,
                                date: recordDraft.date,
                                status: "received",
                                proofUrl: recordDraft.proofUrl || null,
                                notes: recordDraft.notes || null,
                            },
                            { token },
                        );
                        const p = res.payment;
                        setPayments((prev) =>
                            prev.map((pv) =>
                                pv.id === recordTargetId
                                    ? {
                                          id: p.id,
                                          date: p.date,
                                          brand: p.brand,
                                          service: p.service,
                                          amount: p.amount,
                                          mode: p.mode,
                                          status: p.status,
                                          txId: p.txId || undefined,
                                          proofUrl: p.proofUrl || undefined,
                                      }
                                    : pv,
                            ),
                        );
                    } catch {} finally {
                        setRecordOpen(false);
                        setRecordTargetId(null);
                    }
                }}
            />
        </section>
    );
}

// Add Payment modal
function AddPaymentModal({ isOpen, onOpenChange, draft, setDraft, onSave }: { isOpen: boolean; onOpenChange: (open: boolean) => void; draft: {
    brand: string;
    service: string;
    amount?: number;
    mode: "UPI" | "Bank" | "Cash" | "Other";
    txId?: string;
    date: string;
    status: "received" | "pending";
    proofUrl?: string;
    notes?: string;
}; setDraft: React.Dispatch<React.SetStateAction<{ brand: string; service: string; amount?: number; mode: "UPI" | "Bank" | "Cash" | "Other"; txId?: string; date: string; status: "received" | "pending"; proofUrl?: string; notes?: string }>>; onSave: () => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <Button slot="trigger" className="hidden">Open</Button>
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full cursor-auto">
                        <AriaDialog aria-label="Add payment" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <h2 className="text-lg font-semibold text-primary">Add Payment</h2>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" color="secondary" onClick={onSave}>Save Payment</Button>
                                    <Button size="sm" onClick={() => state.close()}>Cancel</Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 px-4 py-4">
                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Payment Info</h3>
                                    <Input label="Brand / Payer name" placeholder="required" value={draft.brand} onChange={(v) => setDraft((d) => ({ ...d, brand: v }))} />
                                    <Input label="Service" placeholder="e.g. Reel Promo" value={draft.service} onChange={(v) => setDraft((d) => ({ ...d, service: v }))} />
                                    <Input label="Amount (₹)" type="number" inputMode="numeric" placeholder="required" value={typeof draft.amount === "number" ? String(draft.amount) : ""} onChange={(v) => setDraft((d) => ({ ...d, amount: v ? Number(v) : undefined }))} />
                                    <Select size="md" label="Payment mode" items={[{ id: "UPI", label: "UPI" }, { id: "Bank", label: "Bank transfer" }, { id: "Cash", label: "Cash" }, { id: "Other", label: "Other" }]} selectedKey={draft.mode} onSelectionChange={(key) => setDraft((d) => ({ ...d, mode: String(key) as any }))}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>

                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Transaction Details</h3>
                                    <Input label="Transaction ID" placeholder="optional" value={draft.txId || ""} onChange={(v) => setDraft((d) => ({ ...d, txId: v }))} />
                                    <Input label="Date of payment" placeholder="e.g. 12 Dec" value={draft.date} onChange={(v) => setDraft((d) => ({ ...d, date: v }))} />
                                    <Select size="md" label="Status" items={[{ id: "received", label: "Received" }, { id: "pending", label: "Pending" }]} selectedKey={draft.status} onSelectionChange={(key) => setDraft((d) => ({ ...d, status: String(key) as any }))}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>

                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Proof (Optional)</h3>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={() => fileInputRef.current?.click()}>Upload screenshot / PDF</Button>
                                        <input ref={fileInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setDraft((d) => ({ ...d, proofUrl: file.name }));
                                        }} />
                                    </div>
                                    <TextArea label="Notes" rows={3} value={draft.notes || ""} onChange={(v) => setDraft((d) => ({ ...d, notes: v }))} />
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

// Generate Payment Request modal
function GenerateRequestModal({ isOpen, onOpenChange, draft, setDraft, offerOptions, creator, generatedLink, onGenerate }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    draft: { amount?: number; service: string; purpose: string; payer?: string; note?: string; method: "UPI"; upiId: string };
    setDraft: React.Dispatch<React.SetStateAction<{ amount?: number; service: string; purpose: string; payer?: string; note?: string; method: "UPI"; upiId: string }>>;
    offerOptions: Array<{ id: string; label: string }>;
    creator: { name: string; upiIds: string[] };
    generatedLink: string | null;
    onGenerate: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const shareMessage = generatedLink
        ? `Payment request for ₹${draft.amount || 0} — ${draft.purpose}\n${generatedLink}`
        : "";
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <Button slot="trigger" className="hidden">Open</Button>
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full cursor-auto">
                        <AriaDialog aria-label="Generate payment request" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <h2 className="text-lg font-semibold text-primary">Generate Payment Request</h2>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" color="secondary" onClick={onGenerate}>Generate Link</Button>
                                    <Button size="sm" onClick={() => state.close()}>Close</Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 px-4 py-4">
                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Amount</h3>
                                    <Input label="Amount (₹)" type="number" inputMode="numeric" placeholder="required" value={typeof draft.amount === "number" ? String(draft.amount) : ""} onChange={(v) => setDraft((d) => ({ ...d, amount: v ? Number(v) : undefined }))} />
                                    <div className="flex flex-wrap items-center gap-2">
                                        {[1000, 5000, 10000].map((amt) => (
                                            <Button key={amt} size="sm" color="secondary" onClick={() => setDraft((d) => ({ ...d, amount: amt }))}>₹{amt.toLocaleString("en-IN")}</Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Payment For</h3>
                                    <Select size="md" label="Service" items={offerOptions} selectedKey={draft.service} onSelectionChange={(key) => {
                                        const id = String(key);
                                        const matched = offerOptions.find((o) => o.id === id);
                                        setDraft((d) => ({ ...d, service: id, purpose: id === "Custom" ? d.purpose : matched?.label || id }));
                                    }}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <Input label="Purpose" placeholder="e.g. Instagram Reel Promotion" value={draft.purpose} onChange={(v) => setDraft((d) => ({ ...d, purpose: v }))} />
                                </div>

                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Payer Details (Optional)</h3>
                                    <Input label="Brand / Payer name" placeholder="optional" value={draft.payer || ""} onChange={(v) => setDraft((d) => ({ ...d, payer: v }))} />
                                    <TextArea label="Note" rows={3} placeholder="Advance for January campaign" value={draft.note || ""} onChange={(v) => setDraft((d) => ({ ...d, note: v }))} />
                                </div>

                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Payment Method</h3>
                                    <Input label="Method" isDisabled value={draft.method} onChange={() => {}} />
                                    <Input label="UPI ID" isDisabled value={draft.upiId} onChange={() => {}} />
                                    <Select size="md" label="Change UPI ID" items={creator.upiIds.map((id) => ({ id, label: id }))} selectedKey={draft.upiId} onSelectionChange={(key) => setDraft((d) => ({ ...d, upiId: String(key) }))}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>

                                {generatedLink && (
                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">UPI Intent Link created</h3>
                                        <Input label="Link" isDisabled value={generatedLink} onChange={() => {}} />
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Button size="sm" color="secondary" onClick={() => navigator.clipboard.writeText(generatedLink)}>Copy Link</Button>
                                            <Button size="sm" color="secondary" onClick={() => {
                                                const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
                                                window.open(url, "_blank");
                                            }}>Share on WhatsApp</Button>
                                            <Button size="sm" color="secondary" onClick={async () => {
                                                try {
                                                    if (navigator.share) {
                                                        await navigator.share({ text: shareMessage });
                                                    } else {
                                                        await navigator.clipboard.writeText(shareMessage);
                                                    }
                                                } catch (_) {}
                                            }}>Share Anywhere</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

function RecordPaymentModal({ isOpen, onOpenChange, draft, setDraft, onSave }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    draft: { amount?: number; mode: "UPI" | "Bank" | "Cash" | "Other"; txId?: string; date: string; proofUrl?: string; notes?: string };
    setDraft: React.Dispatch<React.SetStateAction<{ amount?: number; mode: "UPI" | "Bank" | "Cash" | "Other"; txId?: string; date: string; proofUrl?: string; notes?: string }>>;
    onSave: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <Button slot="trigger" className="hidden">Open</Button>
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full cursor-auto">
                        <AriaDialog aria-label="Record payment" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <h2 className="text-lg font-semibold text-primary">Record Payment</h2>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" color="secondary" onClick={onSave}>Mark as Received</Button>
                                    <Button size="sm" onClick={() => state.close()}>Cancel</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 px-4 py-4">
                                <div className="flex min-w-0 flex-col gap-2">
                                    <Input label="Amount (₹)" type="number" inputMode="numeric" placeholder="required" value={typeof draft.amount === "number" ? String(draft.amount) : ""} onChange={(v) => setDraft((d) => ({ ...d, amount: v ? Number(v) : undefined }))} />
                                    <Select size="md" label="Payment mode" items={[{ id: "UPI", label: "UPI" }, { id: "Bank", label: "Bank transfer" }, { id: "Cash", label: "Cash" }, { id: "Other", label: "Other" }]} selectedKey={draft.mode} onSelectionChange={(key) => setDraft((d) => ({ ...d, mode: String(key) as any }))}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <Input label="Transaction ID" placeholder="optional" value={draft.txId || ""} onChange={(v) => setDraft((d) => ({ ...d, txId: v }))} />
                                    <Input label="Date of payment" placeholder="e.g. 12 Dec" value={draft.date} onChange={(v) => setDraft((d) => ({ ...d, date: v }))} />
                                </div>
                                <div className="flex min-w-0 flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Proof (Optional)</h3>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={() => fileInputRef.current?.click()}>Upload screenshot / PDF</Button>
                                        <input ref={fileInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setDraft((d) => ({ ...d, proofUrl: file.name }));
                                        }} />
                                    </div>
                                    <TextArea label="Notes" rows={3} value={draft.notes || ""} onChange={(v) => setDraft((d) => ({ ...d, notes: v }))} />
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

function ReceiptModal({ isOpen, onOpenChange, payment, creator, onDownload, onShare }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; txId?: string };
    creator: { name: string; upiIds: string[] };
    onDownload: () => void;
    onShare: () => void;
}) {
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <Button slot="trigger" className="hidden">Open</Button>
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full cursor-auto">
                        <AriaDialog aria-label="Payment receipt" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <h2 className="text-lg font-semibold text-primary">Payment Receipt</h2>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" color="secondary" onClick={onDownload}>Download PDF</Button>
                                    <Button size="sm" color="secondary" onClick={onShare}>Share</Button>
                                    <Button size="sm" onClick={() => state.close()}>Close</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 px-4 py-4">
                                <div className="rounded-xl ring-1 ring-secondary_alt p-4">
                                    <p className="text-sm font-medium text-primary">Payment Receipt (Non-Tax)</p>
                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-xs text-secondary">Creator</p>
                                            <p className="text-sm text-primary">{creator.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Brand / Payer</p>
                                            <p className="text-sm text-primary">{payment.brand || ""}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Service</p>
                                            <p className="text-sm text-primary">{payment.service}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Amount</p>
                                            <p className="text-sm text-primary">₹{new Intl.NumberFormat("en-IN").format(payment.amount)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Date</p>
                                            <p className="text-sm text-primary">{payment.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Payment mode</p>
                                            <p className="text-sm text-primary">{payment.mode}</p>
                                        </div>
                                        {payment.txId && (
                                            <div className="col-span-2">
                                                <p className="text-xs text-secondary">Transaction ID</p>
                                                <p className="text-sm text-primary">{payment.txId}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

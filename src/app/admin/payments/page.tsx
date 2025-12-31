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
    const { token, user, getMe } = useAuth();
    const [loading, setLoading] = useState(true);
    const formatINR = useMemo(() => new Intl.NumberFormat("en-IN"), []);
    const [payments, setPayments] = useState<Array<{ id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; txId?: string; proofUrl?: string; url?: string }>>([]);
    const [offers, setOffers] = useState<Array<{ id: string; title: string }>>([]);
    const [creatorName, setCreatorName] = useState<string>("Creator");
    const [upiId, setUpiId] = useState<string>("");
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username) return;
                const res = await api.get<{ success: boolean; status: string; data: { payments: Array<any> } }>(`/users/${user.username}/payments`, { token });
                if (!alive) return;
                const origin = typeof window !== "undefined" ? window.location.origin : "";
                const mapped = (res.data?.payments || []).map((p: any) => ({
                    id: String(p.paymentId),
                    date: new Date(p.createdAt).toLocaleDateString(),
                    brand: String(p.brand || "—"),
                    service: String(p.purpose || "—"),
                    amount: Number(p.amount || 0),
                    mode: "UPI" as "UPI",
                    status: (p.status === "paid" ? "received" : "pending") as "received" | "pending",
                    url: `${origin}/pay/${String(p.paymentId)}`,
                }));
                setPayments(mapped);
                const offersRes = await api.get<{ success: boolean; status: string; data: { offers: Array<any> } }>(`/users/${user.username}/offers`, { token });
                const offerMapped = (offersRes.data?.offers || []).map((o: any) => ({ id: String(o._id), title: o.title }));
                setOffers(offerMapped);
                try {
                    const me = await getMe();
                    if (!alive) return;
                    setCreatorName(me.name || user.username);
                    setUpiId(me.upi || "");
                } catch {}
            } catch {}
            finally {
                setLoading(false);
            }
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
    const offerOptions = offers.map((o) => ({ id: o.id, label: o.title })) ?? [
        { id: "Custom", label: "Custom purpose" },
    ];
    const creator = { name: creatorName, upiIds: [upiId || ""] };
    const [genOpen, setGenOpen] = useState(false);
    const [genDraft, setGenDraft] = useState<{ amount?: number; service: string; purpose: string; payer?: string; note?: string; method: "UPI"; upiId: string }>(
        { amount: undefined, service: "Reel Promo", purpose: "Instagram Reel Promotion", payer: "", note: "", method: "UPI", upiId: creator.upiIds[0] },
    );
    const [generatedLink, setGeneratedLink] = useState<string | null>(null);
    const [genSuccessOpen, setGenSuccessOpen] = useState(false);
    const [genSuccessDetails, setGenSuccessDetails] = useState<{ amount: number; purpose: string; payer?: string } | null>(null);
    const [receiptOpen, setReceiptOpen] = useState(false);
    const [receiptItem, setReceiptItem] = useState<typeof payments[number] | null>(null);
    const [recordOpen, setRecordOpen] = useState(false);
    const [recordTargetId, setRecordTargetId] = useState<string | null>(null);
    const [recordDraft, setRecordDraft] = useState<{ amount?: number; mode: "UPI" | "Bank" | "Cash" | "Other"; txId?: string; date: string; proofUrl?: string; notes?: string }>({ amount: undefined, mode: "UPI", txId: "", date: new Date().toLocaleDateString(undefined, { day: "2-digit", month: "short" }), proofUrl: undefined, notes: "" });
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [detailsItem, setDetailsItem] = useState<typeof payments[number] | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const noticeTimerRef = useRef<number | null>(null);
    const notify = (msg: string) => {
        if (noticeTimerRef.current) {
            window.clearTimeout(noticeTimerRef.current);
            noticeTimerRef.current = null;
        }
        setNotice(msg);
        noticeTimerRef.current = window.setTimeout(() => {
            setNotice(null);
            noticeTimerRef.current = null;
        }, 2000);
    };
    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className=" top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex min-w-0 flex-col gap-1">
                            <h1 className="text-lg md:text-display-sm font-semibold text-primary md:truncate">Payments</h1>
                            <p className="text-sm md:text-md text-tertiary md:truncate">Track and manage your payments</p>
                        </div>
                        <div className="mt-3 md:mt-0 grid grid-cols-1 gap-2 md:flex md:items-center md:gap-2 md:shrink-0">
                            <Button className="w-full md:w-auto flex-none" size="sm" color="secondary" onClick={() => setGenOpen(true)}>+ Generate Payment Request</Button>
                            <Button className="w-full md:w-auto flex-none" size="sm" color="secondary" onClick={() => setAddOpen(true)}>+ Add Payment (Manual)</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl">
                        {loading ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                                    {[0,1,2].map((i) => (
                                        <div key={i} className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                            <div className="h-3 w-24 bg-primary_hover animate-pulse rounded" />
                                            <div className="mt-3 h-6 w-32 bg-primary_hover animate-pulse rounded" />
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt hidden md:block">
                                    <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] gap-3 px-4 py-2">
                                        {[0,1,2,3,4,5].map((i) => (
                                            <div key={i} className="h-3 bg-primary_hover animate-pulse rounded" />
                                        ))}
                                    </div>
                                    <ul className="divide-y divide-secondary">
                                        {[...Array(6)].map((_, idx) => (
                                            <li key={idx} className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] gap-3 px-4 py-3">
                                                <div className="h-4 bg-primary_hover animate-pulse rounded" />
                                                <div className="h-4 bg-primary_hover animate-pulse rounded" />
                                                <div className="h-4 bg-primary_hover animate-pulse rounded" />
                                                <div className="h-4 bg-primary_hover animate-pulse rounded" />
                                                <div className="h-4 bg-primary_hover animate-pulse rounded" />
                                                <div className="h-6 w-20 bg-primary_hover animate-pulse rounded justify-self-end" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="md:hidden">
                                    <ul className="flex flex-col gap-3">
                                        {[...Array(6)].map((_, idx) => (
                                            <li key={idx} className="rounded-2xl bg-primary px-4 py-4 shadow-xs ring-1 ring-secondary_alt">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <div className="h-3 w-20 bg-primary_hover animate-pulse rounded" />
                                                        <div className="mt-2 h-4 w-40 bg-primary_hover animate-pulse rounded" />
                                                        <div className="mt-1 h-3 w-32 bg-primary_hover animate-pulse rounded" />
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                                        <div className="h-4 w-24 bg-primary_hover animate-pulse rounded" />
                                                        <div className="h-5 w-16 bg-primary_hover animate-pulse rounded" />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
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
                                <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt hidden md:block">
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
                                            <li
                                                key={p.id}
                                                className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] items-center gap-3 px-4 py-3 hover:bg-primary_hover cursor-pointer"
                                                onClick={() => {
                                                    setDetailsItem(p);
                                                    setDetailsOpen(true);
                                                }}
                                            >
                                                <div className="text-sm text-secondary">{p.date}</div>
                                                <div className="truncate text-md font-medium text-primary">{p.brand}</div>
                                                <div className="truncate text-sm text-tertiary">{p.service}</div>
                                                <div className="truncate text-sm text-primary">₹{formatINR.format(p.amount)}</div>
                                                <div className="truncate text-sm text-tertiary">{p.mode}</div>
                                                <div className="justify-self-end flex items-center gap-2">
                                                    <Badge size="sm" color={statusColor[p.status]}>{p.status === "received" ? "Received" : "Pending"}</Badge>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="md:hidden">
                                    <ul className="flex flex-col gap-3">
                                        {payments.map((p) => (
                                            <li
                                                key={p.id}
                                                className="rounded-2xl bg-primary px-4 py-4 shadow-xs ring-1 ring-secondary_alt active:scale-[0.99]"
                                                onClick={() => {
                                                    setDetailsItem(p);
                                                    setDetailsOpen(true);
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="text-sm text-secondary">{p.date}</p>
                                                        <p className="truncate text-md font-semibold text-primary">{p.brand}</p>
                                                        <p className="truncate text-sm text-tertiary">{p.service}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                                        <p className="text-sm font-medium text-primary">₹{formatINR.format(p.amount)}</p>
                                                        <Badge size="sm" color={statusColor[p.status]}>{p.status === "received" ? "Received" : "Pending"}</Badge>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <p className="text-xs text-secondary">{p.mode}</p>
                                                    <p className="text-xs text-secondary">Tap to view</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
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
                notify={notify}
                onGenerate={async () => {
                    if (typeof genDraft.amount !== "number" || !genDraft.amount || !genDraft.purpose.trim()) return;
                    try {
                        if (!user?.username || !token) throw new Error("unauthorized");
                        const res = await api.post<{ success: boolean; status: string; data: { payment: { id: string; amount: number; currency: string; offerId: string; userId: string; brand?: string; notes?: string; purpose?: string; status: string; url: string } } }>(
                            `/users/${user.username}/payments`,
                            {
                                amount: genDraft.amount,
                                offerId: genDraft.service,
                                brand: (genDraft.payer || "").trim(),
                                notes: (genDraft.note || "").trim(),
                                purpose: genDraft.purpose.trim(),
                            },
                            { token },
                        );
                        const pay = res.data.payment;
                        setGeneratedLink(pay.url);
                        setPayments((prev) => [
                            {
                                id: pay.id,
                                date: new Date().toLocaleDateString(),
                                brand: pay.brand || "—",
                                service: pay.purpose || "—",
                                amount: pay.amount,
                                mode: "UPI",
                                status: pay.status === "paid" ? "received" : "pending",
                                url: pay.url,
                            },
                            ...prev,
                        ]);
                        setGenSuccessDetails({ amount: pay.amount, purpose: genDraft.purpose, payer: genDraft.payer });
                        setGenSuccessOpen(true);
                        setGenOpen(false);
                    } catch {}
                }}
            />
            <GenerationSuccessModal
                isOpen={genSuccessOpen}
                onOpenChange={(open) => setGenSuccessOpen(open)}
                details={genSuccessDetails}
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
                                await navigator.share({ title: "Payment Receipt", text });
                                notify("Share sheet opened");
                            } else {
                                await navigator.clipboard.writeText(text);
                                notify("Text copied");
                            }
                        } catch (_) {
                            notify("Sharing failed");
                        }
                    }}
                />
            )}
            <PaymentDetailsModal
                isOpen={detailsOpen}
                onOpenChange={(open) => setDetailsOpen(open)}
                payment={detailsItem}
                notify={notify}
                onRecord={(pay) => {
                    if (!pay) return;
                    setRecordTargetId(pay.id);
                    setRecordDraft((d) => ({ ...d, amount: pay.amount }));
                    setRecordOpen(true);
                }}
                onViewReceipt={(pay) => {
                    if (!pay) return;
                    setReceiptItem(pay);
                    setReceiptOpen(true);
                }}
            />
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
            {notice && (
                <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-full bg-primary px-4 py-2 shadow-xs ring-1 ring-secondary_alt">
                    <span className="text-sm font-medium text-primary">{notice}</span>
                </div>
            )}
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
            <span slot="trigger" />
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
function GenerateRequestModal({ isOpen, onOpenChange, draft, setDraft, offerOptions, creator, generatedLink, notify, onGenerate }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    draft: { amount?: number; service: string; purpose: string; payer?: string; note?: string; method: "UPI"; upiId: string };
    setDraft: React.Dispatch<React.SetStateAction<{ amount?: number; service: string; purpose: string; payer?: string; note?: string; method: "UPI"; upiId: string }>>;
    offerOptions: Array<{ id: string; label: string }>;
    creator: { name: string; upiIds: string[] };
    generatedLink: string | null;
    notify: (msg: string) => void;
    onGenerate: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <span slot="trigger" />
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
                                    <Input label="UPI ID" isDisabled value={creator.upiIds[0]} onChange={() => {}} />
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

function PaymentDetailsModal({ isOpen, onOpenChange, payment, notify, onRecord, onViewReceipt }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; url?: string } | null;
    notify: (msg: string) => void;
    onRecord: (payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; url?: string } | null) => void;
    onViewReceipt: (payment: { id: string; date: string; brand: string; service: string; amount: number; mode: "UPI" | "Bank" | "Cash" | "Other"; status: "received" | "pending"; url?: string } | null) => void;
}) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const link = payment ? `${origin}/pay/${payment.id}` : "";
    const shareText = payment ? `Payment request for ₹${payment.amount.toLocaleString("en-IN")} — ${payment.service}` : "";
    const tryCopy = async (text: string) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch {}
        try {
            // ClipboardItem path
            const BlobCtor = (window as any).Blob || Blob;
            if (navigator.clipboard && (navigator.clipboard as any).write && BlobCtor) {
                const item = new (window as any).ClipboardItem({ "text/plain": new BlobCtor([text], { type: "text/plain" }) });
                await (navigator.clipboard as any).write([item]);
                return true;
            }
        } catch {}
        try {
            const el = document.createElement("textarea");
            el.value = text;
            el.setAttribute("readonly", "");
            el.style.position = "fixed";
            el.style.top = "0";
            el.style.left = "0";
            el.style.width = "1px";
            el.style.height = "1px";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            document.body.appendChild(el);
            el.focus();
            el.select();
            el.setSelectionRange(0, el.value.length);
            const ok = document.execCommand("copy");
            document.body.removeChild(el);
            if (ok) return true;
        } catch {}
        return false;
    };
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <span slot="trigger" />
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full cursor-auto">
                        <AriaDialog aria-label="Payment details" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <h2 className="text-lg font-semibold text-primary">Payment Details</h2>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" onClick={() => state.close()}>Close</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 px-4 py-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-secondary">Brand / Payer</p>
                                        <p className="text-sm text-primary">{payment?.brand || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Service</p>
                                        <p className="text-sm text-primary">{payment?.service || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Amount</p>
                                        <p className="text-sm text-primary">₹{payment ? payment.amount.toLocaleString("en-IN") : "0"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Mode</p>
                                        <p className="text-sm text-primary">{payment?.mode || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Status</p>
                                        <p className="text-sm text-primary">{payment ? (payment.status === "received" ? "Received" : "Pending") : ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Date</p>
                                        <p className="text-sm text-primary">{payment?.date || ""}</p>
                                    </div>
                                </div>
                                <Input label="Generated Link" isDisabled value={link} onChange={() => {}} />
                                <div className="flex flex-wrap items-center gap-2">
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        isDisabled={!payment}
                                        onClick={() => {
                                            const message = `${shareText}\n${link}`;
                                            console.log(message);
                                            tryCopy(message).then((ok) => {
                                                if (ok) {
                                                    notify("Text copied");
                                                } else {
                                                    try {
                                                        const _ = window.prompt("Copy text", message);
                                                        notify("Text ready to copy");
                                                    } catch {
                                                        notify("Copy failed");
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        Copy Link
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        isDisabled={!payment}
                                        onClick={() => {
                                            const wa = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${link}`)}`;
                                            window.open(wa, "_blank");
                                        }}
                                    >
                                        Share on WhatsApp
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        isDisabled={!payment}
                                        onClick={async () => {
                                            try {
                                                if (navigator.share) {
                                                    await navigator.share({ title: "Payment Request", text: shareText, url: link });
                                                    notify("Share sheet opened");
                                                } else {
                                                    await navigator.clipboard.writeText(`${shareText}\n${link}`);
                                                    notify("Link copied");
                                                }
                                            } catch {
                                                notify("Sharing failed");
                                            }
                                        }}
                                    >
                                        Share Anywhere
                                    </Button>
                                </div>
                                <div className="flex min-w-0 flex-col gap-3">
                                    <h3 className="text-md font-semibold text-primary">Actions</h3>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button size="sm" color="secondary" isDisabled={!payment} onClick={() => onRecord(payment)}>Record as Received</Button>
                                        <Button size="sm" color="secondary" isDisabled={!payment} onClick={() => onViewReceipt(payment)}>View Receipt</Button>
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
            <span slot="trigger" />
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
            <span slot="trigger" />
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

function GenerationSuccessModal({ isOpen, onOpenChange, details }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    details: { amount: number; purpose: string; payer?: string } | null;
}) {
    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <span slot="trigger" />
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full h-dvh cursor-auto grid place-items-center">
                        <AriaDialog aria-label="New Payment Link Generated" className="w-[min(92vw,520px)] overflow-hidden rounded-2xl bg-primary shadow-2xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="border-b border-secondary px-5 py-4">
                                <h2 className="text-lg font-semibold text-primary text-center">New Payment Link Generated</h2>
                            </div>
                            <div className="px-5 py-5">
                                {details ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-secondary">Amount</p>
                                                <p className="text-sm text-primary">₹{new Intl.NumberFormat("en-IN").format(details.amount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-secondary">Purpose</p>
                                                <p className="text-sm text-primary">{details.purpose}</p>
                                            </div>
                                        </div>
                                        {details.payer ? (
                                            <div>
                                                <p className="text-xs text-secondary">Payer</p>
                                                <p className="text-sm text-primary">{details.payer}</p>
                                            </div>
                                        ) : null}
                                        <p className="text-xs text-secondary mt-2">The table has been updated. You can share the link from the payment’s details pane.</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-primary text-center">The payment has been created.</p>
                                )}
                                <div className="mt-5 flex justify-center">
                                    <Button size="sm" onClick={() => state.close()}>Close</Button>
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

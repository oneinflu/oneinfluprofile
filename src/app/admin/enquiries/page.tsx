"use client";

import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { useMemo, useState } from "react";

export default function AdminEnquiriesPage() {
    const [statusFilter, setStatusFilter] = useState<"all" | "new" | "replied" | "accepted" | "closed">("all");
    const [search, setSearch] = useState("");
    const [enquiries, setEnquiries] = useState<Array<{ id: string; brand: string; service: string; budget?: number; date: string; status: "new" | "replied" | "accepted" | "closed"; contactName?: string; email?: string; whatsapp?: string; instagram?: string; message?: string; deadline?: string; manual?: boolean; thread?: Array<{ sender: "brand" | "you"; text: string; time: string }> }>>([
        { id: "enq-1", brand: "BrandX", service: "Reel Promotion", budget: 8000, date: "Today", status: "new", contactName: "A. Manager", email: "brandx@example.com", whatsapp: "+91 90000 00000", message: "We want a launch reel next week.", deadline: "Dec 28", thread: [{ sender: "brand", text: "Hi, can you do a launch reel?", time: "10:02" }], manual: false },
        { id: "enq-2", brand: "Acme", service: "YouTube Integration", budget: 15000, date: "Yesterday", status: "replied", contactName: "C. Lead", email: "team@acme.com", message: "Integration in mid-roll.", thread: [{ sender: "you", text: "Sure, sharing details.", time: "14:20" }], manual: false },
        { id: "enq-3", brand: "Nova", service: "Story Set", date: "Dec 18", status: "accepted", contactName: "N. Ops", email: "ops@nova.com", message: "Stories for holiday.", deadline: "Dec 24", manual: false },
        { id: "enq-4", brand: "Orbit", service: "Link in Bio", budget: 3000, date: "Dec 10", status: "closed", contactName: "O. Marketer", email: "contact@orbit.com", manual: false },
    ]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailIndex, setDetailIndex] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [addDraft, setAddDraft] = useState<{ brand: string; contactName?: string; channel: "whatsapp" | "email" | "instagram"; contactDetail?: string; service: string; budget?: number; deadline?: string; notes?: string; status: "accepted" | "replied" | "new" | "closed"; manual: boolean }>({
        brand: "",
        contactName: "",
        channel: "whatsapp",
        contactDetail: "",
        service: "Reel Promotion",
        budget: undefined,
        deadline: "",
        notes: "",
        status: "accepted",
        manual: true,
    });
    const offerOptions = [
        { id: "Reel Promotion", label: "Reel Promotion" },
        { id: "YouTube Integration", label: "YouTube Integration" },
        { id: "Story Set", label: "Story Set" },
        { id: "Link in Bio", label: "Link in Bio" },
    ];

    const formatINR = useMemo(() => new Intl.NumberFormat("en-IN"), []);
    const statusColor: Record<"new" | "replied" | "accepted" | "closed", import("@/components/base/badges/badge-types").BadgeColors> = {
        new: "brand",
        replied: "blue",
        accepted: "success",
        closed: "gray",
    };

    const filtered = enquiries.filter((e) => (statusFilter === "all" || e.status === statusFilter) && (!search || e.brand.toLowerCase().includes(search.toLowerCase())));

    const openDetail = (index: number) => {
        setDetailIndex(index);
        setDetailOpen(true);
    };

    const metrics = useMemo(() => {
        const total = enquiries.length;
        const deals = enquiries.filter((e) => e.status === "accepted").length;
        const revenue = enquiries.reduce((sum, e) => (e.status === "accepted" && typeof e.budget === "number" ? sum + e.budget : sum), 0);
        return { views: 0, enquiries: total, deals, revenue };
    }, [enquiries]);

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="sticky top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Enquiries</h1>
                            <p className="text-md text-tertiary">Requests from brands</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select
                                size="sm"
                                placeholder="Filter (Status)"
                                items={[
                                    { id: "all", label: "All" },
                                    { id: "new", label: "New" },
                                    { id: "replied", label: "Replied" },
                                    { id: "accepted", label: "Accepted" },
                                    { id: "closed", label: "Closed" },
                                ]}
                                selectedKey={statusFilter}
                                onSelectionChange={(key) => setStatusFilter(String(key) as any)}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                            <Input size="sm" placeholder="Search (Brand name)" value={search} onChange={(v) => setSearch(v)} />
                            <Button size="sm" color="secondary" onClick={() => setAddOpen(true)}>+ Add Enquiry</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">👁 Profile Views</p>
                            <p className="text-display-sm font-semibold text-primary">{formatINR.format(metrics.views)}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">📩 Enquiries Received</p>
                            <p className="text-display-sm font-semibold text-primary">{formatINR.format(metrics.enquiries)}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">🤝 Deals Closed</p>
                            <p className="text-display-sm font-semibold text-primary">{formatINR.format(metrics.deals)}</p>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <p className="text-xs font-medium uppercase tracking-wide text-secondary">💰 Revenue Earned</p>
                            <p className="text-display-sm font-semibold text-primary">₹{formatINR.format(metrics.revenue)}</p>
                        </div>
                    </div>
                    {filtered.length === 0 ? (
                        <div className="rounded-2xl bg-primary p-6 shadow-xs ring-1 ring-secondary_alt">
                            <div className="mx-auto max-w-md text-center">
                                <h3 className="text-md font-semibold text-primary">No enquiries yet</h3>
                                <p className="mt-1 text-sm text-tertiary">Share your INFLU profile to receive brand requests.</p>
                                <div className="mt-4">
                                    <Button size="sm" color="secondary" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/username`)}>Copy profile link</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt">
                            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wide text-secondary">
                                <div>Brand</div>
                                <div>Requested service</div>
                                <div>Budget</div>
                                <div>Date</div>
                                <div className="justify-self-end">Status</div>
                            </div>
                            <ul className="divide-y divide-secondary">
                                {filtered.map((e, i) => (
                                    <li
                                        key={e.id}
                                        className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-3 px-4 py-3 hover:bg-primary_hover cursor-pointer"
                                        onClick={() => openDetail(i)}
                                    >
                                        <div className="truncate text-md font-medium text-primary">{e.brand}</div>
                                        <div className="truncate text-sm text-tertiary">{e.service}</div>
                                        <div className="truncate text-sm text-primary">{typeof e.budget === "number" ? `₹${formatINR.format(e.budget)}` : "—"}</div>
                                        <div className="truncate text-sm text-secondary">{e.date}</div>
                                        <div className="justify-self-end flex items-center gap-2">
                                            <Badge size="sm" color={statusColor[e.status]}>{e.status === "new" ? "New" : e.status === "replied" ? "Replied" : e.status === "accepted" ? "Accepted" : "Closed"}</Badge>
                                            {e.manual && <span className="text-xs">📝</span>}
                                        </div>
                
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <AriaDialogTrigger isOpen={detailOpen} onOpenChange={setDetailOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog aria-label="Enquiry details" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <h2 className="text-lg font-semibold text-primary">Enquiry details</h2>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" onClick={() => state.close()}>Close</Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 px-4 py-4">
                                    {detailIndex !== null && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <p className="text-md font-semibold text-primary">{filtered[detailIndex].brand}</p>
                                                <Badge size="sm" color={statusColor[filtered[detailIndex].status]}>{filtered[detailIndex].status}</Badge>
                                            </div>

                                            <div className="flex min-w-0 flex-col gap-2">
                                                <h3 className="text-md font-semibold text-primary">Brand Details</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-secondary">Brand contact name</p>
                                                        <p className="text-sm text-primary">{filtered[detailIndex].contactName || "—"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-secondary">Email / WhatsApp</p>
                                                        <p className="text-sm text-primary">{filtered[detailIndex].email || filtered[detailIndex].whatsapp || "—"}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex min-w-0 flex-col gap-2">
                                                <h3 className="text-md font-semibold text-primary">Request Summary</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-secondary">Selected service</p>
                                                        <p className="text-sm text-primary">{filtered[detailIndex].service}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-secondary">Budget</p>
                                                        <p className="text-sm text-primary">{typeof filtered[detailIndex].budget === "number" ? `₹${formatINR.format(filtered[detailIndex].budget)}` : "—"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-secondary">Deadline</p>
                                                        <p className="text-sm text-primary">{filtered[detailIndex].deadline || ""}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-xs text-secondary">Message from brand</p>
                                                        <p className="text-sm text-primary">{filtered[detailIndex].message || ""}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex min-w-0 flex-col gap-3">
                                                <h3 className="text-md font-semibold text-primary">Actions</h3>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Button size="sm" color="secondary" onClick={() => setReplyText(`Hi ${filtered[detailIndex].contactName || ""}, `)}>Reply</Button>
                                                    <Button size="sm" color="secondary">Send Offer</Button>
                                                    <Button size="sm" color="secondary" onClick={() => {
                                                        const id = filtered[detailIndex].id;
                                                        setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: "accepted" } : x)));
                                                    }}>Accept</Button>
                                                    <Button size="sm" onClick={() => {
                                                        const id = filtered[detailIndex].id;
                                                        setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: "closed" } : x)));
                                                    }}>Close</Button>
                                                </div>
                                            </div>

                                            <div className="flex min-w-0 flex-col gap-2">
                                                <h3 className="text-md font-semibold text-primary">Conversation</h3>
                                                <div className="flex flex-col gap-2">
                                                    {(filtered[detailIndex].thread || []).map((m, idx) => (
                                                        <div key={idx} className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.sender === "you" ? "self-end bg-secondary text-primary" : "self-start bg-tertiary/20 text-primary"}`}>
                                                            <p>{m.text}</p>
                                                            <p className="mt-1 text-xs text-secondary">{m.time}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Input className="flex-1" placeholder="Type a reply" value={replyText} onChange={(v) => setReplyText(v)} />
                                                    <Button size="sm" color="secondary" onClick={() => {
                                                        if (!replyText.trim()) return;
                                                        const id = filtered[detailIndex].id;
                                                        setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: x.status === "new" ? "replied" : x.status, thread: [...(x.thread || []), { sender: "you", text: replyText.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] } : x)));
                                                        setReplyText("");
                                                    }}>Send</Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>
            <AriaDialogTrigger isOpen={addOpen} onOpenChange={setAddOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog aria-label="Add enquiry" className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <h2 className="text-lg font-semibold text-primary">Add Enquiry</h2>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={() => {
                                            if (!addDraft.brand.trim()) return;
                                            const next = {
                                                id: `enq-${Date.now()}`,
                                                brand: addDraft.brand.trim(),
                                                service: addDraft.service,
                                                budget: typeof addDraft.budget === "number" ? addDraft.budget : undefined,
                                                date: "Today",
                                                status: addDraft.status,
                                                contactName: addDraft.contactName || "",
                                                email: addDraft.channel === "email" ? addDraft.contactDetail : undefined,
                                                whatsapp: addDraft.channel === "whatsapp" ? addDraft.contactDetail : undefined,
                                                instagram: addDraft.channel === "instagram" ? addDraft.contactDetail : undefined,
                                                message: addDraft.notes || "",
                                                deadline: addDraft.deadline || "",
                                                manual: addDraft.manual,
                                            } as typeof enquiries[number];
                                            setEnquiries((prev) => [next, ...prev]);
                                            state.close();
                                        }}>Save Enquiry</Button>
                                        <Button size="sm" onClick={() => state.close()}>Cancel</Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 px-4 py-4">
                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Brand Info</h3>
                                        <Input label="Brand name" placeholder="required" value={addDraft.brand} onChange={(v) => setAddDraft((d) => ({ ...d, brand: v }))} />
                                        <Input label="Contact name" placeholder="optional" value={addDraft.contactName || ""} onChange={(v) => setAddDraft((d) => ({ ...d, contactName: v }))} />
                                        <Select
                                            size="md"
                                            label="Contact channel"
                                            items={[{ id: "whatsapp", label: "WhatsApp" }, { id: "email", label: "Email" }, { id: "instagram", label: "Instagram" }]}
                                            selectedKey={addDraft.channel}
                                            onSelectionChange={(key) => setAddDraft((d) => ({ ...d, channel: String(key) as any }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Input label="Contact detail" placeholder="e.g. +91…, email@, @handle" value={addDraft.contactDetail || ""} onChange={(v) => setAddDraft((d) => ({ ...d, contactDetail: v }))} />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Service Info</h3>
                                        <Select size="md" label="Service" items={offerOptions} selectedKey={addDraft.service} onSelectionChange={(key) => setAddDraft((d) => ({ ...d, service: String(key) }))}>
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Input label="Budget (₹)" type="number" inputMode="numeric" placeholder="optional" value={typeof addDraft.budget === "number" ? String(addDraft.budget) : ""} onChange={(v) => setAddDraft((d) => ({ ...d, budget: v ? Number(v) : undefined }))} />
                                        <Input label="Deadline" placeholder="optional" value={addDraft.deadline || ""} onChange={(v) => setAddDraft((d) => ({ ...d, deadline: v }))} />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Notes</h3>
                                        <Input label="Message / notes" placeholder="e.g. Came from Instagram DM" value={addDraft.notes || ""} onChange={(v) => setAddDraft((d) => ({ ...d, notes: v }))} />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Status</h3>
                                        <Select size="md" label="Default status" items={[{ id: "accepted", label: "Accepted" }, { id: "replied", label: "Replied" }, { id: "new", label: "New" }, { id: "closed", label: "Closed" }]} selectedKey={addDraft.status} onSelectionChange={(key) => setAddDraft((d) => ({ ...d, status: String(key) as any }))}>
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <div className="mt-1">
                                            <Checkbox isSelected={addDraft.manual} onChange={(s) => setAddDraft((d) => ({ ...d, manual: s }))}>Mark as manual enquiry</Checkbox>
                                        </div>
                                    </div>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>
        </section>
    );
}

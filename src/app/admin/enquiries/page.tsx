"use client";

import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

export default function AdminEnquiriesPage() {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<"all" | "new" | "replied" | "accepted" | "closed">("all");
    const [search, setSearch] = useState("");
    const [enquiries, setEnquiries] = useState<Array<{ id: string; brand: string; service: string; budget?: number; date: string; status: "new" | "replied" | "accepted" | "closed"; contactName?: string; email?: string; whatsapp?: string; instagram?: string; message?: string; deadline?: string; manual?: boolean; thread?: Array<{ sender: "brand" | "you"; text: string; time: string }> }>>([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailIndex, setDetailIndex] = useState<number | null>(null);
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
    const [copiedToast, setCopiedToast] = useState<string | null>(null);
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

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token) return;
                const res = await api.get<{ success: boolean; status: string; data: { requests: Array<any> } }>(`/users/${user.username}/enquiries`, { token });
                if (!alive) return;
                const mapped = (res.data?.requests || []).map((r: any) => ({
                    id: String(r._id),
                    brand: r.name || r.email || r.whatsapp || "—",
                    service: r.offer?.title || "—",
                    budget: typeof r.budget === "number" ? r.budget : undefined,
                    date: new Date(r.createdAt).toLocaleDateString(),
                    status: r.status || "new",
                    contactName: r.name || "",
                    email: r.email || undefined,
                    whatsapp: r.whatsapp || undefined,
                    instagram: undefined,
                    message: r.description || "",
                    deadline: "",
                    manual: false,
                    thread: [],
                }));
                setEnquiries(mapped);
            } catch {}
            finally {
                setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [user?.username, token]);

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
            <div className=" top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Enquiries</h1>
                            <p className="text-md text-tertiary">Requests from brands</p>
                        </div>
                        <div className="mt-3 md:mt-0 grid grid-cols-1 gap-2 md:flex md:items-center md:gap-2">
                            <div className="w-full md:w-56 shrink-0">
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
                            </div>
                            <div className="w-full md:w-64">
                                <Input size="sm" placeholder="Search (Brand name)" value={search} onChange={(v) => setSearch(v)} />
                            </div>
                            {copiedToast && (
                                <span className="text-xs font-medium text-secondary">Copied!</span>
                            )}
                            <Button className="w-full md:w-auto" size="sm" color="secondary" onClick={() => setAddOpen(true)}>+ Add Enquiry</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl">
                    {loading ? (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                {[0,1,2,3].map((i) => (
                                    <div key={i} className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                        <div className="h-3 w-24 bg-primary_hover animate-pulse rounded" />
                                        <div className="mt-3 h-6 w-32 bg-primary_hover animate-pulse rounded" />
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt hidden md:block">
                                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-3 px-4 py-2">
                                    {[0,1,2,3,4].map((i) => (
                                        <div key={i} className="h-3 bg-primary_hover animate-pulse rounded" />
                                    ))}
                                </div>
                                <ul className="divide-y divide-secondary">
                                    {[...Array(6)].map((_, idx) => (
                                        <li key={idx} className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-3 px-4 py-3">
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
                        </div>
                    ) : (
                        <div>
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
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={() => {
                                            const origin = typeof window !== "undefined" ? window.location.origin : "";
                                            const uname = user?.username ? String(user.username) : "username";
                                            const link = `${origin}/${uname}`;
                                            const copy = async () => {
                                                try {
                                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                                        await navigator.clipboard.writeText(link);
                                                        return true;
                                                    }
                                                } catch {}
                                                try {
                                                    const el = document.createElement("textarea");
                                                    el.value = link;
                                                    el.setAttribute("readonly", "");
                                                    el.style.position = "absolute";
                                                    el.style.left = "-9999px";
                                                    document.body.appendChild(el);
                                                    el.select();
                                                    document.execCommand("copy");
                                                    document.body.removeChild(el);
                                                    return true;
                                                } catch {}
                                                return false;
                                            };
                                            copy().finally(() => {
                                                setCopiedToast("Copied profile link");
                                                setTimeout(() => setCopiedToast(null), 2000);
                                            });
                                        }}
                                    >
                                        Copy profile link
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt hidden md:block">
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
                            <div className="md:hidden">
                                <ul className="flex flex-col gap-3">
                                    {filtered.map((e, i) => (
                                        <li
                                            key={e.id}
                                            className="rounded-2xl bg-primary px-4 py-4 shadow-xs ring-1 ring-secondary_alt active:scale-[0.99]"
                                            onClick={() => openDetail(i)}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm text-secondary">{e.date}</p>
                                                    <p className="truncate text-md font-semibold text-primary">{e.brand}</p>
                                                    <p className="truncate text-sm text-tertiary">{e.service}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 shrink-0">
                                                    <p className="text-sm font-medium text-primary">{typeof e.budget === "number" ? `₹${formatINR.format(e.budget)}` : "—"}</p>
                                                    <Badge size="sm" color={statusColor[e.status]}>
                                                        {e.status === "new" ? "New" : e.status === "replied" ? "Replied" : e.status === "accepted" ? "Accepted" : "Closed"}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between">
                                                <p className="text-xs text-secondary">{e.manual ? "Manual" : "Auto"}</p>
                                                <p className="text-xs text-secondary">Tap to view</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </>
                        )}
                        </div>
                    )}
                </div>
            </div>
            {copiedToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[min(92vw,640px)] rounded-2xl bg-secondary px-6 py-4 text-lg font-semibold text-primary shadow-2xl ring-1 ring-secondary_alt">
                    {copiedToast}
                </div>
            )}
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
                                                    <Button size="sm" color="secondary" onClick={async () => {
                                                        try {
                                                            if (!user?.username || detailIndex === null) return;
                                                            const id = filtered[detailIndex].id;
                                                            await api.patch(`/users/${user.username}/enquiries/${id}`, { status: "accepted" }, { token });
                                                            setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: "accepted" } : x)));
                                                        } catch {}
                                                    }}>Accept</Button>
                                                    <Button size="sm" onClick={async () => {
                                                        try {
                                                            if (!user?.username || detailIndex === null) return;
                                                            const id = filtered[detailIndex].id;
                                                            await api.patch(`/users/${user.username}/enquiries/${id}`, { status: "closed" }, { token });
                                                            setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: "closed" } : x)));
                                                        } catch {}
                                                    }}>Close</Button>
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
                                        <Button size="sm" color="secondary" onClick={async () => {
                                            try {
                                                if (!user?.username) return;
                                                if (!addDraft.brand.trim()) return;
                                                await api.post(`/users/${user.username}/enquiries`, {
                                                    service: addDraft.service,
                                                    brand: addDraft.brand.trim(),
                                                    contactMethod: addDraft.channel,
                                                    contact: (addDraft.contactDetail || "").trim(),
                                                    message: addDraft.notes || "",
                                                    budget: typeof addDraft.budget === "number" ? addDraft.budget : undefined,
                                                }, { token });
                                                state.close();
                                                const res = await api.get<{ success: boolean; status: string; data: { requests: Array<any> } }>(`/users/${user.username}/enquiries`, { token });
                                                const mapped = (res.data?.requests || []).map((r: any) => ({
                                                    id: String(r._id),
                                                    brand: r.name || r.email || r.whatsapp || "—",
                                                    service: r.offer?.title || "—",
                                                    budget: typeof r.budget === "number" ? r.budget : undefined,
                                                    date: new Date(r.createdAt).toLocaleDateString(),
                                                    status: r.status || "new",
                                                    contactName: r.name || "",
                                                    email: r.email || undefined,
                                                    whatsapp: r.whatsapp || undefined,
                                                    instagram: undefined,
                                                    message: r.description || "",
                                                    deadline: "",
                                                    manual: false,
                                                    thread: [],
                                                }));
                                                setEnquiries(mapped);
                                            } catch {}
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

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { Check, Edit01, Share04, Trash01, XClose } from "@untitledui/icons";
import { useClipboard } from "@/hooks/use-clipboard";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

type CampaignItem = {
    id: string;
    brandName: string;
    eventName: string;
    eventType: "paid" | "barter" | null;
    date: string;
    city: string;
    venue: string;
    creatorCountNeeded: number;
    entryType: "invite_only" | "open" | null;
    status?: string;
    code?: string | null;
    raw?: any;
};

const mapEventToCampaign = (e: any): CampaignItem => ({
    id: String((e as any)._id ?? (e as any).id),
    brandName: (e as any).brandName,
    eventName: (e as any).eventName,
    eventType: (e as any).eventType ?? null,
    date: (e as any).date,
    city: (e as any).city,
    venue: (e as any).venue,
    creatorCountNeeded:
        typeof (e as any).creatorCountNeeded === "number" ? (e as any).creatorCountNeeded : 0,
    entryType: (e as any).entryType ?? null,
    status: (e as any).status,
    code: (e as any).code ?? null,
    raw: e,
});

export default function AdminCampaignsPage() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { user, token } = useAuth();
    const [brandName, setBrandName] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState<"paid" | "barter" | null>(null);
    const [dateLocal, setDateLocal] = useState("");
    const [city, setCity] = useState("");
    const [venue, setVenue] = useState("");
    const [entryType, setEntryType] = useState<"invite_only" | "open" | null>(null);
    const [creatorCountNeeded, setCreatorCountNeeded] = useState<number | undefined>(undefined);
    const [minFollowers, setMinFollowers] = useState<number | undefined>(undefined);
    const [niches, setNiches] = useState<string[]>([]);
    const [nicheInput, setNicheInput] = useState("");
    const [criteriaCity, setCriteriaCity] = useState("");
    const [dashboardAccessRequired, setDashboardAccessRequired] = useState(false);
    const [qrCheckinRequired, setQrCheckinRequired] = useState(false);
    const [doClientApprovalNeeded, setDoClientApprovalNeeded] = useState(false);
    const [deliverables, setDeliverables] = useState<
        Array<{
            platform: "instagram" | "youtube" | "x" | "blog" | "snapchat" | "facebook";
            type: "reel" | "story" | "post" | "short" | "video" | "carousel";
            quantity: number;
            deadline: { kind: "during_event" | "within_hours" | "within_days" | "scheduled_date"; value: number | null; date: string | null };
            brandTagMandatory?: boolean;
            locationTagMandatory?: boolean;
            hashtagsRequired?: boolean;
            brandMusicProvided?: boolean;
            contentApprovalRequired?: boolean;
        }>
    >([]);
    const [paymentType, setPaymentType] = useState<"range" | "fixed" | "variable" | null>(null);
    const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
    const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
    const [timeline, setTimeline] = useState<string | null>(null);
    const [invoiceRequired, setInvoiceRequired] = useState(false);
    const [isGuestsAllowedplusone, setIsGuestsAllowedplusone] = useState(true);
    const [isLimitedMenu, setIsLimitedMenu] = useState(false);
    const [inhouseFoodandBeverages, setInhouseFoodandBeverages] = useState(true);
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<"all" | "pending_from_client" | "approved_by_client">("all");
    const clipboard = useClipboard();
    const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token) return;
                const res = await api.get<{
                    success: boolean;
                    status: string;
                    data: {
                        events: Array<{
                            _id: string;
                            brandName: string;
                            eventName: string;
                            eventType: "paid" | "barter";
                            date: string;
                            city: string;
                            venue: string;
                            creatorCountNeeded: number;
                            entryType: "invite_only" | "open";
                            status?: string;
                            code?: string | null;
                        }>;
                    };
                }>(`/users/${user.username}/events`, { token });
                if (!alive) return;
                const events = res.data?.events || [];
                setCampaigns(events.map((e) => mapEventToCampaign(e)));
            } catch {} finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [user?.username, token]);

    const filteredCampaigns = campaigns.filter((c) => {
        if (statusFilter === "all") return true;
        return c.status === statusFilter;
    });

    const addDeliverable = () => {
        setDeliverables((prev) => [
            ...prev,
            { platform: "instagram", type: "reel", quantity: 1, deadline: { kind: "within_hours", value: 24, date: null } },
        ]);
    };

    const updateDeliverable = (idx: number, next: Partial<(typeof deliverables)[number]>) => {
        setDeliverables((prev) => prev.map((d, i) => (i === idx ? { ...d, ...next } : d)));
    };

    const removeDeliverable = (idx: number) => {
        setDeliverables((prev) => prev.filter((_, i) => i !== idx));
    };

    const resetForm = () => {
        setBrandName("");
        setEventName("");
        setEventType(null);
        setDateLocal("");
        setCity("");
        setVenue("");
        setEntryType(null);
        setCreatorCountNeeded(undefined);
        setMinFollowers(undefined);
        setNiches([]);
        setNicheInput("");
        setCriteriaCity("");
        setDashboardAccessRequired(false);
        setQrCheckinRequired(false);
        setDoClientApprovalNeeded(false);
        setDeliverables([]);
        setPaymentType(null);
        setMinAmount(undefined);
        setMaxAmount(undefined);
        setTimeline(null);
        setInvoiceRequired(false);
        setIsGuestsAllowedplusone(true);
        setIsLimitedMenu(false);
        setInhouseFoodandBeverages(true);
    };

    const openCreate = () => {
        setEditId(null);
        resetForm();
        setOpen(true);
    };

    const openEdit = (item: CampaignItem) => {
        setEditId(item.id);
        const e = item.raw ?? item;
        setBrandName((e as any).brandName || "");
        setEventName((e as any).eventName || "");
        setEventType(((e as any).eventType as "paid" | "barter" | null) ?? null);
        const rawDate = (e as any).date as string | undefined;
        if (rawDate) {
            const d = new Date(rawDate);
            if (!Number.isNaN(d.getTime())) {
                const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
                const pad = (n: number) => String(n).padStart(2, "0");
                const s = `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}`;
                setDateLocal(s);
            } else {
                setDateLocal("");
            }
        } else {
            setDateLocal("");
        }
        setCity((e as any).city || "");
        setVenue((e as any).venue || "");
        setEntryType(((e as any).entryType as "invite_only" | "open" | null) ?? null);
        setCreatorCountNeeded(
            typeof (e as any).creatorCountNeeded === "number" ? (e as any).creatorCountNeeded : undefined,
        );
        const criteria = (e as any).creatorCriteria || {};
        setMinFollowers(
            typeof criteria.minFollowers === "number" ? (criteria.minFollowers as number) : undefined,
        );
        setNiches(Array.isArray(criteria.niches) ? (criteria.niches as string[]) : []);
        setNicheInput("");
        setCriteriaCity(criteria.city || "");
        setDashboardAccessRequired(Boolean((e as any).dashboardAccessRequired));
        setQrCheckinRequired(Boolean((e as any).qrCheckinRequired));
        setDoClientApprovalNeeded(Boolean((e as any).doClientApprovalNeeded));
        const ds = Array.isArray((e as any).deliverables) ? ((e as any).deliverables as any[]) : [];
        setDeliverables(
            ds.map((d) => ({
                platform: d.platform,
                type: d.type,
                quantity: typeof d.quantity === "number" ? d.quantity : 1,
                deadline: {
                    kind: d.deadline?.kind ?? "within_hours",
                    value: typeof d.deadline?.value === "number" ? d.deadline.value : null,
                    date: d.deadline?.date || null,
                },
                brandTagMandatory: Boolean(d.brandTagMandatory),
                locationTagMandatory: Boolean(d.locationTagMandatory),
                hashtagsRequired: Boolean(d.hashtagsRequired),
                brandMusicProvided: Boolean(d.brandMusicProvided),
                contentApprovalRequired: Boolean(d.contentApprovalRequired),
            })),
        );
        if ((e as any).eventType === "paid" && (e as any).payment) {
            const p = (e as any).payment;
            setPaymentType((p.type as "fixed" | "range" | "variable" | null) ?? null);
            setMinAmount(typeof p.minAmount === "number" ? (p.minAmount as number) : undefined);
            setMaxAmount(typeof p.maxAmount === "number" ? (p.maxAmount as number) : undefined);
            setTimeline((p.timeline as string | null) ?? null);
            setInvoiceRequired(Boolean(p.invoiceRequired));
        } else {
            setPaymentType(null);
            setMinAmount(undefined);
            setMaxAmount(undefined);
            setTimeline(null);
            setInvoiceRequired(false);
        }
        setOpen(true);
    };

    const formatEventDate = (iso: string) => {
        if (!iso) return "";
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return "";
        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatEntryTypeLabel = (value: string | null | undefined) => {
        if (value === "invite_only") return "Invite only";
        if (value === "open") return "Open entry";
        return value || "";
    };

    const formatStatusLabel = (value: string | undefined) => {
        if (!value) return "";
        if (value === "pending_from_client") return "Pending from client";
        if (value === "approved_by_client") return "Approved by client";
        return value.replace(/_/g, " ");
    };

    const statusColor = (value: string | undefined): "warning" | "success" | "gray" => {
        if (value === "pending_from_client") return "warning";
        if (value === "approved_by_client") return "success";
        return "gray";
    };

    const onSave = async (close: () => void) => {
        try {
            if (!user?.username || !token) return;
            const dateIso = dateLocal ? new Date(dateLocal).toISOString() : "";
            const payload = {
                brandName: brandName.trim(),
                eventName: eventName.trim(),
                eventType,
                date: dateIso,
                city: city.trim(),
                venue: venue.trim(),
                creatorCountNeeded: Number(creatorCountNeeded || 0),
                creatorCriteria: {
                    minFollowers: Number(minFollowers || 0),
                    niches,
                    city: criteriaCity.trim(),
                },
                dashboardAccessRequired,
                qrCheckinRequired,
                doClientApprovalNeeded,
                isGuestsAllowedplusone,
                isLimitedMenu,
                inhouseFoodandBeverages,
                entryType,
                deliverables: eventType === "paid" ? [] : deliverables.map((d) => ({
                    platform: d.platform,
                    type: d.type,
                    quantity: Number(d.quantity || 1),
                    deadline: {
                        kind: d.deadline.kind,
                        value: d.deadline.value,
                        date: d.deadline.date || null,
                    },
                    brandTagMandatory: Boolean(d.brandTagMandatory),
                    locationTagMandatory: Boolean(d.locationTagMandatory),
                    hashtagsRequired: Boolean(d.hashtagsRequired),
                    brandMusicProvided: Boolean(d.brandMusicProvided),
                    contentApprovalRequired: Boolean(d.contentApprovalRequired),
                })),
                ...(eventType === "paid"
                    ? {
                          payment: {
                              type: paymentType,
                              minAmount: Number(minAmount || 0),
                              maxAmount: Number(maxAmount || 0),
                              timeline,
                              invoiceRequired,
                          },
                      }
                    : {}),
            };
            if (editId) {
                const res = await api.patch<any>(
                    `/users/${user.username}/events/${editId}`,
                    payload,
                    { token },
                );
                if (res && (res as any).success === false) return;
                const updatedRaw =
                    (res as any).data?.event ||
                    (res as any).data?.item ||
                    (res as any).event ||
                    (res as any).item;
                if (updatedRaw) {
                    const updated = mapEventToCampaign(updatedRaw);
                    setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
                } else {
                    try {
                        if (user?.username && token) {
                            const resList = await api.get<{
                                success: boolean;
                                status: string;
                                data: { events: any[] };
                            }>(`/users/${user.username}/events`, { token });
                            const events = resList.data?.events || [];
                            setCampaigns(events.map((e) => mapEventToCampaign(e)));
                        }
                    } catch {}
                }
            } else {
                const res = await api.post<any>(`/users/${user.username}/events`, payload, {
                    token,
                });
                if (res && (res as any).success === false) return;
                const createdRaw =
                    (res as any).data?.event ||
                    (res as any).data?.item ||
                    (res as any).event ||
                    (res as any).item;
                if (createdRaw) {
                    const created = mapEventToCampaign(createdRaw);
                    setCampaigns((prev) => [created, ...prev]);
                } else {
                    try {
                        if (user?.username && token) {
                            const resList = await api.get<{
                                success: boolean;
                                status: string;
                                data: { events: any[] };
                            }>(`/users/${user.username}/events`, { token });
                            const events = resList.data?.events || [];
                            setCampaigns(events.map((e) => mapEventToCampaign(e)));
                        }
                    } catch {}
                }
            }
            close();
            setOpen(false);
            setEditId(null);
            resetForm();
        } catch {}
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Campaigns</h1>
                            <p className="text-md text-tertiary">Plan and track brand campaigns</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <Button className="w-full md:w-auto" size="sm" color="primary" onClick={openCreate}>
                                + Create Campaign
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pt-8 pb-12 md:px-8">
                <div className="w-full max-w-8xl">
                    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="flex min-w-0 flex-col">
                                    <h2 className="text-lg font-semibold text-primary">Your Campaigns</h2>
                                    <p className="text-sm text-tertiary">
                                        {campaigns.length > 0
                                            ? "Manage upcoming and past brand campaigns."
                                            : "No campaigns yet. Create one to start tracking."}
                                    </p>
                                </div>
                                {campaigns.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                                        <Button
                                            size="sm"
                                            color={statusFilter === "all" ? "primary" : "tertiary"}
                                            className="rounded-full px-3"
                                            onClick={() => setStatusFilter("all")}
                                        >
                                            All
                                        </Button>
                                        <Button
                                            size="sm"
                                            color={statusFilter === "pending_from_client" ? "primary" : "tertiary"}
                                            className="rounded-full px-3"
                                            onClick={() => setStatusFilter("pending_from_client")}
                                        >
                                            Pending from client
                                        </Button>
                                        <Button
                                            size="sm"
                                            color={statusFilter === "approved_by_client" ? "primary" : "tertiary"}
                                            className="rounded-full px-3"
                                            onClick={() => setStatusFilter("approved_by_client")}
                                        >
                                            Approved by client
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {loading ? (
                                <div className="grid grid-cols-1 gap-3">
                                    {[...Array(3)].map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-primary_hover/60 p-4 ring-1 ring-secondary_alt"
                                        >
                                            <div className="h-4 w-40 rounded bg-secondary animate-pulse" />
                                            <div className="mt-2 h-3 w-56 rounded bg-secondary animate-pulse" />
                                            <div className="mt-4 h-3 w-32 rounded bg-secondary animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            ) : campaigns.length > 0 ? (
                                filteredCampaigns.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        {filteredCampaigns.map((c) => (
                                            <div
                                                key={c.id}
                                                onClick={() => router.push(`/admin/campaigns/${c.id}`)}
                                                className="rounded-xl bg-primary p-4 ring-1 ring-secondary shadow-xs transition duration-150 ease-in-out hover:bg-primary_hover hover:shadow-sm cursor-pointer"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex min-w-0 flex-col gap-1">
                                                        <p className="truncate text-md font-semibold text-primary">
                                                            {c.eventName || c.brandName}
                                                        </p>
                                                        {c.brandName ? (
                                                            <p className="truncate text-sm text-tertiary">
                                                                {c.brandName}
                                                            </p>
                                                        ) : null}
                                                        <p className="text-xs text-secondary">
                                                            {formatEventDate(c.date)}
                                                            {c.city || c.venue ? " · " : ""}
                                                            {[c.city, c.venue].filter(Boolean).join(", ")}
                                                        </p>
                                                    </div>
                                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                                        {c.eventType && (
                                                            <Badge
                                                                size="sm"
                                                                color={c.eventType === "paid" ? "brand" : "gray"}
                                                            >
                                                                {c.eventType === "paid" ? "Paid" : "Barter"}
                                                            </Badge>
                                                        )}
                                                        {c.entryType && (
                                                            <Badge size="sm" color="gray">
                                                                {formatEntryTypeLabel(c.entryType)}
                                                            </Badge>
                                                        )}
                                                        {c.creatorCountNeeded ? (
                                                            <Badge size="sm" color="gray">
                                                                {c.creatorCountNeeded} creators
                                                            </Badge>
                                                        ) : null}
                                                        {c.status && (
                                                            <Badge size="sm" color={statusColor(c.status)}>
                                                                {formatStatusLabel(c.status)}
                                                            </Badge>
                                                        )}
                                                        {c.code && (
                                                            <Badge size="sm" color="gray">
                                                                Code {c.code}
                                                            </Badge>
                                                        )}
                                                        {c.code && (
                                                            <ButtonUtility
                                                                size="xs"
                                                                color="secondary"
                                                                className="rounded-full bg-brand-solid text-white ring-transparent hover:bg-brand-solid_hover hover:text-white"
                                                                icon={
                                                                    clipboard.copied === `campaign-${c.id}`
                                                                        ? Check
                                                                        : Share04
                                                                }
                                                                tooltip={
                                                                    clipboard.copied === `campaign-${c.id}`
                                                                        ? "Copied"
                                                                        : c.status === "approved_by_client"
                                                                        ? "Copy invite link for creators"
                                                                        : "Copy client proposal link"
                                                                }
                                                                onClick={(e: any) => {
                                                                    e.stopPropagation();
                                                                    const path =
                                                                        c.status === "approved_by_client"
                                                                            ? `/events/invite/${encodeURIComponent(
                                                                                  String(c.code),
                                                                              )}`
                                                                            : `/events/${encodeURIComponent(
                                                                                  String(c.code),
                                                                              )}`;
                                                                    const url = `${origin}${path}`;
                                                                    clipboard.copy(url, `campaign-${c.id}`);
                                                                }}
                                                            />
                                                        )}
                                                        <ButtonUtility
                                                            size="xs"
                                                            color="tertiary"
                                                            icon={Edit01}
                                                            tooltip="Edit campaign"
                                                            onClick={(e: any) => {
                                                                e.stopPropagation();
                                                                openEdit(c);
                                                            }}
                                                        />
                                                        <ButtonUtility
                                                            size="xs"
                                                            color="tertiary"
                                                            icon={Trash01}
                                                            tooltip="Delete campaign"
                                                            onClick={(e: any) => {
                                                                e.stopPropagation();
                                                                setDeleteId(c.id);
                                                                setConfirmOpen(true);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mx-auto max-w-md text-center">
                                        <h3 className="text-md font-semibold text-primary">No campaigns in this status</h3>
                                        <p className="mt-1 text-sm text-tertiary">
                                            Try switching to a different filter to view campaigns.
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="mx-auto max-w-md text-center">
                                    <h3 className="text-md font-semibold text-primary">No campaigns yet</h3>
                                    <p className="mt-1 text-sm text-tertiary">
                                        Create your first campaign to start tracking brand events.
                                    </p>
                                    <div className="mt-4">
                                        <Button size="sm" color="primary" onClick={openCreate}>
                                            + Create Campaign
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AriaDialogTrigger isOpen={confirmOpen} onOpenChange={setConfirmOpen}>
                <Button slot="trigger" className="hidden">
                    Open
                </Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${
                            isEntering ? "duration-150 ease-out animate-in fade-in" : ""
                        } ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full h-dvh cursor-auto flex items-center justify-center p-4">
                            <AriaDialog className="w-full max-w-sm overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <h2 className="text-lg font-semibold text-primary">Delete campaign?</h2>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={async () => {
                                                if (!deleteId) return;
                                                try {
                                                    if (!user?.username || !token) throw new Error("unauthorized");
                                                    await api.delete(
                                                        `/users/${user.username}/events/${deleteId}`,
                                                        { token },
                                                    );
                                                    setCampaigns((prev) =>
                                                        prev.filter((c) => c.id !== deleteId),
                                                    );
                                                } catch {} finally {
                                                    setDeleteId(null);
                                                    state.close();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button size="sm" onClick={() => state.close()}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                                <div className="px-4 py-4">
                                    <p className="text-sm text-tertiary">
                                        This removes the campaign and its details from your account.
                                    </p>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>

            <AriaDialogTrigger isOpen={open} onOpenChange={setOpen}>
                <Button slot="trigger" className="hidden">
                    Open
                </Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${
                            isEntering ? "duration-150 ease-out animate-in fade-in" : ""
                        } ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <div className="flex min-w-0 flex-col gap-1">
                                        <h2 className="text-lg font-semibold text-primary">
                                            {editId ? "Edit Campaign" : "Create Campaign"}
                                        </h2>
                                        <p className="text-sm text-tertiary">Add details and deliverables</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={() => state.close()}>
                                            Close
                                        </Button>
                                        <Button size="sm" onClick={() => onSave(state.close)}>
                                            Save & Publish
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 px-4 py-4">
                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Basics</h3>
                                        <Input size="md" label="Brand name" placeholder="BrandX" value={brandName} onChange={setBrandName} />
                                        <Input size="md" label="Event name" placeholder="Creator Meetup" value={eventName} onChange={setEventName} />
                                        <Select
                                            size="md"
                                            label="Event Type"
                                            selectedKey={eventType ?? undefined}
                                            onSelectionChange={(key) => setEventType(String(key) as any)}
                                            items={[
                                                { id: "paid", label: "Paid" },
                                                { id: "barter", label: "Barter" },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Select
                                            size="md"
                                            label="Entry Type"
                                            selectedKey={entryType ?? undefined}
                                            onSelectionChange={(key) => setEntryType(String(key) as any)}
                                            items={[
                                                { id: "invite_only", label: "Invite Only" },
                                                { id: "open", label: "Open" },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Input
                                            size="md"
                                            label="Date & time"
                                            placeholder="YYYY-MM-DDThh:mm"
                                            type="datetime-local"
                                            value={dateLocal}
                                            onChange={setDateLocal}
                                        />
                                        <Input size="md" label="City" placeholder="Bengaluru" value={city} onChange={setCity} />
                                        <Input size="md" label="Venue" placeholder="Indiranagar Hub" value={venue} onChange={setVenue} />
                                        <Input
                                            size="md"
                                            label="Creators needed"
                                            type="number"
                                            placeholder="40"
                                            value={String(creatorCountNeeded ?? "")}
                                            onChange={(v) => setCreatorCountNeeded(Number(v || 0) || undefined)}
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Creator Criteria</h3>
                                        <Input
                                            size="md"
                                            label="Min followers"
                                            type="number"
                                            placeholder="10000"
                                            value={String(minFollowers ?? "")}
                                            onChange={(v) => setMinFollowers(Number(v || 0) || undefined)}
                                        />
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-primary">Niches</label>
                                            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-secondary px-3 py-2 bg-primary shadow-sm ring-1 ring-transparent focus-within:ring-2 focus-within:ring-brand focus-within:border-brand">
                                                {niches.map((niche, idx) => (
                                                    <Badge key={idx} size="md" color="gray" className="flex items-center gap-1 pr-1">
                                                        {niche}
                                                        <button
                                                            type="button"
                                                            onClick={() => setNiches((prev) => prev.filter((_, i) => i !== idx))}
                                                            className="ml-1 rounded-full p-0.5 hover:bg-secondary text-tertiary hover:text-primary"
                                                        >
                                                            <XClose className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                                <input
                                                    className="flex-1 min-w-[120px] bg-transparent outline-none text-md text-primary placeholder:text-tertiary"
                                                    placeholder={niches.length === 0 ? "Add niche (press Enter)..." : ""}
                                                    value={nicheInput}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val.includes(",")) {
                                                            const parts = val.split(",");
                                                            const newNiches = parts.map((s) => s.trim()).filter(Boolean);
                                                            if (newNiches.length > 0) {
                                                                setNiches((prev) => [...prev, ...newNiches]);
                                                            }
                                                            setNicheInput("");
                                                        } else {
                                                            setNicheInput(val);
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            if (nicheInput.trim()) {
                                                                setNiches((prev) => [...prev, nicheInput.trim()]);
                                                                setNicheInput("");
                                                            }
                                                        }
                                                        if (e.key === "Backspace" && !nicheInput && niches.length > 0) {
                                                            setNiches((prev) => prev.slice(0, -1));
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            size="md"
                                            label="Preferred city"
                                            placeholder="Bengaluru"
                                            value={criteriaCity}
                                            onChange={setCriteriaCity}
                                        />
                                        <div className="mt-1 flex flex-col gap-2">
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={dashboardAccessRequired}
                                                onChange={setDashboardAccessRequired}
                                                label="Dashboard access required"
                                            />
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={qrCheckinRequired}
                                                onChange={setQrCheckinRequired}
                                                label="QR check-in required"
                                            />
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={doClientApprovalNeeded}
                                                onChange={setDoClientApprovalNeeded}
                                                label="Do client approval needed"
                                            />
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={isGuestsAllowedplusone}
                                                onChange={setIsGuestsAllowedplusone}
                                                label="Guests allowed +1"
                                            />
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={isLimitedMenu}
                                                onChange={setIsLimitedMenu}
                                                label="Limited menu"
                                            />
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={inhouseFoodandBeverages}
                                                onChange={setInhouseFoodandBeverages}
                                                label="In-house Food & Beverages"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-semibold text-primary">Deliverables</h3>
                                            <Button size="sm" color="secondary" onClick={addDeliverable}>
                                                + Add Deliverable
                                            </Button>
                                        </div>
                                        <ul className="flex flex-col gap-3">
                                            {deliverables.map((d, idx) => (
                                                <li key={idx} className="rounded-xl bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                                    <div className="grid grid-cols-1 gap-3">
                                                        <Select
                                                            size="md"
                                                            label="Platform"
                                                            selectedKey={d.platform}
                                                            onSelectionChange={(key) =>
                                                                updateDeliverable(idx, { platform: String(key) as any })
                                                            }
                                                            items={[
                                                                { id: "instagram", label: "Instagram" },
                                                                { id: "youtube", label: "YouTube" },
                                                                { id: "x", label: "X" },
                                                                { id: "blog", label: "Blog" },
                                                                { id: "snapchat", label: "Snapchat" },
                                                                { id: "facebook", label: "Facebook" },
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                        <Select
                                                            size="md"
                                                            label="Type"
                                                            selectedKey={d.type}
                                                            onSelectionChange={(key) =>
                                                                updateDeliverable(idx, { type: String(key) as any })
                                                            }
                                                            items={[
                                                                { id: "reel", label: "Reel" },
                                                                { id: "story", label: "Story" },
                                                                { id: "post", label: "Post" },
                                                                { id: "short", label: "Short" },
                                                                { id: "video", label: "Video" },
                                                                { id: "carousel", label: "Carousel" },
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                        <Input
                                                            size="md"
                                                            label="Quantity"
                                                            type="number"
                                                            value={String(d.quantity)}
                                                            onChange={(v) =>
                                                                updateDeliverable(idx, { quantity: Number(v || 1) || 1 })
                                                            }
                                                        />
                                                        <Select
                                                            size="md"
                                                            label="Deadline kind"
                                                            selectedKey={d.deadline.kind}
                                                            onSelectionChange={(key) =>
                                                                updateDeliverable(idx, {
                                                                    deadline: { ...d.deadline, kind: String(key) as any },
                                                                })
                                                            }
                                                            items={[
                                                                { id: "during_event", label: "During event" },
                                                                { id: "within_hours", label: "Within hours" },
                                                                { id: "within_days", label: "Within days" },
                                                                { id: "scheduled_date", label: "Scheduled date" },
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                        {d.deadline.kind === "within_hours" || d.deadline.kind === "within_days" ? (
                                                            <Input
                                                                size="md"
                                                                label="Deadline value"
                                                                type="number"
                                                                placeholder="e.g., 48"
                                                                value={String(d.deadline.value ?? "")}
                                                                onChange={(v) =>
                                                                    updateDeliverable(idx, {
                                                                        deadline: {
                                                                            ...d.deadline,
                                                                            value: v ? Number(v) : null,
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                        ) : null}
                                                        {d.deadline.kind === "scheduled_date" ? (
                                                            <Input
                                                                size="md"
                                                                label="Deadline date"
                                                                type="date"
                                                                value={d.deadline.date ?? ""}
                                                                onChange={(v) =>
                                                                    updateDeliverable(idx, {
                                                                        deadline: {
                                                                            ...d.deadline,
                                                                            date: v || null,
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-1 gap-2">
                                                        <Toggle
                                                            slim
                                                            size="md"
                                                            isSelected={Boolean(d.brandTagMandatory)}
                                                            onChange={(sel) =>
                                                                updateDeliverable(idx, { brandTagMandatory: sel })
                                                            }
                                                            label="Brand tag mandatory"
                                                        />
                                                        <Toggle
                                                            slim
                                                            size="md"
                                                            isSelected={Boolean(d.locationTagMandatory)}
                                                            onChange={(sel) =>
                                                                updateDeliverable(idx, { locationTagMandatory: sel })
                                                            }
                                                            label="Location tag mandatory"
                                                        />
                                                        <Toggle
                                                            slim
                                                            size="md"
                                                            isSelected={Boolean(d.hashtagsRequired)}
                                                            onChange={(sel) =>
                                                                updateDeliverable(idx, { hashtagsRequired: sel })
                                                            }
                                                            label="Hashtags required"
                                                        />
                                                        <Toggle
                                                            slim
                                                            size="md"
                                                            isSelected={Boolean(d.brandMusicProvided)}
                                                            onChange={(sel) =>
                                                                updateDeliverable(idx, { brandMusicProvided: sel })
                                                            }
                                                            label="Brand music provided"
                                                        />
                                                        <Toggle
                                                            slim
                                                            size="md"
                                                            isSelected={Boolean(d.contentApprovalRequired)}
                                                            onChange={(sel) =>
                                                                updateDeliverable(idx, { contentApprovalRequired: sel })
                                                            }
                                                            label="Content approval required"
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <Button size="sm" onClick={() => removeDeliverable(idx)}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {eventType === "paid" && (
                                        <div className="flex min-w-0 flex-col gap-2">
                                            <h3 className="text-md font-semibold text-primary">Payment</h3>
                                            <Select
                                                size="md"
                                                label="Payment Type"
                                                selectedKey={paymentType ?? undefined}
                                                onSelectionChange={(key) => setPaymentType(String(key) as any)}
                                                items={[
                                                    { id: "fixed", label: "Fixed" },
                                                    { id: "range", label: "Range" },
                                                    { id: "variable", label: "Variable" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                            <Input
                                                size="md"
                                                label="Min amount"
                                                type="number"
                                                placeholder="5000"
                                                value={String(minAmount ?? "")}
                                                onChange={(v) => setMinAmount(Number(v || 0) || undefined)}
                                            />
                                            <Input
                                                size="md"
                                                label="Max amount"
                                                type="number"
                                                placeholder="10000"
                                                value={String(maxAmount ?? "")}
                                                onChange={(v) => setMaxAmount(Number(v || 0) || undefined)}
                                            />
                                            <Select
                                                size="md"
                                                label="Payment Timeline"
                                                selectedKey={timeline ?? undefined}
                                                onSelectionChange={(key) => setTimeline(String(key))}
                                                items={[
                                                    { id: "after_event", label: "After event" },
                                                    { id: "after_content_approval", label: "After content approval" },
                                                    { id: "after_posting_days", label: "After posting (days)" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={invoiceRequired}
                                                onChange={setInvoiceRequired}
                                                label="Invoice required"
                                            />
                                        </div>
                                    )}
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>
        </section>
    );
}

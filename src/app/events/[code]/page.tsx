"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { api } from "@/utils/api";

type PublicEvent = {
    id?: string;
    _id?: string;
    brandName?: string;
    eventName?: string;
    eventType?: "paid" | "barter" | null;
    date?: string;
    city?: string;
    venue?: string;
    creatorCountNeeded?: number;
    entryType?: "invite_only" | "open" | null;
    status?: string;
    code?: string | null;
    creatorCriteria?: {
        minFollowers?: number;
        niches?: string[];
        city?: string;
    };
    deliverables?: Array<{
        platform: "instagram" | "youtube" | "x" | "blog";
        type: "reel" | "story" | "post" | "short" | "video";
        quantity: number;
        deadline: { kind: "during_event" | "within_hours" | "within_days"; value: number | null };
        brandTagMandatory?: boolean;
        locationTagMandatory?: boolean;
        hashtagsRequired?: boolean;
        brandMusicProvided?: boolean;
        contentApprovalRequired?: boolean;
    }>;
    payment?: {
        type?: "fixed" | "range" | "variable";
        minAmount?: number;
        maxAmount?: number;
        timeline?: "after_event" | "after_content_approval" | "after_posting_days" | string | null;
        invoiceRequired?: boolean;
        perCreator?: boolean;
    } | null;
};

type PublicEventResponse = {
    success: boolean;
    status: string;
    data: {
        event: PublicEvent;
    };
};

const formatEventDate = (iso?: string) => {
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

const formatAudienceSize = (value?: number) => {
    if (!value || value <= 0) return "";
    if (value >= 1000000) return `${Math.round(value / 100000) / 10}M+`;
    if (value >= 1000) return `${Math.round(value / 100) / 10}K+`;
    return new Intl.NumberFormat("en-IN").format(value);
};

type Deliverable = NonNullable<PublicEvent["deliverables"]>[number];
type DeliverableDeadline = Deliverable["deadline"];

const formatDeadline = (d: DeliverableDeadline | null | undefined) => {
    if (!d) return "";
    if (d.kind === "during_event") return "During event";
    if (d.kind === "within_hours") {
        if (typeof d.value === "number" && d.value > 0) return `Within ${d.value} hours`;
        return "Within hours";
    }
    if (d.kind === "within_days") {
        if (typeof d.value === "number" && d.value > 0) return `Within ${d.value} days`;
        return "Within days";
    }
    return "";
};

const formatPaymentLabel = (p: PublicEvent["payment"]) => {
    if (!p) return "";
    if (p.type === "fixed") {
        if (typeof p.minAmount === "number") return `Fixed ₹${new Intl.NumberFormat("en-IN").format(p.minAmount)}`;
        return "Fixed fee";
    }
    if (p.type === "range") {
        const min = typeof p.minAmount === "number" ? p.minAmount : undefined;
        const max = typeof p.maxAmount === "number" ? p.maxAmount : undefined;
        if (min != null && max != null) {
            const fmt = new Intl.NumberFormat("en-IN");
            return `Range ₹${fmt.format(min)} – ₹${fmt.format(max)}`;
        }
        return "Range";
    }
    if (p.type === "variable") return "Variable";
    return "";
};

const formatTimelineLabel = (value: string | null | undefined) => {
    if (!value) return "";
    if (value === "after_event") return "After event";
    if (value === "after_content_approval") return "After content approval";
    if (value === "after_posting_days") return "After posting (days)";
    return value.replace(/_/g, " ");
};

export default function EventPage() {
    const params = useParams();
    const code = String((params as any)?.code || "");
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [approving, setApproving] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!code) {
                    setLoading(false);
                    setError("Invalid event link");
                    setEvent(null);
                    return;
                }
                setLoading(true);
                setError(null);
                const path = `/events/public/code/${encodeURIComponent(code)}`;
                const res = await api.get<PublicEventResponse | any>(path);
                if (!alive) return;
                const payload: any = res;
                const nextEvent: PublicEvent | null =
                    payload?.data?.event ||
                    payload?.data?.item ||
                    payload?.event ||
                    payload?.item ||
                    payload?.data ||
                    null;
                setEvent(nextEvent);
            } catch (e: any) {
                if (!alive) return;
                setError(e?.message || "Unable to load event");
                setEvent(null);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [code]);

    const onApprove = async () => {
        if (!code || !event || approving) return;
        try {
            setApproving(true);
            const res = await api.patch<any>(`/events/${encodeURIComponent(code)}/approve`);
            const payload: any = res;
            const updated: PublicEvent | null =
                payload?.data?.event ||
                payload?.data?.item ||
                payload?.event ||
                payload?.item ||
                payload?.data ||
                null;
            if (updated) {
                setEvent(updated);
            } else {
                setEvent((prev) => (prev ? { ...prev, status: "approved_by_client" } : prev));
            }
        } catch {
        } finally {
            setApproving(false);
        }
    };

    if (loading) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4">
                <div className="rounded-2xl bg-primary px-4 py-3 shadow-xs ring-1 ring-secondary_alt">
                    <p className="text-sm font-medium text-secondary">Loading event...</p>
                </div>
            </section>
        );
    }

    if (!event || error) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4">
                <div className="max-w-md rounded-2xl bg-primary px-4 py-5 text-center shadow-xs ring-1 ring-secondary_alt">
                    <h1 className="text-lg font-semibold text-primary">Event not found</h1>
                    <p className="mt-1 text-sm text-tertiary">
                        {error ? String(error) : "This event link may be incorrect or has been removed."}
                    </p>
                </div>
            </section>
        );
    }

    const deliverables = Array.isArray(event.deliverables) ? event.deliverables : [];
    const payment = event.payment ?? null;
    const creatorCriteria = event.creatorCriteria ?? {};
    const isDark = mounted && resolvedTheme === "dark";
    const themeLabel = isDark ? "Switch to light" : "Switch to dark";

    return (
        <section className="flex min-h-screen items-start justify-center bg-linear-to-br from-[#11002C] via-[#13052F] to-[#020617] px-4 py-10">
            <div className="w-full max-w-4xl rounded-3xl bg-linear-to-br from-[#F4EBFF] via-[#FFFFFF] to-[#E0EAFF] p-[1px] shadow-lg ring-1 ring-[#F5F5FF] dark:from-[#201144] dark:via-[#020617] dark:to-[#020617] dark:ring-[#312E81]">
                <div className="relative h-full w-full rounded-[22px] bg-primary p-4 md:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 border-b border-secondary pb-5 md:flex-row md:items-start md:justify-between">
                        <div className="flex min-w-0 flex-col gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EBFF] px-3 py-1 text-xs font-medium text-[#6941C6] dark:bg-[#1D1633] dark:text-[#E9D7FE]">
                                <span className="size-1.5 rounded-full bg-[#7F56D9]" />
                                Campaign proposal
                            </div>
                            <div className="mt-1 flex items-start gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-[#7F56D9] to-[#F97316] text-sm font-semibold text-white shadow-md md:size-11">
                                    {(event.brandName || event.eventName || "I").charAt(0).toUpperCase()}
                                </div>
                                <div className="flex min-w-0 flex-col gap-1">
                                    <h1 className="truncate text-xl font-semibold text-primary md:text-2xl">
                                        {event.eventName || "Campaign"}
                                    </h1>
                                    {event.brandName ? (
                                        <p className="truncate text-sm font-semibold text-tertiary">
                                            {event.brandName}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-start gap-2 md:mt-0 md:justify-end" />
                    </div>

                    {mounted && (
                        <div className="absolute right-4 top-4">
                            <ButtonUtility
                                tooltip={themeLabel}
                                size="sm"
                                color="secondary"
                                icon={isDark ? Sun : Moon01}
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                            />
                        </div>
                    )}

                    <div className="mt-0 grid grid-cols-1 gap-5 md:grid-cols-[1.4fr,1.6fr]">
                        <div className="flex flex-col gap-4">
                            <div className="rounded-2xl bg-primary_hover/40 p-4 ring-1 ring-secondary_alt">
                                <h2 className="text-sm font-semibold text-primary">Event overview</h2>
                                <dl className="mt-3 grid grid-cols-1 gap-3 text-sm">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Date & time</dt>
                                    <dd className="text-primary text-right">
                                        {formatEventDate(event.date) || "TBA"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Location</dt>
                                    <dd className="text-primary text-right">
                                        {[event.city, event.venue].filter(Boolean).join(", ") || "TBA"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Entry</dt>
                                    <dd className="text-primary text-right">
                                        {formatEntryTypeLabel(event.entryType) || "Not specified"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Creators attending</dt>
                                    <dd className="text-primary text-right">
                                        {typeof event.creatorCountNeeded === "number" && event.creatorCountNeeded > 0
                                            ? `${event.creatorCountNeeded} verified creators will attend`
                                            : "Not specified"}
                                    </dd>
                                </div>
                                </dl>
                            </div>

                            <div className="rounded-2xl bg-primary_hover/40 p-4 ring-1 ring-secondary_alt">
                                <h2 className="text-sm font-semibold text-primary">Creator Quality Filters</h2>
                                <dl className="mt-3 space-y-2 text-sm">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Minimum audience size</dt>
                                    <dd className="text-primary">
                                        {typeof creatorCriteria.minFollowers === "number" &&
                                        creatorCriteria.minFollowers > 0
                                            ? `${formatAudienceSize(creatorCriteria.minFollowers)}`
                                            : "Not specified"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Content category</dt>
                                    <dd className="text-primary">
                                        {Array.isArray(creatorCriteria.niches) &&
                                        creatorCriteria.niches.filter(Boolean).length > 0
                                            ? creatorCriteria.niches.join(", ")
                                            : "Not specified"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Local creators</dt>
                                    <dd className="text-primary">
                                        {creatorCriteria.city ? creatorCriteria.city : "Not specified"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Verified insights required</dt>
                                    <dd className="text-primary">
                                        {(event as any).dashboardAccessRequired ? "Required" : "Optional"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-secondary">Physical attendance verification</dt>
                                    <dd className="text-primary">
                                        {(event as any).qrCheckinRequired ? "Required" : "Optional"}
                                    </dd>
                                </div>
                                </dl>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="rounded-2xl bg-primary_hover/40 p-4 ring-1 ring-secondary_alt">
                                <h2 className="text-sm font-semibold text-primary">Content Deliverables (Guaranteed)</h2>
                                {deliverables.length === 0 ? (
                                    <p className="mt-2 text-sm text-tertiary">No deliverables listed.</p>
                                ) : (
                                    <ul className="mt-2 flex flex-col gap-2">
                                        {deliverables.map((d, idx) => {
                                            const platformLabel =
                                                d.platform === "instagram"
                                                    ? "Instagram"
                                                    : d.platform === "youtube"
                                                    ? "YouTube"
                                                    : d.platform === "x"
                                                    ? "X"
                                                    : "Blog";
                                            const typeSingular =
                                                d.type === "reel"
                                                    ? "reel"
                                                    : d.type === "story"
                                                    ? "story"
                                                    : d.type === "post"
                                                    ? "post"
                                                    : d.type === "short"
                                                    ? "Short"
                                                    : "video";
                                            const typePlural =
                                                d.type === "reel"
                                                    ? "reels"
                                                    : d.type === "story"
                                                    ? "stories"
                                                    : d.type === "post"
                                                    ? "posts"
                                                    : d.type === "short"
                                                    ? "Shorts"
                                                    : "videos";
                                            const quantity =
                                                typeof d.quantity === "number" && d.quantity > 0 ? d.quantity : 1;
                                            const perCreatorLabel = `${quantity} ${quantity === 1 ? typeSingular : typePlural} per creator`;
                                            const totalPieces =
                                                typeof event.creatorCountNeeded === "number" &&
                                                event.creatorCountNeeded > 0
                                                    ? event.creatorCountNeeded * quantity
                                                    : null;
                                            const totalLabel =
                                                totalPieces != null
                                                    ? `${totalPieces} ${totalPieces === 1 ? typeSingular : typePlural}`
                                                    : "";
                                            return (
                                                <li
                                                    key={idx}
                                                    className="rounded-xl bg-primary_hover/60 p-3 text-sm ring-1 ring-secondary_alt"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                                            <span className="font-semibold text-primary">
                                                                {platformLabel} · {typePlural}
                                                            </span>
                                                            <span className="text-xs text-secondary">
                                                                {formatDeadline(d.deadline) || "Deadline TBA"}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-secondary">
                                                            {perCreatorLabel}
                                                            {totalLabel ? ` – up to ${totalLabel}` : ""}
                                                        </p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>

                            {event.eventType === "paid" && payment && (
                            <div className="rounded-2xl bg-primary_hover/40 p-4 ring-1 ring-secondary_alt">
                                <h2 className="text-sm font-semibold text-primary">Payment</h2>
                                <dl className="mt-2 space-y-1 text-sm">
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-secondary">Type</dt>
                                        <dd className="text-primary">{formatPaymentLabel(payment) || "Paid"}</dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-secondary">Timeline</dt>
                                        <dd className="text-primary">
                                            {formatTimelineLabel(payment.timeline) || "Not specified"}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-secondary">Invoice</dt>
                                        <dd className="text-primary">
                                            {payment.invoiceRequired ? "Required" : "Optional"}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-secondary">Per creator</dt>
                                        <dd className="text-primary">
                                            {payment.perCreator ? "Yes" : "Not specified"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            )}

                            <div className="rounded-2xl bg-primary_hover/40 p-4 ring-1 ring-secondary_alt">
                                <h2 className="text-sm font-semibold text-primary">Post-Event Reporting</h2>
                                <p className="mt-1 text-xs text-secondary">
                                    INFLU sends you a client-ready recap once the campaign is done.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge size="sm" color="brand">
                                        Creator list
                                    </Badge>
                                    <Badge size="sm" color="blue">
                                        Live content links
                                    </Badge>
                                    <Badge size="sm" color="success">
                                        Attendance proof
                                    </Badge>
                                    <Badge size="sm" color="orange">
                                        Delivery status
                                    </Badge>
                                    <Badge size="sm" color="purple">
                                        Reach snapshot
                                    </Badge>
                                </div>
                                <div className="mt-4 space-y-2 text-xs text-secondary">
                                    <p>
                                        <span className="font-semibold text-primary">Creator list</span> – names and Instagram handles of all
                                        attending creators.
                                    </p>
                                    <p>
                                        <span className="font-semibold text-primary">Live content links</span> – reel and story links for all
                                        creators in one place.
                                    </p>
                                    <p>
                                        <span className="font-semibold text-primary">Attendance proof</span> – QR check-in logs to verify who
                                        checked in at the venue.
                                    </p>
                                    <p>
                                        <span className="font-semibold text-primary">Delivery status</span> – completed vs pending status for
                                        each creator commitment.
                                    </p>
                                    <p>
                                        <span className="font-semibold text-primary">Reach snapshot</span> – basic aggregated reach summary
                                        across all reported content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                        {event.status === "pending_from_client" ? (
                            <Button
                                size="sm"
                                color="primary"
                                className="w-full md:w-auto"
                                onClick={onApprove}
                                isDisabled={approving}
                            >
                                {approving ? "Approving..." : "Approve & Start Campaign"}
                            </Button>
                        ) : (
                            <Badge size="sm" color={statusColor(event.status)}>
                                {formatStatusLabel(event.status)}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

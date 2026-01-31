"use client";

import { useEffect, useState, CSSProperties } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    ArrowLeft, 
    Calendar, 
    MarkerPin01, 
    Users01, 
    Share04, 
    Check, 
    UserPlus01,
    CreditCard01,
    File04,
    Tag01,
    Clock,
    InfoCircle,
    CheckCircle,
    Star01,
    PieChart03,
    CheckDone01,
    PlayCircle,
    UploadCloud02,
    Mail01,
    XCircle
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { useClipboard } from "@/hooks/use-clipboard";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { ShowWorkModal } from "./show-work-modal";
import { UploadBannerModal } from "./upload-banner-modal";
import { ReportTab } from "./report-tab";

type EventDetail = {
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
    description?: string;
    creatorCriteria?: {
        minFollowers?: number;
        niches?: string[];
        city?: string;
    };
    isGuestsAllowedplusone?: boolean;
    isLimitedMenu?: boolean;
    inhouseFoodandBeverages?: boolean;
    deliverables?: {
        platform: string;
        type: string;
        quantity: number;
        deadline?: { kind: string; value: number };
        brandTagMandatory?: boolean;
        locationTagMandatory?: boolean;
        hashtagsRequired?: boolean;
        brandMusicProvided?: boolean;
        contentApprovalRequired?: boolean;
    }[];
    doClientApprovalNeeded?: boolean;
    payment?: {
        type?: "fixed" | "range" | "variable";
        minAmount?: number;
        maxAmount?: number;
        timeline?: string;
    };
    invitationBannerUrl?: string | null;
};

export default function CampaignDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, token } = useAuth();
    const id = String(params?.id || "");
    const [event, setEvent] = useState<EventDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"details" | "applicants" | "shortlisted" | "replacement" | "invited" | "report">("details");
    const clipboard = useClipboard();
    const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";
    const [isUploadBannerOpen, setIsUploadBannerOpen] = useState(false);
    const [copiedToast, setCopiedToast] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token || !id) return;
                // Assuming this endpoint exists based on patterns
                // If not, we might need to fetch all and find one, but let's try direct first
                const res = await api.get<{ success: boolean; data: { event: EventDetail } }>(`/users/${user.username}/events/${id}`, { token });
                if (!alive) return;
                setEvent(res.data?.event || null);
            } catch (e) {
                // Fallback: fetch all and find
                try {
                     const resList = await api.get<{
                            success: boolean;
                            data: { events: EventDetail[] };
                        }>(`/users/${user?.username}/events`, { token });
                    if (!alive) return;
                    const found = resList.data?.events?.find((e) => e._id === id || (e as any).id === id);
                    if (found) setEvent(found);
                } catch {}
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [user?.username, token, id]);

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

    const statusColor = (value: string | undefined): "warning" | "success" | "gray" => {
        if (value === "pending_from_client") return "warning";
        if (value === "approved_by_client") return "success";
        return "gray";
    };

    const formatStatusLabel = (value: string | undefined) => {
        if (!value) return "";
        if (value === "pending_from_client") return "Pending from client";
        if (value === "approved_by_client") return "Approved by client";
        return value.replace(/_/g, " ");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center lg:pl-[300px]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 lg:pl-[300px]">
                <p className="text-tertiary">Campaign not found</p>
                <Button size="sm" color="secondary" onClick={() => router.push("/admin/campaigns")}>
                    Back to Campaigns
                </Button>
            </div>
        );
    }

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            {/* Header */}
            <div className="border-b border-secondary bg-primary px-4 py-6 md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => router.push("/admin/campaigns")}
                            className="flex items-center gap-2 text-sm font-medium text-tertiary hover:text-primary transition-colors w-fit"
                        >
                            <ArrowLeft className="size-4" />
                            Back to campaigns
                        </button>
                        
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-display-xs font-semibold text-primary">
                                    {event.eventName || event.brandName}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2">
                                    {event.brandName && (
                                        <Badge size="md" color="gray">
                                            {event.brandName}
                                        </Badge>
                                    )}
                                    {event.status && (
                                        <Badge size="md" color={statusColor(event.status)}>
                                            {formatStatusLabel(event.status)}
                                        </Badge>
                                    )}
                                    {event.eventType && (
                                        <Badge size="md" color={event.eventType === "paid" ? "brand" : "gray"}>
                                            {event.eventType === "paid" ? "Paid" : "Barter"}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {event.code && (
                                activeTab === "shortlisted" ? (
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        iconLeading={clipboard.copied === `shortlisted-${event._id}` ? Check : Share04}
                                        onClick={async () => {
                                            const url = `${origin}/events/shortlisted/${encodeURIComponent(String(event.code))}`;
                                            if (navigator.share) {
                                                try {
                                                    await navigator.share({
                                                        title: 'Shortlisted Profiles',
                                                        text: 'Check out these shortlisted profiles',
                                                        url: url
                                                    });
                                                } catch (err) {
                                                    console.error('Error sharing:', err);
                                                    clipboard.copy(url, `shortlisted-${event._id}`);
                                                    setCopiedToast("Link copied to clipboard!");
                                                    setTimeout(() => setCopiedToast(null), 3000);
                                                }
                                            } else {
                                                clipboard.copy(url, `shortlisted-${event._id}`);
                                                setCopiedToast("Link copied to clipboard!");
                                                setTimeout(() => setCopiedToast(null), 3000);
                                            }
                                        }}
                                    >
                                        Share to Client
                                    </Button>
                                ) : activeTab === "invited" ? (
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        iconLeading={clipboard.copied === `welcome-${event._id}` ? Check : Share04}
                                        onClick={async () => {
                                            const url = `${origin}/events/welcome/${encodeURIComponent(String(event.code))}`;
                                            if (navigator.share) {
                                                try {
                                                    await navigator.share({
                                                        title: 'Welcome to the Campaign',
                                                        text: 'Welcome! Here are the next steps.',
                                                        url: url
                                                    });
                                                } catch (err) {
                                                    console.error('Error sharing:', err);
                                                    clipboard.copy(url, `welcome-${event._id}`);
                                                    setCopiedToast("Link copied to clipboard!");
                                                    setTimeout(() => setCopiedToast(null), 3000);
                                                }
                                            } else {
                                                clipboard.copy(url, `welcome-${event._id}`);
                                                setCopiedToast("Link copied to clipboard!");
                                                setTimeout(() => setCopiedToast(null), 3000);
                                            }
                                        }}
                                    >
                                        Share Welcome Invite
                                    </Button>
                                ) : activeTab === "details" ? (
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            iconLeading={UploadCloud02}
                                            onClick={() => setIsUploadBannerOpen(true)}
                                        >
                                            {event.invitationBannerUrl ? "Manage Banner" : "Upload Invitation Banner"}
                                        </Button>
                                        {event.doClientApprovalNeeded && (
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                iconLeading={clipboard.copied === `client-${event._id}` ? Check : Share04}
                                                onClick={async () => {
                                                    const url = `${origin}/events/${encodeURIComponent(String(event.code))}`;
                                                    if (navigator.share) {
                                                        try {
                                                            await navigator.share({
                                                                title: event.eventName || 'Campaign Proposal',
                                                                text: 'Check out this campaign proposal',
                                                                url: url
                                                            });
                                                        } catch (err) {
                                                            console.error('Error sharing:', err);
                                                            clipboard.copy(url, `client-${event._id}`);
                                                            setCopiedToast("Link copied to clipboard!");
                                                            setTimeout(() => setCopiedToast(null), 3000);
                                                        }
                                                    } else {
                                                        clipboard.copy(url, `client-${event._id}`);
                                                        setCopiedToast("Link copied to clipboard!");
                                                        setTimeout(() => setCopiedToast(null), 3000);
                                                    }
                                                }}
                                            >
                                                Share to Client
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            iconLeading={clipboard.copied === `campaign-${event._id}` ? Check : Share04}
                                            onClick={async () => {
                                                const path = `/events/invite/${encodeURIComponent(String(event.code))}`;
                                                const url = `${origin}${path}`;
                                                if (navigator.share) {
                                                    try {
                                                        await navigator.share({
                                                            title: event.eventName || 'Campaign Invite',
                                                            text: 'Join this campaign',
                                                            url: url
                                                        });
                                                    } catch (err) {
                                                        console.error('Error sharing:', err);
                                                        clipboard.copy(url, `campaign-${event._id}`);
                                                        setCopiedToast("Link copied to clipboard!");
                                                        setTimeout(() => setCopiedToast(null), 3000);
                                                    }
                                                } else {
                                                    clipboard.copy(url, `campaign-${event._id}`);
                                                    setCopiedToast("Link copied to clipboard!");
                                                    setTimeout(() => setCopiedToast(null), 3000);
                                                }
                                            }}
                                        >
                                            Share Invite
                                        </Button>
                                    </div>
                                ) : activeTab === "report" ? (
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        iconLeading={clipboard.copied === `submit-${event.code}` ? Check : Share04}
                                        onClick={() => {
                                            const url = `${origin}/events/submit-work/${event.code}`;
                                            clipboard.copy(url, `submit-${event.code}`);
                                            setCopiedToast("Link copied to clipboard!");
                                            setTimeout(() => setCopiedToast(null), 3000);
                                        }}
                                    >
                                        Request Work Submission
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                       
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            className="w-full md:w-auto"
                                            iconLeading={clipboard.copied === `campaign-${event._id}` ? Check : Share04}
                                            onClick={async () => {
                                                const path = `/events/invite/${encodeURIComponent(String(event.code))}`;
                                                const url = `${origin}${path}`;
                                                if (navigator.share) {
                                                    try {
                                                        await navigator.share({
                                                            title: event.eventName || 'Campaign Invite',
                                                            text: 'Join this campaign',
                                                            url: url
                                                        });
                                                    } catch (err) {
                                                        console.error('Error sharing:', err);
                                                        clipboard.copy(url, `campaign-${event._id}`);
                                                        setCopiedToast("Link copied to clipboard!");
                                                        setTimeout(() => setCopiedToast(null), 3000);
                                                    }
                                                } else {
                                                    clipboard.copy(url, `campaign-${event._id}`);
                                                    setCopiedToast("Link copied to clipboard!");
                                                    setTimeout(() => setCopiedToast(null), 3000);
                                                }
                                            }}
                                        >
                                            Share Invite
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8 flex items-center gap-6 border-b border-secondary overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === "details"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("applicants")}
                            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === "applicants"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Applicants
                        </button>
                        <button
                            onClick={() => setActiveTab("shortlisted")}
                            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === "shortlisted"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Shortlisted Profiles
                        </button>
                           <button
                            onClick={() => setActiveTab("replacement")}
                            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === "replacement"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Request for Replacement
                        </button>
                           <button
                            onClick={() => setActiveTab("invited")}
                            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === "invited"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Approved Profiles
                        </button>
                        <button
                            onClick={() => setActiveTab("report")}
                            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === "report"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    {activeTab === "details" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Main Info */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Banner Section */}
                                {event.invitationBannerUrl && (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-sm border border-secondary overflow-hidden">
                                        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-secondary/30">
                                            <img 
                                                src={event.invitationBannerUrl} 
                                                alt="Campaign Banner" 
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* About Section */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-secondary">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-brand-50 dark:bg-brand-900/20 rounded-xl text-brand-600 dark:text-brand-400">
                                            <File04 className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">About Campaign</h3>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {event.description && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Description</h4>
                                                <p className="text-secondary leading-relaxed">{event.description}</p>
                                            </div>
                                        )}

                                        <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-secondary">
                                            <div className="flex gap-4">
                                                <div className="shrink-0 mt-1">
                                                    <Calendar className="size-5 text-tertiary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-primary mb-1">Date & Time</p>
                                                    <p className="text-sm text-tertiary">{formatEventDate(event.date)}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="shrink-0 mt-1">
                                                    <MarkerPin01 className="size-5 text-tertiary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-primary mb-1">Location</p>
                                                    <p className="text-sm text-tertiary">
                                                        {[event.venue, event.city].filter(Boolean).join(", ")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Criteria Section */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-secondary">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                                            <Users01 className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">Creator Requirements</h3>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Required Count</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-3xl font-bold text-primary">{event.creatorCountNeeded || 0}</span>
                                                <span className="text-tertiary font-medium">Creators</span>
                                            </div>
                                        </div>

                                        {event.creatorCriteria && (
                                            <div className="space-y-6">
                                                {event.creatorCriteria.minFollowers && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Minimum Followers</h4>
                                                        <Badge size="lg" color="gray" className="font-semibold">
                                                            {event.creatorCriteria.minFollowers.toLocaleString()}+ Followers
                                                        </Badge>
                                                    </div>
                                                )}
                                                
                                                {(event.creatorCriteria.niches?.length || 0) > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Target Niches</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {event.creatorCriteria.niches?.map((n) => (
                                                                <Badge key={n} size="lg" color="brand" className="capitalize">
                                                                    {n}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {event.creatorCriteria.city && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Location Requirement</h4>
                                                        <Badge size="lg" color="gray">
                                                            {event.creatorCriteria.city}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Logistics & Deliverables */}
                            <div className="space-y-8">
                                {/* Deliverables Card */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-secondary">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400">
                                            <CheckCircle className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">Deliverables</h3>
                                    </div>

                                    {event.deliverables && event.deliverables.length > 0 ? (
                                        <ul className="space-y-4">
                                            {event.deliverables.map((d, i) => (
                                                <li key={i} className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-800 transition-all duration-200">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center justify-center size-12 rounded-xl bg-white dark:bg-black shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 text-lg font-bold text-brand-600 dark:text-brand-400">
                                                                {d.quantity}
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="text-base font-bold text-gray-900 dark:text-white capitalize">{d.platform}</span>
                                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md w-fit">
                                                                    {d.type}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {d.deadline && (
                                                            <div className="shrink-0">
                                                                <Badge size="md" color="warning" className="shadow-sm">
                                                                    <Clock className="mr-1.5 size-3.5" />
                                                                    {d.deadline.kind === "during_event" ? "Due During Event" : 
                                                                     d.deadline.kind === "within_hours" ? `Due in ${d.deadline.value}h` : 
                                                                     `Due in ${d.deadline.value} days`}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Requirements Tags */}
                                                    {(d.brandTagMandatory || d.locationTagMandatory || d.hashtagsRequired || d.brandMusicProvided || d.contentApprovalRequired) && (
                                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                                                            {d.brandTagMandatory && (
                                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                                    <Tag01 className="size-3.5 text-purple-500" />
                                                                    <span>Brand Tag</span>
                                                                </div>
                                                            )}
                                                            {d.locationTagMandatory && (
                                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                                    <MarkerPin01 className="size-3.5 text-red-500" />
                                                                    <span>Location Tag</span>
                                                                </div>
                                                            )}
                                                            {d.hashtagsRequired && (
                                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                                    <span className="text-blue-500 font-bold text-sm">#</span>
                                                                    <span>Hashtags</span>
                                                                </div>
                                                            )}
                                                            {d.brandMusicProvided && (
                                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                                    <PlayCircle className="size-3.5 text-pink-500" />
                                                                    <span>Brand Music</span>
                                                                </div>
                                                            )}
                                                            {d.contentApprovalRequired && (
                                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                                    <CheckDone01 className="size-3.5 text-green-500" />
                                                                    <span>Approval Req.</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-3">
                                                <CheckCircle className="size-6 text-gray-400" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">No deliverables specified</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Add deliverables to guide creators</p>
                                        </div>
                                    )}
                                </div>

                                {/* Food & Guidelines */}
                                {(event.isLimitedMenu || event.inhouseFoodandBeverages || event.isGuestsAllowedplusone) && (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-secondary">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-600 dark:text-yellow-400">
                                                <Star01 className="size-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-primary">Food & Guidelines</h3>
                                        </div>

                                        <div className="grid gap-4">
                                            {event.isLimitedMenu && (
                                                <div className="flex items-center gap-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 transition-colors hover:bg-orange-100/50 dark:hover:bg-orange-900/20">
                                                    <div className="p-2.5 bg-white dark:bg-orange-900/40 rounded-lg text-orange-600 dark:text-orange-400 shadow-sm ring-1 ring-orange-100 dark:ring-orange-900/30">
                                                        <PieChart03 className="size-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Limited Menu</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Special curated selection for guests</p>
                                                    </div>
                                                </div>
                                            )}
                                            {event.inhouseFoodandBeverages && (
                                                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 transition-colors hover:bg-green-100/50 dark:hover:bg-green-900/20">
                                                    <div className="p-2.5 bg-white dark:bg-green-900/40 rounded-lg text-green-600 dark:text-green-400 shadow-sm ring-1 ring-green-100 dark:ring-green-900/30">
                                                        <CheckDone01 className="size-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">F&B Provided</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Complimentary food and beverages</p>
                                                    </div>
                                                </div>
                                            )}
                                            {event.isGuestsAllowedplusone && (
                                                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/20">
                                                    <div className="p-2.5 bg-white dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-100 dark:ring-blue-900/30">
                                                        <Users01 className="size-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">+1 Guest Allowed</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">You can bring a companion</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Payment Card */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-secondary">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                                            <CreditCard01 className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">Compensation</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-secondary">
                                            <span className="text-sm font-medium text-secondary">Type</span>
                                            <Badge size="md" color={event.eventType === "paid" ? "success" : "gray"}>
                                                {event.eventType === "paid" ? "Paid Campaign" : "Barter Collaboration"}
                                            </Badge>
                                        </div>

                                        {event.payment && (
                                            <>
                                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800">
                                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">
                                                        Payment Amount
                                                    </p>
                                                    <p className="text-2xl font-bold text-green-800 dark:text-green-300">
                                                        {event.payment.type === "fixed" && `₹${event.payment.minAmount}`}
                                                        {event.payment.type === "range" && `₹${event.payment.minAmount} - ₹${event.payment.maxAmount}`}
                                                        {event.payment.type === "variable" && "Variable"}
                                                        {!event.payment.type && "TBD"}
                                                    </p>
                                                </div>

                                                {event.payment.timeline && (
                                                    <div className="flex items-start gap-3 p-3">
                                                        <Clock className="size-5 text-tertiary shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium text-primary">Payment Timeline</p>
                                                            <p className="text-sm text-tertiary capitalize">
                                                                {event.payment.timeline.replace(/_/g, " ")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-secondary">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400">
                                            <InfoCircle className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">Other Details</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-secondary">Entry Type</span>
                                            <Badge size="md" color="gray" className="capitalize">
                                                {event.entryType?.replace(/_/g, " ") || "Open"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-secondary">Campaign Status</span>
                                            <Badge size="md" color={statusColor(event.status)}>
                                                {formatStatusLabel(event.status)}
                                            </Badge>
                                        </div>
                                        {event.code && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-secondary">Invite Code</span>
                                                <span className="font-mono font-medium text-primary bg-secondary px-2 py-1 rounded">
                                                    {event.code}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === "shortlisted" ? (
                        <ShortlistedTab 
                            eventCode={event.code} 
                            targetCount={event.creatorCountNeeded} 
                            doClientApprovalNeeded={event.doClientApprovalNeeded}
                        />
                    ) : activeTab === "replacement" ? (
                        <StatusApplicationTab 
                            eventCode={event.code} 
                            status="replaced" 
                            title="Replacement Requests" 
                            description="Candidates that you have requested to replace will appear here."
                            targetCount={event.creatorCountNeeded}
                            showProgress={false}
                        />
                    ) : activeTab === "invited" ? (
                        <ApprovedProfilesTab eventCode={event.code} />
                    ) : activeTab === "report" ? (
                        <ReportTab eventCode={event.code} />
                    ) : (
                        <ApplicantsTab eventCode={event.code} />
                    )}
                </div>
            </div>
            {copiedToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[min(92vw,640px)] rounded-2xl bg-secondary px-6 py-4 text-lg font-semibold text-primary shadow-2xl ring-1 ring-secondary_alt">
                    {copiedToast}
                </div>
            )}
            <UploadBannerModal
                isOpen={isUploadBannerOpen}
                onClose={() => setIsUploadBannerOpen(false)}
                eventCode={event.code || ""}
            />
        </section>
    );
}

function StatusApplicationTab({ 
    eventCode, 
    status, 
    title, 
    description,
    targetCount = 0,
    showProgress = false
}: { 
    eventCode?: string | null; 
    status: string;
    title: string;
    description: string;
    targetCount?: number;
    showProgress?: boolean;
}) {
    const { token } = useAuth();
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedApplicantIds, setSelectedApplicantIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const getAppId = (app: any) => {
        return app.applicationId || app._id || app.id || app.application?._id || app.appId || app.application_id || "";
    };

    const totalPages = Math.ceil(applicants.length / itemsPerPage);
    const paginatedApplicants = applicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedApplicantIds(applicants.map(app => getAppId(app)).filter(Boolean));
        } else {
            setSelectedApplicantIds([]);
        }
    };

    const handleSelectOne = (id: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedApplicantIds(prev => [...prev, id]);
        } else {
            setSelectedApplicantIds(prev => prev.filter(selectedId => selectedId !== id));
        }
    };

    const handleBulkAction = async () => {
        if (selectedApplicantIds.length === 0) return;
        setIsSubmitting(true);
        try {
            // Default to 'approve' (invite) for shortlisted
            // For replaced, maybe also 'approve' (re-invite?)
            const endpoint = `/events/public/code/${eventCode}/applications/approve`;
            await api.post(endpoint, { applicationIds: selectedApplicantIds }, { token });

            alert(`Successfully approved ${selectedApplicantIds.length} candidates`);
            setApplicants(prev => prev.filter(a => !selectedApplicantIds.includes(getAppId(a))));
            setSelectedApplicantIds([]);
        } catch (e) {
            console.error("Failed to approve candidates", e);
            alert("Failed to approve candidates");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        let alive = true;
        const fetchApplicants = async () => {
            try {
                if (!eventCode || !token) {
                    setLoading(false);
                    return;
                }
                const res = await api.get<{ success: boolean; data: { applications: any[] } }>(
                    `/events/public/code/${eventCode}/applications?status=${status}`,
                    { token }
                );
                if (!alive) return;
                setApplicants(res.data?.applications || []);
            } catch (e) {
                console.error(`Failed to fetch ${status} applicants`, e);
                setError(true);
            } finally {
                if (alive) setLoading(false);
            }
        };

        fetchApplicants();
        const interval = setInterval(fetchApplicants, 5000);

        return () => { 
            alive = false;
            clearInterval(interval);
        };
    }, [eventCode, token, status]);

    if (loading) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!eventCode) {
         return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">This event does not have an invite code.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">Unable to load applicants at this time.</p>
            </div>
        );
    }

    if (applicants.length === 0) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <Users01 className="mx-auto size-8 text-tertiary mb-3" />
                <h3 className="text-md font-semibold text-primary">{title}</h3>
                <p className="mt-1 text-sm text-tertiary">
                    {description}
                </p>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col gap-6">
            {showProgress && targetCount > 0 && (
                <div className="flex items-center gap-4 rounded-xl bg-primary p-4 ring-1 ring-secondary shadow-xs">
                    <div className="flex-1">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div 
                                className="h-full bg-brand-solid transition-all duration-500" 
                                style={{ width: `${Math.min((applicants.length / targetCount) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-sm font-medium text-secondary whitespace-nowrap">
                        {applicants.length} out of {targetCount} profiles
                    </span>
                </div>
            )}
            {/* Debug helper - remove after fixing */}
           
            
            {/* Floating Action Button */}
            {selectedApplicantIds.length > 0 && (
                <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 lg:pl-[300px]">
                    <Button
                        size="md"
                        color="primary"
                        onClick={handleBulkAction}
                        isLoading={isSubmitting}
                        className="shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-200"
                        iconLeading={CheckCircle}
                    >
                        Approve {selectedApplicantIds.length} candidate{selectedApplicantIds.length > 1 ? "s" : ""}
                    </Button>
                </div>
            )}
            
            {/* Mobile View - Cards */}
            <div className="md:hidden flex flex-col gap-4">
                <div className="flex items-center justify-between bg-primary p-4 rounded-xl border border-secondary shadow-sm">
                     <Checkbox
                        isSelected={applicants.length > 0 && selectedApplicantIds.length === applicants.length}
                        isIndeterminate={selectedApplicantIds.length > 0 && selectedApplicantIds.length < applicants.length}
                        onChange={(isSelected) => handleSelectAll(isSelected)}
                    >
                        <span className="text-sm font-medium text-primary ml-2">Select All</span>
                    </Checkbox>
                </div>

                {paginatedApplicants.map((app, i) => {
                    const appId = getAppId(app);
                    const isSelected = selectedApplicantIds.includes(appId);
                    return (
                        <div 
                            key={appId || i} 
                            className={`bg-primary p-4 rounded-xl border border-secondary shadow-sm flex flex-col gap-4 transition-colors ${isSelected ? "ring-2 ring-brand-solid" : ""}`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Checkbox
                                            isSelected={isSelected}
                                            onChange={(checked) => {
                                                if (appId) handleSelectOne(appId, checked);
                                            }}
                                            isDisabled={!appId}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={app.user?.avatarUrl || "/avatar.svg"} 
                                            alt="" 
                                            className="h-10 w-10 rounded-full object-cover bg-secondary"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-primary">{app.user?.name || "Unknown"}</span>
                                            <span className="text-xs text-tertiary">@{app.user?.username}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge size="sm" color={
                                    app.status === "shortlisted" ? "orange" : 
                                    app.status === "invited" ? "success" : 
                                    app.status === "approved" ? "success" : 
                                    app.status === "rejected" ? "error" : 
                                    app.status === "replaced" ? "warning" :
                                    "purple"
                                }>
                                    {app.status === "replaced" ? "Replacement Req." : (app.status || "Applied")}
                                </Badge>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2 border-t border-secondary">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Category</span>
                                    <span className="font-medium text-primary">
                                        {app.user?.category ? <Badge size="sm" color="gray">{app.user.category}</Badge> : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Date</span>
                                    <span className="text-primary">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Instagram</span>
                                    {app.instagramHandle ? (
                                        <a 
                                            href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-solid hover:underline truncate"
                                        >
                                            @{app.instagramHandle}
                                        </a>
                                    ) : "—"}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Phone</span>
                                    {(app.user?.phone || app.user?.whatsapp) ? (
                                        <a 
                                            href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                            className="text-brand-solid hover:underline truncate"
                                        >
                                            {app.user?.phone || app.user?.whatsapp}
                                        </a>
                                    ) : "—"}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="flex flex-col gap-2 pt-2 border-t border-secondary">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-tertiary">Willing to Attend</span>
                                    {app.willingToAttend ? (
                                        <div className="flex items-center gap-1.5 text-success">
                                            <Check className="size-3" />
                                            <span className="text-sm font-medium">Yes</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-tertiary">No</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-tertiary">Dashboard Shared</span>
                                    <div className="flex items-center gap-2">
                                        {app.shareProfessionalDashboard ? (
                                            <Badge size="sm" color="success">Yes</Badge>
                                        ) : (
                                            <span className="text-sm text-tertiary">No</span>
                                        )}
                                        {app.dashboardImageUrl && (
                                            <a 
                                                href={app.dashboardImageUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium text-brand-solid hover:underline"
                                            >
                                                View
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="hidden md:block rounded-xl bg-primary ring-1 ring-secondary shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary text-tertiary">
                            <tr>
                                <th className="px-4 py-3 w-10">
                                    <Checkbox 
                                        isSelected={applicants.length > 0 && selectedApplicantIds.length === applicants.length}
                                        isIndeterminate={selectedApplicantIds.length > 0 && selectedApplicantIds.length < applicants.length}
                                        onChange={(isSelected) => handleSelectAll(isSelected)}
                                    />
                                </th>
                                <th className="px-4 py-3 font-medium">Candidate</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Instagram</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Willing to Attend</th>
                                <th className="px-4 py-3 font-medium">Dashboard</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary">
                            {paginatedApplicants.map((app, i) => {
                                const appId = getAppId(app);
                                const isSelected = selectedApplicantIds.includes(appId);
                                return (
                                <tr key={appId || i} className={`hover:bg-primary_hover transition-colors ${isSelected ? "bg-primary_hover" : ""}`}>
                                    <td className="px-4 py-3">
                                        <Checkbox 
                                            isSelected={isSelected}
                                            onChange={(checked) => {
                                                if (appId) handleSelectOne(appId, checked);
                                            }}
                                            isDisabled={!appId}
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-primary">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={app.user?.avatarUrl || "/avatar.svg"} 
                                                alt="" 
                                                className="h-8 w-8 rounded-full object-cover bg-secondary"
                                            />
                                            <div className="flex flex-col">
                                                <span>{app.user?.name || "Unknown"}</span>
                                                <span className="text-xs text-tertiary font-normal">@{app.user?.username}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.user?.category ? (
                                            <Badge size="sm" color="gray">{app.user.category}</Badge>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.instagramHandle ? (
                                            <a 
                                                href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary hover:underline"
                                            >
                                                @{app.instagramHandle}
                                            </a>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {(app.user?.phone || app.user?.whatsapp) ? (
                                            <a 
                                                href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                                className="hover:text-primary hover:underline whitespace-nowrap"
                                            >
                                                {app.user?.phone || app.user?.whatsapp}
                                            </a>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.willingToAttend ? (
                                            <div className="flex items-center gap-1.5 text-success">
                                                <Check className="size-3" />
                                                <span>Yes</span>
                                            </div>
                                        ) : (
                                            <span className="text-tertiary">No</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-tertiary">Shared:</span>
                                                {app.shareProfessionalDashboard ? (
                                                    <Badge size="sm" color="success">Yes</Badge>
                                                ) : (
                                                    <span className="text-xs">No</span>
                                                )}
                                            </div>
                                            {app.dashboardImageUrl && (
                                                <a 
                                                    href={app.dashboardImageUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-medium text-brand-solid hover:underline flex items-center gap-1"
                                                >
                                                    View Screenshot
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge size="sm" color={
                                            app.status === "shortlisted" ? "orange" : 
                                            app.status === "invited" ? "success" : 
                                            app.status === "approved" ? "success" : 
                                            app.status === "rejected" ? "error" : 
                                            app.status === "replaced" ? "warning" :
                                            "purple"
                                        }>
                                            {app.status === "replaced" ? "Replacement Req." : (app.status || "Applied")}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-secondary pt-4">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <Button
                            size="sm"
                            color="secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <p className="text-sm text-tertiary flex items-center">
                            Page {currentPage} of {totalPages}
                        </p>
                        <Button
                            size="sm"
                            color="secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-tertiary">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, applicants.length)}</span> of <span className="font-medium">{applicants.length}</span> results
                            </p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} // StatusApplicationTab End

function ShortlistedTab({ eventCode, doClientApprovalNeeded }: { eventCode?: string | null; targetCount?: number; doClientApprovalNeeded?: boolean }) {
    const { token } = useAuth();
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedApplicantIds, setSelectedApplicantIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        let alive = true;
        const fetchApplicants = async () => {
            try {
                if (!eventCode || !token) {
                    setLoading(false);
                    return;
                }
                const res = await api.get<{ success: boolean; data: { applications: any[] } }>(
                    `/events/public/code/${eventCode}/applications?status=shortlisted`,
                    { token }
                );
                if (!alive) return;
                setApplicants(res.data?.applications || []);
            } catch (e) {
                console.error("Failed to fetch shortlisted applicants", e);
                setError(true);
            } finally {
                if (alive) setLoading(false);
            }
        };

        fetchApplicants();
        const interval = setInterval(fetchApplicants, 5000);

        return () => { 
            alive = false;
            clearInterval(interval);
        };
    }, [eventCode, token]);

    // Derived state for pagination
    const totalPages = Math.ceil(applicants.length / itemsPerPage);
    const paginatedApplicants = applicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
        if (!applicationId) return;
        try {
            if (newStatus === "invited") {
                await api.post(`/events/public/code/${eventCode}/applications/approve`, { applicationIds: [applicationId] }, { token });
            } else if (newStatus === "replaced") {
                await api.post(`/events/public/code/${eventCode}/applications/replace`, { applicationIds: [applicationId] }, { token });
            } else {
                await api.patch(`/events/applications/${applicationId}`, { status: newStatus }, { token });
            }
            setApplicants(prev => prev.filter(a => a.applicationId !== applicationId));
            setSelectedApplicantIds(prev => prev.filter(id => id !== applicationId));
        } catch (e) {
            console.error("Failed to update status", e);
            alert("Failed to update status");
        }
    };

    const handleBulkAction = async (action: 'approve' | 'replace') => {
        if (selectedApplicantIds.length === 0) return;
        setIsSubmitting(true);
        try {
            const endpoint = action === 'approve'
                ? `/events/public/code/${eventCode}/applications/approve`
                : `/events/public/code/${eventCode}/applications/replace`;

            await api.post(endpoint, { applicationIds: selectedApplicantIds }, { token });

            setApplicants(prev => prev.filter(a => !selectedApplicantIds.includes(a.applicationId)));
            setSelectedApplicantIds([]);
        } catch (e) {
            console.error(`Failed to ${action} candidates`, e);
            alert(`Failed to ${action} candidates`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleSelection = (id: string) => {
        setSelectedApplicantIds(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedApplicantIds(applicants.map(a => a.applicationId));
        } else {
            setSelectedApplicantIds([]);
        }
    };

    if (loading) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!eventCode) {
         return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">This event does not have an invite code.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">Unable to load shortlisted applicants at this time.</p>
            </div>
        );
    }

    if (applicants.length === 0) {
        return (
            <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                    <Users01 className="mx-auto size-8 text-tertiary mb-3" />
                    <h3 className="text-md font-semibold text-primary">No shortlisted candidates yet</h3>
                    <p className="mt-1 text-sm text-tertiary">
                        Candidates you shortlist will appear here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col gap-6">
            {/* Action Bar */}
            {doClientApprovalNeeded === false && selectedApplicantIds.length > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-primary p-2 rounded-lg ring-1 ring-secondary shadow-xs sticky top-0 z-10">
                    <span className="text-sm font-medium text-primary px-2">
                        {selectedApplicantIds.length} selected
                    </span>
                    <div className="hidden sm:block h-4 w-px bg-secondary mx-2" />
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                            size="sm" 
                            color="secondary"
                            onClick={() => handleBulkAction('approve')}
                            disabled={isSubmitting}
                            className="flex-1 sm:flex-none"
                        >
                            Approve Selected
                        </Button>
                        <Button 
                            size="sm" 
                            color="secondary"
                            onClick={() => handleBulkAction('replace')}
                            disabled={isSubmitting}
                            className="flex-1 sm:flex-none"
                        >
                            Replace Selected
                        </Button>
                    </div>
                </div>
            )}

            {/* Mobile View - Cards */}
            <div className="md:hidden flex flex-col gap-4">
                {doClientApprovalNeeded === false && (
                    <div className="flex items-center justify-between bg-primary p-4 rounded-xl border border-secondary shadow-sm">
                        <Checkbox
                            isSelected={applicants.length > 0 && selectedApplicantIds.length === applicants.length}
                            isIndeterminate={selectedApplicantIds.length > 0 && selectedApplicantIds.length < applicants.length}
                            onChange={(isSelected) => toggleAll(isSelected)}
                        >
                            <span className="text-sm font-medium text-primary ml-2">Select All</span>
                        </Checkbox>
                    </div>
                )}

                {paginatedApplicants.map((app, i) => {
                    const isSelected = selectedApplicantIds.includes(app.applicationId);
                    return (
                        <div 
                            key={app.applicationId || i} 
                            className={`bg-primary p-4 rounded-xl border border-secondary shadow-sm flex flex-col gap-4 transition-colors ${isSelected ? "ring-2 ring-brand-solid" : ""}`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    {doClientApprovalNeeded === false && (
                                        <div className="mt-1">
                                            <Checkbox
                                                isSelected={isSelected}
                                                onChange={() => toggleSelection(app.applicationId)}
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={app.user?.avatarUrl || "/avatar.svg"} 
                                            alt="" 
                                            className="h-10 w-10 rounded-full object-cover bg-secondary"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-primary">{app.user?.name || "Unknown"}</span>
                                            <span className="text-xs text-tertiary">@{app.user?.username}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge size="sm" color={
                                    app.status === "shortlisted" ? "orange" : 
                                    app.status === "invited" ? "success" : 
                                    app.status === "approved" ? "success" : 
                                    app.status === "rejected" ? "error" : 
                                    "purple"
                                }>
                                    {app.status || "Applied"}
                                </Badge>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2 border-t border-secondary">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Category</span>
                                    <span className="font-medium text-primary">
                                        {app.user?.category ? <Badge size="sm" color="gray">{app.user.category}</Badge> : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Date</span>
                                    <span className="text-primary">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Instagram</span>
                                    {app.instagramHandle ? (
                                        <a 
                                            href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-solid hover:underline truncate"
                                        >
                                            @{app.instagramHandle}
                                        </a>
                                    ) : "—"}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Phone</span>
                                    {(app.user?.phone || app.user?.whatsapp) ? (
                                        <a 
                                            href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                            className="text-brand-solid hover:underline truncate"
                                        >
                                            {app.user?.phone || app.user?.whatsapp}
                                        </a>
                                    ) : "—"}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="flex flex-col gap-2 pt-2 border-t border-secondary">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-tertiary">Willing to Attend</span>
                                    {app.willingToAttend ? (
                                        <div className="flex items-center gap-1.5 text-success">
                                            <Check className="size-3" />
                                            <span className="text-sm font-medium">Yes</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-tertiary">No</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-tertiary">Dashboard Shared</span>
                                    <div className="flex items-center gap-2">
                                        {app.shareProfessionalDashboard ? (
                                            <Badge size="sm" color="success">Yes</Badge>
                                        ) : (
                                            <span className="text-sm text-tertiary">No</span>
                                        )}
                                        {app.dashboardImageUrl && (
                                            <a 
                                                href={app.dashboardImageUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium text-brand-solid hover:underline"
                                            >
                                                View
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {doClientApprovalNeeded === false && (
                                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-secondary">
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={() => handleStatusUpdate(app.applicationId, "invited")}
                                        className="w-full justify-center"
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={() => handleStatusUpdate(app.applicationId, "replaced")}
                                        className="w-full justify-center"
                                    >
                                        Replace
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block rounded-xl bg-primary ring-1 ring-secondary shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary text-tertiary">
                            <tr>
                                {doClientApprovalNeeded === false && (
                                    <th className="px-4 py-3 w-10">
                                        <Checkbox 
                                            isSelected={applicants.length > 0 && selectedApplicantIds.length === applicants.length}
                                            isIndeterminate={selectedApplicantIds.length > 0 && selectedApplicantIds.length < applicants.length}
                                            onChange={(isSelected) => toggleAll(isSelected)}
                                        />
                                    </th>
                                )}
                                <th className="px-4 py-3 font-medium">Candidate</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Instagram</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Willing to Attend</th>
                                <th className="px-4 py-3 font-medium">Dashboard</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                {doClientApprovalNeeded === false && (
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary">
                            {paginatedApplicants.map((app, i) => (
                                <tr key={i} className="hover:bg-primary_hover transition-colors">
                                    {doClientApprovalNeeded === false && (
                                        <td className="px-4 py-3">
                                            <Checkbox 
                                                isSelected={selectedApplicantIds.includes(app.applicationId)}
                                                onChange={() => toggleSelection(app.applicationId)}
                                            />
                                        </td>
                                    )}
                                    <td className="px-4 py-3 font-medium text-primary">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={app.user?.avatarUrl || "/avatar.svg"} 
                                                alt="" 
                                                className="h-8 w-8 rounded-full object-cover bg-secondary"
                                            />
                                            <div className="flex flex-col">
                                                <span>{app.user?.name || "Unknown"}</span>
                                                <span className="text-xs text-tertiary font-normal">@{app.user?.username}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.user?.category ? (
                                            <Badge size="sm" color="gray">{app.user.category}</Badge>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.instagramHandle ? (
                                            <a 
                                                href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary hover:underline"
                                            >
                                                @{app.instagramHandle}
                                            </a>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {(app.user?.phone || app.user?.whatsapp) ? (
                                            <a 
                                                href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                                className="hover:text-primary hover:underline whitespace-nowrap"
                                            >
                                                {app.user?.phone || app.user?.whatsapp}
                                            </a>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.willingToAttend ? (
                                            <div className="flex items-center gap-1.5 text-success">
                                                <Check className="size-3" />
                                                <span>Yes</span>
                                            </div>
                                        ) : (
                                            <span className="text-tertiary">No</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-tertiary">Shared:</span>
                                                {app.shareProfessionalDashboard ? (
                                                    <Badge size="sm" color="success">Yes</Badge>
                                                ) : (
                                                    <span className="text-xs">No</span>
                                                )}
                                            </div>
                                            {app.dashboardImageUrl && (
                                                <a 
                                                    href={app.dashboardImageUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-medium text-brand-solid hover:underline flex items-center gap-1"
                                                >
                                                    View Screenshot
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge size="sm" color={
                                            app.status === "shortlisted" ? "orange" : 
                                            app.status === "invited" ? "success" : 
                                            app.status === "approved" ? "success" : 
                                            app.status === "rejected" ? "error" : 
                                            "purple"
                                        }>
                                            {app.status || "Applied"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}
                                    </td>
                                    {doClientApprovalNeeded === false && (
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    onClick={() => handleStatusUpdate(app.applicationId, "invited")}
                                                    title="Approve"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    onClick={() => handleStatusUpdate(app.applicationId, "replaced")}
                                                    title="Replace"
                                                >
                                                    Replace
                                                </Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-secondary pt-4">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <Button
                            size="sm"
                            color="secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <p className="text-sm text-tertiary flex items-center">
                            Page {currentPage} of {totalPages}
                        </p>
                        <Button
                            size="sm"
                            color="secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-tertiary">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, applicants.length)}</span> of <span className="font-medium">{applicants.length}</span> results
                            </p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ApprovedProfilesTab({ eventCode }: { eventCode?: string | null }) {
    const { token } = useAuth();
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showWorkOpen, setShowWorkOpen] = useState(false);
    const [selectedUserForWork, setSelectedUserForWork] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const getAppId = (app: any) => {
        return app.applicationId || app._id || app.id || app.application?._id || app.appId || app.application_id || "";
    };

    const totalPages = Math.ceil(applicants.length / itemsPerPage);
    const paginatedApplicants = applicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedIds(applicants.map(app => getAppId(app)).filter(Boolean));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        let alive = true;
        const fetchApplicants = async () => {
            try {
                if (!eventCode || !token) {
                    setLoading(false);
                    return;
                }
                const res = await api.get<{ success: boolean; data: { applications: any[] } }>(
                    `/events/public/code/${eventCode}/applications?status=invited`,
                    { token }
                );
                if (!alive) return;
                setApplicants(res.data?.applications || []);
            } catch (e) {
                console.error("Failed to fetch approved applicants", e);
                setError(true);
            } finally {
                if (alive) setLoading(false);
            }
        };

        fetchApplicants();
        const interval = setInterval(fetchApplicants, 5000);

        return () => { 
            alive = false;
            clearInterval(interval);
        };
    }, [eventCode, token]);

    if (loading) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!eventCode) {
         return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">This event does not have an invite code.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">Unable to load approved profiles at this time.</p>
            </div>
        );
    }

    if (applicants.length === 0) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <Users01 className="mx-auto size-8 text-tertiary mb-3" />
                <h3 className="text-md font-semibold text-primary">No approved profiles yet</h3>
                <p className="mt-1 text-sm text-tertiary">
                    Candidates you approve will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col gap-6">
            {/* Mobile View - Cards */}
            <div className="md:hidden flex flex-col gap-4">
                {paginatedApplicants.map((app, i) => {
                    const appId = getAppId(app);
                    return (
                    <div 
                        key={appId || i} 
                        className="bg-primary p-4 rounded-xl border border-secondary shadow-sm flex flex-col gap-4 transition-colors"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={app.user?.avatarUrl || "/avatar.svg"} 
                                        alt="" 
                                        className="h-10 w-10 rounded-full object-cover bg-secondary"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-primary">{app.user?.name || "Unknown"}</span>
                                        <span className="text-xs text-tertiary">@{app.user?.username}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge size="sm" color="success">Invited</Badge>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2 border-t border-secondary">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-tertiary">Instagram</span>
                                {app.instagramHandle ? (
                                    <a 
                                        href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-solid hover:underline truncate"
                                    >
                                        @{app.instagramHandle}
                                    </a>
                                ) : "—"}
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-tertiary">Phone</span>
                                {(app.user?.phone || app.user?.whatsapp) ? (
                                    <a 
                                        href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                        className="text-brand-solid hover:underline truncate"
                                    >
                                        {app.user?.phone || app.user?.whatsapp}
                                    </a>
                                ) : "—"}
                            </div>
                            <div className="col-span-2 flex flex-col gap-1">
                                <span className="text-xs text-tertiary">Attendance</span>
                                {app.checkedIn ? (
                                    <div className="flex items-center gap-1.5 text-success">
                                        <CheckCircle className="size-4 text-success-primary fill-success-primary" />
                                        <span className="font-medium text-success-primary">Checked In {app.checkedInAt && `at ${new Date(app.checkedInAt).toLocaleTimeString()}`}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-tertiary">
                                        <XCircle className="size-4" />
                                        <span>Not yet checked in</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-2 border-t border-secondary">
                            {app.taskCompletion && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-tertiary">Task Completion</span>
                                     <Button
                                        size="md"
                                        color="secondary"
                                        className="w-full justify-center"
                                        iconLeading={File04}
                                        onClick={() => {
                                            setSelectedUserForWork(app.user?._id || app.user?.id);
                                            setShowWorkOpen(true);
                                        }}
                                    >
                                        Show Work
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    );
                })}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block rounded-xl bg-primary ring-1 ring-secondary shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary text-tertiary">
                            <tr>
                                <th className="px-4 py-3 font-medium">Candidate</th>
                                <th className="px-4 py-3 font-medium">Instagram</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Attended Event</th>
                                <th className="px-4 py-3 font-medium">Task Completion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary">
                            {paginatedApplicants.map((app, i) => {
                                const appId = getAppId(app);
                                return (
                                <tr key={appId || i} className="hover:bg-primary_hover transition-colors">
                                    <td className="px-4 py-3 font-medium text-primary">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={app.user?.avatarUrl || "/avatar.svg"} 
                                                alt="" 
                                                className="h-8 w-8 rounded-full object-cover bg-secondary"
                                            />
                                            <div className="flex flex-col">
                                                <span>{app.user?.name || "Unknown"}</span>
                                                <span className="text-xs text-tertiary font-normal">@{app.user?.username}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {app.instagramHandle ? (
                                            <a 
                                                href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary hover:underline"
                                            >
                                                @{app.instagramHandle}
                                            </a>
                                        ) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-tertiary">
                                        {(app.user?.phone || app.user?.whatsapp) ? (
                                            <a 
                                                href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                                className="hover:text-primary hover:underline whitespace-nowrap"
                                            >
                                                {app.user?.phone || app.user?.whatsapp}
                                            </a>
                                        ) : "—"}
                                    </td>
                                    {/* Attended Event */}
                                    <td className="px-4 py-3 text-tertiary">
                                        <div className="flex items-center gap-2">
                                            {app.checkedIn ? (
                                                <div className="flex flex-col gap-1">
                                                     <div className="flex items-center gap-1.5 text-success">
                                                        <CheckCircle className="size-4 text-success-primary fill-success-primary" />
                                                        <span className="font-medium text-success-primary">Checked In</span>
                                                    </div>
                                                    {app.checkedInAt && (
                                                        <span className="text-xs text-tertiary">
                                                            {new Date(app.checkedInAt).toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-tertiary">
                                                    <XCircle className="size-4" />
                                                    <span className="text-sm">Not yet</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    {/* Task Completion */}
                                    <td className="px-4 py-3 text-tertiary">
                                        <div className="flex items-center gap-2">
                                            {app.taskCompletion ? (
                                                 <Button
                                                    size="sm"
                                                    color="secondary"
                                                    iconLeading={File04}
                                                    onClick={() => {
                                                        setSelectedUserForWork(app.user?._id || app.user?.id);
                                                        setShowWorkOpen(true);
                                                    }}
                                                >
                                                    Show Work
                                                </Button>
                                            ) : (
                                                <span className="text-tertiary text-sm">Not yet uploaded</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-secondary pt-4">
                    <Button
                        size="sm"
                        color="secondary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-tertiary">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        size="sm"
                        color="secondary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            <ShowWorkModal
                isOpen={showWorkOpen}
                onClose={() => setShowWorkOpen(false)}
                eventCode={eventCode || ""}
                userId={selectedUserForWork || ""}
            />
        </div>
    );
}

function ApplicantsTab({ eventCode }: { eventCode?: string | null }) {
    const { token } = useAuth();
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getAppId = (app: any) => {
        return app.applicationId || app._id || app.id || app.application?._id || app.appId || app.application_id || "";
    };

    const totalPages = Math.ceil(applicants.length / itemsPerPage);
    const paginatedApplicants = applicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedIds(applicants.map(app => getAppId(app)).filter(Boolean));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        let alive = true;
        const fetchApplicants = async () => {
            try {
                if (!eventCode || !token) {
                    setLoading(false);
                    return;
                }
                const res = await api.get<{ success: boolean; data: { applications: any[] } }>(
                    `/events/public/code/${eventCode}/applications?status=applied`,
                    { token }
                );
                if (!alive) return;
                setApplicants(res.data?.applications || []);
            } catch (e) {
                console.error("Failed to fetch applicants", e);
                setError(true);
            } finally {
                if (alive) setLoading(false);
            }
        };

        fetchApplicants();
        const interval = setInterval(fetchApplicants, 5000);

        return () => { 
            alive = false;
            clearInterval(interval);
        };
    }, [eventCode, token]);

    if (loading) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!eventCode) {
         return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">This event does not have an invite code.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <p className="text-tertiary">Unable to load applicants at this time.</p>
            </div>
        );
    }

    if (applicants.length === 0) {
        return (
            <div className="rounded-xl bg-primary p-8 text-center ring-1 ring-secondary shadow-xs">
                <Users01 className="mx-auto size-8 text-tertiary mb-3" />
                <h3 className="text-md font-semibold text-primary">No applicants yet</h3>
                <p className="mt-1 text-sm text-tertiary">
                    Share your campaign link to start getting applications.
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            {selectedIds.length > 0 && (
                <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 lg:pl-[300px]">
                    <Button
                        size="md"
                        color="primary"
                        onClick={async () => {
                            try {
                                await api.post(
                                    `/events/public/code/${eventCode}/applications/shortlist`,
                                    { applicationIds: selectedIds },
                                    { token }
                                );
                                alert(`Successfully shortlisted ${selectedIds.length} applicants`);
                                setSelectedIds([]);
                                // Refresh list to reflect status changes if needed, 
                                // but for now we just clear selection.
                                // You might want to trigger a re-fetch here.
                            } catch (e) {
                                console.error("Failed to shortlist", e);
                                alert("Failed to shortlist applicants");
                            }
                        }}
                        className="shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-200"
                        iconLeading={UserPlus01}
                    >
                        Shortlist {selectedIds.length} profile{selectedIds.length > 1 ? "s" : ""}
                    </Button>
                </div>
            )}
            
            
            {/* Mobile View - Cards */}
            <div className="md:hidden flex flex-col gap-4">
                <div className="flex items-center justify-between bg-primary p-4 rounded-xl border border-secondary shadow-sm">
                     <Checkbox
                        isSelected={applicants.length > 0 && selectedIds.length === applicants.length}
                        isIndeterminate={selectedIds.length > 0 && selectedIds.length < applicants.length}
                        onChange={(isSelected) => handleSelectAll(isSelected)}
                    >
                        <span className="text-sm font-medium text-primary ml-2">Select All</span>
                    </Checkbox>
                </div>

                {paginatedApplicants.map((app, i) => {
                    const appId = getAppId(app);
                    const isSelected = selectedIds.includes(appId);
                    return (
                        <div 
                            key={appId || i} 
                            className={`bg-primary p-4 rounded-xl border border-secondary shadow-sm flex flex-col gap-4 transition-colors ${isSelected ? "ring-2 ring-brand-solid" : ""}`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Checkbox
                                            isSelected={isSelected}
                                            onChange={(checked) => {
                                                if (appId) handleSelectOne(appId, checked);
                                            }}
                                            isDisabled={!appId}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={app.user?.avatarUrl || "/avatar.svg"} 
                                            alt="" 
                                            className="h-10 w-10 rounded-full object-cover bg-secondary"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-primary">{app.user?.name || "Unknown"}</span>
                                            <span className="text-xs text-tertiary">@{app.user?.username}</span>
                                            {app.user?.shortBio && (
                                                <span className="text-xs text-tertiary truncate max-w-[150px]">
                                                    {app.user.shortBio}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Badge size="sm" color={
                                    app.status === "shortlisted" ? "orange" : 
                                    app.status === "invited" ? "success" : 
                                    app.status === "approved" ? "success" : 
                                    app.status === "rejected" ? "error" : 
                                    "purple"
                                }>
                                    {app.status || "Applied"}
                                </Badge>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2 border-t border-secondary">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Category</span>
                                    <span className="font-medium text-primary">
                                        {app.user?.category ? <Badge size="sm" color="gray">{app.user.category}</Badge> : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Date</span>
                                    <span className="text-primary">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Instagram</span>
                                    {app.instagramHandle ? (
                                        <a 
                                            href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-solid hover:underline truncate"
                                        >
                                            @{app.instagramHandle}
                                        </a>
                                    ) : "—"}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-tertiary">Phone</span>
                                    {(app.user?.phone || app.user?.whatsapp) ? (
                                        <a 
                                            href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                            className="text-brand-solid hover:underline truncate"
                                        >
                                            {app.user?.phone || app.user?.whatsapp}
                                        </a>
                                    ) : "—"}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="flex flex-col gap-2 pt-2 border-t border-secondary">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-tertiary">Willing to Attend</span>
                                    {app.willingToAttend ? (
                                        <div className="flex items-center gap-1.5 text-success">
                                            <Check className="size-3" />
                                            <span className="text-sm font-medium">Yes</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-tertiary">No</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-tertiary">Dashboard Shared</span>
                                    <div className="flex items-center gap-2">
                                        {app.shareProfessionalDashboard ? (
                                            <Badge size="sm" color="success">Yes</Badge>
                                        ) : (
                                            <span className="text-sm text-tertiary">No</span>
                                        )}
                                        {app.dashboardImageUrl && (
                                            <a 
                                                href={app.dashboardImageUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium text-brand-solid hover:underline"
                                            >
                                                View
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block rounded-xl bg-primary ring-1 ring-secondary shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary text-tertiary">
                            <tr>
                                <th className="px-4 py-3 w-10">
                                    <Checkbox
                                        isSelected={applicants.length > 0 && selectedIds.length === applicants.length}
                                        isIndeterminate={selectedIds.length > 0 && selectedIds.length < applicants.length}
                                        onChange={(isSelected) => handleSelectAll(isSelected)}
                                        aria-label="Select all applicants"
                                    />
                                </th>
                                <th className="px-4 py-3 font-medium">Candidate</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Instagram</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Willing to Attend</th>
                                <th className="px-4 py-3 font-medium">Dashboard</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary">
                            {paginatedApplicants.map((app, i) => {
                                const appId = getAppId(app);
                                const isSelected = selectedIds.includes(appId);
                                return (
                                    <tr 
                                        key={appId || i} 
                                        className={`transition-colors ${isSelected ? "bg-brand-primary hover:bg-brand-secondary" : "hover:bg-primary_hover"}`}
                                        style={isSelected ? {
                                            '--color-bg-brand-primary': 'var(--color-brand-50)',
                                            '--color-bg-brand-secondary': 'var(--color-brand-100)',
                                            '--color-text-primary': 'var(--color-gray-900)',
                                            '--color-text-tertiary': 'var(--color-gray-500)',
                                            '--color-text-secondary': 'var(--color-gray-700)',
                                            '--color-bg-secondary': 'var(--color-gray-50)',
                                        } as CSSProperties : undefined}
                                    >

                                        <td className="px-4 py-3">
                                            <Checkbox
                                                isSelected={isSelected}
                                                onChange={(checked) => {
                                                    if (appId) handleSelectOne(appId, checked);
                                                }}
                                                isDisabled={!appId}
                                                aria-label={`Select ${app.user?.name || "applicant"}`}
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-primary">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={app.user?.avatarUrl || "/avatar.svg"} 
                                                    alt="" 
                                                    className="h-8 w-8 rounded-full object-cover bg-secondary"
                                                />
                                                <div className="flex flex-col">
                                                    <span>{app.user?.name || "Unknown"}</span>
                                                    <span className="text-xs text-tertiary font-normal">@{app.user?.username}</span>
                                                    {app.user?.shortBio && (
                                                        <span className="text-xs text-tertiary font-normal truncate max-w-[150px]" title={app.user.shortBio}>
                                                            {app.user.shortBio}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-tertiary">
                                            {app.user?.category ? (
                                                <Badge size="sm" color="gray">{app.user.category}</Badge>
                                            ) : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-tertiary">
                                            {app.instagramHandle ? (
                                                <a 
                                                    href={app.instagramUrl || `https://instagram.com/${app.instagramHandle}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary hover:underline"
                                                >
                                                    @{app.instagramHandle}
                                                </a>
                                            ) : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-tertiary">
                                            {(app.user?.phone || app.user?.whatsapp) ? (
                                                <a 
                                                    href={`tel:${app.user?.phone || app.user?.whatsapp}`}
                                                    className="hover:text-primary hover:underline whitespace-nowrap"
                                                >
                                                    {app.user?.phone || app.user?.whatsapp}
                                                </a>
                                            ) : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-tertiary">
                                            {app.willingToAttend ? (
                                                <div className="flex items-center gap-1.5 text-success">
                                                    <Check className="size-3" />
                                                    <span>Yes</span>
                                                </div>
                                            ) : (
                                                <span className="text-tertiary">No</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-tertiary">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-tertiary">Shared:</span>
                                                    {app.shareProfessionalDashboard ? (
                                                        <Badge size="sm" color="success">Yes</Badge>
                                                    ) : (
                                                        <span className="text-xs">No</span>
                                                    )}
                                                </div>
                                                {app.dashboardImageUrl && (
                                                    <a 
                                                        href={app.dashboardImageUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-medium text-brand-solid hover:underline flex items-center gap-1"
                                                    >
                                                        View Screenshot
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge size="sm" color={
                                                app.status === "shortlisted" ? "orange" : 
                                                app.status === "invited" ? "success" : 
                                                app.status === "approved" ? "success" : 
                                                app.status === "rejected" ? "error" : 
                                                "purple"
                                            }>
                                                {app.status || "Applied"}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-tertiary">
                                            {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

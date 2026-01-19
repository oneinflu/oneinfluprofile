"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MarkerPin01, Users01, Share04, Check, UserPlus01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { useClipboard } from "@/hooks/use-clipboard";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Checkbox } from "@/components/base/checkbox/checkbox";

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
    deliverables?: any[];
    payment?: any;
};

export default function CampaignDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, token } = useAuth();
    const id = String(params?.id || "");
    const [event, setEvent] = useState<EventDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"details" | "applicants" | "shortlisted">("details");
    const clipboard = useClipboard();
    const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";

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
                                <div className="flex items-center gap-2">
                                    <div className="hidden md:block text-sm text-tertiary">
                                        Invite Code: <span className="font-mono text-primary">{event.code}</span>
                                    </div>
                                    <ButtonUtility
                                        size="sm"
                                        color="secondary"
                                        icon={clipboard.copied === `campaign-${event._id}` ? Check : Share04}
                                        onClick={() => {
                                            const path = event.status === "approved_by_client"
                                                ? `/events/invite/${encodeURIComponent(String(event.code))}`
                                                : `/events/${encodeURIComponent(String(event.code))}`;
                                            const url = `${origin}${path}`;
                                            clipboard.copy(url, `campaign-${event._id}`);
                                        }}
                                        tooltip="Copy Link"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8 flex items-center gap-6 border-b border-secondary">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`pb-3 text-sm font-semibold transition-colors ${
                                activeTab === "details"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("applicants")}
                            className={`pb-3 text-sm font-semibold transition-colors ${
                                activeTab === "applicants"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Applicants
                        </button>
                        <button
                            onClick={() => setActiveTab("shortlisted")}
                            className={`pb-3 text-sm font-semibold transition-colors ${
                                activeTab === "shortlisted"
                                    ? "border-b-2 border-brand-solid text-brand-solid"
                                    : "text-tertiary hover:text-primary"
                            }`}
                        >
                            Shortlisted by me
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    {activeTab === "details" ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl bg-primary p-5 ring-1 ring-secondary shadow-xs md:col-span-2">
                                <h3 className="mb-4 text-lg font-semibold text-primary">Event Details</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="size-5 text-tertiary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-primary">Date & Time</p>
                                            <p className="text-sm text-tertiary">{formatEventDate(event.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MarkerPin01 className="size-5 text-tertiary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-primary">Location</p>
                                            <p className="text-sm text-tertiary">
                                                {[event.venue, event.city].filter(Boolean).join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Users01 className="size-5 text-tertiary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-primary">Creators Required</p>
                                            <p className="text-sm text-tertiary">{event.creatorCountNeeded || 0} creators</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {event.creatorCriteria && (
                                    <div className="mt-6 border-t border-secondary pt-4">
                                        <h4 className="mb-3 text-sm font-medium text-primary">Criteria</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {event.creatorCriteria.minFollowers ? (
                                                <Badge size="md" color="gray">
                                                    {event.creatorCriteria.minFollowers}+ Followers
                                                </Badge>
                                            ) : null}
                                            {event.creatorCriteria.city && (
                                                <Badge size="md" color="gray">
                                                    {event.creatorCriteria.city}
                                                </Badge>
                                            )}
                                            {event.creatorCriteria.niches?.map((n) => (
                                                <Badge key={n} size="md" color="gray">
                                                    {n}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="rounded-xl bg-primary p-5 ring-1 ring-secondary shadow-xs">
                                    <h3 className="mb-4 text-lg font-semibold text-primary">Deliverables</h3>
                                    {event.deliverables && event.deliverables.length > 0 ? (
                                        <ul className="flex flex-col gap-3">
                                            {event.deliverables.map((d, i) => (
                                                <li key={i} className="flex items-center justify-between text-sm">
                                                    <span className="text-tertiary capitalize">
                                                        {d.quantity}x {d.platform} {d.type}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-tertiary">No deliverables specified</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ApplicantsTab eventCode={event.code} />
                    )}
                </div>
            </div>
        </section>
    );
}

function ApplicantsTab({ eventCode }: { eventCode?: string | null }) {
    const { token } = useAuth();
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedIds(applicants.map(app => app.id || app._id));
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
        (async () => {
            try {
                if (!eventCode || !token) {
                    setLoading(false);
                    return;
                }
                const res = await api.get<{ success: boolean; data: { applications: any[] } }>(
                    `/events/public/code/${eventCode}/applications`,
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
        })();
        return () => { alive = false; };
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
                        onClick={() => {
                            // TODO: Implement shortlist action
                            console.log("Shortlisting:", selectedIds);
                        }}
                        className="shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-200"
                    >
                        <UserPlus01 className="mr-2 size-5" />
                        Shortlist {selectedIds.length} profile{selectedIds.length > 1 ? "s" : ""}
                    </Button>
                </div>
            )}
            
            <div className="rounded-xl bg-primary ring-1 ring-secondary shadow-xs overflow-hidden">
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
                        {applicants.map((app, i) => (
                            <tr key={i} className={`transition-colors ${selectedIds.includes(app.id || app._id) ? "bg-brand-primary hover:bg-brand-secondary" : "hover:bg-primary_hover"}`}>
                                <td className="px-4 py-3">
                                    <Checkbox
                                        isSelected={selectedIds.includes(app.id || app._id)}
                                        onChange={(isSelected) => handleSelectOne(app.id || app._id, isSelected)}
                                        aria-label={`Select ${app.user?.name || "applicant"}`}
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-primary">
                                    <div className="flex items-center gap-3">
                                        {app.user?.avatarUrl && (
                                            <img 
                                                src={app.user.avatarUrl} 
                                                alt="" 
                                                className="h-8 w-8 rounded-full object-cover bg-secondary"
                                            />
                                        )}
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
                                    <Badge size="sm" color={app.status === "approved" ? "success" : app.status === "rejected" ? "error" : "gray"}>
                                        {app.status || "Applied"}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3 text-tertiary">
                                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       </div> 
    );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { 
    Sun, 
    Moon01, 
    Calendar, 
    MarkerPin01, 
    User01, 
    Check, 
    Share04, 
    UsersPlus, 
    Star01,
    PieChart03,
    CheckDone01,
    Link02,
    LayoutAlt01,
    AlertCircle,
    PlayCircle,
    Tag01,
    ArrowRight
} from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Instagram, YouTube, X, TikTok, LinkedIn, Facebook } from "@/components/foundations/social-icons";
import { api } from "@/utils/api";
import { useClipboard } from "@/hooks/use-clipboard";

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
    dashboardAccessRequired?: boolean;
    qrCheckinRequired?: boolean;
    isGuestsAllowedplusone?: boolean;
    isLimitedMenu?: boolean;
    inhouseFoodandBeverages?: boolean;
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
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function EventInvitePage() {
    const params = useParams();
    const router = useRouter();
    const code = String((params as any)?.code || "");
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const clipboard = useClipboard();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!code) {
                    setLoading(false);
                    setError("Invalid invite link");
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
                setError(e?.message || "Unable to load invite");
                setEvent(null);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [code]);

    if (loading) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-[#F2F4F7] dark:bg-[#0C111D]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                </div>
            </section>
        );
    }

    if (!event || error) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-[#F2F4F7] dark:bg-[#0C111D] px-4">
                <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-[#161B26]">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Invite not found</h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {error ? String(error) : "This creator invite link may be incorrect or has been removed."}
                    </p>
                </div>
            </section>
        );
    }

    const deliverables = Array.isArray(event.deliverables) ? event.deliverables : [];
    const isDark = mounted && resolvedTheme === "dark";
    const themeLabel = isDark ? "Switch to light" : "Switch to dark";

    return (
        <main className="min-h-screen w-full bg-[#F2F4F7] dark:bg-[#0C111D] sm:py-8 flex items-center justify-center font-sans">
            {/* Theme Toggle */}
            {mounted && (
                <div className="fixed right-4 top-4 z-50">
                    <ButtonUtility
                        tooltip={themeLabel}
                        size="sm"
                        color="secondary"
                        className="bg-white/50 backdrop-blur-md shadow-sm dark:bg-black/50 border-none"
                        icon={isDark ? Sun : Moon01}
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                    />
                </div>
            )}

            {/* Mobile Pass / Ticket Container */}
            <div className="relative w-full max-w-md bg-white dark:bg-[#161B26] sm:rounded-[2rem] shadow-2xl overflow-hidden min-h-screen sm:min-h-0 sm:h-auto flex flex-col">
                
                {/* Top decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-90" />
                
                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col px-6 pt-12 pb-8">
                    
                    {/* Event Header Card */}
                    <div className="bg-white/90 dark:bg-[#1F242F]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-white/10 text-center mb-6">
                        <div className="inline-flex items-center justify-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 mb-4">
                            Apply for Invitation
                        </div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                            {event.brandName ? event.brandName : "EXCLUSIVE EVENT"}
                        </h2>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                            {event.eventName || "Special Event"}
                        </h1>
                        {event.eventType && (
                            <div className="flex justify-center mt-2">
                                <Badge size="sm" color={event.eventType === 'paid' ? 'success' : 'brand'}>
                                    {event.eventType === 'paid' ? 'Paid Collab' : 'Barter Collab'}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Ticket "Tear" Effect Line */}
                    <div className="relative flex items-center justify-between mb-6">
                        <div className="w-4 h-8 bg-[#F2F4F7] dark:bg-[#0C111D] rounded-r-full -ml-6" />
                        <div className="flex-1 border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-2" />
                        <div className="w-4 h-8 bg-[#F2F4F7] dark:bg-[#0C111D] rounded-l-full -mr-6" />
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-6">
                        {/* Time & Location */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                <Calendar className="w-6 h-6 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">When</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    {formatEventDate(event.date) || "TBA"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                <MarkerPin01 className="w-6 h-6 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Where</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    {[event.venue, event.city].filter(Boolean).join(", ") || "Location TBA"}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                <User01 className="w-6 h-6 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Guests</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                   {event.isGuestsAllowedplusone ? "+1 Allowed" : "No Guests"}
                                </p>
                            </div>
                        </div>

                        {/* Guest & Amenities */}
                       

                        {/* Deliverables Section */}
                        {deliverables.length > 0 && (
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-6 w-1 bg-purple-500 rounded-full" />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Deliverables & Requirements
                                    </h3>
                                </div>
                                
                                <div className="space-y-4">
                                    {deliverables.map((d, idx) => {
                                        const PlatformIcon = {
                                            instagram: Instagram,
                                            youtube: YouTube,
                                            x: X,
                                            tiktok: TikTok,
                                            linkedin: LinkedIn,
                                            facebook: Facebook,
                                            blog: LayoutAlt01
                                        }[d.platform] || Share04;

                                        return (
                                            <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
                                                {/* Card Header */}
                                                <div className="bg-gray-50/50 dark:bg-gray-800/50 p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm ring-1 ring-black/5">
                                                            <PlatformIcon className="w-5 h-5 text-gray-900 dark:text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white capitalize">
                                                                {d.platform} {d.type}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                                {d.quantity} {d.quantity > 1 ? "posts" : "post"} required
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {d.deadline && (
                                                        <Badge size="sm" color="warning" className="hidden sm:flex">
                                                            Due {d.deadline.kind === "during_event" ? "During Event" : 
                                                                 d.deadline.kind === "within_hours" ? `Within ${d.deadline.value}h` : 
                                                                 `Within ${d.deadline.value}d`}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Requirements Grid */}
                                                <div className="p-4 grid grid-cols-2 gap-3">
                                                    {d.deadline && (
                                                        <div className="sm:hidden flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                            <AlertCircle className="w-4 h-4 text-orange-500" />
                                                            <span>Due {d.deadline.kind === "during_event" ? "During Event" : 
                                                                 d.deadline.kind === "within_hours" ? `Within ${d.deadline.value}h` : 
                                                                 `Within ${d.deadline.value}d`}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {d.brandTagMandatory && (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            <Tag01 className="w-4 h-4 text-purple-500" />
                                                            <span>Brand Tag Required</span>
                                                        </div>
                                                    )}
                                                    
                                                    {d.locationTagMandatory && (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            <MarkerPin01 className="w-4 h-4 text-red-500" />
                                                            <span>Location Tag</span>
                                                        </div>
                                                    )}
                                                    
                                                    {d.hashtagsRequired && (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            <div className="w-4 h-4 flex items-center justify-center font-bold text-blue-500">#</div>
                                                            <span>Hashtags Required</span>
                                                        </div>
                                                    )}
                                                    
                                                    {d.brandMusicProvided && (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            <PlayCircle className="w-4 h-4 text-pink-500" />
                                                            <span>Use Brand Music</span>
                                                        </div>
                                                    )}
                                                    
                                                    {d.contentApprovalRequired && (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            <CheckDone01 className="w-4 h-4 text-green-500" />
                                                            <span>Approval Required</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Menu & Amenities Section */}
                        {(event.isLimitedMenu || event.inhouseFoodandBeverages) && (
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-5 border border-orange-100 dark:border-orange-900/20">
                                <h4 className="text-sm font-bold text-orange-800 dark:text-orange-200 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Star01 className="w-4 h-4" />
                                    Food & Dining
                                </h4>
                                <div className="space-y-2">
                                    {event.isLimitedMenu && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <PieChart03 className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">Limited Menu Available</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Special curated selection for guests</p>
                                            </div>
                                        </div>
                                    )}
                                    {event.inhouseFoodandBeverages && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <CheckDone01 className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">F&B Provided</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Complimentary food and beverages</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Payment Section (if Paid) */}
                        {event.eventType === "paid" && event.payment && (
                            <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-100 dark:border-green-900/20">
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Compensation</p>
                                <p className="text-lg font-bold text-green-700 dark:text-green-300">
                                    {event.payment.type === "fixed" ? `₹${event.payment.minAmount?.toLocaleString()}` : 
                                     event.payment.type === "range" ? `₹${event.payment.minAmount?.toLocaleString()} – ₹${event.payment.maxAmount?.toLocaleString()}` : "Variable"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-auto pt-8">
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                           By Proceeding you are agreeing to the terms and conditions of host
                        </p>
                        
                        <div className="flex gap-2 justify-center">
                            <Button
                                size="lg"
                                color="primary"
                                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl"
                                onClick={() => router.push("/register")}
                                iconLeading={ArrowRight}
                            >
                                Apply for Invitation
                            </Button>
                        </div>
                        
                        <p className="text-center text-[10px] text-gray-300 dark:text-gray-600 mt-4 uppercase tracking-widest">
                            Powered by INFLU
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}

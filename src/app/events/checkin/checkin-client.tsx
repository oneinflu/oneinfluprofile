"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NextImage from "next/image";
import Confetti from "react-confetti";
import { 
    X, 
    ArrowRight,
    User01,
    Building02,
    LayoutAlt01,
    Share04,
    CheckDone01,
    PieChart03,
    MusicNote01,
    FileCheck02,
    Hash02,
    MarkerPin01,
    Tag01
} from "@untitledui/icons";
import { Instagram as InstagramIcon, YouTube, X as XIcon, TikTok, LinkedIn, Facebook as FacebookIcon } from "@/components/foundations/social-icons";
import { api } from "@/utils/api";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

type CheckInResponse = {
    success: boolean;
    status: string;
    message?: string;
    data?: {
        guestName?: string;
        avatarUrl?: string;
        application: {
            _id: string;
            checkedIn: boolean;
            checkedInAt: string;
            // Add other fields if needed
        };
        event: {
            _id: string;
            code: string;
            eventName?: string;
            venue?: string;
            city?: string;
            date?: string;
            brandName?: string;
            user?: {
                name: string;
            };
            isLimitedMenu?: boolean;
            inhouseFoodandBeverages?: boolean;
            deliverables?: Array<{
                platform: "instagram" | "youtube" | "x" | "blog";
                type: "reel" | "story" | "post" | "short" | "video";
                quantity: number;
                deadline: { kind: "during_event" | "within_hours" | "within_days" | "scheduled_date"; value: number | null; date?: string };
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
    };
};

export default function CheckinClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const [eventCode, setEventCode] = useState(searchParams?.get("eventCode") || "");
    const [inviteCode, setInviteCode] = useState(searchParams?.get("inviteCode") || "");
    const [verifying, setVerifying] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error" | "denied">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [successData, setSuccessData] = useState<CheckInResponse["data"] & { isRestored?: boolean } | null>(null);
    const [deniedData, setDeniedData] = useState<{ guestName?: string; event?: any } | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // 3D Tilt Effect State (for Holographic Card)
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Check Auth & Persistence on Mount
    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("influu_token");
            if (!token) {
                // Not logged in
                setIsAuthenticated(false);
                setAuthLoading(false);
                return;
            }
            
            setIsAuthenticated(true);

            // Check if we have an eventCode to verify against
            const currentEventCode = eventCode || localStorage.getItem("last_event_code");
            
            if (currentEventCode && token) {
                try {
                    const res = await api.get<any>(`/events/public/code/${encodeURIComponent(currentEventCode)}/invitation/me`, { token });
                    const payload = res.data || res;
                    const myApplication = payload?.myApplication;
                    const event = payload?.event;

                    if (myApplication) {
                        const guestName = myApplication.user?.name || "Guest";
                        const avatarUrl = myApplication.user?.avatarUrl;
                        
                        // 1. If already checked in -> Show Success immediately (skip form)
                        if (myApplication.checkedIn) {
                             const data = {
                                 guestName,
                                 avatarUrl,
                                 application: myApplication,
                                 event: event || { code: currentEventCode },
                                 isRestored: true
                             };
                             setSuccessData(data);
                             setStatus("success");
                             
                             // Update persistence
                             const checkinData = {
                                eventCode: currentEventCode,
                                inviteCode: myApplication.inviteCode || "",
                                successData: data,
                                timestamp: new Date().toISOString()
                             };
                             localStorage.setItem("influu_checkin_verified", JSON.stringify(checkinData));
                        } 
                        // 2. If NOT checked in, but invited -> Show Form (allow user to verify)
                        else if (myApplication.status === 'invited' || myApplication.status === 'approved') {
                            // Stay on form (idle), wait for user to click Verify
                            // Ensure codes are set if available from invitation
                            if (myApplication.inviteCode && !inviteCode) {
                                setInviteCode(myApplication.inviteCode);
                            }
                        } 
                        // 3. If NOT invited -> Show Access Denied
                        else {
                            setDeniedData({
                                guestName,
                                event: event || { code: currentEventCode }
                            });
                            setStatus("denied");
                        }
                        
                        setAuthLoading(false);
                        return;
                    }
                } catch (e) {
                    console.error("Failed to fetch invitation status", e);
                    // Fallback to persisted data if API fails
                }
            }

            // Fallback: Check for persisted check-in
            const persistedCheckin = localStorage.getItem("influu_checkin_verified");
            if (persistedCheckin) {
                try {
                    const parsed = JSON.parse(persistedCheckin);
                    // Optional: You could add an expiry check here
                    if (parsed.successData) {
                        setSuccessData(parsed.successData);
                        setStatus("success");
                        // Also restore codes if needed
                        if (parsed.eventCode) setEventCode(parsed.eventCode);
                        if (parsed.inviteCode) setInviteCode(parsed.inviteCode);
                    }
                } catch (e) {
                    console.error("Failed to parse persisted checkin", e);
                    localStorage.removeItem("influu_checkin_verified");
                }
            }
            setAuthLoading(false);
        };
        init();

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [eventCode]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleVerify = async () => {
        if (!eventCode.trim()) {
            setErrorMessage("Please enter the event code");
            setStatus("error");
            return;
        }
        if (!inviteCode.trim()) {
            setErrorMessage("Please enter your invitation code");
            setStatus("error");
            return;
        }

        setVerifying(true);
        setErrorMessage("");
        
        try {
            const res = await api.post<CheckInResponse>("/events/checkin", {
                eventCode: eventCode.trim(),
                inviteCode: inviteCode.trim()
            });
            
            if (res.success) {
                if (res.data) {
                    setSuccessData(res.data);
                }
                setStatus("success");
                
                // Persist successful check-in
                if (res.data) {
                    const checkinData = {
                        eventCode: eventCode.trim(),
                        inviteCode: inviteCode.trim(),
                        successData: res.data,
                        timestamp: new Date().toISOString()
                    };
                    localStorage.setItem("influu_checkin_verified", JSON.stringify(checkinData));
                }
                localStorage.setItem("last_event_code", eventCode.trim());

            } else {
                setStatus("error");
                if (res.status === "invite_code_used") {
                    // Check if it's the current user who already used it
                    try {
                        const token = localStorage.getItem("influu_token");
                        if (token) {
                            const meRes = await api.get<any>(`/events/public/code/${encodeURIComponent(eventCode.trim())}/invitation/me`, { token });
                            const myApp = meRes.data?.myApplication || meRes.myApplication;
                            
                            if (myApp?.checkedIn) {
                                // It was me! Show success.
                                const data = {
                                    guestName: myApp.user?.name || "Guest",
                                    avatarUrl: myApp.user?.avatarUrl,
                                    application: myApp,
                                    event: meRes.data?.event || { code: eventCode.trim() },
                                    isRestored: true
                                };
                                setSuccessData(data);
                                setStatus("success");
                                return;
                            }
                        }
                    } catch (checkErr) {
                        console.error("Failed to re-check status", checkErr);
                    }
                    setErrorMessage(res.message || "Invite code already used for check-in");
                } else if (res.status === "invalid_invite_code") {
                    setErrorMessage(res.message || "Invalid invite code");
                } else {
                    setErrorMessage(res.message || "Verification failed");
                }
            }
        } catch (e: any) {
            console.error("Verification failed", e);
            setStatus("error");
            // Check if the error response has the specific status fields
            if (e.data) {
                const data = e.data;
                 if (data.status === "invite_code_used") {
                    // Check if it's the current user who already used it
                    try {
                        const token = localStorage.getItem("influu_token");
                        if (token) {
                            const meRes = await api.get<any>(`/events/public/code/${encodeURIComponent(eventCode.trim())}/invitation/me`, { token });
                            const myApp = meRes.data?.myApplication || meRes.myApplication;
                            
                            if (myApp?.checkedIn) {
                                const successD = {
                                    gvatarUrl: myApp.user?.avatarUrl,
                                    auestName: myApp.user?.name || "Guest",
                                    application: myApp,
                                    event: meRes.data?.event || { code: eventCode.trim() },
                                    isRestored: true
                                };
                                setSuccessData(successD);
                                setStatus("success");
                                return;
                            }
                        }
                    } catch (_) {}
                    setErrorMessage(data.message || "Invite code already used for check-in");
                } else if (data.status === "invalid_invite_code") {
                    setErrorMessage(data.message || "Invalid invite code");
                } else {
                    setErrorMessage(data.message || "Verification failed. Please try again.");
                }
            } else {
                 setErrorMessage(e.message || "Verification failed. Please try again.");
            }
        } finally {
            setVerifying(false);
        }
    };

    if (authLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center space-y-6 font-sans">
                <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <User01 className="h-8 w-8 text-white/50" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white">Authentication Required</h1>
                    <p className="text-gray-400 max-w-xs mx-auto">
                        You need to be logged in to access the event check-in system.
                    </p>
                </div>
                <Button 
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 font-semibold w-full max-w-[200px]"
                    onClick={() => router.push("/login")}
                >
                    Log In
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 overflow-y-auto relative flex flex-col font-sans">
            {/* Background for both states */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-brand-900/20 via-[#050505] to-[#050505]" />
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"/>
                {status === "success" && (
                    <>
                        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[150px]" />
                          </>
                )}
                {status === "denied" && (
                    <>
                        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[150px]" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
                    </>
                )}
                {status !== "success" && status !== "denied" && (
                    <>
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                    </>
                )}
            </div>

            {status === "success" && (
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                        numberOfPieces={120}
                        gravity={0.12}
                        colors={['#22c55e', '#ffffff', '#4ade80']}
                    />
                </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 w-full">
                <AnimatePresence mode="wait">
                    {status === "success" && successData ? (
                            <motion.div 
                                key="success-pass"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className="w-full max-w-md mx-auto space-y-6"
                            >
                                {/* 1. The Digital Access Pass */}
                                <div className="relative w-full bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                    {/* Shimmer Effect - Reduced Opacity */}
                                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[length:250%_100%] animate-shimmer pointer-events-none" />
                                    
                                    {/* Top Section: Identity & Status */}
                                    <div className="p-6 relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Verified</span>
                                            </div>
                                            <NextImage 
                                                src="/logo.svg" 
                                                alt="INFLU" 
                                                width={50}
                                                height={15}
                                                className="brightness-0 invert opacity-90" 
                                            />
                                        </div>

                                        <div className="flex items-center gap-5">
                                            <div className="relative shrink-0">
                                                <div className="h-20 w-20 rounded-2xl bg-[#1a1a1a] border border-white/10 overflow-hidden shadow-lg">
                                                    {successData.avatarUrl ? (
                                                        <NextImage 
                                                            src={successData.avatarUrl} 
                                                            alt={successData.guestName || "Guest"} 
                                                            width={80} 
                                                            height={80} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                            <User01 className="h-8 w-8 text-white/40" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-black p-1 rounded-full border-2 border-[#111]">
                                                    <CheckDone01 className="w-3 h-3" />
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-white leading-tight mb-1">
                                                    {successData.guestName || "Guest"}
                                                </h2>
                                                <p className="text-sm text-white/50 font-medium">Approved Guest</p>
                                                {successData.application?.checkedInAt && (
                                                    <p className="text-[10px] text-green-400/80 font-mono mt-1.5 flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-green-500/50" />
                                                        Checked in at {new Date(successData.application.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ticket Cutout Divider */}
                                    <div className="relative h-4 bg-[#0a0a0a]/30 my-2">
                                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-950" />
                                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-950" />
                                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-white/10" />
                                    </div>

                                    {/* Bottom Section: Event Context */}
                                    <div className="p-6 bg-white/[0.02]">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Event</p>
                                                <p className="text-sm font-bold text-white truncate">{successData.event.eventName}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Brand</p>
                                                <p className="text-sm font-medium text-white/80 truncate">{successData.event.brandName}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Host & Access Status */}
                                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Host</p>
                                                <p className="text-sm font-bold text-white truncate">{successData.event.user?.name || "Event Host"}</p>
                                            </div>
                                            <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 backdrop-blur-sm">
                                                <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-green-400">ACCESS GRANTED</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Deliverables (Compact List) */}
                                {successData.event.deliverables && successData.event.deliverables.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider px-1">Your Tasks</h3>
                                        <div className="grid gap-3">
                                            {successData.event.deliverables.map((d, idx) => {
                                                const PlatformIcon = {
                                                    instagram: InstagramIcon,
                                                    youtube: YouTube,
                                                    x: XIcon,
                                                    tiktok: TikTok,
                                                    linkedin: LinkedIn,
                                                    facebook: FacebookIcon,
                                                    blog: LayoutAlt01
                                                }[d.platform] || Share04;

                                                return (
                                                    <div key={idx} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 shrink-0">
                                                                <PlatformIcon className="w-5 h-5 text-white" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center justify-between mb-0.5">
                                                                    <p className="font-bold text-white capitalize text-sm">
                                                                        {d.platform} {d.type}
                                                                    </p>
                                                                    <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">
                                                                        x{d.quantity}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-gray-400 truncate">
                                                                    {d.deadline?.kind === "during_event" ? "Due during event" : "Deadline applies"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Requirements Tags */}
                                                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                                                            {d.brandTagMandatory && (
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5" title="Brand Tag Required">
                                                                    <Tag01 className="w-3 h-3 text-white/60" />
                                                                    <span className="text-[10px] font-medium text-white/60">Brand Tag</span>
                                                                </div>
                                                            )}
                                                            {d.hashtagsRequired && (
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5" title="Hashtags Required">
                                                                    <Hash02 className="w-3 h-3 text-white/60" />
                                                                    <span className="text-[10px] font-medium text-white/60">Hashtags</span>
                                                                </div>
                                                            )}
                                                            {d.locationTagMandatory && (
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5" title="Location Tag Required">
                                                                    <MarkerPin01 className="w-3 h-3 text-white/60" />
                                                                    <span className="text-[10px] font-medium text-white/60">Location</span>
                                                                </div>
                                                            )}
                                                            {d.brandMusicProvided && (
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5" title="Brand Music Provided">
                                                                    <MusicNote01 className="w-3 h-3 text-white/60" />
                                                                    <span className="text-[10px] font-medium text-white/60">Music</span>
                                                                </div>
                                                            )}
                                                            {d.contentApprovalRequired && (
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20" title="Content Approval Required">
                                                                    <FileCheck02 className="w-3 h-3 text-amber-500/80" />
                                                                    <span className="text-[10px] font-medium text-amber-500/80">Approval</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 3. Amenities (Compact Grid) */}
                                {(successData.event.isLimitedMenu || successData.event.inhouseFoodandBeverages) && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider px-1">Perks</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {successData.event.isLimitedMenu && (
                                                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 flex flex-col items-center text-center gap-2">
                                                    <div className="p-2 bg-orange-500/20 rounded-full text-orange-400">
                                                        <PieChart03 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-bold text-orange-200">Limited Menu</span>
                                                </div>
                                            )}
                                            {successData.event.inhouseFoodandBeverages && (
                                                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 flex flex-col items-center text-center gap-2">
                                                    <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-400">
                                                        <CheckDone01 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-bold text-emerald-200">F&B Included</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* Bottom Instruction */}
                                <div className="mt-12 pb-24 text-center">
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
                                        Please contact event support for help
                                    </p>
                                    <div className="mt-4 flex justify-center opacity-30 hover:opacity-100 transition-opacity duration-300">
                                         <div className="flex items-center gap-2">
                                             <span className="text-[9px] font-bold text-white tracking-widest">POWERED BY</span>
                                             <NextImage 
                                                src="/logo.svg" 
                                                alt="INFLU" 
                                                width={50} 
                                                height={16} 
                                                className="object-contain brightness-0 invert" 
                                            />
                                         </div>
                                    </div>
                                </div>
                        </motion.div>
                    ) : deniedData ? (
                         <motion.div 
                            key="denied"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                            className="relative z-10 w-full max-w-[380px] perspective-1000"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* The Holographic Card - RED */}
                            <motion.div
                                ref={cardRef}
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformStyle: "preserve-3d",
                                }}
                                className="relative w-full aspect-[3/5] rounded-[32px] bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/20 backdrop-blur-2xl shadow-2xl overflow-hidden group"
                            >
                                {/* Inner Content Wrapper */}
                                <div className="absolute inset-0 flex flex-col p-6 transform-style-3d">
                                    
                                    {/* Header: Status */}
                                    <div className="flex items-center justify-between mb-8 translate-z-20">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md">
                                            <span className="relative flex h-2 w-2">
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                            </span>
                                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Access Denied</span>
                                        </div>
                                        <NextImage 
                                            src="/logo.svg" 
                                            alt="INFLU" 
                                            width={40}
                                            height={12}
                                            className="opacity-50 brightness-0 invert" 
                                        />
                                    </div>

                                    {/* Middle: Identity */}
                                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 translate-z-40">
                                        
                                        {/* Profile Placeholder / Avatar */}
                                        <div className="relative group-hover:scale-105 transition-transform duration-500">
                                            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                                            <div className="relative h-28 w-28 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/20 p-1 flex items-center justify-center overflow-hidden">
                                                <div className="h-full w-full rounded-full bg-[#111] flex items-center justify-center">
                                                    <X className="h-10 w-10 text-white/40" />
                                                </div>
                                                {/* Scan Line Effect over Avatar - Red */}
                                                <motion.div 
                                                    animate={{ top: ["0%", "100%", "0%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="absolute left-0 right-0 h-1 bg-red-500/50 blur-[2px] shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                                />
                                            </div>
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-[#111]">
                                                NOT APPROVED
                                            </div>
                                        </div>

                                        {/* Name & Role */}
                                        <div className="space-y-2">
                                            <h1 className="text-3xl font-black text-white leading-none tracking-tight break-words drop-shadow-lg">
                                                {deniedData.guestName || "Guest"}
                                            </h1>
                                            <p className="text-sm text-white/50 font-medium uppercase tracking-widest">
                                                Access Not Granted
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer: Event Details */}
                                    <div className="mt-auto pt-6 border-t border-white/5 space-y-4 translate-z-30">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <Building02 className="h-5 w-5 text-white/60" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-0.5">Event</p>
                                                <p className="text-sm font-bold text-white truncate">{deniedData.event?.eventName || "Event Name"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-0.5">Host</p>
                                                <p className="text-xs font-medium text-white/80">{deniedData.event?.brandName || "Host"}</p>
                                            </div>
                                            {/* Mock Barcode/QR */}
                                            <div className="flex gap-0.5 opacity-40">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-1 h-8 bg-white rounded-full" />
                                                ))}
                                                <div className="w-2 h-8 bg-white rounded-full" />
                                                <div className="w-1 h-8 bg-white rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Holographic Shimmer Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_100%] animate-shimmer pointer-events-none" />
                            </motion.div>

                            {/* Bottom Instruction */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-8 text-center"
                            >
                                <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-medium">
                                    Please contact event support
                                </p>
                                <div className="mt-4 flex justify-center opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                                     <div className="flex items-center gap-2">
                                         <span className="text-[9px] font-bold text-white tracking-widest">POWERED BY</span>
                                         <NextImage 
                                            src="/logo.svg" 
                                            alt="INFLU" 
                                            width={60} 
                                            height={20} 
                                            className="object-contain brightness-0 invert" 
                                        />
                                     </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="checkin"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            className="w-full max-w-md space-y-8"
                        >
                            <div className="text-center space-y-8">
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-[#7F56D9] border border-white/10 backdrop-blur-xl shadow-2xl mb-2 p-5 ring-1 ring-white/5"
                                >
                                    <NextImage 
                                        src="/faviconwhite.png" 
                                        alt="INFLU" 
                                        width={80} 
                                        height={80} 
                                        className="w-full h-full object-contain drop-shadow-lg" 
                                    />
                                </motion.div>
                                <div>
                                    <h1 className="text-4xl font-black text-white tracking-tighter mb-3">
                                        Event Check-in
                                    </h1>
                                    <p className="text-white/50 text-lg font-medium">
                                        Enter your details to verify entry
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0A0A0A]/80 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl ring-1 ring-white/10 space-y-6 border border-white/5 relative overflow-hidden">
                                {/* Subtle Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">
                                            Event Code
                                        </label>
                                        <Input
                                            placeholder="EVENT CODE"
                                            value={eventCode}
                                            onChange={(val) => {
                                                setEventCode(String(val).toUpperCase());
                                                setStatus("idle");
                                                setErrorMessage("");
                                            }}
                                            inputClassName="!bg-transparent text-white text-center text-xl font-mono tracking-[0.2em] font-bold placeholder:text-white/10 focus:ring-0 border-none outline-none"
                                            wrapperClassName="h-16 rounded-2xl !bg-black/60 !ring-1 !ring-white/10 !shadow-none hover:!bg-black/80 hover:!ring-white/20 transition-all duration-300 focus-within:!ring-brand-500 focus-within:!bg-black/90"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">
                                            Invitation Code
                                        </label>
                                        <Input
                                            placeholder="INVITE CODE"
                                            value={inviteCode}
                                            onChange={(val) => {
                                                setInviteCode(String(val).toUpperCase());
                                                setStatus("idle");
                                                setErrorMessage("");
                                            }}
                                            inputClassName="!bg-transparent text-white text-center text-xl font-mono tracking-[0.2em] font-bold placeholder:text-white/10 focus:ring-0 border-none outline-none"
                                            wrapperClassName="h-16 rounded-2xl !bg-black/60 !ring-1 !ring-white/10 !shadow-none hover:!bg-black/80 hover:!ring-white/20 transition-all duration-300 focus-within:!ring-brand-500 focus-within:!bg-black/90"
                                        />
                                    </div>
                                    
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 rounded-lg bg-red-900/20 border border-red-900/50 flex items-center gap-2 text-red-400 text-sm justify-center"
                                        >
                                            <X className="h-4 w-4 shrink-0" />
                                            <span className="font-medium">{errorMessage}</span>
                                        </motion.div>
                                    )}
                                </div>

                                <Button
                                    size="xl"
                                    className="w-full justify-center text-lg font-bold shadow-lg shadow-brand-500/20 bg-brand-600 hover:bg-brand-500 text-white border-none h-16 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                    onClick={handleVerify}
                                    disabled={verifying || !inviteCode || !eventCode}
                                    iconTrailing={!verifying ? ArrowRight : undefined}
                                >
                                    {verifying ? "Verifying Access..." : "Verify Entry"}
                                </Button>
                            </div>
                            
                            {/* Footer */}
                            <div className="p-8 text-center z-10">
                                <div className="flex flex-col items-center justify-center gap-3 opacity-40 hover:opacity-60 transition-opacity">
                                    <p className="text-[10px] text-white uppercase tracking-[0.3em] font-bold">Powered by</p>
                                    <div className="relative h-6 w-24">
                                        <NextImage 
                                            src="/logo.svg" 
                                            alt="INFLU" 
                                            fill
                                            className="object-contain brightness-0 invert" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
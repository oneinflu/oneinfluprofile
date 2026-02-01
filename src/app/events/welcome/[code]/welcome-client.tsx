"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import jsQR from "jsqr";
import { 
    Map02, 
    Calendar, 
    Clock, 
    MarkerPin01, 
    Users01, 
    QrCode01, 
    X, 
    Check, 
    UserPlus01, 
    Camera01,
    ChevronDown,
    File04,
    Star01,
    Sun,
    Moon01,
    User01,
    CheckDone01,
    ArrowRight,
    Edit01,
    Copy01,
    Share04,
    AlertCircle
} from "@untitledui/icons";
import { api, ApiError } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { useClipboard } from "@/hooks/use-clipboard";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { PinInput } from "@/components/base/pin-input/pin-input";
import { cx } from "@/utils/cx";

type PublicEvent = {
    id?: string;
    user?: {
        _id: string;
        name: string;
        username?: string;
        shortBio?: string;
        avatarUrl?: string;
        category?: string;
    };
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
    payment?: {
        type?: "fixed" | "range" | "variable";
        minAmount?: number;
        maxAmount?: number;
        timeline?: "after_event" | "after_content_approval" | "after_posting_days" | string | null;
        invoiceRequired?: boolean;
        perCreator?: boolean;
    } | null;
    invitationBannerUrl?: string | null;
};

type UserInvitation = {
    applicationId: string;
    status: "invited" | "pending" | "rejected" | "checked_in";
    inviteCode?: string;
    checkedIn?: boolean;
    checkedInAt?: string | null;
    bringingPlusOne?: boolean;
    plusOneName?: string;
    plusOnePhone?: string;
    isInvitationShared?: boolean;
    taskCompletion?: boolean;
    appliedAt?: string;
    willingToAttend?: boolean;
    shareProfessionalDashboard?: boolean;
    dashboardImageUrl?: string;
    // Backward compatibility if needed, though we should prefer the new structure
    _id?: string;
    qrCode?: string;
    createdAt?: string;
    user?: string;
    event?: string;
};

export default function WelcomeClient({ fontClassName }: { fontClassName?: string }) {
    const params = useParams();
    const router = useRouter();
    const code = String(params?.code || "");
    const { theme, setTheme } = useTheme();
    const { token: authToken, setToken, logout } = useAuth();
    const { copied, copy } = useClipboard();
    
    const [mounted, setMounted] = useState(false);
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [invitation, setInvitation] = useState<UserInvitation | null>(null);
    const [loading, setLoading] = useState(true);
    const [invitationLoading, setInvitationLoading] = useState(false);
    
    // Auth State
    const [authStep, setAuthStep] = useState<"loading" | "phone" | "otp" | "view">("loading");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const [scanning, setScanning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // Guest State
    const [isGuestInvited, setIsGuestInvited] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [isUpdatingGuest, setIsUpdatingGuest] = useState(false);
    const [isEditingGuest, setIsEditingGuest] = useState(false);

    // Accordion State
    const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync Guest State with Invitation
    useEffect(() => {
        if (invitation) {
            setIsGuestInvited(invitation.bringingPlusOne || false);
            setGuestName(invitation.plusOneName || "");
            setGuestPhone(invitation.plusOnePhone || "");
        }
    }, [invitation]);

    // Fetch Event Details (Public)
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Using robust extraction logic from invite-client.tsx
                const path = `/events/public/code/${encodeURIComponent(code)}`;
                const res = await api.get<any>(path);
                
                const payload: any = res;
                const nextEvent: PublicEvent | null =
                    payload?.data?.event ||
                    payload?.data?.item ||
                    payload?.event ||
                    payload?.item ||
                    payload?.data ||
                    null;
                    
                setEvent(nextEvent);
            } catch (e) {
                console.error("Failed to fetch event", e);
            } finally {
                setLoading(false);
            }
        };
        if (code) fetchEvent();
    }, [code]);

    // Check Auth & Fetch Invitation
    const fetchInvitation = async (token: string) => {
        setInvitationLoading(true);
        try {
            const res = await api.get<any>(`/events/public/code/${encodeURIComponent(code)}/invitation/me`, { token });
            
            // Expected response: { success: true, data: { event: {}, myApplication: {} } }
            const payload = res.data || res;
            const myApp = payload?.myApplication;

            if (myApp) {
                 const normalizedInv: UserInvitation = {
                     applicationId: myApp.applicationId,
                     status: myApp.status,
                     inviteCode: myApp.inviteCode,
                     checkedIn: myApp.checkedIn,
                     checkedInAt: myApp.checkedInAt,
                     bringingPlusOne: myApp.bringingPlusOne,
                     plusOneName: myApp.plusOneName,
                     plusOnePhone: myApp.plusOnePhone,
                     isInvitationShared: myApp.isInvitationShared,
                     taskCompletion: myApp.taskCompletion,
                     appliedAt: myApp.appliedAt,
                     willingToAttend: myApp.willingToAttend,
                     shareProfessionalDashboard: myApp.shareProfessionalDashboard,
                     dashboardImageUrl: myApp.dashboardImageUrl,
                     // Map for backward compatibility if UI uses these
                     _id: myApp.applicationId,
                     qrCode: myApp.inviteCode,
                     createdAt: myApp.appliedAt || new Date().toISOString()
                 };
                 setInvitation(normalizedInv);
                 setAuthStep("view");
            } else {
                // If no application found in success response (unexpected based on spec, but safe fallback)
                setAuthStep("view");
            }
        } catch (e) {
            console.error("Failed to fetch invitation", e);
            if (e instanceof ApiError) {
                if (e.status === 401) {
                    // Unauthorized -> Needs login
                    setAuthStep("phone");
                    return;
                }
                if (e.status === 403) {
                    // Not Invited -> Show Invitation Required screen
                    setInvitation(null);
                    setAuthStep("view");
                    return;
                }
                if (e.status === 404) {
                    // Not Found (Event) or No Application -> Show Invitation Required screen
                    // If event not found, strictly we might want to clear event too, but usually code is valid if we loaded page
                    setInvitation(null);
                    setAuthStep("view");
                    return;
                }
            }
            // Default error fallback
            setAuthStep("view"); 
        } finally {
            setInvitationLoading(false);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            // Mock Logic for Testing
            if (code.includes("invited") && !code.includes("notinvited")) {
                setInvitation({
                    applicationId: "65a1b2c3d4e5f6g7h8i9j0k1",
                    status: "invited",
                    inviteCode: "982104",
                    appliedAt: new Date().toISOString(),
                    // Populate backward compat fields to be safe
                    _id: "65a1b2c3d4e5f6g7h8i9j0k1",
                    qrCode: "982104",
                    user: "usr_demo_456",
                    event: "evt_demo_123"
                });
                setAuthStep("view");
                return;
            } else if (code.includes("notinvited")) {
                setInvitation(null);
                setAuthStep("view");
                return;
            }

            const token = authToken || localStorage.getItem("influu_token");
            if (token) {
                await fetchInvitation(token);
            } else {
                setAuthStep("phone");
            }
        };
        if (mounted) initAuth();
    }, [authToken, mounted, code]);

    const handlePhoneSubmit = async () => {
        if (phoneNumber.length !== 10) {
            setPhoneError("Please enter a valid 10-digit phone number");
            return;
        }
        
        setPhoneError("");
        try {
            await api.post("/auth/register/phone/start-send", { phone: phoneNumber });
            setAuthStep("otp");
            setOtp("");
            setOtpError("");
        } catch (e: any) {
            setPhoneError(e.message || "Failed to send OTP. Please try again.");
        }
    };

    const handleOtpVerify = async () => {
        if (otp.length !== 6) {
            setOtpError("Please enter a valid 6-digit OTP");
            return;
        }

        setOtpError("");
        try {
            const res: any = await api.post("/auth/register/phone/otp/verify", { 
                phone: phoneNumber,
                code: otp 
            });

            const { token, user } = res.data;
            
            if (token) {
                setToken(token);
                // Also set in localStorage as fallback/redundancy if provider doesn't persist immediately
                const d = new Date();
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                document.cookie = `influu_token=${token};expires=${d.toUTCString()};path=/`;
                localStorage.setItem("influu_token", token);
                
                if (user?.id) localStorage.setItem("influu_user_id", user.id);
                if (user?.username) localStorage.setItem("influu_username", user.username);

                await fetchInvitation(token);
            }
        } catch (e: any) {
            setOtpError(e.message || "Invalid OTP. Please try again.");
        }
    };

    // QR Scanning Logic
    useEffect(() => {
        let animationFrameId: number;

        const scan = () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                if (!canvas) return;

                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {
                        console.log("QR Code found:", code.data);
                        // Assuming the scanned code is a URL to the checkin page
                        try {
                            const url = new URL(code.data);
                            if (event?.code) url.searchParams.set("eventCode", event.code);
                            if (invitation?.inviteCode) url.searchParams.set("inviteCode", invitation.inviteCode);
                            window.location.href = url.toString();
                        } catch (e) {
                            // If not a valid URL, just alert for now, or assume it's a code and append to base checkin URL?
                            // For now, robustly assume it's the checkin URL as per requirements
                            alert(`QR Code Scanned: ${code.data}`);
                        }
                        
                        stopCamera();
                        return; // Stop scanning loop
                    }
                }
            }
            if (scanning) {
                animationFrameId = requestAnimationFrame(scan);
            }
        };

        if (scanning) {
            animationFrameId = requestAnimationFrame(scan);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [scanning]);

    const startCamera = async () => {
        setScanning(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for video to play
                await videoRef.current.play();
            }
        } catch (err) {
            console.error("Camera error:", err);
            alert("Unable to access camera. Please ensure you have granted permissions.");
            setScanning(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setScanning(false);
    };

    const handleToggleGuest = async (isSelected: boolean) => {
        setIsGuestInvited(isSelected);
        if (isSelected) {
            setIsEditingGuest(true);
        } else {
            setIsUpdatingGuest(true);
            try {
                 const payload = {
                    bringingPlusOne: false,
                    plusOneName: "",
                    plusOnePhone: ""
                };
                await api.post(`/events/public/code/${event?.code}/invitation/me/guest`, payload, { token: authToken });
                setInvitation(prev => prev ? { ...prev, ...payload } : null);
                setGuestName("");
                setGuestPhone("");
            } catch (e) {
                console.error(e);
            } finally {
                setIsUpdatingGuest(false);
            }
        }
    };

    const handleGuestUpdate = async () => {
        if (!event?.code || !invitation) return;
        
        // Basic Validation
        if (isGuestInvited) {
            if (!guestName.trim()) {
                alert("Please enter guest name");
                return;
            }
            if (!guestPhone.trim() || guestPhone.length < 10) {
                alert("Please enter a valid guest phone number");
                return;
            }
        }

        setIsUpdatingGuest(true);
        try {
            const payload = {
                bringingPlusOne: isGuestInvited,
                plusOneName: isGuestInvited ? guestName : "",
                plusOnePhone: isGuestInvited ? guestPhone : ""
            };

            await api.post(`/events/public/code/${event.code}/invitation/me/guest`, payload, { token: authToken });
            
            // Update local invitation state
            setInvitation(prev => prev ? { ...prev, ...payload } : null);
            setIsEditingGuest(false);
            // alert("Guest details updated successfully!");
        } catch (e: any) {
            console.error("Failed to update guest", e);
            alert(e.message || "Failed to update guest details. Please try again.");
        } finally {
            setIsUpdatingGuest(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-solid border-t-transparent" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-tertiary">Event not found</p>
            </div>
        );
    }

    // New Full-Page "Not Invited" View
    if (authStep === "view" && !invitation) {
        return (
            <div className="min-h-screen bg-zinc-950 flex justify-center items-center">
                <div className="w-full max-w-md bg-gray-50 dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
                     <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-red-200/50 blur-[100px] dark:bg-red-900/30" />
                     <div className="absolute top-[40%] right-[10%] h-[300px] w-[300px] rounded-full bg-orange-200/50 blur-[80px] dark:bg-orange-900/20" />
                </div>

                 {mounted && (
                    <div className="absolute top-6 right-6 z-50">
                        <Button
                            size="md"
                            className="rounded-full bg-white/50 backdrop-blur-md dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 shadow-sm hover:scale-105 transition-transform"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            iconLeading={theme === 'dark' ? Sun : Moon01}
                        />
                    </div>
                )}
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="w-full max-w-md text-center relative z-10"
                >
                    <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 ring-8 ring-red-50 dark:ring-red-900/10"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            <X className="relative z-10 size-12 text-red-600 dark:text-red-400" strokeWidth={3} />
                        </motion.div>
                    </div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-3 text-display-sm font-bold text-gray-900 dark:text-white"
                    >
                        Invitation Required
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8 text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
                    >
                        This invitation is exclusively for selected guests. Unfortunately, your profile does not meet the requirements for <span className="font-semibold text-gray-900 dark:text-gray-200">{event.eventName}</span>.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none"
                    >
                        <Button 
                            size="lg"
                            className="w-full justify-center bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5"
                            onClick={() => router.push('/admin')}
                            iconLeading={ArrowRight}
                        >
                            Improve your profile here
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

    // Login View (Loading / Phone / OTP)
    if (authStep !== "view") {
        return (
            <div className="min-h-screen bg-zinc-950 flex justify-center items-center">
                <div className="w-full max-w-md min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-700 shadow-2xl">
                    {/* Premium Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-brand-100/20 via-transparent to-transparent dark:from-brand-900/20 dark:via-transparent dark:to-transparent" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[128px] animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05] invert dark:invert-0" />
                    
                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                </div>

                {mounted && (
                    <div className="absolute top-6 right-6 z-50">
                        <Button
                            size="md"
                            className="rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            iconLeading={theme === 'dark' ? Sun : Moon01}
                        />
                    </div>
                )}

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 20 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="text-center mb-12 space-y-4">
                         <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-brand-50 to-white dark:from-white/5 dark:to-white/0 border border-brand-100 dark:border-white/10 mb-4 shadow-xl dark:shadow-2xl ring-1 ring-white/50 dark:ring-white/5"
                         >
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30 text-white">
                                <User01 className="size-6" />
                            </div>
                         </motion.div>
                        <h1 className="text-4xl font-light text-gray-900 dark:text-white tracking-tight font-display">{event.eventName}</h1>
                        <p className="text-brand-600 dark:text-brand-200/60 font-medium tracking-[0.2em] text-xs uppercase">Exclusive Invitation</p>
                    </div>

                    <div className="relative group perspective-1000">
                        {/* Ambient Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-brand-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                        
                        <div className="relative rounded-[2rem] bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ring-1 ring-white/20 dark:ring-white/5">
                            {authStep === "loading" && (
                                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                                    <div className="relative">
                                        <div className="h-16 w-16 rounded-full border-2 border-brand-500/20" />
                                        <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
                                    </div>
                                    <p className="text-gray-500 dark:text-white/40 text-xs uppercase tracking-widest animate-pulse">Authenticating</p>
                                </div>
                            )}

                            {authStep === "phone" && (
                                <div className="space-y-10">
                                    <div className="text-center space-y-3">
                                        <h3 className="text-2xl font-light text-gray-900 dark:text-white">Welcome</h3>
                                        <p className="text-sm text-gray-500 dark:text-white/40 font-light">Enter your mobile number to continue</p>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="relative group/input">
                                            <Input
                                                type="tel"
                                                maxLength={10}
                                                inputMode="numeric"
                                                placeholder="000 000 0000"
                                                value={phoneNumber}
                                                onChange={(val) => {
                                                    if (/^\d*$/.test(String(val)) && String(val).length <= 10) {
                                                        setPhoneNumber(String(val));
                                                        if (String(val).length === 10) setPhoneError("");
                                                    }
                                                }}
                                                isInvalid={!!phoneError}
                                                inputClassName="bg-transparent border-0 border-b border-gray-200 dark:border-white/10 rounded-none px-0 py-3 text-center text-2xl tracking-widest font-light text-gray-900 dark:text-white placeholder:text-gray-200 dark:placeholder:text-white/5 focus:ring-0 focus:border-brand-500 transition-all duration-500"
                                                className="bg-transparent"
                                            />
                                            <div className="absolute bottom-0 left-0 w-full h-px bg-brand-500 scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500" />
                                        </div>
                                        {phoneError && (
                                            <motion.p 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center text-sm text-red-500 dark:text-red-400 font-medium"
                                            >
                                                {phoneError}
                                            </motion.p>
                                        )}
                                        <Button 
                                            size="lg" 
                                            className="w-full justify-center bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 border-0 shadow-lg shadow-gray-900/10 dark:shadow-white/10 py-3 text-base font-medium tracking-wide transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                                            onClick={handlePhoneSubmit}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {authStep === "otp" && (
                                <div className="space-y-10">
                                    <div className="text-center space-y-3">
                                        <h3 className="text-2xl font-light text-gray-900 dark:text-white">Verification</h3>
                                        <p className="text-sm text-gray-500 dark:text-white/40 font-light">Code sent to +91 {phoneNumber}</p>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="flex justify-center py-2">
                                            <PinInput>
                                                <PinInput.Group 
                                                    maxLength={6} 
                                                    className="flex gap-4 justify-center"
                                                    value={otp} 
                                                    onChange={(val) => {
                                                        setOtp(val);
                                                        if (val.length === 6) setOtpError("");
                                                    }}
                                                >
                                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                                        <PinInput.Slot 
                                                            key={index}
                                                            index={index} 
                                                            className="h-12 w-10 border-b-2 border-gray-200 dark:border-white/10 bg-transparent rounded-none text-gray-900 dark:text-white text-2xl font-light focus:border-brand-500 transition-all duration-300"
                                                        />
                                                    ))}
                                                </PinInput.Group>
                                            </PinInput>
                                        </div>
                                        {otpError && (
                                            <motion.p 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center text-sm text-red-500 dark:text-red-400 font-medium"
                                            >
                                                {otpError}
                                            </motion.p>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button 
                                                size="lg" 
                                                onClick={() => setAuthStep("phone")}
                                                className="w-full justify-center bg-transparent border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 py-3 font-medium"
                                            >
                                                Back
                                            </Button>
                                            <Button 
                                                size="lg" 
                                                className="w-full justify-center bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 border-0 shadow-lg shadow-gray-900/10 dark:shadow-white/10 py-3 font-medium tracking-wide transition-all duration-300 hover:scale-[1.02]"
                                                onClick={handleOtpVerify}
                                            >
                                                Verify
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-gray-400 dark:text-white/20 font-light tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity">
                            Powered by Influu
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

    const mapUrl = event.venue || event.city 
        ? `https://maps.google.com/maps?q=${encodeURIComponent(`${event.venue}, ${event.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        : null;

    return (
        <div className="min-h-screen bg-zinc-950 flex justify-center">
            <div className="w-full max-w-md bg-[#050505] text-white font-sans selection:bg-purple-500/30 pb-64 overflow-x-hidden min-h-screen relative shadow-2xl">
            {/* 1. TOP HERO SECTION */}
            <div className="relative h-[40vh] w-full overflow-hidden flex flex-col items-center justify-center text-center">
                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    {/* Dark Neon Gradient Base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-80" />
                    
                    {/* Event Banner / Vibe Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60"
                        style={{ 
                            backgroundImage: `url('${event.invitationBannerUrl || "/banner.webp"}')`,
                            filter: "blur(2px) contrast(1.1) brightness(0.8)"
                        }} 
                    />
                    
                    {/* Noise/Grain Texture for Premium Feel */}
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                    
                    {/* Gradient Fade at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="mb-2"
                    >
                        <span className="text-3xl md:text-4xl">🎉</span>
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                        You’re In!
                    </h2>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 tracking-tighter drop-shadow-lg mb-4 max-w-2xl leading-tight">
                        Welcome to {event.eventName}
                    </h1>

                    <div className="flex flex-col items-center gap-1 mb-6">
                        <p className="text-sm md:text-base text-gray-300 font-medium tracking-wide">
                            Hosted by <span className="text-white font-semibold">{event.user?.name || "Milie"}</span>
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                            Powered by INFLU
                        </p>
                    </div>

                    <div className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-green-400">Approved & Exclusive</span>
                    </div>
                </div>
            </div>

            {/* 2. TICKET & DETAILS SECTION */}
            <div className="relative z-20 max-w-md mx-auto px-4 -mt-8 space-y-6">
                
                {/* Ticket Section - Premium Floating Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative"
                >
                    <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-2xl ring-1 ring-white/10">
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex items-center gap-5 relative z-10">
                            {/* Left: Host Avatar with Gradient Ring */}
                            <div className="relative shrink-0">
                                <div className="h-16 w-16 rounded-full p-[2px] bg-gradient-to-br from-brand-400 to-purple-600">
                                    <div className="h-full w-full rounded-full border-2 border-[#09090b] overflow-hidden bg-zinc-800">
                                        {event?.user?.avatarUrl ? (
                                            <img src={event.user.avatarUrl} alt="Host" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-zinc-800 text-gray-500">
                                                <User01 className="size-6" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-[#09090b] uppercase tracking-wider">
                                    IN
                                </div>
                            </div>

                            {/* Right: Code & Actions */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                                        Invitation Code
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                        <CheckDone01 className="size-3" />
                                        <span>Approved</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copy(invitation?.inviteCode || "", "invite-code");
                                    }}
                                    className="group/btn flex items-center gap-3 text-left w-full"
                                >
                                    <span className="text-2xl font-mono font-bold text-white tracking-[0.15em] group-hover/btn:text-brand-200 transition-colors">
                                        {invitation?.inviteCode || "—"}
                                    </span>
                                    <div className="p-1.5 rounded-md bg-white/5 text-gray-500 group-hover/btn:bg-white/10 group-hover/btn:text-white transition-colors border border-white/5">
                                        {copied === "invite-code" ? (
                                            <CheckDone01 className="size-3.5 text-green-400" />
                                        ) : (
                                            <Copy01 className="size-3.5" />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Event Details - Clean & Skimmable */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl bg-[#09090b] border border-white/10 shadow-lg divide-y divide-white/5"
                >
                    {/* Venue */}
                    <div className="flex items-start gap-4 p-4">
                        <div className="p-2.5 rounded-xl bg-white/5 text-white shrink-0 border border-white/5">
                            <MarkerPin01 className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Venue</h3>
                            <p className="text-sm font-bold text-white leading-tight">{event.venue}</p>
                            {event.city && <p className="text-xs text-gray-400 mt-0.5">{event.city}</p>}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-start gap-4 p-4">
                        <div className="p-2.5 rounded-xl bg-white/5 text-white shrink-0 border border-white/5">
                            <Calendar className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date</h3>
                            <p className="text-sm font-bold text-white">
                                {event.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}
                            </p>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-4 p-4">
                        <div className="p-2.5 rounded-xl bg-white/5 text-white shrink-0 border border-white/5">
                            <Clock className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Entry Time</h3>
                            <p className="text-sm font-bold text-white">
                                {event.date ? new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'TBA'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* +1 Guest */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserPlus01 className="size-5 text-brand-400" />
                            <h3 className="font-display text-lg font-semibold text-gray-200">+1 Guest</h3>
                        </div>
                        <Toggle 
                            isSelected={isGuestInvited} 
                            onChange={handleToggleGuest}
                            isDisabled={isUpdatingGuest}
                            size="md"
                        />
                    </div>
                    
                    <AnimatePresence mode="wait">
                        {isGuestInvited && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                {isEditingGuest ? (
                                    <div className="rounded-2xl border border-white/10 bg-[#09090b] p-5 shadow-lg space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Guest Name</label>
                                            <Input 
                                                placeholder="Enter full name" 
                                                value={guestName}
                                                onChange={(val) => setGuestName(String(val))}
                                                inputClassName="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-500 rounded-xl"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                            <Input 
                                                placeholder="+1 (555) 000-0000" 
                                                type="tel"
                                                value={guestPhone}
                                                onChange={(val) => setGuestPhone(String(val))}
                                                inputClassName="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-500 rounded-xl"
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <Button 
                                                className="w-full justify-center bg-white text-black hover:bg-gray-200 border-0 rounded-xl font-semibold" 
                                                onClick={() => handleGuestUpdate()}
                                                disabled={isUpdatingGuest || !guestName || !guestPhone}
                                            >
                                                {isUpdatingGuest ? "Saving..." : "Save Guest Details"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent opacity-50" />
                                        
                                        <div className="relative flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-xl bg-brand-500/20 p-2.5 text-brand-400 border border-brand-500/20">
                                                    <User01 className="size-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-base leading-tight">{guestName}</h4>
                                                    <p className="text-sm text-gray-400 mt-0.5">{guestPhone}</p>
                                                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400 border border-green-500/20">
                                                        <CheckDone01 className="size-3" />
                                                        Confirmed
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                onClick={() => setIsEditingGuest(true)}
                                                className="shrink-0 bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white rounded-lg"
                                                iconLeading={Edit01}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.section>

                {/* Important Notes - Accordion */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="overflow-hidden rounded-2xl bg-[#09090b] border border-white/10"
                >
                    <button
                        onClick={() => setIsGuidelinesOpen(!isGuidelinesOpen)}
                        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-red-500/20 p-2 text-red-400">
                                <AlertCircle className="size-5" />
                            </div>
                            <span className="font-semibold text-gray-200">Entry Guidelines</span>
                        </div>
                        <ChevronDown 
                            className={cx(
                                "size-5 text-gray-500 transition-transform duration-300",
                                isGuidelinesOpen && "rotate-180"
                            )} 
                        />
                    </button>
                    <AnimatePresence initial={false}>
                        {isGuidelinesOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="border-t border-white/10 px-6 pb-6 pt-4">
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                            <span>Entry allowed only with approved pass</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                            <span>Carry valid ID for verification</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                            <span>Management reserves rights to admission</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                            <span>Re-entry not allowed once checked in</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Footer - Subtle Branding */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center justify-center space-y-1 py-8 text-center"
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
                        Powered by INFLU
                    </p>
                    <p className="text-xs text-white/20 font-serif italic tracking-wide">
                        One pass. Many experiences.
                    </p>
                </motion.div>

                {/* Sticky Footer Actions */}
                <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
                    <div className="w-full max-w-md pointer-events-auto relative space-y-3">
                        {/* Gradient Fade Overlay */}
                        <div className="absolute -inset-x-6 -bottom-6 -top-32 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pointer-events-none -z-10" />
                        
                        {/* 1. Main Action: Scan QR */}
                        <button
                            onClick={startCamera}
                            className="group relative w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                        >
                            {/* Brand Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600" />
                            
                            {/* Texture/Noise Overlay */}
                            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                            
                            {/* Content */}
                            <div className="relative flex flex-col items-center justify-center py-5 px-6">
                                <div className="flex items-center gap-3 mb-1.5">
                                    <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                                        <QrCode01 className="size-6 text-white" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-xl font-black text-white tracking-wide">SCAN ENTRY QR</span>
                                </div>
                                <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.2em]">
                                    Show this at the entrance
                                </span>
                            </div>
                        </button>

                        {/* 2. Secondary Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                size="lg"
                                color="secondary"
                                className="w-full justify-center bg-white/10 text-white hover:bg-white/20 border-white/10 backdrop-blur-md"
                                iconLeading={Map02}
                                onClick={() => {
                                    const query = encodeURIComponent(`${event.venue || ''} ${event.city || ''}`);
                                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                                }}
                            >
                                Get Directions
                            </Button>
                            <Button
                                size="lg"
                                color="secondary"
                                className="w-full justify-center bg-white/10 text-white hover:bg-white/20 border-white/10 backdrop-blur-md"
                                iconLeading={Share04}
                                onClick={async () => {
                                    const shareData = {
                                        title: event.eventName,
                                        text: `Join me at ${event.eventName}!`,
                                        url: window.location.href
                                    };
                                    if (navigator.share) {
                                        try {
                                            await navigator.share(shareData);
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    } else {
                                        copy(window.location.href, "share-link");
                                        alert("Link copied to clipboard!");
                                    }
                                }}
                            >
                                Share Pass
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Scanner Overlay */}
            <AnimatePresence>
                {scanning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-black"
                    >
                        <div className="relative flex-1">
                            <video 
                                ref={videoRef} 
                                className="h-full w-full object-cover" 
                                playsInline 
                                autoPlay 
                                muted 
                            />
                            <canvas ref={canvasRef} className="hidden" />
                            {/* Scanner Frame */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="h-64 w-64 rounded-3xl border-2 border-white/50 relative">
                                    <div className="absolute top-0 left-0 h-8 w-8 border-t-4 border-l-4 border-brand-solid rounded-tl-xl" />
                                    <div className="absolute top-0 right-0 h-8 w-8 border-t-4 border-r-4 border-brand-solid rounded-tr-xl" />
                                    <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-brand-solid rounded-bl-xl" />
                                    <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-brand-solid rounded-br-xl" />
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 right-0 p-8 text-center bg-gradient-to-b from-black/80 to-transparent">
                                <p className="text-white font-medium">Align QR code within frame</p>
                            </div>
                        </div>
                        <div className="bg-black p-8 pb-12 flex justify-center">
                            <Button 
                                size="lg" 
                                color="secondary" 
                                className="bg-white/10 text-white hover:bg-white/20 border-transparent"
                                iconLeading={X}
                                onClick={stopCamera}
                            >
                                Close Scanner
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
            </div>
    );
}
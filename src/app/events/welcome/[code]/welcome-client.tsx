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
    Edit01
} from "@untitledui/icons";
import { api, ApiError } from "@/utils/api";
import { useAuth } from "@/providers/auth";
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
                        alert(`QR Code Scanned: ${code.data}`);
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
        );
    }

    // Login View (Loading / Phone / OTP)
    if (authStep !== "view") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-700">
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
        );
    }

    const mapUrl = event.venue || event.city 
        ? `https://maps.google.com/maps?q=${encodeURIComponent(`${event.venue}, ${event.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        : null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 overflow-x-hidden">
             {/* Background Gradients */}
             <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[120px] dark:bg-brand-500/5" />
                <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-500/5" />
             </div>

            {/* Hero / Header */}
            <div className="relative h-[400px] w-full overflow-hidden lg:h-[500px] z-10">
                {mounted && (
                    <div className="absolute top-6 right-6 z-50">
                        <Button
                            size="md"
                            className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 shadow-lg transition-transform hover:scale-105"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            iconLeading={theme === 'dark' ? Sun : Moon01}
                        />
                    </div>
                )}
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/banner.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 lg:p-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mx-auto w-full max-w-2xl text-center"
                    >
                        <motion.div
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.2, duration: 0.5 }}
                             className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wide"
                        >
                            YOU ARE INVITED
                        </motion.div>
                        
                        <h1 className="text-display-md font-bold text-white md:text-display-lg drop-shadow-2xl tracking-tight">
                            {event.eventName}
                        </h1>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-white/90">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-md border border-white/10 shadow-lg"
                            >
                                <Calendar className="size-5 text-brand-300" />
                                <span className="font-medium">
                                    {event.date ? new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) : "Date TBA"}
                                </span>
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-md border border-white/10 shadow-lg"
                            >
                                <Clock className="size-5 text-brand-300" />
                                <span className="font-medium">
                                    {event.date ? new Date(event.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "Time TBA"}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 -mt-16 relative z-20 space-y-6">
                
                {/* Ticket Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800"
                >
                    {/* Ticket Visuals - Top Holes */}
                    <div className="absolute -left-3 top-20 h-6 w-6 rounded-full bg-gray-50 dark:bg-gray-950 z-10" />
                    <div className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-gray-50 dark:bg-gray-950 z-10" />
                    
                    <div className="border-b-2 border-dashed border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 px-6 py-6 text-center pb-8">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-tertiary">
                            OFFICIAL INVITATION
                        </h2>
                    </div>
                    
                    <div className="p-8 pt-10">
                        {invitation && (
                            <div className="text-center">
                                <div className="mb-4 text-display-lg font-mono font-bold tracking-widest text-brand-solid break-all">
                                    {invitation.inviteCode || invitation.applicationId.slice(-6).toUpperCase()}
                                </div>
                                <p className="text-sm text-tertiary mb-6">Use this code after you scan QR</p>
                                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                    <CheckDone01 className="size-3" />
                                    {invitation.status === "invited" ? "Confirmed Invitation" : "Status: " + invitation.status}
                                </div>
                               
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Location & Map */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800"
                >
                    <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                        <div className="rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                            <Map02 className="size-5" />
                        </div>
                        <h2 className="font-semibold text-primary">Location Details</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-6 flex items-start gap-3">
                            <MarkerPin01 className="mt-1 size-5 shrink-0 text-tertiary" />
                            <div>
                                <h3 className="font-medium text-primary">{event.venue}</h3>
                                <p className="text-tertiary">{event.city}</p>
                            </div>
                        </div>
                        {mapUrl && (
                            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                                <iframe 
                                    width="100%" 
                                    height="300" 
                                    frameBorder="0" 
                                    scrolling="no" 
                                    marginHeight={0} 
                                    marginWidth={0} 
                                    src={mapUrl}
                                    className="grayscale filter dark:invert-[.9]"
                                />
                            </div>
                        )}
                        <div className="mt-4 text-center">
                            <Button 
                                size="sm" 
                                color="secondary" 
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue}, ${event.city}`)}`, '_blank')}
                                iconLeading={Map02}
                                className="w-full justify-center"
                            >
                                Open in Google Maps
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Food & Beverage Menu */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                     <div className="flex items-center gap-2">
                        <File04 className="size-5 text-brand-solid" />
                        <h3 className="font-display text-lg font-semibold text-primary">Menu</h3>
                    </div>
                    <div className="rounded-xl border border-tertiary bg-secondary/50 p-4">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-brand-solid/10 p-2 text-brand-solid">
                                <File04 className="size-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-medium text-primary">Food & Beverages</h4>
                                <p className="text-sm text-secondary leading-relaxed">
                                    {event.inhouseFoodandBeverages 
                                        ? (event.isLimitedMenu ? "In-house food and beverages available (Limited Menu)." : "In-house food and beverages available.")
                                        : (event.isLimitedMenu ? "Limited menu available." : "Food and beverages details pending.")}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* +1 Guest */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserPlus01 className="size-5 text-brand-solid" />
                            <h3 className="font-display text-lg font-semibold text-primary">+1 Guest</h3>
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
                                    <div className="rounded-xl border border-tertiary bg-secondary/50 p-6 space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-secondary">Guest Name</label>
                                            <Input 
                                                placeholder="Enter guest name" 
                                                value={guestName}
                                                onChange={(val) => setGuestName(String(val))}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-secondary">Guest Phone Number</label>
                                            <Input 
                                                placeholder="+1 (555) 000-0000" 
                                                type="tel"
                                                value={guestPhone}
                                                onChange={(val) => setGuestPhone(String(val))}
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <Button 
                                                className="w-full justify-center" 
                                                onClick={() => handleGuestUpdate()}
                                                disabled={isUpdatingGuest || !guestName || !guestPhone}
                                            >
                                                {isUpdatingGuest ? "Updating..." : "Update Guest"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-brand-solid/20 bg-brand-50/50 dark:bg-brand-900/10 p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-full bg-brand-solid/10 p-3 text-brand-solid">
                                                    <User01 className="size-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-primary text-lg">{guestName}</h4>
                                                    <p className="text-tertiary">{guestPhone}</p>
                                                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                                        <CheckDone01 className="size-3" />
                                                        Confirmed
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                onClick={() => setIsEditingGuest(true)}
                                                className="shrink-0"
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

                {/* Scan QR Button */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50">
                    <div className="mx-auto max-w-2xl">
                        <Button 
                            size="lg" 
                            className="w-full justify-center shadow-lg"
                            iconLeading={QrCode01}
                            onClick={startCamera}
                        >
                            Scan QR
                        </Button>
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
    );
}
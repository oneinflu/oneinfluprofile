"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
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
    ArrowRight
} from "@untitledui/icons";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { Button } from "@/components/base/buttons/button";
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
    _id: string;
    event: string;
    user: string;
    status: "invited" | "pending" | "rejected" | "checked_in";
    qrCode?: string; // Assuming backend might provide this, or we generate from _id
    createdAt: string;
};

export default function WelcomeClient({ fontClassName }: { fontClassName?: string }) {
    const params = useParams();
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
    const [guestDetails, setGuestDetails] = useState({ name: "", email: "" });
    const [savingGuest, setSavingGuest] = useState(false);
    const [showGuestForm, setShowGuestForm] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch Event Details (Public)
    useEffect(() => {
        const fetchEvent = async () => {
            // TEST MODES
            if (code === 'invited' || code === 'notinvited') {
                setEvent({
                    eventName: "Exclusive Product Launch 2024",
                    brandName: "TechFlow Inc.",
                    date: new Date().toISOString(),
                    city: "San Francisco",
                    venue: "Moscone Center",
                    inhouseFoodandBeverages: true,
                    isGuestsAllowedplusone: true
                });
                setLoading(false);
                return;
            }

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
            if (res.success || res.data) {
                 const inv = res.data?.invitation || res.data || res;
                 setInvitation(inv);
                 setAuthStep("view");
            } else {
                // If success is false but no error thrown, maybe not invited?
                // For now, if we get here with a token, we assume "view" mode but maybe show "No Ticket"
                setAuthStep("view");
            }
        } catch (e) {
            console.error("Failed to fetch invitation", e);
            // If 401/403, we might need to re-login, but typically api.get throws.
            // If we have a token but fail, we still show "view" (maybe "not found" state)
            // unless it's strictly auth error.
            setAuthStep("view"); 
        } finally {
            setInvitationLoading(false);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            // TEST MODES
            if (code === 'invited') {
                 setInvitation({
                    _id: "65a1b2c3d4e5f6g7h8i9j0k1",
                    event: "evt_demo_123",
                    user: "usr_demo_456",
                    status: "invited",
                    qrCode: "982104",
                    createdAt: new Date().toISOString()
                });
                setAuthStep("view");
                return;
            }
            if (code === 'notinvited') {
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

    const handleSaveGuest = async () => {
        setSavingGuest(true);
        // Simulate API call to save guest
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSavingGuest(false);
        setShowGuestForm(false);
        alert("Guest details updated!");
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
                        Access Denied
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
                        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Logged in as incorrect user?
                        </p>
                        <Button 
                            size="lg"
                            className="w-full justify-center bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5"
                            onClick={() => {
                                logout();
                                setAuthStep("phone");
                                setInvitation(null);
                            }}
                            iconLeading={ArrowRight}
                        >
                            Login with different account
                        </Button>
                    </motion.div>
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
                
                {/* Auth & Ticket Section */}
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
                            {authStep === "view" ? "OFFICIAL INVITATION" : "GUEST CHECK-IN"}
                        </h2>
                    </div>
                    
                    <div className="p-8 pt-10">
                        {authStep === "loading" && (
                            <div className="flex justify-center py-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-solid border-t-transparent" />
                            </div>
                        )}

                        {authStep === "phone" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                                        <User01 className="size-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-primary">Enter Phone Number</h3>
                                    <p className="mt-1 text-sm text-tertiary">Log in to view your invitation</p>
                                </div>
                                <div className="space-y-4">
                                    <Input
                                        type="tel"
                                        maxLength={10}
                                        inputMode="numeric"
                                        placeholder="XXXXXXXXXX"
                                        value={phoneNumber}
                                        onChange={(val) => {
                                            if (/^\d*$/.test(String(val)) && String(val).length <= 10) {
                                                setPhoneNumber(String(val));
                                                if (String(val).length === 10) setPhoneError("");
                                            }
                                        }}
                                        isInvalid={!!phoneError}
                                        inputClassName="text-center text-xl tracking-[0.2em] font-mono"
                                    />
                                    {phoneError && <p className="text-center text-sm text-red-500">{phoneError}</p>}
                                    <Button 
                                        size="lg" 
                                        className="w-full justify-center" 
                                        onClick={handlePhoneSubmit}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {authStep === "otp" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                                        <CheckDone01 className="size-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-primary">Verify OTP</h3>
                                    <p className="mt-1 text-sm text-tertiary">Sent to +91 {phoneNumber}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-center">
                                        <PinInput>
                                            <PinInput.Group 
                                                maxLength={6} 
                                                className="flex gap-2 justify-center flex-wrap"
                                                value={otp} 
                                                onChange={(val) => {
                                                    setOtp(val);
                                                    if (val.length === 6) setOtpError("");
                                                }}
                                            >
                                                <PinInput.Slot index={0} />
                                                <PinInput.Slot index={1} />
                                                <PinInput.Slot index={2} />
                                                <PinInput.Slot index={3} />
                                                <PinInput.Slot index={4} />
                                                <PinInput.Slot index={5} />
                                            </PinInput.Group>
                                        </PinInput>
                                    </div>
                                    {otpError && <p className="text-center text-sm text-red-500">{otpError}</p>}
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button 
                                            size="lg" 
                                            color="secondary" 
                                            onClick={() => setAuthStep("phone")}
                                            className="w-full justify-center"
                                        >
                                            Back
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            className="w-full justify-center" 
                                            onClick={handleOtpVerify}
                                        >
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {authStep === "view" && invitation && (
                            <div className="text-center">
                                <div className="mb-4 text-display-lg font-mono font-bold tracking-widest text-brand-solid break-all">
                                    {invitation.qrCode || invitation._id.slice(-6).toUpperCase()}
                                </div>
                                <p className="text-sm text-tertiary mb-6">Use this code after you scan QR</p>
                                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                    <CheckDone01 className="size-3" />
                                    {invitation.status === "invited" ? "Confirmed Invitation" : "Status: " + invitation.status}
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <button 
                                        onClick={() => {
                                            logout();
                                            setAuthStep("phone");
                                            setInvitation(null);
                                        }}
                                        className="text-sm text-tertiary hover:text-primary transition-colors"
                                    >
                                        Log in with different account
                                    </button>
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
                    <div className="flex items-center gap-2">
                        <UserPlus01 className="size-5 text-brand-solid" />
                        <h3 className="font-display text-lg font-semibold text-primary">+1 Guest</h3>
                    </div>
                    
                    <div className="rounded-xl border border-tertiary bg-secondary/50 overflow-hidden">
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-secondary">Guest Name</label>
                                <Input 
                                    placeholder="Enter guest name" 
                                    value={guestDetails.name}
                                    onChange={(val) => setGuestDetails(prev => ({ ...prev, name: String(val) }))}
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-secondary">Guest Email (Optional)</label>
                                <Input 
                                    placeholder="Enter guest email" 
                                    type="email"
                                    value={guestDetails.email}
                                    onChange={(val) => setGuestDetails(prev => ({ ...prev, email: String(val) }))}
                                />
                            </div>
                            <div className="pt-2">
                                <Button 
                                    className="w-full justify-center" 
                                    onClick={handleSaveGuest}
                                    disabled={savingGuest || !guestDetails.name}
                                >
                                    {savingGuest ? "Saving..." : "Save Details"}
                                </Button>
                            </div>
                        </div>
                    </div>
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
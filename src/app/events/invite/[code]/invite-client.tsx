"use client";

import { useEffect, useState, useRef } from "react";
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
    ArrowRight,
    Copy01,
    Globe02,
    Link01,
    Map02,
    Phone,
    Camera01,
    UploadCloud02,
    CheckCircle,
    XCircle,
    Trash01,
    Bell01
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Instagram, YouTube, X, TikTok, LinkedIn, Facebook } from "@/components/foundations/social-icons";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { useClipboard } from "@/hooks/use-clipboard";
import { Dialog, DialogTrigger, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { PinInput } from "@/components/base/pin-input/pin-input";
import { Toggle } from "@/components/base/toggle/toggle";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";

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

const formatDeadlineDate = (iso?: string) => {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const BottomSheetOverlay = ({ className, ...props }: React.ComponentProps<typeof ModalOverlay>) => (
    <ModalOverlay
        className={(values) => cx(
            "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center overflow-y-auto bg-black/50 backdrop-blur-sm sm:items-center sm:p-4",
            values.isEntering ? "animate-in fade-in duration-300" : "",
            values.isExiting ? "animate-out fade-out duration-200" : "",
            typeof className === "function" ? className(values) : className
        )}
        {...props}
    />
);

const BottomSheetModal = ({ className, ...props }: React.ComponentProps<typeof Modal>) => (
    <Modal
        className={(values) => cx(
            "w-full max-w-md overflow-y-auto max-h-[90dvh] rounded-t-2xl bg-white dark:bg-[#161B26] p-6 shadow-xl ring-1 ring-gray-900/5 sm:rounded-2xl",
            values.isEntering ? "animate-in slide-in-from-bottom duration-300 sm:zoom-in-95" : "",
            values.isExiting ? "animate-out slide-out-to-bottom duration-200 sm:zoom-out-95" : "",
            typeof className === "function" ? className(values) : className
        )}
        {...props}
    />
);

const SuccessView = () => {
    const animRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
        let anim: any;
        let alive = true;
        (async () => {
            try {
                const mod = await import("lottie-web");
                if (!alive || !animRef.current) return;
                anim = mod.default.loadAnimation({
                    container: animRef.current,
                    renderer: "svg",
                    loop: false,
                    autoplay: true,
                    path: "/sent.json"
                });
            } catch {}
        })();
        return () => { 
            alive = false;
            if (anim) anim.destroy(); 
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <div ref={animRef} className="w-32 h-32 mb-4" />
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                You have applied for invitation for the event
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-8">
                Wait for the confirmation message you will receives once you are shortlisted
            </p>

            <Button 
                size="lg" 
                color="primary" 
                className="w-full"
                onClick={() => {
                    // Ensure cookie is set before navigation as a fallback
                    if (token) {
                        const d = new Date();
                        d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                        document.cookie = `influu_token=${token};expires=${d.toUTCString()};path=/`;
                    }
                    router.push(`/admin/my-profile`);
                }}
            >
                Manage Your Profile
            </Button>
        </div>
    );
};

export default function EventInviteClient() {
    const params = useParams();
    const router = useRouter();
    const code = String((params as any)?.code || "");
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const { token: authToken, setToken } = useAuth();
    const [mounted, setMounted] = useState(false);
    const clipboard = useClipboard();
    
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [step, setStep] = useState<"phone" | "otp" | "notifications" | "details" | "dashboard" | "success">("phone");
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);

    // Step 3: User Details State
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [instagramHandle, setInstagramHandle] = useState("");
    const [willingToAttend, setWillingToAttend] = useState(false);
    const [shareDashboard, setShareDashboard] = useState(false);
    const [isSubmittingDetails, setIsSubmittingDetails] = useState(false);

    // Step 4: Dashboard Upload State
    const [dashboardScreenshot, setDashboardScreenshot] = useState<File | null>(null);
    const [dashboardPreview, setDashboardPreview] = useState<string | null>(null);
    const [detailsError, setDetailsError] = useState<string | null>(null);
    const [dashboardError, setDashboardError] = useState<string | null>(null);

    // Focus state for mobile keyboard handling
    const [isFocused, setIsFocused] = useState(false);



    const checkExistingApplication = async (tokenToCheck?: string) => {
        const t = tokenToCheck || authToken || localStorage.getItem("influu_token");
        if (!t || !code) return false;

        try {
            const res = await api.get<any>(`/events/public/code/${encodeURIComponent(code)}/application`, { token: t });
            if (res?.success && res?.data?.application) {
                setStep("success");
                return true;
            }
        } catch (e) {
            // No application found or error
        }
        return false;
    };

    useEffect(() => {
        checkExistingApplication();
    }, [code, authToken]);



    const handleContinue = async () => {
        if (phoneNumber.length !== 10) {
            setPhoneError("Please enter a valid 10-digit phone number");
            return;
        }
        
        setPhoneError("");
        try {
            await api.post("/auth/register/phone/start-send", { phone: phoneNumber });
            setStep("otp");
            setOtp("");
            setOtpError("");
            setIsFocused(false);
        } catch (e: any) {
            setPhoneError(e.message || "Failed to send OTP. Please try again.");
        }
    };

    const handleVerify = async () => {
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

            const { token, user, isNewUser } = res.data;
            
            if (token) {
                setToken(token);
            }
            if (user?.id) localStorage.setItem("influu_user_id", user.id);
            if (user?.username) localStorage.setItem("influu_username", user.username);

            if (token) {
                const applied = await checkExistingApplication(token);
                if (applied) {
                    setIsFocused(false);
                    return;
                }
            }

            // Skip notifications for now
            setStep("details");
            setIsFocused(false);
        } catch (e: any) {
            setOtpError(e.message || "Invalid OTP. Please try again.");
        }
    };

    const handleBack = () => {
        if (step === "otp") {
            setStep("phone");
            setOtp("");
            setOtpError("");
        } else if (step === "notifications") {
            setStep("otp");
        } else if (step === "details") {
            // Skip notifications for now
            setStep("otp");
        } else if (step === "dashboard") {
            setStep("details");
        }
    };

    const handleSubscribe = async () => {
        setIsSubscribing(true);
        console.log("handleSubscribe: Starting");
        try {
            const OneSignal = (window as any).OneSignalDeferred || (window as any).OneSignal;
            
            if (!OneSignal) {
                console.error("handleSubscribe: OneSignal not found");
                setStep("details");
                setIsSubscribing(false);
                return;
            }

            // We use push to ensure it runs when OneSignal is ready
            OneSignal.push(async function(OS: any) {
                console.log("handleSubscribe: OneSignal ready");
                try {
                    // Ask permission ONLY when user clicks
                    const permission = await OS.Notifications.requestPermission();
                    console.log("handleSubscribe: Permission result", permission);

                    // OneSignal v16 returns boolean, older versions might return 'granted'
                    if (permission !== 'granted' && permission !== true) {
                        console.warn("handleSubscribe: Permission denied");
                        setStep("details");
                        setIsSubscribing(false);
                    } else {
                        // Subscribe user
                        console.log("handleSubscribe: Opting in");
                        await OS.User.PushSubscription.optIn();

                        // Wait a bit for the subscription to propagate and ID to be generated
                        // Sometimes the ID is not available immediately
                        let onesignalId = OS.User.onesignalId;
                        console.log("handleSubscribe: Initial onesignalId", onesignalId);

                        if (!onesignalId) {
                             console.log("handleSubscribe: onesignalId not found, trying PushSubscription.getId()");
                             onesignalId = await OS.User.PushSubscription.getId();
                             console.log("handleSubscribe: PushSubscription.getId() result", onesignalId);
                        }
                        
                        // If still no ID, wait a bit and try again (retry logic)
                        if (!onesignalId) {
                            console.log("handleSubscribe: Still no ID, waiting 500ms...");
                            await new Promise(r => setTimeout(r, 500));
                            onesignalId = OS.User.onesignalId || await OS.User.PushSubscription.getId();
                            console.log("handleSubscribe: Retry ID result", onesignalId);
                        }

                        if (onesignalId) {
                            const userId = localStorage.getItem("influu_user_id");
                            const token = authToken || localStorage.getItem("influu_token");
                            
                            // Link the user in OneSignal
                            if (userId) {
                                console.log("handleSubscribe: Logging in to OneSignal with userId", userId);
                                await OS.login(userId);
                            }

                            console.log("handleSubscribe: Credentials", { userId, hasToken: !!token, onesignalId });

                            if (userId && token) {
                                try {
                                    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://newyearbackendcode-zrp62.ondigitalocean.app";
                                    const url = `${baseUrl}/users/id/${userId}/notifications/enable`;
                                    console.log("handleSubscribe: Hitting API", url);
                                    
                                    const res = await fetch(url, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            identity: {
                                                onesignal_id: onesignalId
                                            }
                                        })
                                    });
                                    
                                    if (!res.ok) {
                                        console.error("handleSubscribe: API Error", res.status, await res.text());
                                    } else {
                                        console.log("handleSubscribe: API Success");
                                        setNotificationEnabled(true);
                                        // Wait a moment to show success state before moving on
                                        setTimeout(() => {
                                            setStep("details");
                                        }, 1500);
                                        return; // Don't fall through to setStep("details") immediately
                                    }
                                } catch (apiError) {
                                    console.error("Failed to sync notification status", apiError);
                                }
                            } else {
                                console.error("handleSubscribe: Missing userId or token");
                            }
                        } else {
                            console.error("handleSubscribe: Could not retrieve OneSignal ID");
                        }
                        
                        // If we didn't succeed (e.g. no ID, api error), we proceed to details
                        // Only if we didn't setNotificationEnabled (which implies success)
                        // But since we returned early on success, this is fine.
                        // However, we need to be careful not to skip if we are in success state.
                        // Actually, I returned in the success block.
                        setStep("details");
                        setIsSubscribing(false);
                    }
                } catch (e) {
                    console.error("OneSignal error", e);
                    setStep("details");
                    setIsSubscribing(false);
                }
            });
        } catch (e) {
            console.error("Subscription error", e);
            setStep("details");
            setIsSubscribing(false);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleFinalSubmit = async () => {
        // Here you would typically submit all the data to the backend
        console.log("handleFinalSubmit: Starting final submission");
        setDashboardError(null);

        if ((event?.dashboardAccessRequired === true || shareDashboard) && !dashboardScreenshot) {
            setDashboardError("Please upload your dashboard screenshot");
            return;
        }
        
        try {
            const token = authToken || localStorage.getItem("influu_token");
            if (!token) {
                console.error("handleFinalSubmit: Missing token");
                // Should redirect to login or show error
                return;
            }

            const isWilling = localStorage.getItem("influu_isWillingToAttend");
            const shareDash = localStorage.getItem("influu_shareProfessionalDashboard");
            
            const formData = new FormData();
            formData.append("willingToAttend", isWilling || "false");
            formData.append("shareProfessionalDashboard", shareDash || "false");
            
            if (dashboardScreenshot) {
                formData.append("dashboard", dashboardScreenshot);
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://newyearbackendcode-zrp62.ondigitalocean.app";
            const endpoint = `/events/public/code/${encodeURIComponent(code)}/apply`;
            console.log("handleFinalSubmit: Submitting to", `${baseUrl}${endpoint}`);

            const res = await fetch(`${baseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("handleFinalSubmit: Submission failed", errorText);
                // Handle error (show toast etc)
                return;
            }

            const data = await res.json();
            console.log("handleFinalSubmit: Success", data);

            console.log({
                phoneNumber,
                otp,
                name,
                photo,
                instagramHandle,
                willingToAttend,
                shareDashboard,
                dashboardScreenshot
            });
            setStep("success");
        } catch (e) {
            console.error("handleFinalSubmit: Error during submission", e);
        }
    };

    const handleDetailsSubmit = async () => {
        console.log("handleDetailsSubmit: Starting submission");
        setDetailsError(null);

        // Validation: All fields are mandatory
        if (!photo) {
            setDetailsError("Please upload a profile photo");
            return;
        }
        if (!name.trim()) {
            setDetailsError("Please enter your full name");
            return;
        }
        if (!instagramHandle.trim()) {
            setDetailsError("Please enter your Instagram handle");
            return;
        }

        try {
            setIsSubmittingDetails(true);
            const token = localStorage.getItem("influu_token");
            let storedUsername = localStorage.getItem("influu_username");
            const userId = localStorage.getItem("influu_user_id");
            
            console.log("handleDetailsSubmit: Credentials", { token: !!token, username: storedUsername, userId });

            if (!storedUsername && userId && token) {
                try {
                    console.log("handleDetailsSubmit: Fetching username from ID");
                    const userRes = await api.get<{ username: string }>(`/users/id/${userId}`, { token });
                    if (userRes?.username) {
                        storedUsername = userRes.username;
                        localStorage.setItem("influu_username", storedUsername);
                        console.log("handleDetailsSubmit: Retrieved username", storedUsername);
                    }
                } catch (e) {
                    console.error("handleDetailsSubmit: Failed to fetch username", e);
                }
            }

            if (!storedUsername) {
                 console.error("Username not found in local storage");
                 setDetailsError("Session error. Please refresh and try again.");
                 return;
            }

            // 1. Update basic profile with all details
            const formData = new FormData();
            formData.append("name", name);
            if (photo instanceof File) {
                formData.append("avatar", photo);
            }
            // "instagramUserId or instagramHandle or instagramUrl" - using instagramHandle as the key
            formData.append("instagramHandle", instagramHandle);

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://newyearbackendcode-zrp62.ondigitalocean.app";
            console.log("handleDetailsSubmit: Sending profile update to", `${baseUrl}/users/${storedUsername}/profile/basic`);
            
            const profileRes = await fetch(`${baseUrl}/users/${storedUsername}/profile/basic`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (!profileRes.ok) {
                const errorText = await profileRes.text();
                console.error("Failed to update profile", errorText);
                setDetailsError("Failed to update profile. Please try again.");
                return;
            } 
            
            const profileData = await profileRes.json();
            console.log("handleDetailsSubmit: Profile updated successfully", profileData);

            // 2. Save preferences to localStorage
            localStorage.setItem("influu_isWillingToAttend", String(willingToAttend));
            localStorage.setItem("influu_shareProfessionalDashboard", String(shareDashboard));

            if (event?.dashboardAccessRequired === true || shareDashboard) {
                setStep("dashboard");
            } else {
                await handleFinalSubmit();
            }
        } catch (e: any) {
            console.error("Failed to update profile", e);
            setDetailsError(e.message || "An unexpected error occurred.");
        } finally {
            setIsSubmittingDetails(false);
        }
    };

    const handleDashboardDrop = (files: FileList) => {
        if (files.length > 0) {
            const file = files[0];
            setDashboardScreenshot(file);
            setDashboardPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveDashboard = () => {
        setDashboardScreenshot(null);
        setDashboardPreview(null);
    };



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
                        {event.user && (
                            <div className="flex flex-col items-center justify-center mb-4">
                                <Avatar 
                                    size="lg" 
                                    src={event.user.avatarUrl} 
                                    alt={event.user.name}
                                    initials={event.user.name.charAt(0)}
                                    className="mb-2"
                                />
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Invited by <span className="text-gray-900 dark:text-white font-semibold">{event.user.name}</span>
                                </p>
                            </div>
                        )}
                        <div className="inline-flex items-center justify-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 mb-4">
                            {step === "success" ? "Already Applied" : "Apply for Invitation"}
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
                                                                 d.deadline.kind === "scheduled_date" ? `${formatDeadlineDate(d.deadline.date)}` :
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
                                                                 d.deadline.kind === "scheduled_date" ? `${formatDeadlineDate(d.deadline.date)}` :
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
                            <DialogTrigger>
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl"
                                    iconLeading={ArrowRight}
                                >
                                    {step === "success" ? "Already Applied" : "Apply for Invitation"}
                                </Button>
                                <BottomSheetOverlay className={isFocused ? "!items-center" : ""}>
                                    <BottomSheetModal>
                                        <Dialog className="outline-none">
                                            {({ close }) => (
                                                <div className="w-full pb-20">
                                                    {step === "phone" && (
                                                        <>
                                                            <div className="text-center mb-6">
                                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                                                                    <User01 className="w-6 h-6" />
                                                                </div>
                                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                    Enter Phone Number
                                                                </h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                                    Please enter your 10-digit phone number to continue with the application.
                                                                </p>
                                                            </div>

                                                            <div className="space-y-6">
                                                                <div className="flex justify-center px-4">
                                                                    <Input
                                                                        type="tel"
                                                                        maxLength={10}
                                                                        inputMode="numeric"
                                                                        placeholder="XXXXXXXXXX"
                                                                        value={phoneNumber}
                                                                        onFocus={() => setIsFocused(true)}
                                                                        onBlur={() => setIsFocused(false)}
                                                                        onChange={(val) => {
                                                                            // Allow only numbers
                                                                            if (/^\d*$/.test(val) && val.length <= 10) {
                                                                                setPhoneNumber(val);
                                                                                if (val.length === 10) setPhoneError("");
                                                                            }
                                                                        }}
                                                                        isInvalid={!!phoneError}
                                                                        inputClassName="text-center text-xl tracking-[0.2em] font-mono"
                                                                        size="md"
                                                                    />
                                                                </div>
                                                                
                                                                {phoneError && (
                                                                    <p className="text-center text-sm text-red-500 dark:text-red-400">
                                                                        {phoneError}
                                                                    </p>
                                                                )}

                                                                <div className="grid grid-cols-2 gap-3 pt-2">
                                                                    <Button 
                                                                        size="lg" 
                                                                        color="secondary" 
                                                                        onClick={close}
                                                                        className="w-full"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                    <Button 
                                                                        size="lg" 
                                                                        color="primary" 
                                                                        onClick={handleContinue}
                                                                        className="w-full"
                                                                    >
                                                                        Continue
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {step === "otp" && (
                                                        <>
                                                            <div className="text-center mb-6">
                                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                                                                    <CheckDone01 className="w-6 h-6" />
                                                                </div>
                                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                    Verify OTP
                                                                </h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                                    OTP has been sent to XXXXXXX{phoneNumber.slice(-3)}
                                                                </p>
                                                            </div>

                                                            <div className="space-y-6">
                                                                <div className="flex justify-center">
                                                                    <PinInput>
                                                                        <PinInput.Group 
                                                                            maxLength={6} 
                                                                            className="flex gap-2 justify-center flex-wrap"
                                                                            value={otp} 
                                                                            onFocus={() => setIsFocused(true)}
                                                                            onBlur={() => setIsFocused(false)}
                                                                            onChange={(val) => {
                                                                                setOtp(val);
                                                                                if (val.length === 6) setOtpError("");
                                                                            }}
                                                                        >
                                                                            {Array.from({ length: 6 }).map((_, i) => (
                                                                                <PinInput.Slot 
                                                                                    key={i} 
                                                                                    index={i} 
                                                                                    className="w-10 h-12 text-xl rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" 
                                                                                />
                                                                            ))}
                                                                        </PinInput.Group>
                                                                    </PinInput>
                                                                </div>
                                                                
                                                                {otpError && (
                                                                    <p className="text-center text-sm text-red-500 dark:text-red-400">
                                                                        {otpError}
                                                                    </p>
                                                                )}

                                                                <div className="grid grid-cols-2 gap-3 pt-2">
                                                                    <Button 
                                                                        size="lg" 
                                                                        color="secondary" 
                                                                        onClick={handleBack}
                                                                        className="w-full"
                                                                    >
                                                                        Back
                                                                    </Button>
                                                                    <Button 
                                                                        size="lg" 
                                                                        color="primary" 
                                                                        onClick={handleVerify}
                                                                        className="w-full"
                                                                    >
                                                                        Verify
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {step === "notifications" && (
                                                        <>
                                                            <div className="text-center mb-6">
                                                                <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                                                    {notificationEnabled ? (
                                                                        <CheckDone01 className="w-6 h-6 text-green-600 dark:text-green-400" />
                                                                    ) : (
                                                                        <Bell01 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                                                    )}
                                                                </div>
                                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                    {notificationEnabled ? "Notifications Enabled!" : "Enable Notifications"}
                                                                </h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                                    {notificationEnabled 
                                                                        ? "Great! You'll receive updates about your application status."
                                                                        : "Stay updated with real-time alerts for your event application status and exclusive opportunities."
                                                                    }
                                                                </p>
                                                            </div>

                                                            <div className="space-y-4">
                                                                {!notificationEnabled && !isSubscribing ? (
                                                                    <>
                                                                        <Button 
                                                                            size="lg" 
                                                                            color="primary" 
                                                                            className="w-full"
                                                                            onClick={handleSubscribe}
                                                                        >
                                                                            Enable Notifications
                                                                        </Button>
                                                                        <Button 
                                                                            size="lg" 
                                                                            color="secondary" 
                                                                            className="w-full border-none shadow-none bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                                                                            onClick={() => setStep("details")}
                                                                        >
                                                                            Skip for now
                                                                        </Button>
                                                                    </>
                                                                ) : (
                                                                    <div className="flex justify-center">
                                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}

                                                    {step === "details" && (
                                                        <>
                                                            <div className="text-center mb-6">
                                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                    Complete your profile
                                                                </h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                                    Tell us a bit about yourself
                                                                </p>
                                                            </div>

                                                            <div className="space-y-6">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <div className="relative group cursor-pointer">
                                                                        <input 
                                                                            type="file" 
                                                                            accept="image/*" 
                                                                            className="hidden" 
                                                                            id="avatar-upload"
                                                                            onChange={handlePhotoChange}
                                                                        />
                                                                        <label htmlFor="avatar-upload" className="cursor-pointer block relative">
                                                                            <Avatar 
                                                                                size="xl" 
                                                                                src={photoPreview} 
                                                                                placeholderIcon={User01}
                                                                                className="w-24 h-24"
                                                                            />
                                                                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <Camera01 className="w-8 h-8 text-white" />
                                                                            </div>
                                                                            <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700">
                                                                                <Camera01 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <Input 
                                                                    placeholder="Full Name" 
                                                                    value={name}
                                                                    onChange={setName}
                                                                />

                                                                <Input 
                                                                    placeholder="username" 
                                                                    icon={Instagram}
                                                                    value={instagramHandle}
                                                                    onChange={setInstagramHandle}
                                                                />

                                                                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Willing to attend event?</span>
                                                                    <Toggle isSelected={willingToAttend} onChange={setWillingToAttend} />
                                                                </div>

                                                                {event?.dashboardAccessRequired === true && (
                                                                    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share professional dashboard?</span>
                                                                        <Toggle isSelected={shareDashboard} onChange={setShareDashboard} />
                                                                    </div>
                                                                )}

                                                                {detailsError && (
                                                                    <p className="text-center text-sm text-red-500 dark:text-red-400">
                                                                        {detailsError}
                                                                    </p>
                                                                )}

                                                                <div className="pt-2">
                                                                    <Button 
                                                                        size="lg" 
                                                                        color="primary" 
                                                                        onClick={handleDetailsSubmit} 
                                                                        className="w-full"
                                                                        disabled={isSubmittingDetails}
                                                                    >
                                                                        {isSubmittingDetails ? "Processing..." : "Next Step"}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {step === "dashboard" && (
                                                        <>
                                                            <div className="text-center mb-6">
                                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                    One Last Step
                                                                </h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                                    Upload your professional dashboard screenshot
                                                                </p>
                                                            </div>

                                                            <div className="space-y-6">
                                                                {dashboardScreenshot ? (
                                                                    <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                                                        <img src={dashboardPreview!} alt="Dashboard" className="w-full h-48 object-cover" />
                                                                        <button 
                                                                            onClick={handleRemoveDashboard}
                                                                            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-red-50 text-red-500"
                                                                        >
                                                                            <Trash01 className="w-4 h-4" />
                                                                        </button>
                                                                        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
                                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ready to submit</span>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <FileUpload.DropZone 
                                                                        onDropFiles={handleDashboardDrop}
                                                                        accept="image/*"
                                                                        hint="Upload screenshot (PNG, JPG)"
                                                                        allowsMultiple={false}
                                                                    />
                                                                )}

                                                                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/20">
                                                                    <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Dos & Don'ts</h4>
                                                                    <ul className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
                                                                        <li className="flex items-start gap-2">
                                                                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                                            <span>Ensure metrics are clearly visible</span>
                                                                        </li>
                                                                        <li className="flex items-start gap-2">
                                                                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                                            <span>Capture recent data (last 30 days)</span>
                                                                        </li>
                                                                        <li className="flex items-start gap-2">
                                                                            <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                                                            <span>Don't crop out the profile name</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>

                                                                {dashboardError && (
                                                                    <p className="text-center text-sm text-red-500 dark:text-red-400">
                                                                        {dashboardError}
                                                                    </p>
                                                                )}

                                                                <div className="pt-2">
                                                                    <Button size="lg" color="primary" onClick={handleFinalSubmit} className="w-full">
                                                                        Apply for the event
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {step === "success" && <SuccessView />}
                                                </div>
                                            )}
                                        </Dialog>
                                    </BottomSheetModal>
                                </BottomSheetOverlay>
                            </DialogTrigger>
                        </div>
                        
                        <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-4 uppercase tracking-widest">
                            Powered by INFLU
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}


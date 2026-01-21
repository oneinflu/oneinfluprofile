"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash01, CheckCircle, ArrowRight, Link01 } from "@untitledui/icons";
import { api, ApiError } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { PinInput } from "@/components/base/pin-input/pin-input";
import { User01, Sun, Moon01 } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { cx } from "@/utils/cx";

export default function SubmitWorkClient() {
    const params = useParams();
    const code = String(params?.code || "");
    const { token: authToken, setToken } = useAuth();
    const { theme, setTheme } = useTheme();
    
    // UI State
    const [mounted, setMounted] = useState(false);
    const [authStep, setAuthStep] = useState<"loading" | "phone" | "otp" | "form" | "success" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState("");
    
    // Data State
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [event, setEvent] = useState<any>(null);
    
    // Auth Form State
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    
    // Links Form State
    const [links, setLinks] = useState<string[]>([""]);
    const [submitting, setSubmitting] = useState(false);

    // Lottie
    const lottieContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Initial Auth Check & Data Fetch
    useEffect(() => {
        if (!mounted || !code) return;

        const init = async () => {
            const token = authToken || localStorage.getItem("influu_token");
            if (token) {
                await fetchInvitation(token);
            } else {
                setAuthStep("phone");
            }
        };
        init();
    }, [mounted, code, authToken]);

    // Lottie Animation Effect
    useEffect(() => {
        let anim: any;
        if (authStep === "success" && lottieContainer.current) {
            (async () => {
                try {
                    const lottie = (await import("lottie-web")).default;
                    anim = lottie.loadAnimation({
                        container: lottieContainer.current!,
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: '/sent.json'
                    });
                } catch (e) {
                    console.error("Failed to load lottie", e);
                }
            })();
        }
        return () => {
            if (anim) anim.destroy();
        };
    }, [authStep]);

    const fetchInvitation = async (token: string) => {
        setAuthStep("loading");
        try {
            // First fetch event details to display name/branding if needed (optional but good UX)
            // Then fetch invitation
            const res = await api.get<any>(`/events/public/code/${encodeURIComponent(code)}/invitation/me`, { token });
            
            const payload = res.data || res;
            const myApp = payload?.myApplication;
            const eventData = payload?.event;

            if (myApp) {
                setApplicationId(myApp.applicationId || myApp._id);
                setEvent(eventData);
                
                // If already submitted links, maybe pre-fill them? 
                // The prompt implies we are submitting new links, but if they exist we could show them.
                // For now, let's start fresh or pre-fill if available.
                if (myApp.submittedLinks && Array.isArray(myApp.submittedLinks) && myApp.submittedLinks.length > 0) {
                     setLinks(myApp.submittedLinks);
                }
                
                setAuthStep("form");
            } else {
                setErrorMsg("No invitation found for this event.");
                setAuthStep("error");
            }
        } catch (e: any) {
            console.error("Failed to fetch invitation", e);
            if (e instanceof ApiError) {
                if (e.status === 401) {
                    setAuthStep("phone");
                    return;
                }
                if (e.status === 403 || e.status === 404) {
                    setErrorMsg("You do not have access to this event.");
                    setAuthStep("error");
                    return;
                }
            }
            setErrorMsg(e.message || "Something went wrong.");
            setAuthStep("error");
        }
    };

    // Auth Handlers
    const handlePhoneSubmit = async () => {
        if (phoneNumber.length < 10) {
            setPhoneError("Please enter a valid phone number");
            return;
        }
        setPhoneError("");
        setAuthLoading(true);
        try {
            await api.post("/auth/register/phone/start-send", { phone: phoneNumber });
            setAuthStep("otp");
        } catch (e: any) {
            setPhoneError(e.message || "Failed to send OTP.");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleOtpVerify = async () => {
        if (otp.length !== 6) {
            setOtpError("Please enter a valid 6-digit OTP");
            return;
        }
        setOtpError("");
        setAuthLoading(true);
        try {
            const res: any = await api.post("/auth/register/phone/otp/verify", { 
                phone: phoneNumber, 
                code: otp 
            });
            
            const { token, user } = res.data;
            if (token) {
                setToken(token);
                const d = new Date();
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                document.cookie = `influu_token=${token};expires=${d.toUTCString()};path=/`;
                localStorage.setItem("influu_token", token);
                if (user?.id) localStorage.setItem("influu_user_id", user.id);
                
                await fetchInvitation(token);
            }
        } catch (e: any) {
            setOtpError(e.message || "Invalid OTP.");
        } finally {
            setAuthLoading(false);
        }
    };

    // Form Handlers
    const addLink = () => {
        setLinks([...links, ""]);
    };

    const removeLink = (index: number) => {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        setLinks(newLinks);
    };

    const updateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const handleSubmitWork = async () => {
        const validLinks = links.filter(l => l.trim() !== "");
        if (validLinks.length === 0) {
            alert("Please add at least one link.");
            return;
        }

        setSubmitting(true);
        try {
            // POST /events/public/code/:code/applications/:applicationId/links
            await api.post(`/events/public/code/${code}/applications/${applicationId}/links`, {
                links: validLinks
            }, { token: authToken });
            
            setAuthStep("success");
        } catch (e: any) {
            console.error("Submit failed", e);
            alert(e.message || "Failed to submit links. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!mounted) return null;

    // --- RENDER STATES ---

    if (authStep === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-solid border-t-transparent" />
            </div>
        );
    }

    if (authStep === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
                <div className="text-center max-w-md">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        <Trash01 className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h2>
                    <p className="text-gray-500 dark:text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    if (authStep === "phone" || authStep === "otp") {
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
                        <h1 className="text-4xl font-light text-gray-900 dark:text-white tracking-tight font-display">{event?.eventName || "Submit Work"}</h1>
                        <p className="text-brand-600 dark:text-brand-200/60 font-medium tracking-[0.2em] text-xs uppercase">Content Submission</p>
                    </div>

                    <div className="relative group perspective-1000">
                        {/* Ambient Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-brand-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                        
                        <div className="relative rounded-[2rem] bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ring-1 ring-white/20 dark:ring-white/5">

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
                                                onKeyDown={(e) => e.key === "Enter" && handlePhoneSubmit()}
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
                                            isLoading={authLoading}
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
                                                isLoading={authLoading}
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

    if (authStep === "success") {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md text-center"
                >
                    <div ref={lottieContainer} className="w-48 h-48 mx-auto mb-6" />
                    
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Work Submitted!
                    </h2>
                    
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 mb-8">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Your content links have been successfully submitted. The team will review them shortly.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-full w-fit mx-auto">
                            <CheckCircle className="h-5 w-5" />
                            <span>Received</span>
                        </div>
                    </div>

                    <Button
                        color="secondary"
                        size="lg"
                        onClick={() => setAuthStep("form")} // Allow editing or viewing again
                    >
                        View Submission
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Default: Form View
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Submit Work
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        {event?.eventName || "Event Content Submission"}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 overflow-hidden">
                    <div className="p-8 space-y-8">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Link01 className="h-5 w-5 text-brand-500" />
                                Content Links
                            </h3>
                            <div className="space-y-4">
                                <AnimatePresence initial={false}>
                                    {links.map((link, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex gap-2"
                                        >
                                            <Input
                                                value={link}
                                                onChange={(val) => updateLink(index, String(val))}
                                                placeholder="https://instagram.com/p/..."
                                                className="flex-1"
                                            />
                                            {links.length > 1 && (
                                                <ButtonUtility
                                                    icon={Trash01}
                                                    color="secondary"
                                                    onClick={() => removeLink(index)}
                                                    tooltip="Remove link"
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            
                            <button
                                onClick={addLink}
                                className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add another link
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Button
                                size="lg"
                                className="w-full justify-center text-base"
                                onClick={handleSubmitWork}
                                isLoading={submitting}
                                iconTrailing={ArrowRight}
                            >
                                Submit Work
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

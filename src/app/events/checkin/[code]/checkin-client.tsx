"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "react-confetti";
import { 
    CheckDone01, 
    X, 
    Ticket02, 
    Building02, 
    Calendar,
    ArrowRight
} from "@untitledui/icons";
import { api } from "@/utils/api";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

type PublicEvent = {
    eventName?: string;
    venue?: string;
    city?: string;
    date?: string;
    brandName?: string;
    code?: string;
};

export default function CheckinClient({ fontClassName }: { fontClassName?: string }) {
    const params = useParams();
    const code = String(params?.code || "");
    
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [inviteCode, setInviteCode] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
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

    const handleVerify = async () => {
        if (!inviteCode.trim()) {
            setErrorMessage("Please enter your invitation code");
            setStatus("error");
            return;
        }

        setVerifying(true);
        setErrorMessage("");
        
        try {
            // NOTE: Assuming this endpoint exists based on requirements.
            // If not, we might need to adjust or mock for now.
            await api.post(`/events/public/code/${code}/checkin`, {
                inviteCode: inviteCode
            });
            
            setStatus("success");
        } catch (e: any) {
            console.error("Verification failed", e);
            setStatus("error");
            setErrorMessage(e.message || "Invalid invitation code. Please try again.");
        } finally {
            setVerifying(false);
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden relative flex flex-col">
            {status === "success" && (
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={true}
                        numberOfPieces={200}
                        colors={['#12B76A', '#32D583', '#6CE9A6', '#D1FADF', '#FFD700']}
                    />
                </div>
            )}

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-brand-100/20 via-transparent to-transparent dark:from-brand-900/20 dark:via-transparent dark:to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-full text-center space-y-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 ring-8 ring-green-50 dark:ring-green-900/10 shadow-2xl shadow-green-500/20"
                            >
                                <CheckDone01 className="h-16 w-16 text-green-600 dark:text-green-400" strokeWidth={3} />
                            </motion.div>

                            <div className="space-y-4">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className={cx("text-4xl font-bold text-gray-900 dark:text-white tracking-tight", fontClassName)}
                                >
                                    Welcome!
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-lg text-gray-600 dark:text-gray-300 font-medium"
                                >
                                    Your invitation is verified.
                                    <br />
                                    Please proceed to the entrance.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 dark:border-white/10"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="h-10 w-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                                            <Ticket02 className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">Event</p>
                                            <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{event.eventName}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="h-px bg-gray-200 dark:bg-gray-800" />
                                    
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="h-10 w-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                                            <Building02 className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">Venue</p>
                                            <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{event.venue || event.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <p className="text-xs text-tertiary uppercase tracking-[0.2em]">Enjoy the event</p>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="checkin"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-900/30">
                                    <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                                        Self Check-in
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
                                    {event.eventName}
                                </h1>
                                <p className="text-tertiary">
                                    Please enter your invitation code to verify your entry.
                                </p>
                            </div>

                            <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary ml-1">
                                        Invitation Code
                                    </label>
                                    <Input
                                        placeholder="e.g. 123456"
                                        value={inviteCode}
                                        onChange={(val) => {
                                            setInviteCode(String(val).toUpperCase());
                                            setStatus("idle");
                                            setErrorMessage("");
                                        }}
                                        inputClassName="text-center text-3xl font-mono tracking-[0.5em] uppercase font-bold placeholder:tracking-normal"
                                        wrapperClassName="h-20"
                                    />
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2 justify-center"
                                        >
                                            <X className="h-4 w-4" />
                                            <span>{errorMessage}</span>
                                        </motion.div>
                                    )}
                                </div>

                                <Button
                                    size="xl"
                                    className="w-full justify-center text-lg font-semibold shadow-xl shadow-brand-500/20"
                                    onClick={handleVerify}
                                    disabled={verifying || !inviteCode}
                                    iconTrailing={!verifying ? ArrowRight : undefined}
                                >
                                    {verifying ? "Verifying..." : "Verify Invitation"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="p-6 text-center z-10">
                <p className="text-[10px] text-tertiary uppercase tracking-[0.3em]">
                    Powered by Influu
                </p>
            </div>
        </div>
    );
}

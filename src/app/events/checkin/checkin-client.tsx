"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "react-confetti";
import { 
    CheckDone01, 
    X, 
    Ticket02, 
    Building02, 
    ArrowRight,
    QrCode01
} from "@untitledui/icons";
import { api } from "@/utils/api";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

type CheckInResponse = {
    success: boolean;
    status: string;
    message?: string;
    data?: {
        guestName?: string;
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
        };
    };
};

export default function CheckinClient({ fontClassName }: { fontClassName?: string }) {
    const searchParams = useSearchParams();
    const [eventCode, setEventCode] = useState(searchParams?.get("eventCode") || "");
    const [inviteCode, setInviteCode] = useState(searchParams?.get("inviteCode") || "");
    const [verifying, setVerifying] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [successData, setSuccessData] = useState<CheckInResponse["data"] | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                setSuccessData(res.data);
                setStatus("success");
            } else {
                setStatus("error");
                if (res.status === "invite_code_used") {
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

    return (
        <div className="min-h-screen bg-gray-950 overflow-hidden relative flex flex-col font-sans">
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

            {/* Premium Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-950 to-gray-950" />
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />
                {/* Abstract shapes/glows */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
                <AnimatePresence mode="wait">
                    {status === "success" && successData ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-full text-center space-y-10"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-green-500/20 ring-4 ring-green-500/10 shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)] backdrop-blur-md"
                            >
                                <CheckDone01 className="h-20 w-20 text-green-400" strokeWidth={4} />
                            </motion.div>

                            <div className="space-y-6">
                                <div>
                                    <motion.h1 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className={cx("text-6xl font-bold text-white tracking-tight drop-shadow-xl mb-4", fontClassName)}
                                    >
                                        Welcome {successData.guestName ? successData.guestName.split(' ')[0] : ""}!
                                    </motion.h1>
                                    <motion.p 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-2xl text-green-400 font-semibold tracking-wide uppercase"
                                    >
                                        You are checked in
                                    </motion.p>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm mx-auto"
                                >
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Please show this screen to the <span className="text-white font-bold">bouncer</span> or <span className="text-white font-bold">manager</span> to let you in.
                                    </p>
                                </motion.div>

                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-brand-200 font-medium italic text-lg"
                                >
                                    Have a nice evening!
                                </motion.p>
                            </div>

                            {/* Minimal Event Info Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="pt-8 border-t border-white/10"
                            >
                                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Event Access</p>
                                <p className="text-white font-semibold text-lg">{successData.event.eventName}</p>
                                <p className="text-gray-400 text-sm">{successData.event.venue || successData.event.city}</p>
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
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30 mb-2">
                                    <QrCode01 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white font-display tracking-tight">
                                        Event Check-in
                                    </h1>
                                    <p className="text-gray-400 mt-2 text-lg">
                                        Enter your details to verify entry
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
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
                                            inputClassName="bg-gray-950/50 border-gray-800 text-white text-center text-xl font-mono tracking-widest uppercase font-bold placeholder:tracking-normal focus:border-brand-500 focus:ring-brand-500/20"
                                            wrapperClassName="h-14"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
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
                                            inputClassName="bg-gray-950/50 border-gray-800 text-white text-center text-xl font-mono tracking-widest uppercase font-bold placeholder:tracking-normal focus:border-brand-500 focus:ring-brand-500/20"
                                            wrapperClassName="h-14"
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
                                    className="w-full justify-center text-lg font-bold shadow-lg shadow-brand-500/20 bg-brand-600 hover:bg-brand-500 text-white border-none h-14 rounded-xl"
                                    onClick={handleVerify}
                                    disabled={verifying || !inviteCode || !eventCode}
                                    iconTrailing={!verifying ? ArrowRight : undefined}
                                >
                                    {verifying ? "Verifying Access..." : "Verify Entry"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="p-6 text-center z-10">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-semibold">
                    Secured by Influu
                </p>
            </div>
        </div>
    );
}

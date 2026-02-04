"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { DialogTrigger, ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const [identifier, setIdentifier] = useState(searchParams.get("phone") || "");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(0);
    const router = useRouter();
    const { setToken, setUser } = useAuth();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleSendOtp = async () => {
        if (loading) return;
        
        const cleanPhone = identifier.trim();
        if (!/^\d{10}$/.test(cleanPhone)) {
            setErrorMsg("Please enter a valid 10-digit phone number");
            return;
        }

        setLoading(true);
        setErrorMsg(null);

        try {
            await api.post("/auth/register/phone/start-send", { phone: cleanPhone });
            setStep("otp");
            setResendTimer(30);
        } catch (e: any) {
            console.error(e);
            setErrorMsg(e.message || "Failed to send OTP. Please check the number and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (loading) return;
        if (!otp || otp.length < 4) {
             setErrorMsg("Please enter the OTP");
             return;
        }

        setLoading(true);
        setErrorMsg(null);

        try {
            const res: any = await api.post("/auth/register/phone/otp/verify", { 
                phone: identifier,
                code: otp 
            });

            const { token: newToken, user } = res.data;

            if (newToken) {
                setToken(newToken);
                const d = new Date();
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                document.cookie = `influu_token=${newToken};expires=${d.toUTCString()};path=/`;
                
                if (user) {
                    setUser(user);
                    if (user.id) localStorage.setItem("influu_user_id", user.id);
                    if (user.username) localStorage.setItem("influu_username", user.username);
                }

                // Redirect to category selection for new registration flow
                router.push("/select-category");
            } else {
                throw new Error("No token received");
            }
        } catch (e: any) {
            console.error(e);
            setErrorMsg(e.message || "Invalid OTP. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-screen">
            <div className="flex w-full flex-col md:grid md:grid-cols-2">
                <div className="flex min-h-screen w-full flex-col px-4 py-12 md:px-12 lg:px-16 xl:px-20">
                    <div className="flex w-full items-start justify-start">
                        <UntitledLogo className="h-8 w-auto" />
                    </div>

                    <div className="mx-auto flex w-full max-w-sm grow items-center md:mx-0 md:max-w-md">
                        <div className="flex w-full flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-display-sm font-semibold text-primary">
                                    {step === "phone" ? "Create an account" : "Verify OTP"}
                                </h1>
                                <p className="text-md text-tertiary">
                                    {step === "phone" 
                                        ? "Start your journey with your phone number." 
                                        : `Enter the code sent to ${identifier}`}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {step === "phone" ? (
                                    <Input
                                        label="Phone Number"
                                        placeholder="Enter 10-digit number"
                                        value={identifier}
                                        onChange={(v) => {
                                            const val = String(v).replace(/\D/g, '').slice(0, 10);
                                            setIdentifier(val);
                                            if (errorMsg) setErrorMsg(null);
                                        }}
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={10}
                                        className="flex-1"
                                        isInvalid={!!errorMsg}
                                        hint={errorMsg || undefined}
                                    />
                                ) : (
                                    <Input
                                        label="One-Time Password"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(v) => {
                                            setOtp(String(v));
                                            if (errorMsg) setErrorMsg(null);
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        className="flex-1"
                                        isInvalid={!!errorMsg}
                                        hint={errorMsg || undefined}
                                        autoComplete="one-time-code"
                                    />
                                )}

                                <Button
                                    size="lg"
                                    color="secondary"
                                    onClick={step === "phone" ? handleSendOtp : handleVerifyOtp}
                                    isDisabled={loading || (step === "phone" ? identifier.length < 10 : otp.length < 4)}
                                    isLoading={loading}
                                >
                                    {step === "phone" ? "Send OTP" : "Verify & Continue"}
                                </Button>
                                
                                {step === "otp" && (
                                    <div className="flex flex-col gap-2 items-center">
                                        <Button 
                                            size="sm" 
                                            color="link-gray" 
                                            onClick={handleSendOtp}
                                            isDisabled={resendTimer > 0 || loading}
                                        >
                                            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            color="link-gray" 
                                            onClick={() => {
                                                setStep("phone");
                                                setErrorMsg(null);
                                                setOtp("");
                                            }}
                                            className="self-center"
                                        >
                                            Change Phone Number
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {step === "phone" && (
                                <>
                                    <div className="text-sm text-tertiary">
                                        <span>By proceeding you agree to </span>
                                        <DialogTrigger>
                                            <Button color="link-color" size="sm">T&amp;C</Button>
                                            <ModalOverlay isDismissable>
                                                <Modal>
                                                    <Dialog aria-label="Terms and Conditions">
                                                        {({ close }) => (
                                                            <div className="mx-auto w-[min(92vw,900px)] max-h-[80vh] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                                                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                                                    <div className="flex min-w-0 flex-col">
                                                                        <h2 className="text-lg font-semibold text-primary">Terms and Conditions</h2>
                                                                        <p className="text-sm text-tertiary">Please review the Terms carefully</p>
                                                                    </div>
                                                                    <Button size="sm" onClick={() => close()}>Close</Button>
                                                                </div>
                                                                <div className="px-4 py-4">
                                                                    <iframe
                                                                        title="Terms"
                                                                        src="/terms?embed=1"
                                                                        className="h-[65vh] w-full rounded-xl ring-1 ring-secondary"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dialog>
                                                </Modal>
                                            </ModalOverlay>
                                        </DialogTrigger>
                                        <span> and </span>
                                        <DialogTrigger>
                                            <Button color="link-color" size="sm">Privacy Policy</Button>
                                            <ModalOverlay isDismissable>
                                                <Modal>
                                                    <Dialog aria-label="Privacy Policy">
                                                        {({ close }) => (
                                                            <div className="mx-auto w-[min(92vw,900px)] max-h-[80vh] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                                                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                                                    <div className="flex min-w-0 flex-col">
                                                                        <h2 className="text-lg font-semibold text-primary">Privacy Policy</h2>
                                                                        <p className="text-sm text-tertiary">How we handle your data</p>
                                                                    </div>
                                                                    <Button size="sm" onClick={() => close()}>Close</Button>
                                                                </div>
                                                                <div className="px-4 py-4">
                                                                    <iframe
                                                                        title="Privacy"
                                                                        src="/privacy?embed=1"
                                                                        className="h-[65vh] w-full rounded-xl ring-1 ring-secondary"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dialog>
                                                </Modal>
                                            </ModalOverlay>
                                        </DialogTrigger>
                                        <span> of INFLU.</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-tertiary">Already have an account?</span>
                                        <Button color="link-color" size="sm" href="/login">Login here</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        alt="Register illustration"
                        src="/register.png"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

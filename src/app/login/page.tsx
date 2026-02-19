"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(0);
    const router = useRouter();
    const { token, setToken, setUser } = useAuth();
    const search = useSearchParams();
    const nextPath = (search.get("next") || "/admin").trim() || "/admin";

    useEffect(() => {
        if (token) {
            router.replace(nextPath.startsWith("/") ? nextPath : "/admin");
        }
    }, [token, router, nextPath]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleSendOtp = async () => {
        if (loading) return;
        
        const cleanIdentifier = identifier.trim();
        
        if (loginMethod === "phone") {
            if (!/^\d{10}$/.test(cleanIdentifier)) {
                setErrorMsg("Please enter a valid 10-digit phone number");
                return;
            }
        } else {
            if (!cleanIdentifier) {
                setErrorMsg("Please enter your email or username");
                return;
            }
        }

        setLoading(true);
        setErrorMsg(null);

        try {
            // Using login-specific endpoint to ensure we only log in existing users
            await api.post("/auth/otp/send", { identifier: cleanIdentifier });
            setStep("otp");
            setResendTimer(30);
        } catch (e: any) {
            console.error(e);
            // If user not found, redirect to register
            if (e?.response?.status === 404 || e?.message?.toLowerCase().includes("not found") || e?.response?.data?.message?.toLowerCase().includes("not found")) {
                 router.push(`/register?phone=${cleanIdentifier}`);
                 return;
            }
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
            // Using login-specific endpoint
            const res: any = await api.post("/auth/otp/login", { 
                identifier: identifier.trim(),
                code: otp 
            });

            const { token: newToken, user } = res.data;

            if (newToken) {
                setToken(newToken);
                // Redundancy for persistence similar to other clients
                const d = new Date();
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                document.cookie = `influu_token=${newToken};expires=${d.toUTCString()};path=/`;
                
                if (user) {
                    setUser(user);
                    if (user.id) localStorage.setItem("influu_user_id", user.id);
                    if (user.username) localStorage.setItem("influu_username", user.username);
                }
                router.replace(nextPath.startsWith("/") ? nextPath : "/admin");
                return;
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
                                    {step === "phone" ? "Welcome Back!" : "Verify OTP"}
                                </h1>
                                <p className="text-md text-tertiary">
                                    {step === "phone" 
                                        ? (loginMethod === "phone" ? "Access your account with your phone number." : "Access your account with your email or username.") 
                                        : `Enter the code sent to ${identifier}`}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {step === "phone" ? (
                                    loginMethod === "phone" ? (
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
                                            label="Email or Username"
                                            placeholder="Enter your email or username"
                                            value={identifier}
                                            onChange={(v) => {
                                                setIdentifier(String(v));
                                                if (errorMsg) setErrorMsg(null);
                                            }}
                                            type="text"
                                            className="flex-1"
                                            isInvalid={!!errorMsg}
                                            hint={errorMsg || undefined}
                                        />
                                    )
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
                                    isDisabled={
                                        loading || 
                                        (step === "phone" 
                                            ? (loginMethod === "phone" ? identifier.length < 10 : identifier.length < 1)
                                            : otp.length < 4)
                                    }
                                    isLoading={loading}
                                >
                                    {step === "phone" ? "Send OTP" : "Verify & Login"}
                                </Button>
                                
                                {step === "phone" && (
                                    <div className="mt-2 flex flex-col gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-gray-200" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="bg-white px-2 text-gray-500">Or login with</span>
                                            </div>
                                        </div>
                                        <Button
                                            size="lg"
                                            color="link-gray"
                                            className="w-full border border-gray-200"
                                            onClick={() => {
                                                setLoginMethod(loginMethod === "phone" ? "email" : "phone");
                                                setIdentifier("");
                                                setErrorMsg(null);
                                            }}
                                        >
                                            {loginMethod === "phone" ? "Email or Username" : "Phone Number"}
                                        </Button>
                                    </div>
                                )}
                                
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
                                            {loginMethod === "phone" ? "Change Phone Number" : "Change Email/Username"}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {step === "phone" && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-tertiary">New here?</span>
                                    <Button color="link-color" size="sm" href="/register">Register</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        alt="Login illustration"
                        src="/login.png"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

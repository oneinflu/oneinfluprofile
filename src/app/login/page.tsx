"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Edit01 } from "@untitledui/icons";
import { useAuth } from "@/providers/auth";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { loginPassword, loginSendOtp, loginVerifyOtp } = useAuth();

    const handleContinue = () => {
        if (!showPassword) {
            if (!identifier.trim()) return;
            setShowPassword(true);
            const payload = { identifier: identifier.trim() };
            const expected = {
                success: true,
                status: "ok",
                message: "Identifier accepted",
                data: { methods: ["password", "otp"], userExists: true },
                traceId: "trace_identify",
            };
            console.group("LOGIN_IDENTIFY");
            console.log("REQUEST POST /api/auth/identify", payload);
            console.log("EXPECTED_RESPONSE_SHAPE", expected);
            console.groupEnd();
            return;
        }
        handleLogin();
    };

    const handleLogin = async () => {
        await loginPassword(identifier.trim(), password);
        router.push("/admin");
    };

    const handleGoogle = () => {
        const payload = {
            provider: "google",
            method: "oauth",
            redirectUri: typeof window !== "undefined" ? window.location.origin + "/login/callback" : "https://oneinflu.com/login/callback",
        };
        const expected = {
            success: true,
            status: "redirect",
            message: "Redirect to provider",
            data: { authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?..." },
            traceId: "trace_oauth",
        };
        // eslint-disable-next-line no-console
        console.group("LOGIN_OAUTH");
        // eslint-disable-next-line no-console
        console.log("REQUEST /api/auth/oauth/start", payload);
        // eslint-disable-next-line no-console
        console.log("EXPECTED_RESPONSE_SHAPE", expected);
        // eslint-disable-next-line no-console
        console.groupEnd();
    };

    const handleOtp = async () => {
        await loginSendOtp(identifier.trim());
        const to = encodeURIComponent(identifier.trim());
        router.push(`/verify?mode=login&identifier=${to}`);
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
                                <h1 className="text-display-sm font-semibold text-primary">Welcome Back!</h1>
                                <p className="text-md text-tertiary">Access your account with your email or username.</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Input label="Email or Username" placeholder="Enter email or handle" value={identifier} onChange={(v) => setIdentifier(String(v))} isReadOnly={showPassword} className="flex-1" />
                                {showPassword && <ButtonUtility aria-label="Edit" icon={Edit01} size="sm" onClick={() => setShowPassword(false)} />}
                            </div>

                            {showPassword && <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(v) => setPassword(String(v))} />}

                            <Button size="lg" onClick={handleContinue} isDisabled={!identifier.trim() || (showPassword && !password.trim())}>Continue</Button>
                            {showPassword && <Button size="lg" color="secondary" onClick={handleOtp}>Continue with one-time password</Button>}

                            <div className="flex items-center gap-3">
                                <div className="h-px w-full bg-border-secondary" />
                                <span className="text-sm text-tertiary">or</span>
                                <div className="h-px w-full bg-border-secondary" />
                            </div>

                            <SocialButton social="google" size="lg" className="w-full" onClick={handleGoogle}>Continue with Google</SocialButton>

                            <div className="flex items-center justify-between">
                                <Button color="link-gray" size="sm">Forgot password</Button>
                                <Button color="link-gray" size="sm">Forgot username</Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-tertiary">New here?</span>
                                <Button color="link-color" size="sm" href="/register">Register</Button>
                            </div>
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

"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const nextHref = "/username";

    const handleContinue = async () => {
        if (!email.trim() || loading) return;
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        const payload = { email: email.trim() };
        const expected = {
            success: true,
            status: "ok",
            message: "OTP sent",
            data: { delivery: "email", otp: "164962" },
        };
        console.group("REGISTER_OTP_SEND");
        console.log("REQUEST POST", `${API_BASE}/auth/register/otp/send`, payload);
        console.log("EXPECTED_RESPONSE_SHAPE", expected);
        console.groupEnd();
        try {
            const res = await fetch(`${API_BASE}/auth/register/otp/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            console.group("REGISTER_OTP_SEND_RESPONSE");
            console.log("STATUS", res.status);
            console.log("BODY", data);
            console.groupEnd();
            const requestId = data && data.data && data.data.id ? String(data.data.id) : "";
            if (requestId) {
                try {
                    localStorage.setItem("influu_register_request_id", requestId);
                } catch {}
            }
            try {
                localStorage.setItem("influu_register_email", payload.email);
            } catch {}
            router.push(nextHref);
        } catch (e) {
            console.group("REGISTER_OTP_SEND_ERROR");
            console.error(e);
            console.groupEnd();
        } finally {
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
                                <h1 className="text-display-sm font-semibold text-primary">Register</h1>
                                <p className="text-md text-tertiary">Create your account with your email.</p>
                            </div>

                            <Input label="Email" placeholder="Enter your email" value={email} onChange={setEmail} />

                            <Button size="lg" onClick={handleContinue} isDisabled={!email.trim() || loading}>
                                {loading ? "Sending..." : "Continue"}
                            </Button>

                            <div className="flex items-center gap-3">
                                <div className="h-px w-full bg-border-secondary" />
                                <span className="text-sm text-tertiary">or</span>
                                <div className="h-px w-full bg-border-secondary" />
                            </div>

                            <SocialButton social="google" size="lg" className="w-full">Sign up with Google</SocialButton>

                            <p className="text-sm text-tertiary">
                                By proceeding you agree to T&amp;C and Privacy Policy of INFLU.
                            </p>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-tertiary">Already have an account?</span>
                                <Button color="link-color" size="sm" href="/login">Login here</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        alt="Register illustration"
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

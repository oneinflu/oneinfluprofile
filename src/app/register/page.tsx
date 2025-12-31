"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { registerStart } = useAuth();

    const nextHref = "/username";

    const handleContinue = async () => {
        if (!email.trim() || loading) return;
        setLoading(true);
        try {
            const id = await registerStart(email.trim());
            const requestId = String(id || "");
            router.push(`${nextHref}?id=${encodeURIComponent(requestId)}&email=${encodeURIComponent(email.trim())}`);
        } catch (e) {
            // noop
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

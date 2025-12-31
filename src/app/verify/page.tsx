"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { PinInput } from "@/components/base/pin-input/pin-input";
import { useAuth } from "@/providers/auth";

const VerifyContent = () => {
    const params = useSearchParams();
    const to = params.get("to") || params.get("email") || params.get("identifier") || "your email";
    const mode = params.get("mode") || "register";
    const identifier = params.get("identifier") || "";
    const id = params.get("id") || "";
    const router = useRouter();
    const { registerSendOtp, registerVerifyOtp, loginSendOtp, loginVerifyOtp } = useAuth();
    useEffect(() => {
        if (mode === "login") {
            if (!identifier) return;
            loginSendOtp(identifier);
            return;
        }
        if (!id) return;
        registerSendOtp(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function send() {
        if (mode === "login") {
            if (!identifier) return;
            await loginSendOtp(identifier);
            return;
        }
        if (!id) return;
        await registerSendOtp(id);
    }
    async function submit(code: string) {
        if (mode === "login") {
            if (!identifier) return;
            await loginVerifyOtp(identifier, code);
            router.push("/admin");
            return;
        }
        if (!id) return;
        await registerVerifyOtp(id, code);
        router.push("/select-category");
    }

    return (
        <section className="flex min-h-screen items-center justify-center px-4 md:px-8">
            <div className="w-full max-w-sm md:max-w-md">
                <div className="flex w-full flex-col items-center gap-6 text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Check your inbox</h1>
                        <p className="text-md text-tertiary">We sent a temporary 6-digit code to {to}.</p>
                    </div>

                    <PinInput size="sm" className="w-full">
                        <PinInput.Group width={6} maxLength={6} containerClassName="justify-center" inputClassName="w-full" onComplete={(v: string) => submit(v)}>
                            <PinInput.Slot index={0} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={1} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={2} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={3} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={4} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={5} className="size-12 text-md font-semibold" />
                        </PinInput.Group>
                    </PinInput>

                    <Button size="lg" className="w-full" onClick={() => send()}>Resend code</Button>

                </div>
            </div>
        </section>
    );
};

export default function VerifyPage() {
    return (
        <Suspense fallback={null}>
            <VerifyContent />
        </Suspense>
    );
}

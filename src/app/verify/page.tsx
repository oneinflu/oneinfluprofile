"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/base/buttons/button";
import { PinInput } from "@/components/base/pin-input/pin-input";

const VerifyContent = () => {
    const params = useSearchParams();
    const email = params.get("email") || "your email";

    return (
        <section className="flex min-h-screen items-center justify-center bg-primary px-4 md:px-8">
            <div className="w-full max-w-sm md:max-w-md">
                <div className="flex w-full flex-col items-center gap-6 text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Check your inbox</h1>
                        <p className="text-md text-tertiary">We sent a temporary 6-digit code to {email}.</p>
                    </div>

                    <PinInput size="sm" className="w-full">
                        <PinInput.Group width={6} maxLength={6} containerClassName="justify-center" inputClassName="w-full">
                            <PinInput.Slot index={0} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={1} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={2} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={3} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={4} className="size-12 text-md font-semibold" />
                            <PinInput.Slot index={5} className="size-12 text-md font-semibold" />
                        </PinInput.Group>
                    </PinInput>

                    <Button size="lg" className="w-full" href="/select-category">Submit</Button>

                    <Button color="link-gray" size="sm">Resend code</Button>
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

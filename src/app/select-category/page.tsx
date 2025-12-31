"use client";

import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { useState } from "react";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";

export default function SelectCategoryPage() {
    const [value, setValue] = useState<string | null>(null);
    const { user, updateUserById } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onNext = async () => {
        if (!user || !value) return;
        const category =
            value === "creator" ? "Creator" :
            value === "business" ? "Business" :
            value === "personal" ? "Personal" : null;
        if (!category) return;
        if (loading) return;
        setLoading(true);
        try {
            await updateUserById(user.id, { category });
            router.push("/select-platforms");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-screen items-center justify-center px-4 md:px-8">
            <div className="w-full max-w-xl">
                <div className="flex flex-col items-center gap-8 text-center">
                    <div className="w-full">
                        <ProgressBarBase value={1} min={0} max={4} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Which best describes your goal for using Influ?</h1>
                        <p className="text-md text-tertiary">This helps us personalize your experience.</p>
                    </div>

                    <RadioGroup className="w-full items-stretch gap-4" aria-label="Goal selection" value={value ?? undefined} onChange={setValue}>
                        <RadioButton
                            value="creator"
                            label="Creator"
                            hint={(
                                <>
                                    <span className="block font-semibold text-secondary truncate">Turn your content into paid work</span>
                                    <span className="block text-sm text-tertiary">Show your portfolio, list services, receive enquiries, and get paid — all from one INFLU profile.</span>
                                </>
                            )}
                            className={(state) =>
                                cx(
                                    "w-full rounded-xl bg-primary p-5 text-left ring-1 ring-primary transition duration-100 ease-linear flex flex-col gap-3 h-30 [&>div:first-child]:hidden",
                                    "hover:bg-primary_hover",
                                    state.isSelected && "ring-brand bg-primary_hover",
                                )
                            }
                            size="md"
                            hideIndicator
                        />
                        <RadioButton
                            value="business"
                            label="Business"
                            hint={(
                                <>
                                    <span className="block font-semibold text-secondary truncate">Find creators and close deals faster.</span>
                                    <span className="block text-sm text-tertiary">View verified profiles, request services, chat on WhatsApp, and make payments — no messy DMs.</span>
                                </>
                            )}
                            className={(state) =>
                                cx(
                                    "w-full rounded-xl bg-primary p-5 text-left ring-1 ring-primary transition duration-100 ease-linear flex flex-col gap-3 h-30 [&>div:first-child]:hidden",
                                    "hover:bg-primary_hover",
                                    state.isSelected && "ring-brand bg-primary_hover",
                                )
                            }
                            size="md"
                            hideIndicator
                        />
                        <RadioButton
                            value="personal"
                            label="Personal"
                            hint={(
                                <>
                                    <span className="block font-semibold text-secondary truncate">Share everything with one smart link.</span>
                                    <span className="block text-sm text-tertiary">Keep all your links, work, and contact details in one clean public profile.</span>
                                </>
                            )}
                            className={(state) =>
                                cx(
                                    "w-full rounded-xl bg-primary p-5 text-left ring-1 ring-primary transition duration-100 ease-linear flex flex-col gap-3 h-30 [&>div:first-child]:hidden",
                                    "hover:bg-primary_hover",
                                    state.isSelected && "ring-brand bg-primary_hover",
                                )
                            }
                            size="md"
                            hideIndicator
                        />
                    </RadioGroup>

                    <Button size="lg" className="w-full" onClick={onNext} isDisabled={!value || loading} isLoading={loading}>Continue</Button>
                </div>
            </div>
        </section>
    );
}

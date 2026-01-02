"use client";

import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectPlatformsPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const items = [
        { value: "instagram", label: "Instagram", imgSrc: "/instagram.png" },
        { value: "facebook", label: "Facebook", imgSrc: "/facebook.png" },
        { value: "linkedin", label: "LinkedIn", imgSrc: "/linkedin.png" },
        { value: "google-business", label: "Google Business", imgSrc: "/google.png" },
        { value: "pinterest", label: "Pinterest", imgSrc: "/pinterest.png" },
        { value: "x", label: "X", imgSrc: "/twitter.png" },
        { value: "threads", label: "Threads", imgSrc: "/threads.png" },
        { value: "website", label: "Website", imgSrc: "/web.png" },
        { value: "youtube", label: "YouTube", imgSrc: "/youtube.png" },
        { value: "whatsapp", label: "WhatsApp", imgSrc: "/whatsapp.png" },
        { value: "tiktok", label: "TikTok", imgSrc: "/tiktok.png" },
        { value: "telegram", label: "Telegram", imgSrc: "/telegram.png" },
        { value: "snapchat", label: "Snapchat", imgSrc: "/logo.png" },
    ];

    const toggle = (value: string, isSelected: boolean) => {
        setSelected((prev) => (isSelected ? [...prev, value] : prev.filter((v) => v !== value)));
    };

    return (
        <section className="flex min-h-screen flex-col">
            <div className=" top-0 z-20 px-4 md:px-8 pt-6 pb-4">
                <div className="mx-auto w-full max-w-xl text-center">
                    <div className="w-full">
                        <ProgressBarBase value={2} min={0} max={4} />
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Which platforms are you on?</h1>
                        <p className="text-md text-tertiary">Pick up to five to get started. You can update at any time.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-28">
                <div className="mx-auto w-full max-w-xl">
                    <div className="grid w-full grid-cols-3 gap-4 justify-items-center gap-y-6" aria-label="Platforms selection">
                        {items.map((item) => (
                            <Checkbox
                                key={item.value}
                                value={item.value}
                                hint={(
                                    <>
                                        <img src={item.imgSrc} alt={item.label} className="mx-auto size-8 rounded-xl" />
                                        <span className="block text-sm font-semibold text-secondary">{item.label}</span>
                                    </>
                                )}
                                    className={(state) =>
                                        cx(
                                            "w-24 md:w-32 rounded-xl bg-primary p-3 text-center ring-1 ring-primary transition duration-100 ease-linear flex flex-col items-center justify-center gap-2 h-28 md:h-32",
                                            "hover:bg-primary_hover",
                                            state.isSelected && "ring-brand bg-primary_hover",
                                        )
                                    }
                                size="md"
                                hideIndicator
                                onChange={(isSelected) => toggle(item.value, isSelected)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 px-4 md:px-8 py-4 text-center">
                <Button
                    size="lg"
                    className="mx-auto w-full max-w-xl"
                    onClick={() => {
                        if (!selected.length || loading) return;
                        setLoading(true);
                        try {
                            sessionStorage.setItem("influu_selected_platforms", selected.join(","));
                        } catch {}
                        router.push("/add-links");
                    }}
                    isDisabled={selected.length === 0 || loading}
                    isLoading={loading}
                >
                    Continue
                </Button>
            </div>
        </section>
    );
}

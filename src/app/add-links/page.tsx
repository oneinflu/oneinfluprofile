"use client";

import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Plus, Trash01 } from "@untitledui/icons";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth";

const AddLinksContent = () => {
    const params = useSearchParams();
    const ss = typeof window !== "undefined" ? window.sessionStorage : undefined;
    const ssCsv = ss ? ss.getItem("influu_selected_platforms") || "" : "";
    const selectedCsv = ssCsv || params.get("platforms") || "";
    const selected = selectedCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const images: Record<string, string> = {
        instagram: "/instagram.png",
        facebook: "/facebook.png",
        linkedin: "/linkedin.png",
        "google-business": "/google.png",
        pinterest: "/pinterest.png",
       
        x: "/twitter.png",
        threads: "/threads.png",
        website: "/web.png",
        youtube: "/youtube.png",
        whatsapp: "/whatsapp.png",
        tiktok: "/tiktok.png",
        telegram: "/telegram.png",
        snapchat: "/logo.png",
       
    };

    const order = [
        "instagram",
        "whatsapp",
        "tiktok",
        "youtube",
        "website",
       
        "x",
        "facebook",
        "linkedin",
        "pinterest",
        "threads",
        "snapchat",
        "telegram",
        "google-business",
    ];

    const initial = (selected.length ? order.filter((k) => selected.includes(k)) : order).map((key) => ({ key, img: images[key] }));
    const [rows, setRows] = useState(initial);
    const [urls, setUrls] = useState<Record<string, string>>({});
    const { user, createSocialLink } = useAuth();
    const allKeys = order;
    const remaining = allKeys.filter((k) => !rows.some((r) => r.key === k)).map((key) => ({ key, img: images[key] }));
    const [showAdd, setShowAdd] = useState(false);
    const [saving, setSaving] = useState(false);

    const removeRow = (key: string) => setRows((prev) => prev.filter((r) => r.key !== key));
    const addRow = (key: string) => {
        const img = images[key];
        setRows((prev) => [...prev, { key, img }]);
        setShowAdd(false);
    };

    return (
        <section className="flex min-h-screen flex-col">
            <div className="sticky top-0 z-20 px-4 md:px-8 pt-6 pb-4">
                <div className="mx-auto w-full max-w-xl text-center">
                    <div className="w-full">
                        <ProgressBarBase value={3} min={0} max={4} />
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Add your links</h1>
                        <p className="text-md text-tertiary">Complete the fields below to add your content to your new Influ.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-28">
                <div className="mx-auto w-full max-w-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-secondary">Your selections</h2>
                        <Button size="sm" color="secondary" iconLeading={Plus} onClick={() => setShowAdd((v) => !v)}>
                            Add platform
                        </Button>
                    </div>

                    {showAdd && remaining.length > 0 && (
                        <div className="mb-4 grid grid-cols-4 md:grid-cols-6 gap-2 justify-items-center">
                            {remaining.map(({ key, img }) => (
                                <Button
                                    key={key}
                                    size="sm"
                                    color="secondary"
                                    aria-label={key}
                                    className="w-14 h-14 rounded-lg ring-1 ring-primary bg-primary hover:bg-primary_hover flex items-center justify-center"
                                    onClick={() => addRow(key)}
                                >
                                    <img alt={key} src={img} className="size-7 rounded" />
                                </Button>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {rows.map(({ key, img }) => (
                            <div key={key} className="flex items-center gap-3">
                                <img alt={key} src={img} className="size-8 rounded" />
                                {key === "instagram" || key === "x" || key === "tiktok" || key === "threads" || key === "snapchat" || key === "telegram" ? (
                                    <Input
                                        size="md"
                                        placeholder="username"
                                        icon={({ className }: { className?: string }) => <span className={className}>@</span>}
                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                        inputClassName="pl-12"
                                        className="flex-1"
                                        value={urls[key] ?? ""}
                                        onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))}
                                    />
                                ) : key === "facebook" ? (
                                    <Input
                                        size="md"
                                        placeholder="username"
                                        icon={({ className }: { className?: string }) => <span className={className}>facebook.com/ </span>}
                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                        inputClassName="pl-32"
                                        className="flex-1"
                                        value={urls[key] ?? ""}
                                        onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))}
                                    />
                                ) : key === "pinterest"  ? (
                                    <Input
                                        size="md"
                                        placeholder="username"
                                        icon={({ className }: { className?: string }) => <span className={className}>pinterest.com/ </span>}
                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                        inputClassName="pl-32"
                                        className="flex-1"
                                        value={urls[key] ?? ""}
                                        onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))}
                                    />
                                ) : key === "youtube" ? (
                                    <Input
                                        size="md"
                                        placeholder="username"
                                        icon={({ className }: { className?: string }) => <span className={className}>youtube.com/ </span>}
                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                        inputClassName="pl-32"
                                        className="flex-1"
                                        value={urls[key] ?? ""}
                                        onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))}
                                    />
                                ) : key === "website" ? (
                                    <Input
                                        size="md"
                                        placeholder="your-domain.com"
                                        icon={({ className }: { className?: string }) => <span className={className}>https://</span>}
                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                        inputClassName="pl-20"
                                        className="flex-1"
                                        value={urls[key] ?? ""}
                                        onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))}
                                    />
                                ) : key === "google-business" ? (
                                    <Input size="md" placeholder="Business profile URL" className="flex-1" type="url" value={urls[key] ?? ""} onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))} />
                                ) : key === "whatsapp" ? (
                                    <Input size="md" placeholder="WhatsApp phone number" className="flex-1" type="tel" inputMode="numeric" defaultValue={urls[key] ?? "+91 "} onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))} pattern="^\\+?\\d[\\d\\s-]{6,14}$" />
                                ) : (
                                    <Input size="md" placeholder="url" className="flex-1" type="url" value={urls[key] ?? ""} onChange={(v) => setUrls((u) => ({ ...u, [key]: String(v) }))} />
                                )}
                                <Button size="sm" color="tertiary" iconLeading={Trash01} onClick={() => removeRow(key)} className="shrink-0">
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 px-4 md:px-8 py-4 text-center">
                <Button
                    size="lg"
                    className="mx-auto w-full max-w-xl"
                    onClick={async () => {
                        if (!user || saving) return;
                        setSaving(true);
                        try {
                            for (const { key } of rows) {
                                const val = urls[key];
                                if (val) {
                                    const fullUrl =
                                        key === "instagram" ? `https://instagram.com/${val}` :
                                        key === "facebook" ? `https://facebook.com/${val}` :
                                        key === "youtube" ? `https://youtube.com/${val.startsWith("@") ? val : "@"+val}` :
                                        key === "x" ? `https://x.com/${val}` :
                                        key === "pinterest" ? `https://pinterest.com/${val}` :
                                        key === "website" ? (val.startsWith("http") ? val : `https://${val}`) :
                                        val;
                                    await createSocialLink(user.username, key, fullUrl);
                                }
                            }
                            window.location.href = "/onboarding";
                        } finally {
                            setSaving(false);
                        }
                    }}
                    isDisabled={saving}
                    isLoading={saving}
                >
                    Continue
                </Button>
                <div className="mt-2">
                    <Button color="link-gray" size="sm" href="/onboarding">Skip for now</Button>
                </div>
            </div>
        </section>
    );
};

export default function AddLinksPage() {
    return (
        <Suspense fallback={null}>
            <AddLinksContent />
        </Suspense>
    );
}

"use client";

import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { useRef, useState } from "react";
import { Plus } from "@untitledui/icons";

export default function OnboardingPage() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const addTag = () => {
        const v = tagInput.trim();
        if (!v) return;
        if (tags.length >= 5) return;
        if (tags.includes(v)) return;
        setTags((prev) => [...prev, v]);
        setTagInput("");
    };

    const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

    const onTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        } else if (e.key === "Backspace" && !tagInput && tags.length) {
            removeTag(tags[tags.length - 1]);
        }
    };

    const onAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
    };

    const clearAvatar = () => setAvatarUrl(null);

    return (
        <section className="flex min-h-screen flex-col">
            <div className="sticky top-0 z-20 px-4 md:px-8 pt-6 pb-4">
                <div className="mx-auto w-full max-w-xl text-center">
                    <div className="w-full">
                        <ProgressBarBase value={4} min={0} max={4} />
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-2">
                       <h1 className="text-display-sm font-semibold text-primary">Add profile details</h1>
                        <p className="text-md text-tertiary">Add your profile image, name, and bio.</p>
                   
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-28">
                <div className="mx-auto w-full max-w-xl">
                    <div className="flex flex-col items-center gap-8">
                        <div className="relative">
                            <img src={avatarUrl || "/avatar-placeholder.png"} alt="Profile" className="size-24 rounded-full object-cover ring-1 ring-primary" />
                            <button
                                type="button"
                                className="absolute -bottom-1 -right-1 inline-flex size-7 items-center justify-center rounded-full bg-primary ring-1 ring-primary shadow-xs"
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Upload avatar"
                            >
                                <Plus className="size-4 text-secondary" />
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                        </div>

                        <Input size="md" placeholder="Display Name" value={displayName} onChange={setDisplayName} />

                        <div className="relative w-full">
                            <TextArea placeholder="Bio" rows={4} value={bio} onChange={(v) => setBio(String(v).slice(0, 160))} />
                            <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-tertiary">{bio.length}/160</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 px-4 md:px-8 py-4 text-center">
                <Button
                    size="lg"
                    className="mx-auto w-full max-w-xl"
                    href={displayName.trim() ? `/onboarding/complete?username=${encodeURIComponent(displayName.trim().toLowerCase().replace(/[^a-z0-9]+/g, ""))}` : undefined}
                    isDisabled={!displayName.trim()}
                >
                    Continue
                </Button>
                <div className="mt-2">
                    <Button color="link-gray" size="sm" href="/onboarding/complete?username=guest">Skip for now</Button>
                </div>
            </div>
        </section>
    );
}

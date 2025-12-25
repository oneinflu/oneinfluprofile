"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarAddButton } from "@/components/base/avatar/base-components/avatar-add-button";
import { Copy01, Check, ChevronUp, ChevronDown, MessageChatCircle, CurrencyDollarCircle, Trash01, Rows01 } from "@untitledui/icons";
import { useClipboard } from "@/hooks/use-clipboard";
import { Toggle } from "@/components/base/toggle/toggle";
import { Select } from "@/components/base/select/select";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
// no search params needed; preview is driven by local state

export default function MyPoriflePage() {
    const [name, setName] = useState("Your Name");
    const [username, setUsername] = useState("guest");
    const [role, setRole] = useState("Creator");
    const [bio, setBio] = useState("");
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [previewVersion, setPreviewVersion] = useState(0);
    const [ctas, setCtas] = useState<Array<{ id: "request" | "whatsapp" | "pay"; label: string; enabled: boolean; connected?: boolean }>>([
        { id: "request", label: "Request Service", enabled: true },
        { id: "whatsapp", label: "Chat on WhatsApp", enabled: false, connected: false },
        { id: "pay", label: "Pay Now", enabled: false },
    ]);
    const [links, setLinks] = useState<Array<{ id: string; platform: string; icon: string; url: string; visible: boolean }>>([
        { id: "instagram", platform: "Instagram", icon: "/instagram.png", url: "https://instagram.com/sonia", visible: true },
        { id: "youtube", platform: "YouTube", icon: "/youtube.png", url: "https://youtube.com/@sonia", visible: true },
        { id: "tiktok", platform: "TikTok", icon: "/tiktok.png", url: "https://tiktok.com/@sonia", visible: false },
    ]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [showAddPlatform, setShowAddPlatform] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const clipboard = useClipboard();

    const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";
    const profileUrl = useMemo(() => `${origin}/${username}`, [origin, username]);

    const handlePhotoPick = () => fileInputRef.current?.click();
    const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPhotoUrl(url);
            setPreviewVersion((v) => v + 1);
        }
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="sticky top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">My Profile</h1>
                            <p className="text-md text-tertiary">Manage your public profile</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl grid gap-8 lg:grid-cols-[1fr_1px_360px]">
                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <AvatarProfilePhoto size="md" src={photoUrl} alt={name} initials={name?.[0] || "U"} />
                                    <AvatarAddButton size="sm" title="Change photo" className="absolute -bottom-1 -right-1" onPress={handlePhotoPick} />
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelected} />
                                </div>
                                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                    <Input label="Name" size="md" value={name} onChange={(val) => { setName(val); setPreviewVersion((v) => v + 1); }} placeholder="Your name" />
                                    <Input label="Role / niche" size="md" value={role} onChange={(val) => { setRole(val); setPreviewVersion((v) => v + 1); }} placeholder="e.g. Tech creator" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputGroup
                                    size="md"
                                    label="Username / INFLU link"
                                    trailingAddon={
                                        <Button
                                            color="secondary"
                                            size="md"
                                            iconLeading={clipboard.copied === "profile-url" ? Check : Copy01}
                                            aria-label={clipboard.copied === "profile-url" ? "Copied" : "Copy link"}
                                            onClick={() => clipboard.copy(profileUrl, "profile-url")}
                                            className="h-full"
                                        />
                                    }
                                >
                                    <InputBase value={username} onChange={(val) => { setUsername(val); setPreviewVersion((v) => v + 1); }} placeholder="username" />
                                </InputGroup>
                            </div>

                            <div className="mt-4">
                                <TextArea
                                    label="Short bio"
                                    value={bio}
                                    onChange={(val) => { setBio(val.slice(0, 150)); setPreviewVersion((v) => v + 1); }}
                                    placeholder="Tell people about yourself (max 150 characters)"
                                    rows={4}
                                    hint={`${bio.length}/150`}
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-center justify-between">
                                <div className="flex min-w-0 flex-col">
                                    <h2 className="text-lg font-semibold text-primary">CTA Buttons</h2>
                                    <p className="text-sm text-tertiary">Manage what appears on your public profile</p>
                                </div>
                                <Button size="sm" color="link-color">View all settings</Button>
                            </div>

                            <ul className="mt-4 flex flex-col gap-2">
                                {ctas.map((item, index) => (
                                    <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-primary p-3 ring-1 ring-secondary">
                                        <div className="flex items-center gap-2">
                                            <ButtonUtility
                                                aria-label="Move up"
                                                icon={ChevronUp}
                                                size="sm"
                                                onClick={() => {
                                                    if (index === 0) return;
                                                    const next = [...ctas];
                                                    const [moved] = next.splice(index, 1);
                                                    next.splice(index - 1, 0, moved);
                                                    setCtas(next);
                                                    setPreviewVersion((v) => v + 1);
                                                }}
                                            />
                                            <ButtonUtility
                                                aria-label="Move down"
                                                icon={ChevronDown}
                                                size="sm"
                                                onClick={() => {
                                                    if (index === ctas.length - 1) return;
                                                    const next = [...ctas];
                                                    const [moved] = next.splice(index, 1);
                                                    next.splice(index + 1, 0, moved);
                                                    setCtas(next);
                                                    setPreviewVersion((v) => v + 1);
                                                }}
                                            />
                                            <p className="text-md font-medium text-primary">{item.label}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {item.id === "whatsapp" && (
                                                <Button
                                                    size="sm"
                                                    color={item.connected ? "secondary" : "link-color"}
                                                    onClick={() => {
                                                        setCtas((prev) => prev.map((c) => (c.id === "whatsapp" ? { ...c, connected: !c.connected, enabled: true } : c)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                >
                                                    {item.connected ? "Disconnect" : "Connect"}
                                                </Button>
                                            )}
                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={item.enabled}
                                                onChange={(isSelected) => {
                                                    setCtas((prev) => prev.map((c) => (c.id === item.id ? { ...c, enabled: isSelected } : c)));
                                                    setPreviewVersion((v) => v + 1);
                                                }}
                                                aria-label={`Toggle ${item.label}`}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-start justify-between">
                                <div className="flex min-w-0 flex-col">
                                    <h2 className="text-lg font-semibold text-primary">Social Presence</h2>
                                    <p className="text-sm text-tertiary">Where brands can find and verify you</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" color="secondary" onClick={() => setShowAddPlatform((s) => !s)}>
                                        + Add social link
                                    </Button>
                                </div>
                            </div>

                            {showAddPlatform && (
                                <div className="mt-3">
                                    <Select size="md" placeholder="Select platform" items={[
                                        { id: "instagram", label: "Instagram" },
                                        { id: "facebook", label: "Facebook" },
                                        { id: "linkedin", label: "LinkedIn" },
                                        { id: "google-business", label: "Google Business" },
                                        { id: "pinterest", label: "Pinterest" },
                                        { id: "x", label: "X" },
                                        { id: "threads", label: "Threads" },
                                        { id: "website", label: "Website" },
                                        { id: "youtube", label: "YouTube" },
                                        { id: "whatsapp", label: "WhatsApp" },
                                        { id: "tiktok", label: "TikTok" },
                                        { id: "telegram", label: "Telegram" },
                                        { id: "snapchat", label: "Snapchat" },
                                        { id: "other", label: "Other" },
                                    ]}
                                        onSelectionChange={(key) => {
                                            const id = String(key);
                                            const defaults: Record<string, { platform: string; icon: string; url: string }> = {
                                                instagram: { platform: "Instagram", icon: "/instagram.png", url: "https://instagram.com/" + username },
                                                facebook: { platform: "Facebook", icon: "/facebook.png", url: "https://facebook.com/" + username },
                                                linkedin: { platform: "LinkedIn", icon: "/linkedin.png", url: "https://www.linkedin.com/in/" + username },
                                                "google-business": { platform: "Google Business", icon: "/google.png", url: "https://g.page/" + username },
                                                pinterest: { platform: "Pinterest", icon: "/pinterest.png", url: "https://pinterest.com/" + username },
                                                x: { platform: "X", icon: "/twitter.png", url: "https://x.com/" + username },
                                                threads: { platform: "Threads", icon: "/threads.png", url: "https://www.threads.net/@" + username },
                                                website: { platform: "Website", icon: "/web.png", url: "https://" },
                                                youtube: { platform: "YouTube", icon: "/youtube.png", url: "https://youtube.com/@" + username },
                                                whatsapp: { platform: "WhatsApp", icon: "/whatsapp.png", url: "https://wa.me/" },
                                                tiktok: { platform: "TikTok", icon: "/tiktok.png", url: "https://tiktok.com/@" + username },
                                                telegram: { platform: "Telegram", icon: "/telegram.png", url: "https://t.me/" + username },
                                                snapchat: { platform: "Snapchat", icon: "/logo.png", url: "https://snapchat.com/add/" + username },
                                                other: { platform: "Other", icon: "/web.png", url: "https://" },
                                            };
                                            const item = defaults[id] || defaults.other;
                                            setLinks((prev) => [...prev, { id, platform: item.platform, icon: item.icon, url: item.url, visible: true }]);
                                            setPreviewVersion((v) => v + 1);
                                            setShowAddPlatform(false);
                                        }}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>
                            )}

                            <ul className="mt-4 flex flex-col gap-2">
                                {links.map((link, index) => (
                                    <li
                                        key={link.id + index}
                                        draggable
                                        onDragStart={() => setDragIndex(index)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => {
                                            if (dragIndex === null || dragIndex === index) return;
                                            const next = [...links];
                                            const [moved] = next.splice(dragIndex, 1);
                                            next.splice(index, 0, moved);
                                            setLinks(next);
                                            setDragIndex(null);
                                            setPreviewVersion((v) => v + 1);
                                        }}
                                        className="flex items-center justify-between gap-3 rounded-xl bg-primary p-3 ring-1 ring-secondary"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ButtonUtility aria-label="Drag to reorder" icon={Rows01} size="sm" />
                                            <img src={link.icon} alt={link.platform} className="size-6 rounded" />
                                            <p className="text-md font-medium text-primary">{link.platform}</p>
                                        </div>

                                        <div className="flex flex-1 items-center justify-end gap-3">
                                            {link.id === "instagram" || link.id === "x" || link.id === "tiktok" || link.id === "threads" || link.id === "snapchat" || link.id === "telegram" ? (
                                                <Input
                                                    size="md"
                                                    placeholder="username"
                                                    icon={({ className }: { className?: string }) => <span className={className}>@</span>}
                                                    iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                    inputClassName="pl-12"
                                                    className="flex-1 max-w-md"
                                                    defaultValue={(() => {
                                                        try {
                                                            const u = new URL(link.url);
                                                            return (u.pathname || "").replace(/^\/@?/, "").replace(/^\//, "");
                                                        } catch {
                                                            return "";
                                                        }
                                                    })()}
                                                    onChange={(val) => {
                                                        const bases: Record<string, string> = {
                                                            instagram: "https://instagram.com/",
                                                            x: "https://x.com/",
                                                            tiktok: "https://tiktok.com/@",
                                                            threads: "https://www.threads.net/@",
                                                            snapchat: "https://snapchat.com/add/",
                                                            telegram: "https://t.me/",
                                                        };
                                                        const base = bases[link.id] || "https://";
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: base + (val || "") } : l)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                />
                                            ) : link.id === "facebook" ? (
                                                <Input
                                                    size="md"
                                                    placeholder="username"
                                                    icon={({ className }: { className?: string }) => <span className={className}>facebook.com/ </span>}
                                                    iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                    inputClassName="pl-32"
                                                    className="flex-1 max-w-md"
                                                    defaultValue={(() => {
                                                        try {
                                                            const u = new URL(link.url);
                                                            return (u.pathname || "").replace(/^\//, "");
                                                        } catch {
                                                            return "";
                                                        }
                                                    })()}
                                                    onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: "https://facebook.com/" + (val || "") } : l)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                />
                                            ) : link.id === "pinterest" ? (
                                                <Input
                                                    size="md"
                                                    placeholder="username"
                                                    icon={({ className }: { className?: string }) => <span className={className}>pinterest.com/ </span>}
                                                    iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                    inputClassName="pl-32"
                                                    className="flex-1 max-w-md"
                                                    defaultValue={(() => {
                                                        try {
                                                            const u = new URL(link.url);
                                                            return (u.pathname || "").replace(/^\//, "");
                                                        } catch {
                                                            return "";
                                                        }
                                                    })()}
                                                    onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: "https://pinterest.com/" + (val || "") } : l)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                />
                                            ) : link.id === "youtube" ? (
                                                <Input
                                                    size="md"
                                                    placeholder="username"
                                                    icon={({ className }: { className?: string }) => <span className={className}>youtube.com/ </span>}
                                                    iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                    inputClassName="pl-32"
                                                    className="flex-1 max-w-md"
                                                    defaultValue={(() => {
                                                        try {
                                                            const u = new URL(link.url);
                                                            return (u.pathname || "").replace(/^\/@?/, "").replace(/^\//, "");
                                                        } catch {
                                                            return "";
                                                        }
                                                    })()}
                                                    onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: "https://youtube.com/@" + (val || "") } : l)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                />
                                            ) : link.id === "website" ? (
                                                <Input
                                                    size="md"
                                                    placeholder="your-domain.com"
                                                    icon={({ className }: { className?: string }) => <span className={className}>https://</span>}
                                                    iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                    inputClassName="pl-20"
                                                    className="flex-1 max-w-md"
                                                    defaultValue={(() => link.url.replace(/^https?:\/\//, ""))()}
                                                    onChange={(val) => {
                                                        const sanitized = (val || "").replace(/^https?:\/\//, "");
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: "https://" + sanitized } : l)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                />
                                            ) : link.id === "google-business" ? (
                                                <Input size="md" placeholder="Business profile URL" className="flex-1 max-w-md" type="url" value={link.url} onChange={(val) => {
                                                    setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: val } : l)));
                                                    setPreviewVersion((v) => v + 1);
                                                }} />
                                            ) : link.id === "whatsapp" ? (
                                                <Input
                                                    size="md"
                                                    placeholder="WhatsApp phone number"
                                                    className="flex-1 max-w-md"
                                                    type="tel"
                                                    inputMode="numeric"
                                                    defaultValue={link.url.replace(/^https?:\/\/wa\.me\//, "").trim()}
                                                    onChange={(val) => {
                                                        const digits = (val || "").replace(/[^\d+\s-]/g, "");
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: "https://wa.me/" + digits } : l)));
                                                        setPreviewVersion((v) => v + 1);
                                                    }}
                                                />
                                            ) : (
                                                <Input size="md" placeholder="url" className="flex-1 max-w-md" type="url" value={link.url} onChange={(val) => {
                                                    setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: val } : l)));
                                                    setPreviewVersion((v) => v + 1);
                                                }} />
                                            )}

                                            <Toggle
                                                slim
                                                size="md"
                                                isSelected={link.visible}
                                                onChange={(isSelected) => {
                                                    setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, visible: isSelected } : l)));
                                                    setPreviewVersion((v) => v + 1);
                                                }}
                                                aria-label={`Show ${link.platform} link on profile`}
                                            />

                                            <ButtonUtility
                                                aria-label="Delete"
                                                icon={Trash01}
                                                size="sm"
                                                onClick={() => {
                                                    setLinks((prev) => prev.filter((_, i) => i !== index));
                                                    setPreviewVersion((v) => v + 1);
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div aria-hidden className="hidden lg:block self-stretch w-px bg-border-secondary" />

                    <div className="hidden lg:block">
                        <div className="lg:sticky top-6">
                            <AdminPreviewPhone username={username} version={previewVersion} ctas={ctas} />
                             </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const AdminPreviewPhone = ({ username, version, ctas }: { username: string; version: number; ctas: Array<{ id: "request" | "whatsapp" | "pay"; label: string; enabled: boolean; connected?: boolean }> }) => {
    return (
        <div className="mx-auto aspect-[9/19] w-full max-w-sm rounded-[2rem] bg-linear-to-b from-[#222] via-[#000] to-[#444] dark:from-[#d4d7da] dark:via-[#bfc3c7] dark:to-[#eceff1] p-1 shadow-2xl">
            <div className="size-full overflow-hidden rounded-[inherit] bg-alpha-black ring-1 ring-primary relative">
                <iframe key={version} title="Profile preview" src={`/${username}?v=${version}`} className="size-full border-0" />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-center gap-2">
                    {ctas
                        .filter((c) => c.enabled && (c.id !== "whatsapp" || c.connected))
                        .map((c) => (
                            <span key={c.id} className="pointer-events-auto">
                                <Button size="sm" color={c.id === "pay" ? "secondary" : "tertiary"} iconLeading={c.id === "pay" ? CurrencyDollarCircle : MessageChatCircle}>
                                    {c.label}
                                </Button>
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

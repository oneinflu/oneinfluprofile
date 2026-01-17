"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Rows01, Trash01 } from "@untitledui/icons";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

export default function SocialLinksPage() {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [previewVersion, setPreviewVersion] = useState(0);
    const [links, setLinks] = useState<Array<{ id: string; linkId?: string; platform: string; icon: string; url: string; visible: boolean }>>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [showAddPlatform, setShowAddPlatform] = useState(false);
    const [ctas, setCtas] = useState<Array<{ id: "request" | "whatsapp" | "pay"; label: string; enabled: boolean; connected?: boolean }>>([
        { id: "request", label: "Request Service", enabled: true },
        { id: "whatsapp", label: "Chat on WhatsApp", enabled: false, connected: false },
        { id: "pay", label: "Pay Now", enabled: false },
    ]);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!token || !user?.id) return;
                const me = await api.get<{ id: string; username: string; upi?: string }>(`/users/id/${user.id}`, { token });
                if (!alive) return;
                setUsername(me.username || "");
                setCtas((prev) => prev.map((c) => (c.id === "pay" ? { ...c, enabled: Boolean(me.upi) } : c)));

                const res = await api.get<{ success: boolean; status: string; data: { links: Array<{ _id: string; platform: string; url: string; visible?: boolean }> } }>(`/users/id/${user.id}/social-links`, { token });
                const iconMap: Record<string, string> = {
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
                    other: "/web.png",
                };
                const labelMap: Record<string, string> = {
                    instagram: "Instagram",
                    facebook: "Facebook",
                    linkedin: "LinkedIn",
                    "google-business": "Google Business",
                    pinterest: "Pinterest",
                    x: "X",
                    threads: "Threads",
                    website: "Website",
                    youtube: "YouTube",
                    whatsapp: "WhatsApp",
                    tiktok: "TikTok",
                    telegram: "Telegram",
                    snapchat: "Snapchat",
                    other: "Other",
                };
                const mapped = (res.data?.links || []).map((l) => ({
                    id: l.platform,
                    linkId: String(l._id),
                    platform: labelMap[l.platform] || "Website",
                    icon: iconMap[l.platform] || "/web.png",
                    url: l.url,
                    visible: Boolean(l.visible ?? true),
                }));
                setLinks(mapped);
                setPreviewVersion((v) => v + 1);
            } catch {}
            finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [token, user?.id]);

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Social Media Links</h1>
                            <p className="text-md text-tertiary">Manage your social presence</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl grid gap-8 lg:grid-cols-[1fr_1px_360px]">
                    {loading && (
                        <>
                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                <div className="flex items-start justify-between">
                                    <div className="flex min-w-0 flex-col">
                                        <div className="h-6 w-40 bg-primary_hover animate-pulse rounded" />
                                        <div className="mt-2 h-4 w-64 bg-primary_hover animate-pulse rounded" />
                                    </div>
                                    <div className="h-8 w-32 bg-primary_hover animate-pulse rounded" />
                                </div>
                                <div className="mt-4 space-y-3">
                                    <div className="h-12 bg-primary_hover animate-pulse rounded" />
                                    <div className="h-12 bg-primary_hover animate-pulse rounded" />
                                    <div className="h-12 bg-primary_hover animate-pulse rounded" />
                                </div>
                            </div>
                            <div aria-hidden className="hidden lg:block self-stretch w-px bg-border-secondary" />
                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                <div className="h-5 w-40 bg-primary_hover animate-pulse rounded" />
                                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                    <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                </div>
                            </div>
                        </>
                    )}

                    {!loading && (
                        <>
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
                                        <Select
                                            size="md"
                                            placeholder="Select platform"
                                            items={[
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
                                            onSelectionChange={async (key) => {
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
                                                try {
                                                    if (!token || !user?.id) return;
                                                    const res = await api.post<{ success: boolean; status: string; data: { link: { id: string } } }>(`/users/id/${user.id}/social-links`, { platform: id, url: item.url, visible: true }, { token });
                                                    setLinks((prev) => [...prev, { id, linkId: res.data?.link?.id, platform: item.platform, icon: item.icon, url: item.url, visible: true }]);
                                                    setPreviewVersion((v) => v + 1);
                                                    setShowAddPlatform(false);
                                                } catch {}
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
                                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-primary p-3 ring-1 ring-secondary"
                                        >
                                            <div className="flex md:hidden items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <ButtonUtility aria-label="Drag to reorder" icon={Rows01} size="sm" />
                                                    <img src={link.icon} alt={link.platform} className="size-6 rounded" />
                                                    <p className="text-md font-medium text-primary">{link.platform}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Toggle
                                                        slim
                                                        size="md"
                                                        isSelected={link.visible}
                                                        onChange={async (isSelected) => {
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, visible: isSelected } : l)));
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { visible: isSelected }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                        aria-label={`Show ${link.platform} link on profile`}
                                                    />
                                                    <ButtonUtility
                                                        aria-label="Delete"
                                                        icon={Trash01}
                                                        size="sm"
                                                        onClick={async () => {
                                                            setLinks((prev) => prev.filter((_, i) => i !== index));
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.delete(`/users/id/${user.id}/social-links/${link.linkId}`, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="hidden md:flex items-center gap-3">
                                                <ButtonUtility aria-label="Drag to reorder" icon={Rows01} size="sm" />
                                                <img src={link.icon} alt={link.platform} className="size-6 rounded" />
                                                <p className="text-md font-medium text-primary">{link.platform}</p>
                                            </div>

                                            <div className="mt-2 md:hidden">
                                                {link.id === "instagram" || link.id === "x" || link.id === "tiktok" || link.id === "threads" || link.id === "snapchat" || link.id === "telegram" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>@</span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-12"
                                                        className="w-full"
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
                                                            const nextUrl = base + (val || "");
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "facebook" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>facebook.com/ </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-32"
                                                        className="w-full"
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
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "pinterest" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>pinterest.com/ </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-32"
                                                        className="w-full"
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
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "youtube" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="channel"
                                                        icon={({ className }: { className?: string }) => <span className={className}>youtube.com/ </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-32"
                                                        className="w-full"
                                                        defaultValue={(() => {
                                                            try {
                                                                const u = new URL(link.url);
                                                                return (u.pathname || "").replace(/^\//, "");
                                                            } catch {
                                                                return "";
                                                            }
                                                        })()}
                                                        onChange={(val) => {
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: "https://youtube.com/" + (val || "") } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "website" || link.id === "other" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="your-website.com"
                                                        icon={({ className }: { className?: string }) => <span className={className}>https:// </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-20"
                                                        className="w-full"
                                                        defaultValue={(() => link.url.replace(/^https?:\/\//, ""))()}
                                                        onChange={(val) => {
                                                            const sanitized = (val || "").replace(/^https?:\/\//, "");
                                                            const nextUrl = "https://" + sanitized;
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            const nextUrl = link.url;
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: nextUrl }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "google-business" ? (
                                                    <Input size="md" placeholder="Business profile URL" className="w-full" type="url" value={link.url} onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: val } : l)));
                                                    }} onBlur={async () => {
                                                        try {
                                                            if (!token || !user?.id || !link.linkId) return;
                                                            await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                            setPreviewVersion((v) => v + 1);
                                                        } catch {}
                                                    }} />
                                                ) : link.id === "whatsapp" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="WhatsApp phone number"
                                                        className="w-full"
                                                        type="tel"
                                                        inputMode="numeric"
                                                        defaultValue={link.url.replace(/^https?:\/\/wa\.me\//, "").trim()}
                                                        onChange={(val) => {
                                                            const digits = (val || "").replace(/[^\d+\s-]/g, "");
                                                            const nextUrl = "https://wa.me/" + digits;
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            const nextUrl = link.url;
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: nextUrl }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : (
                                                    <Input size="md" placeholder="url" className="w-full" type="url" value={link.url} onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: val } : l)));
                                                    }} onBlur={async () => {
                                                        try {
                                                            if (!token || !user?.id || !link.linkId) return;
                                                            await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                            setPreviewVersion((v) => v + 1);
                                                        } catch {}
                                                    }} />
                                                )}
                                            </div>

                                            <div className="hidden md:flex flex-1 md:items-center md:justify-end gap-3">
                                                <div className="flex items-center gap-2 md:order-1 order-1">
                                                    <Toggle
                                                        slim
                                                        size="md"
                                                        isSelected={link.visible}
                                                        onChange={async (isSelected) => {
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, visible: isSelected } : l)));
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { visible: isSelected }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                        aria-label={`Show ${link.platform} link on profile`}
                                                    />
                                                    <ButtonUtility
                                                        aria-label="Delete"
                                                        icon={Trash01}
                                                        size="sm"
                                                        onClick={async () => {
                                                            setLinks((prev) => prev.filter((_, i) => i !== index));
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.delete(`/users/id/${user.id}/social-links/${link.linkId}`, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                </div>
                                                {link.id === "instagram" || link.id === "x" || link.id === "tiktok" || link.id === "threads" || link.id === "snapchat" || link.id === "telegram" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>@</span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-12"
                                                        className="w-full md:flex-1 md:max-w-md"
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
                                                            const nextUrl = base + (val || "");
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "facebook" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>facebook.com/ </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-32"
                                                        className="w-full md:flex-1 md:max-w-md"
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
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "pinterest" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>pinterest.com/ </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-32"
                                                        className="w-full md:flex-1 md:max-w-md"
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
                                                        }}
                                                        onBlur={async () => {
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "youtube" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="username"
                                                        icon={({ className }: { className?: string }) => <span className={className}>youtube.com/ </span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-32"
                                                        className="w-full md:flex-1 md:max-w-md"
                                                        defaultValue={(() => {
                                                            try {
                                                                const u = new URL(link.url);
                                                                return (u.pathname || "").replace(/^\/@?/, "").replace(/^\//, "");
                                                            } catch {
                                                                return "";
                                                            }
                                                        })()}
                                                        onChange={(val) => {
                                                            const nextUrl = "https://youtube.com/@" + (val || "");
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            setPreviewVersion((v) => v + 1);
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "website" ? (
                                                    <Input
                                                        size="md"
                                                        placeholder="your-domain.com"
                                                        icon={({ className }: { className?: string }) => <span className={className}>https://</span>}
                                                        iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                                        inputClassName="pl-20"
                                                        className="w-full md:flex-1 md:max-w-md"
                                                        defaultValue={(() => link.url.replace(/^https?:\/\//, ""))()}
                                                        onChange={(val) => {
                                                            const sanitized = (val || "").replace(/^https?:\/\//, "");
                                                            const nextUrl = "https://" + sanitized;
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            const nextUrl = link.url;
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: nextUrl }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : link.id === "google-business" ? (
                                                    <Input size="md" placeholder="Business profile URL" className="flex-1 max-w-md" type="url" value={link.url} onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: val } : l)));
                                                    }} onBlur={async () => {
                                                        try {
                                                            if (!token || !user?.id || !link.linkId) return;
                                                            await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                            setPreviewVersion((v) => v + 1);
                                                        } catch {}
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
                                                            const nextUrl = "https://wa.me/" + digits;
                                                            setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: nextUrl } : l)));
                                                        }}
                                                        onBlur={async () => {
                                                            const nextUrl = link.url;
                                                            try {
                                                                if (!token || !user?.id || !link.linkId) return;
                                                                await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: nextUrl }, { token });
                                                                setPreviewVersion((v) => v + 1);
                                                            } catch {}
                                                        }}
                                                    />
                                                ) : (
                                                    <Input size="md" placeholder="url" className="flex-1 max-w-md" type="url" value={link.url} onChange={(val) => {
                                                        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, url: val } : l)));
                                                    }} onBlur={async () => {
                                                        try {
                                                            if (!token || !user?.id || !link.linkId) return;
                                                            await api.patch(`/users/id/${user.id}/social-links/${link.linkId}`, { url: link.url }, { token });
                                                            setPreviewVersion((v) => v + 1);
                                                        } catch {}
                                                    }} />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div aria-hidden className="hidden lg:block self-stretch w-px bg-border-secondary" />

                            <div className="hidden lg:block">
                                <div className="lg:sticky top-6">
                                    <AdminPreviewPhone username={username} version={previewVersion} ctas={ctas} />
                                </div>
                            </div>
                        </>
                    )}
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
            </div>
        </div>
    );
};

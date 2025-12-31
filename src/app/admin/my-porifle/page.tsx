"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
// no search params needed; preview is driven by local state

export default function MyPoriflePage() {
    const { token, user, uploadAvatarById, updateUserById } = useAuth();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [previewVersion, setPreviewVersion] = useState(0);
    const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email");
    const [emailId, setEmailId] = useState<string>("");
    const [whatsappNumber, setWhatsappNumber] = useState<string>("");
    const [whatsappCode, setWhatsappCode] = useState<string>("+91");
    const [emailOtpSessionId, setEmailOtpSessionId] = useState<string | null>(null);
    const [emailOtp, setEmailOtp] = useState<string>("");
    const [upiId, setUpiId] = useState<string>("");
    const [ctas, setCtas] = useState<Array<{ id: "request" | "whatsapp" | "pay"; label: string; enabled: boolean; connected?: boolean }>>([
        { id: "request", label: "Request Service", enabled: true },
        { id: "whatsapp", label: "Chat on WhatsApp", enabled: false, connected: false },
        { id: "pay", label: "Pay Now", enabled: false },
    ]);
    const [links, setLinks] = useState<Array<{ id: string; linkId?: string; platform: string; icon: string; url: string; visible: boolean }>>([]);
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
            (async () => {
                try {
                    if (!user?.id) return;
                    const url = await uploadAvatarById(user.id, file);
                    setPhotoUrl(url);
                    setPreviewVersion((v) => v + 1);
                } catch {}
            })();
        }
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!token || !user?.id) return;
                const me = await api.get<{ id: string; username: string; email: string; phone?: string | null; whatsapp?: string | null; contactPreference?: "email" | "whatsapp" | null; name?: string; shortBio?: string; avatarUrl?: string; category?: string; upi?: string }>(`/users/id/${user.id}`, { token });
                if (!alive) return;
                setName(me.name || "");
                setUsername(me.username || "");
                setOriginalUsername(me.username || "");
                const raw = String(me.category || "").trim().toLowerCase();
                const toId: Record<string, string> = { creator: "creator", business: "business", personal: "personal" };
                setRole(toId[raw] || "");
                setBio(me.shortBio || "");
                setPhotoUrl(me.avatarUrl || null);
                setCtas((prev) => prev.map((c) => (c.id === "pay" ? { ...c, enabled: Boolean(me.upi) } : c)));
                setUpiId(me.upi || "");
                setContactMethod(me.contactPreference || (me.whatsapp ? "whatsapp" : "email"));
                setEmailId(me.email || "");
                const rawWa = me.whatsapp || me.phone || "";
                const plus = rawWa.trim().startsWith("+");
                const digits = rawWa.replace(/\D/g, "");
                if (digits) {
                    if (plus) {
                        const m = rawWa.match(/^\+\d{1,3}/);
                        const code = m ? m[0] : "+91";
                        const number = rawWa.replace(code, "").replace(/\D/g, "");
                        setWhatsappCode(code);
                        setWhatsappNumber(number);
                    } else {
                        setWhatsappCode("+91");
                        setWhatsappNumber(digits);
                    }
                } else {
                    setWhatsappCode("+91");
                    setWhatsappNumber("");
                }
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
        })();
        return () => { alive = false; };
    }, [token, user?.id]);

    // Save on blur only; no per-keystroke autosave

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
                                    <Input label="Name" size="md" value={name} onChange={(val) => { setName(val); }} onBlur={async () => { try { if (!token || !user?.id) return; await updateUserById(user.id, { name }); setPreviewVersion((v) => v + 1); } catch {} }} placeholder="Your name" />
                                    <Select
                                        label="Role / niche"
                                        size="md"
                                        placeholder="Select role"
                                        selectedKey={role || null}
                                        items={[
                                            { id: "creator", label: "Creator" },
                                            { id: "business", label: "Business" },
                                            { id: "personal", label: "Personal" },
                                        ]}
                                        onSelectionChange={(key) => {
                                            const id = String(key || "");
                                            setRole(id);
                                            setPreviewVersion((v) => v + 1);
                                        }}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>
                            </div>
 <div className="mt-4">
                                <Input
                                    label="Username"
                                    size="md"
                                    value={username}
                                    onChange={(val) => {
                                        setUsername(val);
                                        setUsernameError(null);
                                    }}
                                    onBlur={async () => {
                                        try {
                                            if (!token || !user?.id) return;
                                            const val = String(username || "").trim().toLowerCase();
                                            if (!val) return;
                                            const orig = String(originalUsername || "").trim().toLowerCase();
                                            if (val !== orig) {
                                                const chk = await api.get<{ success: boolean; status: string; data: { available: boolean } }>(`/auth/username/check?username=${encodeURIComponent(val)}`, { token });
                                                if (!chk.data?.available) {
                                                    setUsernameError("Username not available");
                                                    return;
                                                }
                                            }
                                            await updateUserById(user.id, { username: val });
                                            setOriginalUsername(val);
                                            setUsernameError(null);
                                        } catch {
                                            setUsernameError("Username not available");
                                        }
                                    }}
                                    isInvalid={Boolean(usernameError)}
                                    hint={typeof usernameError === "string" ? usernameError : undefined}
                                    placeholder="username"
                                />
                            </div>
                           
                            <div className="mt-4">
                                <TextArea
                                    label="Short bio"
                                    value={bio}
                                    onChange={(val) => { setBio(val.slice(0, 150)); }}
                                    onBlur={async () => { try { if (!token || !user?.id) return; await updateUserById(user.id, { shortBio: bio }); setPreviewVersion((v) => v + 1); } catch {} }}
                                    placeholder="Tell people about yourself (max 150 characters)"
                                    rows={4}
                                    hint={`${bio.length}/150`}
                                />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                        <div className="flex items-start justify-between">
                            <div className="flex min-w-0 flex-col">
                                <h2 className="text-lg font-semibold text-primary">Point of Contact</h2>
                                <p className="text-sm text-tertiary">How brands should contact you</p>
                            </div>
                        </div>
                        <div className="mt-3 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                            <Select
                                label="Preferred method"
                                size="md"
                                selectedKey={contactMethod}
                                items={[
                                    { id: "email", label: "Email address" },
                                    { id: "whatsapp", label: "WhatsApp" },
                                ]}
                                onSelectionChange={async (key) => {
                                    const val = String(key || "email") as "email" | "whatsapp";
                                    setContactMethod(val);
                                    try {
                                        if (!token || !user?.id) return;
                                        await updateUserById(user.id, { contactPreference: val });
                                        setPreviewVersion((v) => v + 1);
                                    } catch {}
                                }}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                            {contactMethod === "email" ? (
                                <div className="flex flex-col gap-2">
                                    <Input label="Email ID" size="md" value={emailId} onChange={setEmailId} placeholder="your@email.com" />
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={async () => {
                                            try {
                                                if (!token || !user?.id || !emailId.trim()) return;
                                                const res = await api.post<{ success: boolean; status: string; data: { id: string } }>(`/users/id/${user.id}/email/otp/send`, { email: emailId.trim().toLowerCase() }, { token });
                                                setEmailOtpSessionId(res.data.id);
                                            } catch {}
                                        }}>Send OTP</Button>
                                        <InputBase size="md" value={emailOtp} onChange={setEmailOtp} placeholder="Enter OTP" />
                                        <Button size="sm" onClick={async () => {
                                            try {
                                                if (!token || !user?.id || !emailOtpSessionId || !emailOtp.trim()) return;
                                                await api.post(`/users/id/${user.id}/email/otp/verify`, { id: emailOtpSessionId, code: emailOtp.trim() }, { token });
                                                setEmailOtp("");
                                                setEmailOtpSessionId(null);
                                                setPreviewVersion((v) => v + 1);
                                            } catch {}
                                        }}>Verify & Save</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-[130px_1fr] gap-2">
                                        <Select
                                            label="Code"
                                            size="md"
                                            selectedKey={whatsappCode}
                                            items={[
                                                { id: "+91", label: "India (+91)" },
                                                { id: "+1", label: "USA (+1)" },
                                                { id: "+44", label: "UK (+44)" },
                                                { id: "+61", label: "Australia (+61)" },
                                                { id: "+971", label: "UAE (+971)" },
                                            ]}
                                            onSelectionChange={(key) => setWhatsappCode(String(key))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Input label="WhatsApp number" size="md" value={whatsappNumber} onChange={setWhatsappNumber} placeholder="WhatsApp number" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" onClick={async () => {
                                            try {
                                                if (!token || !user?.id) return;
                                                const code = whatsappCode.startsWith("+") ? whatsappCode : `+${whatsappCode}`;
                                                const number = whatsappNumber.replace(/\D/g, "");
                                                const full = `${code}${number}`;
                                                await updateUserById(user.id, { whatsapp: full });
                                                setPreviewVersion((v) => v + 1);
                                            } catch {}
                                        }}>Save</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                        <div className="flex items-start justify-between">
                            <div className="flex min-w-0 flex-col">
                                <h2 className="text-lg font-semibold text-primary">Payment Settings</h2>
                                <p className="text-sm text-tertiary">Enable Pay Now with your UPI ID</p>
                            </div>
                        </div>
                        <div className="mt-3 grid w-full grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                            <Input label="UPI ID" size="md" value={upiId} onChange={setUpiId} placeholder="yourid@bank" />
                            <div className="flex items-end">
                                <Button size="sm" color="secondary" onClick={async () => {
                                    try {
                                        if (!token || !user?.id) return;
                                        const val = upiId.trim();
                                        await updateUserById(user.id, { upi: val });
                                        setCtas((prev) => prev.map((c) => (c.id === "pay" ? { ...c, enabled: Boolean(val) } : c)));
                                        setPreviewVersion((v) => v + 1);
                                    } catch {}
                                }}>Save</Button>
                            </div>
                        </div>
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
                                                    className="flex-1 max-w-md"
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
               
            </div>
        </div>
    );
};

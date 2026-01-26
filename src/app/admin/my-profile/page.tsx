"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarAddButton } from "@/components/base/avatar/base-components/avatar-add-button";
import { Copy01, Check, ChevronUp, ChevronDown, MessageChatCircle, CurrencyDollarCircle } from "@untitledui/icons";
import { useClipboard } from "@/hooks/use-clipboard";
import { Select } from "@/components/base/select/select";
import { ComboBox } from "@/components/base/select/combobox";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { Badge } from "@/components/base/badges/badges";
// no search params needed; preview is driven by local state

export default function MyprofilePage() {
    const { token, user, uploadAvatarById, updateUserById } = useAuth();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [role, setRole] = useState("");
    const [roleInput, setRoleInput] = useState("");
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
    const [niches, setNiches] = useState<Array<{ id: string; name: string }>>([]);
    const [ctas, setCtas] = useState<Array<{ id: "request" | "whatsapp" | "pay"; label: string; enabled: boolean; connected?: boolean }>>([
        { id: "request", label: "Request Service", enabled: true },
        { id: "whatsapp", label: "Chat on WhatsApp", enabled: false, connected: false },
        { id: "pay", label: "Pay Now", enabled: false },
    ]);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [saveSuccessProfile, setSaveSuccessProfile] = useState(false);
    const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
    const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
    const [isSavingWhatsapp, setIsSavingWhatsapp] = useState(false);
    const [saveSuccessContact, setSaveSuccessContact] = useState(false);
    const [isSavingUpi, setIsSavingUpi] = useState(false);
    const [saveSuccessUpi, setSaveSuccessUpi] = useState(false);
    
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
        (async () => {
            try {
                const res = await api.get<{ success: boolean; status: string; data: { niches: Array<{ id: string; name: string }> } }>("/niches");
                if (res.success && res.data?.niches) {
                    setNiches(res.data.niches);
                }
            } catch (e) {
                console.error("Failed to fetch niches", e);
            }
        })();
    }, []);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!token || !user?.id) return;
                // Add timestamp to prevent caching
                const me = await api.get<any>(`/users/id/${user.id}?t=${Date.now()}`, { token });
              
                if (!alive) return;
                setName(me.name || "");
                setUsername(me.username || "");
                setOriginalUsername(me.username || "");
                
                // Robustly find the niche
                const rawNiche = me.niche || me.nicheName || me.category || "";
                console.log("Found niche:", rawNiche);
                
                setRole(rawNiche);
                setRoleInput(rawNiche);
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
                
            } catch {}
            finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [token, user?.id]);

    // Save on blur only; no per-keystroke autosave

    const filteredNiches = useMemo(() => {
        const term = roleInput.toLowerCase();
        const seen = new Set<string>();
        const results: Array<{ id: string; label: string }> = [];

        // Always include the current role if it matches the term (or if no term)
        // This ensures the value is displayed even if niches haven't loaded yet
        if (role && (!term || role.toLowerCase().includes(term))) {
            results.push({ id: role, label: role });
            seen.add(role);
        }

        for (const n of niches) {
            // Avoid duplicates if the role is already in the list
            if (!seen.has(n.name) && (!term || n.name.toLowerCase().includes(term))) {
                results.push({ id: n.name, label: n.name });
                seen.add(n.name);
            }
        }
        
        return results;
    }, [niches, roleInput, role]);

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className=" top-0 z-10 px-4 md:px-8 pt-6 pb-4">
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
                    {loading && (
                        <>
                            <div className="flex flex-col gap-6">
                                <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                    <div className="flex items-start gap-4">
                                        <div className="size-16 rounded-full bg-primary_hover animate-pulse" />
                                        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                            <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                            <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                    </div>
                                    <div className="mt-4">
                                        <div className="h-24 bg-primary_hover animate-pulse rounded" />
                                    </div>
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
                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <AvatarProfilePhoto size="md" src={photoUrl} alt={name} initials={name?.[0] || "U"} />
                                    <AvatarAddButton size="sm" title="Change photo" className="absolute -bottom-1 -right-1" onPress={handlePhotoPick} />
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelected} />
                                </div>
                                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                    <Input label="Name" size="md" value={name} onChange={(val) => { setName(val); }} placeholder="Your name" />
                                    <ComboBox
                                        label="Your Niche"
                                        size="md"
                                        placeholder="Select Niche"
                                        selectedKey={role || null}
                                        inputValue={roleInput}
                                        onInputChange={setRoleInput}
                                        items={filteredNiches}
                                        onSelectionChange={(key) => {
                                            const val = String(key || "");
                                            setRole(val);
                                            setRoleInput(val);
                                            setPreviewVersion((v) => v + 1);
                                        }}
                                    >
                                        {(item) => <Select.Item id={item.id} textValue={item.label}>{item.label}</Select.Item>}
                                    </ComboBox>
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
                                    placeholder="Tell people about yourself (max 150 characters)"
                                    rows={4}
                                    hint={`${bio.length}/150`}
                                />
                                <div className="mt-3 flex items-center justify-end gap-3">
                                    <Button
                                        size="md"
                                        color="primary"
                                        isLoading={isSavingProfile}
                                        onClick={async () => {
                                            try {
                                                setIsSavingProfile(true);
                                                setSaveSuccessProfile(false);
                                                if (!token || !user?.id) return;
                                                const val = String(username || "").trim().toLowerCase();
                                                const orig = String(originalUsername || "").trim().toLowerCase();
                                                if (val && val !== orig) {
                                                    const chk = await api.get<{ success: boolean; status: string; data: { available: boolean } }>(`/auth/username/check?username=${encodeURIComponent(val)}`, { token });
                                                    if (!chk.data?.available) {
                                                        setUsernameError("Username not available");
                                                        return;
                                                    }
                                                }
                                                const data: Record<string, unknown> = {};
                                                if (name) data.name = name;
                                                if (val) data.username = val;
                                                data.shortBio = bio;
                                                if (role) data.nicheName = role;
                                                await updateUserById(user.id, data);
                                                if (val) setOriginalUsername(val);
                                                setUsernameError(null);
                                                setPreviewVersion((v) => v + 1);
                                                setSaveSuccessProfile(true);
                                                setTimeout(() => setSaveSuccessProfile(false), 3000);
                                            } catch {
                                            } finally {
                                                setIsSavingProfile(false);
                                            }
                                        }}
                                    >
                                        Save changes
                                    </Button>
                                    {saveSuccessProfile && (
                                        <Badge type="pill-color" size="md" color="success">
                                            Information updated
                                        </Badge>
                                    )}
                                </div>
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
                                    {(emailId.trim().toLowerCase() !== String(user?.email || "").trim().toLowerCase()) && (
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                isLoading={isSendingEmailOtp}
                                                onClick={async () => {
                                                    try {
                                                        setIsSendingEmailOtp(true);
                                                        if (!token || !user?.id || !emailId.trim()) return;
                                                        const res = await api.post<{ success: boolean; status: string; data: { id: string } }>(`/users/id/${user.id}/email/otp/send`, { email: emailId.trim().toLowerCase() }, { token });
                                                        setEmailOtpSessionId(res.data.id);
                                                    } catch {}
                                                    finally {
                                                        setIsSendingEmailOtp(false);
                                                    }
                                                }}
                                            >
                                                Send OTP
                                            </Button>
                                            <InputBase size="md" value={emailOtp} onChange={setEmailOtp} placeholder="Enter OTP" />
                                            <Button
                                                size="sm"
                                                isLoading={isVerifyingEmailOtp}
                                                onClick={async () => {
                                                    try {
                                                        setIsVerifyingEmailOtp(true);
                                                        if (!token || !user?.id || !emailOtpSessionId || !emailOtp.trim()) return;
                                                        await api.post(`/users/id/${user.id}/email/otp/verify`, { id: emailOtpSessionId, code: emailOtp.trim() }, { token });
                                                        setEmailOtp("");
                                                        setEmailOtpSessionId(null);
                                                        setPreviewVersion((v) => v + 1);
                                                        setSaveSuccessContact(true);
                                                        setTimeout(() => setSaveSuccessContact(false), 3000);
                                                    } catch {}
                                                    finally {
                                                        setIsVerifyingEmailOtp(false);
                                                    }
                                                }}
                                            >
                                                Save changes
                                            </Button>
                                            {saveSuccessContact && (
                                                <Badge type="pill-color" size="md" color="success">
                                                    Information updated
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-[130px_1fr] gap-2">
                                        <Select
                                            label="Code"
                                            size="md"
                                            selectedKey={whatsappCode}
                                            items={[
                                                { id: "+91", label: "+91" },
                                                { id: "+1", label: "+1" },
                                                { id: "+44", label: "+44" },
                                                { id: "+61", label: "+61" },
                                                { id: "+971", label: "+971" },
                                            ]}
                                            onSelectionChange={(key) => setWhatsappCode(String(key))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Input label="WhatsApp number" size="md" value={whatsappNumber} onChange={setWhatsappNumber} placeholder="WhatsApp number" />
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="sm"
                                            isLoading={isSavingWhatsapp}
                                            onClick={async () => {
                                                try {
                                                    setIsSavingWhatsapp(true);
                                                    if (!token || !user?.id) return;
                                                    const code = whatsappCode.startsWith("+") ? whatsappCode : `+${whatsappCode}`;
                                                    const number = whatsappNumber.replace(/\D/g, "");
                                                    const full = `${code}${number}`;
                                                    await updateUserById(user.id, { whatsapp: full });
                                                    setPreviewVersion((v) => v + 1);
                                                    setSaveSuccessContact(true);
                                                    setTimeout(() => setSaveSuccessContact(false), 3000);
                                                } catch {}
                                                finally {
                                                    setIsSavingWhatsapp(false);
                                                }
                                            }}
                                        >
                                            Save changes
                                        </Button>
                                        {saveSuccessContact && (
                                            <Badge type="pill-color" size="md" color="success">
                                                Information updated
                                            </Badge>
                                        )}
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
                            <div className="flex items-end justify-end gap-2">
                                <Button
                                    size="sm"
                                    color="primary"
                                    isLoading={isSavingUpi}
                                    onClick={async () => {
                                        try {
                                            setIsSavingUpi(true);
                                            if (!token || !user?.id) return;
                                            const val = upiId.trim();
                                            await updateUserById(user.id, { upi: val });
                                            setCtas((prev) => prev.map((c) => (c.id === "pay" ? { ...c, enabled: Boolean(val) } : c)));
                                            setPreviewVersion((v) => v + 1);
                                            setSaveSuccessUpi(true);
                                            setTimeout(() => setSaveSuccessUpi(false), 3000);
                                        } catch {}
                                        finally {
                                            setIsSavingUpi(false);
                                        }
                                    }}
                                >
                                    Save changes
                                </Button>
                                {saveSuccessUpi && (
                                    <Badge type="pill-color" size="md" color="success">
                                        Information updated
                                    </Badge>
                                )}
                            </div>
                        </div>
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

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { CheckCircle, AlertCircle, ShoppingBag02, PlayCircle, MessageChatCircle, Link01, XClose, ChevronDown } from "@untitledui/icons";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";

const ALLOWED_DOMAINS = ["linktr.ee", "link.bio", "bio.site", "carrd.co", "taplink.cc", "beacons.ai"];
const PLACEHOLDERS = ["linktr.ee/username", "link.bio/username", "beacons.ai/username", "bio.site/username"];

export default function ImportBioLinkPage() {
    const router = useRouter();
    const { token } = useAuth();
    const [value, setValue] = useState("");
    const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
    const [error, setError] = useState<string | null>(null);
    const [domain, setDomain] = useState<string | null>(null);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [previewData, setPreviewData] = useState<{
        name?: string;
        linkCount: number;
        categories: string[];
        source?: string;
        links: string[];
    } | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const placeholder = useMemo(() => PLACEHOLDERS[placeholderIndex % PLACEHOLDERS.length], [placeholderIndex]);

    useEffect(() => {
        const id = window.setInterval(() => {
            if (!value.trim()) {
                setPlaceholderIndex((i) => i + 1);
            }
        }, 2500);
        return () => window.clearInterval(id);
    }, [value]);

    const normalizeUrl = (text: string) => {
        let t = text.trim();
        if (!t) return "";
        if (!/^https?:\/\//i.test(t)) {
            t = "https://" + t;
        }
        return t;
    };

    const detectDomain = (host: string) => {
        const h = host.toLowerCase();
        for (const d of ALLOWED_DOMAINS) {
            if (h === d || h.endsWith("." + d)) return d;
        }
        return null;
    };

    const validate = (text: string) => {
        try {
            const u = new URL(text);
            const d = detectDomain(u.hostname);
            setDomain(d);
            setStatus(d ? "valid" : "invalid");
        } catch {
            setDomain(null);
            setStatus("invalid");
        }
    };

    const onPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text") || "";
        const url = normalizeUrl(pasted);
        setValue(url);
        validate(url);
    };

    const onChange = (v: string) => {
        setValue(v);
        setError(null);
        const url = normalizeUrl(v);
        try {
            new URL(url);
            validate(url);
        } catch {
            setStatus("idle");
            setDomain(null);
        }
    };

    const onContinue = async () => {
        try {
            if (status !== "valid") return;
            setIsSimulating(true);
            setError(null);
            
            try {
                const urlToSend = normalizeUrl(value);
                const res = await api.post<{
                    success: boolean;
                    source?: string;
                    links: {
                        social?: string[];
                        community?: string[];
                        affiliate_shop?: string[];
                    };
                }>("/api/extract-links", { profile_url: urlToSend }, { token });

                if (!res.success) {
                    throw new Error("Extraction failed");
                }

                const social = Array.isArray(res.links?.social) ? res.links.social : [];
                const community = Array.isArray(res.links?.community) ? res.links.community : [];
                const shop = Array.isArray(res.links?.affiliate_shop) ? res.links.affiliate_shop : [];
                
                const totalLinks = social.length + community.length + shop.length;

                if (totalLinks === 0) {
                    setError("No public links found. Make sure your profile is public.");
                    return;
                }

                const categories: string[] = [];
                if (shop.length) categories.push("Shop");
                if (social.length) categories.push("Content");
                if (community.length) categories.push("Community");
                setPreviewData({
                    name: value.split("/").pop() || undefined,
                    linkCount: totalLinks,
                    categories,
                    source: res.source,
                    links: [...social, ...community, ...shop]
                });
            } catch (err) {
                console.error("API failed", err);
                setError("Unable to find profile. Please check the URL and try again.");
            }
        } catch {} finally {
            setIsSimulating(false);
        }
    };

    const onImportConfirm = () => {
        try { localStorage.setItem("influu_source_profile_link", value); } catch {}
        // Also store preview data if needed?
        router.push("/select-platforms");
    };

    const onCancelPreview = () => {
        setPreviewData(null);
    };

    const onSkip = () => {
        router.push("/select-platforms");
    };

    return (
        <section className="flex min-h-screen flex-col">
            <div className=" top-0 z-20 px-4 md:px-8 pt-6 pb-4">
                <div className="mx-auto w-full max-w-xl text-center">
                    <div className="w-full">
                        <ProgressBarBase value={2} min={0} max={4} />
                    </div>
                    {!previewData && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-6 flex flex-col items-center gap-2"
                        >
                            <h1 className="text-display-sm font-semibold text-primary">Paste your bio link. We’ll import everything.</h1>
                            <p className="text-md text-tertiary">Supports Linktree,Link.bio, Beacons, Bio.site, Carrd, Taplink &amp; more</p>
                            <p className="text-xs text-quaternary">Only public links — no login needed</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-28">
                <div className="mx-auto w-full max-w-xl flex items-center justify-center">
                    {previewData ? (
                         <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full bg-primary border border-secondary rounded-3xl p-6 shadow-xl flex flex-col items-center gap-6"
                         >
                            <div className="w-full flex justify-end">
                                <Button size="sm" color="tertiary" onClick={onCancelPreview} iconLeading={<XClose className="size-5" />} className="!p-2 rounded-full" />
                            </div>
                            
                            <div className="flex flex-col items-center gap-4 -mt-4">
                                <div className="relative">
                                    <Avatar 
                                        size="2xl" 
                                        initials={(previewData.name || "U").slice(0, 2).toUpperCase()} 
                                        className="size-24 text-xl"
                                        contrastBorder
                                    />
                                    <div className="absolute bottom-0 right-0">
                                         <div className="bg-utility-success-500 border-4 border-white rounded-full size-6" />
                                    </div>
                                </div>
                                <div className="text-center flex flex-col items-center gap-1">
                                    <h2 className="text-display-xs font-semibold text-primary">
                                        {previewData.name || "Unknown User"}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Badge size="sm" color="success" type="pill-color">Active</Badge>
                                        {previewData.source && (
                                            <span className="text-sm font-medium text-tertiary capitalize">
                                                via {previewData.source}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-3">
                                <div className="col-span-2 p-4 bg-secondary/30 border border-secondary rounded-2xl flex items-center gap-4 hover:bg-secondary/50 transition-colors">
                                    <div className="size-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                        <Link01 className="size-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-display-xs font-bold text-primary">{previewData.linkCount}</span>
                                        <span className="text-sm font-medium text-tertiary">Links Found</span>
                                    </div>
                                </div>
                            </div>

                            {previewData.categories.length > 0 && (
                                <div className="w-full flex flex-col gap-3">
                                    <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">Includes</span>
                                    <div className="flex flex-wrap gap-2">
                                        {previewData.categories.map((cat) => (
                                            <BadgeWithIcon key={cat} size="lg" color="gray" type="pill-color" iconLeading={CheckCircle}>
                                                {cat}
                                            </BadgeWithIcon>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="w-full flex flex-col gap-2">
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors w-fit group"
                                >
                                    {showDetails ? "Hide details" : "View details"}
                                    <ChevronDown className={`size-4 transition-transform duration-200 ${showDetails ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
                                </button>
                                
                                {showDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="w-full bg-secondary/30 border border-secondary rounded-xl overflow-hidden"
                                    >
                                        <div className="max-h-48 overflow-y-auto p-2 flex flex-col gap-1">
                                            {previewData.links.map((link, i) => (
                                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                                                    <div className="size-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                                        <Link01 className="size-4" />
                                                    </div>
                                                    <span className="text-sm text-secondary truncate font-medium flex-1">{link}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <div className="w-full pt-4 flex flex-col gap-4 border-t border-secondary">
                                <div className="flex items-start gap-3 p-3 bg-brand-primary/5 rounded-xl">
                                    <div className="mt-0.5">
                                        <CheckCircle className="size-4 text-brand-primary" />
                                    </div>
                                    <p className="text-sm text-secondary">
                                        We'll import your links, titles, and thumbnails. Your original profile stays untouched.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button size="xl" className="w-full shadow-lg shadow-brand-primary/20" onClick={onImportConfirm}>
                                        Import {previewData.linkCount} Links
                                    </Button>
                                    <Button size="lg" color="tertiary" className="w-full hover:bg-secondary" onClick={onCancelPreview}>
                                        Cancel Import
                                    </Button>
                                </div>
                            </div>
                         </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex flex-col items-center gap-6 w-full"
                        >
                            <div className="w-full  relative group">
                                <div className="absolute -inset-0.5 rounded-lg bg-brand-primary opacity-0 blur transition duration-500 group-focus-within:opacity-20" />
                                <Input
                                    ref={inputRef as any}
                                    size="md"
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={onChange}
                                    onPaste={onPaste}
                                    aria-label="Bio link URL"
                                    wrapperClassName="relative bg-primary transition-shadow shadow-xs focus-within:shadow-[0_0_0_4px_rgba(167,139,250,0.1)] focus-within:border-brand-primary"
                                    inputClassName="text-center text-lg"
                                    isDisabled={isSimulating}
                                />
                            </div>

                            <div className="flex flex-wrap  items-center justify-center gap-2">
                                {["Linktree","Link.bio", "Beacons", "Bio.site", "Carrd", "Taplink"].map((p) => (
                                    <Badge key={p} type="pill-color" size="md" color="gray" className="transition-colors hover:bg-utility-gray-100">
                                        <CheckCircle className="mr-1 size-3 text-brand-primary" /> {p}
                                    </Badge>
                                ))}
                            </div>

                            <div className="min-h-6 text-center">
                                {error ? (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-medium text-utility-error-700">
                                        <AlertCircle className="size-4" /> {error}
                                    </motion.div>
                                ) : status === "valid" ? (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-medium text-utility-success-700">
                                        <CheckCircle className="size-4" /> Public profile detected
                                    </motion.div>
                                ) : status === "invalid" ? (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-medium text-utility-warning-700">
                                        <AlertCircle className="size-4 shrink-0" /> 
                                        <span>We currently support Linktree, Beacons, Bio.site, Carrd & Taplink. Paste one of these to import links.</span>
                                    </motion.div>
                                ) : null}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            
            {!previewData && (
                <div className="flex w-full flex-col items-center gap-3 pb-8 px-4">
                    <Button
                        size="lg"
                        className="mx-auto w-full max-w-xl"
                        onClick={onContinue}
                        isDisabled={status !== "valid" || isSimulating}
                        isLoading={isSimulating}
                    >
                        {isSimulating ? "Analyzing profile..." : "Continue"}
                    </Button>
                    
                    <Button
                        size="sm"
                        color="link-gray"
                        className="mx-auto w-full max-w-xl"
                        onClick={onSkip}
                        isDisabled={isSimulating}
                    >
                        I don't have a link
                    </Button>
                </div>
            )}
        </section>
    );
}

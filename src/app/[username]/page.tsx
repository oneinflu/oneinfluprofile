"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { MessageChatCircle, CurrencyDollarCircle, Stars02, Share04, Sun, Moon01 } from "@untitledui/icons";
import { useMemo, useState, useEffect } from "react";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { RadioGroup, RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { useTheme } from "next-themes";

export default function ProfilePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const username = (params?.username as string) || "guest";
    const payEnabled = searchParams.get("pay") === "1";
    const upiId = "sonia@upi";
    const offers = useMemo(
        () => (
            [
                { title: "Instagram Reel Promotion", description: "1 Reel + 3 Stories", priceType: "fixed" as const, price: 8000, cta: "request" as const },
                { title: "YouTube Integration", description: "Mention or mid-roll", priceType: "starting" as const, price: 15000, cta: "request_pay_later" as const },
                { title: "Custom Campaign", description: "Tailored deliverables", priceType: "custom" as const, cta: "request" as const },
            ]
        ),
        []
    );

    const [requestOpen, setRequestOpen] = useState(false);
    const [prefillService, setPrefillService] = useState<string | null>(null);
    const openRequest = (service?: string) => {
        setPrefillService(service || null);
        setRequestOpen(true);
    };

    return (
        <>
            <section className="lg:hidden flex min-h-screen pt-5  bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4 pb-20 overflow-y-auto scrollbar-hide">
                <ProfileCard username={username} payEnabled={payEnabled} upiId={upiId} offers={offers} onRequest={openRequest} />
                <PrimaryCTAStrip username={username} payEnabled={payEnabled} upiId={upiId} variant="mobile" onRequest={openRequest} />
            </section>
            <section className="hidden lg:flex min-h-screen items-center justify-center bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4">
                <div className="mx-auto aspect-[9/19] w-full max-w-sm rounded-[2rem] bg-linear-to-b from-[#ffffff] via-[#F4EBFF] to-[#EDE6FF] dark:from-[#0b0f14] dark:via-[#1b103f] dark:to-[#000000] p-1 shadow-2xl">
                    <div className="size-full overflow-hidden rounded-[inherit] bg-alpha-black ring-1 ring-primary relative">
                        <div className="size-full overflow-y-auto scrollbar-hide bg-primary p-3 pb-20">
                            <ProfileCard username={username} payEnabled={payEnabled} upiId={upiId} offers={offers} onRequest={openRequest} />
                        </div>
                        <div className="absolute inset-x-3 bottom-3">
                            <PrimaryCTAStrip username={username} payEnabled={payEnabled} upiId={upiId} variant="overlay" onRequest={openRequest} />
                        </div>
                    </div>
                </div>
            </section>

            <RequestServiceBottomSheet
                isOpen={requestOpen}
                onOpenChange={setRequestOpen}
                username={username}
                services={offers.map((o) => o.title)}
                prefillService={prefillService}
            />
        </>
    );
}

function ProfileCard({ username, payEnabled, upiId, offers, onRequest }: { username: string; payEnabled: boolean; upiId: string; offers: Array<{ title: string; description: string; priceType: "fixed" | "starting" | "custom"; price?: number; cta: "request" | "pay" | "request_pay_later" }>; onRequest: (service?: string) => void }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";
    const themeLabel = isDark ? "Switch to light" : "Switch to dark";
    return (
        <div className="w-full max-w-sm">
            <div className="relative flex flex-col gap-3 rounded-2xl bg-primary p-0 pb-5 shadow-none">
                <div className="relative h-44 w-full overflow-hidden rounded-t-2xl sm:h-56">
                    <img src="/profile.jpg" alt="Cover" className="size-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-primary dark:to-[#0b0f14]" />
                    <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center justify-center rounded-md bg-primary/75 backdrop-blur p-1.5 shadow-xs">
                            <img
                                src={isDark ? "/faviconwhite.png" : "/favicon.png"}
                                alt="Brand"
                                className="size-5"
                                onError={(e) => {
                                    e.currentTarget.src = "/favicon.png";
                                }}
                            />
                        </span>
                    </div>
                    <div className="absolute right-3 top-3">
                        <div className="flex items-center gap-2">
                            <ButtonUtility
                                tooltip="Share profile"
                                size="sm"
                                color="secondary"
                                icon={Share04}
                                onClick={() => {
                                    const url = typeof window !== "undefined" ? window.location.href : `/${username}`;
                                    const text = `Check out ${username}'s profile`;
                                    if (typeof navigator !== "undefined" && (navigator as any).share) {
                                        (navigator as any)
                                            .share({ title: text, text, url })
                                            .catch(() => {});
                                    } else {
                                        const wa = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
                                        window.open(wa, "_blank");
                                    }
                                }}
                            />
                            {mounted && (
                                <ButtonUtility
                                    tooltip={themeLabel}
                                    size="sm"
                                    color="secondary"
                                    icon={isDark ? Sun : Moon01}
                                    onClick={() => setTheme(isDark ? "light" : "dark")}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-6 pb-6">
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-primary text-center">{username}</h1>
                        <p className="text-sm font-medium uppercase tracking-wide text-secondary text-center">Fashion Creator | Reels & Brand Collabs</p>
                    </div>
                    <p className="mt-1 text-base text-tertiary text-center leading-relaxed">
                        {truncateBio(`Hi, I’m ${username}. I create fashion content and collaborate with brands through short-form video.`)}
                    </p>
                </div>
            <div className="mt-1 flex items-center justify-center gap-2">
                <a href={`https://instagram.com/${username}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt transition-colors hover:bg-primary">
                    <img src="/instagram.png" alt="Instagram" className="size-5" />
                </a>
                <a href={`https://youtube.com/@${username}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt transition-colors hover:bg-primary">
                    <img src="/youtube.png" alt="YouTube" className="size-5" />
                </a>
                <a href={`https://tiktok.com/@${username}`} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt transition-colors hover:bg-primary">
                    <img src="/tiktok.png" alt="TikTok" className="size-5" />
                </a>
                <a href={`https://oneinflu.com/${username}`} target="_blank" rel="noopener noreferrer" aria-label="Website" className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt transition-colors hover:bg-primary">
                    <img src="/web.png" alt="Website" className="size-5" />
                </a>
            </div>
        </div>
            <ProfileServices username={username} payEnabled={payEnabled} upiId={upiId} offers={offers} onRequest={onRequest} />
            <ProfilePortfolio username={username} />
            <ProfileFooter />
        </div>
    );
}

function truncateBio(text: string) {
    const max = 150;
    return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function ProfileServices({ username, payEnabled, upiId, offers, onRequest }: { username: string; payEnabled: boolean; upiId: string; offers: Array<{ title: string; description: string; priceType: "fixed" | "starting" | "custom"; price?: number; cta: "request" | "pay" | "request_pay_later" }>; onRequest: (service?: string) => void }) {
    const formatINR = new Intl.NumberFormat("en-IN");
    const labelFor = (o: typeof offers[number]) => {
        if (o.priceType === "fixed" && typeof o.price === "number") return `₹${formatINR.format(o.price)}`;
        if (o.priceType === "starting" && typeof o.price === "number") return `Starting at ₹${formatINR.format(o.price)}`;
        return "Custom pricing";
    };
    const handlePay = (service: string, price?: number) => {
        if (!price || !payEnabled) return onRequest(service);
        const link = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(username)}&am=${encodeURIComponent(String(price))}&tn=${encodeURIComponent(service)}`;
        window.location.href = link;
    };
    return (
        <div className="mt-4">
            <h2 className="text-md font-semibold text-primary">Services</h2>
            <ul className="mt-2 flex flex-col gap-2">
                {offers.map((o) => (
                    <li key={o.title} className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 flex-col">
                                <p className="truncate text-sm font-semibold text-primary">{o.title}</p>
                                <p className="truncate text-sm text-tertiary">{o.description}</p>
                            </div>
                            <div className="shrink-0 text-right">
                                <p className="text-sm font-medium text-primary">{labelFor(o)}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            {o.cta === "pay" ? (
                                <Button size="sm" color="primary" className="w-full" onClick={() => handlePay(o.title, o.price)}>
                                    Pay Now
                                </Button>
                            ) : (
                                <Button size="sm" color="primary" className="w-full" onClick={() => onRequest(o.title)}>
                                    Request Service
                                </Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProfilePortfolio({ username }: { username: string }) {
    const items: Array<{ id: string; platform: "instagram" | "youtube" | "tiktok" | "website"; brand?: string; url: string }> = [
        { id: "pf-1", platform: "instagram", brand: "BrandX", url: `https://instagram.com/${username}` },
        { id: "pf-2", platform: "youtube", brand: "Acme", url: `https://youtube.com/@${username}` },
        { id: "pf-3", platform: "tiktok", brand: "Nova", url: `https://tiktok.com/@${username}` },
        { id: "pf-4", platform: "website", brand: "Orbit", url: `https://oneinflu.com/${username}` },
    ];
    const iconFor = (p: string) => {
        const map: Record<string, string> = {
            instagram: "/instagram.png",
            youtube: "/youtube.png",
            tiktok: "/tiktok.png",
            website: "/web.png",
        };
        return map[p] || "/web.png";
    };
    const [open, setOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [active, setActive] = useState<typeof items[number] | null>(null);
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-primary">Work & Collaborations</h2>
                <Button size="sm" color="link-color" onClick={() => setGalleryOpen(true)}>View all</Button>
            </div>
            <div className="mt-2 overflow-x-auto">
                <div className="flex gap-2 snap-x snap-mandatory">
                    {items.map((it) => (
                        <button
                            key={it.id}
                            type="button"
                            className="snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary hover:bg-primary_hover"
                            onClick={() => {
                                setActive(it);
                                setOpen(true);
                            }}
                        >
                            <div className="aspect-square w-full overflow-hidden">
                                <div className="flex size-full items-center justify-center bg-primary_hover">
                                    <img src={iconFor(it.platform)} alt={it.platform} className="size-10 opacity-90" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 px-2 py-1">
                                <p className="truncate text-xs text-primary">{it.brand || ""}</p>
                                <img src={iconFor(it.platform)} alt="platform" className="size-4 opacity-80" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <AriaDialogTrigger isOpen={open} onOpenChange={setOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog aria-label="Portfolio item" className="mx-auto my-8 w-[min(92vw,520px)] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <p className="text-md font-semibold text-primary">{active?.brand || "Preview"}</p>
                                    <div className="flex items-center gap-2">
                                        {active?.url && (
                                            <Button size="sm" color="secondary" onClick={() => window.open(active.url, "_blank")}>Open</Button>
                                        )}
                                        <Button size="sm" onClick={() => state.close()}>Close</Button>
                                    </div>
                                </div>
                                <div className="aspect-video w-full bg-primary">
                                    <div className="flex size-full items-center justify-center">
                                        {active && <img src={iconFor(active.platform)} alt={active.platform} className="size-16 opacity-90" />}
                                    </div>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>

            <AriaDialogTrigger isOpen={galleryOpen} onOpenChange={setGalleryOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog aria-label="Portfolio gallery" className="mx-auto my-8 w-[min(92vw,640px)] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <p className="text-md font-semibold text-primary">Work & Collaborations</p>
                                    <Button size="sm" onClick={() => state.close()}>Close</Button>
                                </div>
                                <div className="p-3">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {items.map((it) => (
                                            <button
                                                key={it.id}
                                                type="button"
                                                className="overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary hover:bg-primary_hover"
                                                onClick={() => window.open(it.url, "_blank")}
                                            >
                                                <div className="aspect-square w-full overflow-hidden">
                                                    <div className="flex size-full items-center justify-center bg-primary_hover">
                                                        <img src={iconFor(it.platform)} alt={it.platform} className="size-10 opacity-90" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between gap-2 px-2 py-1">
                                                    <p className="truncate text-xs text-primary">{it.brand || ""}</p>
                                                    <img src={iconFor(it.platform)} alt="platform" className="size-4 opacity-80" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>
        </div>
    );
}

function ProfileFooter() {
    return (
        <div className="mt-6 mb-2 text-center">
            <a
                href="https://oneinflu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center gap-0.5 text-xs text-secondary hover:text-secondary_hover"
            >
                <span className="font-medium">Powered by INFLU</span>
                <span className="text-[11px]">Profiles that convert, not just link</span>
            </a>
        </div>
    );
}

function PrimaryCTAStrip({ username, payEnabled, upiId, variant, onRequest }: { username: string; payEnabled: boolean; upiId: string; variant: "mobile" | "inline" | "overlay"; onRequest: (service?: string) => void }) {
    const base =
        variant === "mobile"
            ? "fixed inset-x-0 bottom-0 z-30 px-4 pb-4"
            : variant === "inline"
            ? ""
            : "px-0";
    const inner = variant === "mobile" ? "mx-auto max-w-sm w-full" : "w-full";
    const waText = encodeURIComponent(`Hi ${username}, I'd like to discuss a collaboration.`);
    const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(username)}&tn=${encodeURIComponent("Payment to creator")}`;
    const cols = payEnabled ? "grid-cols-3" : "grid-cols-2";
    return (
        <div className={base}>
            <div className={`${inner}`}>
                <div className="rounded-3xl bg-primary/90 dark:bg-linear-to-r dark:from-[#1f143d]/90 dark:to-[#4b2e8b]/90 backdrop-blur p-2 shadow-xl ring-1 ring-secondary_alt dark:ring-brand overflow-hidden">
                    <div className={`grid ${cols} gap-2 min-w-0`}>
                        <Button className="w-full" size="sm" color="secondary" onClick={() => onRequest()}>Make Payment</Button>
                        <Button className="w-full !bg-[#47AE4C] !text-white hover:!bg-[#10887B] !ring-transparent" size="sm" color="secondary" onClick={() => {
                            const url = `https://wa.me/?text=${waText}`;
                            window.open(url, "_blank");
                        }}>Chat on WhatsApp</Button>
                        {payEnabled && (
                            <Button className="w-full" size="sm" color="primary" iconLeading={CurrencyDollarCircle} onClick={() => {
                                window.location.href = upiLink;
                            }}>Pay Now</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RequestServiceBottomSheet({ isOpen, onOpenChange, username, services, prefillService }: { isOpen: boolean; onOpenChange: (open: boolean) => void; username: string; services: string[]; prefillService: string | null }) {
    const [serviceKey, setServiceKey] = useState<string | null>(prefillService);
    const [budget, setBudget] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp");
    const [contact, setContact] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const items = services.map((t) => ({ id: t, label: t }));

    const submit = () => {
        const selectedService = serviceKey || services[0] || "Service";
        if (!name.trim() || !contact.trim()) return;
        const lines = [
            `Service: ${selectedService}`,
            budget.trim() ? `Budget: ₹${budget.trim()}` : undefined,
            `Name: ${name.trim()}`,
            `Preferred contact: ${contactMethod === "whatsapp" ? "WhatsApp" : "Email"}`,
            `Contact: ${contact.trim()}`,
            message.trim() ? `Message: ${message.trim()}` : undefined,
        ].filter(Boolean) as string[];
        const text = `Request a Service — for ${username}\n\n${lines.join("\n")}`;
        if (contactMethod === "whatsapp") {
            const digits = contact.replace(/\D/g, "");
            const url = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
        } else {
            const url = `mailto:${contact}?subject=${encodeURIComponent("Service request")}&body=${encodeURIComponent(text)}`;
            window.location.href = url;
        }
    };

    return (
        <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <Button slot="trigger" className="hidden">Open</Button>
            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full cursor-auto">
                        <AriaDialog aria-label="Request a Service" className="fixed inset-x-0 bottom-0 mx-auto w-[min(92vw,640px)] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <div className="flex min-w-0 flex-col">
                                    <h2 className="text-lg font-semibold text-primary">Request a Service</h2>
                                    <p className="text-sm text-tertiary">Share a few details to get started</p>
                                </div>
                                <Button size="sm" onClick={() => state.close()}>Close</Button>
                            </div>

                            <div className="flex flex-col gap-4 px-4 py-4">
                                <Select
                                    size="md"
                                    label="Service"
                                    placeholder="Select a service"
                                    items={items}
                                    selectedKey={serviceKey || undefined}
                                    onSelectionChange={(key) => setServiceKey(String(key))}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>

                                <Input label="Budget (optional)" type="number" inputMode="numeric" placeholder="Your budget (optional)" value={budget} onChange={setBudget} />

                                <Input isRequired label="Your Name" placeholder="Brand / Your name" value={name} onChange={setName} />

                                <div className="flex min-w-0 flex-col gap-2">
                                    <p className="text-sm font-medium text-secondary">Contact Method</p>
                                    <RadioGroup value={contactMethod} onChange={(v) => setContactMethod(v as any)}>
                                        <RadioButton value="whatsapp" label="WhatsApp" />
                                        <RadioButton value="email" label="Email" />
                                    </RadioGroup>
                                </div>

                                <Input
                                    isRequired
                                    label="Contact Detail"
                                    placeholder={contactMethod === "whatsapp" ? "WhatsApp number" : "Email address"}
                                    type={contactMethod === "email" ? "email" : "tel"}
                                    inputMode={contactMethod === "email" ? "email" : "numeric"}
                                    value={contact}
                                    onChange={setContact}
                                />

                                <TextArea label="Message (optional)" rows={4} placeholder="Briefly describe your requirement" value={message} onChange={setMessage} />

                                <div className="flex items-center gap-2 pt-2">
                                    <Button size="sm" color="secondary" className="w-full" onClick={submit}>Send Request</Button>
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

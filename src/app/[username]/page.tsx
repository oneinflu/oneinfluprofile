"use client";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { MessageChatCircle, CurrencyDollarCircle, Stars02, Share04, Sun, Moon01 } from "@untitledui/icons";
import { useMemo, useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { RadioGroup, RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";

type PublicProfileResponse = {
    profile: { id: string; username: string; name: string | null; role: string | null; bio: string | null; avatarUrl: string | null; coverUrl: string | null; verified: boolean };
    offers: Array<{ title: string; description: string | null; priceType: string; price?: number; cta?: string | null }>;
    links: Array<{ platform: string; icon: string; url: string; visible: boolean }>;
    payment: { upiId: string | null; payEnabled: boolean };
    contact?: { method?: "email" | "whatsapp" | null; email?: string | null; whatsapp?: string | null };
    portfolio: Array<{
        id: string;
        contentType?: "image" | "video" | "link" | null;
        fileUrl?: string | null;
        externalUrl?: string | null;
        title?: string | null;
        brand?: string | null;
        description?: string | null;
        platform?: string | null;
        visible?: boolean;
        pinned?: boolean | null;
    }>;
};

function toCta(v?: string | null): "request" | "pay" | "request_pay_later" | null {
    return v === "pay" ? "pay" : v === "request" ? "request" : v === "request_pay_later" ? "request_pay_later" : null;
}

function PaymentBottomSheet({ isOpen, onOpenChange, name, upiId }: { isOpen: boolean; onOpenChange: (open: boolean) => void; name: string; upiId: string }) {
    const pa = encodeURIComponent(upiId || "");
    const pn = encodeURIComponent(name || "");
    const phonePe = `phonepe://pay?pa=${pa}&pn=${pn}&cu=INR`;
    const googlePay = `tez://upi/pay?pa=${pa}&pn=${pn}&cu=INR`;
    const whatsappPay = `upi://pay?pa=${pa}&pn=${pn}&cu=INR`;
    const disabled = !upiId;
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
                        <AriaDialog aria-label="Make a Payment" className="fixed inset-x-0 bottom-0 mx-auto w-[min(92vw,640px)] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                <div className="flex min-w-0 flex-col">
                                    <h2 className="text-lg font-semibold text-primary">Make a Payment</h2>
                                    <p className="text-sm text-tertiary">Choose your payment app</p>
                                </div>
                                <Button size="sm" onClick={() => state.close()}>Close</Button>
                            </div>
                            <div className="px-4 py-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        disabled={disabled}
                                        onClick={() => { if (!disabled) window.location.href = phonePe; }}
                                        className="flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50"
                                    >
                                        <img src="/phonepe-icon.png" alt="PhonePe" className="size-10" />
                                        <div className="text-sm font-medium text-primary">PhonePe</div>
                                    </button>
                                    <button
                                        disabled={disabled}
                                        onClick={() => { if (!disabled) window.location.href = googlePay; }}
                                        className="flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50"
                                    >
                                        <img src="/google-pay-icon.png" alt="Google Pay" className="size-10" />
                                        <div className="text-sm font-medium text-primary">G Pay</div>
                                    </button>
                                    <button
                                        disabled={disabled}
                                        onClick={() => { if (!disabled) window.location.href = whatsappPay; }}
                                        className="flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50"
                                    >
                                        <img src="/whatsapp.png" alt="WhatsApp Pay" className="size-10 rounded" />
                                        <div className="text-sm font-medium text-primary">UPI Pay</div>
                                    </button>
                                </div>
                            </div>
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
}

export default function ProfilePage() {
    const [username, setUsername] = useState<string>("");
    const params = useParams();
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (username) return;
                const fromRoute = (params as any)?.username ? String((params as any).username) : "";
                if (fromRoute && fromRoute.trim()) {
                    setUsername(fromRoute.trim());
                    return;
                }
                try {
                    const stored = typeof window !== "undefined" ? window.localStorage.getItem("influu_username") : null;
                    if (stored && stored.trim()) {
                        setUsername(stored.trim());
                        return;
                    }
                } catch {}
                let token: string | null = null;
                let userId: string | null = null;
                if (typeof window !== "undefined") {
                    token = window.localStorage.getItem("influu_token");
                    userId = window.localStorage.getItem("influu_user_id");
                }
                if (!token || !userId) return;
                const me = await api.get<{ id: string; username: string }>(`/users/id/${userId}`, { token });
                if (!alive) return;
                setUsername(me.username);
            } catch {
                if (!alive) return;
            }
        })();
        return () => { alive = false; };
    }, [params, username]);
    const [profile, setProfile] = useState<{ name?: string | null; bio?: string | null; avatarUrl?: string | null } | null>(null);
    const [offers, setOffers] = useState<Array<{ title: string; description: string | null; priceType: "fixed" | "starting" | "custom"; price?: number; cta?: "request" | "pay" | "request_pay_later" | null }>>([]);
    const [links, setLinks] = useState<Array<{ platform: string; icon: string; url: string }>>([]);
    const [payEnabled, setPayEnabled] = useState<boolean>(false);
    const [upiId, setUpiId] = useState<string>("");
    const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("whatsapp");
    const [contactEmail, setContactEmail] = useState<string>("");
    const [contactWhatsapp, setContactWhatsapp] = useState<string>("");
    const [portfolioItems, setPortfolioItems] = useState<Array<{
        id: string;
        contentType?: "image" | "video" | "link" | null;
        fileUrl?: string | null;
        externalUrl?: string | null;
        title?: string | null;
        brand?: string | null;
        description?: string | null;
        platform?: string | null;
        visible?: boolean;
        pinned?: boolean | null;
    }>>([]);
    useEffect(() => {
        if (!username) return;
        let alive = true;
        (async () => {
            try {
                const endpoint = `/users/${username}/profile`;
                const res = (await api.get(endpoint)) as PublicProfileResponse;
                if (!alive) return;
                setProfile(res.profile);
                setOffers(res.offers.map((o) => ({
                    title: o.title,
                    description: o.description || null,
                    priceType: o.priceType === "fixed" ? "fixed" : o.priceType === "starting" ? "starting" : "custom",
                    price: o.price,
                    cta: toCta(o.cta),
                })));
                setLinks(res.links.map((l) => ({ platform: l.platform, icon: l.icon, url: l.url })));
                setPayEnabled(Boolean(res.payment?.payEnabled));
                setUpiId(res.payment?.upiId || "");
                const method = (res.contact?.method as any) || (res.contact?.whatsapp ? "whatsapp" : "email");
                setContactMethod(method);
                setContactEmail(res.contact?.email || "");
                setContactWhatsapp(res.contact?.whatsapp || "");
                setPortfolioItems(Array.isArray(res.portfolio) ? res.portfolio : []);
            } catch {
                if (!alive) return;
            }
        })();
        return () => { alive = false; };
    }, [username]);

    const [publicData, setPublicData] = useState<any>(null);
    const [publicError, setPublicError] = useState<string | null>(null);
    useEffect(() => {
        if (!username) return;
        const url = `http://192.168.0.6:3000/${encodeURIComponent(username)}`;
        console.group("PUBLIC_PROFILE_GET");
        console.log("REQUEST GET", url);
        console.groupEnd();
        let alive = true;
        api.get(url)
            .then((data) => {
                if (!alive) return;
                console.group("PUBLIC_PROFILE_RESPONSE");
                console.log("BODY", data);
                console.groupEnd();
                setPublicData(data);
                setPublicError(null);
            })
            .catch((err) => {
                if (!alive) return;
                setPublicError(String(err?.message || "Error"));
            });
        return () => { alive = false; };
    }, [username]);
    const [requestOpen, setRequestOpen] = useState(false);
    const [prefillService, setPrefillService] = useState<string | null>(null);
    const openRequest = (service?: string) => {
        setPrefillService(service || null);
        setRequestOpen(true);
    };
    const [paymentOpen, setPaymentOpen] = useState(false);
    const openPayment = () => setPaymentOpen(true);

    return (
        <>
            <section className="lg:hidden flex min-h-screen pt-5  bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4 pb-20 overflow-y-auto scrollbar-hide">
                
                <ProfileCard username={username} profile={profile} payEnabled={payEnabled} upiId={upiId} offers={offers} links={links} portfolio={portfolioItems} onRequest={openRequest} />
                <PrimaryCTAStrip username={username} payEnabled={payEnabled} upiId={upiId} contactMethod={contactMethod} email={contactEmail} whatsapp={contactWhatsapp} variant="mobile" onRequest={openRequest} onPay={openPayment} />
            </section>
            <section className="hidden lg:flex min-h-screen items-center justify-center bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4">
                <div className="mx-auto aspect-[9/19] w-full max-w-sm rounded-[2rem] bg-linear-to-b from-[#ffffff] via-[#F4EBFF] to-[#EDE6FF] dark:from-[#0b0f14] dark:via-[#1b103f] dark:to-[#000000] p-1 shadow-2xl">
                    <div className="size-full overflow-hidden rounded-[inherit] bg-alpha-black ring-1 ring-primary relative">
                        <div className="size-full overflow-y-auto scrollbar-hide bg-primary p-3 pb-20">
                            
                            <ProfileCard username={username} profile={profile} payEnabled={payEnabled} upiId={upiId} offers={offers} links={links} portfolio={portfolioItems} onRequest={openRequest} />
                        </div>
                        <div className="absolute inset-x-3 bottom-3">
                            <PrimaryCTAStrip username={username} payEnabled={payEnabled} upiId={upiId} contactMethod={contactMethod} email={contactEmail} whatsapp={contactWhatsapp} variant="overlay" onRequest={openRequest} onPay={openPayment} />
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
            <PaymentBottomSheet
                isOpen={paymentOpen}
                onOpenChange={setPaymentOpen}
                name={(profile?.name as string) || username}
                upiId={upiId}
            />
        </>
    );
}

function ProfileCard({ username, profile, payEnabled, upiId, offers, links, portfolio, onRequest }: { username: string; profile: { name?: string | null; bio?: string | null; avatarUrl?: string | null } | null; payEnabled: boolean; upiId: string; offers: Array<{ title: string; description: string | null; priceType: "fixed" | "starting" | "custom"; price?: number; cta?: "request" | "pay" | "request_pay_later" | null }>; links: Array<{ platform: string; icon: string; url: string }>; portfolio: Array<{ id: string; contentType?: "image" | "video" | "link" | null; fileUrl?: string | null; externalUrl?: string | null; title?: string | null; brand?: string | null; description?: string | null; platform?: string | null; visible?: boolean; pinned?: boolean | null }>; onRequest: (service?: string) => void }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";
    const themeLabel = isDark ? "Switch to light" : "Switch to dark";
    return (
        <div className="w-full max-w-sm">
            <div className="relative flex flex-col gap-3 rounded-2xl bg-primary p-0 pb-5 shadow-none">
                <div className="relative h-44 w-full overflow-hidden rounded-t-2xl sm:h-56">
                    {profile?.avatarUrl ? (
                        <img src={profile.avatarUrl} loading="lazy" alt="Avatar" className="size-full object-cover" />
                    ) : (
                        <div className="size-full bg-primary_hover animate-pulse" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-primary dark:to-[#0b0f14]" />
                    <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center justify-center rounded-md bg-primary/75 backdrop-blur p-1.5 shadow-xs">
                            <img
                                src={isDark ? "/faviconwhite.png" : "/favicon.png"}
                                alt="Brand"
                                className="size-5"
                                onError={(e) => {
                                    e.currentTarget.src = "/faviconwhite.png";
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
                        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-primary text-center">{profile?.name || username}</h1>
                    </div>
                    {profile?.bio && (
                        <p className="mt-2 text-sm text-tertiary text-center">{truncateBio(profile.bio)}</p>
                    )}
                </div>
            <div className="mt-1 flex items-center justify-center gap-2">
                {links.length > 0 ? (
                    links.map((l) => (
                        <a key={`${l.platform}:${l.url}`} href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.platform} className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt transition-colors hover:bg-primary">
                            <img src={l.icon} alt={l.platform} className="size-5" />
                        </a>
                    ))
                ) : (
                    <>
                        <div className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse" />
                        <div className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse" />
                        <div className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse" />
                        <div className="rounded-full bg-primary_hover p-2 ring-1 ring-secondary_alt size-9 animate-pulse" />
                    </>
                )}
            </div>
        </div>
            <ProfileServices username={username} payEnabled={payEnabled} upiId={upiId} offers={offers} onRequest={onRequest} />
            <ProfilePortfolio username={username} items={portfolio} />
            <ProfileFooter />
        </div>
    );
}

function truncateBio(text: string) {
    const max = 150;
    return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function ProfileServices({ username, payEnabled, upiId, offers, onRequest }: { username: string; payEnabled: boolean; upiId: string; offers: Array<{ title: string; description: string | null; priceType: "fixed" | "starting" | "custom"; price?: number; cta?: "request" | "pay" | "request_pay_later" | null }>; onRequest: (service?: string) => void }) {
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
                {offers.length > 0 ? (
                    offers.map((o) => (
                        <li key={o.title} className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 flex-col">
                                    <p className="truncate text-sm font-semibold text-primary">{o.title}</p>
                                    {o.description && <p className="truncate text-sm text-tertiary">{o.description}</p>}
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
                    ))
                ) : (
                    <>
                        <li className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 flex-col gap-1">
                                    <div className="h-4 w-36 bg-primary_hover rounded animate-pulse" />
                                    <div className="h-3 w-56 bg-primary_hover rounded animate-pulse" />
                                </div>
                                <div className="shrink-0">
                                    <div className="h-4 w-24 bg-primary_hover rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="h-8 w-full bg-primary_hover rounded-md animate-pulse" />
                            </div>
                        </li>
                        <li className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 flex-col gap-1">
                                    <div className="h-4 w-28 bg-primary_hover rounded animate-pulse" />
                                    <div className="h-3 w-44 bg-primary_hover rounded animate-pulse" />
                                </div>
                                <div className="shrink-0">
                                    <div className="h-4 w-20 bg-primary_hover rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="h-8 w-full bg-primary_hover rounded-md animate-pulse" />
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

function ProfilePortfolio({
    username,
    items,
}: {
    username: string;
    items: Array<{
        id: string;
        contentType?: "image" | "video" | "link" | null;
        fileUrl?: string | null;
        externalUrl?: string | null;
        title?: string | null;
        brand?: string | null;
        description?: string | null;
        platform?: string | null;
        visible?: boolean;
        pinned?: boolean | null;
    }>;
}) {
    const iconFor = (p: string) => {
        const map: Record<string, string> = {
            instagram: "/instagram.png",
            youtube: "/youtube.png",
            tiktok: "/tiktok.png",
            website: "/web.png",
        };
        return map[p] || "/web.png";
    };
    const urlFor = (it: { fileUrl?: string | null; externalUrl?: string | null }) => (it.fileUrl || it.externalUrl || "");
    const [open, setOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [active, setActive] = useState<(typeof items)[number] | null>(null);
    const [wantAutoplay, setWantAutoplay] = useState(false);
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-primary">Work & Collaborations</h2>
                <Button size="sm" color="link-color" onClick={() => setGalleryOpen(true)}>View all</Button>
            </div>
            <div className="mt-2 overflow-x-auto">
                <div className="flex gap-2 snap-x snap-mandatory">
                    {items.length > 0 ? (
                        items.map((it) => (
                            <button
                                key={it.id}
                                type="button"
                                className="snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary hover:bg-primary_hover"
                                onClick={() => {
                                    setActive(it);
                                    setWantAutoplay(it.contentType === "video");
                                    setOpen(true);
                                }}
                            >
                                <div className="aspect-square w-full overflow-hidden relative">
                                    {it.contentType === "video" && urlFor(it) ? (
                                        <video
                                            src={urlFor(it)}
                                            className="size-full object-cover pointer-events-none"
                                            muted
                                            playsInline
                                            preload="metadata"
                                            controlsList="nodownload noplaybackrate"
                                            disablePictureInPicture
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    ) : it.contentType === "image" && urlFor(it) ? (
                                        <img
                                            src={urlFor(it)}
                                            alt={String(it.title || it.brand || it.platform || "Portfolio")}
                                            className="size-full object-cover select-none"
                                            draggable={false}
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        <div className="flex size-full items-center justify-center bg-primary_hover">
                                            <img src={iconFor(String(it.platform || "website"))} alt={String(it.platform || "website")} className="size-10 opacity-90" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            className="px-3"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                e.stopPropagation();
                                                setActive(it);
                                                setWantAutoplay(it.contentType === "video");
                                                setOpen(true);
                                            }}
                                        >
                                            {it.contentType === "video" ? "Play" : "View"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 px-2 py-1">
                                    {it.brand && <p className="truncate text-xs text-primary">{it.brand}</p>}
                                    <img src={iconFor(String(it.platform || "website"))} alt="platform" className="size-4 opacity-80" />
                                </div>
                            </button>
                        ))
                    ) : (
                        <>
                            <div className="snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                <div className="px-2 py-1">
                                    <div className="h-3 w-24 bg-primary_hover rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                <div className="px-2 py-1">
                                    <div className="h-3 w-20 bg-primary_hover rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="snap-start w-36 sm:w-40 overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                <div className="px-2 py-1">
                                    <div className="h-3 w-16 bg-primary_hover rounded animate-pulse" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <AriaDialogTrigger isOpen={open} onOpenChange={setOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/50 backdrop-blur-md flex items-center justify-center p-4 ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog aria-label="Portfolio item" className="mx-auto w-[min(92vw,420px)] overflow-hidden rounded-[2rem] bg-primary shadow-2xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-5 py-4">
                                    <p className="text-md font-semibold text-primary">{active?.brand || "Preview"}</p>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" onClick={() => state.close()}>Back</Button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="mx-auto aspect-[9/19] w-full rounded-[1.5rem] ring-1 ring-secondary_alt overflow-hidden bg-primary">
                                    {active ? (
                                        active.contentType === "video" && urlFor(active) ? (
                                            <video
                                                src={urlFor(active)}
                                                className="size-full object-cover"
                                                autoPlay={wantAutoplay}
                                                muted
                                                playsInline
                                                controlsList="nodownload noplaybackrate"
                                                disablePictureInPicture
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                        ) : active.contentType === "image" && urlFor(active) ? (
                                            <img
                                                src={urlFor(active)}
                                                alt={String(active.title || active.brand || active.platform || "Portfolio")}
                                                className="size-full object-cover select-none"
                                                draggable={false}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center">
                                                <img src={iconFor(String(active.platform || "website"))} alt={String(active.platform || "website")} className="size-16 opacity-90" />
                                            </div>
                                        )
                                    ) : null}
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
                        `fixed inset-0 z-50 bg-overlay/50 backdrop-blur-md ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
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
                                        {items.length > 0 ? (
                                            items.map((it) => (
                                                <button
                                                    key={it.id}
                                                    type="button"
                                                    className="overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary hover:bg-primary_hover"
                                                    onClick={() => {
                                                        setActive(it);
                                                        setWantAutoplay(it.contentType === "video");
                                                        setOpen(true);
                                                    }}
                                                >
                                                    <div className="aspect-square w-full overflow-hidden relative">
                                                        {it.contentType === "video" && urlFor(it) ? (
                                                            <video
                                                                src={urlFor(it)}
                                                                className="size-full object-cover pointer-events-none"
                                                                muted
                                                                playsInline
                                                                preload="metadata"
                                                                controlsList="nodownload noplaybackrate"
                                                                disablePictureInPicture
                                                                onContextMenu={(e) => e.preventDefault()}
                                                            />
                                                        ) : it.contentType === "image" && urlFor(it) ? (
                                                            <img
                                                                src={urlFor(it)}
                                                                alt={String(it.title || it.brand || it.platform || "Portfolio")}
                                                                className="size-full object-cover select-none"
                                                                draggable={false}
                                                                onContextMenu={(e) => e.preventDefault()}
                                                            />
                                                        ) : (
                                                            <div className="flex size-full items-center justify-center bg-primary_hover">
                                                                <img src={iconFor(String(it.platform || "website"))} alt={String(it.platform || "website")} className="size-10 opacity-90" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Button
                                                                size="sm"
                                                                color="secondary"
                                                                className="px-3"
                                                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                                    e.stopPropagation();
                                                                    setActive(it);
                                                                    setWantAutoplay(it.contentType === "video");
                                                                    setOpen(true);
                                                                }}
                                                            >
                                                                {it.contentType === "video" ? "Play" : "View"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2 px-2 py-1">
                                                        <p className="truncate text-xs text-primary">{it.brand || ""}</p>
                                                        <img src={iconFor(String(it.platform || "website"))} alt="platform" className="size-4 opacity-80" />
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <>
                                                <div className="overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                                    <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                                    <div className="px-2 py-1">
                                                        <div className="h-3 w-24 bg-primary_hover rounded animate-pulse" />
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                                    <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                                    <div className="px-2 py-1">
                                                        <div className="h-3 w-20 bg-primary_hover rounded animate-pulse" />
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                                    <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                                    <div className="px-2 py-1">
                                                        <div className="h-3 w-16 bg-primary_hover rounded animate-pulse" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
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

function PrimaryCTAStrip({ username, payEnabled, upiId, contactMethod, email, whatsapp, variant, onRequest, onPay }: { username: string; payEnabled: boolean; upiId: string; contactMethod: "email" | "whatsapp"; email: string; whatsapp: string; variant: "mobile" | "inline" | "overlay"; onRequest: (service?: string) => void; onPay: () => void }) {
    const base =
        variant === "mobile"
            ? "fixed inset-x-0 bottom-0 z-30 px-4 pb-4"
            : variant === "inline"
            ? ""
            : "px-0";
    const inner = variant === "mobile" ? "mx-auto max-w-sm w-full" : "w-full";
    const waText = encodeURIComponent(`Hi ${username}, I'd like to discuss a collaboration.`);
    const cols = "grid-cols-2";
    return (
        <div className={base}>
            <div className={`${inner}`}>
                <div className="rounded-3xl bg-primary/90 dark:bg-linear-to-r dark:from-[#1f143d]/90 dark:to-[#4b2e8b]/90 backdrop-blur p-2 shadow-xl ring-1 ring-secondary_alt dark:ring-brand overflow-hidden">
                    <div className={`grid ${cols} gap-2 min-w-0`}>
                        <Button className="w-full" size="sm" color="secondary" onClick={() => onPay()}>Make Payment</Button>
                        {contactMethod === "whatsapp" ? (
                            <Button className="w-full !bg-[#47AE4C] !text-white hover:!bg-[#10887B] !ring-transparent" size="sm" color="secondary" onClick={() => {
                                const digits = whatsapp.replace(/\D/g, "");
                                const url = `https://wa.me/${digits}?text=${waText}`;
                                window.open(url, "_blank");
                            }}>Chat on WhatsApp</Button>
                        ) : (
                            <Button className="w-full" size="sm" color="secondary" onClick={() => {
                                const url = `mailto:${email}?subject=${encodeURIComponent("Collaboration inquiry")}&body=${encodeURIComponent(`Hi ${username}, I'd like to discuss a collaboration.`)}`;
                                window.location.href = url;
                            }}>Mail Us</Button>
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

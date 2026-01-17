"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Rows01, Trash01, Edit01, CheckDone01, X } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { RadioGroup, RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { TextArea } from "@/components/base/textarea/textarea";

export default function ShopLinksPage() {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [previewVersion, setPreviewVersion] = useState(0);
    const [links, setLinks] = useState<Array<{ id: string; linkId?: string; platform: string; icon: string; url: string; visible: boolean; titleOverride?: string; price?: string; discount?: string; badge?: "Best Deal" | "Lowest Price" | "Limited Offer"; primary?: boolean; categoryName?: string }>>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dragIndexOriginal, setDragIndexOriginal] = useState<number | null>(null);
    const [showAddPlatform, setShowAddPlatform] = useState(false);
    const [showAddDrawer, setShowAddDrawer] = useState(false);
    const [ctas, setCtas] = useState<Array<{ id: "request" | "whatsapp" | "pay"; label: string; enabled: boolean; connected?: boolean }>>([
        { id: "request", label: "Request Service", enabled: true },
        { id: "whatsapp", label: "Chat on WhatsApp", enabled: false, connected: false },
        { id: "pay", label: "Pay Now", enabled: false },
    ]);
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState<string>("");
    const [showManageCategories, setShowManageCategories] = useState(false);
    const [primaryLink, setPrimaryLink] = useState("");
    const [primaryPreview, setPrimaryPreview] = useState<{ title?: string; image?: string; price?: string; platform?: string; description?: string } | null>(null);
    const [isFetchingPrimary, setIsFetchingPrimary] = useState(false);
    const [affiliateLink, setAffiliateLink] = useState(true);
    const [personallyUsed, setPersonallyUsed] = useState(false);
    const [brandPartner, setBrandPartner] = useState(false);
    const [secondary, setSecondary] = useState<{ platform: string; url: string; titleOverride?: string; price?: string; discount?: string; badge?: "Best Deal" | "Lowest Price" | "Limited Offer" }>({ platform: "flipkart", url: "", titleOverride: "", price: "", discount: "", badge: undefined });
    const [showSecondaryForm, setShowSecondaryForm] = useState(false);
    const [secondaryOptions, setSecondaryOptions] = useState<Array<{ platformId: string; platformLabel: string; url: string; price?: string; discount?: string; badge?: "Best Deal" | "Lowest Price" | "Limited Offer" }>>([]);
    const [dragIndexSecondary, setDragIndexSecondary] = useState<number | null>(null);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [drawerCategory, setDrawerCategory] = useState<string>("");
    const [showSecondaryPricing, setShowSecondaryPricing] = useState(false);
    const [previewFetchKey, setPreviewFetchKey] = useState(0);
    const [drawerCategoryId, setDrawerCategoryId] = useState<string | null>(null);
    const [products, setProducts] = useState<Array<{ id: string; title: string; image: string; platformLabel: string; url: string; categoryId?: string; categoryName?: string; tags?: { affiliate?: boolean; personallyUsed?: boolean; brandPartner?: boolean }; secondary: Array<{ id: string; platformId?: string; platformLabel: string; url: string }> }>>([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [editProductId, setEditProductId] = useState<string | null>(null);

    useEffect(() => {
        if (!primaryLink.trim()) {
            setPrimaryPreview(null);
            setIsFetchingPrimary(false);
            return;
        }
        const url = primaryLink.trim();
        let canceled = false;
        setIsFetchingPrimary(true);
        (async () => {
            try {
                const json = await api.post<{ success: boolean; status: string; data: { platform?: string; title?: string; image?: string; description?: string; price?: string | number | null; url?: string } }>(
                    "/api/link/preview/",
                    { url },
                );
                if (canceled) return;
                const data = (json as any)?.data || {};
                const clean = (s: unknown) => String(s ?? "").replace(/`/g, "").trim();
                const previewUrl = clean((data as any)?.url) || url;
                let platformId = "other";
                try {
                    const u = new URL(previewUrl);
                    const host = u.hostname.toLowerCase();
                    if (host.includes("amazon")) platformId = "amazon";
                    else if (host.includes("flipkart")) platformId = "flipkart";
                    else if (host.includes("meesho")) platformId = "meesho";
                    else if (host.includes("myntra")) platformId = "myntra";
                    else if (host.includes("ajio")) platformId = "ajio";
                    else if (host.includes("shopify")) platformId = "shopify";
                    else if (host.includes("oneinflu") || host.includes("influ")) platformId = "website";
                } catch {}
                const labelMap: Record<string, string> = {
                    amazon: "Amazon",
                    flipkart: "Flipkart",
                    meesho: "Meesho",
                    myntra: "Myntra",
                    ajio: "Ajio",
                    shopify: "Brand Website",
                    website: "Brand Website",
                    other: "Other",
                };
                setPrimaryPreview({
                    title: clean((data as any)?.title) || "Product",
                    image: clean((data as any)?.imageUrl || (data as any)?.image) || "/web.png",
                    price: (data as any)?.price ? String((data as any)?.price) : "",
                    description: clean((data as any)?.description),
                    platform: labelMap[platformId] || "Other",
                });
            } catch {
                if (canceled) return;
                try {
                    const u = new URL(url);
                    const host = u.hostname.toLowerCase();
                    const platform =
                        host.includes("amazon") ? "Amazon" :
                        host.includes("flipkart") ? "Flipkart" :
                        host.includes("meesho") ? "Meesho" :
                        host.includes("myntra") ? "Myntra" :
                        host.includes("ajio") ? "Ajio" :
                        host.includes("shopify") ? "Brand Website" :
                        "Other";
                    const path = u.pathname.split("/").filter(Boolean);
                    const guess = path[path.length - 1]?.replace(/[-_]/g, " ") || "Product";
                    setPrimaryPreview({ title: guess, image: "/web.png", price: "", platform });
                } catch {
                    setPrimaryPreview({ title: "Product", image: "/web.png", price: "", platform: "Other" });
                }
            } finally {
                if (!canceled) setIsFetchingPrimary(false);
            }
        })();
        return () => {
            canceled = true;
        };
    }, [primaryLink, previewFetchKey]);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!token || !user?.id) return;
                const me = await api.get<{ id: string; username: string; upi?: string }>(`/users/id/${user.id}`, { token });
                if (!alive) return;
                setUsername(me.username || "");
                setCtas((prev) => prev.map((c) => (c.id === "pay" ? { ...c, enabled: Boolean(me.upi) } : c)));

                try {
                    const catRes = await api.get<{ success: boolean; status: string; data: { items: Array<{ _id: string; name: string }> } }>(`/users/${me.username}/shop-categories`, { token });
                    const items = (catRes.data?.items || []).map((c) => ({ id: String(c._id), name: c.name }));
                    setCategories(items);
                } catch {}

                const res = await api.get<{ success: boolean; status: string; data: { links: Array<{ _id: string; platform: string; url: string; visible?: boolean }> } }>(`/users/id/${user.id}/shop-links`, { token });
                const iconMap: Record<string, string> = {
                    website: "/web.png",
                    shopify: "/web.png",
                    woocommerce: "/web.png",
                    etsy: "/web.png",
                    amazon: "/web.png",
                    flipkart: "/web.png",
                    meesho: "/web.png",
                    myntra: "/web.png",
                    ajio: "/web.png",
                    gumroad: "/web.png",
                    payhip: "/web.png",
                    other: "/web.png",
                };
                const labelMap: Record<string, string> = {
                    website: "Website",
                    shopify: "Shopify",
                    woocommerce: "WooCommerce",
                    etsy: "Etsy",
                    amazon: "Amazon",
                    flipkart: "Flipkart",
                    meesho: "Meesho",
                    myntra: "Myntra",
                    ajio: "Ajio",
                    gumroad: "Gumroad",
                    payhip: "Payhip",
                    other: "Other",
                };
                const mapped = (res.data?.links || []).map((l) => ({
                    id: l.platform,
                    linkId: String(l._id),
                    platform: labelMap[l.platform] || "Website",
                    icon: iconMap[l.platform] || "/web.png",
                    url: l.url,
                    visible: Boolean(l.visible ?? true),
                    categoryName: undefined,
                }));
                setLinks(mapped);
                try {
                    setProductsLoading(true);
                    const prodRes = await api.get<{ success: boolean; status: string; data: { items: Array<any> } }>(`/users/${me.username}/affiliate-shop`, { token });
                    const prodItems = (prodRes.data?.items || []).map((it: any) => ({
                        id: String(it?._id || ""),
                        title: String(it?.primary?.preview?.title || "Product"),
                        image: String(it?.primary?.preview?.image || "/web.png"),
                        platformLabel: String(it?.primary?.platformLabel || (it?.primary?.preview?.platform || "Other")),
                        url: String(it?.primary?.url || ""),
                        categoryId: String(it?.primary?.category?._id || ""),
                        categoryName: String(it?.primary?.category?.name || ""),
                        tags: {
                            affiliate: Boolean(it?.primary?.tags?.affiliate),
                            personallyUsed: Boolean(it?.primary?.tags?.personallyUsed),
                            brandPartner: Boolean(it?.primary?.tags?.brandPartner),
                        },
                        secondary: Array.isArray(it?.secondary) ? it.secondary.map((s: any) => ({
                            id: String(s?._id || ""),
                            platformId: String(s?.platformId || ""),
                            platformLabel: String(s?.platformLabel || ""),
                            url: String(s?.url || ""),
                        })) : [],
                    }));
                    setProducts(prodItems);
                } catch {}
                finally {
                    setProductsLoading(false);
                }
                setPreviewVersion((v) => v + 1);
            } catch {}
            finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [token, user?.id]);

    useEffect(() => {
        (async () => {
            try {
                if (!token || !username) return;
                setProductsLoading(true);
                if (selectedCategory === "All") {
                    const prodRes = await api.get<{ success: boolean; status: string; data: { items: Array<any> } }>(`/users/${username}/affiliate-shop`, { token });
                    const prodItems = (prodRes.data?.items || []).map((it: any) => ({
                        id: String(it?._id || ""),
                        title: String(it?.primary?.preview?.title || "Product"),
                        image: String(it?.primary?.preview?.image || "/web.png"),
                        platformLabel: String(it?.primary?.platformLabel || (it?.primary?.preview?.platform || "Other")),
                        url: String(it?.primary?.url || ""),
                        categoryId: String(it?.primary?.category?._id || ""),
                        categoryName: String(it?.primary?.category?.name || ""),
                        tags: {
                            affiliate: Boolean(it?.primary?.tags?.affiliate),
                            personallyUsed: Boolean(it?.primary?.tags?.personallyUsed),
                            brandPartner: Boolean(it?.primary?.tags?.brandPartner),
                        },
                        secondary: Array.isArray(it?.secondary) ? it.secondary.map((s: any) => ({
                            id: String(s?._id || ""),
                            platformId: String(s?.platformId || ""),
                            platformLabel: String(s?.platformLabel || ""),
                            url: String(s?.url || ""),
                        })) : [],
                    }));
                    setProducts(prodItems);
                } else {
                    const found = categories.find((c) => c.name === selectedCategory);
                    if (found?.id) {
                        const prodRes = await api.get<{ success: boolean; status: string; data: { items: Array<any> } }>(`/users/${username}/affiliate-shop/category/${found.id}`, { token });
                        const prodItems = (prodRes.data?.items || []).map((it: any) => ({
                            id: String(it?._id || ""),
                            title: String(it?.primary?.preview?.title || "Product"),
                            image: String(it?.primary?.preview?.image || "/web.png"),
                            platformLabel: String(it?.primary?.platformLabel || (it?.primary?.preview?.platform || "Other")),
                            url: String(it?.primary?.url || ""),
                            categoryId: String(it?.primary?.category?._id || ""),
                            categoryName: String(it?.primary?.category?.name || ""),
                            tags: {
                                affiliate: Boolean(it?.primary?.tags?.affiliate),
                                personallyUsed: Boolean(it?.primary?.tags?.personallyUsed),
                                brandPartner: Boolean(it?.primary?.tags?.brandPartner),
                            },
                            secondary: Array.isArray(it?.secondary) ? it.secondary.map((s: any) => ({
                                id: String(s?._id || ""),
                                platformId: String(s?.platformId || ""),
                                platformLabel: String(s?.platformLabel || ""),
                                url: String(s?.url || ""),
                            })) : [],
                        }));
                        setProducts(prodItems);
                    }
                }
            } catch {}
            finally {
                setProductsLoading(false);
            }
        })();
    }, [selectedCategory, token, username, categories]);

    const handleSavePublish = async (close: () => void) => {
        const publish = true;
        const url = primaryLink.trim();
        if (!url) return;
        let platformId = "other";
        try {
            const u = new URL(url);
            const host = u.hostname.toLowerCase();
            if (host.includes("amazon")) platformId = "amazon";
            else if (host.includes("flipkart")) platformId = "flipkart";
            else if (host.includes("meesho")) platformId = "meesho";
            else if (host.includes("myntra")) platformId = "myntra";
            else if (host.includes("ajio")) platformId = "ajio";
            else if (host.includes("shopify")) platformId = "website";
        } catch {}
        try {
            if (!token || !user?.id) return;
            const labelMap: Record<string, string> = {
                amazon: "Amazon",
                flipkart: "Flipkart",
                meesho: "Meesho",
                myntra: "Myntra",
                ajio: "Ajio",
                website: "Brand Website",
                other: "Other",
            };
            const payload = {
                publish,
                primary: {
                    platformId,
                    platformLabel: labelMap[platformId] || "Other",
                    url,
                    categoryId: drawerCategoryId,
                    category: drawerCategory || null,
                    tags: {
                        affiliate: affiliateLink,
                        personallyUsed,
                        brandPartner,
                    },
                    preview: {
                        title: primaryPreview?.title || "",
                        image: primaryPreview?.image || "/web.png",
                        platform: primaryPreview?.platform || labelMap[platformId] || "Other",
                        description: primaryPreview?.description || "",
                    },
                },
                secondary: secondaryOptions.map((opt) => ({
                    platformId: opt.platformId,
                    platformLabel: opt.platformLabel,
                    url: opt.url,
                })),
            };
            let it: any = null;
            if (editProductId) {
                const updated = await api.patch<{ success: boolean; status: string; data: { item: any } }>(`/users/${username}/affiliate-shop/${editProductId}`, payload, { token });
                it = (updated as any)?.data?.item || (updated as any)?.item || null;
            } else {
                const created = await api.post<{ success: boolean; status: string; data: { item: any } }>(`/users/${username}/affiliate-shop`, payload, { token });
                it = (created as any)?.data?.item || (created as any)?.item || null;
            }
            if (it) {
                const mapped = {
                    id: String(it?._id || ""),
                    title: String(it?.primary?.preview?.title || "Product"),
                    image: String(it?.primary?.preview?.image || "/web.png"),
                    platformLabel: String(it?.primary?.platformLabel || (it?.primary?.preview?.platform || "Other")),
                    url: String(it?.primary?.url || ""),
                    categoryId: String(it?.primary?.category?._id || ""),
                    categoryName: String(it?.primary?.category?.name || ""),
                    tags: {
                        affiliate: Boolean(it?.primary?.tags?.affiliate),
                        personallyUsed: Boolean(it?.primary?.tags?.personallyUsed),
                        brandPartner: Boolean(it?.primary?.tags?.brandPartner),
                    },
                    secondary: Array.isArray(it?.secondary) ? it.secondary.map((s: any) => ({
                        id: String(s?._id || ""),
                        platformId: String(s?.platformId || ""),
                        platformLabel: String(s?.platformLabel || ""),
                        url: String(s?.url || ""),
                    })) : [],
                };
                setProducts((prev) => {
                    if (editProductId) return prev.map((p) => (p.id === String(it?._id || "") ? mapped : p));
                    return [mapped, ...prev];
                });
            }
            setPreviewVersion((v) => v + 1);
            close();
            setPrimaryLink("");
            setPrimaryPreview(null);
            setAffiliateLink(true);
            setPersonallyUsed(false);
            setBrandPartner(false);
            setDrawerCategory("");
            setShowProductDetails(false);
            setShowSecondaryPricing(false);
            setSecondaryOptions([]);
            setEditProductId(null);
        } catch {}
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Shop Links</h1>
                            <p className="text-md text-tertiary">Add your store and checkout links</p>
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
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <h2 className="text-lg font-semibold text-primary order-1 md:order-none">Storefront</h2>
                                    <div className="flex items-center gap-2 order-2 md:order-none">
                                        <Button size="sm" color="secondary" onClick={() => setShowAddDrawer(true)}>+ Add Shop Product</Button>
                                        <Button size="sm" color="secondary" onClick={() => setShowManageCategories(true)}>Manage Categories</Button>
                                    </div>
                                    <p className="text-sm text-tertiary order-3 md:order-none">Link marketplaces and checkout pages</p>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setSelectedCategory("All")}
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ring-1 ring-secondary_alt transition-colors ${selectedCategory === "All" ? "bg-brand-solid text-white ring-transparent" : "text-tertiary hover:bg-primary_hover hover:text-primary"}`}
                                    >
                                        All
                                    </div>
                                    {categories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => setSelectedCategory(cat.name)}
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ring-1 ring-secondary_alt transition-colors ${selectedCategory === cat.name ? "bg-brand-solid text-white ring-transparent" : "text-tertiary hover:bg-primary_hover hover:text-primary"}`}
                                        >
                                            <span className="truncate">{cat.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {categories.length === 0 && (
                                    <p className="mt-2 text-xs text-secondary">Create categories first to start adding shop products.</p>
                                )}

                                {/* Slideout drawer for adding product and buying options */}
                                <SlideoutMenu.Trigger isOpen={showAddDrawer} onOpenChange={setShowAddDrawer}>
                                    <Button slot="trigger" className="hidden">Open</Button>
                                    <SlideoutMenu isDismissable dialogClassName="fixed inset-0 h-full w-full bg-primary ring-1 ring-secondary_alt">
                                        {({ close }) => (
                                            <>
                                                <SlideoutMenu.Header onClose={close}>
                                                    <div className="flex min-w-0 flex-col gap-1">
                                                        <h3 className="text-lg font-semibold text-primary">Add Product</h3>
                                                        <p className="text-sm text-tertiary">Add a product to your storefront</p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="absolute top-3 right-16 shrink-0"
                                                        onClick={() => handleSavePublish(close)}
                                                    >
                                                        Save & Publish
                                                    </Button>
                                                </SlideoutMenu.Header>
                                                <SlideoutMenu.Content>
                                                    <div className="rounded-xl bg-primary p-4 ring-1 ring-secondary">
                                                        <p className="text-sm font-semibold text-primary">Add Product</p>
                                                        <div className="mt-2">
                                                            <Input
                                                                size="md"
                                                                placeholder="Paste product or affiliate link"
                                                                className="w-full"
                                                                value={primaryLink}
                                                                onChange={setPrimaryLink}
                                                            />
                                                            <p className="mt-1 text-xs text-secondary">Paste an Amazon, Flipkart, Meesho, Shopify, or any affiliate link</p>
                                                        </div>
                                                        {categories.length > 0 && (
                                                            <div className="mt-3">
                                                                <Select
                                                                    size="md"
                                                                    label="Category"
                                                                    placeholder="Select category"
                                                                    items={categories.map((c) => ({ id: c.id, label: c.name }))}
                                                                    selectedKey={drawerCategoryId || undefined}
                                                                    onSelectionChange={(key) => {
                                                                        const k = String(key);
                                                                        setDrawerCategoryId(k);
                                                                        const found = categories.find((c) => c.id === k);
                                                                        setDrawerCategory(found?.name || "");
                                                                    }}
                                                                >
                                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                                </Select>
                                                            </div>
                                                        )}
                                                        {isFetchingPrimary && (
                                                            <div className="mt-3 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="size-12 rounded bg-primary animate-pulse" />
                                                                    <div className="flex-1">
                                                                        <div className="h-3 w-40 bg-primary animate-pulse rounded" />
                                                                        <div className="mt-2 h-3 w-24 bg-primary animate-pulse rounded" />
                                                                    </div>
                                                                </div>
                                                                <p className="mt-2 text-xs text-secondary">Fetching product details…</p>
                                                            </div>
                                                        )}
                                                        {primaryPreview && !isFetchingPrimary && (
                                                            <div className="mt-3 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                                                <div className="flex flex-col gap-3">
                                                                    <img src={primaryPreview.image || "/web.png"} alt="Product image" className="w-full h-32 rounded object-cover" />
                                                                    <p className="text-md font-medium text-primary whitespace-normal break-words leading-snug">{primaryPreview.title || "Product"}</p>
                                                                    {primaryPreview.platform && (
                                                                        <Badge type="pill-color" size="sm" color={
                                                                            primaryPreview.platform === "Amazon" ? "warning" :
                                                                            primaryPreview.platform === "Flipkart" ? "blue" :
                                                                            primaryPreview.platform === "Meesho" ? "pink" :
                                                                            primaryPreview.platform === "Myntra" ? "orange" :
                                                                            "gray"
                                                                        }>
                                                                            {primaryPreview.platform}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <div className="mt-3 flex items-center gap-2">
                                                                    <Button size="sm" color="secondary" onClick={() => setPreviewFetchKey((k) => k + 1)}>Refresh</Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="mt-3 flex flex-col gap-3">
                                                            <div className="rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                                                <p className="text-sm font-semibold text-primary">Tags & Trust</p>
                                                                <div className="mt-2 flex flex-col gap-2">
                                                                    <Checkbox size="md" isSelected={affiliateLink} onChange={setAffiliateLink} label="Affiliate" />
                                                                    <Checkbox size="md" isSelected={personallyUsed} onChange={setPersonallyUsed} label="Personally used" />
                                                                    <Checkbox size="md" isSelected={brandPartner} onChange={setBrandPartner} label="Brand partner" />
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg bg-primary p-3 ring-1 ring-secondary">
                                                                <p className="text-sm font-semibold text-primary">Other Buying Options</p>
                                                                {!showSecondaryForm ? (
                                                                    <div className="mt-2">
                                                                        <Button size="sm" color="secondary" onClick={() => setShowSecondaryForm(true)}>+ Add other option</Button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="mt-2 flex flex-col gap-2">
                                                                        <Select
                                                                            size="md"
                                                                            placeholder="Select platform"
                                                                            items={[
                                                                                { id: "amazon", label: "Amazon" },
                                                                                { id: "flipkart", label: "Flipkart" },
                                                                                { id: "meesho", label: "Meesho" },
                                                                                { id: "myntra", label: "Myntra" },
                                                                                { id: "ajio", label: "Ajio" },
                                                                                { id: "website", label: "Brand Website" },
                                                                                { id: "other", label: "Other" },
                                                                            ]}
                                                                            selectedKey={secondary.platform}
                                                                            onSelectionChange={(key) => setSecondary((s) => ({ ...s, platform: String(key) }))}
                                                                        >
                                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                                        </Select>
                                                                        <Input
                                                                            size="md"
                                                                            placeholder="Paste link"
                                                                            className="w-full"
                                                                            type="url"
                                                                            value={secondary.url}
                                                                            onChange={(val) => setSecondary((s) => ({ ...s, url: val }))}
                                                                        />
                                                                        <div className="flex items-center gap-2">
                                                                            <Button
                                                                                size="sm"
                                                                                color="secondary"
                                                                                onClick={() => {
                                                                                    const id = (secondary.platform || "other").trim();
                                                                                    const url = (secondary.url || "").trim();
                                                                                    if (!url) return;
                                                                                    const labelMap: Record<string, string> = {
                                                                                        amazon: "Amazon",
                                                                                        flipkart: "Flipkart",
                                                                                        meesho: "Meesho",
                                                                                        myntra: "Myntra",
                                                                                        ajio: "Ajio",
                                                                                        website: "Brand Website",
                                                                                        other: "Other",
                                                                                    };
                                                                                    const label = labelMap[id] || "Other";
                                                                                    setSecondaryOptions((prev) => [...prev, { platformId: id, platformLabel: label, url }]);
                                                                                    setSecondary({ platform: "flipkart", url: "", titleOverride: "", price: "", discount: "", badge: undefined });
                                                                                    setShowSecondaryForm(false);
                                                                                }}
                                                                            >
                                                                                Add
                                                                            </Button>
                                                                            <Button size="sm" onClick={() => { setShowSecondaryForm(false); }}>
                                                                                Cancel
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {secondaryOptions.length > 0 && (
                                                                    <ul className="mt-3 flex flex-col gap-2">
                                                                        {secondaryOptions.map((opt, idx) => (
                                                                            <li key={opt.platformId + idx} className="flex items-center justify-between gap-3 rounded-lg bg-primary_hover p-2 ring-1 ring-secondary_alt">
                                                                                <div className="flex min-w-0 items-center gap-2">
                                                                                    <p className="text-sm font-medium text-primary">{opt.platformLabel}</p>
                                                                                    <Input
                                                                                        size="sm"
                                                                                        placeholder="url"
                                                                                        className="flex-1"
                                                                                        type="url"
                                                                                        value={opt.url}
                                                                                        onChange={(val) => {
                                                                                            setSecondaryOptions((prev) => prev.map((o, i) => (i === idx ? { ...o, url: val } : o)));
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <ButtonUtility
                                                                                    aria-label="Remove"
                                                                                    icon={Trash01}
                                                                                    size="sm"
                                                                                    onClick={() => setSecondaryOptions((prev) => prev.filter((_, i) => i !== idx))}
                                                                                />
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        </div>
                                                </div>
                                                </SlideoutMenu.Content>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                                                        <Button size="sm" color="secondary" onClick={close}>Close</Button>
                                                        <Button size="sm" onClick={() => handleSavePublish(close)}>Save & Publish</Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                            </>
                                        )}
                                    </SlideoutMenu>
                                </SlideoutMenu.Trigger>

                                {/* Manage Categories drawer */}
                                <SlideoutMenu.Trigger isOpen={showManageCategories} onOpenChange={setShowManageCategories}>
                                    <Button slot="trigger" className="hidden">Open</Button>
                                    <SlideoutMenu isDismissable dialogClassName="fixed inset-0 h-full w-full bg-primary ring-1 ring-secondary_alt">
                                        {({ close }) => (
                                            <>
                                                <SlideoutMenu.Header onClose={close}>
                                                    <div className="flex min-w-0 flex-col gap-1">
                                                        <h3 className="text-lg font-semibold text-primary">Manage Categories</h3>
                                                        <p className="text-sm text-tertiary">Add, edit, or delete product categories</p>
                                                    </div>
                                                </SlideoutMenu.Header>
                                                <SlideoutMenu.Content>
                                                    <div className="rounded-xl bg-primary p-4 ring-1 ring-secondary">
                                                    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-end">
                                                            <Input size="md" placeholder="New category name" value={newCategory} onChange={setNewCategory} className="flex-1" />
                                                            <Button
                                                                size="sm"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    const name = newCategory.trim();
                                                                    if (!name) return;
                                                                    (async () => {
                                                                        try {
                                                                            if (!token || !username) return;
                                                                            if (!categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
                                                                                const res = await api.post<{ success: boolean; status: string; message: string; data: { item: { id?: string; _id?: string; name: string } } }>(
                                                                                    `/users/${username}/shop-categories`,
                                                                                    { name },
                                                                                    { token },
                                                                                );
                                                                                const item = res.data?.item || (res.data as any)?.data?.item;
                                                                                const id = String(item?.id || item?._id || "");
                                                                                setCategories((prev) => [...prev, { id, name }]);
                                                                            }
                                                                            setSelectedCategory(name);
                                                                        } catch {}
                                                                        setNewCategory("");
                                                                    })();
                                                                }}
                                                            >
                                                                Add
                                                            </Button>
                                                        </div>

                                                        {categories.length === 0 ? (
                                                            <div className="mt-4 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                                                <p className="text-sm text-tertiary">No categories yet. Add your first category to organize products.</p>
                                                            </div>
                                                        ) : (
                                                            <ul className="mt-4 flex flex-col gap-2">
                                                                {categories.map((cat) => (
                                                                    <li key={cat.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-primary p-2 ring-1 ring-secondary">
                                                                        {editingCategoryId === cat.id ? (
                                                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center flex-1">
                                                                                <Input size="md" placeholder="Category name" value={editingCategoryName} onChange={setEditingCategoryName} className="flex-1" />
                                                                                <ButtonUtility
                                                                                    aria-label="Save"
                                                                                    icon={CheckDone01}
                                                                                    size="sm"
                                                                                    onClick={async () => {
                                                                                        const next = editingCategoryName.trim();
                                                                                        if (!next) return;
                                                                                        try {
                                                                                            if (!token || !username) return;
                                                                                            const res = await api.patch<{ success: boolean; status: string; data: { item: { _id: string; name: string } } }>(`/users/${username}/shop-categories/${cat.id}`, { name: next }, { token });
                                                                                            const updated = res.data?.item?.name || next;
                                                                                            setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...c, name: updated } : c)));
                                                                                            setSelectedCategory((sel) => (sel === cat.name ? updated : sel));
                                                                                        } catch {}
                                                                                        setEditingCategoryId(null);
                                                                                        setEditingCategoryName("");
                                                                                    }}
                                                                                />
                                                                                <ButtonUtility aria-label="Cancel" icon={X} size="sm" onClick={() => { setEditingCategoryId(null); setEditingCategoryName(""); }} />
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <p className="text-sm text-primary">{cat.name}</p>
                                                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                                                                    <ButtonUtility aria-label="Edit" icon={Edit01} size="sm" onClick={() => { setEditingCategoryId(cat.id); setEditingCategoryName(cat.name); }} />
                                                                                    <ButtonUtility
                                                                                        aria-label="Delete"
                                                                                        icon={Trash01}
                                                                                        size="sm"
                                                                                        onClick={async () => {
                                                                                            try {
                                                                                                if (!token || !username) return;
                                                                                                await api.delete(`/users/${username}/shop-categories/${cat.id}`, { token });
                                                                                                setCategories((prev) => prev.filter((c) => c.id !== cat.id));
                                                                                                setSelectedCategory((sel) => (sel === cat.name ? "All" : sel));
                                                                                            } catch {}
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </SlideoutMenu.Content>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button size="sm" onClick={() => setShowManageCategories(false)}>Close</Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                            </>
                                        )}
                                    </SlideoutMenu>
                                </SlideoutMenu.Trigger>

                                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                                    {(() => {
                                        const filtered = selectedCategory === "All" ? products : products.filter((p) => p.categoryName === selectedCategory);
                                        return filtered.map((p) => (
                                            <div key={p.id} className="rounded-2xl bg-primary ring-1 ring-secondary_alt shadow-xs overflow-hidden relative">
                                                <div className="aspect-square w-full bg-primary_hover">
                                                    <img src={p.image} alt={p.title} className="size-full object-cover" />
                                                    <div className="absolute top-2 right-2 flex items-center gap-1">
                                                        <ButtonUtility
                                                            aria-label="Edit"
                                                            icon={Edit01}
                                                            size="sm"
                                                            onClick={() => {
                                                                setPrimaryLink(p.url || "");
                                                                const cat = categories.find((c) => c.name === p.categoryName);
                                                                setDrawerCategoryId(cat?.id || null);
                                                                setDrawerCategory(p.categoryName || "");
                                                                setAffiliateLink(Boolean(p.tags?.affiliate));
                                                                setPersonallyUsed(Boolean(p.tags?.personallyUsed));
                                                                setBrandPartner(Boolean(p.tags?.brandPartner));
                                                                const idFor = (label: string) => {
                                                                    const map: Record<string, string> = {
                                                                        Amazon: "amazon",
                                                                        Flipkart: "flipkart",
                                                                        Meesho: "meesho",
                                                                        Myntra: "myntra",
                                                                        Ajio: "ajio",
                                                                        Website: "website",
                                                                        "Brand Website": "website",
                                                                        Other: "other",
                                                                    };
                                                                    return map[label] || "other";
                                                                };
                                                                setSecondaryOptions(
                                                                    (p.secondary || []).map((s) => ({
                                                                        platformId: s.platformId || idFor(s.platformLabel),
                                                                        platformLabel: s.platformLabel,
                                                                        url: s.url || "",
                                                                    })),
                                                                );
                                                                setEditProductId(p.id);
                                                                setShowAddDrawer(true);
                                                            }}
                                                        />
                                                        <ButtonUtility
                                                            aria-label="Delete"
                                                            icon={Trash01}
                                                            size="sm"
                                                            onClick={async () => {
                                                                try {
                                                                    if (!token || !username) return;
                                                                    await api.delete(`/users/${username}/affiliate-shop/${p.id}`, { token });
                                                                    setProducts((prev) => prev.filter((x) => x.id !== p.id));
                                                                } catch {}
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="p-3 flex flex-col gap-2">
                                                    <div className="min-w-0">
                                                        <p className="text-md font-semibold text-primary truncate">{p.title}</p>
                                                        <p className="text-xs text-secondary truncate">{p.platformLabel}{p.categoryName ? ` · ${p.categoryName}` : ""}</p>
                                                    </div>
                                                    {p.tags && (p.tags.affiliate || p.tags.personallyUsed || p.tags.brandPartner) && (
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {p.tags.affiliate && <Badge size="sm" color="brand">Affiliate</Badge>}
                                                            {p.tags.personallyUsed && <Badge size="sm" color="gray">Personally used</Badge>}
                                                            {p.tags.brandPartner && <Badge size="sm" color="success">Brand partner</Badge>}
                                                        </div>
                                                    )}
                                                   
                                                </div>
                                            </div>
                                        ));
                                    })()}
                                </div>
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

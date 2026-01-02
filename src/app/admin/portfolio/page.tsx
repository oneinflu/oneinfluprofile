"use client";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { Edit01, Trash01 } from "@untitledui/icons";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PhonePreview } from "@/components/application/preview/phone-preview";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";

export default function AdminPortfolioPage() {
    const { token, user } = useAuth();
    const [items, setItems] = useState<Array<{ id: string; title: string; brand?: string; platform: string; thumbnail?: string; visible: boolean; topWork?: boolean; sponsored?: boolean; pinned?: boolean; description?: string; contentType?: "image" | "video" | "link"; externalUrl?: string }>>([]);
    const [editorOpen, setEditorOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
    const [limitOpen, setLimitOpen] = useState(false);
    const [previewVersion, setPreviewVersion] = useState(0);
    const [draft, setDraft] = useState<{ contentType: "image" | "video" | "link"; fileUrl?: string; file?: File | null; externalUrl?: string; title: string; brand?: string; description?: string; platform: string; visible: boolean; pinned?: boolean }>({
        contentType: "image",
        fileUrl: undefined,
        file: null,
        externalUrl: "",
        title: "",
        brand: "",
        description: "",
        platform: "instagram",
        visible: true,
        pinned: false,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username) return;
                const res = await api.get<{
                    success: boolean;
                    status: string;
                    data: {
                        items: Array<{
                            _id: string;
                            title: string;
                            brand?: string | null;
                            platform: string;
                            fileUrl?: string | null;
                            visible: boolean;
                            description?: string | null;
                            contentType?: "image" | "video" | "link" | null;
                            externalUrl?: string | null;
                            pinned?: boolean | null;
                        }>;
                    };
                }>(`/users/${user.username}/portfolio`, { token });
                if (!alive) return;
                setItems(
                    (res.data?.items || []).map((it) => ({
                        id: String((it as any)._id || (it as any).id),
                        title: it.title,
                        brand: it.brand || undefined,
                        platform: it.platform || "website",
                        thumbnail: it.fileUrl || undefined,
                        visible: Boolean(it.visible),
                        description: it.description || undefined,
                        contentType: it.contentType || undefined,
                        externalUrl: it.externalUrl || undefined,
                        pinned: Boolean(it.pinned),
                    }))
                );
            } catch {}
        })();
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.username, token]);

    const openAdd = () => {
        setEditIndex(null);
        setDraft({ contentType: "image", fileUrl: undefined, file: null, externalUrl: "", title: "", brand: "", description: "", platform: "instagram", visible: true, pinned: false });
        setEditorOpen(true);
    };

    const openEdit = (index: number) => {
        const it = items[index];
        setEditIndex(index);
        setDraft({
            contentType: it.contentType || (it.externalUrl ? "link" : "image"),
            fileUrl: it.thumbnail,
            file: null,
            externalUrl: it.externalUrl || "",
            title: it.title,
            brand: it.brand || "",
            description: it.description || "",
            platform: it.platform,
            visible: it.visible,
            pinned: it.pinned || false,
        });
        setEditorOpen(true);
    };

    const saveDraft = async () => {
        if (!draft.title.trim()) return;
        const action = editIndex === null ? "create" : "update";
        try {
            if (!user?.username || !token) throw new Error("unauthorized");
            if (editIndex === null) {
                let w: any;
                if (draft.file) {
                    const fd = new FormData();
                    fd.append("file", draft.file);
                    fd.append("contentType", draft.contentType);
                    fd.append("externalUrl", draft.externalUrl?.trim() || "");
                    fd.append("title", draft.title.trim());
                    fd.append("brand", draft.brand?.trim() || "");
                    fd.append("description", (draft.description || "").slice(0, 120));
                    fd.append("platform", draft.platform);
                    fd.append("visible", String(draft.visible));
                    fd.append("pinned", String(draft.pinned || false));
                    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.username}/portfolio`;
                    const resp = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
                    const data = await resp.json().catch(() => ({}));
                    if (!resp.ok) {
                        if ((data as any)?.message === "storage_limit_reached" || resp.status === 413) {
                            setLimitOpen(true);
                            return;
                        }
                        throw new Error((data as any)?.message || `HTTP ${resp.status}`);
                    }
                    w = (data as any).data?.item;
                } else {
                    const res = await api.post<{
                        success: boolean;
                        status: string;
                        data: {
                            item: {
                                id: string;
                                contentType?: "image" | "video" | "link" | null;
                                fileUrl?: string | null;
                                externalUrl?: string | null;
                                title: string;
                                brand?: string | null;
                                description?: string | null;
                                platform: string;
                                visible: boolean;
                                pinned?: boolean | null;
                            };
                        };
                    }>(
                        `/users/${user.username}/portfolio`,
                        {
                            contentType: draft.contentType,
                            fileUrl: draft.fileUrl || null,
                            externalUrl: draft.externalUrl?.trim() || null,
                            title: draft.title.trim(),
                            brand: draft.brand?.trim() || null,
                            description: (draft.description || "").slice(0, 120),
                            platform: draft.platform,
                            visible: draft.visible,
                            pinned: draft.pinned || false,
                        },
                        { token },
                    );
                    w = res.data.item;
                }
                const nextItem = {
                    id: w.id,
                    title: w.title,
                    brand: w.brand || undefined,
                    platform: w.platform,
                    thumbnail: (w as any).thumbnail || w.fileUrl || undefined,
                    visible: w.visible,
                    description: w.description || undefined,
                    contentType: w.contentType || undefined,
                    externalUrl: w.externalUrl || undefined,
                    pinned: w.pinned || false,
                } as (typeof items)[number];
                setItems((prev) => [nextItem, ...prev]);
                setPreviewVersion((v) => v + 1);
            } else {
                const id = items[editIndex].id;
                let w: any;
                if (draft.file) {
                    const fd = new FormData();
                    fd.append("file", draft.file);
                    fd.append("contentType", draft.contentType);
                    fd.append("externalUrl", draft.externalUrl?.trim() || "");
                    fd.append("title", draft.title.trim());
                    fd.append("brand", draft.brand?.trim() || "");
                    fd.append("description", (draft.description || "").slice(0, 120));
                    fd.append("platform", draft.platform);
                    fd.append("visible", String(draft.visible));
                    fd.append("pinned", String(draft.pinned || false));
                    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.username}/portfolio/${id}`;
                    const resp = await fetch(url, { method: "PATCH", headers: { Authorization: `Bearer ${token}` }, body: fd });
                    const data = await resp.json().catch(() => ({}));
                    if (!resp.ok) {
                        if ((data as any)?.message === "storage_limit_reached" || resp.status === 413) {
                            setLimitOpen(true);
                            return;
                        }
                        throw new Error((data as any)?.message || `HTTP ${resp.status}`);
                    }
                    w = (data as any).data?.item;
                } else {
                    const res = await api.patch<{
                        success: boolean;
                        status: string;
                        data: {
                            item: {
                                id: string;
                                contentType?: "image" | "video" | "link" | null;
                                fileUrl?: string | null;
                                externalUrl?: string | null;
                                title: string;
                                brand?: string | null;
                                description?: string | null;
                                platform: string;
                                visible: boolean;
                                pinned?: boolean | null;
                            };
                        };
                    }>(
                        `/users/${user.username}/portfolio/${id}`,
                        {
                            contentType: draft.contentType,
                            fileUrl: draft.fileUrl || null,
                            externalUrl: draft.externalUrl?.trim() || null,
                            title: draft.title.trim(),
                            brand: draft.brand?.trim() || null,
                            description: (draft.description || "").slice(0, 120),
                            platform: draft.platform,
                            visible: draft.visible,
                            pinned: draft.pinned || false,
                        },
                        { token },
                    );
                    w = res.data.item;
                }
                const nextItem = {
                    id: w.id,
                    title: w.title,
                    brand: w.brand || undefined,
                    platform: w.platform,
                    thumbnail: (w as any).thumbnail || w.fileUrl || undefined,
                    visible: w.visible,
                    description: w.description || undefined,
                    contentType: w.contentType || undefined,
                    externalUrl: w.externalUrl || undefined,
                    pinned: w.pinned || false,
                } as (typeof items)[number];
                setItems((prev) => prev.map((o, i) => (i === editIndex ? nextItem : o)));
                setPreviewVersion((v) => v + 1);
            }
        } catch {} finally {
            setEditorOpen(false);
        }
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="sticky top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">My Portfolio</h1>
                            <p className="text-md text-tertiary">Work visible on your public profile</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" onClick={openAdd}>+ Add Work</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl grid gap-8 lg:grid-cols-[1fr_1px_360px]">
                    <div className="flex flex-col gap-6">
                        <PortfolioGrid
                            items={items}
                            setItems={setItems}
                            onEdit={openEdit}
                            onAdd={openAdd}
                            onDelete={(index) => {
                                setConfirmIndex(index);
                                setConfirmOpen(true);
                            }}
                            onToggle={async (index, isSelected) => {
                                setItems((prev) => prev.map((x, i) => (i === index ? { ...x, visible: isSelected } : x)));
                                setPreviewVersion((v) => v + 1);
                                try {
                                    if (!user?.username || !token) return;
                                    const id = items[index].id;
                                    await api.patch(`/users/${user.username}/portfolio/${id}`, { visible: isSelected }, { token });
                                } catch {}
                            }}
                        />
                    </div>

                    <div aria-hidden className="hidden lg:block self-stretch w-px bg-border-secondary" />

                    <div className="hidden lg:block">
                        <div className="lg:sticky top-6">
                            <Suspense fallback={null}>
                                <PhonePreview username={user?.username ? `${user.username}?v=${previewVersion}` : undefined} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

            <AriaDialogTrigger isOpen={confirmOpen} onOpenChange={setConfirmOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full h-dvh cursor-auto flex items-center justify-center p-4">
                            <AriaDialog className="w-full max-w-sm overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <h2 className="text-lg font-semibold text-primary">Delete work?</h2>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={async () => {
                                                if (confirmIndex === null) return;
                                                try {
                                                    if (!user?.username || !token) throw new Error("unauthorized");
                                                    const id = items[confirmIndex].id;
                                                    await api.delete(`/users/${user.username}/portfolio/${id}`, { token });
                                                    setItems((prev) => prev.filter((_, i) => i !== confirmIndex));
                                                    setPreviewVersion((v) => v + 1);
                                                } catch {} finally {
                                                    setConfirmIndex(null);
                                                    state.close();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button size="sm" onClick={() => state.close()}>Cancel</Button>
                                    </div>
                                </div>
                                <div className="px-4 py-4">
                                    <p className="text-sm text-tertiary">This removes it from your profile immediately.</p>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>

            <AriaDialogTrigger isOpen={limitOpen} onOpenChange={setLimitOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full h-dvh cursor-auto flex items-center justify-center p-4">
                            <AriaDialog className="w-full max-w-sm overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <h2 className="text-lg font-semibold text-primary">Upload limit reached</h2>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" onClick={() => state.close()}>Close</Button>
                                    </div>
                                </div>
                                <div className="px-4 py-4">
                                    <p className="text-sm text-tertiary">You’ve reached your 15GB storage limit. Delete some files to upload new ones.</p>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>

            <AriaDialogTrigger isOpen={editorOpen} onOpenChange={setEditorOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog className="ml-auto h-dvh w-full max-w-md overflow-y-auto rounded-none bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                    <h2 className="text-lg font-semibold text-primary">{editIndex === null ? "Add Work" : "Edit Work"}</h2>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={saveDraft}>Save</Button>
                                        <Button size="sm" onClick={() => state.close()}>Cancel</Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 px-4 py-4">
                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Content Type</h3>
                                        <Select
                                            size="md"
                                            items={[{ id: "image", label: "Image" }, { id: "video", label: "Video / Reel" }]}
                                            selectedKey={draft.contentType}
                                            onSelectionChange={(key) => setDraft((d) => ({ ...d, contentType: String(key) as any }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Upload File</h3>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" color="secondary" onClick={() => fileInputRef.current?.click()}>Upload file</Button>
                                            <input ref={fileInputRef} type="file" accept={draft.contentType === "image" ? "image/*" : draft.contentType === "video" ? "video/*" : "*/*"} className="hidden" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setDraft((d) => ({ ...d, fileUrl: URL.createObjectURL(file), file }));
                                            }} />
                                        </div>
                                        <Input label="Paste URL" placeholder="Instagram / YouTube / Drive" value={draft.externalUrl || ""} onChange={(v) => setDraft((d) => ({ ...d, externalUrl: v }))} />
                                        {draft.fileUrl && (
                                            <div className="mt-3 rounded-lg ring-1 ring-secondary overflow-hidden hidden" aria-hidden="true">
                                                {draft.contentType === "video" ? (
                                                    <video src={draft.fileUrl} controls className="w-full aspect-video bg-secondary" />
                                                ) : draft.contentType === "image" ? (
                                                    <img src={draft.fileUrl} alt={draft.title || "Preview"} className="w-full aspect-video object-cover bg-secondary" />
                                                ) : null}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Details</h3>
                                        <Input label="Title" placeholder="e.g. Launch teaser" value={draft.title} onChange={(v) => setDraft((d) => ({ ...d, title: v }))} />
                                        <Input label="Brand name" placeholder="optional" value={draft.brand || ""} onChange={(v) => setDraft((d) => ({ ...d, brand: v }))} />
                                        <TextArea label="Short description" rows={3} value={draft.description || ""} onChange={(v) => setDraft((d) => ({ ...d, description: v.slice(0, 120) }))} hint={`${Math.min(120, (draft.description || "").length)}/120`} />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Platform</h3>
                                        <Select
                                            size="md"
                                            items={[
                                                { id: "instagram", label: "Instagram" },
                                                { id: "youtube", label: "YouTube" },
                                                { id: "tiktok", label: "TikTok" },
                                                { id: "x", label: "X" },
                                                { id: "threads", label: "Threads" },
                                                { id: "facebook", label: "Facebook" },
                                                { id: "linkedin", label: "LinkedIn" },
                                                { id: "telegram", label: "Telegram" },
                                                { id: "pinterest", label: "Pinterest" },
                                                { id: "website", label: "Website" },
                                            ]}
                                            selectedKey={draft.platform}
                                            onSelectionChange={(key) => setDraft((d) => ({ ...d, platform: String(key) }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Visibility</h3>
                                        <Toggle slim size="md" isSelected={draft.visible} onChange={(s) => setDraft((d) => ({ ...d, visible: s }))} aria-label="Show on profile" />
                                        <Toggle slim size="md" isSelected={draft.pinned || false} onChange={(s) => setDraft((d) => ({ ...d, pinned: s }))} aria-label="Pin to top" />
                                    </div>
                                </div>
                            </AriaDialog>
                        </AriaModal>
                    )}
                </AriaModalOverlay>
            </AriaDialogTrigger>
        </section>
    );
}

const platformIcon = (id: string) => {
    const map: Record<string, string> = {
        instagram: "/instagram.png",
        youtube: "/youtube.png",
        tiktok: "/tiktok.png",
        x: "/twitter.png",
        threads: "/threads.png",
        facebook: "/facebook.png",
        linkedin: "/linkedin.png",
        telegram: "/telegram.png",
        pinterest: "/pinterest.png",
        website: "/web.png",
    };
    return map[id] || "/web.png";
};

const PortfolioGrid = ({
    items,
    setItems,
    onEdit,
    onAdd,
    onDelete,
    onToggle,
}: {
    items: Array<{ id: string; title: string; brand?: string; platform: string; thumbnail?: string; visible: boolean; topWork?: boolean; sponsored?: boolean; pinned?: boolean }>;
    setItems: React.Dispatch<React.SetStateAction<Array<{ id: string; title: string; brand?: string; platform: string; thumbnail?: string; visible: boolean; topWork?: boolean; sponsored?: boolean; pinned?: boolean }>>>;
    onEdit: (index: number) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    onToggle: (index: number, isSelected: boolean) => void | Promise<void>;
}) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const formatBrand = (b?: string) => (b ? b : "");
    const [viewerOpen, setViewerOpen] = useState(false);
    const [viewerItem, setViewerItem] = useState<(typeof items)[number] | null>(null);
    const [autoplay, setAutoplay] = useState(false);

    if (items.length === 0) {
        return (
            <div className="rounded-2xl bg-primary p-6 shadow-xs ring-1 ring-secondary_alt">
                <div className="mx-auto max-w-md text-center">
                    <h3 className="text-md font-semibold text-primary">Your work builds trust</h3>
                    <p className="mt-1 text-sm text-tertiary">Add past collaborations to convert brands faster.</p>
                    <div className="mt-4">
                        <Button size="sm" color="secondary" onClick={onAdd}>+ Add your first work</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => setDragIndex(index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                                if (dragIndex === null || dragIndex === index) return;
                                const next = [...items];
                                const [moved] = next.splice(dragIndex, 1);
                                next.splice(index, 0, moved);
                                setItems(next);
                                setDragIndex(null);
                            }}
                            className="group rounded-xl ring-1 ring-secondary overflow-hidden"
                        >
                            <div className="relative">
                                <div className="aspect-video bg-secondary flex items-center justify-center">
                                    {(item as any).contentType === "video" && item.thumbnail ? (
                                        <video
                                            src={item.thumbnail}
                                            className="size-full object-cover pointer-events-none"
                                            muted
                                            playsInline
                                            preload="metadata"
                                            controlsList="nodownload noplaybackrate"
                                            disablePictureInPicture
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    ) : (item as any).contentType === "image" && item.thumbnail ? (
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="size-full object-cover select-none"
                                            draggable={false}
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        <img src={platformIcon(item.platform)} alt={item.platform} className="h-12 w-12" />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            className="px-3"
                                            onClick={() => {
                                                setViewerItem(item);
                                                setAutoplay((item as any).contentType === "video");
                                                setViewerOpen(true);
                                            }}
                                        >
                                            {(item as any).contentType === "video" ? "Play" : "View"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="absolute top-2 left-2 flex items-center gap-1">
                                    {index < 3 && item.visible && <Badge color="brand" size="sm">Top</Badge>}
                                    {item.pinned && <Badge color="indigo" size="sm">Pinned</Badge>}
                                    {item.topWork && <Badge color="brand" size="sm">Top work</Badge>}
                                    {item.sponsored && <Badge color="warning" size="sm">Sponsored</Badge>}
                                </div>

                                <div className="absolute top-2 right-2">
                                    <img src={platformIcon(item.platform)} alt={item.platform} className="h-6 w-6 rounded" />
                                </div>

                                <div className="pointer-events-none absolute inset-0 bg-alpha-black opacity-0 transition duration-150 ease-in-out group-hover:opacity-5" />

                                <div className="absolute inset-x-2 bottom-2 flex items-center justify-end gap-2 opacity-0 transition duration-150 ease-in-out group-hover:opacity-100">
                                    <Toggle slim size="sm" isSelected={item.visible} onChange={(s) => onToggle(index, s)} aria-label="Show on profile" />
                                    <ButtonUtility aria-label="Edit" icon={Edit01} size="sm" onClick={() => onEdit(index)} />
                                    <ButtonUtility
                                        aria-label="Delete"
                                        icon={Trash01}
                                        size="sm"
                                        onClick={() => onDelete(index)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 p-3">
                                <div className="min-w-0">
                                    <p className="text-md font-medium text-primary truncate">{item.title}</p>
                                    {item.brand && <p className="text-sm text-tertiary truncate">{formatBrand(item.brand)}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AriaDialogTrigger isOpen={viewerOpen} onOpenChange={setViewerOpen}>
                <Button slot="trigger" className="hidden">Open</Button>
                <AriaModalOverlay
                    isDismissable
                    className={({ isEntering, isExiting }) =>
                        `fixed inset-0 z-50 bg-overlay/50 backdrop-blur-md flex items-center justify-center p-4 ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
                    }
                >
                    {({ state }) => (
                        <AriaModal className="w-full cursor-auto">
                            <AriaDialog aria-label="Work viewer" className="mx-auto w-[min(92vw,420px)] overflow-hidden rounded-[2rem] bg-primary shadow-2xl ring-1 ring-secondary_alt focus:outline-hidden">
                                <div className="flex items-center justify-between border-b border-secondary px-5 py-4">
                                    <p className="text-md font-semibold text-primary">{viewerItem?.title || viewerItem?.brand || "Preview"}</p>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" onClick={() => state.close()}>Back</Button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="mx-auto aspect-[9/19] w-full rounded-[1.5rem] ring-1 ring-secondary_alt overflow-hidden bg-primary">
                                        {viewerItem ? (
                                            (viewerItem as any).contentType === "video" && viewerItem.thumbnail ? (
                                                <video
                                                    src={viewerItem.thumbnail}
                                                    className="size-full object-cover"
                                                    autoPlay={autoplay}
                                                    muted
                                                    playsInline
                                                    controlsList="nodownload noplaybackrate"
                                                    disablePictureInPicture
                                                    onContextMenu={(e) => e.preventDefault()}
                                                />
                                            ) : (viewerItem as any).contentType === "image" && viewerItem.thumbnail ? (
                                                <img
                                                    src={viewerItem.thumbnail}
                                                    alt={viewerItem.title || "Preview"}
                                                    className="size-full object-cover select-none"
                                                    draggable={false}
                                                    onContextMenu={(e) => e.preventDefault()}
                                                />
                                            ) : (
                                                <div className="flex size-full items-center justify-center bg-secondary">
                                                    <img src={platformIcon(viewerItem!.platform)} alt={viewerItem!.platform} className="h-12 w-12" />
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
        </>
    );
};

// replaced with shared PhonePreview component

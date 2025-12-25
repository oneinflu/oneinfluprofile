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
import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PhonePreview } from "@/components/application/preview/phone-preview";

export default function AdminPortfolioPage() {
    const [items, setItems] = useState<Array<{ id: string; title: string; brand?: string; platform: string; thumbnail?: string; visible: boolean; topWork?: boolean; sponsored?: boolean; pinned?: boolean; description?: string; contentType?: "image" | "video" | "link"; externalUrl?: string }>>([
        { id: "pf-1", title: "Instagram Reel: Launch Teaser", brand: "Acme Co.", platform: "instagram", thumbnail: "/light.svg", visible: true, topWork: true },
        { id: "pf-2", title: "YouTube Integration: Product Review", brand: "Acme Co.", platform: "youtube", thumbnail: "/logo.svg", visible: true, sponsored: true },
        { id: "pf-3", title: "TikTok Trend Collab", platform: "tiktok", thumbnail: "/avatar.svg", visible: false },
    ]);
    const [editorOpen, setEditorOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [draft, setDraft] = useState<{ contentType: "image" | "video" | "link"; fileUrl?: string; externalUrl?: string; title: string; brand?: string; description?: string; platform: string; visible: boolean; pinned?: boolean }>({
        contentType: "image",
        fileUrl: undefined,
        externalUrl: "",
        title: "",
        brand: "",
        description: "",
        platform: "instagram",
        visible: true,
        pinned: false,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openAdd = () => {
        setEditIndex(null);
        setDraft({ contentType: "image", fileUrl: undefined, externalUrl: "", title: "", brand: "", description: "", platform: "instagram", visible: true, pinned: false });
        setEditorOpen(true);
    };

    const openEdit = (index: number) => {
        const it = items[index];
        setEditIndex(index);
        setDraft({
            contentType: it.contentType || (it.externalUrl ? "link" : "image"),
            fileUrl: it.thumbnail,
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

    const saveDraft = () => {
        if (!draft.title.trim()) return;
        const nextItem = {
            id: editIndex === null ? `pf-${Date.now()}` : items[editIndex].id,
            title: draft.title.trim(),
            brand: draft.brand?.trim() || undefined,
            platform: draft.platform,
            thumbnail: draft.fileUrl || (editIndex !== null ? items[editIndex].thumbnail : undefined),
            visible: draft.visible,
            description: (draft.description || "").slice(0, 120),
            contentType: draft.contentType,
            externalUrl: draft.externalUrl?.trim() || undefined,
            pinned: draft.pinned || false,
        } as (typeof items)[number];

        if (editIndex === null) {
            setItems((prev) => [nextItem, ...prev]);
        } else {
            setItems((prev) => prev.map((o, i) => (i === editIndex ? nextItem : o)));
        }
        setEditorOpen(false);
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
                        <PortfolioGrid items={items} setItems={setItems} onEdit={openEdit} onAdd={openAdd} />
                    </div>

                    <div aria-hidden className="hidden lg:block self-stretch w-px bg-border-secondary" />

                    <div className="hidden lg:block">
                        <div className="lg:sticky top-6">
                            <Suspense fallback={null}>
                                <PhonePreview />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

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
                                            items={[{ id: "image", label: "Image" }, { id: "video", label: "Video / Reel" }, { id: "link", label: "External link" }]}
                                            selectedKey={draft.contentType}
                                            onSelectionChange={(key) => setDraft((d) => ({ ...d, contentType: String(key) as any }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Upload / Link</h3>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" color="secondary" onClick={() => fileInputRef.current?.click()}>Upload file</Button>
                                            <input ref={fileInputRef} type="file" accept={draft.contentType === "image" ? "image/*" : draft.contentType === "video" ? "video/*" : "*/*"} className="hidden" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setDraft((d) => ({ ...d, fileUrl: URL.createObjectURL(file) }));
                                            }} />
                                        </div>
                                        <Input label="Paste URL" placeholder="Instagram / YouTube / Drive" value={draft.externalUrl || ""} onChange={(v) => setDraft((d) => ({ ...d, externalUrl: v }))} />
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

const PortfolioGrid = ({ items, setItems, onEdit, onAdd }: { items: Array<{ id: string; title: string; brand?: string; platform: string; thumbnail?: string; visible: boolean; topWork?: boolean; sponsored?: boolean; pinned?: boolean }>; setItems: React.Dispatch<React.SetStateAction<Array<{ id: string; title: string; brand?: string; platform: string; thumbnail?: string; visible: boolean; topWork?: boolean; sponsored?: boolean; pinned?: boolean }>>>; onEdit: (index: number) => void; onAdd: () => void }) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const formatBrand = (b?: string) => (b ? b : "");

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
                                {item.thumbnail ? (
                                    <img src={item.thumbnail} alt={item.title} className="h-20 w-auto opacity-90" />
                                ) : (
                                    <img src={platformIcon(item.platform)} alt={item.platform} className="h-12 w-12" />
                                )}
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
                                <Toggle slim size="sm" isSelected={item.visible} onChange={(s) => setItems((prev) => prev.map((x, i) => (i === index ? { ...x, visible: s } : x)))} aria-label="Show on profile" />
                                <ButtonUtility aria-label="Edit" icon={Edit01} size="sm" onClick={() => onEdit(index)} />
                                <ButtonUtility aria-label="Delete" icon={Trash01} size="sm" onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))} />
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
    );
};

// replaced with shared PhonePreview component

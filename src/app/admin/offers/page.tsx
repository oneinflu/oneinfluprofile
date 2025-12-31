"use client";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Toggle } from "@/components/base/toggle/toggle";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Rows01, Trash01, Edit01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { PhonePreview } from "@/components/application/preview/phone-preview";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";

export default function AdminOffersPage() {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [offers, setOffers] = useState<Array<{ id: string; title: string; description: string; price: number; priceType: "fixed" | "starting" | "custom"; visible: boolean; includes?: string[]; cta?: "request" | "pay" | "request_pay_later"; delivery?: string }>>([]);
    const [editorOpen, setEditorOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
    const [previewVersion, setPreviewVersion] = useState(0);
    const [draft, setDraft] = useState<{ title: string; description: string; priceType: "fixed" | "starting" | "custom"; price?: number; delivery?: string; includes: string[]; cta: "request" | "pay" | "request_pay_later"; visible: boolean }>({
        title: "",
        description: "",
        priceType: "fixed",
        price: undefined,
        delivery: "",
        includes: [],
        cta: "request",
        visible: true,
    });

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.id || !token) return;
                const res = await api.get<{
                    success: boolean;
                    status: string;
                    data: {
                        offers: Array<{ _id: string; title: string; description: string; priceType: "fixed" | "starting" | "custom"; price?: number | null; includes?: string[]; cta?: "request" | "pay" | "request_pay_later" | null; delivery?: string | null; visible: boolean }>;
                    };
                }>(`/users/id/${user.id}/offers`, { token });
                if (!alive) return;
                setOffers(
                    (res.data?.offers || []).map((o) => ({
                        id: String((o as any)._id || (o as any).id),
                        title: o.title,
                        description: o.description,
                        price: typeof o.price === "number" ? o.price : 0,
                        priceType: o.priceType,
                        visible: o.visible,
                        includes: o.includes || [],
                        cta: o.cta || undefined,
                        delivery: o.delivery || undefined,
                    })),
                );
            } catch {}
            finally {
                setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [user?.id, token]);

    const openAdd = () => {
        setEditIndex(null);
        setDraft({ title: "", description: "", priceType: "fixed", price: undefined, delivery: "", includes: [], cta: "request", visible: true });
        setEditorOpen(true);
    };

    const openEdit = (index: number) => {
        const o = offers[index];
        setEditIndex(index);
        setDraft({
            title: o.title,
            description: o.description,
            priceType: o.priceType,
            price: o.priceType !== "custom" ? o.price : undefined,
            delivery: o.delivery || "",
            includes: o.includes || [],
            cta: o.cta || "request",
            visible: o.visible,
        });
        setEditorOpen(true);
    };

    const saveDraft = async () => {
        if (!draft.title.trim()) return;
        const action = editIndex === null ? "create" : "update";
        const payload = {
            title: draft.title.trim(),
            description: draft.description.slice(0, 120),
            priceType: draft.priceType,
            price: draft.priceType === "custom" ? null : Math.max(0, Number(draft.price || 0)),
            includes: draft.includes,
            cta: draft.cta,
            delivery: draft.delivery || "",
            visible: draft.visible,
            currency: "INR",
        };
        try {
            if (!user?.id || !token) throw new Error("unauthorized");
            if (editIndex === null) {
                const res = await api.post<{ success: boolean; status: string; data: { offer: { _id: string; title: string; description: string; priceType: "fixed" | "starting" | "custom"; price?: number | null; includes?: string[]; cta?: "request" | "pay" | "request_pay_later" | null; delivery?: string | null; visible: boolean } } }>(
                    `/users/id/${user.id}/offers`,
                    payload,
                    { token },
                );
                const o = res.data.offer;
                const nextItem = {
                    id: String((o as any)._id || (o as any).id),
                    title: o.title,
                    description: o.description,
                    price: typeof o.price === "number" ? o.price : 0,
                    priceType: o.priceType,
                    visible: o.visible,
                    includes: o.includes || [],
                    cta: o.cta || undefined,
                    delivery: o.delivery || undefined,
                };
                setOffers((prev) => [nextItem, ...prev]);
                setPreviewVersion((v) => v + 1);
            } else {
                const id = offers[editIndex].id;
                const res = await api.patch<{ success: boolean; status: string; data: { offer: { _id: string; title: string; description: string; priceType: "fixed" | "starting" | "custom"; price?: number | null; includes?: string[]; cta?: "request" | "pay" | "request_pay_later" | null; delivery?: string | null; visible: boolean } } }>(
                    `/users/id/${user.id}/offers/${id}`,
                    payload,
                    { token },
                );
                const o = res.data.offer;
                const nextItem = {
                    id: String((o as any)._id || (o as any).id),
                    title: o.title,
                    description: o.description,
                    price: typeof o.price === "number" ? o.price : 0,
                    priceType: o.priceType,
                    visible: o.visible,
                    includes: o.includes || [],
                    cta: o.cta || undefined,
                    delivery: o.delivery || undefined,
                };
                setOffers((prev) => prev.map((ov, i) => (i === editIndex ? nextItem : ov)));
                setPreviewVersion((v) => v + 1);
            }
        } catch {} finally {
            setEditorOpen(false);
        }
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className=" top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">My Offerings</h1>
                            <p className="text-md text-tertiary">Services visible on your public profile</p>
                        </div>
                        <div className="mt-3 md:mt-0">
                            <Button className="w-full md:w-auto" size="sm" onClick={openAdd}>+ Add Offer</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl grid gap-8 lg:grid-cols-[1fr_1px_360px]">
                    <div className="flex flex-col gap-6">
                        {loading ? (
                            <div className="grid grid-cols-1 gap-3">
                                {[...Array(4)].map((_, idx) => (
                                    <div key={idx} className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                        <div className="h-5 w-40 bg-primary_hover animate-pulse rounded" />
                                        <div className="mt-2 h-3 w-64 bg-primary_hover animate-pulse rounded" />
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <div className="h-3 bg-primary_hover animate-pulse rounded" />
                                            <div className="h-3 bg-primary_hover animate-pulse rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <OffersList
                                offers={offers}
                                setOffers={setOffers}
                                onEdit={openEdit}
                                onAdd={openAdd}
                                onDelete={(index) => {
                                    setConfirmIndex(index);
                                    setConfirmOpen(true);
                                }}
                                onReorder={async (next) => {
                                    setOffers(next);
                                    try {
                                        if (!user?.id || !token) return;
                                        await Promise.all(
                                            next.map((o, i) =>
                                                api.patch(`/users/id/${user.id}/offers/${o.id}`, { order: i + 1 }, { token }),
                                            ),
                                        );
                                        setPreviewVersion((v) => v + 1);
                                    } catch {}
                                }}
                                onToggle={async (index, isSelected) => {
                                    setOffers((prev) => prev.map((o, i) => (i === index ? { ...o, visible: isSelected } : o)));
                                    try {
                                        if (!user?.id || !token) return;
                                        const id = offers[index].id;
                                        await api.patch(`/users/id/${user.id}/offers/${id}`, { visible: isSelected }, { token });
                                        setPreviewVersion((v) => v + 1);
                                    } catch {}
                                }}
                            />
                        )}
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
                                    <h2 className="text-lg font-semibold text-primary">Delete offer?</h2>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={async () => {
                                                if (confirmIndex === null) return;
                                                try {
                                                    if (!user?.id || !token) throw new Error("unauthorized");
                                                    const id = offers[confirmIndex].id;
                                                    await api.delete(`/users/id/${user.id}/offers/${id}`, { token });
                                                    setOffers((prev) => prev.filter((_, i) => i !== confirmIndex));
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
                                    <h2 className="text-lg font-semibold text-primary">{editIndex === null ? "Add Offer" : "Edit Offer"}</h2>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" color="secondary" onClick={saveDraft}>Save</Button>
                                        <Button size="sm" onClick={() => state.close()}>Cancel</Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 px-4 py-4">
                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Basic Info</h3>
                                        <Input label="Offer title" placeholder="e.g. Instagram Reel Promotion" value={draft.title} onChange={(v) => setDraft((d) => ({ ...d, title: v }))} />
                                        <TextArea label="Short description" rows={3} value={draft.description} onChange={(v) => setDraft((d) => ({ ...d, description: v.slice(0, 120) }))} hint={`${Math.min(120, draft.description.length)}/120`} />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Pricing</h3>
                                        <Select
                                            size="md"
                                            label="Price type"
                                            items={[
                                                { id: "fixed", label: "Fixed price" },
                                                { id: "starting", label: "Starting from" },
                                                { id: "custom", label: "Custom quote" },
                                            ]}
                                            selectedKey={draft.priceType}
                                            onSelectionChange={(key) => setDraft((d) => ({ ...d, priceType: String(key) as any }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        {draft.priceType !== "custom" && (
                                            <Input label="Amount (₹)" type="number" inputMode="numeric" placeholder="0" value={String(draft.price ?? "")} onChange={(v) => setDraft((d) => ({ ...d, price: Number(v || 0) }))} />
                                        )}
                                        <Input label="Delivery time (optional)" placeholder="e.g. 5 days" value={draft.delivery || ""} onChange={(v) => setDraft((d) => ({ ...d, delivery: v }))} />
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">What’s Included</h3>
                                        <ul className="flex flex-col gap-2">
                                            {(draft.includes || []).map((inc, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <Input className="flex-1" placeholder="e.g. 1 Instagram Reel" value={inc} onChange={(v) => setDraft((d) => ({ ...d, includes: d.includes.map((x, idx) => (idx === i ? v : x)) }))} />
                                                    <ButtonUtility aria-label="Remove" icon={Trash01} size="sm" onClick={() => setDraft((d) => ({ ...d, includes: d.includes.filter((_, idx) => idx !== i) }))} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div>
                                            <Button size="sm" color="secondary" onClick={() => setDraft((d) => ({ ...d, includes: [...(d.includes || []), ""] }))}>Add row</Button>
                                        </div>
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">CTA Behavior</h3>
                                        <Select
                                            size="md"
                                            label="What happens when brand clicks"
                                            items={[
                                                { id: "request", label: "Request service" },
                                                { id: "pay", label: "Pay now" },
                                                { id: "request_pay_later", label: "Request + Pay later" },
                                            ]}
                                            selectedKey={draft.cta}
                                            onSelectionChange={(key) => setDraft((d) => ({ ...d, cta: String(key) as any }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>

                                    <div className="flex min-w-0 flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Visibility</h3>
                                        <Toggle slim size="md" isSelected={draft.visible} onChange={(s) => setDraft((d) => ({ ...d, visible: s }))} aria-label="Show on profile" />
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

const OffersList = ({
    offers,
    setOffers,
    onEdit,
    onAdd,
    onDelete,
    onReorder,
    onToggle,
}: {
    offers: Array<{ id: string; title: string; description: string; price: number; priceType: "fixed" | "starting" | "custom"; visible: boolean }>;
    setOffers: React.Dispatch<
        React.SetStateAction<
            Array<{ id: string; title: string; description: string; price: number; priceType: "fixed" | "starting" | "custom"; visible: boolean }>
        >
    >;
    onEdit: (index: number) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    onReorder: (next: Array<{ id: string; title: string; description: string; price: number; priceType: "fixed" | "starting" | "custom"; visible: boolean }>) => void | Promise<void>;
    onToggle: (index: number, isSelected: boolean) => void | Promise<void>;
}) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
    const formatINR = useMemo(() => new Intl.NumberFormat("en-IN"), []);

    if (offers.length === 0) {
        return (
            <div className="rounded-2xl bg-primary p-6 shadow-xs ring-1 ring-secondary_alt">
                <div className="mx-auto max-w-md text-center">
                    <h3 className="text-md font-semibold text-primary">Add your first service</h3>
                    <p className="mt-1 text-sm text-tertiary">Brands contact creators faster when pricing is clear.</p>
                    <div className="mt-4">
                        <Button size="sm" color="secondary" onClick={onAdd}>+ Add Offer</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
            <div className="flex min-w-0 flex-col">
                <ul className="flex flex-col gap-2">
                    {offers.map((offer, index) => (
                        <li
                            key={offer.id}
                            draggable={!isTouch}
                            onDragStart={() => setDragIndex(index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={async () => {
                                if (dragIndex === null || dragIndex === index) return;
                                const next = [...offers];
                                const [moved] = next.splice(dragIndex, 1);
                                next.splice(index, 0, moved);
                                await onReorder(next);
                                setDragIndex(null);
                            }}
                            className="rounded-xl bg-primary p-3 ring-1 ring-secondary active:scale-[0.99]"
                        >
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                    <ButtonUtility aria-label="Drag to reorder" icon={Rows01} size="sm" />
                                    <div className="flex min-w-0 flex-col">
                                        <p className="text-md font-semibold text-primary">{offer.title}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-tertiary truncate">{offer.description}</p>
                                            {offer.priceType !== "custom" && <span className="text-sm font-medium text-primary">₹{formatINR.format(offer.price)}</span>}
                                            <span className="text-xs text-secondary">{offer.priceType === "fixed" ? "fixed" : offer.priceType === "starting" ? "starting" : "custom"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-2">
                                    <Toggle slim size="md" isSelected={offer.visible} onChange={(isSelected) => onToggle(index, isSelected)} aria-label={`Show ${offer.title} on profile`} />
                                    <ButtonUtility aria-label="Edit" icon={Edit01} size="sm" onClick={() => onEdit(index)} />
                                    <ButtonUtility aria-label="Delete" icon={Trash01} size="sm" onClick={() => onDelete(index)} />
                                </div>
                            </div>
                            <div className="mt-2 flex md:hidden items-center gap-2 justify-end">
                                <Toggle slim size="md" isSelected={offer.visible} onChange={(isSelected) => onToggle(index, isSelected)} aria-label={`Show ${offer.title} on profile`} />
                                <ButtonUtility aria-label="Edit" icon={Edit01} size="sm" onClick={() => onEdit(index)} />
                                <ButtonUtility aria-label="Delete" icon={Trash01} size="sm" onClick={() => onDelete(index)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

"use client";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { InputGroup } from "@/components/base/input/input-group";
import { InputBase } from "@/components/base/input/input";
import { HelpCircle, Copy01, Share04, Check, NotificationMessage, CurrencyDollarCircle, Eye, MessageCircle01, ArrowUpRight, DotsVertical } from "@untitledui/icons";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Table, TableCard } from "@/components/application/table/table";
import { Suspense, useMemo, useEffect, useState } from "react";
import { useClipboard } from "@/hooks/use-clipboard";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { PhonePreview } from "@/components/application/preview/phone-preview";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

export default function AdminHomePage() {
    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className=" top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className=" w-full max-w-8xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Home</h1>
                            <p className="text-md text-tertiary">Your creator workspace</p>
                        </div>
                       
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-12">
                <div className=" w-full max-w-8xl grid gap-8 lg:grid-cols-[1fr_1px_360px]">
                    <div>
                        <Suspense fallback={null}>
                            <ProfileLinkCTA />
                        </Suspense>
                        <div className="mt-6">
                            <ActiveEnquiriesPreview />
                        </div>
                        <div className="mt-6">
                            <RecentActivity />
                        </div>
                       
                    </div>

                    <div aria-hidden className="hidden lg:block self-stretch w-px bg-border-secondary" />

                    <div className="hidden lg:block">
                        <div className="lg:sticky top-6">
                            <Suspense fallback={null}>
                                <AdminPreviewPhone />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const AdminPreviewPhone = () => {
    const { user } = useAuth();
    return <PhonePreview username={user?.username || undefined} />;
};

const ProfileLinkCTA = () => {
    const clipboard = useClipboard();
    const { user } = useAuth();
    const username = user?.username || "";

    const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";
    const profileUrl = useMemo(() => `${origin}/${username}`, [origin, username]);

    const shareText = "Check out my live profile";

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: shareText, text: shareText, url: profileUrl });
            } catch {}
        }
    };

    return (
        <div className="flex flex-col gap-3 rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt ring-inset dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#0b0f14] dark:to-[#111827] dark:shadow-lg">
            <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-lg font-semibold text-primary">Here is your live profile link</h2>
                <p className="text-sm text-tertiary">Share this public URL to let brands and followers view your profile.</p>
            </div>
            <InputGroup
                size="md"
                className="w-full"
                trailingAddon={
                    <div className="flex items-center gap-1 pr-1">
                        <Button
                            color="secondary"
                            size="md"
                            iconLeading={clipboard.copied === "profile-url" ? Check : Copy01}
                            aria-label={clipboard.copied === "profile-url" ? "Copied" : "Copy link"}
                            onClick={() => clipboard.copy(profileUrl, "profile-url")}
                            className="h-full"
                        />

                        <AriaDialogTrigger>
                            <Button
                                slot="trigger"
                                color="secondary"
                                size="md"
                                iconLeading={Share04}
                                aria-label="Share link"
                                onClick={() => handleWebShare()}
                                className="h-full"
                            />
                            <AriaPopover
                                offset={8}
                                crossOffset={0}
                                containerPadding={0}
                                placement="bottom left"
                                className={({ isEntering, isExiting }) =>
                                    `will-change-transform ${isEntering ? "duration-150 ease-out animate-in fade-in slide-in-from-top-1" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out slide-out-to-top-1" : ""}`
                                }
                            >
                                <AriaDialog className="outline-hidden">
                                    <div className="w-72 rounded-xl bg-primary p-3 shadow-xs ring-1 ring-secondary_alt">
                                        <p className="px-1 pb-2 text-sm font-semibold text-primary">Share to</p>
                                        <ul className="grid grid-cols-4 gap-2">
                                    <li>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + profileUrl)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/whatsapp.png" alt="WhatsApp" className="size-7" />
                                            <span className="text-xs text-secondary">WhatsApp</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/telegram.png" alt="Telegram" className="size-7" />
                                            <span className="text-xs text-secondary">Telegram</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/twitter.png" alt="Twitter" className="size-7" />
                                            <span className="text-xs text-secondary">Twitter</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/facebook.png" alt="Facebook" className="size-7" />
                                            <span className="text-xs text-secondary">Facebook</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(profileUrl)}`}
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/web.png" alt="Email" className="size-7" />
                                            <span className="text-xs text-secondary">Email</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(profileUrl)}&title=${encodeURIComponent(shareText)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/linkedin.png" alt="LinkedIn" className="size-7" />
                                            <span className="text-xs text-secondary">LinkedIn</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://www.instagram.com/`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/instagram.png" alt="Instagram" className="size-7" />
                                            <span className="text-xs text-secondary">Instagram</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://web.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + profileUrl)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-primary_hover"
                                        >
                                            <img src="/whatsapp.png" alt="WhatsApp Web" className="size-7" />
                                            <span className="text-xs text-secondary">WhatsApp Web</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </AriaDialog>
                    </AriaPopover>
                </AriaDialogTrigger>
            </div>
            }>
                <InputBase isDisabled isReadOnly value={profileUrl} />
            </InputGroup>
        </div>
    );
};

const MetricCard = ({ title, value, change, trendColor = "success" }: { title: string; value: string; change: string; trendColor?: "success" | "gray" }) => {
    return (
        <div className="flex flex-col rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
            <div className="flex items-start justify-between">
                <div className="flex min-w-0 flex-col">
                    <p className="text-sm text-tertiary">{title}</p>
                    <p className="text-display-lg font-semibold text-primary">{value}</p>
                </div>

                <div className="flex items-center gap-2">
                    <BadgeWithIcon type="modern" size="sm" color={trendColor} iconLeading={ArrowUpRight}>{change}</BadgeWithIcon>
                    <ButtonUtility icon={DotsVertical} color="tertiary" size="sm" aria-label="Options" />
                </div>
            </div>
        </div>
    );
};



const RecentActivity = () => {
    const { user, token } = useAuth();
    const [items, setItems] = useState<{ id: string; title: string; icon: any; color: "brand" | "success" | "gray"; count?: number }[]>([]);
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token) return;
                const [enqRes, payRes] = await Promise.all([
                    api.get<{ success: boolean; status: string; data: { requests: Array<any> } }>(`/users/${user.username}/enquiries`, { token }),
                    api.get<{ success: boolean; status: string; data: { payments: Array<any> } }>(`/users/${user.username}/payments`, { token }),
                ]);
                if (!alive) return;
                const enqs = (enqRes.data?.requests || []) as Array<any>;
                const pays = (payRes.data?.payments || []) as Array<any>;
                const newEnquiries = enqs.filter((r) => (r.status || "new") === "new").length;
                const paymentsReceived = pays.filter((p) => p.status === "paid").length;
                const paymentsPending = pays.filter((p) => p.status !== "paid").length;
                const next = [
                    { id: "enquiries_new", title: "New enquiries", icon: MessageCircle01, color: "brand" as const, count: newEnquiries },
                    { id: "payments_received", title: "Payments received", icon: CurrencyDollarCircle, color: "success" as const, count: paymentsReceived },
                    { id: "payments_pending", title: "Payments pending", icon: CurrencyDollarCircle, color: "gray" as const, count: paymentsPending },
                ];
                setItems(next);
            } catch {
                if (!alive) return;
                setItems([]);
            }
        })();
        return () => {
            alive = false;
        };
    }, [user?.username, token]);

    return (
        <div className="flex flex-col rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
            <div className="flex items-center justify-between gap-2 border-b border-secondary pb-3 md:pb-4">
                <h2 className="text-lg font-semibold text-primary">Recent Activity</h2>
            </div>

            {items.length === 0 ? (
                <EmptyState size="md" className="py-6">
                    <EmptyState.FeaturedIcon color="gray" />
                    <EmptyState.Content>
                        <EmptyState.Description>No activity yet — share your INFLU link to start</EmptyState.Description>
                    </EmptyState.Content>
                </EmptyState>
            ) : (
                <ul className="mt-3 md:mt-4 flex flex-col gap-2">
                    {items.map((item) => (
                        <li key={item.id} className="rounded-xl bg-primary p-3 ring-1 ring-secondary">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <FeaturedIcon size="md" color={item.color} theme="modern" icon={item.icon} />
                                    <p className="text-md font-medium text-primary">{item.title}</p>
                                </div>
                                {"count" in item && <span className="text-sm font-medium text-secondary">{item.count}</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const ActiveEnquiriesPreview = () => {
    const { user, token } = useAuth();
    const [enquiries, setEnquiries] = useState<Array<{ brand: string; service: string; status: "new" | "replied" | "accepted" | "closed"; date: string }>>([]);
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token) return;
                const res = await api.get<{ success: boolean; status: string; data: { requests: Array<any> } }>(`/users/${user.username}/enquiries`, { token });
                if (!alive) return;
                const mapped = (res.data?.requests || []).map((r: any) => ({
                    brand: r.name || r.email || r.whatsapp || "—",
                    service: r.offer?.title || "—",
                    status: r.status || "new",
                    date: new Date(r.createdAt).toLocaleDateString(),
                }));
                setEnquiries(mapped);
            } catch {}
        })();
        return () => { alive = false; };
    }, [user?.username, token]);

    const statusBadge = (s: "new" | "replied" | "accepted" | "closed") => {
        const map = {
            new: { color: "brand" as const, label: "New" },
            replied: { color: "blue" as const, label: "Replied" },
            accepted: { color: "success" as const, label: "Accepted" },
            closed: { color: "gray" as const, label: "Closed" },
        };
        const cfg = map[s];
        return (
            <Badge type="color" size="sm" color={cfg.color}>
                {cfg.label}
            </Badge>
        );
    };

    const cols = [
        { id: "brand", name: "Brand name" },
        { id: "service", name: "Requested service" },
        { id: "status", name: "Status" },
    ];

    const rows = enquiries.filter((e) => e.status === "new").slice(0, 3);

    return (
        <TableCard.Root>
            <TableCard.Header title="New Enquiries" contentTrailing={<Button color="link-color" size="sm" href="/admin/enquiries">View all enquiries →</Button>} />

            <Table size="sm">
                <Table.Header columns={cols}>
                    {cols.map((c) => (
                        <Table.Head key={c.id}>
                            <span className="text-xs font-semibold text-quaternary">{c.name}</span>
                        </Table.Head>
                    ))}
                </Table.Header>

                <Table.Body>
                    {rows.length === 0 ? (
                        <Table.Row columns={cols}>
                            <Table.Cell colSpan={3} className="text-center text-sm text-tertiary py-6">No new enquiries</Table.Cell>
                        </Table.Row>
                    ) : (
                        rows.map((r, idx) => (
                            <Table.Row key={idx} columns={cols}>
                                <Table.Cell className="text-primary">{r.brand}</Table.Cell>
                                <Table.Cell className="text-secondary">{r.service}</Table.Cell>
                                <Table.Cell>{statusBadge(r.status)}</Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};

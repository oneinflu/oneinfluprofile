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
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import Link from "next/link";
import { ProjectCard } from "./builder/projects/ProjectCard";

export default function AdminHomePage() {
    const { getMe } = useAuth();
    const [category, setCategory] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const me = await getMe();
                if (!alive) return;
                setCategory(me.category || null);
            } catch {}
        })();
        return () => {
            alive = false;
        };
    }, [getMe]);

    if (category === "Builder") {
        return <BuilderHomeDashboard />;
    }

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
                <div className=" w-full max-w-8xl grid gap-8">
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
                </div>
            </div>
        </section>
    );
}

const BuilderHomeDashboard = () => {
    const cards = [
        {
            id: "active-projects",
            title: "Active Projects",
            value: "3",
            line1: "Ongoing projects",
            line2: "2 selling • 1 completed",
            helper: "How many sites are live",
        },
        {
            id: "total-units",
            title: "Total Units",
            value: "240",
            line1: "Units across projects",
            line2: "Sold 68% • Available 32%",
            helper: "Inventory pressure",
        },
        {
            id: "revenue-locked",
            title: "Total Revenue Locked",
            value: "₹ 82.4 Cr",
            line1: "Booked unit value",
            line2: "Collected 62% • Pending 38%",
            helper: "How much money is secured",
        },
        {
            id: "payments-pending",
            title: "Payments Pending Across Portfolio",
            value: "₹ 6.2 Cr",
            line1: "Payments pending from buyers",
            line2: "28 customers with due amounts",
            helper: "Cash flow danger",
        },
    ];

    const projects = [
        {
            id: "signature-altius",
            name: "Signature Altius",
            location: "Kollapur, Hyderabad",
            status: "selling" as const,
            unitsSold: 180,
            totalUnits: 240,
            revenueLocked: "₹ 28.4 Cr",
            constructionPercent: 52,
            unitsSoldPercent: 72,
            flags: ["payments_pending"] as const,
        },
        {
            id: "signature-fortius",
            name: "Signature Fortius",
            location: "Isnapur, Hyderabad",
            status: "construction" as const,
            unitsSold: 130,
            totalUnits: 240,
            revenueLocked: "₹ 19.1 Cr",
            constructionPercent: 38,
            unitsSoldPercent: 54,
            flags: [] as const,
        },
        {
            id: "signature-horizon",
            name: "Signature Horizon",
            location: "Manikonda, Hyderabad",
            status: "construction" as const,
            unitsSold: 75,
            totalUnits: 240,
            revenueLocked: "₹ 10.9 Cr",
            constructionPercent: 18,
            unitsSoldPercent: 31,
            flags: ["slow_sales", "stock_issue"] as const,
        },
    ];

    const bookingsThisWeek = [
        { id: "signature-altius", name: "Signature Altius", bookings: 8 },
        { id: "signature-fortius", name: "Signature Fortius", bookings: 5 },
        { id: "signature-horizon", name: "Signature Horizon", bookings: 2 },
    ];

    const bestProject = bookingsThisWeek[0];
    const slowestProject = bookingsThisWeek[bookingsThisWeek.length - 1];

    const inquiriesTrend = [
        { label: "Mon", value: 6 },
        { label: "Tue", value: 9 },
        { label: "Wed", value: 4 },
        { label: "Thu", value: 7 },
        { label: "Fri", value: 11 },
        { label: "Sat", value: 5 },
        { label: "Sun", value: 3 },
    ];

    const totalOverdueAmount = "₹ 6.2 Cr";

    const overdueProjects = [
        { id: "signature-altius", name: "Signature Altius", pendingAmount: "₹ 2.4 Cr", overdueDays: 45 },
        { id: "signature-fortius", name: "Signature Fortius", pendingAmount: "₹ 2.1 Cr", overdueDays: 32 },
        { id: "signature-horizon", name: "Signature Horizon", pendingAmount: "₹ 1.7 Cr", overdueDays: 21 },
    ];

    const bankDelays = [
        { bank: "HDFC Bank", cases: 7, avgDelayDays: 9 },
        { bank: "ICICI Bank", cases: 5, avgDelayDays: 11 },
        { bank: "SBI", cases: 3, avgDelayDays: 6 },
    ];

    const upcomingDues = [
        { label: "Next 7 days", amount: "₹ 3.8 Cr", count: 19 },
        { label: "8–30 days", amount: "₹ 5.4 Cr", count: 41 },
        { label: "Beyond 30 days", amount: "₹ 2.7 Cr", count: 23 },
    ];

    const constructionProgress = [
        { id: "signature-atlius", name: "Signature Atlius", progress: 52 },
        { id: "green-valley", name: "Green Valley", progress: 34 },
        { id: "sky-heights", name: "Sky Heights", progress: 81 },
    ];

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Home</h1>
                            <p className="text-md text-tertiary">How big is my exposure right now?</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button size="sm">
                                Create new project
                            </Button>
                            <Button size="sm" color="secondary">
                                Add booking
                            </Button>
                            <Button size="sm" color="secondary">
                                Upload site update
                            </Button>
                            <Button size="sm" color="secondary">
                                Generate project QR
                            </Button>
                            <Button size="sm" color="secondary">
                                Invite sales team
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl grid gap-8">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="flex flex-col justify-between rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                        {card.title}
                                    </p>
                                    <p className="mt-2 text-3xl font-semibold text-primary">
                                        {card.value}
                                    </p>
                                    <p className="mt-1 text-sm text-secondary">
                                        {card.line1}
                                    </p>
                                    <p className="mt-1 text-xs text-tertiary">
                                        {card.line2}
                                    </p>
                                </div>
                                <p className="mt-4 text-xs font-medium text-brand-secondary">
                                    {card.helper}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-primary">Project performance</h2>
                                <p className="text-sm text-tertiary">Scan all projects in one glance.</p>
                            </div>
                            <Button size="sm" color="secondary" href="/admin/builder/projects">
                                View all projects
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    name={project.name}
                                    location={project.location}
                                    status={project.status}
                                    unitsSold={project.unitsSold}
                                    totalUnits={project.totalUnits}
                                    revenueLocked={project.revenueLocked}
                                    constructionPercent={project.constructionPercent}
                                    unitsSoldPercent={project.unitsSoldPercent}
                                    flags={project.flags}
                                    dashboardHref={`/admin/builder/projects/${project.id}`}
                                    unitsHref={`/admin/builder/projects/${project.id}/units`}
                                    shareQrHref={`/admin/builder/projects/${project.id}/qr`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-primary">Bookings this week</h2>
                                    <p className="text-xs text-tertiary">Per project view</p>
                                </div>
                                <span className="text-[11px] font-medium text-quaternary uppercase tracking-wide">
                                    Sales momentum
                                </span>
                            </div>
                            <div className="mt-4 space-y-3">
                                {bookingsThisWeek.map((p) => {
                                    const max = bookingsThisWeek[0].bookings || 1;
                                    const width = (p.bookings / max) * 100;
                                    return (
                                        <div key={p.id} className="space-y-1">
                                            <div className="flex items-center justify-between text-xs text-tertiary">
                                                <span className="truncate">{p.name}</span>
                                                <span className="font-medium text-secondary">
                                                    {p.bookings} bookings
                                                </span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-secondary_alt/40 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-brand-primary"
                                                    style={{ width: `${width}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt space-y-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-primary">Best vs slowest</h2>
                                    <p className="text-xs text-tertiary">Bookings this week</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-success-solid">
                                            Best performing
                                        </p>
                                        <p className="text-sm font-semibold text-primary">
                                            {bestProject.name}
                                        </p>
                                    </div>
                                    <div className="text-right text-xs">
                                        <p className="text-tertiary">Bookings</p>
                                        <p className="text-sm font-semibold text-success-solid">
                                            {bestProject.bookings}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-error-solid">
                                            Slowest selling
                                        </p>
                                        <p className="text-sm font-semibold text-primary">
                                            {slowestProject.name}
                                        </p>
                                    </div>
                                    <div className="text-right text-xs">
                                        <p className="text-tertiary">Bookings</p>
                                        <p className="text-sm font-semibold text-error-solid">
                                            {slowestProject.bookings}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-primary">New enquiries</h2>
                                    <p className="text-xs text-tertiary">Last 7 days</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-end gap-2">
                                {inquiriesTrend.map((d) => {
                                    const max = Math.max(...inquiriesTrend.map((x) => x.value)) || 1;
                                    const height = (d.value / max) * 100;
                                    return (
                                        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                                            <div
                                                className="w-full rounded-full bg-brand-primary/80"
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-[10px] text-tertiary">
                                                {d.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-[1.3fr_minmax(0,1fr)]">
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-sm font-semibold text-primary">Cash flow risk</h2>
                                    <p className="text-xs text-tertiary">Where money is stuck</p>
                                </div>
                                <span className="inline-flex items-center rounded-full border border-error-secondary/40 bg-error-secondary/10 px-2.5 py-0.5 text-[11px] font-medium text-error-solid">
                                    High attention
                                </span>
                            </div>
                            <div className="rounded-xl bg-error-secondary/5 px-3 py-3 ring-1 ring-error-secondary/20 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-tertiary">Total overdue amount</p>
                                    <p className="mt-1 text-xl font-semibold text-error-solid">
                                        {totalOverdueAmount}
                                    </p>
                                </div>
                                <p className="text-[11px] text-error-solid">
                                    Across all projects
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                    Projects with highest pending payments
                                </p>
                                <div className="space-y-2.5">
                                    {overdueProjects.map((p) => (
                                        <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl bg-primary_hover px-3 py-2">
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-primary truncate">
                                                    {p.name}
                                                </p>
                                                <p className="text-xs text-tertiary">
                                                    {p.overdueDays} days overdue
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold text-error-solid whitespace-nowrap">
                                                {p.pendingAmount}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt flex flex-col gap-4">
                            <div>
                                <h2 className="text-sm font-semibold text-primary">Bank delays & upcoming dues</h2>
                                <p className="text-xs text-tertiary">Next 30–45 days view</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                    Bank disbursement delays
                                </p>
                                <div className="space-y-1.5">
                                    {bankDelays.map((b) => (
                                        <div key={b.bank} className="flex items-center justify-between text-xs">
                                            <span className="text-secondary">{b.bank}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-tertiary">
                                                    {b.cases} cases
                                                </span>
                                                <span className="rounded-full bg-error-secondary/10 px-2 py-0.5 text-[11px] font-medium text-error-solid">
                                                    {b.avgDelayDays} days avg delay
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                    Upcoming dues
                                </p>
                                <div className="space-y-1.5">
                                    {upcomingDues.map((d) => (
                                        <div key={d.label} className="flex items-center justify-between text-xs">
                                            <div className="space-y-0.5">
                                                <p className="text-secondary">{d.label}</p>
                                                <p className="text-sm font-semibold text-primary">
                                                    {d.amount}
                                                </p>
                                            </div>
                                            <p className="text-tertiary whitespace-nowrap">
                                                {d.count} buyers
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold text-primary">Construction progress map</h2>
                                <p className="text-xs text-tertiary">Which site needs supervision</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-3">
                            {constructionProgress.map((p) => (
                                <div key={p.id} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <p className="text-secondary">
                                            {p.name}
                                        </p>
                                        <p className="text-xs font-semibold text-primary">
                                            {p.progress}%
                                        </p>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-secondary_alt/40 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-brand-primary"
                                            style={{ width: `${p.progress}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
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
    const [items, setItems] = useState<{ id: string; title: string; icon: any; color: "brand" | "success" | "gray"; count?: number; href: string }[]>([]);
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
                    { id: "enquiries_new", title: "New enquiries", icon: MessageCircle01, color: "brand" as const, count: newEnquiries, href: "/admin/enquiries" },
                    { id: "payments_received", title: "Payments received", icon: CurrencyDollarCircle, color: "success" as const, count: paymentsReceived, href: "/admin/payments" },
                    { id: "payments_pending", title: "Payments pending", icon: CurrencyDollarCircle, color: "gray" as const, count: paymentsPending, href: "/admin/payments" },
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
                        <li key={item.id} className="rounded-xl bg-primary ring-1 ring-secondary overflow-hidden">
                            <Link href={item.href} className="flex items-center justify-between gap-3 p-3 hover:bg-primary_hover transition-colors">
                                <div className="flex items-center gap-3">
                                    <FeaturedIcon size="md" color={item.color} theme="modern" icon={item.icon} />
                                    <p className="text-md font-medium text-primary">{item.title}</p>
                                </div>
                                {"count" in item && <span className="text-sm font-medium text-secondary">{item.count}</span>}
                            </Link>
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

"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Settings01, CurrencyDollarCircle, AlertCircle, Users01 } from "@untitledui/icons";

type ProjectStatus = "selling" | "construction" | "handover";

export type AttentionFlag = "payments_pending" | "stock_issue" | "slow_sales" | "bank_pending";

type Props = {
    name: string;
    location: string;
    status: ProjectStatus;
    unitsSold: number;
    totalUnits: number;
    revenueLocked: string;
    constructionPercent: number;
    unitsSoldPercent: number;
    flags?: AttentionFlag[] | readonly AttentionFlag[];
    dashboardHref?: string;
    unitsHref?: string;
    shareQrHref?: string;
    settingsHref?: string;
    pendingPayments?: number;
    repairsOpen?: number;
    buyerChangesPending?: number;
};

const statusLabel: Record<ProjectStatus, string> = {
    selling: "Selling",
    construction: "Construction",
    handover: "Near Handover",
};

const statusColor: Record<ProjectStatus, "brand" | "warning" | "success"> = {
    selling: "brand",
    construction: "warning",
    handover: "success",
};

const flagConfig: Record<
    AttentionFlag,
    { label: string; color: "error" | "warning" | "brand" }
> = {
    payments_pending: { label: "Payments pending", color: "error" },
    stock_issue: { label: "Stock issue", color: "warning" },
    slow_sales: { label: "Slow sales", color: "warning" },
    bank_pending: { label: "Bank approval pending", color: "brand" },
};

export const ProjectCard = ({
    name,
    location,
    status,
    unitsSold,
    totalUnits,
    revenueLocked,
    constructionPercent,
    unitsSoldPercent,
    flags,
    dashboardHref,
    unitsHref,
    shareQrHref,
    settingsHref,
    pendingPayments = 0,
    repairsOpen = 0,
    buyerChangesPending = 0,
}: Props) => {
    const router = useRouter();
    const safeUnitsSold = Math.max(0, Math.min(unitsSold, totalUnits));
    const soldLabel = `${safeUnitsSold} / ${totalUnits}`;
    const constructionLabel = `${constructionPercent}%`;
    const primaryPercent = Math.max(0, Math.min(unitsSoldPercent, 100));

    return (
        <div
            className="flex flex-col gap-4 rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt cursor-pointer"
            onClick={() => {
                if (dashboardHref) router.push(dashboardHref);
            }}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-primary truncate">
                        {name}
                    </p>
                    <p className="text-xs text-tertiary truncate">
                        {location}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    {settingsHref && (
                        <ButtonUtility
                            size="sm"
                            color="secondary"
                            icon={Settings01}
                            tooltip="Project settings"
                            href={settingsHref}
                            aria-label="Open project settings"
                        />
                    )}
                    <Badge type="color" size="sm" color={statusColor[status]}>
                        {statusLabel[status]}
                    </Badge>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-tertiary">
                    <span>Units sold</span>
                    <span className="font-medium text-secondary">
                        {primaryPercent}%
                    </span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary_alt/40 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-brand-primary"
                        style={{ width: `${primaryPercent}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="space-y-0.5">
                    <p className="text-tertiary">Sold / Total</p>
                    <p className="text-sm font-semibold text-primary">
                        {soldLabel}
                    </p>
                </div>
                <div className="space-y-0.5">
                    <p className="text-tertiary">Revenue locked</p>
                    <p className="text-sm font-semibold text-primary">
                        {revenueLocked}
                    </p>
                </div>
                <div className="space-y-0.5">
                    <p className="text-tertiary">Construction</p>
                    <p className="text-sm font-semibold text-primary">
                        {constructionLabel}
                    </p>
                </div>
            </div>

            {flags && flags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {flags.map((flag) => {
                        const cfg = flagConfig[flag];
                        return (
                            <Badge key={flag} type="pill-color" size="sm" color={cfg.color}>
                                {cfg.label}
                            </Badge>
                        );
                    })}
                </div>
            )}

            {(pendingPayments > 0 || repairsOpen > 0 || buyerChangesPending > 0) && (
                <div className="flex items-center gap-3 pt-1 text-xs">
                    {pendingPayments > 0 && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/40 px-2 py-0.5 text-secondary">
                            <CurrencyDollarCircle className="size-3.5" />
                            <span className="text-[11px] font-medium">{pendingPayments}</span>
                        </div>
                    )}
                    {repairsOpen > 0 && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/40 px-2 py-0.5 text-secondary">
                            <AlertCircle className="size-3.5" />
                            <span className="text-[11px] font-medium">{repairsOpen}</span>
                        </div>
                    )}
                    {buyerChangesPending > 0 && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/40 px-2 py-0.5 text-secondary">
                            <Users01 className="size-3.5" />
                            <span className="text-[11px] font-medium">{buyerChangesPending}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button
                    size="sm"
                    color="secondary"
                    href={dashboardHref}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    Open Dashboard
                </Button>
                <Button
                    size="sm"
                    color="secondary"
                    href={unitsHref}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    Units
                </Button>
                <Button
                    size="sm"
                    color="secondary"
                    href={shareQrHref}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    Share QR
                </Button>
            </div>
        </div>
    );
};

"use client";

import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

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
}: Props) => {
    const safeUnitsSold = Math.max(0, Math.min(unitsSold, totalUnits));
    const soldLabel = `${safeUnitsSold} / ${totalUnits}`;
    const constructionLabel = `${constructionPercent}%`;
    const primaryPercent = Math.max(0, Math.min(unitsSoldPercent, 100));

    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-primary truncate">
                        {name}
                    </p>
                    <p className="text-xs text-tertiary truncate">
                        {location}
                    </p>
                </div>
                <Badge type="color" size="sm" color={statusColor[status]}>
                    {statusLabel[status]}
                </Badge>
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

            <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button size="sm" color="secondary" href={dashboardHref}>
                    Open Dashboard
                </Button>
                <Button size="sm" color="secondary" href={unitsHref}>
                    Units
                </Button>
                <Button size="sm" color="secondary" href={shareQrHref}>
                    Share QR
                </Button>
            </div>
        </div>
    );
};

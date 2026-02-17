"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { Input } from "@/components/base/input/input";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";

type RouteParams = {
    projectId?: string;
};

const towerItems = [
    { id: "all", label: "All towers" },
    { id: "tower-a", label: "Tower A" },
    { id: "tower-b", label: "Tower B" },
    { id: "tower-c", label: "Tower C" },
];

type SalesSummary = {
    totalUnits: number;
    sold: number;
    mortgageBlocked: number;
    avgSellingPrice: string;
};

type FloorSummary = {
    id: string;
    label: string;
    sold: number;
    available: number;
    avgPricePerSft: number;
};

type UnitStatus = "available" | "sold" | "mortgage" | "reserved" | "handovered";

type UnitTile = {
    id: string;
    number: string;
    facing: string;
    area: string;
    pricePerSft: string;
    totalValue: string;
    status: UnitStatus;
};

const pseudoRandomFromString = (seed: string): number => {
    let h = 0;
    for (let i = 0; i < seed.length; i += 1) {
        h = (h * 31 + seed.charCodeAt(i)) | 0;
    }
    const x = Math.sin(h) * 10000;
    return x - Math.floor(x);
};

const getTowerRateOffset = (towerId: string): number => {
    if (towerId === "tower-a") return 250;
    if (towerId === "tower-b") return 150;
    if (towerId === "tower-c") return 200;
    return 0;
};

const getPricePerSft = (
    towerId: string,
    floorNumber: number,
    index: number,
): number => {
    const baseRate = 4400;
    const floorOffset = floorNumber * 40;
    const indexOffset = index * 15;
    return baseRate + getTowerRateOffset(towerId) + floorOffset + indexOffset;
};

const getUnitStatus = (
    towerId: string,
    floorNumber: number,
    index: number,
): UnitStatus => {
    const seed = `${towerId}-${floorNumber}-${index}`;
    const r = pseudoRandomFromString(seed);
    const heightBias =
        floorNumber >= 12
            ? 0.15
            : floorNumber >= 8
            ? 0.05
            : floorNumber <= 3
            ? -0.05
            : 0;
    const towerBias =
        towerId === "tower-a"
            ? 0.1
            : towerId === "tower-b"
            ? -0.05
            : towerId === "tower-c"
            ? 0.05
            : 0;
    const soldThreshold = Math.min(
        Math.max(0.3 + heightBias + towerBias, 0.15),
        0.8,
    );
    const mortgageThreshold = soldThreshold + 0.1;
    const reservedThreshold = mortgageThreshold + 0.1;
    const handoveredThreshold = reservedThreshold + 0.05;
    if (r < soldThreshold) return "sold";
    if (r < mortgageThreshold) return "mortgage";
    if (r < reservedThreshold) return "reserved";
    if (r < handoveredThreshold) return "handovered";
    return "available";
};

const UNIT_STATUS_LABEL: Record<UnitStatus, string> = {
    available: "Available",
    sold: "Sold",
    mortgage: "Mortgage",
    reserved: "Reserved",
    handovered: "Handed over",
};

const UNIT_STATUS_CLASSES: Record<UnitStatus, string> = {
    available: "border-success-secondary bg-success-secondary text-primary",
    sold: "border-error-secondary bg-error-secondary text-primary",
    mortgage: "border-warning-secondary bg-warning-secondary text-primary",
    reserved: "border-brand-secondary bg-brand-secondary text-primary",
    handovered: "border-secondary bg-secondary/20 text-secondary",
};

const UNIT_STATUS_DOT_CLASSES: Record<UnitStatus, string> = {
    available: "bg-success-solid",
    sold: "bg-error-solid",
    mortgage: "bg-warning-solid",
    reserved: "bg-brand-secondary",
    handovered: "bg-secondary",
};

const UNIT_STATUS_ORDER: UnitStatus[] = [
    "available",
    "sold",
    "mortgage",
    "reserved",
    "handovered",
];

const SALES_SUMMARY_BY_PROJECT_ID: Record<string, SalesSummary> = {
    "signature-altius": {
        totalUnits: 240,
        sold: 180,
        mortgageBlocked: 24,
        avgSellingPrice: "₹ 5,250 / sft",
    },
    "signature-fortius": {
        totalUnits: 240,
        sold: 130,
        mortgageBlocked: 18,
        avgSellingPrice: "₹ 4,850 / sft",
    },
    "signature-horizon": {
        totalUnits: 240,
        sold: 75,
        mortgageBlocked: 12,
        avgSellingPrice: "₹ 6,200 / sft",
    },
    "green-valley": {
        totalUnits: 320,
        sold: 95,
        mortgageBlocked: 10,
        avgSellingPrice: "₹ 4,300 / sft",
    },
    "sky-heights": {
        totalUnits: 210,
        sold: 95,
        mortgageBlocked: 14,
        avgSellingPrice: "₹ 4,900 / sft",
    },
};

const formatProjectName = (projectId: string | undefined) => {
    if (!projectId) return "Project name";
    if (projectId === "signature-altius") return "Signature Altius";
    if (projectId === "signature-fortius") return "Signature Fortius";
    if (projectId === "signature-horizon") return "Signature Horizon";
    if (projectId === "green-valley") return "Green Valley";
    if (projectId === "sky-heights") return "Sky Heights";
    return projectId
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

export default function ProjectUnitsPricingPage() {
    const router = useRouter();
    const params = useParams<RouteParams>();
    const projectId = params?.projectId as string | undefined;

    const projectName = useMemo(() => formatProjectName(projectId), [projectId]);

    const salesSummary: SalesSummary = useMemo(() => {
        if (!projectId) {
            return {
                totalUnits: 0,
                sold: 0,
                mortgageBlocked: 0,
                avgSellingPrice: "—",
            };
        }
        const base = SALES_SUMMARY_BY_PROJECT_ID[projectId];
        if (base) return base;
        return {
            totalUnits: 0,
            sold: 0,
            mortgageBlocked: 0,
            avgSellingPrice: "—",
        };
    }, [projectId]);

    const availableUnits = Math.max(0, salesSummary.totalUnits - salesSummary.sold);
    const soldPercent =
        salesSummary.totalUnits > 0
            ? Math.round((salesSummary.sold / salesSummary.totalUnits) * 100)
            : null;
    const availablePercent =
        salesSummary.totalUnits > 0
            ? Math.round((availableUnits / salesSummary.totalUnits) * 100)
            : null;

    const [selectedTowerId, setSelectedTowerId] = useState<string>("all");
    const [selectedFloorId, setSelectedFloorId] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<UnitTile | null>(null);
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
    const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([]);
    const [unitStatusOverrides, setUnitStatusOverrides] = useState<
        Record<string, UnitStatus>
    >({});
    const [unitPriceOverrides, setUnitPriceOverrides] = useState<Record<string, string>>(
        {},
    );

    const summaryItems = [
        {
            id: "total-units",
            label: "Total units",
            value:
                salesSummary.totalUnits > 0 ? String(salesSummary.totalUnits) : "—",
            sub:
                salesSummary.totalUnits > 0
                    ? "Across all towers"
                    : "Add structure to see units",
        },
        {
            id: "sold-units",
            label: "Sold",
            value: salesSummary.sold > 0 ? String(salesSummary.sold) : "—",
            sub:
                soldPercent !== null
                    ? `${soldPercent}% booked`
                    : "No bookings yet",
        },
        {
            id: "available-units",
            label: "Available",
            value: availableUnits > 0 ? String(availableUnits) : "—",
            sub:
                availablePercent !== null
                    ? `${availablePercent}% inventory`
                    : "All units available",
        },
        {
            id: "mortgage-blocked",
            label: "Mortgage blocked",
            value:
                salesSummary.mortgageBlocked > 0
                    ? String(salesSummary.mortgageBlocked)
                    : "0",
            sub:
                salesSummary.mortgageBlocked > 0
                    ? "Cannot sell until cleared"
                    : "No units blocked",
        },
        {
            id: "avg-selling-price",
            label: "Avg selling price",
            value: salesSummary.avgSellingPrice,
            sub:
                salesSummary.avgSellingPrice !== "—"
                    ? "Based on booked units"
                    : "Set pricing to see",
        },
    ];

    const floorSummaries = useMemo<FloorSummary[]>(() => {
        const totalFloors = 15;
        const unitsPerFloor = 8;

        return Array.from({ length: totalFloors }, (_, index) => {
            const floorNumber = totalFloors - index;
            let sold = 0;
            let available = 0;
            let priceSum = 0;

            for (let unitIndex = 0; unitIndex < unitsPerFloor; unitIndex += 1) {
                const status = getUnitStatus(
                    selectedTowerId,
                    floorNumber,
                    unitIndex,
                );
                if (status === "sold") sold += 1;
                if (status === "available") available += 1;
                priceSum += getPricePerSft(selectedTowerId, floorNumber, unitIndex);
            }

            const avgPricePerSft =
                unitsPerFloor > 0
                    ? Math.round(priceSum / unitsPerFloor)
                    : 0;

            return {
                id: String(floorNumber),
                label: `${floorNumber}F`,
                sold,
                available,
                avgPricePerSft,
            };
        });
    }, [selectedTowerId]);

    const selectedFloorIdSafe =
        selectedFloorId ?? (floorSummaries.length > 0 ? floorSummaries[0].id : null);

    const unitsForSelectedFloor = useMemo<UnitTile[]>(() => {
        if (!selectedFloorIdSafe) return [];

        const floorNumber = Number(selectedFloorIdSafe);
        if (!Number.isFinite(floorNumber)) return [];

        const unitsPerFloor = 8;
        const faces = ["East", "West", "North", "South"];
        const baseArea = 1200;
        const areaStep = 50;

        return Array.from({ length: unitsPerFloor }, (_, index) => {
            const area = baseArea + areaStep * (index % 4);
            const pricePerSft = getPricePerSft(
                selectedTowerId,
                floorNumber,
                index,
            );
            const totalValue = pricePerSft * area;
            const unitNumber = `${floorNumber * 100 + (index + 1)}`;
            const facing = faces[index % faces.length];
            const id = `${selectedTowerId}-${floorNumber}-${index}`;
            const baseStatus = getUnitStatus(selectedTowerId, floorNumber, index);
            const status = unitStatusOverrides[id] ?? baseStatus;

            return {
                id,
                number: `Unit ${unitNumber}`,
                facing,
                area: `${area.toLocaleString("en-IN")} sft`,
                pricePerSft: `₹ ${pricePerSft.toLocaleString("en-IN")}`,
                totalValue: `₹ ${totalValue.toLocaleString("en-IN")}`,
                status,
            };
        });
    }, [selectedFloorIdSafe, selectedTowerId, unitStatusOverrides]);

    const selectedFloorLabel =
        floorSummaries.find((floor) => floor.id === selectedFloorIdSafe)?.label ??
        (floorSummaries[0]?.label ?? "Floor");

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4 border-b border-secondary bg-primary/95 backdrop-blur">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-display-sm font-semibold text-primary">
                                    Units &amp; pricing
                                </h1>
                                <p className="text-xs text-tertiary">
                                    Project sales war-room for inventory, pricing, and mortgages.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:ml-3">
                                <span className="rounded-full bg-secondary/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                    {projectName}
                                </span>
                                <div className="w-40">
                                    <Select
                                        size="sm"
                                        placeholder="Select tower"
                                        selectedKey="all"
                                        items={towerItems}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
                            <Button
                                size="sm"
                                color="secondary"
                                onClick={() =>
                                    router.push("/admin/builder/projects/create/pricing")
                                }
                            >
                                Pricing rules
                            </Button>
                            <Button size="sm" color="secondary">
                                Bulk edit
                            </Button>
                            <Button size="sm" color="secondary">
                                Export sheet
                            </Button>
                            <Button size="sm">
                                Share QR
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-12">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
                            {summaryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col justify-between rounded-xl bg-primary p-3 shadow-xs ring-1 ring-secondary_alt/80"
                                >
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-xl font-semibold text-primary">
                                        {item.value}
                                    </p>
                                    {item.sub ? (
                                        <p className="mt-1 text-[11px] text-tertiary">
                                            {item.sub}
                                        </p>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-medium text-tertiary">
                                Towers
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {towerItems.map((tower) => {
                                    const isSelected = tower.id === selectedTowerId;
                                    return (
                                        <button
                                            key={tower.id}
                                            type="button"
                                            onClick={() => setSelectedTowerId(tower.id)}
                                            className={
                                                isSelected
                                                    ? "inline-flex items-center rounded-full border border-brand-primary bg-brand-primary px-3 py-1 text-xs font-semibold text-primary shadow-xs transition-colors"
                                                    : "inline-flex items-center rounded-full border border-secondary bg-primary_hover px-3 py-1 text-xs font-medium text-secondary transition-colors hover:bg-secondary/40"
                                            }
                                        >
                                            {tower.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt min-h-[320px]">
                                <div className="flex h-full flex-col gap-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <p className="text-xs font-semibold text-secondary">
                                                Floor stack view
                                            </p>
                                            <p className="text-[11px] text-tertiary">
                                                Click a floor to see units by level.
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-secondary/40 px-2.5 py-0.5 text-[11px] font-medium text-quaternary">
                                            {selectedTowerId === "all"
                                                ? "All towers"
                                                : towerItems.find(
                                                      (tower) =>
                                                          tower.id === selectedTowerId,
                                                  )?.label ?? "Tower"}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex-1 overflow-y-auto rounded-xl bg-secondary/20 px-2 py-2">
                                        <div className="flex flex-col gap-1.5">
                                            {floorSummaries.map((floor) => {
                                                const isSelected =
                                                    floor.id === selectedFloorIdSafe;
                                                return (
                                                    <button
                                                        key={floor.id}
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedFloorId(floor.id)
                                                        }
                                                        className={
                                                            isSelected
                                                                ? "w-full rounded-lg border border-brand-primary bg-brand-primary/5 px-2.5 py-2 text-left shadow-xs"
                                                                : "w-full rounded-lg border border-secondary bg-primary px-2.5 py-2 text-left hover:bg-secondary/30"
                                                        }
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-9 text-xs font-semibold text-primary">
                                                                    {floor.label}
                                                                </span>
                                                                <div className="flex items-center gap-2 text-[11px] text-tertiary">
                                                                    <span>
                                                                        Sold {floor.sold}
                                                                    </span>
                                                                    <span className="text-secondary_alt">
                                                                        •
                                                                    </span>
                                                                    <span>
                                                                        Available{" "}
                                                                        {floor.available}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] text-tertiary">
                                                                    Avg price
                                                                </p>
                                                                <p className="text-xs font-semibold text-secondary">
                                                                    ₹{" "}
                                                                    {floor.avgPricePerSft.toLocaleString(
                                                                        "en-IN",
                                                                    )}
                                                                    /sft
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt min-h-[320px]">
                                <div className="flex h-full flex-col gap-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <p className="text-xs font-semibold text-secondary">
                                                Unit grid — {selectedFloorLabel}
                                            </p>
                                            <p className="text-[11px] text-tertiary">
                                                Color-coded tiles for available, sold, mortgage,
                                                reserved, and handed over units.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-tertiary">
                                            {UNIT_STATUS_ORDER.map((status) => (
                                                <div
                                                    key={status}
                                                    className="flex items-center gap-1"
                                                >
                                                    <span
                                                        className={`h-2 w-2 rounded-full ${UNIT_STATUS_DOT_CLASSES[status]}`}
                                                    />
                                                    <span>
                                                        {UNIT_STATUS_LABEL[status]}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {unitsForSelectedFloor.length === 0 ? (
                                        <div className="mt-4 flex flex-1 items-center justify-center rounded-xl border border-dashed border-secondary/80 px-4 py-6 text-center">
                                            <p className="text-xs text-tertiary">
                                                Select a floor on the left panel to see units at
                                                that level.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
                                            {unitsForSelectedFloor.map((unit) => {
                                                const isSelected = selectedUnitIds.includes(unit.id);
                                                return (
                                                    <button
                                                        key={unit.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedUnit(unit);
                                                            setIsUnitModalOpen(true);
                                                        }}
                                                        className={`relative flex flex-col gap-1 rounded-lg border px-3 py-2 text-left text-xs shadow-xs transition-colors hover:brightness-105 ${
                                                            UNIT_STATUS_CLASSES[unit.status]
                                                        } ${
                                                            isSelected
                                                                ? "ring-2 ring-brand-primary ring-offset-2 ring-offset-primary"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div>
                                                                <p className="text-[11px] font-semibold text-primary">
                                                                    {unit.number}
                                                                </p>
                                                                <p className="text-[11px] text-tertiary">
                                                                    {unit.facing} • {unit.area}
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-col items-end gap-1">
                                                                <span className="rounded-full bg-primary/40 px-2 py-0.5 text-[10px] font-medium text-secondary">
                                                                    {UNIT_STATUS_LABEL[unit.status]}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={(event) => {
                                                                        event.stopPropagation();
                                                                        setSelectedUnitIds((prev) =>
                                                                            prev.includes(unit.id)
                                                                                ? prev.filter((id) => id !== unit.id)
                                                                                : [...prev, unit.id],
                                                                        );
                                                                    }}
                                                                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                                                                        isSelected
                                                                            ? "border-brand-primary bg-brand-primary text-primary"
                                                                            : "border-secondary bg-primary text-tertiary"
                                                                    }`}
                                                                >
                                                                    {isSelected ? "✓" : "+"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mt-1 flex items-center justify-between gap-2">
                                                            <div>
                                                                <p className="text-[10px] text-tertiary">
                                                                    Price / sft
                                                                </p>
                                                                <p className="text-xs font-semibold text-secondary">
                                                                    {unit.pricePerSft}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] text-tertiary">
                                                                    Total value
                                                                </p>
                                                                <p className="text-xs font-semibold text-secondary">
                                                                    {unit.totalValue}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalOverlay
                isOpen={isUnitModalOpen && Boolean(selectedUnit)}
                onOpenChange={(open) => {
                    setIsUnitModalOpen(open);
                    if (!open) {
                        setSelectedUnit(null);
                    }
                }}
            >
                {() => {
                    if (!selectedUnit) return null;

                    const areaNumber = Number(
                        selectedUnit.area.replace(/[^0-9]/g, ""),
                    );
                    const rateNumber = Number(
                        selectedUnit.pricePerSft.replace(/[^0-9]/g, ""),
                    );
                    const overrideRateRaw =
                        unitPriceOverrides[selectedUnit.id] ?? "";
                    const overrideRateNumber = Number(
                        overrideRateRaw.replace(/[^0-9]/g, ""),
                    );
                    const baseTotal = Number.isFinite(areaNumber * rateNumber)
                        ? areaNumber * rateNumber
                        : 0;
                    const overrideTotal =
                        Number.isFinite(areaNumber * overrideRateNumber) &&
                        overrideRateNumber > 0
                            ? areaNumber * overrideRateNumber
                            : null;

                    const paymentStatus =
                        selectedUnit.status === "sold"
                            ? "Agreement signed · 20% paid"
                            : selectedUnit.status === "reserved"
                            ? "Token received · Pending agreement"
                            : selectedUnit.status === "mortgage"
                            ? "Blocked by mortgage"
                            : "No payments recorded";

                    const showBuyerSection =
                        selectedUnit.status === "sold" ||
                        selectedUnit.status === "reserved" ||
                        selectedUnit.status === "mortgage";

                    const handleMarkStatus = (status: UnitStatus) => {
                        setUnitStatusOverrides((prev) => ({
                            ...prev,
                            [selectedUnit.id]: status,
                        }));
                        setSelectedUnit({ ...selectedUnit, status });
                    };

                    return (
                        <Modal className="w-full max-w-md bg-primary rounded-2xl shadow-xl ring-1 ring-secondary_alt p-0 overflow-hidden">
                            <Dialog className="outline-none">
                                <div className="flex max-h-[80vh] flex-col">
                                    <div className="flex flex-col gap-1 border-b border-secondary px-4 py-3 md:px-5">
                                        <p className="text-[11px] font-semibold text-secondary">
                                            Unit details
                                        </p>
                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                <h2 className="text-lg font-semibold text-primary">
                                                    {selectedUnit.number}
                                                </h2>
                                                <p className="text-xs text-tertiary">
                                                    {selectedUnit.facing} • {selectedUnit.area}
                                                </p>
                                            </div>
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${UNIT_STATUS_CLASSES[selectedUnit.status]}`}
                                            >
                                                {UNIT_STATUS_LABEL[selectedUnit.status]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 pt-3 md:px-5 md:pb-5">
                                        <div className="rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                                Price breakup
                                            </p>
                                            <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                                                <div>
                                                    <p className="text-[10px] text-tertiary">
                                                        Rate / sft
                                                    </p>
                                                    <p className="text-sm font-semibold text-secondary">
                                                        {selectedUnit.pricePerSft}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-tertiary">
                                                        Area
                                                    </p>
                                                    <p className="text-sm font-semibold text-secondary">
                                                        {selectedUnit.area}
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-[10px] text-tertiary">
                                                        Total price
                                                    </p>
                                                    <p className="text-sm font-semibold text-secondary">
                                                        ₹{" "}
                                                        {baseTotal.toLocaleString("en-IN")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-primary_hover/30 p-3 ring-1 ring-secondary_alt">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                                Override price
                                            </p>
                                            <div className="mt-2 flex flex-col gap-2">
                                                <Input
                                                    size="sm"
                                                    label="Custom rate / sft"
                                                    type="number"
                                                    value={overrideRateRaw}
                                                    onChange={(value) =>
                                                        setUnitPriceOverrides((prev) => ({
                                                            ...prev,
                                                            [selectedUnit.id]: value,
                                                        }))
                                                    }
                                                    placeholder="e.g. 5,200"
                                                />
                                                {overrideTotal !== null && (
                                                    <div className="flex items-center justify-between text-[11px] text-tertiary">
                                                        <span>Override total</span>
                                                        <span className="font-semibold text-secondary">
                                                            ₹{" "}
                                                            {overrideTotal.toLocaleString(
                                                                "en-IN",
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                                Payment status
                                            </p>
                                            <p className="mt-2 text-xs text-primary">
                                                {paymentStatus}
                                            </p>
                                        </div>

                                        {showBuyerSection && (
                                            <div className="rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                                    Buyer details
                                                </p>
                                                <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                                                    <div>
                                                        <p className="text-[10px] text-tertiary">
                                                            Name
                                                        </p>
                                                        <p className="text-sm font-semibold text-primary">
                                                            Not captured
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-tertiary">
                                                            Phone
                                                        </p>
                                                        <p className="text-sm font-semibold text-primary">
                                                            —
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-secondary px-4 py-3 md:px-5">
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                onClick={() => handleMarkStatus("reserved")}
                                            >
                                                Mark reserved
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => handleMarkStatus("sold")}
                                            >
                                                Mark sold
                                            </Button>
                                        </div>
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={() => setIsUnitModalOpen(false)}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    );
                }}
            </ModalOverlay>

            {selectedUnitIds.length > 0 && (
                <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 pt-2 pointer-events-none">
                    <div className="pointer-events-auto flex w-full max-w-2xl items-center justify-between gap-3 rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt px-4 py-2.5">
                        <div className="flex flex-col">
                            <p className="text-[11px] font-semibold text-secondary">
                                {selectedUnitIds.length} units selected
                            </p>
                            <p className="text-[10px] text-tertiary">
                                Apply bulk actions without editing a spreadsheet.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                size="sm"
                                color="secondary"
                                onClick={() => {
                                    const firstUnit = unitsForSelectedFloor.find((unit) =>
                                        selectedUnitIds.includes(unit.id),
                                    );
                                    if (!firstUnit) return;
                                    setSelectedUnit(firstUnit);
                                    setIsUnitModalOpen(true);
                                }}
                            >
                                Bulk price change
                            </Button>
                            <Button
                                size="sm"
                                color="secondary"
                                onClick={() => {
                                    setUnitStatusOverrides((prev) => {
                                        const next = { ...prev };
                                        selectedUnitIds.forEach((id) => {
                                            next[id] = "mortgage";
                                        });
                                        return next;
                                    });
                                }}
                            >
                                Bulk mark mortgage
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => {
                                    setUnitStatusOverrides((prev) => {
                                        const next = { ...prev };
                                        selectedUnitIds.forEach((id) => {
                                            next[id] = "reserved";
                                        });
                                        return next;
                                    });
                                }}
                            >
                                Bulk reserve
                            </Button>
                            <Button
                                size="sm"
                               
                                color="secondary"
                                onClick={() => setSelectedUnitIds([])}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

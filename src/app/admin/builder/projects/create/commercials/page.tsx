"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Toggle } from "@/components/base/toggle/toggle";
import { Select } from "@/components/base/select/select";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";

const steps = [
    "Project Info",
    "Structure",
    "Units",
    "Pricing",
    "Commercials",
    "Media",
    "Review",
] as const;

type StepKey = (typeof steps)[number];

type AmenitiesMode = "fixed" | "percent";

type AdditionalCharge = {
    id: string;
    label: string;
    amount: string;
};

const SAMPLE_BASE_PRICE_PER_SFT = 7500;

const formatCurrency = (value: number) => {
    if (!Number.isFinite(value)) return "₹0";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Math.max(0, Math.round(value)));
};

const DRAFT_KEY = "builder_create_project_draft";

const updateDraft = (patch: any) => {
    if (typeof window === "undefined") return;
    try {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        const prev = raw ? JSON.parse(raw) : {};
        const next = { ...prev, ...patch };
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    } catch {
    }
};

export default function CreateProjectCommercialsPage() {
    const router = useRouter();

    const [baseUnitSize, setBaseUnitSize] = useState<string>("1000");
    const [amenitiesMode, setAmenitiesMode] = useState<AmenitiesMode>("fixed");
    const [amenitiesValue, setAmenitiesValue] = useState<string>("200000");
    const [corpusFund, setCorpusFund] = useState<string>("100000");
    const [maintenanceCharges, setMaintenanceCharges] = useState<string>("6500");
    const [additionalCharges, setAdditionalCharges] = useState<AdditionalCharge[]>([
        { id: "charge-1", label: "Club house", amount: "50000" },
    ]);
    const [bankLoansAvailable, setBankLoansAvailable] = useState<boolean>(true);

    const [savingDraft, setSavingDraft] = useState(false);
    const [savingNext, setSavingNext] = useState(false);

    const currentStepIndex = steps.indexOf("Commercials" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    const parsedBaseUnitSize = Math.max(
        0,
        Number.isNaN(Number(baseUnitSize)) ? 0 : Number(baseUnitSize),
    );
    const parsedAmenitiesValue = Math.max(
        0,
        Number.isNaN(Number(amenitiesValue)) ? 0 : Number(amenitiesValue),
    );
    const parsedCorpusFund = Math.max(
        0,
        Number.isNaN(Number(corpusFund)) ? 0 : Number(corpusFund),
    );
    const parsedMaintenanceCharges = Math.max(
        0,
        Number.isNaN(Number(maintenanceCharges)) ? 0 : Number(maintenanceCharges),
    );

    const {
        amenitiesAmount,
        amenitiesLabel,
        corpusAmount,
        maintenanceYearAmount,
        baseUnitPriceExample,
        additionalTotal,
        totalCommercials,
    } = useMemo(() => {
        const baseUnitPrice = parsedBaseUnitSize * SAMPLE_BASE_PRICE_PER_SFT;

        const amenitiesAmountValue =
            amenitiesMode === "fixed"
                ? parsedAmenitiesValue
                : (parsedAmenitiesValue / 100) * baseUnitPrice;

        const amenitiesLabelValue =
            amenitiesMode === "fixed"
                ? "Fixed per unit"
                : `${parsedAmenitiesValue || 0}% of base sale value`;

        const maintenanceYearAmountValue = parsedMaintenanceCharges * 12;

        const additionalTotalValue = additionalCharges.reduce((sum, charge) => {
            const amount = Math.max(
                0,
                Number.isNaN(Number(charge.amount)) ? 0 : Number(charge.amount),
            );
            return sum + amount;
        }, 0);

        const total =
            amenitiesAmountValue +
            parsedCorpusFund +
            maintenanceYearAmountValue +
            additionalTotalValue;

        return {
            amenitiesAmount: amenitiesAmountValue,
            amenitiesLabel: amenitiesLabelValue,
            corpusAmount: parsedCorpusFund,
            maintenanceYearAmount: maintenanceYearAmountValue,
            baseUnitPriceExample: baseUnitPrice,
            additionalTotal: additionalTotalValue,
            totalCommercials: total,
        };
    }, [
        amenitiesMode,
        parsedAmenitiesValue,
        parsedCorpusFund,
        parsedMaintenanceCharges,
        parsedBaseUnitSize,
        additionalCharges,
    ]);

    const canSaveNext = parsedBaseUnitSize > 0;

    useEffect(() => {
        updateDraft({
            commercials: {
                baseUnitSize: parsedBaseUnitSize,
                amenitiesMode,
                amenitiesValue: parsedAmenitiesValue,
                corpusFund: parsedCorpusFund,
                maintenancePerMonth: parsedMaintenanceCharges,
                maintenancePerYear: maintenanceYearAmount,
                additionalChargesCount: additionalCharges.length,
                additionalChargesTotal: additionalTotal,
                totalCommercials,
                bankLoansAvailable,
            },
        });
    }, [
        parsedBaseUnitSize,
        amenitiesMode,
        parsedAmenitiesValue,
        parsedCorpusFund,
        parsedMaintenanceCharges,
        maintenanceYearAmount,
        additionalCharges.length,
        additionalTotal,
        totalCommercials,
        bankLoansAvailable,
    ]);

    const handleSaveDraft = async () => {
        setSavingDraft(true);
        try {
        } finally {
            setSavingDraft(false);
        }
    };

    const handleSaveAndNext = async () => {
        if (!canSaveNext) return;
        setSavingNext(true);
        try {
            router.push("/admin/builder/projects/create/media");
        } finally {
            setSavingNext(false);
        }
    };

    const handleAdditionalLabelChange = (id: string, value: string) => {
        setAdditionalCharges((prev) =>
            prev.map((charge) => (charge.id === id ? { ...charge, label: value } : charge)),
        );
    };

    const handleAdditionalAmountChange = (id: string, value: string) => {
        setAdditionalCharges((prev) =>
            prev.map((charge) => (charge.id === id ? { ...charge, amount: value } : charge)),
        );
    };

    const handleAddChargeRow = () => {
        setAdditionalCharges((prev) => [
            ...prev,
            {
                id: `charge-${prev.length + 1}`,
                label: "",
                amount: "",
            },
        ]);
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Create project</h1>
                            <p className="text-md text-tertiary">Step 5 of 7 · Commercial components</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                color="secondary"
                                isLoading={savingDraft}
                                onClick={handleSaveDraft}
                            >
                                Save draft
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-tertiary">
                            <p>Commercials</p>
                            <p>
                                Step {currentStepIndex + 1} of {steps.length}
                            </p>
                        </div>
                        <ProgressBarBase value={progressValue} />
                        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-quaternary uppercase tracking-wide">
                            {steps.map((step, index) => (
                                <span
                                    key={step}
                                    className={
                                        index === currentStepIndex
                                            ? "font-semibold text-brand-secondary"
                                            : "text-quaternary"
                                    }
                                >
                                    {step}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-12">
                <div className="w-full max-w-6xl">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
                        <div className="rounded-2xl bg-primary p-4 md:p-6 shadow-xs ring-1 ring-secondary_alt flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold text-primary">Commercial components</h2>
                                <p className="text-sm text-tertiary">
                                    Capture full cost breakup in one place. No scattered Excel sheets.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Input
                                    label="Base unit size"
                                    hint="Super built-up area in sft"
                                    type="number"
                                    value={baseUnitSize}
                                    onChange={setBaseUnitSize}
                                    placeholder="e.g. 1000"
                                />

                                <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/30 p-3 ring-1 ring-secondary_alt">
                                    <p className="text-sm font-medium text-primary">
                                        Amenities cost (fixed or %)
                                    </p>
                                    <p className="text-xs text-tertiary">
                                        Decide if amenities are a fixed one-time charge or a percentage of
                                        base sale value.
                                    </p>

                                    <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)]">
                                        <Select
                                            label="Type"
                                            size="sm"
                                            selectedKey={amenitiesMode}
                                            onSelectionChange={(key) =>
                                                setAmenitiesMode(String(key) as AmenitiesMode)
                                            }
                                            items={[
                                                {
                                                    id: "fixed",
                                                    label: "Fixed amount",
                                                },
                                                {
                                                    id: "percent",
                                                    label: "Percent of base price",
                                                },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>

                                        <Input
                                            label={
                                                amenitiesMode === "fixed"
                                                    ? "Amenities amount"
                                                    : "Amenities %"
                                            }
                                            hint={
                                                amenitiesMode === "fixed"
                                                    ? "₹ per unit"
                                                    : "% of base sale value"
                                            }
                                            type="number"
                                            value={amenitiesValue}
                                            onChange={setAmenitiesValue}
                                            placeholder={amenitiesMode === "fixed" ? "e.g. 200000" : "e.g. 5"}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        label="Corpus fund"
                                        hint="One-time fund per unit"
                                        type="number"
                                        value={corpusFund}
                                        onChange={setCorpusFund}
                                        placeholder="e.g. 100000"
                                    />
                                    <Input
                                        label="Maintenance charges"
                                        hint="Monthly amount per unit"
                                        type="number"
                                        value={maintenanceCharges}
                                        onChange={setMaintenanceCharges}
                                        placeholder="e.g. 6500"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-primary">
                                            Additional charges
                                        </p>
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={handleAddChargeRow}
                                        >
                                            Add charge
                                        </Button>
                                    </div>
                                    <p className="text-xs text-tertiary">
                                        Parking, clubhouse, view premium or any other one-time components.
                                    </p>

                                    <div className="flex flex-col gap-2">
                                        {additionalCharges.map((charge) => (
                                            <div
                                                key={charge.id}
                                                className="grid gap-2 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]"
                                            >
                                                <Input
                                                    label="Label"
                                                    placeholder="e.g. Parking"
                                                    value={charge.label}
                                                    onChange={(value) =>
                                                        handleAdditionalLabelChange(charge.id, value)
                                                    }
                                                />
                                                <Input
                                                    label="Amount"
                                                    hint="₹ per unit"
                                                    type="number"
                                                    placeholder="e.g. 250000"
                                                    value={charge.amount}
                                                    onChange={(value) =>
                                                        handleAdditionalAmountChange(charge.id, value)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                    <Toggle
                                        size="sm"
                                        isSelected={bankLoansAvailable}
                                        onChange={setBankLoansAvailable}
                                        label="Bank loans available?"
                                        hint="Toggle off for self-funded or under-construction risk cases."
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() =>
                                        router.push("/admin/builder/projects/create/pricing")
                                    }
                                >
                                    Back
                                </Button>
                                <div className="flex flex-wrap gap-2 md:justify-end">
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        isLoading={savingDraft}
                                        onClick={handleSaveDraft}
                                    >
                                        Save draft
                                    </Button>
                                    <Button
                                        size="sm"
                                        isDisabled={!canSaveNext}
                                        isLoading={savingNext}
                                        onClick={handleSaveAndNext}
                                    >
                                        Save &amp; Next
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-primary p-4 md:p-6 shadow-xs ring-1 ring-secondary_alt flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-sm font-semibold text-primary">Commercials preview</h2>
                                <p className="text-xs text-tertiary">
                                    Full cost breakup for one sample unit so builder sees all components
                                    clearly.
                                </p>
                            </div>

                            <div className="rounded-xl bg-secondary/40 px-3 py-3 flex flex-col gap-1">
                                <p className="text-xs font-medium text-primary">
                                    Base unit size:{" "}
                                    {parsedBaseUnitSize
                                        ? `${parsedBaseUnitSize.toLocaleString("en-IN")} sft`
                                        : "—"}
                                </p>
                                <p className="text-sm font-semibold text-primary">
                                    Total commercials:{" "}
                                    <span>{formatCurrency(totalCommercials)}</span>
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 rounded-xl bg-secondary/20 px-3 py-3 text-xs text-tertiary">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Amenities</span>
                                    <span className="text-right">
                                        {amenitiesLabel && (
                                            <>
                                                <span className="block text-[11px] text-quaternary">
                                                    {amenitiesLabel}
                                                </span>
                                            </>
                                        )}
                                        <span className="font-medium text-primary">
                                            {formatCurrency(amenitiesAmount)}
                                        </span>
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <span>Corpus fund</span>
                                    <span className="font-medium text-primary">
                                        {formatCurrency(corpusAmount)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <span>Maintenance (first year)</span>
                                    <span className="text-right">
                                        <span className="block text-[11px] text-quaternary">
                                            {parsedMaintenanceCharges
                                                ? `${formatCurrency(
                                                      parsedMaintenanceCharges,
                                                  )} per month × 12`
                                                : "Monthly amount × 12"}
                                        </span>
                                        <span className="font-medium text-primary">
                                            {formatCurrency(maintenanceYearAmount)}
                                        </span>
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span>Additional charges</span>
                                        <span className="font-medium text-primary">
                                            {formatCurrency(additionalTotal)}
                                        </span>
                                    </div>
                                    {additionalCharges.some(
                                        (charge) => charge.label || charge.amount,
                                    ) && (
                                        <div className="mt-1 flex flex-col gap-1 text-[11px] text-tertiary">
                                            {additionalCharges
                                                .filter((charge) => charge.label || charge.amount)
                                                .map((charge) => (
                                                    <div
                                                        key={charge.id}
                                                        className="flex items-center justify-between gap-2"
                                                    >
                                                        <span className="truncate">
                                                            {charge.label || "Unnamed"}
                                                        </span>
                                                        <span className="font-medium text-primary">
                                                            {formatCurrency(
                                                                Math.max(
                                                                    0,
                                                                    Number.isNaN(
                                                                        Number(charge.amount),
                                                                    )
                                                                        ? 0
                                                                        : Number(charge.amount),
                                                                ),
                                                            )}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-xl bg-secondary/30 px-3 py-3 text-xs text-tertiary flex items-center justify-between">
                                <span>Example base sale value</span>
                                <span className="text-right">
                                    <span className="block text-[11px] text-quaternary">
                                        {parsedBaseUnitSize
                                            ? `${parsedBaseUnitSize.toLocaleString(
                                                  "en-IN",
                                              )} sft × ${formatCurrency(
                                                  SAMPLE_BASE_PRICE_PER_SFT,
                                              )} per sft`
                                            : "Set base unit size to see example"}
                                    </span>
                                    <span className="font-medium text-primary">
                                        {formatCurrency(baseUnitPriceExample)}
                                    </span>
                                </span>
                            </div>

                            <div className="rounded-xl bg-secondary/30 px-3 py-3 text-xs text-tertiary flex items-center justify-between">
                                <span>Bank loans</span>
                                <span
                                    className={
                                        bankLoansAvailable
                                            ? "text-emerald-600 font-semibold"
                                            : "text-error-primary font-semibold"
                                    }
                                >
                                    {bankLoansAvailable ? "Available" : "Not available"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

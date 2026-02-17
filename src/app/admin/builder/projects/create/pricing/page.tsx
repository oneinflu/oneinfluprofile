"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
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

const SAMPLE_UNIT_LABEL = "A1203";
const SAMPLE_UNIT_NUMBER = 1203;

const getSampleUnitFloor = () => {
    return Math.floor(SAMPLE_UNIT_NUMBER / 100);
};

type FloorRule = {
    id: string;
    fromFloor: string;
    toFloor: string;
    increasePerSft: string;
};

type FacingPremium = {
    id: string;
    label: string;
    amountPerSft: string;
    isActive: boolean;
    isCustom?: boolean;
};

type PositionPremium = {
    id: string;
    label: string;
    amountPerSft: string;
    isActive: boolean;
    isCustom?: boolean;
};

type TowerOverrideRule = {
    id: string;
    towerName: string;
    note: string;
};

type UnitOverrideRule = {
    id: string;
    unitLabel: string;
    pricePerSft: string;
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

const formatCurrency = (value: number) => {
    if (!Number.isFinite(value)) return "₹0";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Math.max(0, Math.round(value)));
};

const FACING_LABEL_OPTIONS = [
    { id: "East", label: "East" },
    { id: "West", label: "West" },
    { id: "North", label: "North" },
    { id: "South", label: "South" },
    { id: "Road facing", label: "Road facing" },
    { id: "Garden view", label: "Garden view" },
    { id: "Park view", label: "Park view" },
    { id: "Lake facing", label: "Lake facing" },
    { id: "Custom facing", label: "Custom facing" },
];

const POSITION_LABEL_OPTIONS = [
    { id: "Corner flat", label: "Corner flat" },
    { id: "Corner villa", label: "Corner villa" },
    { id: "Garden view", label: "Garden view" },
    { id: "Pool facing", label: "Pool facing" },
    { id: "Clubhouse view", label: "Clubhouse view" },
    { id: "Park view", label: "Park view" },
    { id: "Custom position", label: "Custom position" },
];

export default function CreateProjectPricingPage() {
    const router = useRouter();

    const [basePricePerSft, setBasePricePerSft] = useState<string>("5000");

    const [floorRules, setFloorRules] = useState<FloorRule[]>([
        { id: "rule-1", fromFloor: "5", toFloor: "9", increasePerSft: "25" },
        { id: "rule-2", fromFloor: "10", toFloor: "14", increasePerSft: "50" },
        { id: "rule-3", fromFloor: "15", toFloor: "", increasePerSft: "75" },
    ]);

    const [facingPremiums, setFacingPremiums] = useState<FacingPremium[]>([
        { id: "east", label: "East", amountPerSft: "0", isActive: false },
        { id: "west", label: "West", amountPerSft: "0", isActive: false },
        { id: "north", label: "North", amountPerSft: "0", isActive: false },
    ]);

    const [positionPremiums, setPositionPremiums] = useState<PositionPremium[]>([
        { id: "corner", label: "Corner flat", amountPerSft: "0", isActive: false },
        { id: "garden", label: "Garden view", amountPerSft: "0", isActive: false },
        { id: "pool", label: "Pool facing", amountPerSft: "0", isActive: false },
    ]);

    const [towerOverridesEnabled, setTowerOverridesEnabled] = useState(false);
    const [towerOverrides, setTowerOverrides] = useState<TowerOverrideRule[]>([]);

    const [unitOverridesEnabled, setUnitOverridesEnabled] = useState(false);
    const [unitOverrides, setUnitOverrides] = useState<UnitOverrideRule[]>([]);

    const [savingDraft, setSavingDraft] = useState(false);
    const [savingNext, setSavingNext] = useState(false);

    const currentStepIndex = steps.indexOf("Pricing" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    const parsedBasePrice = Math.max(
        0,
        Number.isNaN(Number(basePricePerSft)) ? 0 : Number(basePricePerSft),
    );

    const sampleFloor = getSampleUnitFloor();

    const {
        baseComponentValue,
        floorRiseDeltaPerSft,
        facingDeltaPerSft,
        positionDeltaPerSft,
        finalPricePerSft,
    } = useMemo(() => {
        const baseValue = parsedBasePrice;

        const appliedFloorRule = floorRules.find((rule) => {
            const from = Number.isNaN(Number(rule.fromFloor))
                ? 0
                : Math.max(0, Number(rule.fromFloor));
            const to = Number.isNaN(Number(rule.toFloor))
                ? 0
                : Math.max(0, Number(rule.toFloor));

            const lowerOk = sampleFloor >= from;
            const upperOk = to > 0 ? sampleFloor <= to : true;
            return lowerOk && upperOk;
        });

        const floorDeltaPerSft = appliedFloorRule
            ? Math.max(
                  0,
                  Number.isNaN(Number(appliedFloorRule.increasePerSft))
                      ? 0
                      : Number(appliedFloorRule.increasePerSft),
              )
            : 0;

        const activeFacing = facingPremiums.find((premium) => premium.isActive);
        const facingDelta = activeFacing
            ? Math.max(
                  0,
                  Number.isNaN(Number(activeFacing.amountPerSft))
                      ? 0
                      : Number(activeFacing.amountPerSft),
              )
            : 0;

        const positionDelta = positionPremiums.reduce((sum, premium) => {
            if (!premium.isActive) return sum;
            const value = Math.max(
                0,
                Number.isNaN(Number(premium.amountPerSft))
                    ? 0
                    : Number(premium.amountPerSft),
            );
            return sum + value;
        }, 0);

        const finalPerSft = baseValue + floorDeltaPerSft + facingDelta + positionDelta;

        return {
            baseComponentValue: baseValue,
            floorRiseDeltaPerSft: floorDeltaPerSft,
            facingDeltaPerSft: facingDelta,
            positionDeltaPerSft: positionDelta,
            finalPricePerSft: finalPerSft,
        };
    }, [parsedBasePrice, floorRules, facingPremiums, positionPremiums, sampleFloor]);

    const canSaveNext = parsedBasePrice > 0;

    useEffect(() => {
        updateDraft({
            pricing: {
                basePricePerSft: parsedBasePrice,
                floorRulesCount: floorRules.length,
                facingPremiumsCount: facingPremiums.length,
                positionPremiumsCount: positionPremiums.length,
                hasTowerOverrides: towerOverridesEnabled && towerOverrides.length > 0,
                hasUnitOverrides: unitOverridesEnabled && unitOverrides.length > 0,
                sampleFinalPricePerSft: finalPricePerSft,
            },
        });
    }, [
        parsedBasePrice,
        floorRules.length,
        facingPremiums.length,
        positionPremiums.length,
        towerOverridesEnabled,
        towerOverrides.length,
        unitOverridesEnabled,
        unitOverrides.length,
        finalPricePerSft,
    ]);

    const handleAddFloorRule = () => {
        setFloorRules((prev) => [
            ...prev,
            {
                id: `rule-${prev.length + 1}`,
                fromFloor: "",
                toFloor: "",
                increasePerSft: "",
            },
        ]);
    };

    const handleRemoveFloorRule = (id: string) => {
        setFloorRules((prev) => prev.filter((rule) => rule.id !== id));
    };

    const handleFloorRuleChange = (id: string, patch: Partial<FloorRule>) => {
        setFloorRules((prev) =>
            prev.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)),
        );
    };

    const handleFacingAmountChange = (id: string, value: string) => {
        setFacingPremiums((prev) =>
            prev.map((premium) =>
                premium.id === id
                    ? {
                          ...premium,
                          amountPerSft: value,
                          isActive: Number(value) > 0,
                      }
                    : premium,
            ),
        );
    };

    const handleFacingLabelChange = (id: string, value: string) => {
        setFacingPremiums((prev) =>
            prev.map((premium) => (premium.id === id ? { ...premium, label: value } : premium)),
        );
    };

    const handleAddFacingPremium = () => {
        setFacingPremiums((prev) => [
            ...prev,
            {
                id: `facing-${prev.length + 1}`,
                label: "Custom facing",
                amountPerSft: "0",
                isActive: false,
                isCustom: true,
            },
        ]);
    };

    const handlePositionAmountChange = (id: string, value: string) => {
        setPositionPremiums((prev) =>
            prev.map((premium) =>
                premium.id === id
                    ? {
                          ...premium,
                          amountPerSft: value,
                          isActive: Number(value) > 0,
                      }
                    : premium,
            ),
        );
    };

    const handlePositionLabelChange = (id: string, value: string) => {
        setPositionPremiums((prev) =>
            prev.map((premium) => (premium.id === id ? { ...premium, label: value } : premium)),
        );
    };

    const handleAddPositionPremium = () => {
        setPositionPremiums((prev) => [
            ...prev,
            {
                id: `position-${prev.length + 1}`,
                label: "Custom position",
                amountPerSft: "0",
                isActive: false,
            },
        ]);
    };

    const handleAddTowerOverride = () => {
        setTowerOverrides((prev) => [
            ...prev,
            {
                id: `tower-${prev.length + 1}`,
                towerName: "",
                note: "",
            },
        ]);
    };

    const handleTowerOverrideChange = (id: string, patch: Partial<TowerOverrideRule>) => {
        setTowerOverrides((prev) =>
            prev.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)),
        );
    };

    const handleAddUnitOverride = () => {
        setUnitOverrides((prev) => [
            ...prev,
            {
                id: `unit-${prev.length + 1}`,
                unitLabel: "",
                pricePerSft: "",
            },
        ]);
    };

    const handleUnitOverrideChange = (id: string, patch: Partial<UnitOverrideRule>) => {
        setUnitOverrides((prev) =>
            prev.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)),
        );
    };

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
            router.push("/admin/builder/projects/create/commercials");
        } finally {
            setSavingNext(false);
        }
    };

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Create project</h1>
                            <p className="text-md text-tertiary">Step 4 of 7 · Pricing rules</p>
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
                            <p>Pricing</p>
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
                <div className="w-full max-w-7xl">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
                        <div className="rounded-2xl bg-primary p-4 md:p-6 shadow-xs ring-1 ring-secondary_alt flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold text-primary">Pricing rules engine</h2>
                                <p className="text-sm text-tertiary">
                                    Define pricing logic once. System calculates every unit automatically.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                        Section 1 — Base price
                                    </p>
                                <Input
                                    label="Base price per sft"
                                    hint="₹ per sft"
                                    type="number"
                                    value={basePricePerSft}
                                    onChange={setBasePricePerSft}
                                    placeholder="e.g. 7500"
                                />
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/30 p-3 ring-1 ring-secondary_alt">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                        Section 2 — Floor rise rules
                                    </p>
                                    <p className="text-sm font-medium text-primary">
                                        Visual slabs for real-world floor rise.
                                    </p>
                                    <p className="text-xs text-tertiary">
                                        Add one or more rules like 5–9, 10–14, 15+. System picks the right
                                        slab automatically.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        {floorRules.map((rule) => (
                                            <div
                                                key={rule.id}
                                                className="grid gap-2 rounded-lg bg-primary_hover/40 p-3 ring-1 ring-secondary_alt md:grid-cols-[minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.1fr)]"
                                            >
                                                <Input
                                                    label="From floor"
                                                    type="number"
                                                    value={rule.fromFloor}
                                                    onChange={(value) =>
                                                        handleFloorRuleChange(rule.id, {
                                                            fromFloor: value,
                                                        })
                                                    }
                                                    placeholder="e.g. 5"
                                                />
                                                <Input
                                                    label="To floor"
                                                    hint="Leave blank for 15+"
                                                    type="number"
                                                    value={rule.toFloor}
                                                    onChange={(value) =>
                                                        handleFloorRuleChange(rule.id, {
                                                            toFloor: value,
                                                        })
                                                    }
                                                    placeholder="e.g. 9"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <Input
                                                        label="Increase ₹/sft"
                                                        hint="Per sft in this slab"
                                                        type="number"
                                                        value={rule.increasePerSft}
                                                        onChange={(value) =>
                                                            handleFloorRuleChange(rule.id, {
                                                                increasePerSft: value,
                                                            })
                                                        }
                                                        placeholder="e.g. 25"
                                                    />
                                                    <div className="flex justify-end">
                                                        <Button
                                                            size="sm"
                                                            color="link-gray"
                                                            onClick={() =>
                                                                handleRemoveFloorRule(rule.id)
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={handleAddFloorRule}
                                        >
                                            Add floor rise rule
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/30 p-3 ring-1 ring-secondary_alt">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-quaternary">
                                        Section 3 — Facing &amp; position premiums
                                    </p>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-medium text-primary">
                                                Facing premiums
                                            </p>
                                            <p className="text-xs text-tertiary">
                                                Set per-facing premiums. Leave 0 if no premium.
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                {facingPremiums.map((premium) => (
                                                    <div
                                                        key={premium.id}
                                                        className="flex items-center justify-between gap-2 rounded-lg bg-primary_hover/40 px-3 py-2"
                                                    >
                                                        <div className="flex-1 max-w-xs">
                                                            <Select
                                                                label="Facing label"
                                                                className="**:data-label:hidden"
                                                                placeholder="Select facing"
                                                                size="sm"
                                                                selectedKey={premium.label}
                                                                onSelectionChange={(key) =>
                                                                    handleFacingLabelChange(
                                                                        premium.id,
                                                                        String(key),
                                                                    )
                                                                }
                                                                items={FACING_LABEL_OPTIONS}
                                                            >
                                                                {(item) => (
                                                                    <Select.Item id={item.id}>
                                                                        {item.label}
                                                                    </Select.Item>
                                                                )}
                                                            </Select>
                                                        </div>
                                                        <div className="w-28">
                                                            <Input
                                                                label="₹/sft"
                                                                type="number"
                                                                value={premium.amountPerSft}
                                                                onChange={(value) =>
                                                                    handleFacingAmountChange(
                                                                        premium.id,
                                                                        value,
                                                                    )
                                                                }
                                                                placeholder="e.g. 10"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    onClick={handleAddFacingPremium}
                                                >
                                                    Add facing premium
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-medium text-primary">
                                                Position premiums
                                            </p>
                                            <p className="text-xs text-tertiary">
                                                Corner, garden view, pool etc. Leave 0 if no premium.
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                {positionPremiums.map((premium) => (
                                                    <div
                                                        key={premium.id}
                                                        className="flex items-center justify-between gap-2 rounded-lg bg-primary_hover/40 px-3 py-2"
                                                    >
                                                        <div className="flex-1 max-w-xs">
                                                            <Select
                                                                label="Position label"
                                                                className="**:data-label:hidden"
                                                                placeholder="Select position"
                                                                size="sm"
                                                                selectedKey={premium.label}
                                                                onSelectionChange={(key) =>
                                                                    handlePositionLabelChange(
                                                                        premium.id,
                                                                        String(key),
                                                                    )
                                                                }
                                                                items={POSITION_LABEL_OPTIONS}
                                                            >
                                                                {(item) => (
                                                                    <Select.Item id={item.id}>
                                                                        {item.label}
                                                                    </Select.Item>
                                                                )}
                                                            </Select>
                                                        </div>
                                                        <div className="w-28">
                                                            <Input
                                                                label="₹/sft"
                                                                type="number"
                                                                value={premium.amountPerSft}
                                                                onChange={(value) =>
                                                                    handlePositionAmountChange(
                                                                        premium.id,
                                                                        value,
                                                                    )
                                                                }
                                                                placeholder="e.g. 15"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    onClick={handleAddPositionPremium}
                                                >
                                                    Add position premium
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-3">
                                        <Toggle
                                            size="sm"
                                            isSelected={towerOverridesEnabled}
                                            onChange={setTowerOverridesEnabled}
                                            label="Different pricing for some towers?"
                                        />
                                    </div>
                                    {towerOverridesEnabled && (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-tertiary">
                                                Optional. Premium towers can have their own pricing notes or
                                                overrides.
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                {towerOverrides.map((rule) => (
                                                    <div
                                                        key={rule.id}
                                                        className="grid gap-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]"
                                                    >
                                                        <Input
                                                            label="Tower"
                                                            placeholder="e.g. Tower A"
                                                            value={rule.towerName}
                                                            onChange={(value) =>
                                                                handleTowerOverrideChange(
                                                                    rule.id,
                                                                    { towerName: value },
                                                                )
                                                            }
                                                        />
                                                        <Input
                                                            label="Pricing note"
                                                            hint="e.g. +₹200/sft for sea view"
                                                            value={rule.note}
                                                            onChange={(value) =>
                                                                handleTowerOverrideChange(
                                                                    rule.id,
                                                                    { note: value },
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    onClick={handleAddTowerOverride}
                                                >
                                                    Add tower rule
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/20 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-3">
                                        <Toggle
                                            size="sm"
                                            isSelected={unitOverridesEnabled}
                                            onChange={setUnitOverridesEnabled}
                                            label="Override specific units?"
                                        />
                                    </div>
                                    {unitOverridesEnabled && (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-tertiary">
                                                For penthouses or bulk deals where you set a custom price per
                                                sft.
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                {unitOverrides.map((rule) => (
                                                    <div
                                                        key={rule.id}
                                                        className="grid gap-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]"
                                                    >
                                                        <Input
                                                            label="Unit"
                                                            placeholder="e.g. A1801"
                                                            value={rule.unitLabel}
                                                            onChange={(value) =>
                                                                handleUnitOverrideChange(rule.id, {
                                                                    unitLabel: value,
                                                                })
                                                            }
                                                        />
                                                        <Input
                                                            label="Custom price per sft"
                                                            hint="₹/sft for this unit"
                                                            type="number"
                                                            placeholder="e.g. 12000"
                                                            value={rule.pricePerSft}
                                                            onChange={(value) =>
                                                                handleUnitOverrideChange(rule.id, {
                                                                    pricePerSft: value,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    onClick={handleAddUnitOverride}
                                                >
                                                    Add unit override
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() =>
                                        router.push("/admin/builder/projects/create/units")
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
                                <h2 className="text-sm font-semibold text-primary">
                                    Price simulation panel
                                </h2>
                                <p className="text-xs text-tertiary">
                                    Live example so builder sees the rule engine working instantly.
                                </p>
                            </div>

                            <div className="rounded-xl bg-secondary/40 px-3 py-3 flex flex-col gap-1">
                                <p className="text-xs font-medium text-primary">
                                    Unit {SAMPLE_UNIT_LABEL} · Floor {sampleFloor}
                                </p>
                                <p className="text-sm font-semibold text-primary">
                                    Final price = {formatCurrency(finalPricePerSft)} /sft
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 rounded-xl bg-secondary/20 px-3 py-3 text-xs text-tertiary">
                                <div className="flex items-center justify-between">
                                    <span>Base price</span>
                                    <span>
                                        <span className="font-medium text-primary">
                                            {formatCurrency(baseComponentValue)} /sft
                                        </span>
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Floor rise</span>
                                    <span>
                                        <span className="font-medium text-primary">
                                            +{formatCurrency(floorRiseDeltaPerSft)} /sft
                                        </span>
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Facing premium</span>
                                    <span>
                                        <span className="font-medium text-primary">
                                            +{formatCurrency(facingDeltaPerSft)} /sft
                                        </span>
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Position premiums</span>
                                    <span>
                                        <span className="font-medium text-primary">
                                            +{formatCurrency(positionDeltaPerSft)} /sft
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

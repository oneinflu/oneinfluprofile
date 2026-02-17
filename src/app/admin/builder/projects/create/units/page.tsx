"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";

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

type ProjectType = "gated-community" | "villa" | "individual-building";

type UnitType = {
    id: string;
    label: string;
    unitsCount: number;
    facingPremiumPerSft?: number;
    positionPremiumPerSft?: number;
    floorPlanFiles: Array<{ file: File; url: string }>;
};

type GeneratedUnit = {
    id: string;
    number: string;
    typeId: string;
    label: string;
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

const defaultUnitTypes: UnitType[] = [
    { id: "east", label: "East facing", unitsCount: 6, floorPlanFiles: [] },
    { id: "west", label: "West facing", unitsCount: 6, floorPlanFiles: [] },
];

export default function CreateProjectUnitsPage() {
    const router = useRouter();

    const [projectType, setProjectType] = useState<ProjectType | null>(null);
    const [villaFloors, setVillaFloors] = useState("2");
    const [villaHasHomeTheatre, setVillaHasHomeTheatre] = useState(false);
    const [villaHasPrivateLift, setVillaHasPrivateLift] = useState(false);
    const [villaHasRooftopDeck, setVillaHasRooftopDeck] = useState(false);
    const [premiumLabel1, setPremiumLabel1] = useState("Facing premium (₹ / sft)");
    const [premiumLabel2, setPremiumLabel2] = useState("Position premium (₹ / sft)");

    const [unitNumberStart, setUnitNumberStart] = useState("101");
    const [unitTypes, setUnitTypes] = useState<UnitType[]>(defaultUnitTypes);
    const [mortgagedUnitIds, setMortgagedUnitIds] = useState<Set<string>>(new Set());

    const [savingDraft, setSavingDraft] = useState(false);
    const [savingNext, setSavingNext] = useState(false);

    const currentStepIndex = steps.indexOf("Units" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    const unitNumberStartInt = Number.isNaN(Number(unitNumberStart)) ? 0 : Number(unitNumberStart);

    const generatedUnits: GeneratedUnit[] = useMemo(() => {
        const all: GeneratedUnit[] = [];
        let currentNumber = unitNumberStartInt;
        unitTypes.forEach((type) => {
            for (let i = 0; i < Math.max(0, type.unitsCount); i += 1) {
                all.push({
                    id: `${type.id}-${i}`,
                    number: String(currentNumber),
                    typeId: type.id,
                    label: type.label,
                });
                currentNumber += 1;
            }
        });
        return all;
    }, [unitNumberStartInt, unitTypes]);

    const totalUnits = generatedUnits.length;

    const canSaveNext = totalUnits > 0 && unitNumberStartInt > 0;

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.localStorage.getItem(DRAFT_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            const type = parsed?.projectInfo?.projectType as ProjectType | undefined;
            if (
                type === "gated-community" ||
                type === "villa" ||
                type === "individual-building"
            ) {
                setProjectType(type);
            }
            const villaConfig = parsed?.units?.villaConfig;
            if (villaConfig) {
                if (typeof villaConfig.floorsPerVilla === "number") {
                    setVillaFloors(String(villaConfig.floorsPerVilla));
                }
                if (typeof villaConfig.hasHomeTheatre === "boolean") {
                    setVillaHasHomeTheatre(villaConfig.hasHomeTheatre);
                }
                if (typeof villaConfig.hasPrivateLift === "boolean") {
                    setVillaHasPrivateLift(villaConfig.hasPrivateLift);
                }
                if (typeof villaConfig.hasRooftopDeck === "boolean") {
                    setVillaHasRooftopDeck(villaConfig.hasRooftopDeck);
                }
            }
            const premiumLabels = parsed?.units?.premiumLabels;
            if (premiumLabels) {
                if (typeof premiumLabels.label1 === "string") {
                    setPremiumLabel1(premiumLabels.label1);
                }
                if (typeof premiumLabels.label2 === "string") {
                    setPremiumLabel2(premiumLabels.label2);
                }
            }
        } catch {
        }
    }, []);

    useEffect(() => {
        updateDraft({
            units: {
                totalUnits,
                mortgagedUnits: mortgagedUnitIds.size,
                unitTypes: unitTypes.map((type) => ({
                    id: type.id,
                    label: type.label,
                    unitsCount: type.unitsCount,
                    facingPremiumPerSft: type.facingPremiumPerSft ?? 0,
                    positionPremiumPerSft: type.positionPremiumPerSft ?? 0,
                })),
                ...(projectType === "villa"
                    ? {
                          villaConfig: {
                              floorsPerVilla: Number.isNaN(Number(villaFloors))
                                  ? 0
                                  : Number(villaFloors),
                              hasHomeTheatre: villaHasHomeTheatre,
                              hasPrivateLift: villaHasPrivateLift,
                              hasRooftopDeck: villaHasRooftopDeck,
                          },
                      }
                    : {}),
                premiumLabels: {
                    label1: premiumLabel1,
                    label2: premiumLabel2,
                },
            },
        });
    }, [
        totalUnits,
        mortgagedUnitIds,
        projectType,
        villaFloors,
        villaHasHomeTheatre,
        villaHasPrivateLift,
        villaHasRooftopDeck,
        premiumLabel1,
        premiumLabel2,
    ]);

    const handleUnitTypeChange = (id: string, patch: Partial<UnitType>) => {
        setUnitTypes((prev) =>
            prev.map((type) =>
                type.id === id
                    ? {
                          ...type,
                          ...patch,
                          unitsCount:
                              typeof patch.unitsCount === "number"
                                  ? Math.max(0, patch.unitsCount)
                                  : type.unitsCount,
                      }
                    : type,
            ),
        );
    };

    const handleRemoveUnitType = (id: string) => {
        setUnitTypes((prev) => {
            if (prev.length <= 1) return prev;
            return prev.filter((type) => type.id !== id);
        });
    };

    const handleFloorPlanFilesChange = (id: string, files: Array<{ file: File; url: string }>) => {
        setUnitTypes((prev) =>
            prev.map((type) => (type.id === id ? { ...type, floorPlanFiles: files } : type)),
        );
    };

    const toggleMortgagedUnit = (unitId: string) => {
        setMortgagedUnitIds((prev) => {
            const next = new Set(prev);
            if (next.has(unitId)) {
                next.delete(unitId);
            } else {
                next.add(unitId);
            }
            return next;
        });
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
            router.push("/admin/builder/projects/create/pricing");
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
                            <p className="text-md text-tertiary">
                                Step 3 of 7 ·{" "}
                                {projectType === "villa" ? "Villa configuration" : "Unit configuration"}
                            </p>
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
                            <p>Units</p>
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
                                <h2 className="text-lg font-semibold text-primary">
                                    {projectType === "villa" ? "Villa configuration" : "Unit configuration"}
                                </h2>
                                <p className="text-sm text-tertiary">
                                    {projectType === "villa"
                                        ? "Define villa details and unit logic once. System generates one unit per villa."
                                        : "Define unit logic once. System generates all units automatically."}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {projectType === "villa" && (
                                    <div className="flex flex-col gap-3 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-primary">
                                                Villa details
                                            </p>
                                            <p className="text-xs text-tertiary">
                                                Common structure and amenities for villas in this project.
                                            </p>
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <Input
                                                label="Floors per villa"
                                                type="number"
                                                value={villaFloors}
                                                onChange={setVillaFloors}
                                                placeholder="e.g. 3"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <p className="text-xs font-medium text-primary">
                                                    Villa amenities
                                                </p>
                                                <div className="grid gap-1.5">
                                                    <Checkbox
                                                        isSelected={villaHasHomeTheatre}
                                                        onChange={setVillaHasHomeTheatre}
                                                        label="Home theatre"
                                                    />
                                                    <Checkbox
                                                        isSelected={villaHasPrivateLift}
                                                        onChange={setVillaHasPrivateLift}
                                                        label="Private lift"
                                                    />
                                                    <Checkbox
                                                        isSelected={villaHasRooftopDeck}
                                                        onChange={setVillaHasRooftopDeck}
                                                        label="Rooftop deck / terrace"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Input
                                    label="Unit numbering start"
                                    hint="First unit number in the project (e.g. 101)"
                                    type="number"
                                    value={unitNumberStart}
                                    onChange={(v) => setUnitNumberStart(v)}
                                    placeholder="101"
                                />

                                <div className="flex flex-col gap-3">
                                    <p className="text-sm font-medium text-primary">Facing options</p>
                                    <p className="text-xs text-tertiary">
                                        Set how many units you want per facing, along with optional
                                        facing and position premiums. You will attach floor plans for
                                        each type.
                                    </p>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        <Input
                                            label="Premium label 1"
                                            value={premiumLabel1}
                                            onChange={setPremiumLabel1}
                                            placeholder="e.g. Facing premium (₹ / sft)"
                                        />
                                        <Input
                                            label="Premium label 2"
                                            value={premiumLabel2}
                                            onChange={setPremiumLabel2}
                                            placeholder="e.g. Position premium (₹ / sft)"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {unitTypes.map((type) => (
                                            <div
                                                key={type.id}
                                                className="flex flex-col gap-3 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-medium text-primary">
                                                        Facing configuration
                                                    </p>
                                                    {unitTypes.length > 1 && (
                                                        <Button
                                                            size="sm"
                                                            color="link-destructive"
                                                            onClick={() => handleRemoveUnitType(type.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="grid gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                                                    <Input
                                                        label="Facing label"
                                                        value={type.label}
                                                        onChange={(v) =>
                                                            handleUnitTypeChange(type.id, { label: v })
                                                        }
                                                    />
                                                    <Input
                                                        label="Units per facing"
                                                        type="number"
                                                        value={String(
                                                            Number.isNaN(type.unitsCount)
                                                                ? ""
                                                                : type.unitsCount,
                                                        )}
                                                        onChange={(v) =>
                                                            handleUnitTypeChange(type.id, {
                                                                unitsCount: Number(v) || 0,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                <div className="grid gap-3 md:grid-cols-2">
                                                    <Input
                                                        label={premiumLabel1 || "Premium 1"}
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={
                                                            typeof type.facingPremiumPerSft === "number"
                                                                ? String(type.facingPremiumPerSft)
                                                                : ""
                                                        }
                                                        onChange={(v) =>
                                                            handleUnitTypeChange(type.id, {
                                                                facingPremiumPerSft: Number(v) || 0,
                                                            })
                                                        }
                                                        placeholder="e.g. 100"
                                                    />
                                                    <Input
                                                        label={premiumLabel2 || "Premium 2"}
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={
                                                            typeof type.positionPremiumPerSft === "number"
                                                                ? String(type.positionPremiumPerSft)
                                                                : ""
                                                        }
                                                        onChange={(v) =>
                                                            handleUnitTypeChange(type.id, {
                                                                positionPremiumPerSft: Number(v) || 0,
                                                            })
                                                        }
                                                        placeholder="e.g. 75"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <p className="text-xs font-medium text-primary">
                                                        Floor plan image
                                                    </p>
                                                    <p className="text-[11px] text-tertiary">
                                                        Upload the floor plan visual for this unit type.
                                                    </p>
                                                    <FileUpload.Root>
                                                        <FileUpload.DropZone
                                                            accept="image/*"
                                                            allowsMultiple={false}
                                                            onDropFiles={(files) => {
                                                                const mapped = Array.from(files || []).map(
                                                                    (file) => ({
                                                                        file,
                                                                        url: URL.createObjectURL(file),
                                                                    }),
                                                                );
                                                                handleFloorPlanFilesChange(
                                                                    type.id,
                                                                    mapped,
                                                                );
                                                            }}
                                                        />
                                                        {type.floorPlanFiles.length > 0 && (
                                                            <FileUpload.List>
                                                                {type.floorPlanFiles.map((file, index) => (
                                                                    <FileUpload.ListItemProgressBar
                                                                        key={index}
                                                                        name={file.file.name}
                                                                        size={file.file.size}
                                                                        progress={100}
                                                                        onDelete={() =>
                                                                            handleFloorPlanFilesChange(
                                                                                type.id,
                                                                                type.floorPlanFiles.filter(
                                                                                    (_, i) =>
                                                                                        i !== index,
                                                                                ),
                                                                            )
                                                                        }
                                                                    />
                                                                ))}
                                                            </FileUpload.List>
                                                        )}
                                                    </FileUpload.Root>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() =>
                                        router.push("/admin/builder/projects/create/structure")
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
                                <h2 className="text-sm font-semibold text-primary">Units &amp; mortgage</h2>
                                <p className="text-xs text-tertiary">
                                    Auto-generated units based on your logic. Click units to mark as
                                    mortgaged.
                                </p>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-secondary/40 px-3 py-2 text-xs text-tertiary">
                                <span>Total units</span>
                                <span className="text-md font-semibold text-primary">{totalUnits}</span>
                            </div>

                            {generatedUnits.length === 0 ? (
                                <div className="rounded-xl bg-secondary/30 px-3 py-4 text-xs text-tertiary">
                                    Set a starting unit number and units per facing to see generated
                                    units.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <p className="text-[11px] font-medium text-primary uppercase tracking-wide">
                                        Mortgage units selector
                                    </p>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                        {generatedUnits.map((unit) => (
                                            <Checkbox
                                                key={unit.id}
                                                hideIndicator
                                                isSelected={mortgagedUnitIds.has(unit.id)}
                                                onChange={() => toggleMortgagedUnit(unit.id)}
                                                className={({ isSelected }) =>
                                                    [
                                                        "flex h-12 flex-col items-center justify-center rounded-md border text-xs",
                                                        "cursor-pointer px-1 text-center transition-colors",
                                                        isSelected
                                                            ? "border-brand-solid bg-brand-subtle text-brand-solid"
                                                            : "border-secondary bg-primary_hover text-secondary hover:border-brand-secondary hover:bg-brand-subtle/40",
                                                    ].join(" ")
                                                }
                                                label={
                                                    <div className="flex flex-col items-center gap-0.5">
                                                        <span className="font-semibold text-[11px]">
                                                            {unit.number}
                                                        </span>
                                                        <span className="text-[10px] text-tertiary">
                                                            {unit.label}
                                                        </span>
                                                    </div>
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

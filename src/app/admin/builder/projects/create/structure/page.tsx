"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
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

type ProjectType = "gated-community" | "villa" | "individual-building";

type TowerConfig = {
    id: string;
    name: string;
    floors: number;
    unitsPerFloor: number;
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

const getTowerLabel = (index: number) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (index < letters.length) return `Tower ${letters[index]}`;
    return `Tower ${index + 1}`;
};

const createTowers = (count: number, floors: number, unitsPerFloor: number): TowerConfig[] => {
    return Array.from({ length: Math.max(0, count) }, (_, index) => ({
        id: String(index),
        name: getTowerLabel(index),
        floors: Math.max(0, floors),
        unitsPerFloor: Math.max(0, unitsPerFloor),
    }));
};

export default function CreateProjectStructurePage() {
    const router = useRouter();

    const [projectType, setProjectType] = useState<ProjectType | null>(null);
    const [towerCountInput, setTowerCountInput] = useState<string>("3");
    const [villaCountInput, setVillaCountInput] = useState<string>("40");
    const [applySameConfig, setApplySameConfig] = useState(true);
    const [globalFloors, setGlobalFloors] = useState<string>("15");
    const [globalUnits, setGlobalUnits] = useState<string>("12");

    const [towers, setTowers] = useState<TowerConfig[]>(() =>
        createTowers(3, Number(globalFloors) || 0, Number(globalUnits) || 0),
    );

    const [savingDraft, setSavingDraft] = useState(false);
    const [savingNext, setSavingNext] = useState(false);

    const currentStepIndex = steps.indexOf("Structure" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    const towerCount = Math.max(0, Number.isNaN(Number(towerCountInput)) ? 0 : Number(towerCountInput));

    const villaCount = Math.max(0, Number.isNaN(Number(villaCountInput)) ? 0 : Number(villaCountInput));

    const safeFloors = Math.max(0, Number.isNaN(Number(globalFloors)) ? 0 : Number(globalFloors));
    const safeUnits = Math.max(0, Number.isNaN(Number(globalUnits)) ? 0 : Number(globalUnits));

    const handleTowerCountChange = (value: string) => {
        if (projectType === "villa" || projectType === "individual-building") {
            return;
        }
        setTowerCountInput(value);
        const nextCount = Math.max(0, Number.isNaN(Number(value)) ? 0 : Number(value));
        if (nextCount === 0) {
            setTowers([]);
            return;
        }
        setTowers((prev) => {
            if (applySameConfig) {
                return createTowers(nextCount, safeFloors, safeUnits);
            }
            const existing = prev.slice(0, nextCount);
            if (existing.length < nextCount) {
                const toAdd = createTowers(nextCount - existing.length, 0, 0).map((tower, index) => ({
                    ...tower,
                    id: String(existing.length + index),
                }));
                return [...existing, ...toAdd];
            }
            return existing;
        });
    };

    const handleGlobalFloorsChange = (value: string) => {
        setGlobalFloors(value);
        const parsed = Math.max(0, Number.isNaN(Number(value)) ? 0 : Number(value));
        if (!applySameConfig) return;
        setTowers((prev) => prev.map((tower) => ({ ...tower, floors: parsed })));
    };

    const handleGlobalUnitsChange = (value: string) => {
        setGlobalUnits(value);
        const parsed = Math.max(0, Number.isNaN(Number(value)) ? 0 : Number(value));
        if (!applySameConfig) return;
        setTowers((prev) => prev.map((tower) => ({ ...tower, unitsPerFloor: parsed })));
    };

    const handleToggleApplySame = (selected: boolean) => {
        setApplySameConfig(selected);
        if (selected) {
            const parsedFloors = Math.max(0, Number.isNaN(Number(globalFloors)) ? 0 : Number(globalFloors));
            const parsedUnits = Math.max(0, Number.isNaN(Number(globalUnits)) ? 0 : Number(globalUnits));
            setTowers((prev) => prev.map((tower) => ({ ...tower, floors: parsedFloors, unitsPerFloor: parsedUnits })));
        }
    };

    const handleTowerUpdate = (id: string, patch: Partial<TowerConfig>) => {
        setTowers((prev) =>
            prev.map((tower) =>
                tower.id === id
                    ? {
                          ...tower,
                          ...patch,
                          floors:
                              typeof patch.floors === "number"
                                  ? Math.max(0, patch.floors)
                                  : tower.floors,
                          unitsPerFloor:
                              typeof patch.unitsPerFloor === "number"
                                  ? Math.max(0, patch.unitsPerFloor)
                                  : tower.unitsPerFloor,
                      }
                    : tower,
            ),
        );
    };

    const totalUnits = useMemo(
        () =>
            projectType === "villa"
                ? villaCount
                : towers.reduce((sum, t) => sum + t.floors * t.unitsPerFloor, 0),
        [projectType, villaCount, towers],
    );

    const canSaveNext =
        projectType === "villa"
            ? villaCount > 0
            : towers.length > 0 &&
              towers.every((t) => t.floors > 0 && t.unitsPerFloor > 0);

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
                if (type === "villa") {
                    setTowerCountInput("0");
                    setTowers([]);
                } else if (type === "individual-building") {
                    const initialFloors = Number.isNaN(Number(globalFloors))
                        ? 0
                        : Number(globalFloors);
                    const initialUnits = Number.isNaN(Number(globalUnits))
                        ? 0
                        : Number(globalUnits);
                    setTowerCountInput("1");
                    setTowers(createTowers(1, initialFloors, initialUnits));
                }
            }
        } catch {
        }
    }, [globalFloors, globalUnits]);

    useEffect(() => {
        if (projectType === "villa") {
            updateDraft({
                structure: {
                    projectType: "villa",
                    villaCount,
                    towerCount: 0,
                    floorsPerTower: 0,
                    unitsPerFloor: 0,
                    totalUnits,
                },
            });
        } else {
            updateDraft({
                structure: {
                    projectType,
                    towerCount,
                    floorsPerTower: safeFloors,
                    unitsPerFloor: safeUnits,
                    totalUnits,
                },
            });
        }
    }, [projectType, towerCount, safeFloors, safeUnits, totalUnits, villaCount]);

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
            router.push("/admin/builder/projects/create/units");
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
                            <p className="text-md text-tertiary">Step 2 of 7 · Towers &amp; floors</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" color="secondary" isLoading={savingDraft} onClick={handleSaveDraft}>
                                Save draft
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-tertiary">
                            <p>Structure</p>
                            <p>
                                Step {currentStepIndex + 1} of {steps.length}
                            </p>
                        </div>
                        <ProgressBarBase value={progressValue} />
                        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-quaternary uppercase tracking-wide">
                            {steps.map((step, index) => (
                                <span
                                    key={step}
                                    className={index === currentStepIndex ? "font-semibold text-brand-secondary" : "text-quaternary"}
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
                                <h2 className="text-lg font-semibold text-primary">Towers &amp; floors setup</h2>
                                <p className="text-sm text-tertiary">
                                    Define structure quickly. Simple projects stay fast, complex projects stay flexible.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {projectType === "villa" ? (
                                    <>
                                        <Input
                                            label="Number of villas"
                                            type="number"
                                            value={villaCountInput}
                                            onChange={setVillaCountInput}
                                            placeholder="e.g. 40"
                                        />
                                        <div className="rounded-xl bg-secondary/30 px-3 py-3 text-xs text-tertiary">
                                            This is a villa project. You do not need towers or floors,
                                            but the system will still generate one unit per villa in
                                            the next step.
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            label="How many towers?"
                                            type="number"
                                            value={
                                                projectType === "individual-building"
                                                    ? "1"
                                                    : towerCountInput
                                            }
                                            onChange={handleTowerCountChange}
                                            placeholder="e.g. 3"
                                            isDisabled={projectType === "individual-building"}
                                        />

                                        <div className="flex items-center justify-between gap-3">
                                            <Toggle
                                                size="sm"
                                                isSelected={applySameConfig}
                                                onChange={handleToggleApplySame}
                                                label="Apply same config to all towers"
                                                hint="Turn off to edit each tower individually"
                                            />
                                        </div>

                                        {applySameConfig && (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <Input
                                                    label={
                                                        projectType === "individual-building"
                                                            ? "Floors in building"
                                                            : "Floors per tower"
                                                    }
                                                    type="number"
                                                    value={globalFloors}
                                                    onChange={handleGlobalFloorsChange}
                                                    placeholder="e.g. 15"
                                                />
                                                <Input
                                                    label="Units per floor"
                                                    type="number"
                                                    value={globalUnits}
                                                    onChange={handleGlobalUnitsChange}
                                                    placeholder="e.g. 12"
                                                />
                                            </div>
                                        )}

                                        {towers.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                <p className="text-sm font-medium text-primary">
                                                    {projectType === "individual-building"
                                                        ? "Building"
                                                        : "Towers"}
                                                </p>
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    {towers.map((tower) => (
                                                        <div
                                                            key={tower.id}
                                                            className="flex flex-col gap-3 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt"
                                                        >
                                                            <Input
                                                                label={
                                                                    projectType ===
                                                                    "individual-building"
                                                                        ? "Building name"
                                                                        : "Tower name"
                                                                }
                                                                value={tower.name}
                                                                onChange={(v) =>
                                                                    handleTowerUpdate(tower.id, {
                                                                        name: v,
                                                                    })
                                                                }
                                                            />
                                                            {!applySameConfig && (
                                                                <div className="grid gap-3 grid-cols-2">
                                                                    <Input
                                                                        label="Floors"
                                                                        type="number"
                                                                        value={String(
                                                                            Number.isNaN(
                                                                                tower.floors,
                                                                            )
                                                                                ? ""
                                                                                : tower.floors,
                                                                        )}
                                                                        onChange={(v) =>
                                                                            handleTowerUpdate(
                                                                                tower.id,
                                                                                {
                                                                                    floors:
                                                                                        Number(
                                                                                            v,
                                                                                        ) || 0,
                                                                                },
                                                                            )
                                                                        }
                                                                    />
                                                                    <Input
                                                                        label="Units/floor"
                                                                        type="number"
                                                                        value={String(
                                                                            Number.isNaN(
                                                                                tower.unitsPerFloor,
                                                                            )
                                                                                ? ""
                                                                                : tower
                                                                                      .unitsPerFloor,
                                                                        )}
                                                                        onChange={(v) =>
                                                                            handleTowerUpdate(
                                                                                tower.id,
                                                                                {
                                                                                    unitsPerFloor:
                                                                                        Number(
                                                                                            v,
                                                                                        ) || 0,
                                                                                },
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() => router.push("/admin/builder/projects/create")}
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
                                <h2 className="text-sm font-semibold text-primary">Structure preview</h2>
                                <p className="text-xs text-tertiary">
                                    {projectType === "villa"
                                        ? "High-level view of total villas in this project."
                                        : "Live view of towers, floors, and total units. No math needed."}
                                </p>
                            </div>

                            <div className="rounded-xl bg-secondary/40 px-3 py-2 flex items-center justify-between">
                                <p className="text-xs text-tertiary">
                                    {projectType === "villa" ? "Total villas" : "Total units"}
                                </p>
                                <p className="text-md font-semibold text-primary">
                                    {totalUnits}
                                </p>
                            </div>

                            {projectType === "villa" ? (
                                <div className="rounded-xl bg-secondary/30 px-3 py-4 text-xs text-tertiary">
                                    This preview shows the total villas configured. Detailed villa
                                    units will be generated in the next step.
                                </div>
                            ) : towers.length === 0 ? (
                                <div className="rounded-xl bg-secondary/30 px-3 py-4 text-xs text-tertiary">
                                    Set number of towers to see a visual layout.
                                </div>
                            ) : (
                                <div className="flex gap-3 items-end">
                                    {towers.map((tower) => {
                                        const maxFloors =
                                            towers.reduce(
                                                (max, t) => (t.floors > max ? t.floors : max),
                                                0,
                                            ) || 1;
                                        const heightPercent = (tower.floors / maxFloors) * 100;
                                        return (
                                            <div
                                                key={tower.id}
                                                className="flex flex-1 flex-col items-center gap-1"
                                            >
                                                <div className="flex h-40 w-10 items-end rounded-md bg-secondary/40 p-1">
                                                    <div
                                                        className="w-full rounded-md bg-brand-primary/80"
                                                        style={{ height: `${heightPercent}%` }}
                                                    />
                                                </div>
                                                <p className="text-[11px] font-medium text-primary">
                                                    {tower.name}
                                                </p>
                                                <p className="text-[11px] text-tertiary">
                                                    {tower.floors} floors ·{" "}
                                                    {tower.unitsPerFloor} units
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

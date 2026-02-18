"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Tabs } from "@/components/application/tabs/tabs";
import { Select } from "@/components/base/select/select";
import type { SelectItemType } from "@/components/base/select/select-context";
import { SelectItem } from "@/components/base/select/select-item";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { Plus, ChevronLeft, ChevronRight, ArrowLeft } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { ModalOverlay as SlideoutOverlay, Modal as SlideoutModal, Dialog as SlideoutDialog } from "@/components/application/slideout-menus/slideout-menu";

export default function ConstructionUpdatesPage() {
    const [project, setProject] = useState<"altius" | "valley" | "heights" | null>(null);
    const [tower, setTower] = useState<string | null>(null);
    const [floor, setFloor] = useState<string | null>(null);

    type Unit = { id: string; label: string; percent: number };
    type FloorT = { id: string; label: string; percent: number; units: Unit[] };
    type TowerT = { id: string; name: string; percent: number; floors: FloorT[] };

    const progressData = useMemo<TowerT[]>(() => {
        const makeUnits = (count: number, base: number) =>
            Array.from({ length: count }, (_v, i) => {
                const p = Math.min(100, Math.max(5, base + (i % 5) * 7));
                return { id: `u${i + 1}`, label: `${100 + i}`, percent: p };
            });
        const makeFloors = (labels: string[], base: number): FloorT[] =>
            labels.map((label, i) => {
                const p = Math.min(100, Math.max(5, base + i * 6));
                return { id: `f${label}`, label, percent: p, units: makeUnits(8, p - 10) };
            });
        const towers: TowerT[] = [
            { id: "t1", name: "Tower 1", percent: 34, floors: makeFloors(["G", "1", "2", "3", "4", "5"], 20) },
            { id: "t2", name: "Tower 2", percent: 58, floors: makeFloors(["G", "1", "2", "3", "4", "5", "6"], 35) },
            { id: "t3", name: "Tower 3", percent: 72, floors: makeFloors(["G", "1", "2", "3", "4"], 50) },
            { id: "t4", name: "Tower 4", percent: 15, floors: makeFloors(["G", "1", "2"], 10) },
        ];
        return towers;
    }, [project]);

    const [level, setLevel] = useState<"towers" | "floors" | "units" | "unit">("towers");
    const [activeTowerId, setActiveTowerId] = useState<string | null>(null);
    const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
    const [activeUnit, setActiveUnit] = useState<Unit | null>(null);

    const activeTower = useMemo(() => progressData.find((t) => t.id === activeTowerId), [progressData, activeTowerId]);
    const activeFloor = useMemo(() => activeTower?.floors.find((f) => f.id === activeFloorId), [activeTower, activeFloorId]);

    const goBack = () => {
        if (level === "unit") {
            setLevel("units");
            setActiveUnit(null);
            return;
        }
        if (level === "units") {
            setLevel("floors");
            return;
        }
        if (level === "floors") {
            setLevel("towers");
            setActiveTowerId(null);
            setActiveFloorId(null);
        }
    };

    const towerItems: SelectItemType[] = useMemo(
        () => [
            { id: "all", label: "All Towers" },
            { id: "t1", label: "Tower 1" },
            { id: "t2", label: "Tower 2" },
            { id: "t3", label: "Tower 3" },
        ],
        [],
    );
    const floorItems: SelectItemType[] = useMemo(
        () => [
            { id: "all", label: "All Floors" },
            { id: "g", label: "Ground" },
            { id: "1", label: "1" },
            { id: "2", label: "2" },
            { id: "3", label: "3" },
            { id: "4", label: "4" },
        ],
        [],
    );

    const updates = useMemo(() => {
        const now = Date.now();
        const demo: Array<{
            id: string;
            by: { name: string; role: string; initials?: string };
            stage: string;
            tower: string;
            floor: string;
            media: string[];
            notes: string;
            ts: number;
            visibility: "buyer" | "internal";
        }> = [
            {
                id: "u1",
                by: { name: "Arun Kumar", role: "Engineer", initials: "AK" },
                stage: "Slab",
                tower: "Tower 1",
                floor: "3",
                media: [
                    "https://images.unsplash.com/photo-1504306662894-8b65bb6a8fc5?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
                ],
                notes: "RCC slab poured for T1-F3. Curing in progress. Safety barricades placed.",
                ts: now - 30 * 60 * 1000,
                visibility: "buyer",
            },
            {
                id: "u2",
                by: { name: "Meera Shah", role: "Site Lead", initials: "MS" },
                stage: "Electrical",
                tower: "Tower 2",
                floor: "9",
                media: [
                    "https://images.unsplash.com/photo-1581092925635-91966f2d5943?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1523419409543-aef283f20f91?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
                ],
                notes: "Conduit laid for living room and bedrooms. Panel testing scheduled tomorrow.",
                ts: now - 2 * 60 * 60 * 1000,
                visibility: "internal",
            },
            {
                id: "u3",
                by: { name: "Vikram Teja", role: "Engineer", initials: "VT" },
                stage: "Painting",
                tower: "Tower 1",
                floor: "2",
                media: [
                    "https://images.unsplash.com/photo-1517249361621-f11084eb8a4a?q=80&w=800&auto=format&fit=crop",
                ],
                notes: "Primer applied. Top coat scheduled for evening shift.",
                ts: now - 26 * 60 * 60 * 1000,
                visibility: "buyer",
            },
            {
                id: "u4",
                by: { name: "Riya Sen", role: "Quality", initials: "RS" },
                stage: "QC",
                tower: "Tower 3",
                floor: "G",
                media: [
                    "https://images.unsplash.com/photo-1581090468600-9e5ff50a32d7?q=80&w=800&auto=format&fit=crop",
                ],
                notes: "Entrance lobby joints checked. Minor rework raised.",
                ts: now - 28 * 60 * 60 * 1000,
                visibility: "internal",
            },
        ];
        return demo.sort((a, b) => b.ts - a.ts);
    }, []);

    const groupedByDate = useMemo(() => {
        const fmt = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" });
        const groups: Record<string, typeof updates> = {};
        for (const u of updates) {
            const k = fmt.format(new Date(u.ts));
            (groups[k] ||= []).push(u);
        }
        const ordered = Object.entries(groups).sort(
            (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime(),
        );
        return ordered;
    }, [updates]);

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 border-b border-secondary bg-primary/95 px-4 pb-4 pt-6 backdrop-blur md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                            <h1 className="text-display-sm font-semibold text-primary">Construction &amp; Updates</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button size="sm" iconLeading={Plus}>
                                + Add Update
                            </Button>
                            <div className="hidden h-6 w-px bg-secondary md:block" />
                            <Select
                                size="sm"
                                aria-label="Filter by tower"
                                selectedKey={tower}
                                onSelectionChange={(k) => setTower(String(k))}
                                items={towerItems}
                                className="min-w-[160px]"
                                isDisabled={!project}
                            >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                            </Select>
                            <Select
                                size="sm"
                                aria-label="Filter by floor"
                                selectedKey={floor}
                                onSelectionChange={(k) => setFloor(String(k))}
                                items={floorItems}
                                className="min-w-[140px]"
                                isDisabled={!project}
                            >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                            </Select>
                            <DateRangePicker isDisabled={!project} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 pb-12 pt-4 md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    <div className="flex flex-wrap items-center gap-2">
                        {[
                            { id: "altius", label: "Altius" },
                            { id: "valley", label: "Valley" },
                            { id: "heights", label: "Heights" },
                        ].map((p) => {
                            const active = project === (p.id as typeof project);
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => {
                                        setProject(p.id as typeof project);
                                        setTower(null);
                                        setFloor(null);
                                    }}
                                    className={
                                        active
                                            ? "inline-flex items-center rounded-full border border-brand-primary bg-brand-primary px-3 py-1 text-xs font-semibold text-primary shadow-xs"
                                            : "inline-flex items-center rounded-full border border-secondary bg-primary_hover px-3 py-1 text-xs font-medium text-secondary hover:bg-secondary/40"
                                    }
                                >
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>
                    {!project ? (
                        <div className="mt-4 rounded-2xl bg-primary p-6 text-center text-sm text-tertiary ring-1 ring-secondary_alt">
                            Select a project to view and manage construction updates.
                        </div>
                    ) : (
                    <Tabs defaultSelectedKey={"progress"} className="mt-4">
                        <Tabs.List
                            aria-label="Construction update sections"
                            type="button-border"
                            items={[
                                { id: "progress", children: "Construction Progress" },
                                { id: "repairs", children: "Repairs & Maintenance" },
                                { id: "custom", children: "Buyer Custom Changes" },
                            ]}
                        />
                        <Tabs.Panel id="progress" className="mt-4">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold text-secondary">Site Progress</p>
                                    {level !== "towers" && (
                                        <Button size="sm" color="secondary" iconLeading={ArrowLeft} onClick={goBack}>
                                            Back
                                        </Button>
                                    )}
                                </div>
                                <div className="mt-3">
                                    {level === "towers" && (
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {progressData.map((t) => (
                                                <BlockTile
                                                    key={t.id}
                                                    label={t.name}
                                                    percent={t.percent}
                                                    onClick={() => {
                                                        setActiveTowerId(t.id);
                                                        setLevel("floors");
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    {level === "floors" && activeTower && (
                                        <>
                                            <div className="mb-2 text-2xs text-tertiary">Towers / <span className="text-secondary">{activeTower.name}</span></div>
                                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                                {activeTower.floors.map((f) => (
                                                    <BlockTile
                                                        key={f.id}
                                                        label={`Floor ${f.label}`}
                                                        percent={f.percent}
                                                        onClick={() => {
                                                            setActiveFloorId(f.id);
                                                            setLevel("units");
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {level === "units" && activeTower && activeFloor && (
                                        <>
                                            <div className="mb-2 text-2xs text-tertiary">
                                                Towers / <button className="text-secondary hover:underline" onClick={() => setLevel("floors")}>{activeTower.name}</button> / <span className="text-secondary">Floor {activeFloor.label}</span>
                                            </div>
                                            <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                                                {activeFloor.units.map((u) => (
                                                    <BlockTile
                                                        key={u.id}
                                                        label={u.label}
                                                        percent={u.percent}
                                                        dense
                                                        onClick={() => {
                                                            setActiveUnit(u);
                                                            setLevel("unit");
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold text-secondary">Construction Progress</p>
                                    <div className="text-2xs text-tertiary">{tower ? tower : "All Towers"} • {floor ? `Floor ${floor}` : "All Floors"}</div>
                                </div>
                                <div className="mt-3 flex flex-col gap-3">
                                    {groupedByDate.map(([dateKey, items], idx) => (
                                        <details key={dateKey} className="rounded-xl ring-1 ring-secondary_alt bg-primary">
                                            <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 md:px-5">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-primary">{dateKey}</p>
                                                    <Badge size="sm" color="gray">{items.length}</Badge>
                                                </div>
                                                <span className="text-2xs text-tertiary">Tap to {idx === 0 ? "collapse" : "expand"}</span>
                                            </summary>
                                            <div className="border-t border-secondary px-4 py-4 md:px-5">
                                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                                    {items.map((u) => {
                                                        const visColor = u.visibility === "buyer" ? "brand" : "gray";
                                                        const when = new Date(u.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                                                        return (
                                                            <div key={u.id} className="rounded-xl bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                                                <div className="flex items-start justify-between gap-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <Avatar size="sm" initials={u.by.initials || u.by.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()} />
                                                                        <div className="min-w-0">
                                                                            <div className="flex items-center gap-2">
                                                                                <p className="text-sm font-semibold text-primary">{u.by.name}</p>
                                                                                <Badge size="sm" color="gray">{u.by.role}</Badge>
                                                                            </div>
                                                                            <div className="text-2xs text-tertiary">{when}</div>
                                                                        </div>
                                                                    </div>
                                                                    <Badge size="sm" color={visColor}>{u.visibility === "buyer" ? "Buyer-visible" : "Internal"}</Badge>
                                                                </div>
                                                                <div className="mt-2 flex items-center gap-2">
                                                                    <Badge size="sm" color="blue">{u.stage}</Badge>
                                                                    <span className="text-xs text-secondary">{u.tower} • Floor {u.floor}</span>
                                                                </div>
                                                                <div className="mt-2">
                                                                    <MediaStrip media={u.media} compact />
                                                                </div>
                                                                <p className="mt-2 text-xs text-secondary">{u.notes}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel id="repairs" className="mt-4">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                <p className="text-xs font-semibold text-secondary">Repairs &amp; Maintenance</p>
                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="rounded-xl bg-primary_hover p-4 ring-1 ring-secondary_alt">
                                            <p className="text-sm font-semibold text-primary">Ticket #{i}</p>
                                            <p className="mt-1 text-xs text-secondary">Status, assigned team, expected completion…</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel id="custom" className="mt-4">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                                <p className="text-xs font-semibold text-secondary">Buyer Custom Changes</p>
                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="rounded-xl bg-primary_hover p-4 ring-1 ring-secondary_alt">
                                            <p className="text-sm font-semibold text-primary">Request #{i}</p>
                                            <p className="mt-1 text-xs text-secondary">Unit details, requested change, approvals, ETA…</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                    )}
                </div>
            </div>
            {level === "unit" && activeTower && activeFloor && activeUnit && (
                <SlideoutOverlay isOpen onOpenChange={(o) => { if (!o) { setLevel("units"); setActiveUnit(null); } }}>
                    <SlideoutModal>
                        <SlideoutDialog>
                            <div className="w-full p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-primary">Unit {activeUnit.label}</p>
                                        <p className="text-2xs text-tertiary">{activeTower.name} • Floor {activeFloor.label}</p>
                                    </div>
                                    <Button size="sm" color="secondary" onClick={() => { setLevel("units"); setActiveUnit(null); }}>
                                        Close
                                    </Button>
                                </div>
                                {(() => {
                                    const getStage = (p: number) => {
                                        if (p < 15) return "Foundation";
                                        if (p < 35) return "Slab";
                                        if (p < 55) return "Brickwork";
                                        if (p < 70) return "Electrical & Plumbing";
                                        if (p < 85) return "Plaster";
                                        if (p < 98) return "Painting";
                                        return "Finishing";
                                    };
                                    const stageNotes: Record<string, string> = {
                                        Foundation: "Footings and base complete. Ready for columns.",
                                        Slab: "RCC slab cast and curing underway.",
                                        Brickwork: "Internal and external walls in progress.",
                                        "Electrical & Plumbing": "Conduits and plumbing lines laid.",
                                        Plaster: "Internal plastering progressing floor-wise.",
                                        Painting: "Primer applied; top coat scheduled.",
                                        Finishing: "Fixtures, switches, and final touch-ups.",
                                    };
                                    const allStages = ["Foundation", "Slab", "Brickwork", "Electrical & Plumbing", "Plaster", "Painting", "Finishing"];
                                    const currentStage = getStage(activeUnit.percent);
                                    const stageIndex = allStages.indexOf(currentStage);
                                    const today = Date.now();
                                    const images = [
                                        "https://images.unsplash.com/photo-1504306662894-8b65bb6a8fc5?q=80&w=800&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1581092925635-91966f2d5943?q=80&w=800&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1517249361621-f11084eb8a4a?q=80&w=800&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1581090468600-9e5ff50a32d7?q=80&w=800&auto=format&fit=crop",
                                    ];
                                    type TimelineItem = { stage: string; ts: number; notes: string; media: string[] };
                                    const timeline: TimelineItem[] = allStages.slice(0, Math.max(1, stageIndex + 1)).map((stg, idx): TimelineItem => {
                                        const ts = today - (stageIndex - idx + 1) * 24 * 60 * 60 * 1000;
                                        return {
                                            stage: stg,
                                            ts,
                                            notes: stageNotes[stg],
                                            media: [images[(idx * 2) % images.length], images[(idx * 2 + 1) % images.length]].slice(0, stg === currentStage ? 2 : 1),
                                        };
                                    });
                                    timeline.sort((a: TimelineItem, b: TimelineItem) => b.ts - a.ts);
                                    return (
                                        <>
                                            <details className="mt-4 rounded-xl ring-1 ring-secondary_alt bg-primary" open>
                                                <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 md:px-5">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-primary">Overview</p>
                                                        <Badge size="sm" color="success">{currentStage}</Badge>
                                                    </div>
                                                    <span className="text-2xs text-tertiary">Tap to collapse</span>
                                                </summary>
                                                <div className="border-t border-secondary px-4 py-4 md:px-5">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-semibold text-secondary">Completion</p>
                                                        <span className="text-2xs text-tertiary">Up-to-date</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <ProgressBar value={activeUnit.percent} labelPosition="right" progressClassName="bg-success-solid" />
                                                    </div>
                                                </div>
                                            </details>
                                            <details className="mt-3 rounded-xl ring-1 ring-secondary_alt bg-primary" open>
                                                <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 md:px-5">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-primary">What’s Done</p>
                                                    </div>
                                                    <span className="text-2xs text-tertiary">Tap to collapse</span>
                                                </summary>
                                                <div className="border-t border-secondary px-4 py-4 md:px-5">
                                                    <p className="text-sm text-secondary">{stageNotes[currentStage]}</p>
                                                    <div className="mt-2">
                                                        <MediaStrip media={timeline[0]?.media ?? images.slice(0, 2)} compact />
                                                    </div>
                                                </div>
                                            </details>
                                            <details className="mt-3 rounded-xl ring-1 ring-secondary_alt bg-primary" open>
                                                <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 md:px-5">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-primary">Stage Timeline</p>
                                                    </div>
                                                    <span className="text-2xs text-tertiary">Tap to collapse</span>
                                                </summary>
                                                <div className="border-t border-secondary px-4 py-4 md:px-5">
                                                    <div className="flex flex-col gap-2">
                                                        {timeline.map((item) => {
                                                            const d = new Date(item.ts);
                                                            const dateLabel = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
                                                            return (
                                                                <details key={item.stage + item.ts} className="rounded-lg ring-1 ring-secondary_alt bg-primary" open={item.stage === currentStage}>
                                                                    <summary className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge size="sm" color={item.stage === currentStage ? "success" : "gray"}>{item.stage}</Badge>
                                                                            <span className="text-2xs text-tertiary">{dateLabel}</span>
                                                                        </div>
                                                                        <span className="text-2xs text-tertiary">{item.stage === currentStage ? "Tap to collapse" : "Tap to expand"}</span>
                                                                    </summary>
                                                                    <div className="border-t border-secondary px-3 py-3">
                                                                        <p className="text-xs text-secondary">{item.notes}</p>
                                                                        <div className="mt-2">
                                                                            <MediaStrip media={item.media} compact />
                                                                        </div>
                                                                    </div>
                                                                </details>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </details>
                                        </>
                                    );
                                })()}
                            </div>
                        </SlideoutDialog>
                    </SlideoutModal>
                </SlideoutOverlay>
            )}
        </section>
    );
}

function MediaStrip({ media, compact }: { media: string[]; compact?: boolean }) {
    const [idx, setIdx] = useState(0);
    const canPrev = idx > 0;
    const canNext = idx < media.length - 1;
    return (
        <div className="relative">
            <div className="overflow-hidden rounded-lg ring-1 ring-secondary_alt">
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${idx * 100}%)` }}
                >
                    {media.map((src, i) => (
                        <img key={i} src={src} alt="" className={(compact ? "h-40" : "h-56") + " w-full shrink-0 object-cover"} />
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
                <Button size="sm" color="secondary" iconLeading={ChevronLeft} onClick={() => setIdx((v) => Math.max(0, v - 1))} disabled={!canPrev} className="pointer-events-auto" />
                <Button size="sm" color="secondary" iconLeading={ChevronRight} onClick={() => setIdx((v) => Math.min(media.length - 1, v + 1))} disabled={!canNext} className="pointer-events-auto" />
            </div>
            <div className="mt-2 flex items-center justify-center gap-1">
                {media.map((_, i) => (
                    <span key={i} className={i === idx ? "size-1.5 rounded-full bg-primary" : "size-1.5 rounded-full bg-secondary"} />
                ))}
            </div>
        </div>
    );
}

function BlockTile({ label, percent, onClick, dense }: { label: string; percent: number; onClick?: () => void; dense?: boolean }) {
    const pct = Math.max(0, Math.min(100, Math.round(percent)));
    return (
        <button
            onClick={onClick}
            className={"group relative overflow-hidden rounded-xl ring-1 ring-secondary_alt transition-shadow hover:shadow-xs " + (dense ? "h-18" : "h-24")}
        >
            <div
                style={{ width: `${pct}%` }}
                className="absolute inset-y-0 left-0 bg-success-200 transition-all ease-linear"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
            />
            <div className="relative z-10 flex h-full items-center justify-between px-3">
                <p className="text-sm font-semibold text-primary">{label}</p>
                <span className="rounded-md bg-primary px-2 py-0.5 text-2xs font-semibold text-secondary ring-1 ring-secondary">
                    {pct}%
                </span>
            </div>
        </button>
    );
}

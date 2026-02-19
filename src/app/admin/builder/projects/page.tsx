"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";
import { SearchLg, Grid03, Rows01 } from "@untitledui/icons";
import { ProjectCard } from "./ProjectCard";

type ViewMode = "grid" | "list";

type LifecycleStatus = "ongoing" | "completed" | "upcoming";
type FilterStatus = "all" | "ongoing" | "completed";

type ProjectStatus = "selling" | "construction" | "handover";

type AttentionFlag = "payments_pending" | "stock_issue" | "slow_sales" | "bank_pending";

type Project = {
    id: string;
    name: string;
    location: string;
    lifecycleStatus: LifecycleStatus;
    status: ProjectStatus;
    unitsSold: number;
    totalUnits: number;
    revenueLocked: string;
    constructionPercent: number;
    unitsSoldPercent: number;
    flags?: AttentionFlag[];
    pendingPayments?: number;
    repairsOpen?: number;
    buyerChangesPending?: number;
};

const stageLabel: Record<ProjectStatus, string> = {
    selling: "Selling",
    construction: "Construction",
    handover: "Near Handover",
};

const flagLabel: Record<AttentionFlag, string> = {
    payments_pending: "Payments pending",
    stock_issue: "Stock issue",
    slow_sales: "Slow sales",
    bank_pending: "Bank approval pending",
};

const flagColor: Record<AttentionFlag, "error" | "warning" | "brand"> = {
    payments_pending: "error",
    stock_issue: "warning",
    slow_sales: "warning",
    bank_pending: "brand",
};

const projects: Project[] = [
    {
        id: "signature-altius",
        name: "Signature Altius",
        location: "Kollapur, Hyderabad",
        lifecycleStatus: "ongoing",
        status: "selling",
        unitsSold: 180,
        totalUnits: 240,
        revenueLocked: "₹ 28.4 Cr",
        constructionPercent: 52,
        unitsSoldPercent: 72,
        flags: ["payments_pending"],
        pendingPayments: 3,
        repairsOpen: 1,
        buyerChangesPending: 0,
    },
    {
        id: "signature-fortius",
        name: "Signature Fortius",
        location: "Isnapur, Hyderabad",
        lifecycleStatus: "ongoing",
        status: "construction",
        unitsSold: 130,
        totalUnits: 240,
        revenueLocked: "₹ 19.1 Cr",
        constructionPercent: 38,
        unitsSoldPercent: 54,
        flags: [],
        pendingPayments: 0,
        repairsOpen: 2,
        buyerChangesPending: 1,
    },
    {
        id: "signature-horizon",
        name: "Signature Horizon",
        location: "Manikonda, Hyderabad",
        lifecycleStatus: "completed",
        status: "handover",
        unitsSold: 220,
        totalUnits: 240,
        revenueLocked: "₹ 48.7 Cr",
        constructionPercent: 96,
        unitsSoldPercent: 92,
        flags: [],
        pendingPayments: 0,
        repairsOpen: 0,
        buyerChangesPending: 0,
    },
    {
        id: "green-valley",
        name: "Green Valley",
        location: "Gandipet, Hyderabad",
        lifecycleStatus: "upcoming",
        status: "selling",
        unitsSold: 40,
        totalUnits: 180,
        revenueLocked: "₹ 9.4 Cr",
        constructionPercent: 12,
        unitsSoldPercent: 22,
        flags: ["slow_sales"],
        pendingPayments: 1,
        repairsOpen: 0,
        buyerChangesPending: 2,
    },
    {
        id: "sky-heights",
        name: "Sky Heights",
        location: "Narsingi, Hyderabad",
        lifecycleStatus: "ongoing",
        status: "construction",
        unitsSold: 95,
        totalUnits: 210,
        revenueLocked: "₹ 16.3 Cr",
        constructionPercent: 41,
        unitsSoldPercent: 45,
        flags: ["bank_pending"],
        pendingPayments: 5,
        repairsOpen: 1,
        buyerChangesPending: 0,
    },
];

export default function BuilderProjectsPage() {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("ongoing");
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const filteredProjects = useMemo(() => {
        const term = search.trim().toLowerCase();
        return projects.filter((project) => {
            const matchesStatus =
                statusFilter === "all" ? true : project.lifecycleStatus === statusFilter;
            const matchesSearch = !term || project.name.toLowerCase().includes(term);
            return matchesStatus && matchesSearch;
        });
    }, [statusFilter, search]);

    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-8xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">Projects</h1>
                            <p className="text-md text-tertiary">Manage and operate your active projects</p>
                        </div>
                        <div className="mt-3 md:mt-0 grid grid-cols-1 gap-2 md:flex md:items-center md:gap-2">
                            <Button
                                size="sm"
                                className="w-full md:w-auto"
                                onClick={() => router.push("/admin/builder/projects/create")}
                            >
                                + Create Project
                            </Button>
                            <div className="w-full md:w-40 shrink-0">
                                <Select
                                    size="sm"
                                    placeholder="Filter (Status)"
                                    items={[
                                        { id: "ongoing", label: "Ongoing" },
                                        { id: "completed", label: "Completed" },
                                        { id: "all", label: "All" },
                                    ]}
                                    selectedKey={statusFilter}
                                    onSelectionChange={(key) => setStatusFilter(String(key) as FilterStatus)}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                            <div className="w-full md:w-64">
                                <Input
                                    size="sm"
                                    placeholder="Search (Project name)"
                                    icon={SearchLg}
                                    value={search}
                                    onChange={(v) => setSearch(v)}
                                />
                            </div>
                            <div className="flex items-center justify-end gap-1 md:ml-2">
                                <ButtonUtility
                                    size="sm"
                                    color={viewMode === "grid" ? "secondary" : "tertiary"}
                                    icon={Grid03}
                                    tooltip="Grid view"
                                    onClick={() => setViewMode("grid")}
                                />
                                <ButtonUtility
                                    size="sm"
                                    color={viewMode === "list" ? "secondary" : "tertiary"}
                                    icon={Rows01}
                                    tooltip="List view"
                                    onClick={() => setViewMode("list")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 md:px-8 pt-8 pb-12">
                <div className="w-full max-w-8xl">
                    {filteredProjects.length === 0 ? (
                        <div className="rounded-2xl bg-primary p-6 shadow-xs ring-1 ring-secondary_alt text-center">
                            <p className="text-sm font-medium text-secondary">No projects found</p>
                            <p className="mt-1 text-xs text-tertiary">Try adjusting filters or search by a different project name.</p>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filteredProjects.map((project) => (
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
                                    pendingPayments={project.pendingPayments}
                                    repairsOpen={project.repairsOpen}
                                    buyerChangesPending={project.buyerChangesPending}
                                    dashboardHref={`/admin/builder/projects/${project.id}`}
                                    unitsHref={`/admin/builder/projects/${project.id}/units`}
                                    shareQrHref={`/admin/builder/projects/${project.id}/qr`}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="hidden md:block rounded-2xl bg-primary p-0 shadow-xs ring-1 ring-secondary_alt">
                                <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.2fr)_auto] gap-3 px-4 py-2 text-xs font-medium text-tertiary">
                                    <div>Project</div>
                                    <div>Sold %</div>
                                    <div>Units</div>
                                    <div>Revenue</div>
                                    <div>Stage</div>
                                    <div>Alerts</div>
                                    <div className="text-right">Action</div>
                                </div>
                                <ul className="divide-y divide-secondary">
                                    {filteredProjects.map((project) => (
                                        <li
                                            key={project.id}
                                            className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.2fr)_auto] gap-3 px-4 py-3 text-sm"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-primary">{project.name}</p>
                                                <p className="truncate text-xs text-tertiary">{project.location}</p>
                                            </div>
                                            <div className="flex items-center text-xs text-secondary">
                                                <span className="font-semibold text-primary">{project.unitsSoldPercent}%</span>
                                            </div>
                                            <div className="text-xs text-secondary">
                                                <span className="font-semibold text-primary">
                                                    {project.unitsSold}/{project.totalUnits}
                                                </span>
                                            </div>
                                            <div className="text-xs text-primary font-semibold">
                                                {project.revenueLocked}
                                            </div>
                                            <div className="text-xs text-secondary">
                                                {stageLabel[project.status]}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1">
                                                {project.flags && project.flags.length > 0 ? (
                                                    <Badge type="pill-color" size="sm" color={flagColor[project.flags[0]]}>
                                                        {flagLabel[project.flags[0]]}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-xs text-tertiary">—</span>
                                                )}
                                            </div>
                                            <div className="flex justify-end">
                                                <Button size="sm" color="secondary" href={`/admin/builder/projects/${project.id}`}>
                                                    Open
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3 md:hidden">
                                {filteredProjects.map((project) => (
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
                                        pendingPayments={project.pendingPayments}
                                        repairsOpen={project.repairsOpen}
                                        buyerChangesPending={project.buyerChangesPending}
                                        dashboardHref={`/admin/builder/projects/${project.id}`}
                                        unitsHref={`/admin/builder/projects/${project.id}/units`}
                                        shareQrHref={`/admin/builder/projects/${project.id}/qr`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

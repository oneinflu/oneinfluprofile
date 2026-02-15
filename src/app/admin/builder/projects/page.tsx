"use client";

import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useMemo, useState } from "react";
import { useAuth } from "@/providers/auth";
import { ProjectCard, type Project, type MoneyHealth, formatCurrencyShort } from "./ProjectCard";
import { Coins } from "lucide-react";
import { Activity, AlertCircle, ArrowRight, Clock } from "@untitledui/icons";

/* ------------------ SAMPLE DATA ------------------ */

const projects: Project[] = [
  {
      id: "1",
      name: "Signature Altius",
      image: "/altius.jpg",
      stage: "Ongoing",
      deadlineLabel: "Possession Jun 2026",
      money: { dueThisWeek: 1420000, overdueAmount: 380000, loanPending: 21000000, health: "watch" },
      sales: { availableUnits: 42, bookedThisMonth: 9, salesSpeed: "steady" },
      site: { lastUpdate: "3 days ago", inspectionsPending: 2 },
     city: "Hyderabad"
  },
  {
      id: "2",
      name: "Signature Fortius",
      image: "/fortius.jpg",
      stage: "Pre-launch",
      deadlineLabel: "RERA Feb 2027",
      money: { dueThisWeek: 480000, overdueAmount: 0, loanPending: 14000000, health: "healthy" },
      sales: { availableUnits: 120, bookedThisMonth: 3, salesSpeed: "slow" },
      site: { lastUpdate: "1 week ago", inspectionsPending: 0 },
      city: "Hyderabad"
  },
  {
      id: "3",
      name: "Signature Horizon",
      image: "/horizon.jpg",
      stage: "Near possession",
      deadlineLabel: "Handover Dec 2025",
      money: { dueThisWeek: 2250000, overdueAmount: 830000, loanPending: 8000000, health: "risk" },
      sales: { availableUnits: 8, bookedThisMonth: 2, salesSpeed: "fast" },
      site: { lastUpdate: "Yesterday", inspectionsPending: 3 },
      city: "Hyderabad"
  },
];

/* ------------------ SORT ORDER ------------------ */

const stageOrder: Record<Project["stage"], number> = {
  "Pre-launch": 0,
  "Ongoing": 1,
  "Near possession": 2,
};

const sortedProjects = [...projects].sort((a, b) => {
  const stageDiff = stageOrder[a.stage] - stageOrder[b.stage];
  if (stageDiff !== 0) return stageDiff;
  return a.name.localeCompare(b.name);
});

/* ------------------ PAGE ------------------ */

export default function AdminBuilderProjectsPage() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<MoneyHealth | "all">("all");

  /* ---------- FILTER ---------- */

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (stageFilter !== "all" && p.stage !== stageFilter) return false;
      if (riskFilter !== "all" && p.money.health !== riskFilter) return false;
      return true;
    });
  }, [search, stageFilter, riskFilter]);

  /* ---------- PORTFOLIO PULSE ---------- */

  const portfolio = useMemo<PortfolioData>(() => {
    const dueToday = sortedProjects.reduce((s, p) => s + p.money.dueThisWeek, 0);

    const riskProjects = sortedProjects.filter(
      (p) => p.money.health === "risk" || p.money.overdueAmount > 500000
    );

    const slowSales = sortedProjects.filter(
      (p) => p.sales.salesSpeed === "slow" && p.sales.availableUnits > 20
    );

    const staleProjects = sortedProjects.filter(
      (p) =>
        p.site.lastUpdate.toLowerCase().includes("week") ||
        p.site.lastUpdate.toLowerCase().includes("month")
    );

    return { dueToday, riskProjects, slowSales, staleProjects };
  }, []);

  /* ------------------ UI ------------------ */

  return (
    <section className="flex min-h-screen flex-col lg:pl-[300px]">

      {/* HEADER */}
      <div className="border-b border-secondary bg-gradient-to-b from-primary_hover to-primary px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-primary md:text-2xl">
              Projects Control Center
            </h1>
            <p className="text-xs text-secondary">
              See risks, money flow, and actions across your projects.
            </p>
          </div>

          <Button size="sm">+ Add Project</Button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 bg-primary px-6 py-6">

        {/* FILTER BAR */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-primary_hover/80 p-3 ring-1 ring-secondary_alt md:flex-row md:items-center md:justify-between">

          <Input
            placeholder="Search project"
            className="md:max-w-sm"
            value={search}
            onChange={setSearch}
          />

          <div className="flex flex-wrap gap-2">

            <Select
              size="sm"
              placeholder="Stage"
              selectedKey={stageFilter === "all" ? undefined : stageFilter}
              onSelectionChange={(key) => setStageFilter(String(key) || "all")}
              items={[
                { id: "all", label: "All stages" },
                { id: "Pre-launch", label: "Pre-launch" },
                { id: "Ongoing", label: "Ongoing" },
                { id: "Near possession", label: "Near possession" },
              ]}
            >
              {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>

            <Select
              size="sm"
              placeholder="Risk"
              selectedKey={riskFilter === "all" ? undefined : riskFilter}
              onSelectionChange={(key) => setRiskFilter((String(key) as any) || "all")}
              items={[
                { id: "all", label: "All risk" },
                { id: "healthy", label: "Healthy" },
                { id: "watch", label: "Watch" },
                { id: "risk", label: "Action needed" },
              ]}
            >
              {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>

          </div>
        </div>

        {/* PORTFOLIO PULSE */}
        <PortfolioStats portfolio={portfolio} />

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} userUsername={user?.username} />
          ))}
        </div>

        {/* ACTION QUEUE */}
        <PortfolioAlerts portfolio={portfolio} />

      </div>
    </section>
  );
}

type PortfolioData = {
  dueToday: number;
  riskProjects: Project[];
  slowSales: Project[];
  staleProjects: Project[];
};

type PortfolioStatsProps = {
  portfolio: PortfolioData;
};

function PortfolioStats({ portfolio }: PortfolioStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

      {/* MONEY */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary_hover to-primary p-5 ring-1 ring-secondary_alt transition hover:-translate-y-0.5 hover:shadow-md">
        <Coins className="absolute right-4 top-4 size-5 text-secondary_alt" />
        <p className="text-2xs uppercase tracking-wide text-tertiary">Money at stake</p>
        <p className="mt-2 text-2xl font-semibold text-primary">
          {formatCurrencyShort(portfolio.dueToday)}
        </p>
        <p className="mt-1 text-xs text-secondary">Across active projects</p>
      </div>

      {/* RISK */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary_hover to-primary p-5 ring-1 ring-secondary_alt transition hover:-translate-y-0.5 hover:shadow-md">
        <AlertCircle className="absolute right-4 top-4 size-5 text-warning-solid" />
        <p className="text-2xs uppercase tracking-wide text-tertiary">Needs attention</p>
        <p className="mt-2 text-2xl font-semibold text-primary">
          {portfolio.riskProjects.length}
        </p>
        <p className="mt-1 text-xs text-secondary">Projects with payment or risk flags</p>
      </div>

      {/* SALES */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary_hover to-primary p-5 ring-1 ring-secondary_alt transition hover:-translate-y-0.5 hover:shadow-md">
        <Activity className="absolute right-4 top-4 size-5 text-secondary_alt" />
        <p className="text-2xs uppercase tracking-wide text-tertiary">Sales slowing</p>
        <p className="mt-2 text-2xl font-semibold text-primary">
          {portfolio.slowSales.length}
        </p>
        <p className="mt-1 text-xs text-secondary">Units moving slower than expected</p>
      </div>

      {/* SITE */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary_hover to-primary p-5 ring-1 ring-secondary_alt transition hover:-translate-y-0.5 hover:shadow-md">
        <Clock className="absolute right-4 top-4 size-5 text-secondary_alt" />
        <p className="text-2xs uppercase tracking-wide text-tertiary">Quiet sites</p>
        <p className="mt-2 text-2xl font-semibold text-primary">
          {portfolio.staleProjects.length}
        </p>
        <p className="mt-1 text-xs text-secondary">Projects lacking recent updates</p>
      </div>

    </div>
  );
}
type PortfolioAlertsProps = {
  portfolio: PortfolioData;
};

function PortfolioAlerts({ portfolio }: PortfolioAlertsProps) {
  return (
    <div className="mt-10 rounded-3xl bg-gradient-to-b from-primary_hover to-primary p-6 ring-1 ring-secondary_alt">

      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-primary">Action Queue</p>
        <p className="text-xs text-secondary">Things needing your attention</p>
      </div>

      <div className="mt-5 divide-y divide-secondary_alt">

        {/* RISK PROJECTS */}
        {portfolio.riskProjects.slice(0,3).map((p)=>(
          <div key={p.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-primary">{p.name}</p>
              <p className="text-xs text-secondary">
                Overdue {formatCurrencyShort(p.money.overdueAmount)}
              </p>
            </div>

            <Button
              size="sm"
              color="secondary"
              iconTrailing={ArrowRight}
              className="h-8 px-3 text-xs"
            >
              Review
            </Button>
          </div>
        ))}

        {/* SALES */}
        {portfolio.slowSales.slice(0,2).map((p)=>(
          <div key={p.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-primary">{p.name}</p>
              <p className="text-xs text-secondary">Sales slowing</p>
            </div>

            <Button size="sm" color="secondary" className="h-8 px-3 text-xs">
              Check buyers
            </Button>
          </div>
        ))}

        {/* SITE */}
        {portfolio.staleProjects.slice(0,2).map((p)=>(
          <div key={p.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-primary">{p.name}</p>
              <p className="text-xs text-secondary">No recent updates</p>
            </div>

            <Button size="sm" color="secondary" className="h-8 px-3 text-xs">
              Upload update
            </Button>
          </div>
        ))}

      </div>
    </div>
  );
}

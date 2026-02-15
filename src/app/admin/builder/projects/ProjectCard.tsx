"use client";

import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, DotsHorizontal } from "@untitledui/icons";

export type MoneyHealth = "healthy" | "watch" | "risk";

export type Project = {
  city: string;
  id: string;
  name: string;
  image?: string;
  stage: "Pre-launch" | "Ongoing" | "Near possession";
  deadlineLabel: string;
  money: {
    dueThisWeek: number;
    overdueAmount: number;
    loanPending: number;
    health: MoneyHealth;
  };
  sales: {
    availableUnits: number;
    bookedThisMonth: number;
    salesSpeed: "fast" | "steady" | "slow";
  };
  site: {
    lastUpdate: string;
    inspectionsPending: number;
  };
};

export const formatCurrencyShort = (value: number) => {
  if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹ ${(value / 100000).toFixed(1)}L`;
  if (value === 0) return "₹ 0";
  return `₹ ${value.toLocaleString("en-IN")}`;
};

const healthTone: Record<MoneyHealth, string> = {
  healthy: "text-success-solid",
  watch: "text-warning-solid",
  risk: "text-error-solid",
};

type Props = {
  project: Project;
  userUsername?: string;
};

export function ProjectCard({ project, userUsername }: Props) {
  const router = useRouter();

  const normalizedImage =
    project.image && !project.image.startsWith("http") && !project.image.startsWith("/")
      ? `/${project.image}`
      : project.image;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-primary/90 ring-1 ring-secondary_alt transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      {/* PROJECT IMAGE */}
      <div className="relative h-36 w-full overflow-hidden">
        {normalizedImage ? (
          <Image
            src={normalizedImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-secondary_alt/30 to-secondary_alt/5" />
        )}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* TITLE + STATUS */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-lg font-semibold text-white">{project.name}</p>
            <p className="text-xs text-white/80">
              {project.stage} • {project.deadlineLabel}
            </p>
          </div>

          <div className={`text-xs font-medium ${healthTone[project.money.health]}`}>
            {project.money.health === "risk" ? "Action needed" :
             project.money.health === "watch" ? "Watch" : "Healthy"}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* HERO MONEY */}
        <div>
          <p className="text-2xl font-semibold text-primary">
            {formatCurrencyShort(project.money.dueThisWeek)}
          </p>
          <p className="text-xs text-secondary">Due this week</p>

          <p className="mt-1 text-xs text-tertiary">
            {formatCurrencyShort(project.money.loanPending)} loan •{" "}
            {formatCurrencyShort(project.money.overdueAmount)} overdue
          </p>
        </div>

        {/* INLINE STATS */}
        <div className="mt-4 flex items-center justify-between text-xs text-secondary">
          <span>{project.sales.availableUnits} units</span>
          <span>{project.sales.bookedThisMonth} sold</span>
          <span>{project.site.lastUpdate}</span>
        </div>

        {/* ACTION BAR */}
        <div className="mt-4 flex items-center justify-between">
          <Button
            size="sm"
            color="primary"
            className="h-9 px-4 text-xs"
            iconTrailing={ArrowRight}
            onClick={() => {
              if (!userUsername) return;
              router.push(`/builder/${userUsername}/projects/${project.id}`);
            }}
          >
            Open Project
          </Button>

          <Button
            size="sm"
            color="secondary"
            className="h-9 w-9 p-0"
          >
            <DotsHorizontal className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

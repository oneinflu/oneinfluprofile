"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
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

const DRAFT_KEY = "builder_create_project_draft";

export default function CreateProjectReviewPage() {
    const router = useRouter();

    const [savingDraft, setSavingDraft] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [generatingQr, setGeneratingQr] = useState(false);
    const [draft, setDraft] = useState<any | null>(null);

    const currentStepIndex = steps.indexOf("Review" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.localStorage.getItem(DRAFT_KEY);
            if (raw) {
                setDraft(JSON.parse(raw));
            }
        } catch {
        }
    }, []);

    const handleSaveDraft = async () => {
        setSavingDraft(true);
        try {
        } finally {
            setSavingDraft(false);
        }
    };

    const handlePublish = async () => {
        if (isPublished) return;
        setPublishing(true);
        try {
            setIsPublished(true);
        } finally {
            setPublishing(false);
        }
    };

    const handleGenerateQr = async () => {
        if (!isPublished) return;
        setGeneratingQr(true);
        try {
        } finally {
            setGeneratingQr(false);
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
                                Step 7 of 7 · Review &amp; launch
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                color="secondary"
                                isLoading={savingDraft}
                                onClick={handleSaveDraft}
                            >
                                Save as draft
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-tertiary">
                            <p>Review</p>
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
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
                        <div className="flex flex-col gap-6 rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt md:p-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold text-primary">
                                    {draft?.projectInfo?.name || "Project name"}
                                </h2>
                                <p className="text-sm text-tertiary">
                                    {draft?.projectInfo?.location ||
                                        "Location will appear here once filled in."}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-secondary">
                                    <span className="rounded-full bg-secondary/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-quaternary">
                                        {draft?.projectInfo?.status || "Status not set"}
                                    </span>
                                    <span>
                                        Possession:{" "}
                                        <span className="font-semibold text-primary">
                                            {draft?.projectInfo?.possessionDate || "Not set"}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-primary">
                                            Structure overview
                                        </p>
                                        <Button
                                            size="sm"
                                            color="link-gray"
                                            onClick={() =>
                                                router.push(
                                                    "/admin/builder/projects/create/structure",
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <p className="text-xs text-tertiary">
                                        Towers, floors, and units per floor summarised from the structure step.
                                    </p>
                                    <div className="mt-2 grid gap-2 text-xs text-secondary md:grid-cols-3">
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Towers
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.structure?.towerCount ?? "—"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Floors per tower
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.structure?.floorsPerTower ?? "—"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Units per floor
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.structure?.unitsPerFloor ?? "—"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-primary">
                                            Units summary
                                        </p>
                                        <Button
                                            size="sm"
                                            color="link-gray"
                                            onClick={() =>
                                                router.push("/admin/builder/projects/create/units")
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <p className="text-xs text-tertiary">
                                        Total unit count and mortgaged units from the units step.
                                    </p>
                                    <div className="mt-2 grid gap-2 text-xs text-secondary md:grid-cols-2">
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Total units
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.units?.totalUnits ??
                                                    draft?.structure?.totalUnits ??
                                                    "—"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Mortgaged units
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.units?.mortgagedUnits ?? 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-primary">
                                            Pricing rules summary
                                        </p>
                                        <Button
                                            size="sm"
                                            color="link-gray"
                                            onClick={() =>
                                                router.push("/admin/builder/projects/create/pricing")
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <p className="text-xs text-tertiary">
                                        Snapshot of how the system will calculate prices for every unit.
                                    </p>
                                    <div className="mt-2 grid gap-3 text-xs text-secondary md:grid-cols-2">
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Base price per sft
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.pricing?.basePricePerSft
                                                    ? `₹${draft.pricing.basePricePerSft.toLocaleString(
                                                          "en-IN",
                                                      )}`
                                                    : "Not set"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Sample all-in price per sft
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.pricing?.sampleFinalPricePerSft
                                                    ? `₹${draft.pricing.sampleFinalPricePerSft.toLocaleString(
                                                          "en-IN",
                                                      )}`
                                                    : "Will be calculated from rules"}
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="mt-3 space-y-1 text-xs text-secondary">
                                        <li>
                                            Floor rise slabs:{" "}
                                            {draft?.pricing?.floorRulesCount ?? 0} rule(s)
                                        </li>
                                        <li>
                                            Facing premiums:{" "}
                                            {draft?.pricing?.facingPremiumsCount ?? 0} option(s)
                                        </li>
                                        <li>
                                            Position premiums:{" "}
                                            {draft?.pricing?.positionPremiumsCount ?? 0} option(s)
                                        </li>
                                        <li>
                                            Tower overrides:{" "}
                                            {draft?.pricing?.hasTowerOverrides ? "Yes" : "No"}, Unit
                                            overrides:{" "}
                                            {draft?.pricing?.hasUnitOverrides ? "Yes" : "No"}
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-2 rounded-xl bg-primary_hover/40 p-3 ring-1 ring-secondary_alt">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-primary">
                                            Commercial components
                                        </p>
                                        <Button
                                            size="sm"
                                            color="link-gray"
                                            onClick={() =>
                                                router.push(
                                                    "/admin/builder/projects/create/commercials",
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <p className="text-xs text-tertiary">
                                        Final cost breakup a buyer sees beyond base unit price.
                                    </p>
                                    <div className="mt-2 grid gap-3 text-xs text-secondary md:grid-cols-2">
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Base unit size
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.commercials?.baseUnitSize
                                                    ? `${draft.commercials.baseUnitSize} sft`
                                                    : "Not set"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Amenities
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.commercials?.amenitiesMode === "percent"
                                                    ? `${draft.commercials.amenitiesValue || 0}% of base value`
                                                    : draft?.commercials?.amenitiesValue
                                                    ? `₹${draft.commercials.amenitiesValue.toLocaleString(
                                                          "en-IN",
                                                      )} per unit`
                                                    : "Not set"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Corpus fund
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.commercials?.corpusFund
                                                    ? `₹${draft.commercials.corpusFund.toLocaleString(
                                                          "en-IN",
                                                      )}`
                                                    : "Not set"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-quaternary text-[11px] uppercase tracking-wide">
                                                Maintenance (year)
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {draft?.commercials?.maintenancePerYear
                                                    ? `₹${draft.commercials.maintenancePerYear.toLocaleString(
                                                          "en-IN",
                                                      )}`
                                                    : "Not set"}
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="mt-3 space-y-1 text-xs text-secondary">
                                        <li>
                                            Additional charges:{" "}
                                            {draft?.commercials?.additionalChargesCount ?? 0} row(s)
                                        </li>
                                        <li>
                                            Additional total:{" "}
                                            {draft?.commercials?.additionalChargesTotal
                                                ? `₹${draft.commercials.additionalChargesTotal.toLocaleString(
                                                      "en-IN",
                                                  )}`
                                                : "₹0"}
                                        </li>
                                        <li>
                                            Bank loans available:{" "}
                                            {draft?.commercials?.bankLoansAvailable
                                                ? "Yes"
                                                : "No / Not set"}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() =>
                                        router.push("/admin/builder/projects/create/media")
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
                                        Save as draft
                                    </Button>
                                    <Button
                                        size="sm"
                                        isLoading={publishing}
                                        onClick={handlePublish}
                                    >
                                        {isPublished ? "Published" : "Publish project"}
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="tertiary"
                                        disabled={!isPublished}
                                        isLoading={generatingQr}
                                        onClick={handleGenerateQr}
                                    >
                                        Generate QR
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt md:p-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-sm font-semibold text-primary">
                                    Launch checklist
                                </h2>
                                <p className="text-xs text-tertiary">
                                    Quick glance at what the builder is confirming before going live.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 rounded-xl bg-secondary/20 px-3 py-3 text-xs text-tertiary">
                                <div className="flex items-center justify-between">
                                    <span>Structure overview</span>
                                    <span className="font-medium text-primary">Configured</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Pricing rules</span>
                                    <span className="font-medium text-primary">Configured</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Units &amp; mortgages</span>
                                    <span className="font-medium text-primary">Configured</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Commercial components</span>
                                    <span className="font-medium text-primary">Configured</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Media &amp; information</span>
                                    <Button
                                        size="sm"
                                        color="link-gray"
                                        onClick={() =>
                                            router.push("/admin/builder/projects/create/media")
                                        }
                                    >
                                        Edit media
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 rounded-xl bg-secondary/20 px-3 py-3 text-xs text-tertiary">
                                <div>
                                    <p className="text-[11px] font-semibold text-quaternary uppercase tracking-wide">
                                        Current status
                                    </p>
                                    <p className="mt-1 text-xs text-primary">
                                        {isPublished
                                            ? "Published project · QR ready to share"
                                            : "Draft project · Not visible to buyers yet"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-quaternary uppercase tracking-wide">
                                        Actions
                                    </p>
                                    <p className="mt-1 text-xs text-primary">
                                        Save as draft to park the project. Publish project when you are
                                        ready to go live, then generate a QR code for on-site standees
                                        and brochures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

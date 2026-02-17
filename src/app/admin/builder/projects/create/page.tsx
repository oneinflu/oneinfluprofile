"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
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

type StatusOption = "Ongoing" | "Upcoming" | "Completed";

type ProjectType = "gated-community" | "villa" | "individual-building";

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

export default function CreateProjectStep1Page() {
    const router = useRouter();

    const [projectName, setProjectName] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<StatusOption | null>(null);
    const [projectType, setProjectType] = useState<ProjectType | null>(null);
    const [totalProjectArea, setTotalProjectArea] = useState("");
    const [openSpaceDetails, setOpenSpaceDetails] = useState("");
    const [possessionDate, setPossessionDate] = useState("");
    const [masterPlanFiles, setMasterPlanFiles] = useState<Array<{ file: File; url: string }>>([]);

    const [savingDraft, setSavingDraft] = useState(false);
    const [savingNext, setSavingNext] = useState(false);

    const currentStepIndex = steps.indexOf("Project Info" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    const canSaveNext =
        projectName.trim().length > 0 &&
        location.trim().length > 0 &&
        status !== null &&
        projectType !== null;

    useEffect(() => {
        updateDraft({
            projectInfo: {
                name: projectName.trim(),
                location: location.trim(),
                status,
                possessionDate,
                projectType,
                totalProjectArea: totalProjectArea.trim(),
                openSpaceDetails: openSpaceDetails.trim(),
            },
        });
    }, [
        projectName,
        location,
        status,
        possessionDate,
        projectType,
        totalProjectArea,
        openSpaceDetails,
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
            router.push("/admin/builder/projects/create/structure");
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
                            <p className="text-md text-tertiary">Step 1 of 7 · Project basics</p>
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
                            <p>Project Info</p>
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
                <div className="w-full max-w-5xl">
                    <div className="rounded-2xl bg-primary p-4 md:p-6 shadow-xs ring-1 ring-secondary_alt flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-primary">Project basics</h2>
                            <p className="text-sm text-tertiary">
                                Identity and high-level info for this project.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Input
                                label="Project name"
                                placeholder="e.g. Signature Altius"
                                value={projectName}
                                onChange={(v) => setProjectName(v)}
                            />

                            <Input
                                label="Location"
                                placeholder="e.g. Kollapur, Hyderabad"
                                value={location}
                                onChange={(v) => setLocation(v)}
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <Select
                                    label="Status"
                                    placeholder="Select status"
                                    size="sm"
                                    items={[
                                        { id: "Ongoing", label: "Ongoing" },
                                        { id: "Upcoming", label: "Upcoming" },
                                        { id: "Completed", label: "Completed" },
                                    ]}
                                    selectedKey={status}
                                    onSelectionChange={(key) =>
                                        setStatus(String(key) as StatusOption)
                                    }
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>

                                <Input
                                    label="Expected possession date"
                                    placeholder="Select date"
                                    type="date"
                                    value={possessionDate}
                                    onChange={(v) => setPossessionDate(v)}
                                />
                            </div>

                            <Select
                                label="Project type"
                                placeholder="Select project type"
                                size="sm"
                                items={[
                                    { id: "gated-community", label: "Gated community" },
                                    { id: "villa", label: "Villa community" },
                                    { id: "individual-building", label: "Individual building" },
                                ]}
                                selectedKey={projectType}
                                onSelectionChange={(key) =>
                                    setProjectType(String(key) as ProjectType)
                                }
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    label="Total project area (acres)"
                                    placeholder="e.g. 5.5"
                                    type="text"
                                    inputMode="decimal"
                                    value={totalProjectArea}
                                    onChange={(v) => setTotalProjectArea(v)}
                                />
                                <Input
                                    label="Open space details"
                                    placeholder="e.g. 60% open space with parks & clubhouse"
                                    value={openSpaceDetails}
                                    onChange={(v) => setOpenSpaceDetails(v)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-primary">Master plan image</p>
                                <p className="text-xs text-tertiary">
                                    Upload the master plan visual for this project.
                                </p>
                                <FileUpload.Root>
                                    <FileUpload.DropZone
                                        accept="image/*"
                                        allowsMultiple={false}
                                        onDropFiles={(files) => {
                                            const next = Array.from(files || []).map((file) => ({
                                                file,
                                                url: URL.createObjectURL(file),
                                            }));
                                            setMasterPlanFiles(next);
                                        }}
                                    />
                                    {masterPlanFiles.length > 0 && (
                                        <FileUpload.List>
                                            {masterPlanFiles.map((f, index) => (
                                                <FileUpload.ListItemProgressBar
                                                    key={index}
                                                    name={f.file.name}
                                                    size={f.file.size}
                                                    progress={100}
                                                    onDelete={() =>
                                                        setMasterPlanFiles((prev) =>
                                                            prev.filter((_, i) => i !== index),
                                                        )
                                                    }
                                                />
                                            ))}
                                        </FileUpload.List>
                                    )}
                                </FileUpload.Root>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                            <Button
                                size="sm"
                                color="secondary"
                                onClick={() => router.push("/admin/builder/projects")}
                            >
                                Cancel
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
                </div>
            </div>
        </section>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { cx } from "@/utils/cx";

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

type UploadedFile = {
    file: File;
    url: string;
};

interface ChipsInputProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    items: string[];
    onRemoveItem: (item: string) => void;
    placeholder?: string;
    hint?: string;
}

function ChipsInput({
    label,
    value,
    onChange,
    onKeyDown,
    items,
    onRemoveItem,
    placeholder,
    hint,
}: ChipsInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full">
            <label className="mb-1.5 block text-xs font-semibold text-primary">{label}</label>
            <div
                className={cx(
                    "relative flex min-h-[44px] w-full flex-wrap items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary shadow-xs ring-1 ring-secondary transition-shadow duration-100 ease-linear ring-inset",
                    "cursor-text focus-within:ring-2 focus-within:ring-brand",
                )}
                onClick={() => inputRef.current?.focus()}
            >
                {items.map((item, i) => (
                    <BadgeWithButton
                        key={i}
                        type="pill-color"
                        color="gray"
                        onButtonClick={(e) => {
                            e?.stopPropagation();
                            onRemoveItem(item);
                        }}
                    >
                        {item}
                    </BadgeWithButton>
                ))}
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={items.length === 0 ? placeholder : ""}
                    className="min-w-[120px] flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-tertiary"
                />
            </div>
            {hint && <p className="mt-1.5 text-sm text-tertiary">{hint}</p>}
        </div>
    );
}

export default function CreateProjectMediaPage() {
    const router = useRouter();

    const [localityVideos, setLocalityVideos] = useState<UploadedFile[]>([]);
    const [modelFlatVideos, setModelFlatVideos] = useState<UploadedFile[]>([]);
    const [constructionVideos, setConstructionVideos] = useState<UploadedFile[]>([]);

    const [landmarks, setLandmarks] = useState<string[]>([]);
    const [landmarkInput, setLandmarkInput] = useState("");
    const [specs, setSpecs] = useState<string[]>([]);
    const [specInput, setSpecInput] = useState("");

    const [savingDraft, setSavingDraft] = useState(false);
    const [savingNext, setSavingNext] = useState(false);

    const currentStepIndex = steps.indexOf("Media" as StepKey);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    useEffect(() => {
        updateDraft({
            media: {
                localityVideos: localityVideos.length,
                modelFlatVideos: modelFlatVideos.length,
                constructionVideos: constructionVideos.length,
                landmarks,
                specs,
            },
        });
    }, [localityVideos.length, modelFlatVideos.length, constructionVideos.length, landmarks, specs]);

    const handleSaveDraft = async () => {
        setSavingDraft(true);
        try {
        } finally {
            setSavingDraft(false);
        }
    };

    const handleSaveAndNext = async () => {
        setSavingNext(true);
        try {
            router.push("/admin/builder/projects/create/review");
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
                            <p className="text-md text-tertiary">Step 6 of 7 · Media &amp; information</p>
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
                            <p>Media</p>
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
                                <h2 className="text-lg font-semibold text-primary">Media &amp; information</h2>
                                <p className="text-sm text-tertiary">
                                    Simple uploads and text that make the project feel real to buyers.
                                </p>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-primary">Locality video</p>
                                    <p className="text-xs text-tertiary">
                                        Street, approach road, neighbourhood vibe. Short clip is enough.
                                    </p>
                                    <FileUpload.Root>
                                        <FileUpload.DropZone
                                            accept="video/*"
                                            onDropFiles={(files) => {
                                                const next = Array.from(files || []).map((file) => ({
                                                    file,
                                                    url: URL.createObjectURL(file),
                                                }));
                                                setLocalityVideos(next);
                                            }}
                                        />
                                        {localityVideos.length > 0 && (
                                            <FileUpload.List>
                                                {localityVideos.map((item, index) => (
                                                    <FileUpload.ListItemProgressBar
                                                        key={index}
                                                        name={item.file.name}
                                                        size={item.file.size}
                                                        progress={100}
                                                        onDelete={() =>
                                                            setLocalityVideos((prev) =>
                                                                prev.filter((_, i) => i !== index),
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </FileUpload.List>
                                        )}
                                    </FileUpload.Root>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-primary">Model flat video</p>
                                    <p className="text-xs text-tertiary">
                                        Walkthrough of the show flat or 3D walkthrough recording.
                                    </p>
                                    <FileUpload.Root>
                                        <FileUpload.DropZone
                                            accept="video/*"
                                            onDropFiles={(files) => {
                                                const next = Array.from(files || []).map((file) => ({
                                                    file,
                                                    url: URL.createObjectURL(file),
                                                }));
                                                setModelFlatVideos(next);
                                            }}
                                        />
                                        {modelFlatVideos.length > 0 && (
                                            <FileUpload.List>
                                                {modelFlatVideos.map((item, index) => (
                                                    <FileUpload.ListItemProgressBar
                                                        key={index}
                                                        name={item.file.name}
                                                        size={item.file.size}
                                                        progress={100}
                                                        onDelete={() =>
                                                            setModelFlatVideos((prev) =>
                                                                prev.filter((_, i) => i !== index),
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </FileUpload.List>
                                        )}
                                    </FileUpload.Root>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-primary">Construction videos</p>
                                    <p className="text-xs text-tertiary">
                                        Site progress, slab casting, structure update. Upload multiple clips
                                        if needed.
                                    </p>
                                    <FileUpload.Root>
                                        <FileUpload.DropZone
                                            accept="video/*"
                                            onDropFiles={(files) => {
                                                const next = Array.from(files || []).map((file) => ({
                                                    file,
                                                    url: URL.createObjectURL(file),
                                                }));
                                                setConstructionVideos(next);
                                            }}
                                        />
                                        {constructionVideos.length > 0 && (
                                            <FileUpload.List>
                                                {constructionVideos.map((item, index) => (
                                                    <FileUpload.ListItemProgressBar
                                                        key={index}
                                                        name={item.file.name}
                                                        size={item.file.size}
                                                        progress={100}
                                                        onDelete={() =>
                                                            setConstructionVideos((prev) =>
                                                                prev.filter((_, i) => i !== index),
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </FileUpload.List>
                                        )}
                                    </FileUpload.Root>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <ChipsInput
                                            label="Nearest landmarks"
                                            value={landmarkInput}
                                            onChange={setLandmarkInput}
                                            items={landmarks}
                                            onRemoveItem={(item) =>
                                                setLandmarks((prev) => prev.filter((v) => v !== item))
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === ",") {
                                                    e.preventDefault();
                                                    const v = landmarkInput.trim();
                                                    if (v && !landmarks.includes(v)) {
                                                        setLandmarks((prev) => [...prev, v]);
                                                    }
                                                    setLandmarkInput("");
                                                } else if (
                                                    e.key === "Backspace" &&
                                                    !landmarkInput &&
                                                    landmarks.length
                                                ) {
                                                    setLandmarks((prev) => prev.slice(0, -1));
                                                }
                                            }}
                                            placeholder="Add landmark and press Enter"
                                            hint="Short chips like “5 mins from Financial District”, “Near Metro Station”."
                                        />
                                        {(landmarkInput || landmarks.length > 0) && (
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                    landmarkInput || landmarks[landmarks.length - 1],
                                                )}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex w-fit items-center gap-1 text-xs font-medium text-brand-secondary hover:text-brand-secondary_alt"
                                            >
                                                <span>Open this search in Google Maps</span>
                                            </a>
                                        )}
                                    </div>

                                    <ChipsInput
                                        label="Materials / specifications"
                                        value={specInput}
                                        onChange={setSpecInput}
                                        items={specs}
                                        onRemoveItem={(item) =>
                                            setSpecs((prev) => prev.filter((v) => v !== item))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                const v = specInput.trim();
                                                if (v && !specs.includes(v)) {
                                                    setSpecs((prev) => [...prev, v]);
                                                }
                                                setSpecInput("");
                                            } else if (
                                                e.key === "Backspace" &&
                                                !specInput &&
                                                specs.length
                                            ) {
                                                setSpecs((prev) => prev.slice(0, -1));
                                            }
                                        }}
                                        placeholder="Add material/spec and press Enter"
                                        hint="Break brochure text into clear, single-line specs."
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                                <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() =>
                                        router.push("/admin/builder/projects/create/commercials")
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
                                    Builder-facing preview
                                </h2>
                                <p className="text-xs text-tertiary">
                                    Quick summary of what media and text will show up on the project page.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 rounded-xl bg-secondary/20 px-3 py-3 text-xs text-tertiary">
                                <div className="flex items-center justify-between">
                                    <span>Locality video</span>
                                    <span className="font-medium text-primary">
                                        {localityVideos.length > 0
                                            ? `${localityVideos.length} file${
                                                  localityVideos.length > 1 ? "s" : ""
                                              }`
                                            : "Not added"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Model flat video</span>
                                    <span className="font-medium text-primary">
                                        {modelFlatVideos.length > 0
                                            ? `${modelFlatVideos.length} file${
                                                  modelFlatVideos.length > 1 ? "s" : ""
                                              }`
                                            : "Not added"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Construction videos</span>
                                    <span className="font-medium text-primary">
                                        {constructionVideos.length > 0
                                            ? `${constructionVideos.length} file${
                                                  constructionVideos.length > 1 ? "s" : ""
                                              }`
                                            : "Not added"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 rounded-xl bg-secondary/20 px-3 py-3 text-xs text-tertiary">
                                <div>
                                    <p className="text-[11px] font-semibold text-quaternary uppercase tracking-wide">
                                        Nearest landmarks
                                    </p>
                                    {landmarks.length ? (
                                        <div className="mt-1 flex flex-wrap gap-1.5">
                                            {landmarks.map((item, index) => (
                                                <Badge
                                                    key={index}
                                                    size="sm"
                                                    color="gray"
                                                    type="pill-color"
                                                >
                                                    {item}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-1 text-xs text-primary">
                                            Use chips like “Near IT Hub”, “Close to Metro” to orient buyers.
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-quaternary uppercase tracking-wide">
                                        Materials / specifications
                                    </p>
                                    {specs.length ? (
                                        <div className="mt-1 flex flex-wrap gap-1.5">
                                            {specs.map((item, index) => (
                                                <Badge
                                                    key={index}
                                                    size="sm"
                                                    color="gray"
                                                    type="pill-color"
                                                >
                                                    {item}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-1 text-xs text-primary">
                                            Example chips: “RCC frame”, “Vitrified tiles”, “UPVC windows”.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

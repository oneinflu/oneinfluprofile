"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";

interface AvailabilitySettingsProps {
    initialData: any;
    onUpdate: () => void;
}

export function AvailabilitySettings({ initialData, onUpdate }: AvailabilitySettingsProps) {
    const { token, user, updateUserById } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Availability For
    const [availableFor, setAvailableFor] = useState<string[]>([]);
    const availabilityOptions = ["One-time", "Monthly", "Event-based"];

    // Working Mode
    const [workingModes, setWorkingModes] = useState<string[]>([]);
    const workingModeOptions = ["Remote", "On-site"];

    useEffect(() => {
        if (initialData) {
            const avail = initialData.availableFor;
            setAvailableFor(Array.isArray(avail) ? avail : avail ? [avail] : []);
            
            const modes = initialData.workingMode || initialData.workingModes;
            setWorkingModes(Array.isArray(modes) ? modes : modes ? [modes] : []);
        }
    }, [initialData]);

    const toggleAvailableFor = (option: string) => {
        setAvailableFor(prev => 
            prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
        );
    };

    const toggleWorkingMode = (option: string) => {
        setWorkingModes(prev => 
            prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
        );
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setSaveSuccess(false);
            if (!token || !user?.id) return;

            await updateUserById(user.id, {
                availableFor,
                workingMode: workingModes
            });

            onUpdate();
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
            <h2 className="text-lg font-semibold text-primary">Availability</h2>
            
            {/* Available For */}
            <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-tertiary">Available For</label>
                <div className="mt-3 flex flex-wrap gap-2">
                    {availabilityOptions.map(option => {
                        const isSelected = availableFor.includes(option);
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleAvailableFor(option)}
                                className={`
                                    rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 border
                                    ${isSelected 
                                        ? "bg-green-50 text-green-700 border-green-200" 
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Working Mode */}
            <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-tertiary">Working Mode</label>
                <div className="mt-3 flex flex-wrap gap-2">
                    {workingModeOptions.map(option => {
                        const isSelected = workingModes.includes(option);
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleWorkingMode(option)}
                                className={`
                                    rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 border
                                    ${isSelected 
                                        ? "bg-green-50 text-green-700 border-green-200" 
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    size="md"
                    color="primary"
                    isLoading={isSaving}
                    onClick={handleSave}
                >
                    Save changes
                </Button>
                {saveSuccess && (
                    <Badge type="pill-color" size="md" color="success">
                        Saved
                    </Badge>
                )}
            </div>
        </div>
    );
}

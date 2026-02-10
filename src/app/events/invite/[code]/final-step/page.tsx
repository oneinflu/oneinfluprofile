"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Button } from "@/components/base/buttons/button";
import { AlertCircle, Trash01, CheckCircle, XCircle } from "@untitledui/icons";

// Type definitions
type PublicEvent = {
    dashboardAccessRequired?: boolean;
};

export default function FinalStepPage() {
    const params = useParams();
    const router = useRouter();
    const code = String((params as any)?.code || "");
    const { token: authToken } = useAuth();
    
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [dashboardScreenshot, setDashboardScreenshot] = useState<File | null>(null);
    const [dashboardPreview, setDashboardPreview] = useState<string | null>(null);
    const [dashboardError, setDashboardError] = useState<string | null>(null);
    const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
    
    // State for preferences
    const [willingToAttend, setWillingToAttend] = useState(false);
    const [shareDashboard, setShareDashboard] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWillingToAttend(localStorage.getItem("influu_isWillingToAttend") === "true");
            setShareDashboard(localStorage.getItem("influu_shareProfessionalDashboard") === "true");
        }
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!code) return;
            try {
                // Fetch basic event info to check dashboardAccessRequired
                const res = await api.get<any>(`/events/public/code/${encodeURIComponent(code)}`);
                if (res?.success && res?.data?.event) {
                    setEvent(res.data.event);
                }
            } catch (e) {
                console.error("Failed to fetch event", e);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [code]);

    const handleDashboardDrop = (files: FileList) => {
        if (files.length > 0) {
            const file = files[0];
            setDashboardScreenshot(file);
            setDashboardPreview(URL.createObjectURL(file));
            setDashboardError(null);
        }
    };

    const handleRemoveDashboard = () => {
        setDashboardScreenshot(null);
        setDashboardPreview(null);
    };

    const handleFinalSubmit = async () => {
        console.log("handleFinalSubmit: Starting final submission");
        setDashboardError(null);
        setIsSubmittingFinal(true);

        if ((event?.dashboardAccessRequired === true || shareDashboard) && !dashboardScreenshot) {
            setDashboardError("Please upload your dashboard screenshot");
            setIsSubmittingFinal(false);
            return;
        }

        // Validate file size
        if (dashboardScreenshot && dashboardScreenshot.size === 0) {
            setDashboardError("Invalid file. Please select again.");
            setIsSubmittingFinal(false);
            return;
        }
        
        // 60-second timeout for the upload
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
            const token = authToken || localStorage.getItem("influu_token");
            if (!token) {
                console.error("handleFinalSubmit: Missing token");
                setDashboardError("Session expired. Please log in again.");
                setIsSubmittingFinal(false);
                clearTimeout(timeoutId);
                return;
            }

            const finalShareDashboard = event?.dashboardAccessRequired === true ? true : shareDashboard;
            
            const formData = new FormData();
            formData.append("willingToAttend", String(willingToAttend));
            formData.append("shareProfessionalDashboard", String(finalShareDashboard));
            
            if (dashboardScreenshot) {
                formData.append("dashboard", dashboardScreenshot);
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://newyearbackendcode-zrp62.ondigitalocean.app";
            const endpoint = `/events/public/code/${encodeURIComponent(code)}/apply`;
            console.log("handleFinalSubmit: Submitting to", `${baseUrl}${endpoint}`);

            const res = await fetch(`${baseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("handleFinalSubmit: Submission failed", errorText);
                setDashboardError("Failed to submit application. Please try again.");
                setIsSubmittingFinal(false);
                return;
            }

            const data = await res.json();
            console.log("handleFinalSubmit: Success", data);
            
            router.push(`/events/invite/${code}/success`);
            
        } catch (e: any) {
            clearTimeout(timeoutId);
            console.error("handleFinalSubmit: Error during submission", e);
            
            if (e.name === 'AbortError') {
                 setDashboardError("Upload timed out. Please check your connection and try again.");
            } else {
                 setDashboardError(e.message || "Failed to submit application. Please try again.");
            }
            setIsSubmittingFinal(false);
        }
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        One Last Step
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Please upload your professional dashboard screenshot to complete your application.
                    </p>
                </div>

                <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
                    <div className="space-y-6">
                        {dashboardScreenshot ? (
                            <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                <img src={dashboardPreview!} alt="Dashboard" className="w-full h-48 object-cover" />
                                <button 
                                    onClick={handleRemoveDashboard}
                                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-red-50 text-red-500"
                                >
                                    <Trash01 className="w-4 h-4" />
                                </button>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ready to submit</span>
                                </div>
                            </div>
                        ) : (
                            <FileUpload.DropZone 
                                onDropFiles={handleDashboardDrop}
                                accept="image/*"
                                hint="Upload screenshot (PNG, JPG)"
                                allowsMultiple={false}
                            />
                        )}

                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/20">
                            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Dos & Don'ts</h4>
                            <ul className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                    <span>Ensure metrics are clearly visible</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                    <span>Capture recent data (last 30 days)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <span>Don't crop out the profile name</span>
                                </li>
                            </ul>
                        </div>
                        
                        {dashboardError && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-error-500">
                                <AlertCircle className="h-4 w-4" />
                                <span>{dashboardError}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button
                            size="lg"
                            color="primary"
                            className="w-full"
                            onClick={handleFinalSubmit}
                            disabled={isSubmittingFinal}
                        >
                            {isSubmittingFinal ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Processing...
                                </>
                            ) : (
                                "Apply for the event"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { 
    Users01, 
    ArrowUpRight,
    UploadCloud02,
    X
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { api } from "@/utils/api";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Button } from "@/components/base/buttons/button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import lottie from "lottie-web";
import { cx } from "@/utils/cx";

type User = {
    id?: string;
    _id?: string;
    username: string;
    name: string;
    avatarUrl: string;
    category: string;
    shortBio: string;
};

type Application = {
    _id?: string;
    user: User;
    instagramUrl: string;
    instagramHandle: string;
    status: string;
    appliedAt: string;
    willingToAttend: boolean;
    shareProfessionalDashboard: boolean;
    dashboardImageUrl?: string;
};

export default function ShortlistedPage() {
    const params = useParams();
    const code = String(params?.code || "");
    const [applicants, setApplicants] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    // Selection state
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    
    // Modal & Upload state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [approving, setApproving] = useState(false);
    const [replacing, setReplacing] = useState(false);
    const [replaceReason, setReplaceReason] = useState("");
    const [success, setSuccess] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Lottie ref
    const lottieContainer = useRef<HTMLDivElement>(null);

    const hasReplacementPending = applicants.some(app => app.status === 'replacement_requested');

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!code) {
                    setLoading(false);
                    return;
                }
                const res = await api.get<{ success: boolean; data: { applications: Application[] } }>(
                    `/events/public/code/${code}/applicants?status=shortlisted`
                );
                if (!alive) return;
                setApplicants(res.data?.applications || []);
            } catch (e) {
                console.error("Failed to fetch shortlisted applicants", e);
                setError(true);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [code]);

    useEffect(() => {
        if (success && lottieContainer.current) {
            const anim = lottie.loadAnimation({
                container: lottieContainer.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '/sent.json'
            });
            return () => anim.destroy();
        }
    }, [success]);

    const getUserId = (app: Application) => app.user._id || app.user.id || "";

    const handleSelect = (id: string) => {
        if (!id) return;
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedIds.size === applicants.length) {
            setSelectedIds(new Set());
        } else {
            const allIds = new Set(applicants.map(app => getUserId(app)).filter(Boolean));
            setSelectedIds(allIds);
        }
    };

    const handleApprove = async () => {
        if (!bannerFile || selectedIds.size === 0) return;
        
        try {
            setApproving(true);
            const formData = new FormData();
            formData.append("banner", bannerFile);
            formData.append("applicationIds", JSON.stringify(Array.from(selectedIds)));
            
            await api.post(`/events/public/code/${code}/applications/approve`, formData);
            
            setSuccess(true);
            setIsModalOpen(false);
            
            // Refresh list after delay
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (e) {
            console.error("Failed to approve applications", e);
        } finally {
            setApproving(false);
        }
    };

    const handleReplaceRequest = async () => {
        if (selectedIds.size === 0) return;
        
        try {
            setReplacing(true);
            await api.post(`/events/public/code/${code}/applications/replace`, {
                applicationIds: Array.from(selectedIds),
                reason: replaceReason
            });
            
            setIsReplaceModalOpen(false);
            setReplaceReason("");
            
            // Update local state to reflect replacement request
            setApplicants(prev => prev.map(app => 
                selectedIds.has(getUserId(app)) 
                    ? { ...app, status: 'replacement_requested' } 
                    : app
            ));

            setSelectedIds(new Set());
            
            // Show toast or some feedback (for now just reload or clear selection)
            // ideally we should show a success message
            
        } catch (e) {
            console.error("Failed to request replacement", e);
        } finally {
            setReplacing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-secondary">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4 text-center">
                <div ref={lottieContainer} className="w-64 h-64 mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-2">Perfect! Message Sent</h2>
                <p className="text-tertiary max-w-md">
                    The selected profiles have been approved and the banner has been sent successfully.
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4 text-center">
                <div className="rounded-full bg-error-50 p-3 text-error-600 mb-4">
                    <Users01 className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Unable to load applicants</h3>
                <p className="mt-2 text-sm text-tertiary">
                    Please try refreshing the page or contact support.
                </p>
            </div>
        );
    }

    if (applicants.length === 0) {
        return (
            <main className="min-h-screen w-full bg-[#F2F4F7] dark:bg-[#0C111D] p-4 flex items-center justify-center font-sans">
                <div className="max-w-md w-full rounded-[2rem] bg-white dark:bg-[#161B26] p-8 text-center shadow-xl">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800">
                        <Users01 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">No shortlisted candidates</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Candidates shortlisted for this event will appear here.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#F2F4F7] dark:bg-[#0C111D] sm:py-8 flex items-start justify-center font-sans">
            <div className="w-full max-w-3xl px-4 sm:px-0">
                <div className="rounded-[2rem] bg-white dark:bg-[#161B26] shadow-xl overflow-hidden ring-1 ring-gray-900/5">
                    {/* Header Section */}
                    <div className="p-6 sm:p-10 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                    Event Dashboard
                                </h2>
                                <div className="inline-flex items-center justify-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                                    {applicants.length} Applicant{applicants.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mt-2">
                                Shortlisted Profiles
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                Select profiles to approve and send the event banner.
                            </p>
                        </div>

                        {applicants.length > 0 && (
                            <div className="mt-6 flex justify-end">
                                <Button 
                                    color="secondary" 
                                    size="sm" 
                                    onClick={handleSelectAll}
                                    className="text-xs font-medium"
                                >
                                    {selectedIds.size === applicants.length ? "Deselect All" : "Select All"}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Applicants List */}
                    <div className="p-6 sm:p-10 pt-6 bg-gray-50/50 dark:bg-[#161B26]">
                        <div className="flex flex-col gap-4">
                            {applicants.map((app, i) => {
                                const userId = getUserId(app);
                                const isSelected = selectedIds.has(userId);
                                const isReplaced = app.status === 'replacement_requested';
                                
                                return (
                                    <div 
                                        key={userId || i} 
                                        className={cx(
                                            "group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-sm transition-all duration-300 cursor-pointer border",
                                            isSelected 
                                                ? "ring-2 ring-brand-500 border-transparent shadow-md bg-brand-50/5 dark:bg-brand-900/10" 
                                                : "border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600",
                                            isReplaced && "opacity-75 pointer-events-none grayscale-[0.5]"
                                        )}
                                        onClick={() => !isReplaced && handleSelect(userId)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox 
                                                    isSelected={isSelected}
                                                    onChange={() => !isReplaced && handleSelect(userId)}
                                                    isDisabled={isReplaced}
                                                />
                                            </div>
                                            <div className="relative shrink-0">
                                                <img 
                                                    src={app.user.avatarUrl} 
                                                    alt={app.user.name} 
                                                    className="size-14 rounded-2xl object-cover ring-1 ring-gray-900/5 dark:ring-white/10"
                                                />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2 text-lg flex items-center gap-2">
                                                            {app.user.name}
                                                            {isReplaced && (
                                                                <Badge size="sm" color="warning">Replacement Requested</Badge>
                                                            )}
                                                        </h3>
                                                        <a 
                                                            href={app.instagramUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-purple dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors truncate block font-medium"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            @{app.instagramHandle}
                                                        </a>
                                                    </div>
                                                   
                                                </div>

                                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                                    {app.shareProfessionalDashboard && app.dashboardImageUrl && (
                                                        <button 
                                                            type="button"
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors border border-gray-100 dark:border-gray-600 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setPreviewImage(app.dashboardImageUrl as string);
                                                            }}
                                                        >
                                                            <ArrowUpRight className="size-3.5" />
                                                            View Dashboard
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="mt-10 text-center">
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                                Powered by INFLU
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className={cx(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out w-[min(90vw,600px)]",
                selectedIds.size > 0 ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"
            )}>
                <div className="rounded-2xl bg-gray-900/90 dark:bg-white/90 backdrop-blur-md p-2 shadow-2xl ring-1 ring-white/10 dark:ring-black/10 flex flex-col gap-2">
                    <div className="px-2 pt-2 text-sm font-semibold text-white dark:text-gray-900 text-center">
                        {selectedIds.size} profile{selectedIds.size !== 1 ? 's' : ''} selected
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <Button 
                            size="lg" 
                            className="flex-1 bg-white/10 text-white hover:bg-white/20 dark:bg-black/5 dark:text-gray-900 dark:hover:bg-black/10 rounded-xl shadow-none border-0"
                            onClick={() => setIsReplaceModalOpen(true)}
                        >
                            Replace
                        </Button>
                        <Button 
                            size="lg" 
                            className="flex-1 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 rounded-xl shadow-sm"
                            onClick={() => setIsModalOpen(true)}
                            isDisabled={hasReplacementPending}
                        >
                            Approve
                        </Button>
                    </div>
                </div>
            </div>

            {/* Replacement Modal */}
            <ModalOverlay 
                isOpen={isReplaceModalOpen} 
                onOpenChange={setIsReplaceModalOpen}
                isDismissable
                className={cx(
                    "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center overflow-y-auto bg-black/50 backdrop-blur-sm pb-0 sm:items-center sm:p-4",
                    "animate-in fade-in duration-300 data-[exiting]:animate-out data-[exiting]:fade-out data-[exiting]:duration-200"
                )}
            >
                <Modal
                    className={({ isEntering, isExiting }) => cx(
                        "w-full max-w-md max-h-[85dvh] flex flex-col overflow-hidden rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary sm:rounded-2xl",
                        isEntering ? "animate-in slide-in-from-bottom duration-300 sm:zoom-in-95" : "",
                        isExiting ? "animate-out slide-out-to-bottom duration-200 sm:zoom-out-95" : ""
                    )}
                >
                    <Dialog className="outline-none flex flex-col h-full overflow-y-auto p-6" aria-label="Request Replacement">
                        <div className="flex items-center justify-between mb-4 shrink-0">
                            <h2 className="text-lg font-semibold text-primary">Request Replacement</h2>
                            <button 
                                onClick={() => setIsReplaceModalOpen(false)}
                                className="text-tertiary hover:text-primary transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        
                        <p className="text-sm text-tertiary mb-6 shrink-0">
                            Please let us know why you'd like to replace the selected profiles. Our team will find better matches for you.
                        </p>
                        
                        <div className="flex-1 flex flex-col min-h-0 w-full">
                            <textarea
                                value={replaceReason}
                                onChange={(e) => setReplaceReason(e.target.value)}
                                placeholder="e.g., Not enough engagement, style doesn't match brand..."
                                className="w-full h-32 rounded-xl border border-secondary bg-primary p-4 text-sm text-primary placeholder-tertiary focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 mb-6 resize-none block"
                            />
                            
                            <div className="mt-auto flex flex-col gap-3 shrink-0">
                                <Button 
                                    size="lg" 
                                    color="primary"
                                    onClick={handleReplaceRequest}
                                    isLoading={replacing}
                                    isDisabled={!replaceReason.trim()}
                                    className="w-full justify-center"
                                >
                                    Submit Request
                                </Button>
                                <Button 
                                    size="lg" 
                                    color="secondary"
                                    onClick={() => setIsReplaceModalOpen(false)}
                                    isDisabled={replacing}
                                    className="w-full justify-center"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            {/* Dashboard Preview Modal */}
            <ModalOverlay 
                isOpen={!!previewImage} 
                onOpenChange={() => setPreviewImage(null)}
                isDismissable
                className={cx(
                    "fixed inset-0 z-[60] flex min-h-dvh w-full items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-md p-4",
                    "animate-in fade-in duration-300 data-[exiting]:animate-out data-[exiting]:fade-out data-[exiting]:duration-200"
                )}
            >
                <Modal
                    className={({ isEntering, isExiting }) => cx(
                        "relative w-full max-w-4xl overflow-hidden rounded-2xl bg-transparent shadow-2xl",
                        isEntering ? "animate-in zoom-in-95 duration-300" : "",
                        isExiting ? "animate-out zoom-out-95 duration-200" : ""
                    )}
                >
                    <Dialog className="outline-none relative" aria-label="Dashboard Preview">
                        {previewImage && (
                            <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                                <button 
                                    onClick={() => setPreviewImage(null)}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 backdrop-blur-sm"
                                    aria-label="Close preview"
                                >
                                    <X className="size-5" />
                                </button>
                                <img 
                                    src={previewImage} 
                                    alt="Professional Dashboard" 
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>

            {/* Upload Banner Modal */}
            <ModalOverlay 
                isOpen={isModalOpen} 
                onOpenChange={setIsModalOpen}
                isDismissable
                className={cx(
                    "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center overflow-y-auto bg-black/50 backdrop-blur-sm pb-0 sm:items-center sm:p-4",
                    "animate-in fade-in duration-300 data-[exiting]:animate-out data-[exiting]:fade-out data-[exiting]:duration-200"
                )}
            >
                <Modal
                    className={({ isEntering, isExiting }) => cx(
                        "w-full max-w-md max-h-[85dvh] flex flex-col overflow-hidden rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary sm:rounded-2xl",
                        isEntering ? "animate-in slide-in-from-bottom duration-300 sm:zoom-in-95" : "",
                        isExiting ? "animate-out slide-out-to-bottom duration-200 sm:zoom-out-95" : ""
                    )}
                >
                    <Dialog className="outline-none flex flex-col h-full overflow-y-auto p-6" aria-label="Upload Event Banner">
                        <div className="flex items-center justify-between mb-4 shrink-0">
                            <h2 className="text-lg font-semibold text-primary">Upload Event Banner</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-tertiary hover:text-primary transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        
                        <p className="text-sm text-tertiary mb-6 shrink-0">
                            Please upload a banner image for the event. This will be shared with the approved creators.
                        </p>
                        
                        <div className="flex-1 flex flex-col min-h-0">
                            <FileUploadDropZone
                                accept="image/*"
                                maxSize={5 * 1024 * 1024} // 5MB
                                allowsMultiple={false}
                                onDropFiles={(files) => setBannerFile(files[0])}
                                className="mb-6 w-full shrink-0"
                            />
                            
                            {bannerFile && (
                                <div className="mb-6 flex items-center gap-3 rounded-lg border border-secondary p-3 shrink-0">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                                        <UploadCloud02 className="size-5 text-tertiary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="truncate text-sm font-medium text-primary">
                                            {bannerFile.name}
                                        </p>
                                        <p className="text-xs text-tertiary">
                                            {(bannerFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setBannerFile(null)}
                                        className="text-tertiary hover:text-error-solid transition-colors"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            )}
                            
                            <div className="mt-auto flex flex-col gap-3 shrink-0">
                                <Button 
                                    size="lg" 
                                    color="primary"
                                    onClick={handleApprove}
                                    isLoading={approving}
                                    isDisabled={!bannerFile}
                                    className="w-full justify-center"
                                >
                                    Approve & Send
                                </Button>
                                <Button 
                                    size="lg" 
                                    color="secondary"
                                    onClick={() => setIsModalOpen(false)}
                                    isDisabled={approving}
                                    className="w-full justify-center"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
       </main>
        
    );
}


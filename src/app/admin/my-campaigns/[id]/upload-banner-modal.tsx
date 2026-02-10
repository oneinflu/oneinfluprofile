"use client";

import { useState, useRef } from "react";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { XClose, UploadCloud02, Image01, CheckCircle } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

interface UploadBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventCode: string;
}

export function UploadBannerModal({ isOpen, onClose, eventCode }: UploadBannerModalProps) {
    const { token } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError(null);
            setSuccess(false);
        }
    };

    const handleUpload = async () => {
        if (!file || !eventCode || !token) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("banner", file);

            // POST /events/public/code/EVENTCODE/banner
            await api.post(
                `/events/public/code/${eventCode}/banner`,
                formData,
                { token }
            );

            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setFile(null);
                setPreviewUrl(null);
            }, 2000);
        } catch (e: any) {
            console.error("Failed to upload banner", e);
            setError(e.message || "Failed to upload banner. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
            // Reset state after closing
            setTimeout(() => {
                setFile(null);
                setPreviewUrl(null);
                setError(null);
                setSuccess(false);
            }, 300);
        }
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <Modal className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-secondary p-0 overflow-hidden">
                <Dialog className="outline-none">
                    <div className="flex flex-col max-h-[85vh]">
                        {/* Header */}
                        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-secondary">
                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    <FeaturedIcon icon={UploadCloud02} color="brand" theme="modern" size="lg" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-primary">Upload Invitation Banner</h3>
                                    <p className="text-sm text-tertiary mt-1">
                                        Upload a banner image for the campaign invitation page.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="text-tertiary hover:text-primary transition-colors p-1 shrink-0"
                                disabled={loading}
                            >
                                <XClose className="size-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 flex flex-col gap-6 overflow-y-auto">
                            {success ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="rounded-full bg-success-primary/10 p-3 mb-4">
                                        <CheckCircle className="size-8 text-success-primary" />
                                    </div>
                                    <h4 className="text-md font-semibold text-primary">Upload Successful!</h4>
                                    <p className="text-sm text-tertiary mt-1">
                                        The invitation banner has been updated.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div 
                                        className="border-2 border-dashed border-secondary rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/50 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {previewUrl ? (
                                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                                <img 
                                                    src={previewUrl} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="rounded-full bg-secondary p-3 mb-4">
                                                    <Image01 className="size-6 text-tertiary" />
                                                </div>
                                                <p className="text-sm font-medium text-brand-solid">Click to upload</p>
                                                <p className="text-xs text-tertiary mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                            </>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {error && (
                                        <div className="rounded-lg bg-error-primary/10 p-3 text-sm text-error-primary">
                                            {error}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        {!success && (
                            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-secondary bg-gray-50 dark:bg-gray-800/50">
                                <Button 
                                    size="md" 
                                    color="secondary" 
                                    onClick={handleClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    size="md" 
                                    color="primary" 
                                    onClick={handleUpload}
                                    disabled={!file || loading}
                                >
                                    {loading ? "Uploading..." : "Upload Banner"}
                                </Button>
                            </div>
                        )}
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

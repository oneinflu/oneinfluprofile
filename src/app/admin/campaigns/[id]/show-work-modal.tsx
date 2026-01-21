"use client";

import { useEffect, useState } from "react";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { XClose, Link01, Link02 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

interface ShowWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventCode: string;
    userId: string;
}

export function ShowWorkModal({ isOpen, onClose, eventCode, userId }: ShowWorkModalProps) {
    const { token } = useAuth();
    const [links, setLinks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!isOpen || !userId || !eventCode || !token) return;

        let alive = true;
        const fetchDetails = async () => {
            setLoading(true);
            setError(false);
            try {
                // GET /events/public/code/:code/application/user/:userId
                const res = await api.get<{
                    success: boolean;
                    data: {
                        application: {
                            submittedLinks: string[];
                        };
                    };
                }>(`/events/public/code/${eventCode}/application/user/${userId}`, { token });

                if (!alive) return;
                
                if (res.success && res.data?.application?.submittedLinks) {
                    setLinks(res.data.application.submittedLinks);
                } else {
                    setLinks([]);
                }
            } catch (e) {
                console.error("Failed to fetch application details", e);
                if (alive) setError(true);
            } finally {
                if (alive) setLoading(false);
            }
        };

        fetchDetails();

        return () => {
            alive = false;
        };
    }, [isOpen, userId, eventCode, token]);

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-secondary p-0 overflow-hidden">
                <Dialog className="outline-none">
                    <div className="flex flex-col max-h-[80vh]">
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b border-secondary">
                            <div className="flex gap-4">
                                <FeaturedIcon icon={Link01} color="brand" theme="modern" size="lg" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary">Submitted Work</h3>
                                    <p className="text-sm text-tertiary mt-1">
                                        Links submitted by the creator for this campaign.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="text-tertiary hover:text-primary transition-colors p-1"
                            >
                                <XClose className="size-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                    <p className="text-sm text-tertiary mt-3">Loading links...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-error-primary font-medium">Failed to load links</p>
                                    <p className="text-sm text-tertiary mt-1">Please try again later.</p>
                                </div>
                            ) : links.length === 0 ? (
                                <div className="text-center py-8 bg-secondary/30 rounded-xl border border-dashed border-secondary">
                                    <p className="text-tertiary font-medium">No links submitted</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-3 p-3 rounded-xl border border-secondary hover:border-brand-solid hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-all duration-200"
                                        >
                                            <div className="p-2 bg-secondary/50 rounded-lg group-hover:bg-brand-100 dark:group-hover:bg-brand-900/30 transition-colors">
                                                <Link02 className="size-5 text-tertiary group-hover:text-brand-solid" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-primary truncate group-hover:text-brand-solid">
                                                    {link}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-secondary bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                            <Button size="md" color="secondary" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

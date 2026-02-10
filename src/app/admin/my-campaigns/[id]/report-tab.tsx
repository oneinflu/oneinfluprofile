"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { InstagramEmbed } from "@/components/foundations/instagram-embed";
import { Users01, Clock, Link01, ChevronDown, Share04, Check } from "@untitledui/icons";
import { motion, AnimatePresence } from "motion/react";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";
import { useClipboard } from "@/hooks/use-clipboard";

interface ReportTabProps {
    eventCode?: string | null;
}

interface Application {
    _id: string;
    user: {
        _id: string;
        name: string;
        username: string;
        avatarUrl?: string;
    };
    taskCompletion: boolean;
    submittedLinks?: string[]; 
}

interface UserWork {
    user: Application['user'];
    links: string[];
}

export function ReportTab({ eventCode }: ReportTabProps) {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [usersWithWork, setUsersWithWork] = useState<UserWork[]>([]);
    
    // Metrics
    const [totalCreators, setTotalCreators] = useState(0);
    const [submittedLinksCount, setSubmittedLinksCount] = useState(0);
    const [pendingWorksCount, setPendingWorksCount] = useState(0);
    const clipboard = useClipboard();
    const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";

    useEffect(() => {
        if (!eventCode || !token) {
            setLoading(false);
            return;
        }

        let alive = true;
        
        const fetchData = async () => {
            try {
                // 1. Fetch all invited/approved applications
                const res = await api.get<{ success: boolean; data: { applications: Application[] } }>(
                    `/events/public/code/${eventCode}/applications?status=invited`,
                    { token }
                );

                if (!alive) return;

                const apps = res.data?.applications || [];
                setTotalCreators(apps.length);
                setPendingWorksCount(apps.filter(app => !app.taskCompletion).length);

                // 2. Fetch links for those who have completed the task
                const completedApps = apps.filter(app => app.taskCompletion);
                
                const workData: UserWork[] = [];
                let linkCount = 0;

                // Create an array of promises to fetch details
                const fetchPromises = completedApps.map(async (app) => {
                    try {
                        const userId = app.user._id || (app.user as any).id;
                        const detailRes = await api.get<{
                            success: boolean;
                            data: {
                                application: {
                                    submittedLinks: string[];
                                };
                            };
                        }>(`/events/public/code/${eventCode}/application/user/${userId}`, { token });
                        
                        if (detailRes.success && detailRes.data?.application?.submittedLinks) {
                            const links = detailRes.data.application.submittedLinks;
                            // Only add links that are actual URLs
                            const validLinks = links.filter(l => l && (l.startsWith('http') || l.startsWith('www')));
                            
                            if (validLinks.length > 0) {
                                linkCount += validLinks.length;
                                workData.push({
                                    user: app.user,
                                    links: validLinks
                                });
                            }
                        }
                    } catch (e) {
                        console.error(`Failed to fetch details for user ${app.user.username}`, e);
                    }
                });

                await Promise.all(fetchPromises);
                
                if (alive) {
                    setSubmittedLinksCount(linkCount);
                    setUsersWithWork(workData);
                    setLoading(false);
                }

            } catch (e) {
                console.error("Failed to load report data", e);
                if (alive) setLoading(false);
            }
        };

        fetchData();

        return () => { alive = false; };
    }, [eventCode, token]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-primary">Overview</h3>
               
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-secondary shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
                            <Users01 className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-tertiary">Total Creators</p>
                            <p className="text-2xl font-bold text-primary">{totalCreators}</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-secondary shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-success-50 dark:bg-success-900/20 text-success-600 dark:text-success-400">
                            <Link01 className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-tertiary">Submitted Links</p>
                            <p className="text-2xl font-bold text-primary">{submittedLinksCount}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-secondary shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-warning-50 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400">
                            <Clock className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-tertiary">Pending Works</p>
                            <p className="text-2xl font-bold text-primary">{pendingWorksCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion List */}
            <div>
                <h3 className="text-lg font-semibold text-primary mb-6">Work Gallery</h3>
                {usersWithWork.length === 0 ? (
                     <div className="text-center py-12 bg-secondary/30 rounded-2xl border border-dashed border-secondary">
                        <p className="text-tertiary font-medium">No work submitted yet</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {usersWithWork.map((work, index) => (
                            <UserWorkAccordion key={work.user._id || index} work={work} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function UserWorkAccordion({ work }: { work: UserWork }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-secondary shadow-sm overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <img 
                        src={work.user.avatarUrl || "/avatar.svg"} 
                        alt="" 
                        className="h-10 w-10 rounded-full object-cover bg-secondary"
                    />
                    <div className="text-left">
                        <p className="text-sm font-semibold text-primary">{work.user.name}</p>
                        <p className="text-xs text-tertiary">@{work.user.username}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-secondary bg-secondary/50 px-2.5 py-1 rounded-full">
                        {work.links.length} {work.links.length === 1 ? 'link' : 'links'}
                    </span>
                    <ChevronDown 
                        className={cx(
                            "size-5 text-tertiary transition-transform duration-200",
                            isOpen && "rotate-180"
                        )} 
                    />
                </div>
            </button>
            
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 border-t border-secondary bg-gray-50/50 dark:bg-gray-800/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {work.links.map((link, idx) => (
                                    <div key={idx} className="rounded-xl overflow-hidden border border-secondary bg-white dark:bg-gray-900 shadow-sm">
                                        <div className="p-4">
                                            <InstagramEmbed url={link} captioned />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

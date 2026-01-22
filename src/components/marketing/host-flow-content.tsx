import React from "react";
import { motion } from "motion/react";
import { CheckCircle, Calendar, File02, Share04, User01, Users01, FilterLines, XClose, Check, QrCode01, Scan, Download01, BarChart02, Heart, PlayCircle, CheckVerified02 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

// --- Step 1: Plan & Approve ---

export const HostStep1Content = () => (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-semibold w-fit">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            STAGE 01
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Plan once. <br/>
            <span className="text-brand-600 dark:text-brand-400">Get approved fast.</span>
        </h2>

        <div className="space-y-4 lg:space-y-6">
            {[
                "Create the campaign with requirements & deliverables",
                "Share one clean approval link with the brand",
                "Brand reviews and approves directly"
            ].map((item, i) => (
                <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
                        <CheckCircle className="size-4" />
                    </div>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">{item}</p>
                </div>
            ))}
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                No repeated calls. No multiple documents.
            </p>
        </div>
    </div>
);

export const HostStep1Visual = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto">
        {/* Main Card: Campaign Setup */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            {/* Mock Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-400" />
                    <div className="size-3 rounded-full bg-yellow-400" />
                    <div className="size-3 rounded-full bg-green-400" />
                </div>
                <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-md text-xs font-medium text-gray-500 shadow-sm">
                    oneinflu.com/campaign/new
                </div>
            </div>

            {/* Mock Content */}
            <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="h-2 w-20 bg-brand-100 dark:bg-brand-900/30 rounded mb-2" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Summer Launch Event</h3>
                    </div>
                    <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wide">
                        Draft
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <Calendar className="size-5 text-gray-400 mb-2" />
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Aug 24, 2024</div>
                        <div className="text-xs text-gray-500">Event Date</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <User01 className="size-5 text-gray-400 mb-2" />
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">40 Creators</div>
                        <div className="text-xs text-gray-500">Target</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase">Deliverables</div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                        <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                            <Share04 className="size-4" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">1 Instagram Reel</div>
                            <div className="text-xs text-gray-500">Required within 24h</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                        <div className="size-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600">
                            <Share04 className="size-4" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">2 Instagram Stories</div>
                            <div className="text-xs text-gray-500">Tag @brandname</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Approval Notification */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-green-100 dark:border-green-900/30 flex items-center gap-3 max-w-[280px]"
            >
                <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 flex-shrink-0">
                    <CheckCircle className="size-6" />
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">Brand Approved</div>
                    <div className="text-xs text-gray-500">Just now • Ready to launch</div>
                </div>
            </motion.div>
        </div>
    </div>
);

// --- Step 2: Invite & Select ---

export const HostStep2Content = () => (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold w-fit">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            STAGE 02
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Invite creators. <br/>
            <span className="text-blue-600 dark:text-blue-400">Lock the list.</span>
        </h2>

        <div className="space-y-4 lg:space-y-6">
            {[
                "Share one invitation link",
                "Creators apply & auto-register on INFLU",
                "You shortlist, brand confirms",
                "Official invitations sent automatically"
            ].map((item, i) => (
                <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <CheckCircle className="size-4" />
                    </div>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">{item}</p>
                </div>
            ))}
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                No spreadsheets. No "who is coming?"
            </p>
        </div>
    </div>
);

export const HostStep2Visual = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto">
        {/* Main Card: Invitation Flow */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                 <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Users01 className="size-4" />
                    Guest List
                 </div>
                 <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800" />
                    ))}
                    <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-500">
                        +36
                    </div>
                 </div>
            </div>

            <div className="p-0 flex-1 overflow-hidden">
                <div className="flex flex-col h-full">
                    {[
                        { name: "Sarah J.", status: "Applied", time: "2m ago", color: "bg-orange-100 text-orange-600" },
                        { name: "Mike T.", status: "Shortlisted", time: "15m ago", color: "bg-blue-100 text-blue-600" },
                        { name: "Emma W.", status: "Brand Confirmed", time: "1h ago", color: "bg-green-100 text-green-600" },
                        { name: "Alex R.", status: "Invited", time: "2h ago", color: "bg-purple-100 text-purple-600" }
                    ].map((item, i) => (
                        <div key={i} className="p-4 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800" />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                                    <div className="text-xs text-gray-500">@handle • 125k followers</div>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${item.color.replace('bg-', 'bg-opacity-20 bg-')}`}>
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Invite Card */}
            
        </div>
    </div>
);

// --- Step 3: Control & Check-in ---

export const HostStep3Content = () => (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold w-fit">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            STAGE 03
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Control the door. <br/>
            <span className="text-emerald-600 dark:text-emerald-400">Track the room.</span>
        </h2>

        <div className="space-y-4 lg:space-y-6">
            {[
                "Scan QR codes for instant verification",
                "Real-time guest list status (Arrived / Pending)",
                "Identify high-value profiles instantly",
                "No fake screenshots. No gate crashing."
            ].map((item, i) => (
                <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="size-4" />
                    </div>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">{item}</p>
                </div>
            ))}
        </div>
    </div>
);

export const HostStep3Visual = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto">
        {/* Main Visual: Scanner Interface */}
        <div className="absolute inset-0 bg-black rounded-3xl overflow-hidden border-8 border-gray-900 shadow-2xl">
            {/* Camera View */}
            <div className="absolute inset-0 bg-gray-900">
                <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                
                {/* Scanning Frame */}
                <div className="absolute inset-12 border-2 border-white/30 rounded-xl overflow-hidden">
                    <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]" 
                    />
                </div>

                {/* Detected Overlay */}
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl p-6 pb-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-green-500 p-0.5">
                             <div className="size-full rounded-full bg-gray-300 dark:bg-gray-700" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sarah Jenkins</h3>
                                <CheckVerified02 className="size-4 text-brand-500" />
                            </div>
                            <div className="text-sm text-gray-500">Invited Guest • +1 Allowed</div>
                        </div>
                        <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                            <Check className="size-6" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
);

// --- Step 4: Close & Report ---

export const HostStep4Content = () => (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold w-fit">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            STAGE 04
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Close the loop. <br/>
            <span className="text-indigo-600 dark:text-indigo-400">Prove the value.</span>
        </h2>

        <div className="space-y-4 lg:space-y-6">
            {[
                "Automated post-event reporting",
                "Verify deliverables (Stories, Reels) automatically",
                "Generate brand-ready PDF reports",
                "Secure future budgets with data"
            ].map((item, i) => (
                <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <CheckCircle className="size-4" />
                    </div>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">{item}</p>
                </div>
            ))}
        </div>
    </div>
);

export const HostStep4Visual = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto">
        {/* Main Card: Report */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Campaign Report</h3>
                    <p className="text-xs text-gray-500">Summer Launch • Aug 24</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                    <Download01 className="size-4" />
                    Export PDF
                </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Total Reach</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">1.2M+</div>
                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                        <span className="bg-green-100 dark:bg-green-900/30 px-1 rounded">↑ 12%</span> vs target
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Engagement</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">8.5%</div>
                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                        <span className="bg-green-100 dark:bg-green-900/30 px-1 rounded">↑ 4%</span> vs industry
                    </div>
                </div>
                <div className="col-span-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-sm text-gray-500 mb-3">Deliverables Status</div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <PlayCircle className="size-4 text-pink-500" />
                                Instagram Reels
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">38/40</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-500 w-[95%]" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Heart className="size-4 text-red-500" />
                                Stories
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">112/120</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[92%]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

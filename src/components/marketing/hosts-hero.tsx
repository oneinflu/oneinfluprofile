"use client";

import { motion } from "motion/react";
import { ArrowRight, Calendar, CheckCircle, File02, Users01, Zap } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

export const HostsHero = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            <BackgroundPattern
                pattern="grid-check"
                size="md"
                className="absolute inset-0 w-full h-full opacity-25 text-[#e5e7eb] dark:text-[#222]"
            />
            
            <div className="container mx-auto max-w-7xl px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-start gap-8 max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
                            Run influencer events <br />
                            <span className="text-brand-solid">without chaos.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-tertiary leading-relaxed">
                            Stop juggling Google Forms, WhatsApp groups, screenshots, and last-minute drama. 
                            INFLU gives you one system to invite, approve, manage entry, track content, and deliver reports — all in one place.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button size="xl" className="w-full sm:w-auto text-lg px-8">
                                Start managing events with INFLU
                            </Button>
                           
                        </div>
                    </motion.div>

                    {/* Right Visuals - Process Animation */}
                    <div className="relative h-[500px] w-full  flex items-center justify-center">
                        {/* Abstract Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />

                        {/* Main Dashboard Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                            className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg text-brand-600 dark:text-brand-400">
                                        <Calendar className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Summer Launch</h3>
                                        <p className="text-xs text-gray-500">Aug 24 • Soho House</p>
                                    </div>
                                </div>
                                <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                                    Active
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">124</div>
                                    <div className="text-xs text-gray-500">Applications</div>
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">45</div>
                                    <div className="text-xs text-gray-500">Approved</div>
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                                    <div className="text-xs text-gray-500">Turnout</div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="p-4 space-y-3">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Live Activity</p>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="flex items-center gap-3  p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                                >
                                    <div className="relative">
                                        <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">SJ</div>
                                        <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Sarah Jenkins checked in</p>
                                        <p className="text-xs text-gray-500">Just now</p>
                                    </div>
                                    <CheckCircle className="size-4 text-green-500" />
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.8 }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                                >
                                    <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">
                                        <File02 className="size-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Content Report Generated</p>
                                        <p className="text-xs text-gray-500">2m ago • 15 stories, 3 reels</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Floating Cards - Simulating Process */}
                        
                        {/* Card 1: Invite/Apply */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 50, y: -50 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -top-6 -right-6 z-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[200px]"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Users01 className="size-4 text-brand-500" />
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">New Application</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                                <div>
                                    <div className="text-xs font-medium text-gray-900 dark:text-white">Alex Rivera</div>
                                    <div className="text-[10px] text-gray-500">250k Followers</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Automation/Speed */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="absolute -bottom-8 -left-4 z-20 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                        >
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                                <Zap className="size-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white">Auto-Approved</div>
                                <div className="text-xs text-gray-500">Based on criteria</div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

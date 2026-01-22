"use client";

import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Badge } from "@/components/base/badges/badges";

export const HomeHero = ({ demoUsername = "oneinflu" }: { demoUsername?: string }) => {
    return (
        <section className="relative overflow-hidden pt-16 md:pt-24 pb-16">
            <BackgroundPattern
                pattern="grid-check"
                size="md"
                className="absolute inset-0 w-full h-full opacity-25 text-[#e5e7eb] dark:text-[#222]"
            />
            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center gap-10 px-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Badge color="brand" size="lg" type="pill-color">The Operating System for Influence</Badge>
                </motion.div>
                
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6 items-center"
                >
                    <motion.h1
                        className="bg-linear-to-b from-[#1f2937] via-[#111827] to-[#0b0f14] dark:from-[#f5f7fa] dark:via-[#d1d5db] dark:to-[#b1b6bd] bg-clip-text text-transparent text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
                    >
                        Influence is loud. <br />
                        <span className="font-serif italic text-[#1f2937] dark:text-[#f5f7fa]">Execution should be silent.</span>
                    </motion.h1>
                    <motion.p
                        className="text-md md:text-lg text-[#334155] dark:text-[#cbd5e1] max-w-xl"
                    >
                       A public profile that turns into verified collaborations,

events, and brand work — without switching systems.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-3 pt-2"
                    >
                        <Button href="/register" size="xl" color="secondary" className="w-full sm:w-auto rounded-full !bg-[#FFD400] !text-black hover:!bg-[#F2C400] !ring-transparent px-8">▶ Get Started</Button>
                      
                    </motion.div>
                    
                    <motion.div
                        className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5"
                    >
                        <div className="flex -space-x-2">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="User" className="size-8 rounded-full ring-2 ring-white object-cover dark:ring-white" />
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces" alt="User" className="size-8 rounded-full ring-2 ring-white object-cover dark:ring-white" />
                            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces" alt="User" className="size-8 rounded-full ring-2 ring-white object-cover dark:ring-white" />
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" alt="User" className="size-8 rounded-full ring-2 ring-white object-cover dark:ring-white" />
                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:ring-white">
                                +2k
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-[#0f172a] dark:text-[#e5e7eb]">64,739</span>
                                <span className="text-[#475569] dark:text-[#94a3b8]">Happy Customers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-[#0f172a] dark:text-[#e5e7eb]">4.8/5</span>
                                <span className="text-[#16a34a] dark:text-[#22c55e]">★★★★★</span>
                                <span className="text-[#475569] dark:text-[#94a3b8]">Rating</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                
               
            </div>
        </section>
    );
};

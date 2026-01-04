"use client";

import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

export const HomeHero = ({ demoUsername = "oneinflu" }: { demoUsername?: string }) => {
    return (
        <section className="relative overflow-hidden">
            <BackgroundPattern
                pattern="grid-check"
                size="md"
                className="absolute inset-0 w-full h-full opacity-25 text-[#e5e7eb] dark:text-[#222]"
            />
            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6"
                >
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-linear-to-b from-[#1f2937] via-[#111827] to-[#0b0f14] dark:from-[#f5f7fa] dark:via-[#d1d5db] dark:to-[#b1b6bd] bg-clip-text text-transparent text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
                    >
                        Your bio link should get you hired and paid.
                    </motion.h1>
                    <motion.p
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-md text-[#334155] dark:text-[#cbd5e1]"
                    >
                        Turn your link in bio into a professional business profile — with services, WhatsApp, and payments built in.
                    </motion.p>
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3"
                    >
                        <Button href="/register" size="md" color="secondary" className="rounded-full !bg-[#FFD400] !text-black hover:!bg-[#F2C400] !ring-transparent px-5">Create your free INFLU link</Button>
                        <Button href={`/${demoUsername}`} size="md" color="link-gray" className="text-[#334155] hover:text-[#0f172a] dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]">View demo profile →</Button>
                    </motion.div>
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
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
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
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
                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="md:justify-self-end"
                >
                    <div className="relative mx-auto w-full">
                        <img src="/hero.png" alt="" className="block mx-auto w-full h-auto rounded-[2rem] dark:shadow-2xl" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

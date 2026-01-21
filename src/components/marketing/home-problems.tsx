"use client";

import { motion } from "motion/react";
import { cx } from "@/utils/cx";

const problems = [
    {
        title: "Too many links, no single source of truth",
        description: "Applications, approvals, event details, and submissions live across Google Forms, WhatsApp, DMs, and spreadsheets — leaving everyone unsure what’s final and what’s verified."
    },
    {
        title: "Unclear selection and approval",
        description: "Creators don’t know if they’re confirmed. Hosts juggle screenshots and profile checks. Brands lack clarity on who was actually approved."
    },
    {
        title: "No control or visibility on event day",
        description: "Without structured check-ins, entry becomes manual and error-prone — causing confusion at the gate and uncertainty about who truly attended."
    },
    {
        title: "Execution without proof",
        description: "Creators submit links manually, hosts chase updates, and brands receive scattered screenshots — making it hard to verify delivery, performance, or ROI."
    }
];

export const HomeProblems = () => {
    return (
        <section className="py-24 md:py-32 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6"
                    >
                        The problems everyone faces in influencer collaborations
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-400"
                    >
                        Creators, hosts, and brands want smooth collaborations — but disconnected tools and manual workflows create friction at every step.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-[#111827] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {problem.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                        When everyone uses different tools, <br className="hidden md:block" />
                        no one has full visibility.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

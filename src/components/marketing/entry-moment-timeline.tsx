"use client";

import { motion } from "motion/react";
import { CheckCircle, Mail01, User01, File02, ShieldTick, FileCheck02 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const steps = [
    {
        title: "Invitation received",
        description: "You receive an exclusive invite to join the campaign.",
        icon: Mail01,
    },
    {
        title: "Profile auto-created",
        description: "Your professional profile is generated instantly.",
        icon: User01,
    },
    {
        title: "Application submitted",
        description: "One click to apply with your verified credentials.",
        icon: File02,
    },
    {
        title: "Entry verified",
        description: "Host verifies your entry in real-time.",
        icon: ShieldTick,
    },
    {
        title: "Work recorded",
        description: "Your contribution is automatically logged and tracked.",
        icon: FileCheck02,
    },
];

export const EntryMomentTimeline = () => {
    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-white dark:bg-[#0b0f14]">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-800 md:left-1/2 md:-ml-px" />

                        <div className="space-y-12 md:space-y-24">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={cx(
                                        "relative flex items-center gap-8 md:gap-12",
                                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    )}
                                >
                                    {/* Icon Marker */}
                                    <div className="absolute left-0 flex size-16 items-center justify-center rounded-full border-4 border-white bg-white shadow-sm ring-1 ring-gray-200 dark:border-[#0b0f14] dark:bg-[#111827] dark:ring-gray-800 md:left-1/2 md:-ml-8">
                                        <step.icon className="size-6 text-brand-600 dark:text-brand-400" />
                                    </div>

                                    {/* Content */}
                                    <div className={cx(
                                        "ml-24 flex flex-col md:ml-0 md:w-1/2",
                                        index % 2 === 0 ? "md:pr-16 md:text-right md:items-end" : "md:pl-16 md:text-left md:items-start"
                                    )}>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl">
                                            {step.title}
                                        </h3>
                                        {/* <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                                            {step.description}
                                        </p> */}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

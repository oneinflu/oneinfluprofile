"use client";

import { motion } from "motion/react";
import { MessageChatCircle, ShieldTick, BarChart02, SearchLg } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const problems = [
    {
        id: 1,
        icon: MessageChatCircle,
        title: "Fragmented Communication",
        problem: "Too many forms, too many WhatsApp groups",
        description: "Juggling between endless Google Forms for registrations and chaotic WhatsApp groups for coordination leaves you overwhelmed and prone to missing critical details.",
        color: "blue"
    },
    {
        id: 2,
        icon: ShieldTick,
        title: "Unverified Access",
        problem: "Creators showing up without approval",
        description: "Without a centralized guest list, managing entry becomes a nightmare, leading to uninvited guests and security concerns at your exclusive events.",
        color: "rose"
    },
    {
        id: 3,
        icon: BarChart02,
        title: "Manual Reporting",
        problem: "Brands asking for updates again and again",
        description: "Constantly compiling manual updates for brands takes you away from the actual event, turning you into a full-time data entry clerk instead of a host.",
        color: "amber"
    },
    {
        id: 4,
        icon: SearchLg,
        title: "Post-Event Tracking",
        problem: "Chasing posts after the event ends",
        description: "The work doesn't end when the lights go out. Chasing creators for deliverables and tracking engagement metrics manually is a tedious, never-ending cycle.",
        color: "purple"
    }
];

export const HostsProblem = () => {
    return (
        <section className="py-24  relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        You already know how <span className="text-brand-600 dark:text-brand-400">messy</span> events get.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400"
                    >
                        Managing events shouldn't feel like fighting fires.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                    {problems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                            <div className={cx(
                                "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                                item.color === "blue" && "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                                item.color === "rose" && "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
                                item.color === "amber" && "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                                item.color === "purple" && "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                            )}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {item.problem}
                            </h3>
                            <div className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                                {item.title}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                
            </div>
        </section>
    );
};

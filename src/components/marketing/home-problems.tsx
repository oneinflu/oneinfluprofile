"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cx } from "@/utils/cx";
import { XClose } from "@untitledui/icons";

const problems = [
    {
        id: 1,
        question: "How do I find the right creators? 🔍",
        sub: "Not just big numbers — the right fit, city, niche, and intent.",
        answer: "INFLU lets creators apply through verified profiles. You select. Not spam."
    },
    {
        id: 2,
        question: "How do I know who will actually show up? 🚪",
        sub: "Invites sent ≠ attendance.",
        answer: "INFLU uses invite-only QR entry. No scan. No entry."
    },
    {
        id: 3,
        question: "What if uninvited creators show up? 😤",
        sub: "Chaos at the gate kills brand trust.",
        answer: "INFLU shows live guest list + approval status to managers & bouncers."
    },
    {
        id: 4,
        question: "How do I stop running everything on WhatsApp? 📱",
        sub: "Forms, screenshots, DMs, voice notes…",
        answer: "INFLU replaces all of it with one event workspace."
    },
    {
        id: 5,
        question: "How do brands approve without endless calls? 📞",
        sub: "“Send details again please.”",
        answer: "INFLU gives brands a single approval page — campaign, creators, deliverables."
    },
    {
        id: 6,
        question: "How do creators look professional instantly? ✨",
        sub: "Instagram bio ≠ business profile.",
        answer: "Every creator gets an auto-created INFLU public profile. Services. Events. Proof. All in one link."
    },
    {
        id: 7,
        question: "How do I manage 40–100 creators at once? 🧠",
        sub: "Manual shortlisting doesn’t scale.",
        answer: "INFLU lets Brand filter, shortlist, approve — all logged."
    },
    {
        id: 8,
        question: "How do I make sure content is actually posted? 📸",
        sub: "Promises don’t equal deliverables.",
        answer: "INFLU requires post submission inside the event. Status: Submitted / Pending / Missed."
    },
    {
        id: 9,
        question: "How do I prove campaign execution to a brand? 📊",
        sub: "“Trust me, it worked.” isn’t enough.",
        answer: "INFLU auto-generates a final report. Posts, links, counts, completion rate."
    },
    {
        id: 10,
        question: "How do creators get more work after events? 🔁",
        sub: "One event shouldn’t be one-time.",
        answer: "Submitted work becomes public proof on their INFLU profile."
    },
    {
        id: 11,
        question: "How do brands avoid fake reach & fake creators? 🚫",
        sub: "Screenshots can be edited.",
        answer: "INFLU ties real people → real entry → real posts."
    },
    {
        id: 12,
        question: "How do I handle barter deals cleanly? 🍸",
        sub: "Food, drinks, access — but no clarity.",
        answer: "INFLU locks deliverables before entry. Barter ≠ free-for-all."
    },
    {
        id: 13,
        question: "How do I manage multiple events as a Brand? 🗓️",
        sub: "Everything blurs together.",
        answer: "Each event has its own dashboard, guest list, and report."
    },
    {
        id: 14,
        question: "How do brands reuse successful creators? ♻️",
        sub: "Starting from scratch every time hurts ROI.",
        answer: "INFLU keeps a history of performance per creator."
    },
    {
        id: 15,
        question: "What if influencer marketing finally felt controlled? 🎯",
        sub: "Not chaotic. Not manual. Not messy.",
        answer: "That’s what INFLU is built for."
    }
];

export const HomeProblems = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    
    // Duplicate items for seamless loop
    const marqueeItems = [...problems, ...problems, ...problems];

    // Colors for the cards
    const cardColors = [
        { 
            bg: "bg-blue-50/80 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/50", 
            border: "border-blue-200 dark:border-blue-800/50", 
            text: "text-blue-900 dark:text-blue-100",
            sub: "text-blue-700 dark:text-blue-300",
            accent: "bg-blue-500 dark:bg-blue-400",
            iconBg: "bg-blue-200 dark:bg-blue-900/50",
            iconColor: "text-blue-700 dark:text-blue-200",
            modalBg: "bg-blue-50/95 dark:bg-gray-900/95",
            modalBorder: "border-blue-100 dark:border-blue-900/50"
        },
        { 
            bg: "bg-purple-50/80 hover:bg-purple-100 dark:bg-purple-950/30 dark:hover:bg-purple-900/50", 
            border: "border-purple-200 dark:border-purple-800/50", 
            text: "text-purple-900 dark:text-purple-100",
            sub: "text-purple-700 dark:text-purple-300",
            accent: "bg-purple-500 dark:bg-purple-400",
            iconBg: "bg-purple-200 dark:bg-purple-900/50",
            iconColor: "text-purple-700 dark:text-purple-200",
            modalBg: "bg-purple-50/95 dark:bg-gray-900/95",
            modalBorder: "border-purple-100 dark:border-purple-900/50"
        },
        { 
            bg: "bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/50", 
            border: "border-rose-200 dark:border-rose-800/50", 
            text: "text-rose-900 dark:text-rose-100",
            sub: "text-rose-700 dark:text-rose-300",
            accent: "bg-rose-500 dark:bg-rose-400",
            iconBg: "bg-rose-200 dark:bg-rose-900/50",
            iconColor: "text-rose-700 dark:text-rose-200",
            modalBg: "bg-rose-50/95 dark:bg-gray-900/95",
            modalBorder: "border-rose-100 dark:border-rose-900/50"
        },
        { 
            bg: "bg-amber-50/80 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/50", 
            border: "border-amber-200 dark:border-amber-800/50", 
            text: "text-amber-900 dark:text-amber-100",
            sub: "text-amber-700 dark:text-amber-300",
            accent: "bg-amber-500 dark:bg-amber-400",
            iconBg: "bg-amber-200 dark:bg-amber-900/50",
            iconColor: "text-amber-700 dark:text-amber-200",
            modalBg: "bg-amber-50/95 dark:bg-gray-900/95",
            modalBorder: "border-amber-100 dark:border-amber-900/50"
        },
        { 
            bg: "bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50", 
            border: "border-emerald-200 dark:border-emerald-800/50", 
            text: "text-emerald-900 dark:text-emerald-100",
            sub: "text-emerald-700 dark:text-emerald-300",
            accent: "bg-emerald-500 dark:bg-emerald-400",
            iconBg: "bg-emerald-200 dark:bg-emerald-900/50",
            iconColor: "text-emerald-700 dark:text-emerald-200",
            modalBg: "bg-emerald-50/95 dark:bg-gray-900/95",
            modalBorder: "border-emerald-100 dark:border-emerald-900/50"
        },
    ];

    const selectedProblem = problems.find(p => p.id === selectedId);
    const selectedColorIndex = selectedProblem ? problems.findIndex(p => p.id === selectedId) : 0;
    const selectedColors = cardColors[selectedColorIndex % cardColors.length];

    return (
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-33 {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
            `}} />
            <div className="container mx-auto px-4 mb-16 md:mb-24">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight"
                    >
                        Influencer marketing is <br className="hidden md:block" />
                        easier said than <span className="relative inline-block text-brand-500 dark:text-brand-400">
                            done.
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-300 dark:text-brand-800 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto"
                    >
                        Running creators, events, and brands together breaks without a system.
                    </motion.p>
                </div>
            </div>

            {/* Marquee Container */}
            <div 
                className="relative w-full overflow-hidden py-10"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div 
                    className="flex gap-4 md:gap-6 pl-4"
                    style={{
                        width: "fit-content",
                        animation: "marquee-33 80s linear infinite",
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {marqueeItems.map((item, idx) => {
                        const colors = cardColors[idx % cardColors.length];
                        return (
                            <motion.div
                                key={`${item.id}-${idx}`}
                                className={cx(
                                    "flex-shrink-0 w-[260px] md:w-[350px] h-[240px] md:h-[280px] p-6 md:p-8 rounded-3xl border shadow-sm cursor-pointer group relative overflow-hidden transition-all duration-300",
                                    colors.bg,
                                    colors.border
                                )}
                                whileHover={{ 
                                    scale: 1.02, 
                                    rotate: Math.random() * 2 - 1,
                                    y: -5,
                                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                    transition: { duration: 0.2 }
                                }}
                                onClick={() => setSelectedId(item.id)}
                            >
                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div>
                                        <h3 className={cx("text-lg md:text-xl font-bold mb-3 leading-snug", colors.text)}>
                                            {item.question}
                                        </h3>
                                        <p className={cx("text-xs md:text-sm leading-relaxed font-medium", colors.sub)}>
                                            {item.sub}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <span className={cx(
                                            "inline-flex items-center justify-center size-8 md:size-10 rounded-full transition-all duration-300 group-hover:scale-110",
                                            colors.iconBg,
                                            colors.iconColor
                                        )}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
                                                <path d="M5 12h14" />
                                                <path d="M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Colorful accent blob */}
                                <div className={cx(
                                    "absolute -bottom-10 -right-10 size-40 md:size-48 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-all duration-500 scale-100 group-hover:scale-125",
                                    colors.accent
                                )} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Answer Modal */}
            <AnimatePresence>
                {selectedId && selectedProblem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={cx(
                                "relative w-full max-w-lg backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300",
                                selectedColors.modalBg,
                                selectedColors.modalBorder
                            )}
                        >
                            <button 
                                onClick={() => setSelectedId(null)}
                                className={cx(
                                    "absolute top-4 right-4 p-2 rounded-full transition-colors",
                                    "hover:bg-black/5 dark:hover:bg-white/10",
                                    selectedColors.sub
                                )}
                            >
                                <XClose className="size-5" />
                            </button>

                            <div className="space-y-6">
                                <div>
                                    <h3 className={cx("text-xl md:text-2xl font-bold mb-2", selectedColors.text)}>
                                        {selectedProblem.question}
                                    </h3>
                                    <p className={cx("text-sm md:text-base font-medium", selectedColors.sub)}>
                                        {selectedProblem.sub}
                                    </p>
                                </div>
                                
                                <div className={cx("h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20", selectedColors.text)} />
                                
                                <div className="flex gap-4 items-start">
                                    <div className={cx(
                                        "flex-shrink-0 size-8 md:size-10 rounded-xl flex items-center justify-center mt-1",
                                        selectedColors.iconBg
                                    )}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cx("w-5 h-5 md:w-6 md:h-6", selectedColors.iconColor)}>
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className={cx("text-base md:text-lg font-medium leading-relaxed", selectedColors.text)}>
                                            {selectedProblem.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomePain } from "@/components/marketing/home-pain";
import { FeaturesAlternatingLayout01 } from "@/components/marketing/home-shift";
import { HomeWho } from "@/components/marketing/home-who";
import { NewsletterIPhoneMockup01 } from "@/components/marketing/home-cta";


export const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [typed, setTyped] = useState("");
    const tagline = "One smart link. Infinite influence.";

    useEffect(() => {
        const reveal = setInterval(() => {
            setTyped((prev) => (prev.length < tagline.length ? tagline.slice(0, prev.length + 1) : prev));
        }, 28);
        const t = setTimeout(() => setLoading(false), 2400);
        return () => {
            clearInterval(reveal);
            clearTimeout(t);
        };
    }, []);

    return (
        <div className="min-h-screen w-full">
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-black/85 not-dark:bg-white/80 backdrop-blur-md" />
                        <motion.div
                            initial={{ scale: 0.9, rotate: -6 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 26 }}
                            className="relative flex flex-col items-center gap-5 text-center"
                        >
                            <motion.img
                                src="/logo.svg"
                                alt="INFLU"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="h-12 w-auto drop-shadow"
                            />
                            <div className="flex items-end justify-center gap-1">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scaleY: 0.6, opacity: 0.9 }}
                                        animate={{ scaleY: [0.6, 1.2, 0.8, 1.4, 0.7], opacity: [0.9, 1, 0.95, 1, 0.92] }}
                                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut", delay: i * 0.08 }}
                                        className="h-10 w-2 origin-bottom rounded-full bg-gradient-to-b from-[#7C3AED] via-[#A855F7] to-[#6366F1]"
                                    />
                                ))}
                            </div>
                            <motion.p
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="text-md font-semibold text-primary"
                            >
                                {typed}
                                <span className="inline-block w-3 align-bottom animate-pulse">|</span>
                            </motion.p>
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: ["0%", "60%", "85%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-1 h-0.5 w-40 overflow-hidden rounded-full bg-secondary_alt"
                            >
                                <div className="h-full w-full bg-brand" />
                            </motion.div>
                        </motion.div>
                        <div className="pointer-events-none absolute -top-16 left-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#7C3AED]/35 via-[#A855F7]/25 to-transparent blur-3xl animate-pulse" />
                        <div className="pointer-events-none absolute bottom-6 right-8 h-72 w-72 rounded-full bg-gradient-to-br from-[#6366F1]/30 via-[#A855F7]/20 to-transparent blur-3xl animate-pulse" />
                        <div className="pointer-events-none absolute left-1/3 top-1/2 h-56 w-56 rounded-full bg-gradient-to-br from-[#7C3AED]/25 via-[#A855F7]/15 to-transparent blur-3xl animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>
            <HomeHero />
            <HomePain />
            <FeaturesAlternatingLayout01 />
            <HomeWho />
         <NewsletterIPhoneMockup01 />
         
        </div>
    );
};

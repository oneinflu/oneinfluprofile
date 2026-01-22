"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

export const PricingHero = () => {
    return (
        <section className="relative overflow-hidden py-24 md:py-32 flex items-center justify-center text-center">
            <BackgroundPattern
                pattern="grid-check"
                size="md"
                className="absolute inset-0 w-full h-full opacity-25 text-[#e5e7eb] dark:text-[#222]"
            />
            
            <div className="container mx-auto max-w-5xl px-4 relative z-10 flex flex-col items-center gap-8">
                {/* Eyebrow */}
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-semibold text-tertiary uppercase tracking-wider"
                >
                    EARLY ACCESS PRICING
                </motion.span>

                {/* Main Heading */}
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]"
                >
                    Simple pricing for real event work.
                </motion.h1>

                {/* Subheading */}
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-tertiary max-w-5xl leading-relaxed"
                >
                    Creators join free. <br className="hidden md:block" />
                    Hosts unlock control — <span className="text-brand-solid font-medium">free during early access</span>.
                </motion.p>

                {/* CTA & Secondary Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col items-center gap-4 mt-4"
                >
                    <Button size="xl" className="text-lg px-8 rounded-full" href="/register">
                        Get early access 
                    </Button>
                    <p className="text-sm text-tertiary">
                        No credit card required · No auto billing
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

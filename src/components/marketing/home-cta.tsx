"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@untitledui/icons";

export const HomeCTA = () => {
    return (
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="relative w-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] isolate">
                    {/* Video Background */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src="/cta.webm" type="video/webm" />
                    </video>

                    {/* Overlay - Subtle dark gradient to ensure text readability */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Border/Ring overlay for that thin line look */}
                    <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] ring-1 ring-white/20 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 tracking-tight leading-[1.1] max-w-4xl drop-shadow-sm"
                        >
                            Ready to harness the power of Influence?
                        </motion.h2>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E9F4A8] text-gray-900 text-lg md:text-xl font-semibold transition-colors hover:bg-[#dce98a]"
                        >
                            Get a demo
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@untitledui/icons";

export const CreatorsHero = () => {
    return (
        <section className="py-6 md:py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a1b4b] via-[#2e1065] to-[#4c1d95] px-6 py-10 md:px-12 md:py-16 shadow-2xl isolate">
                    
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center relative z-10">
                        {/* Text Content */}
                        <div className="flex flex-col items-start gap-8">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
                            >
                                <span className="block text-white/70">Creators don’t need more links.</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9F4A8] to-[#dce98a]">They need leverage.</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="max-w-lg text-base md:text-lg text-white/80 font-medium leading-relaxed"
                            >
                                INFLU turns your profile, events, and content into proof brands trust.
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center gap-2 rounded-full bg-[#E9F4A8] px-8 py-4 text-base md:text-lg font-semibold text-gray-900 transition-all hover:bg-[#dce98a] hover:shadow-[0_0_20px_rgba(233,244,168,0.3)]"
                            >
                                Get started
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </div>

                        {/* Phone Mockup */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20, rotate: 5 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                            className="relative mx-auto w-full max-w-[280px] lg:max-w-[320px]"
                        >
                            <div className="relative z-10 aspect-[9/19] w-full">
                                {/* Glow behind phone */}
                                <div className="absolute inset-4 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-60 animate-pulse" />

                                {/* Mockup Frame */}
                                <img 
                                    src="/mockup.webp" 
                                    alt="Phone Mockup" 
                                    className="absolute inset-0 z-20 h-full w-full object-contain pointer-events-none drop-shadow-2xl"
                                />
                                
                                {/* Video Container */}
                                <div className="absolute inset-[10px] z-10 overflow-hidden rounded-[2rem] bg-black border border-white/10">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover opacity-95"
                                    >
                                        <source src="/HeroVideo.webm" type="video/webm" />
                                    </video>
                                    
                                    {/* Glass reflection overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

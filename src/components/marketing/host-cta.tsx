"use client";

import { motion } from "motion/react";
import { ArrowRight, Stars02 } from "@untitledui/icons";

export const HostCTA = () => {
    return (
        <section className="relative py-32 md:py-48 bg-black overflow-hidden">
            {/* Cool UI Background Pattern */}
            <div className="absolute inset-0 w-full h-full bg-[#0A0A0A]">
                {/* Base Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* Secondary Finer Grid (Cyberpunk feel) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                
                {/* Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-brand-900/20 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center">
                    
                    {/* Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 ring-1 ring-white/20"
                    >
                        <Stars02 className="w-4 h-4 text-brand-400" />
                        <span className="text-sm font-medium text-gray-300">Join 2,000+ elite Brands</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-[0.9]"
                    >
                        Run your next event <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 via-white to-brand-200 animate-gradient-x bg-[length:200%_auto]">without chaos.</span>
                    </motion.h2>

                    {/* Sub-line */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-3xl text-gray-400 font-light mb-12 max-w-2xl mx-auto"
                    >
                        One system. One link. <span className="text-white font-medium">Full control.</span>
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 md:px-10 md:py-5 rounded-full bg-white text-black text-base md:text-xl font-bold tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95">
                           Start Your Journey
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            
                            {/* Button Glow */}
                            <div className="absolute inset-0 rounded-full bg-white blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
                        </button>
                    </motion.div>

                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

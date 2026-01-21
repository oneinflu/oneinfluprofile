"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { cx } from "@/utils/cx";
import { 
    User01, ShoppingBag02, Image01, MessageChatCircle, BankNote01, 
    CheckVerified02, CalendarCheck01, FileCheck02, BarChartSquare02,
    QrCode01, ArrowRight, ChevronRight
} from "@untitledui/icons";

// --- Subcomponents ---

const PhoneMockup = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cx("relative mx-auto w-[280px] sm:w-[300px] md:w-[320px] aspect-[9/19] bg-gray-900 rounded-[3rem] ring-8 ring-gray-900 shadow-2xl overflow-hidden", className)}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20" />
        
        {/* Screen Content */}
        <div className="w-full h-full bg-[#0b0f14] overflow-hidden relative">
            {children}
        </div>
    </div>
);

const ProfileItem = ({ icon: Icon, title, subtitle, color = "bg-gray-800" }: any) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm mb-3">
        <div className={cx("size-10 rounded-lg flex items-center justify-center text-white", color)}>
            <Icon className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">{title}</h4>
            {subtitle && <p className="text-xs text-gray-400 truncate">{subtitle}</p>}
        </div>
    </div>
);

// --- Main Component ---

export const HomeFlow = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Step state logic
    // 0 - 0.3: Step 1 (Public)
    // 0.3 - 0.6: Step 2 (Private)
    // 0.6 - 0.9: Step 3 (Verified)
    // > 0.9: Finished
    
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            if (v < 0.33) setCurrentStep(1);
            else if (v < 0.66) setCurrentStep(2);
            else setCurrentStep(3);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    // Animations for timeline line
    const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="bg-white dark:bg-[#0b0f14] relative">
            {/* 1. Section Intro */}
            <div className="py-24 px-4 text-center max-w-4xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight"
                >
                    Every collaboration starts public.
                    <span className="text-purple-800 dark:text-gray-600">Every execution stays verified.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true,  }}
                    className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
                >
                    INFLU turns your public profile into a system that quietly records what actually happened.
                </motion.p>
                
                {/* Scroll Hint */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="mt-12 text-gray-400 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
                </motion.div>
            </div>

            {/* 2. The Core Flow (Sticky Scroll) */}
            <div ref={containerRef} className="h-[300vh] relative">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">
                    
                    {/* Background Ambience */}
                    <motion.div 
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                            background: currentStep === 1 
                                ? "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.05), transparent)" // Blue tint
                                : currentStep === 2
                                ? "linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.05), transparent)" // Purple tint
                                : "linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.05), transparent)" // Green tint
                        }}
                        transition={{ duration: 1 }}
                    />

                    {/* Timeline Container */}
                    <div className="absolute top-1/4 left-0 right-0 w-full max-w-4xl mx-auto px-8 hidden md:block z-10">
                        {/* Base Line */}
                        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full relative">
                            {/* Active Line */}
                            <motion.div 
                                style={{ width: lineWidth }} 
                                className="absolute left-0 top-0 h-full bg-brand-500" 
                            />
                            
                            {/* Dots & Labels */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between">
                                {/* Step 1 */}
                                <div className="relative">
                                    <div className={cx("size-3 rounded-full transition-colors duration-500", currentStep >= 1 ? "bg-brand-500 ring-4 ring-brand-500/20" : "bg-gray-300 dark:bg-gray-700")} />
                                    <span className={cx("absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium transition-colors duration-500", currentStep >= 1 ? "text-brand-500" : "text-gray-400")}>Public</span>
                                </div>
                                {/* Step 2 */}
                                <div className="relative">
                                    <div className={cx("size-3 rounded-full transition-colors duration-500", currentStep >= 2 ? "bg-brand-500 ring-4 ring-brand-500/20" : "bg-gray-300 dark:bg-gray-700")} />
                                    <span className={cx("absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium transition-colors duration-500", currentStep >= 2 ? "text-brand-500" : "text-gray-400")}>Private</span>
                                </div>
                                {/* Step 3 */}
                                <div className="relative">
                                    <div className={cx("size-3 rounded-full transition-colors duration-500", currentStep >= 3 ? "bg-brand-500 ring-4 ring-brand-500/20" : "bg-gray-300 dark:bg-gray-700")} />
                                    <span className={cx("absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium transition-colors duration-500", currentStep >= 3 ? "text-brand-500" : "text-gray-400")}>Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Central Phone Mockup */}
                    <div className="relative z-20 mt-12 md:mt-0">
                        <PhoneMockup>
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div 
                                        key="step1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full flex flex-col relative"
                                    >
                                        {/* Step 1: Public Profile */}
                                        <div className="p-4 pt-8 h-full overflow-y-auto no-scrollbar pb-24">
                                            {/* Static Content (Scrollable) */}
                                            <div className="flex flex-col items-center mb-6">
                                                <div className="size-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 mb-3 ring-4 ring-gray-800" />
                                                <div className="h-4 w-32 bg-gray-800 rounded-full mb-2" />
                                                <div className="h-3 w-24 bg-gray-800/50 rounded-full" />
                                            </div>
                                            <ProfileItem icon={User01} title="About Me" subtitle="Designer & Content Creator" color="bg-blue-500" />
                                            <ProfileItem icon={ShoppingBag02} title="My Shop" subtitle="Lightroom Presets & Merch" color="bg-purple-500" />
                                            <ProfileItem icon={Image01} title="Portfolio" subtitle="View my latest work" color="bg-pink-500" />
                                            <ProfileItem icon={MessageChatCircle} title="Contact" subtitle="Book a consultation" color="bg-green-500" />
                                            <ProfileItem icon={BankNote01} title="Payments" subtitle="Secure checkout" color="bg-orange-500" />
                                            <ProfileItem icon={Image01} title="Instagram" subtitle="@username" color="bg-pink-600" />
                                        </div>
                                        
                                        {/* Overlay Caption */}
                                        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
                                            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                                                Where discovery happens
                                            </span>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div 
                                        key="step2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full flex flex-col p-4 pt-8"
                                    >
                                        {/* Step 2: Private Application */}
                                        <div className="flex flex-col items-center mb-8">
                                            <div className="size-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 mb-3 ring-4 ring-gray-800 opacity-80" />
                                            <div className="h-3 w-24 bg-gray-800 rounded-full" />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-gray-400">Status</span>
                                                    <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Approved</span>
                                                </div>
                                                <h4 className="text-white font-medium mb-1">Summer Launch Event</h4>
                                                <p className="text-xs text-gray-500">You have been selected for this campaign.</p>
                                            </div>

                                            <motion.div 
                                                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="bg-brand-500/10 rounded-xl p-4 border border-brand-500/20 flex items-center gap-3 shadow-lg shadow-brand-500/5"
                                            >
                                                <CalendarCheck01 className="size-5 text-brand-400" />
                                                <div>
                                                    <h4 className="text-sm font-medium text-brand-100">Invitation Sent</h4>
                                                    <p className="text-xs text-brand-500/60">Check your inbox</p>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
                                            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                                                Where collaboration begins
                                            </span>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div 
                                        key="step3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full flex flex-col p-4 pt-12 items-center text-center"
                                    >
                                        {/* Step 3: Verified Execution */}
                                        <motion.div 
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring" }}
                                            className="size-32 bg-white p-2 rounded-2xl mb-6"
                                        >
                                            <QrCode01 className="w-full h-full text-gray-900" />
                                        </motion.div>

                                        <motion.div 
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center gap-2 text-green-400 mb-8"
                                        >
                                            <CheckVerified02 className="size-5" />
                                            <span className="font-medium">Verified Entry</span>
                                        </motion.div>

                                        <div className="w-full space-y-2">
                                            <motion.div 
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
                                            >
                                                <FileCheck02 className="size-4 text-brand-400" />
                                                <span className="text-xs text-gray-300">Deliverables Submitted</span>
                                            </motion.div>
                                            <motion.div 
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
                                            >
                                                <BarChartSquare02 className="size-4 text-purple-400" />
                                                <span className="text-xs text-gray-300">Report Generated</span>
                                            </motion.div>
                                        </div>

                                        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
                                            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                                                Where execution is recorded
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </PhoneMockup>
                    </div>
                </div>
            </div>

            {/* 3. The "Aha" Connector & Closing */}
            <div className="py-24 md:py-32 bg-white dark:bg-[#0b0f14] relative z-10 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 text-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h3 className="text-4xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                            Same identity. <span className="text-gray-400 dark:text-gray-600">Different stages.</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">One system.</span>
                        </h3>
                    </motion.div>

                    {/* Reassurance - "Manifesto" Style */}
                    <div className="max-w-3xl mx-auto mb-24 space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
                         {[
                            { role: "Creators", action: "don’t need to explain twice.", color: "text-blue-500" },
                            { role: "Hosts", action: "don’t need to chase updates.", color: "text-purple-500" },
                            { role: "Brands", action: "don’t need to ask for proof.", color: "text-green-500" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className={cx("text-sm font-bold uppercase tracking-wider mb-2", item.color)}>{item.role}</div>
                                <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200 leading-tight">
                                    {item.action}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Minimal Supporting Text */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 mb-16"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Public profiles build trust
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Private flows ensure control
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Verified records close the loop
                        </span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <button className="group relative inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all shadow-xl shadow-brand-500/10 hover:shadow-brand-500/20">
                            <span className="relative z-10">See how this works end-to-end</span>
                            <ArrowRight className="size-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>
                    </motion.div>
                    <p className="mt-6 text-sm text-gray-400 font-medium">One profile. Every collaboration.</p>
                </div>
            </div>
        </section>
    );
};

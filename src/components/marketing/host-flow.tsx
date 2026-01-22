"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { CheckCircle, Calendar, File02, Share04, User01, Users01, FilterLines, XClose, Check, QrCode01, Scan, Download01, BarChart02, Heart, PlayCircle } from "@untitledui/icons";
import { 
    HostStep1Content, HostStep1Visual, 
    HostStep2Content, HostStep2Visual, 
    HostStep3Content, HostStep3Visual, 
    HostStep4Content, HostStep4Visual 
} from "./host-flow-content";
import { cx } from "@/utils/cx";

export const HostFlow = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileActiveStep, setMobileActiveStep] = useState(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Transform logic for horizontal movement
    // 5 steps = 4 transitions. 
    // 0-0.2: Step 1 active
    // 0.2-0.4: Step 2 active
    // 0.4-0.6: Step 3 active
    // 0.6-0.8: Step 4 active
    // 0.8-1.0: Step 5 active
    // Width 500%, -400% shift (4 screens) = -80%
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

    // Opacity/Focus logic for Step 1 visuals
    const step1Opacity = useTransform(smoothProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const step1Scale = useTransform(smoothProgress, [0, 0.15, 0.2], [1, 1, 0.9]);

    // Opacity/Focus logic for Step 2 visuals
    const step2Opacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
    const step2Scale = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.4], [0.9, 1, 1, 0.9]);

    // Opacity/Focus logic for Step 3 visuals
    const step3Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
    const step3Scale = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.6], [0.9, 1, 1, 0.9]);

    // Opacity/Focus logic for Step 4 visuals
    const step4Opacity = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
    const step4Scale = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.8], [0.9, 1, 1, 0.9]);

    // Opacity/Focus logic for Step 5 visuals
    const step5Opacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);
    const step5Scale = useTransform(smoothProgress, [0.75, 0.85, 1], [0.9, 1, 1]);

    // Background Opacity Logic (Crossfading)
    const bg1Opacity = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0]);
    const bg2Opacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const bg3Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
    const bg4Opacity = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const bg5Opacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);

    return (
        <section ref={containerRef} className="relative bg-white dark:bg-gray-950 min-h-screen lg:h-[600vh]">
            <div className="relative w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
                
                {/* Dynamic Background Layer */}
                <div className="sticky top-0  w-full lg:absolute lg:inset-0 -z-10 overflow-hidden pointer-events-none">
                    
                    {/* Step 1 Background: Warm/Brand (Plan) */}
                    <motion.div style={{ opacity: isMobile ? (mobileActiveStep === 0 ? 1 : 0) : bg1Opacity }} className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-rose-50/50 dark:from-orange-950/30 dark:via-gray-950 dark:to-rose-950/30" />
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 dark:bg-orange-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-200/20 dark:bg-rose-600/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
                    </motion.div>

                    {/* Step 2 Background: Blue/Purple (Invite) */}
                    <motion.div style={{ opacity: isMobile ? (mobileActiveStep === 1 ? 1 : 0) : bg2Opacity }} className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-50/50 via-white to-purple-50/50 dark:from-blue-950/30 dark:via-gray-950 dark:to-purple-950/30" />
                        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue-100/30 dark:bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-[80px]" />
                    </motion.div>

                    {/* Step 3 Background: Green/Teal (Control) */}
                    <motion.div style={{ opacity: isMobile ? (mobileActiveStep === 2 ? 1 : 0) : bg3Opacity }} className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 via-white to-teal-50/50 dark:from-emerald-950/30 dark:via-gray-950 dark:to-teal-950/30" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/20 dark:bg-emerald-600/10 rounded-full blur-[100px]" />
                        <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-teal-200/20 dark:bg-teal-600/10 rounded-full blur-[60px]" />
                    </motion.div>

                    {/* Step 4 Background: Indigo/Violet (Report) */}
                    <motion.div style={{ opacity: isMobile ? (mobileActiveStep === 3 ? 1 : 0) : bg4Opacity }} className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-violet-50/50 dark:from-indigo-950/30 dark:via-gray-950 dark:to-violet-950/30" />
                        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-200/20 dark:bg-violet-600/10 rounded-full blur-[100px]" />
                    </motion.div>

                    {/* Step 5 Background: Dark/Premium (Value) */}
                    <motion.div style={{ opacity: isMobile ? (mobileActiveStep === 4 ? 1 : 0) : bg5Opacity }} className="absolute inset-0 w-full h-full bg-[#0A0A0A]">
                         {/* Base Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                        {/* Secondary Finer Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                        {/* Ambient Glows */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen" />
                    </motion.div>
                </div>

                {/* Content Track */}
                <motion.div style={{ x: isMobile ? 0 : x }} className="relative z-10 flex flex-col w-full h-auto lg:flex-row lg:w-[500%] lg:h-full">
                    
                    {/* STEP 1: PLAN & APPROVE */}
                    <motion.div 
                        onViewportEnter={() => setMobileActiveStep(0)}
                        viewport={{ amount: 0.3 }}
                        className="w-full min-h-screen lg:w-[100vw] lg:h-full lg:min-h-0 flex items-center justify-center p-6 md:p-12"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl w-full items-center">
                            
                            {/* Left Content */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step1Opacity, scale: isMobile ? 1 : step1Scale }}
                            >
                                <HostStep1Content />
                            </motion.div>

                            {/* Right Visuals - Campaign Setup */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step1Opacity, scale: isMobile ? 1 : step1Scale }}
                            >
                                <HostStep1Visual />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* STEP 2: INVITE & SELECT */}
                    <motion.div 
                        onViewportEnter={() => setMobileActiveStep(1)}
                        viewport={{ amount: 0.3 }}
                        className="w-full min-h-screen lg:w-[100vw] lg:h-full lg:min-h-0 flex items-center justify-center p-6 md:p-12"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl w-full items-center">
                            
                            {/* Left Content */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step2Opacity, scale: isMobile ? 1 : step2Scale }}
                            >
                                <HostStep2Content />
                            </motion.div>

                            {/* Right Visuals - Applications & Invitations */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step2Opacity, scale: isMobile ? 1 : step2Scale }}
                            >
                                <HostStep2Visual />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* STEP 3: CONTROL THE EVENT */}
                    <motion.div 
                        onViewportEnter={() => setMobileActiveStep(2)}
                        viewport={{ amount: 0.3 }}
                        className="w-full min-h-screen lg:w-[100vw] lg:h-full lg:min-h-0 flex items-center justify-center p-6 md:p-12"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl w-full items-center">
                            
                            {/* Left Content */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step3Opacity, scale: isMobile ? 1 : step3Scale }}
                                className="flex flex-col gap-6 lg:gap-8 max-w-lg"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    STAGE 03 — EVENT DAY
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Control entry <br/>
                                    <span className="text-green-600 dark:text-green-400">at the gate.</span>
                                </h2>

                                <div className="space-y-4 lg:space-y-6">
                                    {[
                                        "QR scan + invitation code",
                                        "Instant approval status",
                                        "Live guest & creator list"
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                                                <CheckCircle className="size-4" />
                                            </div>
                                            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                                        Green check = entry allowed. <br/>
                                        <span className="text-gray-500 font-normal">No arguments at the door.</span>
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right Visuals - Scanning & Entry */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step3Opacity, scale: isMobile ? 1 : step3Scale }}
                                className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto flex items-center justify-center"
                            >
                                {/* DASHBOARD BACKGROUND (The "Source of Truth") */}
                                <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
                                    {/* Dashboard Header */}
                                    <div className="h-12 border-b border-gray-100 dark:border-gray-800 flex items-center px-4 justify-between bg-gray-50 dark:bg-gray-800/50">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-red-400" />
                                            <div className="size-3 rounded-full bg-amber-400" />
                                            <div className="size-3 rounded-full bg-green-400" />
                                        </div>
                                        <div className="text-xs font-mono text-gray-400">admin.oneinflu.com/events/live</div>
                                    </div>

                                    {/* Dashboard Content */}
                                    <div className="flex-1 p-6 font-mono text-sm relative">
                                        <div className="flex justify-between items-end mb-6">
                                            <div>
                                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Live Event Status</div>
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">Summer Launch Party</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Checked In</div>
                                                <div className="text-2xl font-bold text-green-500">142<span className="text-gray-400 text-lg">/200</span></div>
                                            </div>
                                        </div>

                                        {/* Guest List Table */}
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-12 text-xs text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-800">
                                                <div className="col-span-5">Guest Name</div>
                                                <div className="col-span-4">Ticket Type</div>
                                                <div className="col-span-3 text-right">Status</div>
                                            </div>

                                            {/* List Items */}
                                            {[
                                                { name: "Alex Rivera", type: "VIP Creator", status: "Checked In", time: "8:30 PM" },
                                                { name: "Sarah Jenkins", type: "Brand Partner", status: "Just Now", highlight: true },
                                                { name: "Mike Chen", type: "Standard Access", status: "Pending", time: "--" },
                                                { name: "Emily Davis", type: "VIP Creator", status: "Pending", time: "--" },
                                                { name: "James Wilson", type: "Press Pass", status: "Pending", time: "--" },
                                            ].map((guest, i) => (
                                                <div key={i} className={cx(
                                                    "grid grid-cols-12 items-center py-2 px-3 rounded-lg transition-colors",
                                                    guest.highlight ? "bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                )}>
                                                    <div className="col-span-5 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                        <div className={cx("size-2 rounded-full", guest.status === "Pending" ? "bg-gray-300" : "bg-green-500")} />
                                                        {guest.name}
                                                    </div>
                                                    <div className="col-span-4 text-gray-500">{guest.type}</div>
                                                    <div className="col-span-3 text-right">
                                                        {guest.highlight ? (
                                                            <motion.span 
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                whileInView={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 1.6 }} // Sync with phone success
                                                                className="inline-flex items-center gap-1 text-green-600 font-bold"
                                                            >
                                                                <Check className="size-3" /> Check-in
                                                            </motion.span>
                                                        ) : (
                                                            <span className={cx(guest.status === "Checked In" ? "text-green-600" : "text-gray-400")}>
                                                                {guest.status}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* DEVICE MOCKUP (Floating in front) */}
                                <motion.div 
                                    initial={{ y: 40, x: 20 }}
                                    whileInView={{ y: 20, x: 40 }}
                                    transition={{ duration: 1 }}
                                    className="absolute right-0 bottom-[-40px] md:right-[-20px] md:bottom-[-20px] w-64 h-[450px] bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden ring-1 ring-white/10 rotate-[-6deg]"
                                >
                                    {/* Dynamic Island / Notch */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-xl z-30" />

                                    {/* SCREEN CONTENT */}
                                    <div className="relative w-full h-full bg-gray-950 flex flex-col">
                                        
                                        {/* 1. SCANNING INTERFACE (Base Layer) */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                            {/* Camera Feed Background Effect */}
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                                            <div className="absolute inset-0 bg-black/60" />

                                            {/* Scanning Frame */}
                                            <div className="relative w-48 h-48 border-2 border-white/20 rounded-2xl overflow-hidden">
                                                {/* Corner Accents */}
                                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-tl-lg" />
                                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr-lg" />
                                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50 rounded-bl-lg" />
                                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50 rounded-br-lg" />

                                                {/* Scanning Laser */}
                                                <motion.div 
                                                    animate={{ top: ["0%", "100%", "0%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)]"
                                                />
                                            </div>

                                            <div className="mt-6 text-white/60 text-xs font-medium animate-pulse">
                                                Scanning Ticket...
                                            </div>
                                        </div>

                                        {/* 2. APPROVED OVERLAY (Transitions In) */}
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                                            className="absolute inset-0 z-20 bg-gray-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
                                        >
                                            {/* Success Icon */}
                                            <div className="size-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 ring-4 ring-green-500/10">
                                                <div className="size-10 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                                                    <Check className="size-6 text-white stroke-[4]" />
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <h3 className="text-xl font-bold text-white mb-1">Approved</h3>
                                            <div className="flex items-center gap-2 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20 mb-4">
                                                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wide">Checked In</span>
                                            </div>

                                            {/* Guest Profile */}
                                            <div className="w-full bg-gray-800/50 rounded-xl p-3 border border-gray-700 mb-4">
                                                <div className="flex items-center gap-3 text-left">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" 
                                                        alt="Guest" 
                                                        className="size-10 rounded-full object-cover border-2 border-gray-600"
                                                    />
                                                    <div>
                                                        <div className="text-white text-sm font-bold">Sarah Jenkins</div>
                                                        <div className="text-gray-400 text-xs">Brand Partner</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Welcome Message */}
                                            <div className="text-white/80 font-medium text-sm">
                                                "Welcome Sarah!"
                                            </div>
                                        </motion.div>

                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* STEP 4: CLOSE & REPORT */}
                    <motion.div 
                        onViewportEnter={() => setMobileActiveStep(3)}
                        viewport={{ amount: 0.3 }}
                        className="w-full min-h-screen lg:w-[100vw] lg:h-full lg:min-h-0 flex items-center justify-center p-6 md:p-12"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl w-full items-center">
                            
                            {/* Left Content */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step4Opacity, scale: isMobile ? 1 : step4Scale }}
                                className="flex flex-col gap-6 lg:gap-8 max-w-lg"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-semibold w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                                    </span>
                                    STAGE 04
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Close campaigns <br/>
                                    <span className="text-brand-600 dark:text-brand-400">professionally.</span>
                                </h2>

                                <div className="space-y-4 lg:space-y-6">
                                    {[
                                        "Creators submit content links",
                                        "Submissions auto-tracked",
                                        "Final report generated instantly"
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                                <CheckCircle className="size-4" />
                                            </div>
                                            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                                        You deliver proof. <br/>
                                        You move on to the next event.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right Visuals */}
                            <motion.div 
                                style={{ opacity: isMobile ? 1 : step4Opacity, scale: isMobile ? 1 : step4Scale }}
                                className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto"
                            >
                                {/* Report Card */}
                                <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
                                    {/* Header */}
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start bg-gray-50 dark:bg-gray-800/50">
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Campaign Report</div>
                                            <div className="text-xl font-bold text-gray-900 dark:text-white">Summer Launch 2024</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Reach</div>
                                            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">1.2M+</div>
                                        </div>
                                    </div>

                                    {/* Grid Content */}
                                    <div className="p-6 flex-1 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
                                        <div className="grid grid-cols-3 gap-3 h-full items-start">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="relative bg-gray-900 rounded-xl overflow-hidden aspect-[9/16] group ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all">
                                                    {/* Abstract Video Thumbnail Gradient */}
                                                    <div className={cx(
                                                        "w-full h-full bg-gradient-to-br transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100",
                                                        i === 1 ? "from-purple-500 via-pink-500 to-orange-500" : 
                                                        i === 2 ? "from-blue-500 via-cyan-500 to-teal-500" : "from-rose-500 via-red-500 to-yellow-500"
                                                    )} />
                                                    
                                                    {/* Play Button Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                                                        <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg group-hover:scale-110 transition-transform">
                                                            <PlayCircle className="size-6 fill-white/20" />
                                                        </div>
                                                    </div>

                                                    {/* Bottom Info Overlay */}
                                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent pt-10 flex items-end justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="size-6 rounded-full bg-white/20 border border-white/50 backdrop-blur-sm overflow-hidden">
                                                                <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-400" />
                                                            </div>
                                                            <div className="h-2 w-12 bg-white/40 rounded-full backdrop-blur-sm" />
                                                        </div>
                                                        <div className="flex items-center gap-1 text-white text-[10px] font-bold shadow-sm">
                                                            <Heart className="size-3 fill-white" />
                                                            {i === 1 ? "12.4k" : i === 2 ? "8.2k" : "5.9k"}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Stats */}
                                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                {[1,2,3].map(i => <div key={i} className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900" />)}
                                            </div>
                                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                <span className="text-gray-900 dark:text-white font-bold">42</span> Creators
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                                            <CheckCircle className="size-4" />
                                            All Submitted
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Download Button */}
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute -bottom-6 -right-6 bg-brand-600 text-white p-4 rounded-xl shadow-xl flex items-center gap-3 cursor-pointer z-20 hover:bg-brand-700 transition-colors border-4 border-white dark:border-gray-950"
                                >
                                    <Download01 className="size-6" />
                                    <div className="text-left">
                                        <div className="text-xs opacity-80 font-medium uppercase tracking-wide">Download</div>
                                        <div className="font-bold text-sm">Final Report.pdf</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* STEP 5: VALUE REINFORCEMENT */}
                    <motion.div 
                        onViewportEnter={() => setMobileActiveStep(4)}
                        viewport={{ amount: 0.3 }}
                        className="w-full min-h-screen lg:w-[100vw] lg:h-full lg:min-h-0 flex items-center justify-center p-6 md:p-12 relative overflow-hidden"
                    >
                        
                        <motion.div 
                            style={{ opacity: isMobile ? 1 : step5Opacity, scale: isMobile ? 1 : step5Scale }}
                            className="relative z-10 text-center max-w-4xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-12 lg:mb-16 tracking-tight">
                                You stay in control. <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Always.</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 lg:mb-20">
                                {[
                                    "Your pricing stays yours",
                                    "Your brand stays yours",
                                    "Your client relationship stays yours"
                                ].map((text, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                        <div className="size-12 lg:size-14 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 shadow-[0_0_15px_rgba(var(--brand-500-rgb),0.3)]">
                                            <Check className="size-6 lg:size-7 stroke-[3]" />
                                        </div>
                                        <p className="text-lg lg:text-xl font-semibold text-white">{text}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xl md:text-3xl font-medium text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                INFLU works behind you, <br/>
                                <span className="text-white">not above you.</span>
                            </p>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

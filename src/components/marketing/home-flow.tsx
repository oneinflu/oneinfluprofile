"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { cx } from "@/utils/cx";
import { 
    ShoppingBag02, MessageChatCircle, BankNote01, 
    CheckVerified02, CalendarCheck01, FileCheck02, BarChartSquare02,
    QrCode01, ArrowRight, SearchLg, CurrencyDollarCircle,
    Link02, Star01, Lock01, MarkerPin01
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

const FloatingBadge = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
        className={cx("absolute z-30 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-2", className)}
    >
        {children}
    </motion.div>
);

// --- Content Components ---

const Step1Content = () => (
    <div className="space-y-6">
        <h2 className="text-2xl md:text-6xl font-bold tracking-tight leading-tight">
            Influence starts <br/>
            <span className="text-brand-400">the deal.</span>
        </h2>
        <h3 className="text-lg md:text-2xl font-medium text-brand-300">
            INFLU turns profiles into verified entry points.
        </h3>
        <div className="text-base md:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 space-y-4">
            <p>
                Social media creates attention. INFLU converts that attention into profiles, permissions, and participation — for creators, hosts, and brands, all in one system.
            </p>
            <p className="font-medium text-gray-300">
                No forms. No WhatsApp chaos. No confusion at the gate.
            </p>
        </div>
    </div>
);

const Step1Phone = () => (
    <div className="h-full flex flex-col relative">
        <div className="p-4 pt-8 h-full overflow-y-auto no-scrollbar pb-24">
            <div className="flex flex-col items-center mb-6">
                <div className="size-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 mb-3 ring-4 ring-gray-800" />
                <div className="h-4 w-32 bg-gray-800 rounded-full mb-2" />
                <div className="h-3 w-24 bg-gray-800/50 rounded-full" />
            </div>
            <ProfileItem icon={Star01} title="Services" subtitle="Design & Strategy" color="bg-orange-500" />
            <ProfileItem icon={CalendarCheck01} title="Events I'm part of" subtitle="Upcoming Workshops" color="bg-pink-500" />
            <ProfileItem icon={ShoppingBag02} title="My Shop" subtitle="Digital Products" color="bg-purple-500" />
            <ProfileItem icon={MessageChatCircle} title="Contact / Enquiry" subtitle="Work with me" color="bg-green-500" />
            
            <div className="mt-4 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center gap-2">
                <CheckVerified02 className="size-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-100">Verified by INFLU</span>
            </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                Where discovery becomes structure
            </span>
        </div>
    </div>
);

const Step1Badges = () => (
    <>
        <FloatingBadge className="top-[15%] -left-2 md:-left-8" delay={0.2}>
            <Link02 className="size-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Bio Link</span>
        </FloatingBadge>
        <FloatingBadge className="top-[25%] -right-2 md:-right-10" delay={0.3}>
            <Star01 className="size-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Services</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[40%] -left-4 md:-left-12" delay={0.4}>
            <ShoppingBag02 className="size-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Shop</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[25%] -right-4 md:-right-12" delay={0.5}>
            <CalendarCheck01 className="size-5 text-pink-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Events</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[10%] left-1/2 -translate-x-1/2" delay={0.6}>
            <CheckVerified02 className="size-5 text-brand-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Verified Profile</span>
        </FloatingBadge>
    </>
);

const Step2Content = () => (
    <div className="space-y-6">
        <h2 className="text-2xl md:text-6xl font-bold tracking-tight leading-tight">
            Brands don't want noise. <br/>
            <span className="text-purple-400">They want control.</span>
        </h2>
        <h3 className="text-lg md:text-2xl font-medium text-purple-300">
            INFLU replaces guesswork with approval-driven collaboration.
        </h3>
        <div className="text-base md:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 space-y-4">
            <p>
                Brands approve campaigns. Hosts shortlist creators. Creators enter only with verified invitations.
            </p>
            <p className="font-medium text-gray-300">
                Every step is tracked. Every participant is known. Every deliverable is expected.
            </p>
        </div>
    </div>
);

const Step2Phone = () => (
    <div className="h-full flex flex-col p-4 pt-8">
        <div className="space-y-3 overflow-y-auto no-scrollbar pb-20">
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Campaign Created</span>
                    <span className="text-[10px] font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">Pending Brand Approval</span>
                </div>
                <h4 className="text-white text-sm font-medium">Summer Launch</h4>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Creator Selected</span>
                    <span className="text-[10px] font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                    <span className="text-white text-sm">@username</span>
                </div>
            </div>

            <div className="bg-brand-500/10 rounded-xl p-3 border border-brand-500/20">
                <div className="flex items-center gap-2 mb-2">
                    <CalendarCheck01 className="size-4 text-brand-400" />
                    <span className="text-brand-100 text-sm font-medium">Invitation Sent</span>
                </div>
                <div className="h-20 bg-gray-800 rounded-lg mb-2 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                    <div className="absolute bottom-2 left-2 text-[10px] text-white/80">Unique Code: INV-8X92</div>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 opacity-60">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Event Day</span>
                    <QrCode01 className="size-4 text-white" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Show QR at Entry</p>
            </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                Where collaboration is permissioned
            </span>
        </div>
    </div>
);

const Step2Badges = () => (
    <>
        <FloatingBadge className="top-[20%] -right-4 md:-right-16" delay={0.2}>
            <Star01 className="size-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Client Approved</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[35%] -left-4 md:-left-12" delay={0.4}>
            <Lock01 className="size-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Invite Only</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[15%] -right-2 md:-right-8" delay={0.6}>
            <MarkerPin01 className="size-5 text-red-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Location Locked</span>
        </FloatingBadge>
    </>
);

const Step3Content = () => (
    <div className="space-y-6">
        <h2 className="text-2xl md:text-6xl font-bold tracking-tight leading-tight">
            Influence is useless <br/>
            <span className="text-gray-500">if it isn't recorded.</span>
        </h2>
        <h3 className="text-lg md:text-2xl font-medium text-green-400">
            INFLU verifies execution.
        </h3>
        <div className="text-base md:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 space-y-4">
            <p>
                Entry is scanned. Attendance is logged. Deliverables are submitted. Reports are generated.
            </p>
            <p>
                From the door of the venue to the Instagram grid — everything is documented.
            </p>
            <p className="font-medium text-gray-300">
                This is not marketing software. This is proof of work.
            </p>
        </div>
    </div>
);

const Step3Phone = () => (
    <div className="h-full flex flex-col p-4 pt-12 items-center text-center">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="size-32 bg-white p-2 rounded-2xl mb-6"
        >
            <QrCode01 className="w-full h-full text-gray-900" />
        </motion.div>
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-green-400 mb-8"
        >
            <CheckVerified02 className="size-5" />
            <span className="font-medium">Verified Entry</span>
        </motion.div>
        <div className="w-full space-y-2">
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
            >
                <FileCheck02 className="size-4 text-brand-400" />
                <span className="text-xs text-gray-300">Deliverables Submitted</span>
            </motion.div>
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
            >
                <BarChartSquare02 className="size-4 text-purple-400" />
                <span className="text-xs text-gray-300">Report Generated</span>
            </motion.div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                Where execution becomes evidence
            </span>
        </div>
    </div>
);

const Step3Badges = () => (
    <>
        <FloatingBadge className="top-[20%] -right-4 md:-right-16" delay={0.2}>
            <BankNote01 className="size-5 text-green-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Brand Spend Logged</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[40%] -left-4 md:-left-12" delay={0.4}>
            <BarChartSquare02 className="size-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Report Ready</span>
        </FloatingBadge>
        <FloatingBadge className="bottom-[15%] -right-2 md:-right-8" delay={0.6}>
            <FileCheck02 className="size-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">40/40 Creators Delivered</span>
        </FloatingBadge>
    </>
);

// --- Main Component ---

export const HomeFlow = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const { scrollYProgress: mobileScrollProgress } = useScroll({
        target: mobileContainerRef,
        offset: ["start 70%", "end 80%"]
    });
    
    const mobileLineHeight = useTransform(mobileScrollProgress, [0, 1], ["0%", "100%"]);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            if (v < 0.33) setCurrentStep(1);
            else if (v < 0.66) setCurrentStep(2);
            else setCurrentStep(3);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    // Animations for timeline line (Desktop)
    const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    const steps = [
        {
            id: 1,
            icon: SearchLg,
            iconColor: "text-brand-400",
            iconBg: "bg-brand-500/10 border-brand-500/20",
            content: <Step1Content />,
            phone: <Step1Phone />,
            badges: <Step1Badges />
        },
        {
            id: 2,
            icon: MessageChatCircle,
            iconColor: "text-purple-400",
            iconBg: "bg-purple-500/10 border-purple-500/20",
            content: <Step2Content />,
            phone: <Step2Phone />,
            badges: <Step2Badges />
        },
        {
            id: 3,
            icon: CurrencyDollarCircle,
            iconColor: "text-green-400",
            iconBg: "bg-green-500/10 border-green-500/20",
            content: <Step3Content />,
            phone: <Step3Phone />,
            badges: <Step3Badges />
        }
    ];

    return (
        <section className="bg-[#0b0f14] relative text-white">
            
            {/* --- Mobile View (Vertical Stack) --- */}
            <div ref={mobileContainerRef} className="lg:hidden relative pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-800" />
                    <motion.div 
                        style={{ height: mobileLineHeight }}
                        className="absolute left-4 top-12 w-0.5 bg-gradient-to-b from-brand-400 via-purple-400 to-green-400 origin-top" 
                    />

                    <div className="space-y-24 pt-12">
                        {steps.map((step) => (
                            <div key={step.id} className="relative pl-10">
                                {/* Icon on Line */}
                                <div className="absolute left-4 top-0 z-10 -translate-x-1/2">
                                    <div className={cx("size-10 rounded-full bg-[#0b0f14] border-2 border-[#0b0f14] flex items-center justify-center")}>
                                        <div className={cx("size-full rounded-full flex items-center justify-center border", step.iconBg)}>
                                            <step.icon className={cx("size-4", step.iconColor)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-12">
                                    {/* Text */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {step.content}
                                    </motion.div>

                                    {/* Phone Mockup */}
                                    <div className="relative flex justify-start">
                                        <div className="relative w-full max-w-[320px]">
                                            <PhoneMockup className="relative z-20 mx-0">
                                                {step.phone}
                                            </PhoneMockup>
                                            
                                            {/* Badges Container - Scale down slightly for mobile if needed */}
                                            <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
                                                {step.badges}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Desktop View (Sticky Scroll) --- */}
            <div ref={containerRef} className="hidden lg:block h-[300vh] relative">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                    
                    <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
                            
                            {/* Left Column: Text Content */}
                            <div className="relative z-20 order-2 lg:order-1 text-center lg:text-left h-[200px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="text-step-1"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Step1Content />
                                        </motion.div>
                                    )}
                                    {currentStep === 2 && (
                                        <motion.div
                                            key="text-step-2"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Step2Content />
                                        </motion.div>
                                    )}
                                    {currentStep === 3 && (
                                        <motion.div
                                            key="text-step-3"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Step3Content />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right Column: Phone Mockup & Floating Elements */}
                            <div className="relative order-1 lg:order-2 flex justify-center items-center h-[500px] md:h-[600px]">
                                {/* Floating Badges Container */}
                                <div className="absolute inset-0 w-full h-full pointer-events-none z-30 max-w-[400px] mx-auto">
                                    <AnimatePresence>
                                        {currentStep === 1 && <Step1Badges />}
                                        {currentStep === 2 && <Step2Badges />}
                                        {currentStep === 3 && <Step3Badges />}
                                    </AnimatePresence>
                                </div>

                                <PhoneMockup className="relative z-20 scale-90 md:scale-100 transition-transform duration-700">
                                    <AnimatePresence mode="wait">
                                        {currentStep === 1 && (
                                            <motion.div 
                                                key="phone-step1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="h-full"
                                            >
                                                <Step1Phone />
                                            </motion.div>
                                        )}

                                        {currentStep === 2 && (
                                            <motion.div 
                                                key="phone-step2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="h-full"
                                            >
                                                <Step2Phone />
                                            </motion.div>
                                        )}

                                        {currentStep === 3 && (
                                            <motion.div 
                                                key="phone-step3"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="h-full"
                                            >
                                                <Step3Phone />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </PhoneMockup>
                            </div>
                        </div>
                    </div>

                    {/* Timeline (Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
                         <div className="container mx-auto px-4">
                            <div className="h-px bg-gray-800 w-full relative">
                                {/* Active Line */}
                                <motion.div 
                                    style={{ width: lineWidth }} 
                                    className="absolute left-0 top-0 h-full bg-white" 
                                />
                                
                                {/* Icons */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-[10%] sm:px-[15%] md:px-[20%]">
                                    {/* Step 1 */}
                                    <div className="relative group">
                                        <div className={cx("size-10 rounded-full flex items-center justify-center transition-all duration-500", currentStep >= 1 ? "bg-brand-500 text-white" : "bg-gray-800 text-gray-500")}>
                                            <SearchLg className="size-5" />
                                        </div>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="relative group">
                                        <div className={cx("size-10 rounded-full flex items-center justify-center transition-all duration-500", currentStep >= 2 ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-500")}>
                                            <MessageChatCircle className="size-5" />
                                        </div>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="relative group">
                                        <div className={cx("size-10 rounded-full flex items-center justify-center transition-all duration-500", currentStep >= 3 ? "bg-green-500 text-white" : "bg-gray-800 text-gray-500")}>
                                            <CurrencyDollarCircle className="size-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                </div>
            </div>

            {/* 3. The "Aha" Connector & Closing */}
         
        </section>
    );
};

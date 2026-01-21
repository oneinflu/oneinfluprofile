"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cx } from "@/utils/cx";
import { User01, ShoppingBag02, Image01, MessageChatCircle, BankNote01, CalendarCheck01, CheckVerified02, QrCode01, FileCheck02, BarChartSquare02 } from "@untitledui/icons";

const PhoneMockup = ({ children, label, className }: { children: React.ReactNode, label: string, className?: string }) => (
    <div className={cx("relative mx-auto w-[280px] sm:w-[300px] md:w-[320px] aspect-[9/19] bg-gray-900 rounded-[3rem] ring-8 ring-gray-900 shadow-2xl overflow-hidden", className)}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20" />
        
        {/* Screen Content */}
        <div className="w-full h-full bg-[#0b0f14] overflow-hidden relative">
            {children}
            
            {/* Overlay Micro-text */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/80 border border-white/10">
                    {label}
                </span>
            </div>
            
            {/* Gradient Overlay for bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0b0f14] to-transparent pointer-events-none" />
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

export const HomeIdentity = () => {
    return (
        <section className="py-24 md:py-32 bg-white dark:bg-[#0b0f14] overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mx-auto max-w-4xl text-center mb-16 md:mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white leading-tight mb-6"
                    >
                        One profile for discovery. <br />
                        <span className="text-gray-400 dark:text-gray-600">One system for execution.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
                    >
                        Whether someone is discovering you, hiring you, or collaborating with you — they start at the same place.
                    </motion.p>
                </div>

                {/* Split Screen */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative">
                    
                    {/* Center Connecting Statement (Desktop) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="hidden lg:flex flex-col items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none"
                    >
                        <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-500 mb-4" />
                        <div className="bg-white dark:bg-[#0b0f14] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                No duplicate links.<br />
                                No re-introductions.<br />
                                No re-verification.
                            </p>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-t from-transparent to-brand-500 mt-4" />
                    </motion.div>

                    {/* Left Side: Public Profile */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <PhoneMockup label="This is how people find you">
                            <div className="p-4 pt-8 h-full overflow-y-auto no-scrollbar pb-24">
                                {/* Profile Header */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="size-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 mb-3 ring-4 ring-gray-800" />
                                    <div className="h-4 w-32 bg-gray-800 rounded-full mb-2" />
                                    <div className="h-3 w-24 bg-gray-800/50 rounded-full" />
                                </div>
                                
                                {/* Items */}
                                <ProfileItem icon={User01} title="About Me" subtitle="Designer & Content Creator" color="bg-blue-500" />
                                <ProfileItem icon={ShoppingBag02} title="My Shop" subtitle="Lightroom Presets & Merch" color="bg-purple-500" />
                                <ProfileItem icon={Image01} title="Portfolio" subtitle="View my latest work" color="bg-pink-500" />
                                <ProfileItem icon={MessageChatCircle} title="Contact" subtitle="Book a consultation" color="bg-green-500" />
                                <ProfileItem icon={BankNote01} title="Payments" subtitle="Secure checkout" color="bg-orange-500" />
                                <ProfileItem icon={Image01} title="Instagram" subtitle="@username" color="bg-pink-600" />
                            </div>
                        </PhoneMockup>
                    </motion.div>

                    {/* Mobile Connecting Text (Visible only on mobile) */}
                    <div className="lg:hidden text-center py-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            No duplicate links. No re-introductions.
                        </p>
                    </div>

                    {/* Right Side: Execution */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <PhoneMockup label="This is how work gets done">
                             <div className="p-4 pt-8 h-full overflow-y-auto no-scrollbar pb-24">
                                {/* Minified Profile Header */}
                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-800">
                                    <div className="size-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                                    <div>
                                        <div className="h-3 w-24 bg-gray-800 rounded-full mb-1.5" />
                                        <div className="h-2 w-16 bg-gray-800/50 rounded-full" />
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="mb-4 p-4 rounded-xl bg-brand-900/20 border border-brand-500/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CalendarCheck01 className="size-4 text-brand-400" />
                                        <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Active Campaign</span>
                                    </div>
                                    <h4 className="text-white font-medium mb-1">Summer Launch Event</h4>
                                    <p className="text-xs text-gray-400">July 24, 2025 • New York</p>
                                </div>

                                <ProfileItem icon={CheckVerified02} title="Application Approved" subtitle="You're on the list" color="bg-green-600" />
                                <ProfileItem icon={QrCode01} title="Event Ticket" subtitle="Scan for entry" color="bg-white !text-black" />
                                <ProfileItem icon={FileCheck02} title="Submit Content" subtitle="Upload deliverables" color="bg-blue-600" />
                                <ProfileItem icon={BarChartSquare02} title="Campaign Report" subtitle="View performance" color="bg-purple-600" />
                            </div>
                        </PhoneMockup>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

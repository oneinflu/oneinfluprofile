"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { 
    ArrowLeft, 
    Share04, 
    Heart, 
    MarkerPin01, 
    LayersTwo01, 
    Sun, 
    Clock,
    ArrowRight,
    Bank,
    Trophy01,
    Map01,
    ShieldTick,
    Calculator,
    Building02,
    ChevronDown,
    PlayCircle,
    Maximize02,
    XClose,
    Moon01
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

// Mock Data (Enhanced for User Centricity)
const projectsData = [
    {
        id: 1,
        name: "Signature Altius",
        builderName: "Signature Avenues",
        location: "Kollapur, Hyderabad",
        reraId: "P02400003004",
        status: "Under Construction",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
        masterPlanImage: "/masterplan.png",
        landSize: "5.5 Acres",
        openSpace: "65%",
        totalTowers: 3,
        floorsPerTower: "15-18",
        totalFlats: 450,
        flatConfigurations: ["2BHK", "3BHK"],
        configs: [
             { type: "2 BHK", area: "1200-1350 sft", price: "₹ 89.09 L", emi: "₹ 65k/mo", facing: ["East", "West"] },
             { type: "3 BHK", area: "1600-1900 sft", price: "₹ 1.2 Cr", emi: "₹ 95k/mo", facing: ["East", "North"] }
        ],
        towerNames: ["A - Aurora", "B - Borealis", "C - Celeste"],
        flatsPerFloor: 8,
        possessionDate: "Dec 2025",
        constructionPhase: "Structure Done",
        constructionProgress: 65,
        lastUpdated: "Feb 2024",
        landmarks: ["Financial District (10 min)", "Oakridge School (5 min)"],
        bankLoan: true,
        builderSince: "2015",
        amenitiesHighlights: ["Clubhouse", "Sports", "Kids", "Safety", "Utilities"],
        specifications: [
            { title: "Structure", details: ["RCC framed structure designed to withstand wind and seismic loads."] },
            { title: "Plastering", details: ["Internal: Double coat cement plastering with smooth finish.", "External: Double coat cement plastering."] },
            { title: "Painting", details: ["Premium emulsion paint with putty finish for internal walls.", "Weather-proof paint for external walls."] },
            { title: "Flooring", details: ["Vitrified tiles in Living, Dining, Bedrooms & Kitchen.", "Anti-skid tiles in Bathrooms & Balconies."] },
            { title: "Doors & Windows", details: ["Main Door: Teak wood frame & shutter.", "Windows: UPVC sliding windows with mosquito mesh."] }
        ],
        videos: [
            { id: 1, title: "Project Walkthrough", thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop", type: "Walkthrough" },
            { id: 2, title: "Locality Tour", thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop", type: "Locality" },
            { id: 3, title: "Clubhouse Tour", thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop", type: "Amenities" }
        ]
    },
    {
        id: 2,
        name: "Signature Fortius",
        builderName: "Signature Avenues",
        location: "Isnapur, Hyderabad",
        reraId: "P02400005001",
        status: "Under Construction",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
        masterPlanImage: "/masterplan.png",
        landSize: "4.2 Acres",
        openSpace: "55%",
        totalTowers: 4,
        floorsPerTower: "12",
        totalFlats: 320,
        flatConfigurations: ["2BHK", "2.5BHK"],
        configs: [
             { type: "2 BHK", area: "1100-1250 sft", price: "₹ 65.09 L", emi: "₹ 45k/mo", facing: ["East", "West"] },
             { type: "2.5 BHK", area: "1350-1450 sft", price: "₹ 75.50 L", emi: "₹ 55k/mo", facing: ["East", "North"] }
        ],
        towerNames: ["Tower 1", "Tower 2", "Tower 3", "Tower 4"],
        flatsPerFloor: 6,
        possessionDate: "June 2026",
        constructionPhase: "Foundation",
        constructionProgress: 20,
        lastUpdated: "Jan 2024",
        landmarks: ["Tech Park (15 min)", "International School (10 min)"],
        bankLoan: true,
        builderSince: "2015",
        amenitiesHighlights: ["Clubhouse", "Greenery", "Security"],
        specifications: [
            { title: "Structure", details: ["RCC framed structure."] },
            { title: "Flooring", details: ["Vitrified tiles in all rooms."] }
        ],
        videos: []
    },
    {
        id: 3,
        name: "Signature Horizon",
        builderName: "Signature Avenues",
        location: "Manikonda, Hyderabad",
        reraId: "P02400008888",
        status: "Ready to Move",
        image: "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=1000&auto=format&fit=crop",
        masterPlanImage: "/masterplan.png",
        landSize: "8 Acres",
        openSpace: "70%",
        totalTowers: 5,
        floorsPerTower: "20",
        totalFlats: 600,
        flatConfigurations: ["3BHK", "4BHK"],
        configs: [
             { type: "3 BHK", area: "2000-2400 sft", price: "₹ 1.5 Cr", emi: "₹ 1.1L/mo", facing: ["East", "West", "North"] },
             { type: "4 BHK", area: "3000-3500 sft", price: "₹ 2.5 Cr", emi: "₹ 1.8L/mo", facing: ["All Directions"] }
        ],
        towerNames: ["Tower A", "Tower B", "Tower C", "Tower D", "Tower E"],
        flatsPerFloor: 4,
        possessionDate: "Immediate",
        constructionPhase: "Finishing",
        constructionProgress: 95,
        lastUpdated: "Mar 2024",
        landmarks: ["Hitech City (5 min)", "Inorbit Mall (10 min)"],
        bankLoan: true,
        builderSince: "2015",
        amenitiesHighlights: ["Luxury Club", "Pool", "Spa", "Concierge"],
        specifications: [
            { title: "Structure", details: ["RCC framed structure."] },
            { title: "Flooring", details: ["Marble flooring in Living/Dining."] }
        ],
        videos: []
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params?.projectId ? parseInt(params.projectId as string) : null;
    const [isMasterPlanOpen, setIsMasterPlanOpen] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const project = projectsData.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Project not found
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-black pb-24 font-sans selection:bg-purple-500/30">
            {/* 1. & 2. HERO & IDENTITY MERGED */}
            <div className="relative w-full h-[60vh] overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Navbar Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                    <button 
                        onClick={() => router.back()}
                        className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-3">
                        <button className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all active:scale-95">
                            <Share04 className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all active:scale-95">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all active:scale-95"
                        >
                            {mounted && resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon01 className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 pb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-start justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge color="success" className="bg-green-500/20 text-green-300 border-none backdrop-blur-md px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider">
                                    {project.status}
                                </Badge>
                                <span className="text-white/70 text-[10px] font-medium tracking-wide bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                                    RERA: {project.reraId}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none mb-2 drop-shadow-lg">
                                {project.name}
                            </h1>
                            <p className="text-sm text-gray-200 font-medium drop-shadow-md">
                                by <span className="text-white border-b border-white/30 pb-0.5">{project.builderName}</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Sheet - Overlaps Hero slightly for "Card" effect */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative -mt-8 bg-white dark:bg-black rounded-t-[32px] px-5 pt-6 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_-8px_30px_rgba(255,255,255,0.05)] space-y-4 z-20"
            >
                
                {/* 3. COMPACT SNAPSHOT (Horizontal Scroll) */}
                <motion.section variants={itemVariants}>
                    <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 scrollbar-hide snap-x">
                        <CompactStat label="Acres" value={project.landSize} />
                        <CompactStat label="Open Space" value={project.openSpace} />
                        <CompactStat label="Towers" value={project.totalTowers} />
                        <CompactStat label="Floors" value={project.floorsPerTower} />
                        <CompactStat label="Units" value={project.totalFlats} />
                        <CompactStat label="Configs" value={project.flatConfigurations.join(", ")} wide />
                    </div>
                </motion.section>

                {/* 4. VIDEO GALLERY (Shorts Style) - Moved Up */}
                {project.videos.length > 0 && (
                    <motion.section variants={itemVariants}>
                        <SectionTitle title="Video Tour" className="mb-2 px-1" />
                        <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 scrollbar-hide snap-x">
                            {project.videos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* 5. MASTER PLAN - Moved Up */}
                <motion.section variants={itemVariants}>
                    <SectionTitle title="Master Plan" className="mb-2 px-1" />
                    <div 
                        onClick={() => setIsMasterPlanOpen(true)}
                        className="relative rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 group cursor-zoom-in"
                    >
                        <img src={project.masterPlanImage} alt="Master Plan" className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                            <Button className="bg-white dark:bg-black text-black dark:text-white shadow-lg rounded-full hover:scale-105 transition-transform" size="sm">
                                <Maximize02 className="w-4 h-4 mr-2" /> View Fullscreen
                            </Button>
                        </div>
                    </div>
                </motion.section>

                {/* Master Plan Modal */}
                <AnimatePresence>
                    {isMasterPlanOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                            onClick={() => setIsMasterPlanOpen(false)}
                        >
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={project.masterPlanImage} alt="Master Plan Fullscreen" className="w-full h-full object-contain" />
                                <button 
                                    onClick={() => setIsMasterPlanOpen(false)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                >
                                    <XClose className="w-6 h-6" />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 6. CONFIGURATIONS (Premium Cards) */}
                <motion.section variants={itemVariants} className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                        <SectionTitle title="Configurations" />
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                            {project.configs.length} Layouts Available
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                        {project.configs.map((config, idx) => (
                            <motion.div 
                                key={idx} 
                                whileTap={{ scale: 0.98 }}
                                className="group relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{config.type}</h3>
                                            <span className="text-xs text-gray-500 font-medium px-2 py-0.5 bg-gray-100 dark:bg-white/5 rounded-full">{config.area}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Sun className="w-3.5 h-3.5 text-orange-400" /> {config.facing.join("/")}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-blue-500 dark:text-blue-400">
                                                <Calculator className="w-3.5 h-3.5" /> EMI: {config.emi}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Starts from</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{config.price}</p>
                                    </div>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 to-transparent dark:from-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 7. PROJECT STATUS (Timeline) */}
                <motion.section variants={itemVariants}>
                    <SectionTitle title="Project Status" className="mb-2 px-1" />
                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white dark:bg-white/10 rounded-xl shadow-sm">
                                    <Clock className="w-5 h-5 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Possession by</p>
                                    <p className="text-base font-bold text-gray-900 dark:text-white">{project.possessionDate}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 font-medium">Current Stage</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{project.constructionPhase}</p>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-1.5">
                            <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${project.constructionProgress || 0}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gray-900 dark:bg-white rounded-full"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <span>Launch</span>
                                <span>Handover</span>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <LayersTwo01 className="w-3.5 h-3.5" />
                                <span>{project.totalTowers} Towers</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Building02 className="w-3.5 h-3.5" />
                                <span>{project.floorsPerTower} Floors</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 8. AMENITIES */}
                <motion.section variants={itemVariants}>
                    <SectionTitle title="Lifestyle Highlights" className="mb-3 px-1" />
                    <div className="flex flex-wrap gap-2.5">
                        {project.amenitiesHighlights.map((item, i) => (
                            <span key={i} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 shadow-sm">
                                {item}
                            </span>
                        ))}
                        <span className="px-4 py-2.5 rounded-xl border border-dashed border-gray-300 dark:border-white/20 text-xs font-bold text-gray-500 dark:text-gray-400 bg-transparent flex items-center gap-1">
                            + More
                        </span>
                    </div>
                </motion.section>

                {/* 9. LOCATION */}
                <motion.section variants={itemVariants}>
                    <SectionTitle title="Neighborhood" className="mb-2 px-1" />
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 overflow-hidden">
                        <div className="flex items-center gap-4 p-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                <Map01 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{project.location}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <MarkerPin01 className="w-3.5 h-3.5 text-gray-400" />
                                    <p className="text-xs text-gray-500 truncate">{project.landmarks[0]}</p>
                                </div>
                            </div>
                            <Button color="tertiary" size="sm" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                View Map
                            </Button>
                        </div>
                    </div>
                </motion.section>

                {/* 10. SPECIFICATIONS (Accordion) - Moved Down */}
                <motion.section variants={itemVariants}>
                    <SectionTitle title="Specifications" className="mb-2 px-1" />
                    <div className="space-y-2.5">
                        {project.specifications.map((spec, i) => (
                            <SpecificationItem key={i} title={spec.title} details={spec.details} />
                        ))}
                    </div>
                </motion.section>

                {/* 11. TRUST BADGES */}
                <motion.section variants={itemVariants} className="pt-2 pb-24">
                    <div className="flex justify-evenly items-center px-4 py-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <TrustItem icon={<ShieldTick />} label="RERA Approved" />
                        <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                        <TrustItem icon={<Bank />} label="Bank Loan" />
                        <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                        <TrustItem icon={<Trophy01 />} label={`Since ${project.builderSince}`} />
                    </div>
                </motion.section>
            </motion.div>

            {/* 10. FLOATING CTA */}
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 z-50"
            >
                <Button 
                    size="xl" 
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-100 rounded-2xl shadow-2xl px-6 py-4 h-auto group [&>[data-text]]:w-full [&>[data-text]]:flex [&>[data-text]]:items-center [&>[data-text]]:justify-between"
                >
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-bold tracking-wide">Explore Towers & Flats</span>
                        <span className="text-[10px] text-white/60 dark:text-black/60 font-medium">View availability & floor plans</span>
                    </div>
                    <div className="bg-white/20 dark:bg-black/10 p-2 rounded-full transition-transform group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </Button>
            </motion.div>
        </main>
    );
}

// Minimal Helper Components

function SectionTitle({ title, className }: { title: string, className?: string }) {
    return (
        <h2 className={cx("text-xs font-bold text-gray-400 uppercase tracking-widest", className)}>
            {title}
        </h2>
    );
}

function CompactStat({ label, value, wide }: { label: string, value: string | number, wide?: boolean }) {
    return (
        <div className={cx(
            "shrink-0 flex flex-col justify-center px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 rounded-2xl min-w-[90px] snap-start",
            wide && "min-w-[140px]"
        )}>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
        </div>
    );
}

function TrustItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity text-center">
            <div className="w-5 h-5 text-gray-900 dark:text-white [&>svg]:w-full [&>svg]:h-full">
                {icon}
            </div>
            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">{label}</p>
        </div>
    );
}

function SpecificationItem({ title, details }: { title: string, details: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <span className="text-sm font-bold text-gray-900 dark:text-white">{title}</span>
                <ChevronDown className={cx("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-4 pb-4 pt-0 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {details.map((detail, i) => (
                                <p key={i}>• {detail}</p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function VideoCard({ video }: { video: any }) {
    return (
        <div className="relative shrink-0 w-32 aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 snap-start group cursor-pointer">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
                <p className="text-[10px] font-bold text-white leading-tight line-clamp-2">{video.title}</p>
                <span className="text-[9px] text-gray-300 mt-0.5 block">{video.type}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                    <PlayCircle className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
}

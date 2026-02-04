"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  Users, 
  ArrowUpDown, 
  LayoutTemplate,
  CheckCircle2,
  ChevronDown,
  Maximize2,
  X,
  Calendar,
  HardHat,
  TrendingUp,
  Home
} from "lucide-react";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";

// Mock Data
const towersData = [
  {
    id: "A",
    name: "Tower A",
    badge: "Premium",
    description: "Sea facing premium residences with exclusive amenities.",
    floors: "G+15",
    flatsPerFloor: 12,
    lifts: 4,
    configurations: ["2BHK", "3BHK"],
    status: "Sold Out",
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    totalFlats: 180,
    bookedFlats: 180,
    possession: "Dec 2024",
    construction: {
        phase: "Finishing",
        percentage: 95,
        image: "https://images.unsplash.com/photo-1590644365607-1c5a38d07d99?w=800&q=80",
        lastUpdated: "2 days ago"
    },
    floorPlan: "/towera.png"
  },
  {
    id: "B",
    name: "Tower B",
    badge: "Garden View",
    description: "Overlooking the central garden and kids play area.",
    floors: "G+15",
    flatsPerFloor: 12,
    lifts: 4,
    configurations: ["2BHK", "3BHK"],
    status: "Fast Filling",
    color: "bg-green-500",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    totalFlats: 180,
    bookedFlats: 142,
    possession: "June 2025",
    construction: {
        phase: "Structure Complete",
        percentage: 70,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        lastUpdated: "1 week ago"
    },
    floorPlan: "/towerb.png"
  },
  {
    id: "C",
    name: "Tower C",
    badge: "Club House",
    description: "Direct access to clubhouse and swimming pool.",
    floors: "G+12",
    flatsPerFloor: 8,
    lifts: 3,
    configurations: ["3BHK", "4BHK"],
    status: "Just Launched",
    color: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    totalFlats: 96,
    bookedFlats: 12,
    possession: "Dec 2026",
    construction: {
        phase: "Plinth Level",
        percentage: 15,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        lastUpdated: "Yesterday"
    },
    floorPlan: "/towerc.png"
  }
];

export default function TowersPage() {
  const router = useRouter();
  const params = useParams();
  const [expandedTowerId, setExpandedTowerId] = useState<string | null>("B");
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  const handleToggle = (id: string) => {
    setExpandedTowerId(expandedTowerId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans selection:bg-gray-100 dark:selection:bg-white/20">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">Select Tower</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 pb-32 space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Towers
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Select a tower to view booking status, construction updates, and floor plans.
          </p>
        </div>

        {towersData.map((tower) => {
          const isExpanded = expandedTowerId === tower.id;
          const bookingPercentage = Math.round((tower.bookedFlats / tower.totalFlats) * 100);

          return (
            <motion.div
              key={tower.id}
              initial={false}
              animate={{
                backgroundColor: isExpanded ? "var(--bg-active)" : "var(--bg-idle)",
                borderColor: isExpanded ? "var(--border-active)" : "var(--border-idle)"
              }}
              style={{
                // @ts-ignore
                "--bg-active": "rgba(255, 255, 255, 0.05)",
                "--bg-idle": "rgba(255, 255, 255, 0)",
                "--border-active": "rgba(0,0,0,0.1)",
                "--border-idle": "rgba(0,0,0,0.05)"
              }}
              className={cx(
                "group relative overflow-hidden rounded-3xl border transition-all duration-300",
                isExpanded 
                  ? "shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-gray-900" 
                  : "bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900"
              )}
            >
              {/* Clickable Header Area */}
              <button
                onClick={() => handleToggle(tower.id)}
                className="w-full text-left p-5 flex items-start gap-4"
              >
                {/* Thumbnail Image */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-200">
                   <img 
                    src={tower.image} 
                    alt={tower.name}
                    className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Header Info */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {tower.name}
                    </h3>
                    {isExpanded ? (
                       <span className="text-xs font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full">
                         {tower.id}
                       </span>
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cx(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                      tower.status === "Sold Out" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300" :
                      tower.status === "Fast Filling" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" :
                      "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    )}>
                      {tower.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {tower.floors} Floors
                    </span>
                  </div>

                  {!isExpanded && (
                     <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div 
                                style={{ width: `${bookingPercentage}%` }}
                                className="h-full bg-gray-900 dark:bg-white rounded-full"
                            />
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                            {bookingPercentage}% Booked
                        </span>
                     </div>
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="px-5 pb-6 pt-0">
                      <div className="h-px w-full bg-gray-100 dark:bg-white/5 mb-6" />
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {tower.description}
                      </p>

                      {/* 1. Booking Status Section */}
                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 mb-4 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5" />
                                Booking Status
                            </h4>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                {tower.bookedFlats} / {tower.totalFlats} Units
                            </span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-black/40 rounded-full overflow-hidden mb-2">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${bookingPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cx(
                                    "h-full rounded-full relative",
                                    tower.status === "Sold Out" ? "bg-red-500" : 
                                    tower.status === "Fast Filling" ? "bg-amber-500" : "bg-emerald-500"
                                )}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                        </div>
                        <p className="text-[10px] text-gray-400 text-right">
                            {tower.totalFlats - tower.bookedFlats} units available
                        </p>
                      </div>

                      {/* 2. Construction Progress Section */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-3">
                            <HardHat className="w-3.5 h-3.5" />
                            Construction Update
                        </h4>
                        
                        <div className="bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
                            {/* Construction Image */}
                            <div className="relative h-40 group cursor-pointer" onClick={() => setSelectedImage({ src: tower.construction.image, alt: "Construction Update" })}>
                                <img 
                                    src={tower.construction.image} 
                                    alt="Construction Status"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                        <span className="text-[10px] text-white/80 block uppercase tracking-wider">Current Phase</span>
                                        <span className="text-xs font-bold text-white">{tower.construction.phase}</span>
                                    </div>
                                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                                        <Maximize2 className="w-4 h-4 text-gray-900 dark:text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Construction Stats */}
                            <div className="p-4 bg-gray-50 dark:bg-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Progress</span>
                                    <span className="text-xs font-bold text-gray-900 dark:text-white">{tower.construction.percentage}% Completed</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-3">
                                    <div 
                                        style={{ width: `${tower.construction.percentage}%` }}
                                        className="h-full bg-blue-500 rounded-full"
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-400">
                                    <span>Last updated: {tower.construction.lastUpdated}</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>Possession: {tower.possession}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>

                      {/* 3. Specs Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <DetailCard 
                          icon={LayoutTemplate} 
                          label="Config" 
                          value={tower.configurations.join(" / ")} 
                        />
                        <DetailCard 
                          icon={ArrowUpDown} 
                          label="Lifts" 
                          value={`${tower.lifts} High Speed`} 
                        />
                        <DetailCard 
                          icon={Building2} 
                          label="Floors" 
                          value={tower.floors} 
                        />
                        <DetailCard 
                          icon={Users} 
                          label="Units/Floor" 
                          value={tower.flatsPerFloor} 
                        />
                      </div>

                      {/* 4. Floor Plan Preview */}
                      <div className="mb-6">
                         <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-3">
                            <Home className="w-3.5 h-3.5" />
                            Typical Floor Plan
                        </h4>
                        <div 
                            className="relative h-32 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 cursor-pointer group"
                            onClick={() => setSelectedImage({ src: tower.floorPlan, alt: "Typical Floor Plan" })}
                        >
                            <img 
                                src={tower.floorPlan} 
                                alt="Floor Plan"
                                className="w-full h-full object-cover blur-[1px] group-hover:blur-none transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transform transition-transform group-hover:scale-105">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    View Floor Plan
                                </button>
                            </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button 
                        iconTrailing={ArrowRight}
                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl py-6 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98] justify-between px-6"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          router.push(`/builder/${params.username}/projects/${params.projectId}/towers/${tower.id}`);
                        }}
                      >
                        Check Availability
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
                onClick={() => setSelectedImage(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <img 
                            src={selectedImage.src} 
                            alt={selectedImage.alt}
                            className="w-full h-full object-contain max-h-[85vh] bg-black"
                        />
                    </div>
                    <p className="mt-4 text-white/80 font-medium text-sm">
                        {selectedImage.alt}
                    </p>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function DetailCard({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) {
  return (
    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col items-start gap-2">
      <div className="p-1.5 bg-white dark:bg-white/10 rounded-lg shadow-sm">
        <Icon className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
      </div>
      <div>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-0.5">{label}</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Compass, Maximize2, Home, Ruler, IndianRupee, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";

// --- Mock Data Types ---
type FlatStatus = "available" | "held" | "sold";
type Facing = "East" | "West" | "North" | "South";
type Configuration = "2BHK" | "3BHK" | "4BHK";

interface FlatData {
  id: string;
  flatNumber: string;
  configuration: Configuration;
  facing: Facing;
  status: FlatStatus;
  area: number; // sqft
  price: number; // Total price
  floorPlanImage: string;
}

// --- Mock Data Generator ---
const generateFlats = (floorId: string): FlatData[] => {
  const flats: FlatData[] = [];
  const configs: Configuration[] = ["2BHK", "2BHK", "3BHK", "3BHK", "3BHK", "4BHK"];
  const facings: Facing[] = ["East", "East", "West", "West", "North", "South"];
  
  for (let i = 1; i <= 6; i++) {
    const flatNum = `${floorId}0${i}`;
    const statusRand = Math.random();
    const status: FlatStatus = statusRand > 0.7 ? "sold" : statusRand > 0.5 ? "held" : "available";
    
    flats.push({
      id: flatNum,
      flatNumber: flatNum,
      configuration: configs[i-1],
      facing: facings[i-1],
      status,
      area: configs[i-1] === "2BHK" ? 1250 : configs[i-1] === "3BHK" ? 1850 : 2400,
      price: configs[i-1] === "2BHK" ? 8500000 : configs[i-1] === "3BHK" ? 12500000 : 16500000,
      floorPlanImage: "/floorplan.png",
    });
  }
  return flats;
};

// --- Components ---

const StatusBadge = ({ status }: { status: FlatStatus }) => {
  const config = {
    available: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", text: "Available" },
    held: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", text: "Reserved" },
    sold: { color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400", text: "Sold" },
  };
  const { color, text } = config[status];
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${color}`}>
      {text}
    </span>
  );
};

export default function FlatSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const floorId = params.floorId as string;
  
  const [selectedConfig, setSelectedConfig] = useState<Configuration | "All">("All");
  const [expandedFacing, setExpandedFacing] = useState<Facing | null>("East");
  const [selectedFlat, setSelectedFlat] = useState<string | null>(null);

  const flats = useMemo(() => generateFlats(floorId), [floorId]);

  // Filter flats by configuration
  const filteredFlats = useMemo(() => {
    // Only show available flats (hide sold and held/reserved)
    const availableFlats = flats.filter(f => f.status === "available");
    if (selectedConfig === "All") return availableFlats;
    return availableFlats.filter(f => f.configuration === selectedConfig);
  }, [flats, selectedConfig]);

  // Group flats by facing
  const groupedFlats = useMemo(() => {
    const groups: Partial<Record<Facing, FlatData[]>> = {};
    filteredFlats.forEach(flat => {
      if (!groups[flat.facing]) groups[flat.facing] = [];
      groups[flat.facing]!.push(flat);
    });
    return groups;
  }, [filteredFlats]);

  const facings = ["East", "West", "North", "South"] as Facing[];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Floor {floorId}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Select your unit</p>
          </div>
        </div>

        {/* Configuration Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {["All", "2BHK", "3BHK", "4BHK"].map((config) => (
            <button
              key={config}
              onClick={() => setSelectedConfig(config as any)}
              className={cx(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap",
                selectedConfig === config
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-300"
              )}
            >
              {config}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {facings.map((facing) => {
          const flatsInGroup = groupedFlats[facing];
          if (!flatsInGroup || flatsInGroup.length === 0) return null;

          const isExpanded = expandedFacing === facing;

          return (
            <div key={facing} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedFacing(isExpanded ? null : facing)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <Compass className={cx("w-5 h-5 transition-transform duration-500", isExpanded ? "rotate-90" : "")} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 dark:text-white">{facing} Facing</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{flatsInGroup.length} Units Available</p>
                  </div>
                </div>
                <div className={cx(
                    "w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 transition-transform duration-300",
                    isExpanded ? "rotate-180" : ""
                )}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 dark:text-gray-300">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-4 pt-0 grid gap-4">
                      {flatsInGroup.map((flat) => (
                        <div 
                          key={flat.id}
                          className={cx(
                            "relative rounded-xl border-2 transition-all overflow-hidden",
                            flat.status === "sold" 
                              ? "border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 opacity-60" 
                              : "border-gray-100 dark:border-white/10 bg-white dark:bg-black hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md cursor-pointer"
                          )}
                          onClick={() => flat.status !== "sold" && setSelectedFlat(flat.id)}
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* Left: Floor Plan Preview */}
                                <div className="sm:w-32 h-32 sm:h-auto bg-gray-100 dark:bg-white/5 relative group">
                                    <img 
                                        src={flat.floorPlanImage} 
                                        alt="Plan" 
                                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="flex-1 p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Unit {flat.flatNumber}</h4>
                                                <StatusBadge status={flat.status} />
                                            </div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5">{flat.configuration} • {flat.facing}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-3">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Ruler className="w-4 h-4" />
                                            <span>{flat.area} sft</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-900 dark:text-white font-semibold">
                                            <IndianRupee className="w-4 h-4" />
                                            <span>{(flat.price / 100000).toFixed(1)} L</span>
                                        </div>
                                    </div>

                                    {flat.status !== "sold" && (
                                        <div className="mt-4 flex gap-2">
                                            <Button 
                                                className="flex-1 h-9 text-xs"
                                                onClick={(e: React.MouseEvent) => {
                                                    e.stopPropagation();
                                                    router.push(`/builder/${params.username}/projects/${params.projectId}/towers/${params.towerId}/floors/${floorId}/flats/${flat.id}`);
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

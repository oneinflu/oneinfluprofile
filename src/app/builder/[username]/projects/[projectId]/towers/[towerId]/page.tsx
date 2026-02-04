"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUp, Info, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";

// --- Mock Data Types ---
type FloorStatus = "available" | "limited" | "sold";

interface FloorData {
  floorNumber: number;
  status: FloorStatus;
  totalFlats: number;
  availableFlats: number;
  basePricePerSft: number;
  floorRiseCharge: number; // Extra charge per sft
}

// --- Mock Data Generator ---
const TOTAL_FLOORS = 40;
const BASE_PRICE = 6500;
const RISE_PER_FLOOR = 25; // Rs. 25 increase per floor

const generateTowerFloors = (): FloorData[] => {
  return Array.from({ length: TOTAL_FLOORS }, (_, i) => {
    const floorNum = TOTAL_FLOORS - i; // Top to bottom
    const isTop = floorNum > 35;
    const isMid = floorNum > 15 && floorNum <= 35;
    
    let status: FloorStatus = "available";
    if (floorNum % 7 === 0) status = "sold";
    else if (floorNum % 5 === 0) status = "limited";
    
    return {
      floorNumber: floorNum,
      status,
      totalFlats: 8,
      availableFlats: status === "sold" ? 0 : status === "limited" ? 2 : 6,
      basePricePerSft: BASE_PRICE,
      floorRiseCharge: (floorNum - 1) * RISE_PER_FLOOR,
    };
  });
};

const floorsData = generateTowerFloors();

// --- Components ---

const StatusBadge = ({ status }: { status: FloorStatus }) => {
  const config = {
    available: { color: "bg-emerald-500", icon: CheckCircle2, text: "Available" },
    limited: { color: "bg-amber-500", icon: AlertCircle, text: "Limited" },
    sold: { color: "bg-gray-400", icon: Circle, text: "Sold Out" },
  };
  const { color, icon: Icon, text } = config[status];
  
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  );
};

export default function FloorSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const [selectedZone, setSelectedZone] = useState<"all" | "low" | "mid" | "high">("all");
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  // Filter floors based on zone
  const filteredFloors = useMemo(() => {
    if (selectedZone === "all") return floorsData;
    if (selectedZone === "high") return floorsData.filter(f => f.floorNumber > 30);
    if (selectedZone === "mid") return floorsData.filter(f => f.floorNumber > 10 && f.floorNumber <= 30);
    return floorsData.filter(f => f.floorNumber <= 10);
  }, [selectedZone]);

  // Calculate Price Impact
  const selectedFloorData = floorsData.find(f => f.floorNumber === selectedFloor);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Select Floor</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tower A • 40 Floors</p>
          </div>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>

        {/* Zone Selector (To handle 40 floors easily) */}
        <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All" },
            { id: "high", label: "Sky (31-40)" },
            { id: "mid", label: "Mid (11-30)" },
            { id: "low", label: "Low (1-10)" },
          ].map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id as any)}
              className={cx(
                "flex-1 py-2 px-3 text-xs font-semibold rounded-lg whitespace-nowrap transition-all",
                selectedZone === zone.id 
                  ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {zone.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex max-w-5xl mx-auto pt-4 px-4 gap-6">
        
        {/* Left: Visual Tower Indicator (Desktop/Tablet mainly, hidden on small mobile if needed, or kept for context) */}
        <div className="hidden md:flex flex-col items-center sticky top-32 h-[calc(100vh-10rem)] w-24">
           <div className="relative w-full h-full bg-gray-200 dark:bg-white/5 rounded-t-3xl border-x-2 border-t-2 border-gray-300 dark:border-white/10 overflow-hidden">
              {/* Simple visual representation of zones */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[25%] bg-blue-500/10 cursor-pointer transition-colors ${selectedZone === 'high' ? 'bg-blue-500/30' : ''}`}
                onClick={() => setSelectedZone('high')}
              />
              <div 
                className={`absolute top-[25%] left-0 right-0 h-[50%] bg-indigo-500/10 cursor-pointer transition-colors ${selectedZone === 'mid' ? 'bg-indigo-500/30' : ''}`}
                onClick={() => setSelectedZone('mid')}
              />
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[25%] bg-emerald-500/10 cursor-pointer transition-colors ${selectedZone === 'low' ? 'bg-emerald-500/30' : ''}`}
                onClick={() => setSelectedZone('low')}
              />
              
              {/* Floor Labels on visualizer */}
              <div className="absolute right-2 top-2 text-[10px] text-gray-400">40</div>
              <div className="absolute right-2 bottom-2 text-[10px] text-gray-400">1</div>
           </div>
           <div className="mt-2 text-xs font-medium text-gray-500">Structure</div>
        </div>

        {/* Right: Floor List */}
        <div className="flex-1 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredFloors.map((floor) => (
              <motion.div
                key={floor.floorNumber}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => floor.status !== "sold" && setSelectedFloor(floor.floorNumber)}
                className={cx(
                  "relative group rounded-2xl border transition-all duration-200 p-4 cursor-pointer",
                  selectedFloor === floor.floorNumber
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400"
                    : floor.status === "sold"
                    ? "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-60 cursor-not-allowed"
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between">
                  {/* Floor Number Circle */}
                  <div className={cx(
                    "flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold",
                    selectedFloor === floor.floorNumber
                      ? "bg-blue-500 text-white"
                      : floor.status === "sold"
                      ? "bg-gray-200 dark:bg-white/10 text-gray-400"
                      : "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                  )}>
                    {floor.floorNumber}
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Floor {floor.floorNumber}
                      </span>
                      {floor.floorRiseCharge > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1">
                          <ArrowUp className="w-3 h-3" />
                          +₹{floor.floorRiseCharge}/sft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                       <StatusBadge status={floor.status} />
                       <span className="text-xs text-gray-500 dark:text-gray-400">
                         {floor.status === 'sold' ? 'No flats' : `${floor.availableFlats} flats left`}
                       </span>
                    </div>
                  </div>

                  {/* Price Hint (Total) */}
                  {floor.status !== "sold" && (
                     <div className="text-right hidden sm:block">
                        <div className="text-xs text-gray-500">Base + Rise</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                           ₹{(floor.basePricePerSft + floor.floorRiseCharge).toLocaleString()}
                           <span className="text-xs font-normal text-gray-500">/sft</span>
                        </div>
                     </div>
                  )}
                </div>
                
                {/* Expanded Details (Mobile friendly price view) */}
                {selectedFloor === floor.floorNumber && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10"
                   >
                      <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                             Floor Rise Premium
                          </div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                             + ₹{floor.floorRiseCharge}/sft
                          </div>
                      </div>
                      <Button className="w-full" onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          // Navigate to flats selection or next step
                          alert(`Selected Floor ${floor.floorNumber}`);
                      }}>
                         View {floor.availableFlats} Flats
                      </Button>
                   </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

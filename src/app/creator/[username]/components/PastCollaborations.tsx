"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/base/badges/badges";

interface PastCollaborationsProps {
  brands: string[];
}

export function PastCollaborations({ brands }: PastCollaborationsProps) {
  return (
    <section className="overflow-hidden">
      <h3 className="text-lg font-bold mb-4 px-1">Worked With</h3>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-25 dark:from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-25 dark:from-[#050505] to-transparent z-10" />
        
        <div className="flex overflow-x-auto hide-scrollbar gap-3 px-1 pb-2 snap-x">
          {[...brands, ...brands].map((brand, idx) => (
            <motion.div 
              key={`${brand}-${idx}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="snap-start shrink-0"
            >
              <Badge size="lg" color="gray" type="modern" className="px-6 py-2.5 text-base uppercase tracking-widest font-bold bg-white dark:bg-white/5 shadow-sm border-gray-200 dark:border-white/10">
                {brand}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

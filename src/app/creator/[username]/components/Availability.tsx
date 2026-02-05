"use client";

import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Badge } from "@/components/base/badges/badges";

interface AvailabilityData {
  types: string[];
  mode: string[];
}

interface AvailabilityProps {
  availability: AvailabilityData;
}

export function Availability({ availability }: AvailabilityProps) {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Availability</h3>
      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/5 relative overflow-hidden">
         <BackgroundPattern pattern="circle" className="absolute top-0 right-0 opacity-50 text-gray-200 dark:text-white/5" />
        <div className="mb-4 relative z-10">
          <div className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Available For</div>
          <div className="flex flex-wrap gap-2">
            {availability.types.map(type => (
              <Badge key={type} size="md" color="gray" type="modern">
                {type}
              </Badge>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Working Mode</div>
          <div className="flex flex-wrap gap-2">
            {availability.mode.map(mode => (
              <Badge key={mode} size="md" color="success" type="color">
                {mode}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

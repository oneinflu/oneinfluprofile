"use client";

import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Service {
  id: number;
  title: string;
  price: string;
  time: string;
  details: string;
  revisions: string;
}

interface ServiceListProps {
  services: Service[];
  onRequestService: (service: Service) => void;
}

export function ServiceList({ services, onRequestService }: ServiceListProps) {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Services</h3>
      <div className="flex flex-col gap-3">
        {services.map((service) => {
          const isExpanded = expandedService === service.id;
          return (
            <div 
              key={service.id} 
              onClick={() => toggleService(service.id)}
              className={`relative border rounded-2xl p-4 transition-all duration-300 cursor-pointer overflow-hidden group ${
                isExpanded 
                  ? "bg-brand-50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-500/30 shadow-md ring-1 ring-brand-100 dark:ring-brand-900/20" 
                  : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-brand-200 dark:hover:border-brand-500/30 hover:shadow-sm"
              }`}
            >
              <div className="flex gap-4 items-start">
                <div className="mt-1">
                  <FeaturedIcon size="md" color="brand" theme="light" icon={Zap} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-bold text-base mb-1 ${isExpanded ? "text-brand-700 dark:text-brand-400" : "text-gray-900 dark:text-white"}`}>
                        {service.title}
                      </h4>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {service.price === 'Custom' ? 'Custom Pricing' : `Starts ${service.price}`}
                      </div>
                    </div>
                    <div className="text-right">
                       <Badge size="sm" color="gray" type="pill-color">
                        {service.time}
                      </Badge>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="pt-2"
                      >
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                          {service.details}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-3 py-2 rounded-lg w-max mb-4">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {service.revisions} included
                        </div>

                        <Button 
                          size="md" 
                          color="primary" 
                          className="w-full"
                          onClick={(e: any) => {
                            e.stopPropagation(); 
                            onRequestService(service);
                          }}
                        >
                          Request Service
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

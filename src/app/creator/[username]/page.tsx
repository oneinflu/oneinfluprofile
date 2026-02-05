"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

// Components
import { CreatorHero } from "./components/CreatorHero";
import { FeaturedWork } from "./components/FeaturedWork";

import { ServiceList } from "./components/ServiceList";
import { PastCollaborations } from "./components/PastCollaborations";
import { WorkProcess } from "./components/WorkProcess";
import { Availability } from "./components/Availability";
import { SocialLinks } from "./components/SocialLinks";
import { RequestServiceModal } from "./components/RequestServiceModal";

// Data
import { 
  FEATURED_WORK, 
  CONTENT_TAGS, 
  MOCK_SERVICES, 
  PAST_COLLABS, 
  WORK_PROCESS, 
  AVAILABILITY, 
  SOCIAL_LINKS 
} from "./data";

export default function CreatorProfilePage() {
  const params = useParams();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;
  const displayName = username?.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || "Creator Name";

  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleRequestService = (service: any) => {
    setSelectedService(service);
    setIsRequestFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-[#050505] text-gray-900 dark:text-gray-100 pb-24 font-sans selection:bg-brand-500/30 relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundPattern pattern="grid-check" className="absolute inset-0 w-full h-full opacity-40 text-gray-200 dark:text-gray-800" />
      </div>
      
      <div className="pt-4 relative z-10">
        {/* 2. CREATOR HERO CARD */}
        <CreatorHero username={username || ""} displayName={displayName} />

        <div className="p-4 space-y-8">
          
          {/* 5. FEATURED WORK ROW */}
          <FeaturedWork items={FEATURED_WORK} />

       
     

          {/* 7. SERVICES OFFERED */}
          <ServiceList 
            services={MOCK_SERVICES} 
            onRequestService={handleRequestService} 
          />

          {/* 8. PAST COLLABORATIONS */}
          <PastCollaborations brands={PAST_COLLABS} />

          {/* 9. WORK PROCESS */}
          <WorkProcess steps={WORK_PROCESS} />

          {/* 10. AVAILABILITY & LOCATION */}
          <Availability availability={AVAILABILITY} />

          {/* 11. SOCIAL LINKS */}
          <SocialLinks links={SOCIAL_LINKS} />

          {/* 12. FOOTER */}
          <div className="py-8 text-center text-xs text-gray-400 space-y-2">
            <p>Profile last updated: Today</p>
            <button className="text-red-400 hover:underline">Report profile</button>
            <div className="pt-4 font-bold tracking-widest text-gray-300 dark:text-gray-600">POWERED BY INFLU</div>
          </div>

          <RequestServiceModal 
            isOpen={isRequestFormOpen} 
            onOpenChange={setIsRequestFormOpen} 
            service={selectedService} 
            displayName={displayName} 
          />
        </div>
      </div>
    </div>
  );
}

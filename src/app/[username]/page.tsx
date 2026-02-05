"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { api } from "@/utils/api";

// Components
import { CreatorHero } from "./components/CreatorHero";
import { FeaturedWork } from "./components/FeaturedWork";

import { ServiceList } from "./components/ServiceList";
import { PastCollaborations } from "./components/PastCollaborations";
import { WorkProcess } from "./components/WorkProcess";
import { Availability } from "./components/Availability";
import { SocialLinks } from "./components/SocialLinks";
import { RequestServiceModal } from "./components/RequestServiceModal";
import { RequestSuccessModal } from "./components/RequestSuccessModal";

// Data
import { 
  WORK_PROCESS
} from "./data";

type PublicProfileResponse = {
    profile: { 
        id: string; 
        username: string; 
        name: string | null; 
        role: string | null; 
        bio: string | null; 
        avatarUrl: string | null; 
        coverUrl: string | null; 
        verified: boolean;
        niche?: string | string[];
        contentTags?: string[];
        availableFor?: string[];
        workingMode?: string[];
        featuredWorks?: string[];
        brands?: string[];
        brandNames?: string[];
    };
    offers: Array<{ 
        title: string; 
        description: string | null; 
        priceType: string; 
        price?: number; 
        cta?: string | null;
        delivery?: string;
        revisions?: string;
        includes?: string[];
    }>;
    links: Array<{ platform: string; icon: string; url: string; visible: boolean }>;
    portfolio: Array<{
        id: string;
        contentType?: "image" | "video" | "link" | null;
        fileUrl?: string | null;
        externalUrl?: string | null;
        title?: string | null;
        brand?: string | null;
        description?: string | null;
        platform?: string | null;
        visible?: boolean;
        pinned?: boolean | null;
    }>;
    brands?: Array<{ id: string; name: string; logoUrl: string }>;
    contact?: { method?: "email" | "whatsapp" | null; email?: string | null; whatsapp?: string | null };
};

export default function CreatorProfilePage() {
  const params = useParams();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;
  const displayName = username?.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || "Creator Name";

  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  
  // Success Modal State
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successService, setSuccessService] = useState("");

  // Data State
  const [profile, setProfile] = useState<PublicProfileResponse['profile'] | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<{ method: "email" | "whatsapp"; email?: string; whatsapp?: string }>({ method: "whatsapp" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const endpoint = `/users/${username}/profile`;
        const res = (await api.get(endpoint)) as PublicProfileResponse;
        console.log("API Response:", res);
        if (!alive) return;
        
        setProfile(res.profile);
        setOffers(res.offers || []);
        setLinks(res.links || []);
        
        // Map portfolio to featured works if needed, or use separate field
        setPortfolioItems(res.portfolio || []);
        
        const method = (res.contact?.method as any) || (res.contact?.whatsapp ? "whatsapp" : "email");
        setContactInfo({
            method,
            email: res.contact?.email || undefined,
            whatsapp: res.contact?.whatsapp || undefined
        });
        
      } catch (e) {
        console.error("Failed to fetch profile", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [username]);

  const handleRequestService = (service: any) => {
    setSelectedService(service);
    setIsRequestFormOpen(true);
  };

  const handleSuccess = (serviceName: string) => {
    setSuccessService(serviceName);
    setIsSuccessOpen(true);
  };

  // Mappers
  const mappedServices = offers.map((offer, index) => ({
    id: index,
    title: offer.title,
    price: offer.price ? `₹${offer.price}` : "Custom", 
    time: offer.delivery || "Flexible",
    details: offer.description || "No description provided.",
    revisions: offer.revisions || "Unlimited"
  }));

  // Determine source of featured works: direct URL strings from profile.featuredWorks OR portfolio objects
  let rawFeaturedWorks: Array<{ url: string; id: string | number; platform?: string }> = [];

  if (profile?.featuredWorks && profile.featuredWorks.length > 0) {
      // Map string URLs to object structure
      rawFeaturedWorks = profile.featuredWorks.map((url, idx) => ({
          url: url.trim(),
          id: `fw-${idx}`,
          platform: undefined // Will be detected
      }));
  } else {
      // Fallback to portfolio items
      rawFeaturedWorks = portfolioItems.map(item => ({
          url: item.fileUrl || item.externalUrl || "",
          id: item.id,
          platform: item.platform
      }));
  }

  const mappedFeaturedWorks = rawFeaturedWorks
    .filter(item => {
        const url = item.url;
        // Basic check if it's a valid video URL
        return url && (
            url.includes('youtube.com') || 
            url.includes('youtu.be') || 
            url.includes('instagram.com')
        );
    })
    .map(item => {
        const url = item.url;
        let videoId = "";
        let platform = item.platform;

        // 1. Detect Platform if missing
        if (!platform) {
            if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "youtube";
            else if (url.includes("instagram.com")) platform = "instagram";
            else platform = "youtube"; // Default fallback
        }

        // 2. Extract ID
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0] || "";
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0] || "";
        } else if (url.includes('youtube.com/shorts/')) {
            videoId = url.split('/shorts/')[1]?.split('?')[0] || "";
        } else if (url.includes('instagram.com/p/')) {
            videoId = url.split('/p/')[1]?.split('/')[0] || "";
        } else if (url.includes('instagram.com/reel/')) {
            videoId = url.split('/reel/')[1]?.split('/')[0] || "";
        }

        return {
            id: item.id,
            platform: platform?.toLowerCase() || 'youtube',
            videoId: videoId || url // Fallback to full URL if extraction fails
        };
    });

  const mappedAvailability = {
      types: profile?.availableFor || ["Sponsorships", "UGC", "Speaking", "Affiliate"],
      mode: profile?.workingMode || ["Remote", "Hybrid"]
  };

  // Brands logic: prefer profile.brands/brandNames strings
  const displayBrands = profile?.brands || profile?.brandNames || [];

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-[#050505] text-gray-900 dark:text-gray-100 pb-24 font-sans selection:bg-brand-500/30 relative">
      <style jsx global>{`
        .fixed.bottom-4.right-4.z-50 {
          display: none !important;
        }
      `}</style>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundPattern pattern="grid-check" className="absolute inset-0 w-full h-full opacity-40 text-gray-200 dark:text-gray-800" />
      </div>
      
      <div className="pt-4 relative z-10">
        {/* 2. CREATOR HERO CARD */}
        <CreatorHero 
            username={username || ""} 
            displayName={profile?.name || displayName} 
            bio={profile?.bio}
            niche={Array.isArray(profile?.niche) ? profile?.niche : (profile?.niche ? [profile.niche] : undefined)}
            contentTags={profile?.contentTags}
            avatarUrl={profile?.avatarUrl}
        />

        <div className="p-4 space-y-8">
          
          {/* 5. FEATURED WORK ROW */}
          {mappedFeaturedWorks.length > 0 && (
            <FeaturedWork items={mappedFeaturedWorks} />
          )}

          {/* 7. SERVICES OFFERED */}
          <ServiceList 
            services={mappedServices} 
            onRequestService={handleRequestService} 
          />

          {/* 8. PAST COLLABORATIONS */}
          {displayBrands.length > 0 && (
            <PastCollaborations brands={displayBrands} />
          )}

          {/* 9. WORK PROCESS */}
          <WorkProcess steps={WORK_PROCESS} />

          {/* 10. AVAILABILITY & LOCATION */}
          <Availability availability={mappedAvailability} />

          {/* 11. SOCIAL LINKS */}
          <SocialLinks links={links} />

          {/* 12. FOOTER */}
          <div className="py-8 text-center text-xs text-gray-400 space-y-2">
            <p>Profile last updated: Today</p>
            <button className="text-red-400 hover:underline">Report profile</button>
            <div className="pt-4 font-bold tracking-widest text-gray-300 dark:text-gray-600">POWERED BY INFLU</div>
          </div>

          <RequestServiceModal 
            isOpen={isRequestFormOpen} 
            onOpenChange={setIsRequestFormOpen} 
            username={username || ""}
            offers={offers}
            prefillService={selectedService?.title || null}
            displayName={profile?.name || displayName} 
            onSuccess={handleSuccess}
          />

          <RequestSuccessModal 
            isOpen={isSuccessOpen} 
            onOpenChange={setIsSuccessOpen} 
            username={username || ""}
            service={successService}
            contactMethod={contactInfo.method}
            email={contactInfo.email || null}
            whatsapp={contactInfo.whatsapp || null}
          />
        </div>
      </div>
    </div>
  );
}

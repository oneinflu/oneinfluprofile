"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Instagram, 
  Youtube, 
  Twitter, 
  Clock, 
  MapPin,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ShieldCheck,
  Zap,
  Smile,
  Video,
  X,
  Sun,
  Moon
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Label } from "@/components/base/input/label";
import { Heading, Modal as AriaModal, ModalOverlay as AriaModalOverlay, Dialog as AriaDialog } from "react-aria-components";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";

// --- Mock Data ---

const MOCK_STATS = [
  { label: "Instagram", value: "120K" },
  { label: "YouTube", value: "45K" },
  { label: "Avg Engagement", value: "3.8%" },
  { label: "Since", value: "2019" },
];

const FEATURED_WORK = [
  { 
    id: 1, 
    platform: "instagram",
    videoId: "DS7q3zECYMp"
  },
  { 
    id: 2, 
    platform: "instagram",
    videoId: "DSFKC5ZE6o1"
  },
  { 
    id: 3, 
    platform: "youtube",
    videoId: "FZ4TVVbpHbo"
  },
  { 
    id: 4, 
    platform: "youtube",
    videoId: "_5MtsxRDXvI"
  },
];

const CONTENT_TAGS = [
  "Reels", "Shorts", "Explainers", "Lifestyle", "Regional"
];

const TONE_TAGS = [
  "Brand-safe", "Educational", "Humorous"
];

const MOCK_SERVICES = [
  { 
    id: 1, 
    title: "Brand Reel", 
    price: "₹25,000", 
    time: "5-7 days",
    details: "End-to-end production including scripting, shooting, and editing. Optimized for high retention.",
    revisions: "2 Revisions"
  },
  { 
    id: 2, 
    title: "Product Showcase", 
    price: "₹15,000", 
    time: "3-5 days",
    details: "Aesthetic product videography focusing on features and benefits.",
    revisions: "1 Revision"
  },
  { 
    id: 3, 
    title: "Campaign Package", 
    price: "Custom", 
    time: "2 Weeks",
    details: "Comprehensive monthly package including 4 Reels and 8 Stories.",
    revisions: "Unlimited during draft"
  },
];

const PAST_COLLABS = [
  "Samsung", "Nike", "Spotify", "Adobe", "Canon", "Sony"
];

const WORK_PROCESS = [
  "Brief & discussion",
  "Concept approval",
  "Shoot & edit",
  "Final delivery"
];

const AVAILABILITY = {
  types: ["One-time", "Monthly", "Event-based"],
  mode: ["Remote", "On-site (Hyderabad + 50km)"]
};

const SOCIAL_LINKS = [
  { name: "Instagram", icon: <Instagram className="w-5 h-5" />, url: "#" },
  { name: "YouTube", icon: <Youtube className="w-5 h-5" />, url: "#" },
  { name: "Website", icon: <ExternalLink className="w-5 h-5" />, url: "#" },
];

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;
  const displayName = username?.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || "Creator Name";

  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleService = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handleRequestService = (service: any) => {
    setSelectedService(service);
    setIsRequestFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-[#050505] text-gray-900 dark:text-gray-100 pb-24 font-sans selection:bg-brand-500/30 relative overflow-x-hidden">
      <BackgroundPattern pattern="grid-check" className="absolute inset-0 w-full h-full opacity-40 text-gray-200 dark:text-gray-800" />
      
      <div className="pt-4">
        {/* 2. CREATOR HERO CARD (PREMIUM REDESIGN) */}
        <div className="px-4 pt-4 pb-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-900 via-brand-950 to-black text-white shadow-2xl ring-1 ring-white/10"
          >
            {/* Decorative Background Pattern */}
            <BackgroundPattern pattern="grid" className="absolute inset-0 opacity-20 text-white mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />
            
            {/* Top Bar inside Card: Logo, Theme, Share */}
            <div className="relative z-10 flex justify-between items-start p-4">
              {/* Left: Logo */}
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2 shadow-sm ring-1 ring-white/20">
                 <UntitledLogoMinimal className="w-6 h-6 text-white" />
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                 <Button 
                   size="sm" 
                   color="secondary" 
                   className="bg-white/10 backdrop-blur-md border-transparent hover:bg-white/20 text-white rounded-full !p-2" 
                   onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                 >
                    {mounted && resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                 </Button>

                 <Button 
                   size="sm" 
                   color="secondary" 
                   className="bg-white/10 backdrop-blur-md border-transparent hover:bg-white/20 text-white rounded-full !p-2" 
                   onClick={() => {}}
                 >
                   <Share2 className="w-4 h-4" />
                 </Button>
              </div>
            </div>

            {/* Profile Info Area */}
            <div className="relative z-10 px-6 pb-6 pt-8 flex flex-col gap-5">
              {/* Row 1: Avatar & Identity */}
              <div className="flex items-end gap-4">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-brand-400 to-pink-500 rounded-full opacity-70 blur-sm animate-pulse" />
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
                    alt={displayName} 
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-[#0a0a0a] bg-gray-800 shadow-xl" 
                  />
                  <div className="absolute bottom-1 right-1 bg-brand-500 text-white p-1 rounded-full border-2 border-[#0a0a0a]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white mb-1">{displayName}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
                    <span className="font-medium text-brand-200">Tech & Lifestyle</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" /> 
                      <span>Hyderabad, IN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Bio */}
              <div>
                <p className="text-sm text-gray-200 leading-relaxed max-w-2xl">
                  Digital creator passionate about tech reviews and daily lifestyle vlogs. Helping brands tell better stories through authentic content and creative visual storytelling.
                </p>
              </div>

              {/* Row 3: Niche Chips */}
              <div className="flex flex-wrap gap-2">
                 {["Tech Reviews", "Lifestyle", "Gadgets", "Vlogging"].map(tag => (
                    <div key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white backdrop-blur-md shadow-sm hover:bg-white/20 transition-colors cursor-default">
                      {tag}
                    </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. QUICK STATS ROW */}
        <div className="px-4 mt-4">
          <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-white/10 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
            {MOCK_STATS.map((stat, idx) => (
              <div key={idx} className="p-2 py-4 text-center flex flex-col justify-center items-center h-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1 group-hover:scale-110 transition-transform origin-center">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold w-full px-0.5 leading-tight break-words flex-1 flex items-center justify-center min-h-[2.5em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-8">
          
          {/* 5. FEATURED WORK ROW */}
          <section className="overflow-hidden">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 px-1">Featured Work</h3>
            <div className="flex overflow-x-auto hide-scrollbar gap-3 px-1 pb-2 snap-x">
              {FEATURED_WORK.map((content) => (
                <div 
                  key={content.id} 
                  className="relative aspect-[9/16] w-72 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 snap-start shadow-sm"
                >
                  {content.platform === 'youtube' ? (
                     <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${content.videoId}?autoplay=1&mute=1&loop=1&playlist=${content.videoId}&controls=0&playsinline=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                      />
                  ) : (
                    <div className="w-full h-full overflow-hidden relative bg-black group">
                      <iframe 
                        className="absolute w-[160%] h-[160%] -top-[30%] -left-[30%] border-0"
                        src={`https://www.instagram.com/p/${content.videoId}/embed/`}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        scrolling="no"
                        style={{ transform: 'scale(1.2)' }}
                      />
                      {/* Clickable Overlay for Link */}
                      <a 
                        href={`https://www.instagram.com/p/${content.videoId}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10"
                        aria-label="View on Instagram"
                      />
                    </div>
                  )}
                  
                  {/* Platform Badge */}
                  <div className="absolute top-2 right-2 pointer-events-none opacity-50 z-10">
                    {content.platform === 'instagram' ? (
                      <div className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-md p-1 shadow-sm">
                        <Instagram className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="bg-red-600 rounded-md p-1 shadow-sm">
                        <Youtube className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. CONTENT TYPE & NICHE */}
          <section>
            <h3 className="text-lg font-bold mb-4">What I Create</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {CONTENT_TAGS.map(tag => (
                <Badge key={tag} size="lg" color="brand" type="pill-color">
                  {tag}
                </Badge>
              ))}
            </div>
          
          </section>

          {/* 7. SERVICES OFFERED (CRITICAL SECTION) */}
          <section>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <div className="flex flex-col gap-3">
              {MOCK_SERVICES.map((service) => {
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
                                  handleRequestService(service);
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

          {/* 8. PAST COLLABORATIONS (Social Proof Slider) */}
          <section className="overflow-hidden">
            <h3 className="text-lg font-bold mb-4 px-1">Worked With</h3>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-25 dark:from-[#050505] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-25 dark:from-[#050505] to-transparent z-10" />
              
              <div className="flex overflow-x-auto hide-scrollbar gap-3 px-1 pb-2 snap-x">
                {[...PAST_COLLABS, ...PAST_COLLABS].map((brand, idx) => (
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

          {/* 9. WORK PROCESS */}
          <section>
            <h3 className="text-lg font-bold mb-4">How I Work</h3>
            <div className="space-y-0">
              {WORK_PROCESS.map((step, idx) => (
                <div key={idx} className="flex gap-4 py-3 border-b border-gray-100 dark:border-white/5 last:border-0">
                  <span className="font-mono text-gray-300 dark:text-gray-600 font-bold">0{idx + 1}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 10. AVAILABILITY & LOCATION */}
          <section>
            <h3 className="text-lg font-bold mb-4">Availability</h3>
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/5 relative overflow-hidden">
               <BackgroundPattern pattern="circle" className="absolute top-0 right-0 opacity-50 text-gray-200 dark:text-white/5" />
              <div className="mb-4 relative z-10">
                <div className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Available For</div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY.types.map(type => (
                    <Badge key={type} size="md" color="gray" type="modern">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Working Mode</div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY.mode.map(mode => (
                    <Badge key={mode} size="md" color="success" type="color">
                      {mode}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 11. SOCIAL LINKS */}
          <section>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url}
                  className="group flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-4 font-medium text-gray-900 dark:text-white">
                    <FeaturedIcon size="sm" color="gray" theme="modern" icon={link.icon} />
                    <span className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{link.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* 12. FOOTER */}
          <div className="py-8 text-center text-xs text-gray-400 space-y-2">
            <p>Profile last updated: Today</p>
            <button className="text-red-400 hover:underline">Report profile</button>
            <div className="pt-4 font-bold tracking-widest text-gray-300 dark:text-gray-600">POWERED BY INFLU</div>
          </div>

          <AriaModalOverlay 
            isOpen={isRequestFormOpen} 
            onOpenChange={setIsRequestFormOpen}
            className={({ isEntering, isExiting }) => cx(
              "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4",
              isEntering && "animate-in fade-in duration-300",
              isExiting && "animate-out fade-out duration-200"
            )}
          >
            <AriaModal
              className={({ isEntering, isExiting }) => cx(
                "w-full sm:w-auto sm:max-w-lg outline-none",
                isEntering && "animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 ease-out",
                isExiting && "animate-out slide-out-to-bottom-full sm:zoom-out-95 duration-200 ease-in"
              )}
            >
              <AriaDialog className="outline-none focus:outline-none w-full">
                {({ close }) => (
                  <div className="bg-white dark:bg-gray-900 w-full rounded-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] shadow-2xl ring-1 ring-gray-200 dark:ring-white/10">
                    <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-start bg-white dark:bg-gray-900">
                      <div>
                        <Heading slot="title" className="text-xl font-bold text-gray-900 dark:text-white">
                          Request to {displayName}
                        </Heading>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Review the service details and share your info
                        </p>
                      </div>
                      <Button size="sm" color="primary" onClick={close} className="rounded-lg">
                        Close
                      </Button>
                    </div>
                    <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar bg-white dark:bg-gray-900">
                      {/* Service Details Card */}
                      {selectedService && (
                        <div className="border border-gray-200 dark:border-white/10 rounded-xl p-4 bg-white dark:bg-white/5">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-base">{selectedService.title}</h4>
                          <div className="flex gap-8">
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery</div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">{selectedService.time}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Includes</div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">{selectedService.revisions || "Standard revisions"}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">{selectedService.price === 'Custom' ? 'Custom' : selectedService.price}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Form Fields */}
                      <div className="space-y-4">
                        <Input label="Your Name *" placeholder="Brand / Your name" />
                        <Input label="Email / Contact *" placeholder="your@email.com" />
                        <TextArea label="Message (optional)" placeholder="Briefly describe your requirement..." rows={4} />
                        
                        <div className="space-y-1.5">
                          <Label>Attachments (Reference Material)</Label>
                          <FileUpload.Root>
                            <FileUpload.DropZone hint="Upload references, brand assets, or moodboards" />
                          </FileUpload.Root>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 pb-8 sm:pb-4">
                      <Button size="lg" color="primary" className="w-full" onClick={close}>Submit Request</Button>
                    </div>
                  </div>
                )}
              </AriaDialog>
            </AriaModal>
          </AriaModalOverlay>
        </div>
      </div>

      {/* 4. PRIMARY CTA BAR (FIXED BOTTOM) */}
      

    </div>
  );
}

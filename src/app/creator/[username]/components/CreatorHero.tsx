"use client";

import { motion } from "motion/react";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { Button } from "@/components/base/buttons/button";
import { Sun, Moon, Share2, CheckCircle2, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface CreatorHeroProps {
  username: string;
  displayName: string;
}

export function CreatorHero({ username, displayName }: CreatorHeroProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
  );
}

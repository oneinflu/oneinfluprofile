"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
  visible?: boolean;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  const getIconPath = (platform: string) => {
    const p = platform.toLowerCase();
    const map: Record<string, string> = {
      instagram: "/instagram.png",
      youtube: "/youtube.png",
      linkedin: "/linkedin.png",
      twitter: "/twitter.png",
      x: "/twitter.png",
      facebook: "/facebook.png",
      whatsapp: "/whatsapp.png",
      pinterest: "/pinterest.png",
      tiktok: "/tiktok.png",
      telegram: "/telegram.png",
      threads: "/threads.png",
      website: "/web.png",
      web: "/web.png"
    };
    return map[p] || "/web.png";
  };

  const getDisplayHandle = (link: SocialLink) => {
    try {
      const urlObj = new URL(link.url.startsWith('http') ? link.url : `https://${link.url}`);
      const path = urlObj.pathname;
      
      // Instagram / Twitter / TikTok / Threads
      if (['instagram', 'twitter', 'x', 'tiktok', 'threads'].some(p => link.platform.toLowerCase().includes(p))) {
        const handle = path.split('/').filter(Boolean)[0];
        return handle ? `@${handle}` : link.platform;
      }
      
      // YouTube
      if (link.platform.toLowerCase().includes('youtube')) {
        if (path.includes('@')) return path.split('@')[1] ? `@${path.split('@')[1]}` : link.platform;
        return link.platform;
      }

      // LinkedIn
      if (link.platform.toLowerCase().includes('linkedin')) {
        const parts = path.split('/').filter(Boolean);
        return parts.length > 1 ? parts[parts.length - 1] : link.platform;
      }

      return link.platform;
    } catch {
      return link.platform;
    }
  };

  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Connect</h3>
      <div className="flex flex-col gap-2">
        {links.filter(l => l.visible !== false).map((link, idx) => (
          <a 
            key={`${link.platform}-${idx}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-4 font-medium text-gray-900 dark:text-white">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                <Image 
                  src={getIconPath(link.platform)} 
                  alt={link.platform}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors capitalize">
                {getDisplayHandle(link)}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}

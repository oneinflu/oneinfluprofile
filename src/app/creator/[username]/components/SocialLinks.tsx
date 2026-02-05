"use client";

import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { ExternalLink, LucideIcon } from "lucide-react";

interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Connect</h3>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
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
  );
}

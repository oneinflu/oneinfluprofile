"use client";

import { Instagram, Youtube } from "lucide-react";

interface FeaturedWorkItem {
  id: string | number;
  platform: string;
  videoId: string;
}

interface FeaturedWorkProps {
  items: FeaturedWorkItem[];
}

export function FeaturedWork({ items }: FeaturedWorkProps) {
  return (
    <section className="overflow-hidden">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 px-1">Featured Work</h3>
      <div className="flex overflow-x-auto hide-scrollbar gap-3 px-1 pb-2 snap-x">
        {items.map((content) => (
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
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Trash01, Plus } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";

interface FeaturedWorkProps {
  initialData: any;
  onUpdate: () => void;
}

export function FeaturedWork({ initialData, onUpdate }: FeaturedWorkProps) {
  const { token, user, updateUserById } = useAuth();
  
  const [featuredLinks, setFeaturedLinks] = useState<Array<{ id: string; url: string; platform: string }>>([]);
  const [isSavingFeatured, setIsSavingFeatured] = useState(false);
  const [saveSuccessFeatured, setSaveSuccessFeatured] = useState(false);

  useEffect(() => {
    const works = initialData?.profile?.featuredWorks || initialData?.featuredWorks || initialData?.featuredLinks;
    
    if (Array.isArray(works) && works.length > 0) {
      // If it's an array of strings (API response), map to object format
      if (typeof works[0] === 'string') {
        const mappedLinks = works.map((url: string) => {
          let platform = 'link';
          if (url.includes('instagram.com')) platform = 'instagram';
          else if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'youtube';
          return {
            id: Math.random().toString(36).substr(2, 9),
            url: url,
            platform
          };
        });
        setFeaturedLinks(mappedLinks);
      } else {
        // Assume it's already in object format (legacy or internal state)
        setFeaturedLinks(works);
      }
    } else {
      // Ensure at least one empty input if no links exist
      setFeaturedLinks([{ id: Math.random().toString(36).substr(2, 9), url: '', platform: 'link' }]);
    }
  }, [initialData]);

  const handleAddLink = () => {
    setFeaturedLinks([...featuredLinks, { 
      id: Math.random().toString(36).substr(2, 9), 
      url: '', 
      platform: 'link' 
    }]);
  };

  const handleLinkChange = (id: string, value: string) => {
    const newLinks = featuredLinks.map(link => {
      if (link.id === id) {
        let platform = 'link';
        if (value.includes('instagram.com')) platform = 'instagram';
        else if (value.includes('youtube.com') || value.includes('youtu.be')) platform = 'youtube';
        return { ...link, url: value, platform };
      }
      return link;
    });
    setFeaturedLinks(newLinks);
  };

  const handleDeleteLink = (id: string) => {
    setFeaturedLinks(featuredLinks.filter(link => link.id !== id));
  };

  const handleSave = async () => {
    try {
      setIsSavingFeatured(true);
      setSaveSuccessFeatured(false);
      if (!token || !user?.id) return;
      
      // Filter out empty links
      const validLinks = featuredLinks.filter(link => link.url.trim() !== '');
      const featuredWorks = validLinks.map(link => link.url);
      
      await updateUserById(user.id, { featuredWorks });
      
      onUpdate();
      setSaveSuccessFeatured(true);
      setTimeout(() => setSaveSuccessFeatured(false), 3000);
    } catch {
    } finally {
      setIsSavingFeatured(false);
    }
  };

  return (
    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg font-semibold text-primary">Featured Work</h2>
          <p className="text-sm text-tertiary">Showcase your best content from Instagram, YouTube, etc.</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        {featuredLinks.map((link) => (
          <div key={link.id} className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                value={link.url}
                onChange={(val) => handleLinkChange(link.id, val)}
                placeholder="Paste link here (Instagram Reel, YouTube Short...)"
              />
            </div>
            <Button
              size="md"
              color="secondary"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDeleteLink(link.id)}
              aria-label="Delete link"
            >
              <Trash01 className="size-4" />
            </Button>
          </div>
        ))}

        <div className="flex justify-start">
          <Button
            size="sm"
            color="link-color"
            onClick={handleAddLink}
            className="px-0"
            iconLeading={Plus}
          >
            Add another link
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button
          size="md"
          color="primary"
          isLoading={isSavingFeatured}
          onClick={handleSave}
        >
          Save changes
        </Button>
        {saveSuccessFeatured && (
          <Badge type="pill-color" size="md" color="success">
            Saved
          </Badge>
        )}
      </div>
    </div>
  );
}

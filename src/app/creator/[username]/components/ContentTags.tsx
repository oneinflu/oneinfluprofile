"use client";

import { Badge } from "@/components/base/badges/badges";

interface ContentTagsProps {
  tags: string[];
}

export function ContentTags({ tags }: ContentTagsProps) {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">What I Create</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map(tag => (
          <Badge key={tag} size="lg" color="brand" type="pill-color">
            {tag}
          </Badge>
        ))}
      </div>
    </section>
  );
}

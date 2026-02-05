import { Instagram, Youtube, ExternalLink } from "lucide-react";

export const MOCK_STATS = [
  { label: "Instagram", value: "120K" },
  { label: "YouTube", value: "45K" },
  { label: "Avg Engagement", value: "3.8%" },
  { label: "Since", value: "2019" },
];

export const FEATURED_WORK = [
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

export const CONTENT_TAGS = [
  "Reels", "Shorts", "Explainers", "Lifestyle", "Regional"
];

export const TONE_TAGS = [
  "Brand-safe", "Educational", "Humorous"
];

export const MOCK_SERVICES = [
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

export const PAST_COLLABS = [
  "Samsung", "Nike", "Spotify", "Adobe", "Canon", "Sony"
];

export const WORK_PROCESS = [
  "Brief & discussion",
  "Concept approval",
  "Shoot & edit",
  "Final delivery"
];

export const AVAILABILITY = {
  types: ["One-time", "Monthly", "Event-based"],
  mode: ["Remote", "On-site (Hyderabad + 50km)"]
};

export const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
  { name: "Website", icon: ExternalLink, url: "#" },
];

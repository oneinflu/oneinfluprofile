import { Metadata } from "next";
import { CreatorsHero } from "@/components/marketing/creators-hero";
import { CreatorChat } from "@/components/marketing/creator-chat";
import { CreatorFeatures } from "@/components/marketing/creator-features";

export const metadata: Metadata = {
    title: "Creator Profile & Event Platform for Influencers | INFLU",
    description: "Create a public creator profile, apply to influencer events, manage collaborations, submit content and build proof brands trust — free for creators.",
    keywords: [
        "creator profile platform",
        "influencer profile website",
        "creator collaboration platform",
        "apply for influencer events",
        "influencer events india",
        "creator portfolio website",
        "influencer public profile",
        "creator marketing platform",
    ],
    openGraph: {
        title: "Creator Profile & Event Platform for Influencers | INFLU",
        description: "Create a public creator profile, apply to influencer events, manage collaborations, submit content and build proof brands trust — free for creators.",
        url: "https://oneinflu.com/creators",
        siteName: "INFLU",
        images: [
            {
                url: "https://oneinflu.com/creator.webp",
                width: 1200,
                height: 630,
                alt: "INFLU for Creators",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Creator Profile & Event Platform for Influencers | INFLU",
        description: "Create a public creator profile, apply to influencer events, manage collaborations, submit content and build proof brands trust — free for creators.",
        images: ["https://oneinflu.com/creator.webp"],
    },
    other: {
        "twitter:domain": "oneinflu.com",
        "twitter:url": "https://oneinflu.com/creators",
    },
};

export default function CreatorsPage() {
    return (
        <main className="min-h-screen ">
            <CreatorsHero />
            <CreatorChat />
            <CreatorFeatures />
         
        </main>
    );
}

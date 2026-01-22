import { PricingHero } from "@/components/marketing/pricing/pricing-hero";
import { PricingSection } from "@/components/marketing/pricing/pricing-section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "INFLU Pricing | Free for Creators · Smart Plans for Hosts & Brands",
    description: "Explore INFLU pricing for creators, hosts, and brands. Creators join free. Hosts manage events, approvals, QR check-ins, and reports — free for early access.",
    keywords: [
        "influencer marketing pricing",
        "event influencer platform pricing",
        "creator event management software",
        "influencer event hosting tool",
        "qr check-in event software",
        "influencer campaign management pricing",
        "creator collaboration platform",
        "event reporting for brands",
    ],
    openGraph: {
        title: "INFLU Pricing | Free for Creators · Smart Plans for Hosts & Brands",
        description: "Explore INFLU pricing for creators, hosts, and brands. Creators join free. Hosts manage events, approvals, QR check-ins, and reports — free for early access.",
        url: "https://oneinflu.com/pricing",
        siteName: "INFLU",
        images: [
            {
                url: "https://oneinflu.com/home.webp",
                width: 1200,
                height: 630,
                alt: "INFLU Pricing",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "INFLU Pricing | Free for Creators · Smart Plans for Hosts & Brands",
        description: "Explore INFLU pricing for creators, hosts, and brands. Creators join free. Hosts manage events, approvals, QR check-ins, and reports — free for early access.",
        images: ["https://oneinflu.com/home.webp"],
    },
    other: {
        "twitter:domain": "oneinflu.com",
        "twitter:url": "https://oneinflu.com/pricing",
    },
};

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <PricingHero />
            <PricingSection />
        </main>
    );
}

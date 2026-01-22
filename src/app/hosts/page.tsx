import { HostFlow } from "@/components/marketing/host-flow";
import { HostsHero } from "@/components/marketing/hosts-hero";
import { HostsProblem } from "@/components/marketing/hosts-problem";
import { HostCTA } from "@/components/marketing/host-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Influencer Event Management for Hosts & Agencies | INFLU",
    description: "Manage influencer events end-to-end — creator applications, shortlisting, QR entry, content tracking and final reports. Built for hosts & agencies.",
    keywords: [
        "influencer event management",
        "event influencer marketing",
        "influencer event software",
        "creator event management platform",
        "influencer campaign tracking",
        "event based influencer marketing",
        "manage influencer events",
        "influencer reporting platform",
    ],
    openGraph: {
        title: "Influencer Event Management for Hosts & Agencies | INFLU",
        description: "Manage influencer events end-to-end — creator applications, shortlisting, QR entry, content tracking and final reports. Built for hosts & agencies.",
        url: "https://oneinflu.com/hosts",
        siteName: "INFLU",
        images: [
            {
                url: "/host.png",
                width: 1200,
                height: 630,
                alt: "INFLU for Hosts",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Influencer Event Management for Hosts & Agencies | INFLU",
        description: "Manage influencer events end-to-end — creator applications, shortlisting, QR entry, content tracking and final reports. Built for hosts & agencies.",
        images: ["/host.png"],
    },
};

export default function HostsPage() {
    return (
        <main className="min-h-screen">
            <HostsHero />
            <HostsProblem />
            <HostFlow />
            <HostCTA />
        </main>
    );
}

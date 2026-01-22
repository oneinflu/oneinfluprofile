import type { Metadata } from "next";
import { HomeScreen } from "./home-screen";

export const metadata: Metadata = {
    title: "INFLU – Influencer Events, Creator Profiles & Campaign Management",
    description: "INFLU is an influencer event platform to manage creator profiles, host events, QR entry, content submissions and campaign reports — all in one place.",
    keywords: [
        "influencer marketing platform",
        "influencer event platform",
        "creator collaboration platform",
        "influencer events india",
        "creator marketing software",
        "influencer campaign management",
        "event based influencer marketing",
        "creator profile platform",
        "influencer collaboration tool",
    ],
    openGraph: {
        title: "INFLU – Influencer Events, Creator Profiles & Campaign Management",
        description: "INFLU is an influencer event platform to manage creator profiles, host events, QR entry, content submissions and campaign reports — all in one place.",
        url: "https://oneinflu.com",
        siteName: "INFLU",
        images: [
            {
                url: "https://oneinflu.com/home.webp",
                width: 1200,
                height: 630,
                alt: "INFLU Platform Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "INFLU – Influencer Events, Creator Profiles & Campaign Management",
        description: "INFLU is an influencer event platform to manage creator profiles, host events, QR entry, content submissions and campaign reports — all in one place.",
        images: ["https://oneinflu.com/home.webp"],
    },
    other: {
        "twitter:domain": "oneinflu.com",
        "twitter:url": "https://oneinflu.com/",
    },
};

export default HomeScreen;

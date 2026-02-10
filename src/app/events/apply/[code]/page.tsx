import { Metadata } from "next";
import EventInviteClient from "./invite-client";
import { api } from "@/utils/api";

type EventMeta = {
    eventName?: string;
    brandName?: string;
    user?: {
        name: string;
    };
};

type Props = {
    params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    
    try {
        const path = `/events/public/code/${encodeURIComponent(code)}`;
        // We use fetch directly or the api wrapper if it supports server-side
        // The api wrapper uses fetch, so it should be fine.
        // Use production URL directly to ensure metadata generation always has access to data
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://newyearbackendcode-zrp62.ondigitalocean.app";
        const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } });
        const data = await res.json();
        
        const event: EventMeta = 
            data?.data?.event ||
            data?.data?.item ||
            data?.event ||
            data?.item ||
            data?.data ||
            {};

        const title = event.eventName 
            ? `${event.eventName} | Invited by ${event.user?.name || "INFLU"}`
            : "You're Invited! | INFLU";
            
        const description = event.brandName 
            ? `Join us for an exclusive event by ${event.brandName}. Apply for your invitation now on INFLU.`
            : "You have been invited to an exclusive event. Apply for your invitation now on INFLU.";

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
            }
        };
    } catch (e) {
        return {
            title: "You're Invited! | INFLU",
            description: "You have been invited to an exclusive event. Apply for your invitation now on INFLU."
        };
    }
}

export default function Page() {
    return <EventInviteClient />;
}

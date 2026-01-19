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
        const res: any = await api.get(path);
        
        const event: EventMeta = 
            res?.data?.event ||
            res?.data?.item ||
            res?.event ||
            res?.item ||
            res?.data ||
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

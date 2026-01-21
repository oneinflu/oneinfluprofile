
import { Metadata } from "next";
import { Great_Vibes } from "next/font/google";
import CheckinClient from "./checkin-client";

const greatVibes = Great_Vibes({ 
    subsets: ["latin"],
    weight: "400",
    variable: "--font-great-vibes",
});

type Props = {
    params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: "Event Check-in | INFLU",
        description: "Verify your invitation."
    };
}

export default function Page() {
    return <CheckinClient fontClassName={greatVibes.className} />;
}


import { Metadata } from "next";
import { Great_Vibes } from "next/font/google";
import WelcomeClient from "./welcome-client";

const greatVibes = Great_Vibes({ 
    subsets: ["latin"],
    weight: "400",
    variable: "--font-great-vibes",
});

type Props = {
    params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    return {
        title: "Welcome to Event | INFLU",
        description: "Your event pass and details."
    };
}

export default function Page() {
    return <WelcomeClient fontClassName={greatVibes.className} />;
}

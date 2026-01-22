import { HostFlow } from "@/components/marketing/host-flow";
import { HostsHero } from "@/components/marketing/hosts-hero";
import { HostsProblem } from "@/components/marketing/hosts-problem";
import { HostCTA } from "@/components/marketing/host-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "For Hosts | INFLU",
    description: "Host events and manage campaigns with INFLU.",
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

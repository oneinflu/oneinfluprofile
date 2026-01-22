import { PricingHero } from "@/components/marketing/pricing/pricing-hero";
import { PricingSection } from "@/components/marketing/pricing/pricing-section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | INFLU",
    description: "Simple pricing for real event work. Creators join free. Hosts unlock control — free during early access.",
};

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <PricingHero />
            <PricingSection />
        </main>
    );
}

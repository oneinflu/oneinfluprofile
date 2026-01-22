"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PricingCard, PricingCardProps } from "./pricing-card";
import { Tabs, TabList, Tab, TabPanel } from "@/components/application/tabs/tabs";

const publicProfileCard: PricingCardProps = {
    title: "Public Profile",
    whoFor: "Creators · Hosts · Brands",
    description: "Your public identity on INFLU. Bio link, portfolio, and event discovery.",
    price: "₹0",
    priceSuffix: "— Forever",
    priceSubtext: "Never paywalled",
    features: [
        "Public INFLU profile",
        "Bio link with services & portfolio",
        "Shop & affiliate links",
        "Event discovery & invitations",
        "Profile visibility & credibility"
    ],
    ctaText: "Create free profile",
    ctaHref: "/register"
};

const hostStarterCard: PricingCardProps = {
    title: "Host Starter",
    whoFor: "Small hosts · pubs · one-off events",
    description: "Essential tools to launch and manage your first events.",
    price: "₹1,999",
    priceSuffix: "/ month",
    priceSubtext: "Free during early access",
    features: [
        "Create campaigns & events",
        "Creator applications & auto-registration",
        "Shortlist creators",
        "Invitation links",
        "QR-based entry",
        "Submission tracking",
        "Basic event report"
    ],
    ctaText: "Start with Starter",
    ctaHref: "/register?plan=starter"
};

const hostProCard: PricingCardProps = {
    title: "Host Pro",
    whoFor: "Regular hosts & event collaborators",
    description: "Professional power for scaling events and managing teams.",
    price: "₹4,999",
    priceSuffix: "/ month",
    priceSubtext: "Free during early access",
    isPopular: true,
    features: [
        "Unlimited events",
        "Client approval links",
        "Creator shortlisting + confirmation",
        "Custom invitation banners",
        "Welcome links with instructions",
        "QR + invitation code entry",
        "Live guest & creator dashboard",
        "Auto submission tracking",
        "Instagram grid-style reports"
    ],
    ctaText: "Start with Pro",
    ctaHref: "/register?plan=pro"
};

export const PricingSection = () => {
    // "hosts" | "creators"
    const [selectedTab, setSelectedTab] = useState<any>("hosts");

    return (
        <section className="py-24 relative overflow-hidden bg-secondary/30">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">
                            Hosting & event management
                        </h2>
                        <p className="text-xl text-tertiary">
                            Professional tools for hosts, collaborators, and agencies who manage creators, entry, and delivery.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-8 flex justify-center"
                    >
                        <Tabs 
                            className="w-full max-w-xs" 
                            selectedKey={selectedTab} 
                            onSelectionChange={setSelectedTab}
                        >
                            <TabList items={[]} className="bg-white dark:bg-gray-900 p-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-800" type="button-minimal" fullWidth>
                                <Tab id="hosts" className="rounded-full py-2.5 data-[selected=true]:bg-primary data-[selected=true]:text-white data-[selected=true]:shadow-md">
                                    For Hosts
                                </Tab>
                                <Tab id="creators" className="rounded-full py-2.5 data-[selected=true]:bg-primary data-[selected=true]:text-white data-[selected=true]:shadow-md">
                                    For Creators
                                </Tab>
                            </TabList>
                        </Tabs>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Hosts Panel */}
                    <div className={selectedTab === "hosts" ? "block" : "hidden"}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            <PricingCard {...publicProfileCard} delay={0.2} />
                            <PricingCard {...hostStarterCard} delay={0.3} />
                            <PricingCard {...hostProCard} delay={0.4} />
                        </div>
                    </div>

                    {/* Creators Panel */}
                    <div className={selectedTab === "creators" ? "block" : "hidden"}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                             {/* Empty column to center the single card if needed, or just center it via flex */}
                             <div className="hidden md:block"></div>
                            <PricingCard {...publicProfileCard} delay={0.2} />
                            <div className="hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";

import React from "react";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomePain } from "@/components/marketing/home-pain";
import { FeaturesAlternatingLayout01 } from "@/components/marketing/home-shift";
import { HomeWho } from "@/components/marketing/home-who";
import { NewsletterIPhoneMockup01 } from "@/components/marketing/home-cta";


export const HomeScreen = () => {
    return (
        <div className="min-h-screen w-full bg-primary">
            <HomeHero />
            <HomePain />
            <FeaturesAlternatingLayout01 />
            <HomeWho />
         <NewsletterIPhoneMockup01 />
         
        </div>
    );
};

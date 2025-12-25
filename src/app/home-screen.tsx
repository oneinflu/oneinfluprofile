"use client";

import React from "react";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomePain } from "@/components/marketing/home-pain";



export const HomeScreen = () => {
    return (
        <div className="min-h-screen w-full bg-primary">
            <HomeHero />
            <HomePain />
         
        </div>
    );
};

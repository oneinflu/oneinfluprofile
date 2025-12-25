"use client";

import React from "react";
import { Button } from "@/components/base/buttons/button";
import { HomeHero } from "@/components/marketing/home-hero";

export const HomeScreen = () => {
    return (
        <div className="min-h-screen w-full bg-primary">
            <HomeHero />
        </div>
    );
};

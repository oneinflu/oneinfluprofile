"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Header } from "@/components/marketing/header-navigation/header";

export const SiteHeader = () => {
    const pathname = usePathname();
    const search = useSearchParams();
    const firstSegment = (pathname.split("/")[1] || "").trim();
    const disallow = new Set([
        "login",
        "register",
        "add-links",
        "onboarding",
        "complete",
        "select-category",
        "select-platforms",
        "verify",
        "username",
        "admin",
    ]);
    const isAdmin = firstSegment === "admin";
    const allowStatic = new Set(["", "terms", "privacy", "creators"]);
    const isDynamicProfile = firstSegment.length > 0 && !disallow.has(firstSegment) && !allowStatic.has(firstSegment);
    const isEmbed = Boolean(search.get("embed"));

    if (isAdmin || disallow.has(firstSegment) || isDynamicProfile || isEmbed) return null;

    return <Header isFloating className="sticky top-4 z-40" />;
};

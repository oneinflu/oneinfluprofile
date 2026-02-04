"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/application/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { ThemeFab } from "@/components/application/theme-toggle/theme-fab";
import { Suspense } from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isBuilder = pathname?.startsWith("/builder");
    const isCreator = pathname?.startsWith("/creator");

    return (
        <>
            {!isBuilder && (
                <Suspense fallback={null}>
                    <SiteHeader />
                </Suspense>
            )}
            {children}
            {!isBuilder && (
                <Suspense fallback={null}>
                    <MarketingFooter />
                </Suspense>
            )}
            {!isBuilder && !isCreator && <ThemeFab />}
        </>
    );
}

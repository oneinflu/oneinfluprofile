"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export const SiteHeader = () => {
    const pathname = usePathname();
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
    const isDynamicProfile = firstSegment.length > 0 && !disallow.has(firstSegment);

    if (isAdmin || disallow.has(firstSegment) || isDynamicProfile) return null;

    return (
        <header className="sticky top-0 z-40 w-full bg-primary/90 backdrop-blur ring-1 ring-secondary_alt">
            <div className="mx-auto max-w-6xl px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/light.svg" alt="INFLU" className="h-8 w-auto dark:hidden" />
                        <img src="/logo.svg" alt="INFLU" className={cx("hidden h-8 w-auto dark:block")} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button href="/login" size="sm" color="link-gray">Login</Button>
                        <Button href="/register" size="sm" color="primary">Get started</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { useAuth } from "@/providers/auth";

export const SiteHeader = () => {
    const pathname = usePathname();
    const search = useSearchParams();
    const { user } = useAuth();
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
    const allowStatic = new Set(["", "terms", "privacy"]);
    const isDynamicProfile = firstSegment.length > 0 && !disallow.has(firstSegment) && !allowStatic.has(firstSegment);
    const isEmbed = Boolean(search.get("embed"));

    if (isAdmin || disallow.has(firstSegment) || isDynamicProfile || isEmbed) return null;

    return (
        <header className="sticky top-1.5 z-40">
            <div className="mx-auto max-w-6xl px-4">
                <div className="rounded-2xl bg-primary shadow-xs backdrop-blur px-4 py-3">
                <div className="flex items-center justify-between">
                    <a
                        href="/"
                        aria-label="Go to homepage"
                        className="flex items-center gap-2 rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <img src="/light.svg" alt="INFLU" className="h-8 w-auto dark:hidden" />
                        <img src="/logo.svg" alt="INFLU" className={cx("hidden h-8 w-auto dark:block")} />
                    </a>
                    <div className="flex items-center gap-3">
                        {user?.username ? (
                            <Button href={`/admin`} size="sm" color="primary">Go to My Profile</Button>
                        ) : (
                            <>
                                <Button href="/login" size="sm" color="link-gray">Login</Button>
                                <Button href="/register" size="sm" color="primary">Get started</Button>
                            </>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
};

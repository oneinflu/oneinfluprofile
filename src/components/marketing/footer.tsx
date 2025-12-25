"use client";

import { usePathname } from "next/navigation";
import { HelpCircle, Stars02, MessageChatCircle, User01, UploadCloud02 } from "@untitledui/icons";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";

export const MarketingFooter = () => {
    const pathname = usePathname();
    const firstSegment = (pathname.split("/")[1] || "").trim();
    const disallow = new Set(["login", "register", "add-links", "onboarding", "complete", "select-category", "select-platforms", "verify", "username", "admin"]);
    const isAdmin = firstSegment === "admin";
    const isDynamicProfile = firstSegment.length > 0 && !disallow.has(firstSegment);

    if (isAdmin || disallow.has(firstSegment) || isDynamicProfile) return null;

    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-primary py-10 md:py-12">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex items-center justify-between gap-6 rounded-2xl bg-primary ring-1 ring-secondary shadow-xs px-5 py-4 md:px-6 md:py-5">
                    <div className="flex items-center gap-4 text-fg-quaternary">
                        <Stars02 className="size-5" />
                        <User01 className="size-5" />
                        <MessageChatCircle className="size-5" />
                        <UploadCloud02 className="size-5" />
                        <HelpCircle className="size-5" />
                    </div>

                    <UntitledLogo className="h-7" />

                    <p className="text-sm text-tertiary">© {year} INFLU MEDIA TECH. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { HelpCircle, Stars02, MessageChatCircle, User01, UploadCloud02 } from "@untitledui/icons";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Instagram, LinkedIn } from "../foundations/social-icons";

export const MarketingFooter = () => {
    const pathname = usePathname();
    const search = useSearchParams();
    const firstSegment = (pathname.split("/")[1] || "").trim();
    const disallow = new Set(["login", "register", "add-links", "onboarding", "complete", "select-category", "select-platforms", "verify", "username", "admin"]);
    const isAdmin = firstSegment === "admin";
    const allowStatic = new Set(["", "terms", "privacy", "creators"]);
    const isDynamicProfile = firstSegment.length > 0 && !disallow.has(firstSegment) && !allowStatic.has(firstSegment);
    const isEmbed = Boolean(search.get("embed"));

    if (isAdmin || disallow.has(firstSegment) || isDynamicProfile || isEmbed) return null;

    const year = new Date().getFullYear();

    return (
        <footer className="w-full  py-10 md:py-12">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-2xl bg-primary ring-1 ring-secondary shadow-xs px-5 py-4 md:px-6 md:py-5">
                    <div className="flex items-center gap-4 text-fg-quaternary justify-self-start">
                        <Instagram className="size-5" />
                        <LinkedIn className="size-5" />
                        
                        
                    </div>

                    <UntitledLogo className="h-7 justify-self-center" />

                    <div className="flex items-center justify-end gap-5 justify-self-end">
                        <a href="/terms" className="text-sm text-tertiary hover:text-tertiary_hover">Terms</a>
                        <a href="/privacy" className="text-sm text-tertiary hover:text-tertiary_hover">Privacy</a>
                    </div>
                </div>
                <p className="mt-4 text-sm text-tertiary text-center">© {year} INFLU MEDIA TECH. All rights reserved.</p>
            </div>
        </footer>
    );
};

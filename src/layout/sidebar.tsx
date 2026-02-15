"use client";

import {
    CurrencyDollarCircle,
    Grid03,
    HomeLine,
    LayoutAlt01,
    LogOut01,
    MessageChatCircle,
    Link02,
    Star01,
    User01,
    Package,
    Users01,
    NotificationBox,
    Archive,
    LineChartUp03,
} from "@untitledui/icons";
import { FeaturedCardProgressBar } from "@/components/application/app-navigation/base-components/featured-cards";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

const baseNavItems: NavItemType[] = [
    { label: "Home", href: "/admin", icon: HomeLine },
    { label: "My Profile", href: "/admin/my-profile", icon: User01 },
    { label: "My Offerings", href: "/admin/offers", icon: Star01 },
    {
        label: "My Links",
        icon: Link02,
        items: [
            { label: "Social Media Links", href: "/admin/links" },
            { label: "Shop Links", href: "/admin/shop-links" },
        ],
    },
    { label: "Portfolio", href: "/admin/portfolio", icon: Grid03 },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageChatCircle },
];

const professionalNavItems: NavItemType[] = [
    { label: "Payments", href: "/admin/payments", icon: CurrencyDollarCircle },
];

export const AppSidebar = () => {
    const { user, token, getMe } = useAuth();
    const [progress, setProgress] = useState(0);
    const [desc, setDesc] = useState("Loading storage…");
    const [category, setCategory] = useState<string | null>(null);
    const username = user?.username || "";
    const shareHref = `/${user?.username || ""}`;
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token) return;
                const res = await api.get<{ success: boolean; status: string; data: { usedBytes: number; limitBytes: number; remainingBytes: number } }>(`/users/${user.username}/storage`, { token });
                if (!alive) return;
                const used = Number(res.data?.usedBytes || 0);
                const limit = Number(res.data?.limitBytes || 15 * 1024 * 1024 * 1024);
                const pct = Math.max(0, Math.min(100, Math.round((used / Math.max(1, limit)) * 100)));
                const gb = (v: number) => (v / (1024 * 1024 * 1024));
                setProgress(pct);
                setDesc(`You have used ${gb(used).toFixed(1)}GB of ${(gb(limit)).toFixed(0)}GB`);
            } catch {
                if (!alive) return;
                setProgress(0);
                setDesc("Unable to load storage");
            }
        })();
        return () => {
            alive = false;
        };
    }, [user?.username, token]);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!token) return;
                const me = await getMe();
                if (!alive) return;
                setCategory(me.category || null);
            } catch {}
        })();
        return () => {
            alive = false;
        };
    }, [token, getMe]);

    const isProfessional = category === "Professional";
    const isBuilder = category === "Builder";
    const builderNavItems: NavItemType[] = [
        { label: "Projects", href: "/admin/builder/projects", icon: Grid03 },
        { label: "Units", href: `/builder/${username}`, icon: Package },
        { label: "Buyers", href: `/builder/${username}`, icon: Users01 },
        { label: "Site Updates", href: `/builder/${username}`, icon: NotificationBox },
        { label: "Supply", href: `/builder/${username}`, icon: Archive },
        { label: "Payments Timeline", href: `/builder/${username}`, icon: LineChartUp03 },
    ];
    
    let navItemsSimple: NavItemType[] = [];
    
    if (isProfessional) {
        navItemsSimple = [...baseNavItems, ...professionalNavItems];
    } else if (isBuilder) {
        navItemsSimple = [baseNavItems[0], ...builderNavItems, ...baseNavItems.slice(1)];
    } else {
        navItemsSimple = baseNavItems;
    }
    return (
        <SidebarNavigationSimple
            items={navItemsSimple}
            footerItems={[
               
                
                {
                    label: "Share your profile",
                    href: shareHref,
                    icon: LayoutAlt01,
                },
                {
                   label: "Sign Out",
                    href: "/logout",
                    icon: LogOut01,
                },
            ]}
            featureCard={
                <FeaturedCardProgressBar
                    title="Used space"
                    description={desc}
                    progress={progress}
                    className="hidden md:flex"
                    showClose={false}
                    showActions={false}
                />
            }
            showAccountCard={false}
        />
    );
};

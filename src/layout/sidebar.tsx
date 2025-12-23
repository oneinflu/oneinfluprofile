"use client";

import {
    Archive,
    BarChartSquare02,
    CheckDone01,
    CurrencyDollarCircle,
    Grid03,
    HomeLine,
    LayoutAlt01,
    LineChartUp03,
    MessageChatCircle,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings01,
    Star01,
    User01,
    Users01,
    UsersPlus,
} from "@untitledui/icons";
import { FeaturedCardProgressBar } from "@/components/application/app-navigation/base-components/featured-cards";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { BadgeWithDot } from "@/components/base/badges/badges";

const navItemsSimple: NavItemType[] = [
    { label: "Home", href: "/admin", icon: HomeLine },
    { label: "My Profile", href: "/admin/my-porifle", icon: User01 },
    { label: "My Offerings", href: "/admin/offers", icon: Star01 },
    { label: "Portfolio", href: "/admin/portfolio", icon: Grid03 },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageChatCircle },
    { label: "Payments", href: "/admin/payments", icon: CurrencyDollarCircle },
];
export const AppSidebar = () => (
    <SidebarNavigationSimple
        items={navItemsSimple}
        footerItems={[
            {
                label: "Settings",
                href: "/settings",
                icon: Settings01,
            },
            {
                label: "Support",
                href: "/support",
                icon: MessageChatCircle,
                badge: (
                    <BadgeWithDot color="success" type="modern" size="sm">
                        Online
                    </BadgeWithDot>
                ),
            },
            {
                label: "Share your profile",
                href: "/suurya",
                icon: LayoutAlt01,
            },
        ]}
        featureCard={
            <FeaturedCardProgressBar
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                className="hidden md:flex"
                onDismiss={() => {}}
                onConfirm={() => {}}
            />
        }
    />
);

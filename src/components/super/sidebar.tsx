"use client";

import { usePathname, useRouter } from "next/navigation";
import { 
    Home01, 
    User01, 
    Monitor01, 
    Building02, 
    File02, 
    LogOut01 
} from "@untitledui/icons";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { NavItemType } from "@/components/application/app-navigation/config";

export function SuperSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems: NavItemType[] = [
        { label: "Home", icon: Home01, href: "/super/dashboard" },
        { label: "Creators", icon: User01, href: "/super/creators" },
        { label: "Hosts", icon: Monitor01, href: "/super/hosts" },
        { label: "Business", icon: Building02, href: "/super/business" },
        { 
            label: "Blogs", 
            icon: File02, 
            items: [
                { label: "Categories", href: "/super/blogs/categories" },
                { label: "Posts", href: "/super/blogs" }
            ]
        }
    ];

    const footerItems: NavItemType[] = [
        {
            label: "Sign out",
            icon: LogOut01,
            href: "/logout" // This triggers the handleLogout which uses onLogout
        }
    ];

    const handleLogout = () => {
        sessionStorage.removeItem("influu_token");
        sessionStorage.removeItem("influu_super_mode");
        router.replace("/super/login");
    };

    return (
        <SidebarNavigationSimple
            activeUrl={pathname}
            items={navItems}
            footerItems={footerItems}
            showAccountCard={false}
            onLogout={handleLogout}
        />
    );
}

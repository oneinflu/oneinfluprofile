"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/layout/sidebar";
import { useAuth } from "@/providers/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token } = useAuth();
    
    useEffect(() => {
        try {
            const t = token || localStorage.getItem("influu_token");
            if (!t) {
                router.replace("/login");
                return;
            }
            const hasCookie = document.cookie.includes("influu_token=");
            if (!hasCookie) {
                const d = new Date();
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                document.cookie = `influu_token=${t};expires=${d.toUTCString()};path=/`;
            }
        } catch {
            router.replace("/login");
        }
    }, [router, token]);
    return (
        <>
            <AppSidebar />
            {children as any}
        </>
    );
}

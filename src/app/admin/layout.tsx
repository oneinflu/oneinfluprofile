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
            if (!t) router.replace("/login");
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

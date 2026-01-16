"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";

export default function LogoutPage() {
    const router = useRouter();
    const { logout } = useAuth();
    useEffect(() => {
        (async () => {
            await logout();
            try { router.replace("/login"); } catch {}
            try { if (typeof window !== "undefined") window.location.replace("/login"); } catch {}
        })();
    }, [router, logout]);
    return null;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    useEffect(() => {
        try {
            const t = localStorage.getItem("influu_token");
            if (!t) router.replace("/login");
        } catch {
            router.replace("/login");
        }
    }, [router]);
    return children as any;
}

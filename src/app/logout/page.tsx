"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";

export default function LogoutPage() {
    const router = useRouter();
    const { setToken, setUser } = useAuth();
    useEffect(() => {
        try {
            setToken(null);
            setUser(null);
            try { localStorage.removeItem("influu_username"); } catch {}
            try { localStorage.removeItem("influu_user_id"); } catch {}
            try { localStorage.removeItem("influu_token"); } catch {}
        } catch {}
        router.replace("/login");
    }, [router, setToken, setUser]);
    return null;
}

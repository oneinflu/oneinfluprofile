"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { Button } from "@/components/base/buttons/button";

export default function SuccessPage() {
    const animRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
        let anim: any;
        let alive = true;
        (async () => {
            try {
                const mod = await import("lottie-web");
                if (!alive || !animRef.current) return;
                anim = mod.default.loadAnimation({
                    container: animRef.current,
                    renderer: "svg",
                    loop: false,
                    autoplay: true,
                    path: "/sent.json"
                });
            } catch {}
        })();
        return () => { 
            alive = false;
            if (anim) anim.destroy(); 
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
             <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
                <div ref={animRef} className="mx-auto mb-4 h-32 w-32" />
                
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    You have applied for invitation for the event
                </h3>
                
                <p className="mx-auto mb-8 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                    Wait for the confirmation message you will receive once you are shortlisted
                </p>

                <Button 
                    size="lg" 
                    color="primary" 
                    className="w-full"
                    onClick={() => {
                        if (token) {
                            const d = new Date();
                            d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                            document.cookie = `influu_token=${token};expires=${d.toUTCString()};path=/`;
                        }
                        router.push(`/admin/my-profile`);
                    }}
                >
                    Manage Your Profile
                </Button>
            </div>
        </div>
    );
}

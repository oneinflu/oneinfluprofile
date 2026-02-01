"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { motion } from "framer-motion";
import { api } from "@/utils/api";

export default function SuperAdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Simple session check for UI demo
        // Removed auto-redirect to ensure API testing is possible
        // if (typeof window !== "undefined" && sessionStorage.getItem("influu_super_mode") === "true") {
        //     router.replace("/super/dashboard");
        // }
    }, [router]);

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (loading) return;
        if (!username || !password) {
            setErrorMsg("Please enter both username and password");
            return;
        }
        setLoading(true);
        setErrorMsg(null);
        
        console.log("Attempting login with:", { username, passwordLength: password.length });

        try {
            console.log("Calling API: /auth/login");
            const res = await api.post<{ success: boolean; status: string; data: { token: string; user: any } }>("/auth/login", { 
                identifier: username, 
                password 
            });
            console.log("API Response:", res);

            if (res.success && res.data?.token) {
                sessionStorage.setItem("influu_token", res.data.token);
                sessionStorage.setItem("influu_super_mode", "true");
                
                // Force a small delay to ensure session storage is set
                setTimeout(() => {
                    router.push("/super/dashboard");
                }, 100);
            } else {
                console.warn("Login failed: Invalid response structure", res);
                setErrorMsg("Login failed: Invalid response");
                setLoading(false);
            }
        } catch (e: any) {
            console.error("Login Error:", e);
            setErrorMsg(e.message || "Invalid credentials");
            setLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 selection:bg-red-500/30 dark:bg-black">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -left-[10%] -top-[10%] h-[50vh] w-[50vw] rounded-full bg-blue-100/50 blur-[120px] dark:bg-blue-900/20" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[50vh] w-[50vw] rounded-full bg-purple-100/50 blur-[120px] dark:bg-purple-900/20" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[400px] p-6"
            >
                {/* Glass Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-2xl dark:backdrop-blur-xl dark:hover:border-white/20 dark:hover:bg-white/[0.07]">
                    <div className="mb-10 flex flex-col items-center">
                        <div className="mb-6 rounded-2xl  p-4">
                            <img src="/light.svg" alt="INFLU" className="h-10 w-auto dark:hidden" />
                            <img src="/logo.svg" alt="INFLU" className="hidden h-10 w-auto dark:block" />
                        </div>
                        <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                            Super Admin
                        </h1>
                        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                            Enter your credentials to access the command center
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-400">Username</label>
                            <Input
                                placeholder="superadmin"
                                value={username}
                                onChange={(v) => {
                                    setUsername(String(v));
                                    if (errorMsg) setErrorMsg(null);
                                }}
                                className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/20 dark:focus:ring-white/20"
                                isInvalid={!!errorMsg}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-400">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(v) => {
                                    setPassword(String(v));
                                    if (errorMsg) setErrorMsg(null);
                                }}
                                className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/20 dark:focus:ring-white/20"
                                isInvalid={!!errorMsg}
                            />
                        </div>

                        {errorMsg && (
                            <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-center text-sm font-medium text-red-400"
                            >
                                {errorMsg}
                            </motion.p>
                        )}
                        
                        <Button 
                            type="button"
                            size="lg" 
                            className="mt-2 w-full bg-white text-black hover:bg-gray-200"
                            onClick={() => handleLogin()}
                            disabled={loading}
                            isLoading={loading}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600">
                        Restricted Access. Authorized Personnel Only.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

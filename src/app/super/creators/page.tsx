"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SuperSidebar } from "@/components/super/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "@/components/base/buttons/button";
import { 
    User01, 
    Users01,
    TrendUp01,
    CheckVerified01,
    Star01
} from "@untitledui/icons";

export default function SuperCreatorsPage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = sessionStorage.getItem("influu_token");
            if (!token) {
                router.replace("/super/login");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [router]);

    if (!isAuthorized) return null;

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 selection:bg-red-500/30 dark:bg-black dark:text-white lg:flex-row">
            <SuperSidebar />

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Creators</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage and monitor creator performance.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Total Creators", value: "12,453", icon: Users01, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-400/10", border: "border-blue-200 dark:border-blue-400/20" },
                            { label: "Active Today", value: "1,240", icon: User01, color: "text-green-500 dark:text-green-400", bg: "bg-green-100 dark:bg-green-400/10", border: "border-green-200 dark:border-green-400/20" },
                            { label: "New (This Week)", value: "+342", icon: TrendUp01, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-400/10", border: "border-purple-200 dark:border-purple-400/20" },
                            { label: "Verified", value: "892", icon: CheckVerified01, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-400/10", border: "border-orange-200 dark:border-orange-400/20" }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:bg-white/[0.07]"
                            >
                                <div className="flex items-center justify-between">
                                    <div className={cn("rounded-lg p-2", stat.bg, stat.color)}>
                                        <stat.icon className="size-5" />
                                    </div>
                                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full border", stat.bg, stat.color, stat.border)}>
                                        +12%
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Creators Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-white/10">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">All Creators</h2>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Filter</Button>
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Export</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-white/5 dark:text-gray-400">
                                        <th className="px-6 py-4 font-medium">Creator</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Followers</th>
                                        <th className="px-6 py-4 font-medium">Engagement</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-600 dark:divide-white/5 dark:text-gray-300">
                                    {[
                                        { name: "Sarah Jenkins", handle: "@sarahj", category: "Lifestyle", followers: "1.2M", engagement: "4.8%", status: "Verified", joined: "Jan 23, 2024" },
                                        { name: "Mike Chen", handle: "@mike_tech", category: "Tech", followers: "850K", engagement: "5.2%", status: "Active", joined: "Jan 22, 2024" },
                                        { name: "Alex Rivera", handle: "@arivera", category: "Fashion", followers: "2.1M", engagement: "3.9%", status: "Verified", joined: "Jan 21, 2024" },
                                        { name: "Emma Wilson", handle: "@emma_eats", category: "Food", followers: "500K", engagement: "6.1%", status: "Active", joined: "Jan 20, 2024" },
                                        { name: "James Lee", handle: "@jlee_design", category: "Design", followers: "320K", engagement: "7.4%", status: "Pending", joined: "Jan 19, 2024" },
                                        { name: "Sofia Garcia", handle: "@sofia_g", category: "Travel", followers: "1.5M", engagement: "4.5%", status: "Verified", joined: "Jan 18, 2024" },
                                        { name: "David Kim", handle: "@dkim_fitness", category: "Fitness", followers: "900K", engagement: "5.8%", status: "Active", joined: "Jan 17, 2024" },
                                    ].map((creator, i) => (
                                        <tr key={i} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{creator.name}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{creator.handle}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">
                                                    {creator.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{creator.followers}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                                    <TrendUp01 className="size-3" />
                                                    {creator.engagement}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                    creator.status === "Verified" && "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400",
                                                    creator.status === "Active" && "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400",
                                                    creator.status === "Pending" && "bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-400"
                                                )}>
                                                    {creator.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{creator.joined}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

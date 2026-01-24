"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SuperSidebar } from "@/components/super/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "@/components/base/buttons/button";
import { 
    Building02,
    Target02,
    BarChartSquare02,
    PieChart01,
    TrendUp01,
    CurrencyDollarCircle
} from "@untitledui/icons";

export default function SuperBusinessPage() {
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
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Business</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage business accounts and campaign performance.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Total Businesses", value: "3,842", icon: Building02, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-400/10", border: "border-blue-200 dark:border-blue-400/20" },
                            { label: "Active Campaigns", value: "842", icon: Target02, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-400/10", border: "border-purple-200 dark:border-purple-400/20" },
                            { label: "Total Spend", value: "$4.2M", icon: CurrencyDollarCircle, color: "text-green-500 dark:text-green-400", bg: "bg-green-100 dark:bg-green-400/10", border: "border-green-200 dark:border-green-400/20" },
                            { label: "Average ROI", value: "342%", icon: PieChart01, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-400/10", border: "border-orange-200 dark:border-orange-400/20" }
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
                                        +15.2%
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Business Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-white/10">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Businesses</h2>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Filter</Button>
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Export</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-white/5 dark:text-gray-400">
                                        <th className="px-6 py-4 font-medium">Company</th>
                                        <th className="px-6 py-4 font-medium">Industry</th>
                                        <th className="px-6 py-4 font-medium">Active Campaigns</th>
                                        <th className="px-6 py-4 font-medium">Total Spend</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Account Manager</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-600 dark:divide-white/5 dark:text-gray-300">
                                    {[
                                        { name: "TechFlow Inc.", industry: "SaaS", campaigns: "12", spend: "$850K", status: "Enterprise", manager: "Alex M." },
                                        { name: "GreenLife", industry: "Retail", campaigns: "8", spend: "$420K", status: "Active", manager: "Sarah J." },
                                        { name: "Urban Style", industry: "Fashion", campaigns: "24", spend: "$1.2M", status: "Enterprise", manager: "David K." },
                                        { name: "FitPulse", industry: "Health", campaigns: "5", spend: "$120K", status: "Active", manager: "Emma W." },
                                        { name: "CloudScale", industry: "Technology", campaigns: "15", spend: "$950K", status: "Enterprise", manager: "James L." },
                                        { name: "EcoHome", industry: "Home", campaigns: "3", spend: "$80K", status: "New", manager: "Sofia G." },
                                    ].map((business, i) => (
                                        <tr key={i} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400">
                                                        <Building02 className="size-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{business.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{business.industry}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{business.campaigns}</td>
                                            <td className="px-6 py-4 font-medium text-green-600 dark:text-green-400">{business.spend}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                    business.status === "Enterprise" && "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400",
                                                    business.status === "Active" && "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400",
                                                    business.status === "New" && "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400"
                                                )}>
                                                    {business.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{business.manager}</td>
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

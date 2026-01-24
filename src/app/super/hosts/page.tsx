"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SuperSidebar } from "@/components/super/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "@/components/base/buttons/button";
import { 
    Monitor01, 
    Calendar,
    Users01,
    CurrencyDollarCircle,
    TrendUp01,
    Star01
} from "@untitledui/icons";

export default function SuperHostsPage() {
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
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Hosts</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage event hosts and monitor event performance.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Total Hosts", value: "2,842", icon: Monitor01, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-400/10", border: "border-blue-200 dark:border-blue-400/20" },
                            { label: "Active Events", value: "156", icon: Calendar, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-400/10", border: "border-purple-200 dark:border-purple-400/20" },
                            { label: "Total Attendees", value: "45.2K", icon: Users01, color: "text-green-500 dark:text-green-400", bg: "bg-green-100 dark:bg-green-400/10", border: "border-green-200 dark:border-green-400/20" },
                            { label: "Revenue Generated", value: "$1.2M", icon: CurrencyDollarCircle, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-400/10", border: "border-orange-200 dark:border-orange-400/20" }
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
                                        +8.5%
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Hosts Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-white/10">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Active Hosts</h2>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Filter</Button>
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Export</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-white/5 dark:text-gray-400">
                                        <th className="px-6 py-4 font-medium">Host</th>
                                        <th className="px-6 py-4 font-medium">Events Hosted</th>
                                        <th className="px-6 py-4 font-medium">Attendees</th>
                                        <th className="px-6 py-4 font-medium">Rating</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Last Active</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-600 dark:divide-white/5 dark:text-gray-300">
                                    {[
                                        { name: "TechConf Global", type: "Organization", events: "42", attendees: "12.5K", rating: "4.9", status: "Premium", lastActive: "2 mins ago" },
                                        { name: "Design Weekly", type: "Community", events: "156", attendees: "8.2K", rating: "4.8", status: "Active", lastActive: "1 hour ago" },
                                        { name: "Startup Summit", type: "Organization", events: "12", attendees: "5.4K", rating: "4.7", status: "Active", lastActive: "3 hours ago" },
                                        { name: "DevMeetup NYC", type: "Community", events: "89", attendees: "3.1K", rating: "4.9", status: "Active", lastActive: "5 hours ago" },
                                        { name: "Product School", type: "Education", events: "234", attendees: "45.2K", rating: "4.6", status: "Premium", lastActive: "1 day ago" },
                                        { name: "Marketing Pros", type: "Community", events: "67", attendees: "2.8K", rating: "4.5", status: "Active", lastActive: "2 days ago" },
                                    ].map((host, i) => (
                                        <tr key={i} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400">
                                                        <Monitor01 className="size-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{host.name}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{host.type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{host.events}</td>
                                            <td className="px-6 py-4">{host.attendees}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-orange-500">
                                                    <Star01 className="size-3 fill-current" />
                                                    <span className="text-gray-700 dark:text-gray-300">{host.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                    host.status === "Premium" && "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400",
                                                    host.status === "Active" && "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400"
                                                )}>
                                                    {host.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{host.lastActive}</td>
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

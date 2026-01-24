"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { 
    Users01, 
    BarChart01, 
    BankNote01, 
    LogOut01, 
    LayersTwo01,
    Home01,
    Building02,
    File02,
    ChevronDown,
    Briefcase01,
    User01,
    Monitor01
} from "@untitledui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cn } from "@/utils/cn";

import { SuperSidebar } from "@/components/super/sidebar";

export default function SuperAdminDashboard() {
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
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard Overview</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back, here's what's happening today.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Creators", value: "12,453", icon: User01, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-400/10", border: "border-blue-200 dark:border-blue-400/20" },
                            { label: "Business", value: "3,842", icon: Building02, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-400/10", border: "border-purple-200 dark:border-purple-400/20" },
                            { label: "Professionals", value: "8,234", icon: Briefcase01, color: "text-green-500 dark:text-green-400", bg: "bg-green-100 dark:bg-green-400/10", border: "border-green-200 dark:border-green-400/20" },
                            { label: "Personal", value: "45,921", icon: Users01, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-400/10", border: "border-orange-200 dark:border-orange-400/20" }
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

                    {/* Latest Blogs Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-white/10">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Latest Blog Posts</h2>
                            <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">View All</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-white/5 dark:text-gray-400">
                                        <th className="px-6 py-4 font-medium">Post Title</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Author</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-600 dark:divide-white/5 dark:text-gray-300">
                                    {[
                                        { title: "The Future of Influencer Marketing 2024", category: "Trends", author: "Sarah Jenkins", date: "Jan 23, 2024", status: "Published" },
                                        { title: "How to Maximize ROI with Micro-Influencers", category: "Strategy", author: "Mike Chen", date: "Jan 22, 2024", status: "Draft" },
                                        { title: "Platform Updates: Q1 Release Notes", category: "Product", author: "Alex Rivera", date: "Jan 21, 2024", status: "Published" },
                                        { title: "Top 10 Content Creation Tools", category: "Resources", author: "Emma Wilson", date: "Jan 20, 2024", status: "Scheduled" },
                                        { title: "Building Authentic Communities", category: "Community", author: "James Lee", date: "Jan 19, 2024", status: "Published" },
                                    ].map((post, i) => (
                                        <tr key={i} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{post.title}</td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                                                    {post.author}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{post.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                    post.status === "Published" && "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400",
                                                    post.status === "Draft" && "bg-gray-100 text-gray-700 dark:bg-gray-400/10 dark:text-gray-400",
                                                    post.status === "Scheduled" && "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400"
                                                )}>
                                                    {post.status}
                                                </span>
                                            </td>
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

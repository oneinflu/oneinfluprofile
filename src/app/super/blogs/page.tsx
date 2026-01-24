"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SuperSidebar } from "@/components/super/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "@/components/base/buttons/button";
import { 
    File02,
    Eye,
    MessageChatSquare,
    Share04,
    Edit05,
    Trash01
} from "@untitledui/icons";

export default function SuperBlogsPage() {
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
                    <header className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Blogs</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage blog posts and content.</p>
                        </div>
                        <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Create Post
                        </Button>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Total Posts", value: "248", icon: File02, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-400/10", border: "border-blue-200 dark:border-blue-400/20" },
                            { label: "Published", value: "215", icon: Share04, color: "text-green-500 dark:text-green-400", bg: "bg-green-100 dark:bg-green-400/10", border: "border-green-200 dark:border-green-400/20" },
                            { label: "Drafts", value: "12", icon: Edit05, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-400/10", border: "border-orange-200 dark:border-orange-400/20" },
                            { label: "Total Views", value: "1.2M", icon: Eye, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-400/10", border: "border-purple-200 dark:border-purple-400/20" }
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
                                        +5.4%
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Blogs Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-white/10">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Posts</h2>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Filter</Button>
                                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/5">Export</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-white/5 dark:text-gray-400">
                                        <th className="px-6 py-4 font-medium">Post Title</th>
                                        <th className="px-6 py-4 font-medium">Author</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Views</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-600 dark:divide-white/5 dark:text-gray-300">
                                    {[
                                        { title: "The Future of Influencer Marketing in 2024", author: "Sarah Jenkins", category: "Trends", status: "Published", views: "12.5K", date: "Jan 23, 2024" },
                                        { title: "How to Grow Your Personal Brand", author: "Mike Chen", category: "Guides", status: "Published", views: "8.2K", date: "Jan 22, 2024" },
                                        { title: "Top 10 Tools for Content Creators", author: "Alex Rivera", category: "Tools", status: "Draft", views: "-", date: "Jan 21, 2024" },
                                        { title: "Maximizing ROI with Micro-Influencers", author: "Emma Wilson", category: "Strategy", status: "Published", views: "5.4K", date: "Jan 20, 2024" },
                                        { title: "Understanding Platform Algorithms", author: "James Lee", category: "Tech", status: "Review", views: "-", date: "Jan 19, 2024" },
                                        { title: "Community Building 101", author: "Sofia Garcia", category: "Community", status: "Published", views: "3.1K", date: "Jan 18, 2024" },
                                    ].map((post, i) => (
                                        <tr key={i} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{post.author}</td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                    post.status === "Published" && "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400",
                                                    post.status === "Draft" && "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400",
                                                    post.status === "Review" && "bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-400"
                                                )}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{post.views}</td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{post.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                                        <Edit05 className="size-4" />
                                                    </button>
                                                    <button className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                                                        <Trash01 className="size-4" />
                                                    </button>
                                                </div>
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

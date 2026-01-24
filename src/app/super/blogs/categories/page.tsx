"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SuperSidebar } from "@/components/super/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "@/components/base/buttons/button";
import { 
    Tag01,
    File02,
    Edit05,
    Trash01
} from "@untitledui/icons";

export default function SuperBlogCategoriesPage() {
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
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Blog Categories</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage blog categories and tags.</p>
                        </div>
                        <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Add Category
                        </Button>
                    </header>

                    {/* Categories Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-white/10">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">All Categories</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-white/5 dark:text-gray-400">
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Slug</th>
                                        <th className="px-6 py-4 font-medium">Count</th>
                                        <th className="px-6 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-600 dark:divide-white/5 dark:text-gray-300">
                                    {[
                                        { name: "Trends", slug: "trends", count: 45 },
                                        { name: "Guides", slug: "guides", count: 32 },
                                        { name: "Tools", slug: "tools", count: 18 },
                                        { name: "Strategy", slug: "strategy", count: 56 },
                                        { name: "Tech", slug: "tech", count: 24 },
                                        { name: "Community", slug: "community", count: 15 },
                                    ].map((cat, i) => (
                                        <tr key={i} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400">
                                                        <Tag01 className="size-4" />
                                                    </div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{cat.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">{cat.slug}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <File02 className="size-3 text-gray-400" />
                                                    {cat.count} posts
                                                </div>
                                            </td>
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

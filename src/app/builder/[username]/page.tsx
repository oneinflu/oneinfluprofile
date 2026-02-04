"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { 
    Settings01, 
    Share04, 
    Globe02, 
    ArrowUpRight 
} from "@untitledui/icons";
import { 
    Instagram, 
    LinkedIn, 
    Facebook, 
    Google 
} from "@/components/foundations/social-icons";
import Image from "next/image";

export default function BuilderPage() {
    const params = useParams();
    const username = params?.username as string;

    // Mock data for the design
    const projects = [
        {
            id: 1,
            name: "Signature Altius",
            location: "Kollapur, Hyderabad",
            price: "₹ 89.09 L - 1.51 cr",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
            status: "On-Going"
        },
        {
            id: 2,
            name: "Signature Fortius",
            location: "Isnapur, Hyderabad",
            price: "₹ 65.09 L - 75.50 L",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
            status: "On-Going"
        },
        {
            id: 3,
            name: "Signature Horizon",
            location: "Manikonda, Hyderabad",
            price: "₹ 1.2 cr - 2.5 cr",
            image: "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=1000&auto=format&fit=crop",
            status: "On-Going"
        }
    ];

    return (
        <main className="min-h-screen w-full bg-purple-50 dark:bg-gray-950 p-4 transition-colors duration-200">
            <div className="max-w-md mx-auto space-y-8">
                {/* Header Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
                    {/* Top Icons */}
                    <div className="flex items-center justify-between mb-4">
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors dark:text-purple-400 dark:hover:bg-gray-800">
                            <Settings01 className="w-6 h-6" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors dark:text-gray-400 dark:hover:bg-gray-800">
                            <Share04 className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Logo & Description */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                SIGNATURE
                            </h1>
                            <h2 className="text-xl font-medium text-orange-400 tracking-widest uppercase">
                                AVENUES
                            </h2>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs">
                            Crafting homes for modern families is all about creating more than just a home. It is about balancing form and function through thoughtful design and immaculate execution.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="text-blue-500 hover:opacity-80 transition-opacity">
                                <Globe02 className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-[#0077b5] hover:opacity-80 transition-opacity">
                                <LinkedIn className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-[#E1306C] hover:opacity-80 transition-opacity">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-[#1877F2] hover:opacity-80 transition-opacity">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-[#DB4437] hover:opacity-80 transition-opacity">
                                <Google className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Badge */}
                        <div className="pt-2">
                            <Badge color="brand" size="lg" className="rounded-full px-4 py-1 text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-none">
                                8 Years in Business
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Our Projects Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Our Projects
                        </h2>
                        
                        {/* Tabs */}
                        <div className="flex bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm">
                            <button className="px-3 py-1.5 text-xs font-medium bg-purple-700 text-white rounded-md shadow-sm">
                                On-Going (6)
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Completed (20)
                            </button>
                        </div>
                    </div>

                    {/* Projects Scroll */}
                    <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                        {projects.map((project) => (
                            <Link 
                                href={`/builder/${username}/projects/${project.id}`}
                                key={project.id} 
                                className="relative w-64 aspect-[4/5] rounded-2xl overflow-hidden shrink-0 group block"
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="text-lg font-bold mb-0.5">{project.name}</h3>
                                    <p className="text-xs text-gray-300 italic mb-4">{project.location}</p>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{project.price}</span>
                                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Our Leadership Section */}
                <div className="space-y-4 pb-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Our Leadership
                    </h2>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm flex gap-4 items-start">
                        <div className="shrink-0">
                            <div className="w-24 h-24 rounded-xl overflow-hidden">
                                <img 
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                                    alt="Leader"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                Shri Vaka Venkata Ramireddy
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
                                With over 1.5 million sft of construction experience under his belt, he founded Signature Avenues to craft homes that balance form and function.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

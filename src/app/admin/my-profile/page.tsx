"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { FeaturedWork } from "./components/FeaturedWork";
import { ProfileInfo } from "./components/ProfileInfo";
import { ContactSettings } from "./components/ContactSettings";
import { PaymentSettings } from "./components/PaymentSettings";
import { AvailabilitySettings } from "./components/AvailabilitySettings";

export default function MyprofilePage() {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [niches, setNiches] = useState<Array<{ id: string; name: string }>>([]);

    // Fetch niches once
    useEffect(() => {
        (async () => {
            try {
                const res = await api.get<{ success: boolean; status: string; data: { niches: Array<{ id: string; name: string }> } }>("/niches");
                if (res.success && res.data?.niches) {
                    setNiches(res.data.niches);
                }
            } catch (e) {
                console.error("Failed to fetch niches", e);
            }
        })();
    }, []);

    const refreshData = useCallback(async () => {
        try {
            if (!token || !user?.id) return;
            // Add timestamp to prevent caching
            const me = await api.get<any>(`/users/id/${user.id}?t=${Date.now()}`, { token });
            
            setUserData(me);
        } catch (e) {
            console.error("Failed to fetch user data", e);
        }
    }, [token, user?.id]);

    // Initial data load
    useEffect(() => {
        let alive = true;
        if (!token || !user?.id) return;

        (async () => {
            await refreshData();
            if (alive) setLoading(false);
        })();

        return () => { alive = false; };
    }, [refreshData, token, user?.id]);

    return (
        <section className="min-h-screen lg:pl-[300px]">
            <div className="px-4 md:px-8 pt-6 pb-4">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-display-sm font-semibold text-primary">My Profile</h1>
                            <p className="text-md text-tertiary">Manage your public profile</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-8 pb-12">
                <div className="w-full max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col gap-6">
                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                <div className="flex items-start gap-4">
                                    <div className="size-16 rounded-full bg-primary_hover animate-pulse" />
                                    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                        <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                        <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                </div>
                                <div className="mt-4">
                                    <div className="h-24 bg-primary_hover animate-pulse rounded" />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                <div className="flex items-start justify-between">
                                    <div className="flex min-w-0 flex-col">
                                        <h2 className="text-lg font-semibold text-primary">Featured Work</h2>
                                        <p className="text-sm text-tertiary">Showcase your best content from Instagram, YouTube, etc.</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div className="h-12 bg-primary_hover animate-pulse rounded" />
                                    <div className="h-12 bg-primary_hover animate-pulse rounded" />
                                </div>
                            </div>
                            
                            <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
                                <div className="h-5 w-40 bg-primary_hover animate-pulse rounded" />
                                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                    <div className="h-10 bg-primary_hover animate-pulse rounded" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <ProfileInfo 
                                initialData={userData} 
                                niches={niches} 
                                onUpdate={refreshData} 
                            />

                            <FeaturedWork 
                                initialData={userData} 
                                onUpdate={refreshData} 
                            />

                            <AvailabilitySettings 
                                initialData={userData} 
                                onUpdate={refreshData} 
                            />
                            
                            <ContactSettings 
                                initialData={userData} 
                                onUpdate={refreshData} 
                            />
                            
                            <PaymentSettings 
                                initialData={userData} 
                                onUpdate={refreshData} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { SearchLg } from "@untitledui/icons";

export default function SuperPublicPage() {
    const [creators, setCreators] = useState<any[]>([]);
    const [totalCreators, setTotalCreators] = useState(0);
    const [creatorsLoading, setCreatorsLoading] = useState(false);

    const [eventCode, setEventCode] = useState("");
    const [eventStats, setEventStats] = useState<any>(null);
    const [eventStatsLoading, setEventStatsLoading] = useState(false);
    const [eventStatsError, setEventStatsError] = useState("");

    const fetchCreators = async () => {
        setCreatorsLoading(true);
        try {
            const res: any = await api.get("/creators/public");
            // Handle response structure based on user example
            // Example: { success: true, data: { total: 123, creators: [...] } }
            const payload = res.data || res;
            if (payload) {
                setCreators(payload.creators || []);
                setTotalCreators(payload.total || 0);
            }
        } catch (e) {
            console.error("Failed to fetch creators", e);
        } finally {
            setCreatorsLoading(false);
        }
    };

    useEffect(() => {
        fetchCreators();
    }, []);

    const fetchEventStats = async () => {
        if (!eventCode) return;
        setEventStatsLoading(true);
        setEventStatsError("");
        setEventStats(null);
        try {
            const res: any = await api.get(`/events/public/code/${eventCode}/applications/counts`);
            // Example: { success: true, data: { totalApplications: 56, ... } }
            const payload = res.data || res;
            if (payload) {
                setEventStats(payload);
            }
        } catch (e) {
            console.error("Failed to fetch event stats", e);
            setEventStatsError("Failed to fetch stats. Check event code.");
        } finally {
            setEventStatsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 space-y-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Section 1: Creators List */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Public Creators</h2>
                            <p className="text-sm text-gray-500">Total: {totalCreators}</p>
                        </div>
                        <Button onClick={fetchCreators} disabled={creatorsLoading}>
                            Refresh
                        </Button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-100">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-900 font-medium">
                                <tr>
                                    <th className="px-4 py-3 border-b border-gray-200">Name</th>
                                    <th className="px-4 py-3 border-b border-gray-200">Phone</th>
                                    <th className="px-4 py-3 border-b border-gray-200">Instagram</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {creatorsLoading ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">Loading...</td>
                                    </tr>
                                ) : creators.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">No creators found</td>
                                    </tr>
                                ) : (
                                    creators.map((creator) => (
                                        <tr key={creator.id || Math.random()} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">{creator.name || "-"}</td>
                                            <td className="px-4 py-3 font-mono text-gray-600">{creator.phone || "-"}</td>
                                            <td className="px-4 py-3 text-blue-600 truncate max-w-xs">
                                                {creator.instagramUrl ? (
                                                    <a href={creator.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                                        {creator.instagramUrl}
                                                    </a>
                                                ) : <span className="text-gray-400">-</span>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 2: Event Stats */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-xl">
                     <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Application Stats</h2>
                     
                     <div className="flex gap-3 mb-8">
                        <div className="flex-1">
                            <Input 
                                type="text"
                                placeholder="Enter Event Code" 
                                value={eventCode} 
                                onChange={(val) => setEventCode(val)}
                            />
                        </div>
                        <Button onClick={fetchEventStats} disabled={eventStatsLoading || !eventCode} iconLeading={SearchLg}>
                            Check
                        </Button>
                     </div>

                     {eventStatsError && (
                         <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4 border border-red-100">
                             {eventStatsError}
                         </div>
                     )}

                     {eventStats && (
                         <div className="grid grid-cols-2 gap-4">
                             <StatCard label="Total Applications" value={eventStats.totalApplications} />
                             <StatCard label="Applied" value={eventStats.applied} />
                             <StatCard label="Shortlisted" value={eventStats.shortlisted} />
                             <StatCard label="Invited" value={eventStats.invited} />
                         </div>
                     )}
                </section>
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string, value: number | string }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center h-24">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value ?? "-"}</p>
        </div>
    );
}

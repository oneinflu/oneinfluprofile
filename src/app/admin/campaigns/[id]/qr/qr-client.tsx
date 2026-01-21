"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import { QRCode } from "@/components/shared-assets/qr-code";
import { Button } from "@/components/base/buttons/button";
import { ArrowLeft, Download01 as Download } from "@untitledui/icons";

export default function QrClient() {
    const params = useParams();
    const router = useRouter();
    const { user, token } = useAuth();
    const id = String(params?.id || "");
    const [eventCode, setEventCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const qrRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!user?.username || !token || !id) return;
                const res = await api.get<{ success: boolean; data: { event: any } }>(`/users/${user.username}/events/${id}`, { token });
                if (!alive) return;
                const event = res.data?.event;
                if (event?.code) {
                    setEventCode(event.code);
                }
            } catch (e) {
                console.error("Failed to fetch event", e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [user, token, id]);

    const handleDownload = () => {
        // Find the SVG element inside the wrapper
        // The QRCode component wraps the qr-code-styling output in a div with ref
        // qr-code-styling appends the SVG to that div
        // However, my wrapper is around the QRCode component.
        // Let's look at the DOM structure in browser if possible, but based on code:
        // <div ref={qrRef}> <QRCode ... /> </div>
        // QRCode renders <div className...><div ref={ref} /> ... </div>
        // The inner div ref gets the svg appended.
        
        const svg = qrRef.current?.querySelector("svg");
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `checkin-qr-${eventCode}.svg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("SVG not found");
            // If it's canvas, we might need different handling, but we requested svg
        }
    };

    if (loading) return <div className="p-12 text-center">Loading...</div>;
    if (!eventCode) return <div className="p-12 text-center">Event code not found.</div>;

    const checkinUrl = `${window.location.origin}/events/checkin/${eventCode}`;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Check-in QR</h1>
                    <p className="text-gray-500 mt-2">Scan to access self check-in</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block" ref={qrRef}>
                    {/* We use key to force re-render if options change, though here they are static */}
                    <QRCode 
                        value={checkinUrl} 
                        size="lg" 
                        options={{
                            width: 300,
                            height: 300,
                            type: "svg",
                            dotsOptions: { color: "#000000", type: "rounded" },
                            backgroundOptions: { color: "#ffffff" },
                        }}
                    />
                </div>

                <div className="flex flex-col gap-3">
                     <p className="text-xs text-gray-400 font-mono break-all px-4">{checkinUrl}</p>
                     <Button size="lg" className="w-full justify-center" onClick={handleDownload} iconLeading={Download}>
                        Download SVG
                     </Button>
                     <Button size="lg" color="secondary" className="w-full justify-center" onClick={() => router.back()} iconLeading={ArrowLeft}>
                        Back to Campaign
                     </Button>
                </div>
            </div>
        </div>
    );
}

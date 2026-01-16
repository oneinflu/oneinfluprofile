"use client";


import { Button } from "@/components/base/buttons/button";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Confetti from "react-confetti";

const CompleteContent = () => {
    const params = useSearchParams();
    const [username, setUsername] = useState("guest");
    useEffect(() => {
        const fromParam = params.get("username");
        if (fromParam && fromParam.trim()) {
            setUsername(fromParam.trim());
            return;
        }
        try {
            const stored = localStorage.getItem("influu_username");
            if (stored && stored.trim()) setUsername(stored.trim());
        } catch {}
    }, [params]);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <section className="flex min-h-screen flex-col">
            <div className="pointer-events-none fixed inset-0 z-0">
                <Confetti width={size.width} height={size.height} numberOfPieces={180} recycle={true} />
            </div>
            <div className="sticky top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                <div className="mx-auto w-full max-w-xl text-center">
                   
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Looking good!</h1>
                        <p className="text-md text-tertiary">Your profile is off to a great start.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-28">
                <div className="mx-auto w-full max-w-xl">
                    <div className="mx-auto aspect-[9/19] w-full max-w-sm rounded-[2rem] bg-linear-to-b from-[#222] via-[#000] to-[#444] dark:from-[#d4d7da] dark:via-[#bfc3c7] dark:to-[#eceff1] p-1 shadow-2xl">
                        <div className="size-full overflow-hidden rounded-[inherit] bg-alpha-black ring-1 ring-primary">
                            <iframe title="Profile preview" src={`/${username}`} className="size-full border-0" />
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                        <div className="flex items-center justify-between">
                            <h2 className="text-md font-semibold text-primary">Services</h2>
                        </div>
                        <ul className="mt-2 flex flex-col gap-2">
                            {[0,1,2].map((i) => (
                                <li key={i} className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 flex-col gap-1">
                                            <div className="h-4 w-36 bg-primary_hover rounded animate-pulse" />
                                            <div className="h-3 w-56 bg-primary_hover rounded animate-pulse" />
                                        </div>
                                        <div className="shrink-0">
                                            <div className="h-4 w-24 bg-primary_hover rounded animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="h-8 w-full bg-primary_hover rounded-md animate-pulse" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                        <div className="flex items-center justify-between">
                            <h2 className="text-md font-semibold text-primary">Work & Collaborations</h2>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {[0,1,2].map((i) => (
                                <div key={i} className="overflow-hidden rounded-xl ring-1 ring-secondary_alt bg-primary">
                                    <div className="aspect-square w-full bg-primary_hover animate-pulse" />
                                    <div className="px-2 py-1">
                                        <div className="h-3 w-24 bg-primary_hover rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 px-4 md:px-8 py-4 text-center">
                <Button
                    size="lg"
                    className="mx-auto w-full max-w-xl"
                    onClick={() => {
                        if (loading) return;
                        setLoading(true);
                        router.push("/admin");
                    }}
                    isLoading={loading}
                    isDisabled={loading}
                >
                    Continue to profile
                </Button>
              
            </div>
        </section>
    );
};

export default function CompletePage() {
    return (
        <Suspense fallback={null}>
            <CompleteContent />
        </Suspense>
    );
}

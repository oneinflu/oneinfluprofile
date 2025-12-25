"use client";

import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

export const HomeShift = () => {
    return (
        <section className="root-theme relative overflow-hidden bg-linear-to-b from-[var(--root-bg-primary)] to-[var(--root-bg-secondary)]">
           
            <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                
                <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a] dark:text-[#e5e7eb]">
                    Selling your work needs more than links.
                </h2>
                <div className="mx-auto mt-5 max-w-3xl space-y-3">
                    <p className="text-md text-[#334155] dark:text-[#cbd5e1]">
                        When you sell services — whether you’re a creator, freelancer, or agency — clients need clarity before they message you.
                    </p>
                    <p className="text-md text-[#334155] dark:text-[#cbd5e1]">They want to know:</p>
                    <div className="relative mx-auto max-w-3xl overflow-hidden">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[var(--root-bg-primary)] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[var(--root-bg-primary)] to-transparent" />
                        <div aria-label="What clients need" className="flex items-center gap-3 whitespace-nowrap will-change-transform [animation:scroll-x_28s_linear_infinite]">
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">What you offer</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Whether it fits their budget</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">How to contact you</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">How to move forward</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">What’s included</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Delivery timeline</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Revision policy</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Upfront vs milestone payments</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Where to message</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Next steps</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">What you offer</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">Whether it fits their budget</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">How to contact you</span>
                            <span className="inline-flex items-center rounded-full px-4 py-2 text-md ring-1 ring-[var(--root-border)] bg-[var(--root-card-bg)] text-[#334155] dark:text-[#cbd5e1]">How to move forward</span>
                        </div>
                        <style jsx>{`
                            @keyframes scroll-x {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                        `}</style>
                    </div>
                    <p className="text-md text-[#334155] dark:text-[#cbd5e1]">A list of links doesn’t answer these questions.</p>
                   
                </div>
            </div>
        </section>
    );
};

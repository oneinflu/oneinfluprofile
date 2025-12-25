"use client";

export const HomePain = () => {
    return (
        <section className="root-theme relative overflow-hidden bg-linear-to-b from-[var(--root-bg-primary)] to-[var(--root-bg-secondary)]">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
                <div className="rounded-3xl bg-linear-to-br from-[#6241e9] via-[#5B3FD7] to-[#4f36c3] text-white ring-1 ring-[#6d52df] shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 p-8 md:p-12">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex size-11 md:size-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">≠</span>
                            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">Your bio link wasn’t built for business.</h2>
                            <p className="text-md leading-relaxed text-white/85">Most link-in-bio tools are great for sharing links.
But the moment you start selling services, collaborating with brands, or charging money — they begin to fall apart.</p>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-md font-semibold">Every enquiry starts with questions</h3>
                                <p className="text-sm leading-relaxed text-white/85">When clients click your bio, they don’t see pricing, scope, or what to do next.</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-md font-semibold">You repeat the same explanations</h3>
                                <p className="text-sm leading-relaxed text-white/85">You end up answering the same questions repeatedly across DMs instead of selling.</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-md font-semibold">Conversations are scattered</h3>
                                <p className="text-sm leading-relaxed text-white/85">Enquiries, details, and follow-ups get scattered across Instagram and WhatsApp.</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-md font-semibold">Payments happen awkwardly</h3>
                                <p className="text-sm leading-relaxed text-white/85">Payments are sent manually with reminders, screenshots, and uncomfortable follow-ups.</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-md font-semibold">Clients don’t know what to do next</h3>
                                <p className="text-sm leading-relaxed text-white/85">Visitors open your bio but don’t know how to move forward or take action confidently.</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-md font-semibold">Links help people browse, not decide</h3>
                                <p className="text-sm leading-relaxed text-white/85">Traditional bio links help people browse, but they don’t help you convert clients.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

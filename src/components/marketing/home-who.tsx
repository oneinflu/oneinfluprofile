"use client";

import { HelpCircle, MessageChatCircle, Stars02, User01 } from "@untitledui/icons";

export const HomeWho = () => {
    return (
        <section className="flex flex-col gap-10 overflow-hidden bg-primary py-16 md:gap-12 md:py-24">
            <div className="mx-auto w-full max-w-6xl px-4">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <h2 className="text-display-sm md:text-display-md font-semibold tracking-tight text-primary">Built for people who sell their work</h2>
                    <p className="mt-4 text-md md:text-lg text-tertiary">
                        INFLU is designed for individuals and teams who turn skills, services, and creativity into income—without building a website or
                        managing multiple tools.
                    </p>
                </div>
            </div>

            <div className="mx-auto w-full max-w-6xl px-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
                    <div className="rounded-2xl bg-secondary_subtle p-6 ring-1 ring-secondary_alt md:p-8">
                        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-fg-quaternary ring-1 ring-secondary_alt">
                            <Stars02 className="size-6" />
                        </span>
                        <div className="mt-4">
                            <h3 className="text-lg md:text-xl font-semibold text-primary">Creators</h3>
                            <p className="mt-1 text-md text-tertiary">Brand collaborations, promotions, and content deals</p>
                            <p className="mt-3 text-md text-secondary">
                                Show services, portfolio, and pricing so brands understand your value before reaching out.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-secondary_subtle p-6 ring-1 ring-secondary_alt md:p-8">
                        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-fg-quaternary ring-1 ring-secondary_alt">
                            <User01 className="size-6" />
                        </span>
                        <div className="mt-4">
                            <h3 className="text-lg md:text-xl font-semibold text-primary">Freelancers</h3>
                            <p className="mt-1 text-md text-tertiary">Clear offers and faster client decisions</p>
                            <p className="mt-3 text-md text-secondary">Present your services professionally and reduce repetitive conversations.</p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-secondary_subtle p-6 ring-1 ring-secondary_alt md:p-8">
                        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-fg-quaternary ring-1 ring-secondary_alt">
                            <MessageChatCircle className="size-6" />
                        </span>
                        <div className="mt-4">
                            <h3 className="text-lg md:text-xl font-semibold text-primary">Agencies</h3>
                            <p className="mt-1 text-md text-tertiary">A simple, professional front for your business</p>
                            <p className="mt-3 text-md text-secondary">
                                Share one link that explains what you do, showcases work, and handles enquiries.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-secondary_subtle p-6 ring-1 ring-secondary_alt md:p-8">
                        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-fg-quaternary ring-1 ring-secondary_alt">
                            <HelpCircle className="size-6" />
                        </span>
                        <div className="mt-4">
                            <h3 className="text-lg md:text-xl font-semibold text-primary">Consultants & Experts</h3>
                            <p className="mt-1 text-md text-tertiary">Credibility, clarity, and easy client onboarding</p>
                            <p className="mt-3 text-md text-secondary">
                                Help clients understand your expertise and take the next step confidently.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

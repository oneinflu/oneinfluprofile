"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const HomePain = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
    return (
        <section className="relative overflow-hidden  px-4">
            <div ref={ref} className="mx-auto  max-w-6xl px-4 py-16 md:py-24 bg-brand-solid rounded-3xl">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-10%" }}
                    style={{ y }}
                    className="rounded-3xl text-white"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 p-8 md:p-12">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="flex flex-col gap-4"
                        >
                            <span className="inline-flex size-11 md:size-12 items-center justify-center rounded-xl">≠</span>
                            <h2 className="text-display-sm md:text-display-md font-semibold leading-tight">Your bio link wasn’t built for business.</h2>
                            <p className="mt-3 text-md md:text-lg leading-relaxed text-white/85">Most link-in-bio tools are great for sharing links.
But the moment you start selling services, collaborating with brands, or charging money — they begin to fall apart.</p>
                        </motion.div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="flex flex-col gap-1.5"
                            >
                                <h3 className="text-md font-semibold">Every enquiry starts with questions</h3>
                                <p className="text-sm leading-relaxed text-white/85">When clients click your bio, they don’t see pricing, scope, or what to do next.</p>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="flex flex-col gap-1.5"
                            >
                                <h3 className="text-md font-semibold">You repeat the same explanations</h3>
                                <p className="text-sm leading-relaxed text-white/85">You end up answering the same questions repeatedly across DMs instead of selling.</p>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="flex flex-col gap-1.5"
                            >
                                <h3 className="text-md font-semibold">Conversations are scattered</h3>
                                <p className="text-sm leading-relaxed text-white/85">Enquiries, details, and follow-ups get scattered across Instagram and WhatsApp.</p>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="flex flex-col gap-1.5"
                            >
                                <h3 className="text-md font-semibold">Payments happen awkwardly</h3>
                                <p className="text-sm leading-relaxed text-white/85">Payments are sent manually with reminders, screenshots, and uncomfortable follow-ups.</p>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="flex flex-col gap-1.5"
                            >
                                <h3 className="text-md font-semibold">Clients don’t know what to do next</h3>
                                <p className="text-sm leading-relaxed text-white/85">Visitors open your bio but don’t know how to move forward or take action confidently.</p>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="flex flex-col gap-1.5"
                            >
                                <h3 className="text-md font-semibold">Links help people browse, not decide</h3>
                                <p className="text-sm leading-relaxed text-white/85">Traditional bio links help people browse, but they don’t help you convert clients.</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

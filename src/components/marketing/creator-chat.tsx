"use client";

import { motion } from "motion/react";
import { MessageSmileCircle } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";

const avatars = [
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128", alt: "Creator 1", x: "10%", y: "10%" },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&h=128", alt: "Creator 2", x: "85%", y: "15%" },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128", alt: "Creator 3", x: "15%", y: "80%" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128", alt: "Creator 4", x: "80%", y: "75%" },
    { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128", alt: "Creator 5", x: "50%", y: "5%" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128", alt: "Creator 6", x: "5%", y: "45%" },
    { src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=128&h=128", alt: "Creator 7", x: "95%", y: "50%" },
];

export const CreatorChat = () => {
    return (
        <section className="py-24  relative overflow-hidden">
            {/* Floating Avatars */}
            {avatars.map((avatar, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="absolute"
                    style={{ left: avatar.x, top: avatar.y }}
                >
                    <Avatar 
                        size="2xl" 
                        src={avatar.src} 
                        alt={avatar.alt} 
                        className="border-2 border-white/20 shadow-2xl" 
                    />
                </motion.div>
            ))}

            <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                >
                    Turn your presence into <br />
                    <span className="text-[#E9F4A8]">real opportunities</span>
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  Your INFLU profile isn’t just a bio link.
It’s where creators get discovered, brands evaluate trust,
and collaborations actually move forward — without DMs, forms, or chaos.
                </motion.p>

                {/* Chat Bubble Animation */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-start md:items-center gap-3 md:gap-4 bg-[#E9F4A8] text-black px-5 py-5 md:px-8 md:py-6 rounded-3xl md:rounded-full max-w-2xl shadow-[0_0_40px_rgba(233,244,168,0.2)] w-full md:w-auto"
                >
                    <div className="flex-shrink-0 bg-black/10 p-2 md:p-3 rounded-full mt-0.5 md:mt-0">
                        <MessageSmileCircle className="w-5 h-5 md:w-8 md:h-8" />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-sm md:text-lg mb-1 leading-tight md:leading-normal">This is INFLU — your public work identity.</p>
                        <TypewriterText text="One link to showcase services, shop links, events, collaborations,
and everything brands need to say yes faster." />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const TypewriterText = ({ text }: { text: string }) => {
    return (
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-black/80 text-sm md:text-base leading-relaxed"
        >
            <span className="inline-block">
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.05, delay: 0.8 + index * 0.03 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </span>
        </motion.p>
    );
};

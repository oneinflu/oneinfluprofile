"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SearchLg, CheckCircle, BarChart02, Users01, ShoppingBag01, Star01, Calendar, QrCode01, UploadCloud01, Clock } from "@untitledui/icons";

const features = [
    {
        title: "Your public creator profile that brands actually trust",
        description: `Your INFLU profile isn’t just a bio link. It’s a verified, structured page that shows who you are, what you do, and how to work with you — clearly.

What lives here:
• About you & niches
• Portfolio & past work
• Services & collaboration types
• Social proof & event history

One link you can share anywhere.`,
        color: "bg-cyan-100",
        textColor: "text-cyan-950",
        icon: SearchLg,
        visual: (
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden flex flex-col h-full max-h-[320px]">
                <div className="h-24 relative shrink-0">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-8 left-6">
                         <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-full h-full object-cover" />
                         </div>
                    </div>
                </div>
                <div className="pt-10 px-6 pb-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">Sarah Jenkins</h3>
                        <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-500 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Lifestyle & Travel Creator</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                         <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Travel</span>
                         <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Photography</span>
                         <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Fashion</span>
                    </div>

                    <div className="space-y-2 mt-auto">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs font-medium text-gray-700">Portfolio</span>
                            <span className="text-[10px] text-gray-400">12 items</span>
                        </div>
                         <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs font-medium text-gray-700">Services</span>
                            <span className="text-[10px] text-gray-400">3 active</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "All your product links. One place. No confusion.",
        description: `Promoting products? INFLU lets you attach multiple affiliate links for the same product — so every follower lands on the best option.

Supported links:
• Amazon
• Flipkart
• Meesho
• Brand D2C links

One product → many buying options → higher conversion.`,
        color: "bg-teal-700",
        textColor: "text-white",
        icon: ShoppingBag01,
        visual: (
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 flex flex-col gap-4">
                {/* Product Info */}
                <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                         <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" alt="Nike Shoe" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div>
                         <h3 className="font-bold text-gray-900 text-base leading-tight">Nike Air Max 270</h3>
                         <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                             <Star01 className="w-3.5 h-3.5 fill-current" />
                             <Star01 className="w-3.5 h-3.5 fill-current" />
                             <Star01 className="w-3.5 h-3.5 fill-current" />
                             <Star01 className="w-3.5 h-3.5 fill-current" />
                             <Star01 className="w-3.5 h-3.5 fill-current" />
                             <span className="text-gray-400 ml-1 text-[10px]">(128 reviews)</span>
                         </div>
                         <div className="font-bold text-lg mt-1 text-gray-900">$129.00</div>
                    </div>
                </div>
                
                {/* Links */}
                <div className="space-y-2">
                    {/* Amazon */}
                    <button className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white group">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded bg-[#FF9900] flex items-center justify-center text-white font-bold text-[10px]">A</div>
                            <span className="font-medium text-gray-900 text-sm group-hover:text-black">Buy on Amazon</span>
                        </div>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Fast delivery</span>
                    </button>
                    
                    {/* Flipkart */}
                     <button className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white group">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded bg-[#2874F0] flex items-center justify-center text-white font-bold text-[10px]">F</div>
                            <span className="font-medium text-gray-900 text-sm group-hover:text-black">Buy on Flipkart</span>
                        </div>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Best price</span>
                    </button>
                    
                     {/* Meesho */}
                     <button className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white group">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded bg-[#f43397] flex items-center justify-center text-white font-bold text-[10px]">M</div>
                            <span className="font-medium text-gray-900 text-sm group-hover:text-black">Buy on Meesho</span>
                        </div>
                    </button>
                </div>
            </div>
        )
    },
    {
        title: "Discover events. Apply or get invited — automatically.",
        description: `Creators don’t chase DMs here.

With INFLU:
• Events appear in your dashboard
• Hosts invite you directly
• You apply with one tap
• Your profile is already attached

No Google Forms. No WhatsApp forwards.`,
        color: "bg-indigo-500",
        textColor: "text-white",
        icon: Calendar,
        visual: (
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 flex flex-col h-full max-h-[360px]">
                {/* Filter Chips */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="bg-black text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap">For You</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full whitespace-nowrap border border-gray-200">Bengaluru</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full whitespace-nowrap border border-gray-200">Lifestyle</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full whitespace-nowrap border border-gray-200">This Week</span>
                </div>

                {/* Events Feed */}
                <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                    {/* Event 1 */}
                    <div className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors group cursor-pointer">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg shrink-0 flex items-center justify-center text-purple-600 font-bold text-xs flex-col leading-tight">
                            <span>MAR</span>
                            <span className="text-lg">12</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 text-sm">Summer Fashion Week</h4>
                                <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">PAID</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">Indiranagar, Bengaluru</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium group-hover:bg-indigo-600 group-hover:text-white transition-colors">Apply</span>
                                <div className="flex -space-x-1.5">
                                    <div className="w-4 h-4 rounded-full bg-gray-200 border border-white" />
                                    <div className="w-4 h-4 rounded-full bg-gray-300 border border-white" />
                                    <div className="w-4 h-4 rounded-full bg-gray-400 border border-white" />
                                </div>
                                <span className="text-[10px] text-gray-400">+12 going</span>
                            </div>
                        </div>
                    </div>

                    {/* Event 2 */}
                    <div className="flex gap-3 p-3 rounded-xl border border-indigo-200 bg-indigo-50 cursor-pointer">
                        <div className="w-12 h-12 bg-white rounded-lg shrink-0 flex items-center justify-center text-indigo-600 font-bold text-xs flex-col leading-tight border border-indigo-100">
                            <span>MAR</span>
                            <span className="text-lg">15</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 text-sm">Tech Launch Party</h4>
                                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">INVITED</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">Koramangala, Bengaluru</p>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="text-[10px] bg-black text-white px-3 py-1 rounded-full font-medium">Accept</button>
                                <button className="text-[10px] text-gray-500 font-medium">Decline</button>
                            </div>
                        </div>
                    </div>

                     {/* Event 3 */}
                     <div className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors group cursor-pointer opacity-60">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg shrink-0 flex items-center justify-center text-orange-600 font-bold text-xs flex-col leading-tight">
                            <span>MAR</span>
                            <span className="text-lg">22</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 text-sm">Food Carnival 2024</h4>
                                <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">BARTER</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">UB City, Bengaluru</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "From entry to content — everything gets recorded.",
        description: `When you’re approved:
• You receive a digital invite
• Scan QR at the venue
• Entry is verified
• After the event, submit your content

Your work, attendance, and delivery —
all linked to your profile automatically.`,
        color: "bg-purple-100",
        textColor: "text-purple-950",
        icon: QrCode01,
        visual: (
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 flex flex-col gap-4">
                {/* QR Screen */}
                <div className="bg-gray-900 rounded-xl p-4 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
                    <div className="text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-2">Entry Pass</div>
                    <div className="bg-white p-3 rounded-lg w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <QrCode01 className="w-16 h-16 text-gray-900" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-green-500/30">
                        <CheckCircle className="w-3 h-3" />
                        VERIFIED ENTRY
                    </div>
                </div>

                {/* Post Event Checklist */}
                <div>
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide mb-2">Deliverables</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-medium text-gray-900 text-xs">Reel submitted</span>
                            </div>
                            <span className="text-[10px] font-bold text-green-600">Done</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                             <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <Clock className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-medium text-gray-900 text-xs">Story pending</span>
                            </div>
                            <button className="text-[10px] bg-black text-white px-2.5 py-1 rounded-md font-medium flex items-center gap-1 hover:bg-gray-800 transition-colors">
                                <UploadCloud01 className="w-3 h-3" />
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

export const CreatorFeatures = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        ["#000000", "#1e1e2f", "#1e1e2f", "#000000"]
    );

    return (
        <motion.section 
            ref={containerRef}
            style={{ backgroundColor }}
            className="py-24 relative transition-colors duration-500"
        >
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-[#E9F4A8] uppercase mb-4">How It Works</h2>
                    <p className="text-2xl md:text-3xl text-white font-medium max-w-2xl mx-auto">
                        Your INFLU profile is where brands discover you, events invite you, and your work turns into paid outcomes.
                    </p>
                </div>

                <div className="flex flex-col gap-[10px] pb-24">
                  {features.map((feature, index) => (
                    <Card key={index} feature={feature} index={index} total={features.length} />
                  ))}
                </div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center pb-0"
                >
                    <button className="bg-[#E9F4A8] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#dbe69b] transition-colors mb-4">
                        Create your INFLU profile
                    </button>
                    <p className="text-gray-400 text-sm font-medium">
                        Free · Takes 2 minutes · No credit card
                    </p>
                </motion.div>
              </div>
            </motion.section>
          );
        };

        const Card = ({ feature, index, total }: { feature: typeof features[0], index: number, total: number }) => {
          return (
            <div 
              className="sticky top-20 md:top-32 h-[calc(100dvh-6rem)] md:h-[550px] w-full"
              style={{ 
                zIndex: index + 1,
              }}
            >
              <div className={`
                ${feature.color} 
                rounded-[1.5rem] md:rounded-[2.5rem] 
                p-5 md:p-12
                grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start md:items-center 
                shadow-2xl
                transition-transform duration-500 ease-out
                border border-white/10
                h-full w-full
                overflow-hidden
            `}>
                <div className="flex flex-col justify-start md:justify-center h-auto md:h-full pt-2 md:pt-0 shrink-0">
                    <h3 className={`text-xl md:text-4xl font-bold ${feature.textColor} tracking-tight mb-3 md:mb-6`}>
                        {feature.title}
                    </h3>
                    <p className={`text-sm md:text-xl ${feature.textColor} opacity-90 leading-relaxed whitespace-pre-line`}>
                        {feature.description}
                    </p>
                </div>
                <div className="flex justify-center md:justify-end items-end md:items-center h-full pb-4 md:pb-0 overflow-hidden">
                    <div className="w-full max-h-full flex flex-col justify-end">
                        {feature.visual}
                    </div>
                </div>
            </div>
        </div>
    );
};

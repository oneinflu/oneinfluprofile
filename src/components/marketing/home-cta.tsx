 "use client";

 import { motion, useScroll, useTransform } from "motion/react";
 import { useRef } from "react";
 import { Button } from "@/components/base/buttons/button";
 
 export const NewsletterIPhoneMockup01 = () => {
     const ref = useRef<HTMLDivElement>(null);
     const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
     const yImage = useTransform(scrollYProgress, [0, 1], [0, -40]);
     const yContent = useTransform(scrollYProgress, [0, 1], [20, -20]);
 
     return (
         <section className="overflow-hidden px-4 pt-16 md:py-24">
             <div ref={ref} className="mx-auto  w-full max-w-6xl bg-brand-solid rounded-3xl">
                 <div className="relative grid grid-cols-1 items-center gap-10 rounded-3xl p-8 text-white md:grid-cols-2 md:p-12">
                     <motion.div
                         initial={{ y: 20, opacity: 0 }}
                         whileInView={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                         viewport={{ once: true, margin: "-10%" }}
                         style={{ y: yContent }}
                         className="z-10 flex flex-col items-start"
                     >
                         <h2 className="text-display-sm md:text-display-md lg:text-display-lg font-semibold">Turn your bio link into a business.</h2>
                         <p className="mt-4 text-md md:text-lg text-white/85">Stop sending people everywhere.
 Give your clients one clear place to understand your work, contact you instantly, and pay without friction.</p>
                         <motion.div
                             initial={{ y: 20, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                             viewport={{ once: true, margin: "-10%" }}
                             className="mt-8 md:mt-10"
                         >
                             <Button href="/register" size="xl" className="rounded-full !bg-black !text-white hover:!bg-[#0A0D12] !ring-transparent">
                                 Create your free INFLU link
                             </Button>
                             <p className="mt-3 text-sm text-white/85">
                                 Takes less than 2 minutes · No credit card required · Free forever
                             </p>
                         </motion.div>
                     </motion.div>
 
                     <motion.div
                         initial={{ y: 20, opacity: 0 }}
                         whileInView={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                         viewport={{ once: true, margin: "-10%" }}
                         style={{ y: yImage }}
                         className="relative hidden md:flex items-end justify-center md:min-h-100 md:w-full md:-mb-12"
                     >
                         <img
                             src="/mockup.png"
                             alt=""
                             className="z-10 w-full max-w-71 rounded-2xl md:max-w-78.5 md:drop-shadow-iphone-mockup"
                         />

                         
                     </motion.div>
                 </div>
             </div>
         </section>
     );
 };

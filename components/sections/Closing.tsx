"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import GoldDivider from "@/components/ui/GoldDivider";
import { JasminePetalShower } from "@/components/ui/JasminePetal";

/**
 * Closing — Final Blessing
 *
 * Cultural symbolism:
 * - Mandarin blessing line (百年好合, 永結同心): The highest tier
 *   of Chinese wedding blessings — sung at the close of ceremonies.
 * - Indonesian closing (Bahagia Selalu): Simple, timeless Javanese farewell
 *   that carries the weight of sincere well-wishing.
 * - Falling jasmine petals (melati): At the close of a Keraton royal wedding,
 *   melati petals are scattered over the departing guests as a final blessing —
 *   symbolizing purity, love, and the fragrance of a life well-lived.
 * - The couple's names in Pinyon Script: The script's gentle curves echo
 *   Chinese brush calligraphy meets Javanese serat manuscript handwriting.
 */

export default function Closing() {
    const sectionRef = useRef<HTMLElement>(null);
    const namesRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                namesRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: namesRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0D0B09" }}
        >
            {/* Jasmine petal shower — falls continuously over this section */}
            <JasminePetalShower count={20} duration={9} />

            {/* Background ambient warmth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(80,50,5,0.08) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 text-center space-y-14 max-w-2xl mx-auto px-6">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                >
                    <p
                        className="font-sans text-[#C6A75E]/30 uppercase"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                    >
                        With Love & Gratitude
                    </p>
                </motion.div>

                {/* Mandarin final blessing */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="space-y-5"
                >
                    <p
                        className="font-noto text-[#C6A75E] select-none"
                        style={{
                            fontSize: "clamp(1.8rem,5vw,3rem)",
                            letterSpacing: "0.3em",
                            fontWeight: 300,
                            textShadow: "0 0 60px rgba(198,167,94,0.15)",
                        }}
                    >
                        百年好合
                    </p>
                    <p
                        className="font-noto text-[#C6A75E]/60 select-none"
                        style={{ fontSize: "clamp(1rem,3vw,1.5rem)", letterSpacing: "0.25em" }}
                    >
                        永結同心
                    </p>
                </motion.div>

                <GoldDivider width="w-48" />

                {/* Indonesian poetic closing */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="space-y-4"
                >
                    <p
                        className="font-serif italic text-[#F5EDD8]/55"
                        style={{ fontSize: "clamp(1rem,2.2vw,1.25rem)", letterSpacing: "0.04em", lineHeight: 1.9 }}
                    >
                        &ldquo;Terima kasih telah hadir dalam perjalanan cinta kami.<br />
                        Doa dan restu kalian adalah kado terindah.&rdquo;
                    </p>
                    <p
                        className="font-sans text-[#C6A75E]/30 uppercase"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}
                    >
                        Bahagia Selalu · Be Always Blessed
                    </p>
                </motion.div>

                <GoldDivider width="w-32" />

                {/* Couple names in script */}
                <motion.h2
                    ref={namesRef}
                    className="font-script text-[#C6A75E]"
                    style={{
                        fontSize: "clamp(2.5rem,8vw,5rem)",
                        opacity: 0,
                        filter: "drop-shadow(0 0 30px rgba(198,167,94,0.15))",
                    }}
                >
                    Alexander &amp; Clarissa
                </motion.h2>

                {/* Wedding date */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="font-sans text-[#C6A75E]/25 uppercase"
                    style={{ fontSize: "0.58rem", letterSpacing: "0.4em" }}
                >
                    20 · VI · MMXXVI
                </motion.p>

                {/* Scroll to top */}
                <motion.button
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="mt-8 w-12 h-12 rounded-full border border-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E]/40 hover:border-[#C6A75E]/50 hover:text-[#C6A75E]/70 transition-all duration-600 group mx-auto"
                    aria-label="Return to top"
                >
                    <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                </motion.button>
            </div>

            {/* Bottom signature */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p
                    className="font-sans text-[#F5EDD8]/15 uppercase"
                    style={{ fontSize: "0.5rem", letterSpacing: "0.35em" }}
                >
                    © 2026 Royal Heritage Wedding · All Rights Reserved
                </p>
            </div>
        </section>
    );
}

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/ui/GoldDivider";

/**
 * CoupleReveal — The Name Statement
 *
 * Cultural symbolism:
 * - Massive high-contrast Cinzel serif: mimic imperial edict calligraphy.
 * - Gold foil shimmer across names: simulates gold-leaf script on silk banners
 *   hung at Chinese and Javanese royal celebrations.
 * - 百年好合 (Bǎi Nián Hǎo Hé): "May your union last a hundred years together"
 *   — the highest Chinese blessing for newlyweds.
 * - Javanese: "Rahayu, Sakinah, Mawaddah, Warahmah" — the complete Islamic
 *   Javanese blessing for peace, sacred love, and divine mercy.
 */

gsap.registerPlugin(ScrollTrigger);

interface CoupleRevealProps {
    triggerAnimation?: boolean;
}

export default function CoupleReveal({ triggerAnimation = false }: CoupleRevealProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const groomRef = useRef<HTMLHeadingElement>(null);
    const brideRef = useRef<HTMLHeadingElement>(null);
    const andRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);

    // Trigger GSAP when gate is opened
    useEffect(() => {
        if (!triggerAnimation) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            // Subtitle fades first
            tl.fromTo(subtitleRef.current,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }
            );

            // Names fly in from sides simultaneously
            tl.fromTo(groomRef.current,
                { opacity: 0, x: -60 },
                { opacity: 1, x: 0, duration: 1.6, ease: "power3.out" },
                "-=0.4"
            ).fromTo(brideRef.current,
                { opacity: 0, x: 60 },
                { opacity: 1, x: 0, duration: 1.6, ease: "power3.out" },
                "<" // same start time as groom
            ).fromTo(andRef.current,
                { opacity: 0, scale: 0.85 },
                { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
                "-=1.2"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [triggerAnimation]);

    const controls = triggerAnimation ? "visible" : "hidden";

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-silk-cream"
            style={{ backgroundColor: "#F5EDD8" }}
        >
            {/* ── Background layers ─────────────────────────────── */}
            {/* Aged paper texture overlay — creates physical document feel */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/paper-texture.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "300px",
                    mixBlendMode: "multiply",
                    opacity: 0.3,
                }}
            />
            {/* Subtle right-side warm glow (directional light simulation) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(198,167,94,0.06) 0%, transparent 70%)",
                }}
            />

            {/* ── Giant 囍 watermark ─────────────────────────────── */}
            {/* Double Happiness: appears at 1.5% opacity — cultural texture not decoration */}
            <div
                className="absolute select-none pointer-events-none"
                style={{
                    fontFamily: "serif",
                    fontSize: "clamp(10rem,28vw,20rem)",
                    color: "#7A0C0C",
                    opacity: 0.015,
                    lineHeight: 1,
                    userSelect: "none",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                }}
            >
                囍
            </div>

            {/* ── Main Content ──────────────────────────────────── */}
            <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-24 space-y-10">

                {/* Subtitle — above names */}
                <div ref={subtitleRef} style={{ opacity: 0 }}>
                    <p
                        className="font-sans text-[#7A0C0C]/60 uppercase"
                        style={{ fontSize: "0.62rem", letterSpacing: "0.4em" }}
                    >
                        The Wedding Celebration of
                    </p>
                </div>

                {/* ── Names block ─────────────────────────────────── */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 lg:gap-16">
                    {/* Groom */}
                    <h2
                        ref={groomRef}
                        className="gold-foil-hover font-serif font-semibold"
                        style={{
                            fontSize: "clamp(3.5rem,9vw,8rem)",
                            lineHeight: 0.95,
                            letterSpacing: "-0.01em",
                            opacity: 0, // GSAP will animate in
                            // Color fallback before JS (SSR)
                            color: "#7A0C0C",
                        }}
                    >
                        Alexander
                    </h2>

                    {/* & connector — Pinyon Script */}
                    <span
                        ref={andRef}
                        className="font-script text-[#A8893A] select-none"
                        style={{
                            fontSize: "clamp(4rem,10vw,7rem)",
                            opacity: 0,
                            lineHeight: 1,
                            filter: "drop-shadow(0 2px 8px rgba(168,137,58,0.2))",
                        }}
                    >
                        &
                    </span>

                    {/* Bride */}
                    <h2
                        ref={brideRef}
                        className="gold-foil-hover font-serif font-semibold"
                        style={{
                            fontSize: "clamp(3.5rem,9vw,8rem)",
                            lineHeight: 0.95,
                            letterSpacing: "-0.01em",
                            opacity: 0,
                            color: "#7A0C0C",
                        }}
                    >
                        Clarissa
                    </h2>
                </div>

                {/* ── Gold divider ─────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, scaleX: 0.3 },
                        visible: { opacity: 1, scaleX: 1, transition: { duration: 1.2, delay: 1.8 } },
                    }}
                >
                    <GoldDivider width="w-48" />
                </motion.div>

                {/* ── Mandarin blessing ─────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 2.1 } },
                    }}
                    className="space-y-5"
                >
                    {/* Mandarin */}
                    <p
                        className="font-noto text-[#7A0C0C]/50 select-none"
                        style={{ fontSize: "1.6rem", letterSpacing: "0.35em" }}
                    >
                        百年好合 · 永結同心
                    </p>

                    {/* Indonesian poetic translation */}
                    <p
                        className="font-serif italic text-[#1A1510]/55"
                        style={{ fontSize: "clamp(0.8rem,1.6vw,1rem)", letterSpacing: "0.06em", maxWidth: 480, margin: "0 auto" }}
                    >
                        &ldquo;Semoga persatuan ini kekal abadi, dua hati yang menjadi satu selamanya.&rdquo;
                    </p>

                    {/* Date line */}
                    <p
                        className="font-sans text-[#7A0C0C]/40 uppercase"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.35em", marginTop: "2rem" }}
                    >
                        Saturday · 20 June 2026
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion, Variants } from "framer-motion";
import GoldDivider from "@/components/ui/GoldDivider";

/**
 * HeritagePhilosophy — The Heritage Story
 *
 * Cultural symbolism:
 * LEFT (Chinese — Deep Vermillion):
 * - 囍 (Double Happiness) watermark at 3%: omnipresent auspicious symbol
 * - 百年好合 (Bǎi Nián Hǎo Hé): 100-year harmonious union blessing
 * - Red silk background: Imperial red (朱砂红, zhūshā hóng) — color of
 *   wealth, fortune, and protection from evil in Chinese tradition.
 *
 * RIGHT (Javanese — Near-Black Warm):
 * - Gunungan (Kayon) watermark: the cosmic mountain / tree of life in
 *   Wayang shadow puppet theater. Marks scene transitions, symbolizes
 *   the boundary between worlds. Here: transition from single to married life.
 * - Rahayu, Sakinah, Mawaddah, Warahmah: Javanese-Islamic complete blessing —
 *   peace, tranquility, love, and divine mercy.
 */

const scrollVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" as const } },
};

export default function HeritagePhilosophy() {
    return (
        <section className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">

            {/* ══════════════════════════════════════════════════
          LEFT PANEL — Chinese Heritage (Imperial Red silk)
         ══════════════════════════════════════════════════ */}
            <div
                className="relative flex items-center justify-center overflow-hidden min-h-[60vh] md:min-h-screen"
                style={{ backgroundColor: "#5C0808" }}
            >
                {/* Silk texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/silk-noise.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "180px",
                        mixBlendMode: "overlay",
                        opacity: 0.12,
                    }}
                />
                {/* Directional light from top-left (silk sheen) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 70% 60% at 20% 20%, rgba(200,100,100,0.12) 0%, transparent 60%)",
                    }}
                />

                {/* 囍 Double Happiness giant watermark — barely visible (3%) */}
                <div
                    className="absolute select-none pointer-events-none overflow-hidden"
                    style={{
                        right: "-5%",
                        bottom: "-5%",
                        fontFamily: "serif",
                        fontSize: "clamp(18rem,45vw,35rem)",
                        color: "#E8C97A",
                        opacity: 0.03,
                        lineHeight: 1,
                    }}
                >
                    囍
                </div>

                {/* Content */}
                <div
                    className="relative z-10 px-12 md:px-20 py-20 max-w-lg w-full"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.35 }}
                        variants={scrollVariants}
                        className="space-y-8"
                    >
                        {/* Section label */}
                        <p
                            className="font-sans text-[#E8C97A]/50 uppercase"
                            style={{ fontSize: "0.58rem", letterSpacing: "0.4em" }}
                        >
                            Chinese Heritage · 中华传统
                        </p>

                        {/* Mandarin title */}
                        <h3
                            className="font-noto text-[#E8C97A]"
                            style={{
                                fontSize: "clamp(2rem,5vw,3rem)",
                                letterSpacing: "0.15em",
                                fontWeight: 400,
                                textShadow: "1px 1px 0 rgba(100,50,5,0.4), 0 0 40px rgba(232,201,122,0.1)",
                            }}
                        >
                            百年好合
                        </h3>

                        <GoldDivider width="w-40" className="justify-start ml-0" />

                        {/* Romanization */}
                        <p
                            className="font-serif italic text-[#F5EDD8]/70"
                            style={{ fontSize: "clamp(0.95rem,2vw,1.15rem)", letterSpacing: "0.05em" }}
                        >
                            "Bǎi Nián Hǎo Hé"
                        </p>

                        {/* English meaning */}
                        <p
                            className="font-sans text-[#F5EDD8]/55 font-light leading-relaxed"
                            style={{ fontSize: "clamp(0.8rem,1.5vw,0.95rem)", letterSpacing: "0.04em" }}
                        >
                            May their union last a hundred years together. A timeless wish
                            for eternal love, harmony, and shared fortune between two families
                            joined as one under Heaven's blessing.
                        </p>

                        {/* Dragon-Phoenix symbolism note */}
                        <p
                            className="font-sans text-[#E8C97A]/30 uppercase"
                            style={{ fontSize: "0.58rem", letterSpacing: "0.3em", marginTop: "2.5rem" }}
                        >
                            龙凤呈祥 · Dragon & Phoenix Unite
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Center gold dividing line (double rule) */}
            <div
                className="hidden md:block absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ left: "50%", width: 3 }}
            >
                <div className="h-full w-full bg-gradient-to-b from-transparent via-[#C6A75E]/30 to-transparent" />
            </div>

            {/* ══════════════════════════════════════════════════
          RIGHT PANEL — Javanese Heritage (Warm near-black)
         ══════════════════════════════════════════════════ */}
            <div
                className="relative flex items-center justify-center overflow-hidden min-h-[60vh] md:min-h-screen"
                style={{ backgroundColor: "#1A1410" }}
            >
                {/* Paper texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/silk-noise.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "200px",
                        mixBlendMode: "overlay",
                        opacity: 0.08,
                    }}
                />
                {/* Directional light from top-right */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 60% 50% at 80% 15%, rgba(198,167,94,0.06) 0%, transparent 60%)",
                    }}
                />

                {/* Gunungan / Kayon (cosmic mountain) SVG watermark at 3% */}
                {/* Simplified gunungan silhouette: triangular mountain with leaf motif */}
                <div
                    className="absolute select-none pointer-events-none overflow-hidden"
                    style={{ left: "-5%", top: "-5%", opacity: 0.03 }}
                >
                    <svg viewBox="0 0 300 500" width={300} height={500} fill="#C6A75E">
                        {/* Triangular mountain body */}
                        <polygon points="150,20 280,480 20,480" />
                        {/* Inner detail — simple leaf veins */}
                        <line x1="150" y1="20" x2="150" y2="480" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                        <line x1="150" y1="150" x2="100" y2="300" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                        <line x1="150" y1="150" x2="200" y2="300" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 px-12 md:px-20 py-20 max-w-lg w-full text-right md:text-right">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.35 }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 0.15 } },
                        }}
                        className="space-y-8"
                    >
                        {/* Section label */}
                        <p
                            className="font-sans text-[#C6A75E]/40 uppercase"
                            style={{ fontSize: "0.58rem", letterSpacing: "0.4em" }}
                        >
                            Javanese Heritage · Warisan Keraton
                        </p>

                        {/* Javanese title */}
                        <h3
                            className="font-serif text-[#C6A75E]"
                            style={{
                                fontSize: "clamp(1.6rem,4vw,2.5rem)",
                                letterSpacing: "0.12em",
                                fontWeight: 400,
                                textShadow: "1px 1px 0 rgba(90,60,10,0.3), 0 0 40px rgba(198,167,94,0.08)",
                            }}
                        >
                            Rahayu, Sakinah<br />
                            <span style={{ fontSize: "0.8em", opacity: 0.8 }}>Mawaddah, Warahmah</span>
                        </h3>

                        <div className="flex justify-end">
                            <GoldDivider width="w-40" />
                        </div>

                        {/* Indonesian verse */}
                        <p
                            className="font-serif italic text-[#F5EDD8]/70"
                            style={{ fontSize: "clamp(0.95rem,2vw,1.1rem)", letterSpacing: "0.04em" }}
                        >
                            "Jiwa yang damai, cinta yang suci,<br />
                            berkah yang melimpah selamanya."
                        </p>

                        {/* English meaning */}
                        <p
                            className="font-sans text-[#F5EDD8]/45 font-light leading-relaxed"
                            style={{ fontSize: "clamp(0.8rem,1.5vw,0.9rem)", letterSpacing: "0.04em" }}
                        >
                            Peace, tranquility, overwhelming love, and divine mercy.
                            The complete Javanese-Islamic blessing for a sacred marriage
                            grounded in faith and royal tradition from the Keraton.
                        </p>

                        {/* Wayang symbolism note */}
                        <p
                            className="font-sans text-[#C6A75E]/25 uppercase"
                            style={{ fontSize: "0.58rem", letterSpacing: "0.3em", marginTop: "2.5rem" }}
                        >
                            Gunungan Kayon · The Tree of Life
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

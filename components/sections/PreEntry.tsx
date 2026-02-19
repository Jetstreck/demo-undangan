"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldCornerOrnament from "@/components/ui/GoldCornerOrnament";

/**
 * PreEntry — Invitation Seal
 *
 * Cultural symbolism:
 * - Chinese imperial red seal (印章 yìnzhāng): official stamp that authenticates
 *   royal decrees. The slow press animation simulates a wax seal being applied.
 * - 囍 (Double Happiness / Shuāngxǐ): most auspicious Chinese wedding symbol,
 *   formed from two 喜 characters — double happiness for bride and groom.
 * - Gold particles: in Chinese imperial tradition, gold dust signified divine blessing.
 * - Concentric rings: Javanese mandala energy, radiating sacred space outward.
 */

interface PreEntryProps {
    onEnter: () => void;
}

// Gold particles that burst outward from center
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360;
    const dist = 60 + (i % 4) * 25;
    const rad = (angle * Math.PI) / 180;
    return {
        id: i,
        px: `${Math.cos(rad) * dist}px`,
        py: `${Math.sin(rad) * dist}px`,
        delay: i * 0.06,
        size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2.5 : 1.5,
    };
});

export default function PreEntry({ onEnter }: PreEntryProps) {
    const [phase, setPhase] = useState<"seal" | "text" | "exiting">("seal");
    const [showParticles, setShowParticles] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        // Phase 1: Ink-stamp press (seal appears)
        const t1 = setTimeout(() => setPhase("text"), 1800);
        // Phase 2: Gold particles burst
        const t2 = setTimeout(() => setShowParticles(true), 400);
        // Particles visible briefly
        const t3 = setTimeout(() => setShowParticles(false), 2200);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    const handleEnter = () => {
        if (isExiting) return;
        setIsExiting(true);

        // Trigger audio on user interaction
        if (typeof window !== "undefined") {
            const w = window as unknown as Record<string, unknown>;
            if (typeof w.startAudio === "function") {
                (w.startAudio as () => void)();
            }
        }

        setTimeout(() => onEnter(), 1600);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.section
                    id="pre-entry"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.6, ease: "easeInOut" } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#0D0B09" }}
                >
                    {/* ── Background layers ─────────────────────────────── */}
                    {/* Very subtle batik overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "url('/images/batik-pattern.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "160px",
                            opacity: 0.025,
                            color: "#C6A75E",
                        }}
                    />
                    {/* Ambient red warmth glow at center (imperial atmosphere) */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(90,8,8,0.18) 0%, transparent 70%)",
                        }}
                    />
                    {/* Edge vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)",
                        }}
                    />

                    {/* ── 囍 Watermark ───────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 3, ease: "easeOut", delay: 0.5 } }}
                        className="absolute select-none pointer-events-none"
                        style={{ fontSize: "clamp(8rem,22vw,16rem)", color: "#C6A75E", opacity: 0.012, fontFamily: "serif", lineHeight: 1, zIndex: 0 }}
                    >
                        囍
                    </motion.div>

                    {/* ── Concentric ring 1 (slower) ─────────────────────── */}
                    <div
                        className="absolute rounded-full border border-[#C6A75E]/20 pointer-events-none"
                        style={{ width: 320, height: 320, animation: "ringExpand 6s ease-out 0.8s infinite" }}
                    />
                    {/* ── Concentric ring 2 (faster) ─────────────────────── */}
                    <div
                        className="absolute rounded-full border border-[#C6A75E]/15 pointer-events-none"
                        style={{ width: 320, height: 320, animation: "ringExpand 6s ease-out 2.8s infinite" }}
                    />

                    {/* ── Gold Particles ────────────────────────────────── */}
                    <AnimatePresence>
                        {showParticles && PARTICLES.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    background: "radial-gradient(circle, #E8C97A, #A8893A)",
                                    // CSS custom props for particleBurst keyframe
                                    ["--px" as string]: p.px,
                                    ["--py" as string]: p.py,
                                    animation: `particleBurst 1.8s ease-out ${p.delay}s forwards`,
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* ── Central Seal ──────────────────────────────────── */}
                    <div className="relative z-10 flex flex-col items-center gap-10 text-center px-6">
                        <motion.div
                            initial={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1.0, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex items-center justify-center"
                        >
                            {/* Outer ornamental circle */}
                            <div
                                className="relative flex items-center justify-center"
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                            >
                                {/* Outer ring border */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        border: "1px solid rgba(198,167,94,0.35)",
                                        boxShadow: "0 0 30px rgba(198,167,94,0.08), inset 0 0 30px rgba(198,167,94,0.04)",
                                    }}
                                />
                                {/* Inner ring border */}
                                <div
                                    className="absolute rounded-full"
                                    style={{
                                        inset: 12,
                                        border: "1px solid rgba(198,167,94,0.2)",
                                    }}
                                />
                                {/* Gold corner ornaments at "cardinal" positions */}
                                <GoldCornerOrnament position="tl" size={44} opacity={0.5} />
                                <GoldCornerOrnament position="tr" size={44} opacity={0.5} />
                                <GoldCornerOrnament position="bl" size={44} opacity={0.5} />
                                <GoldCornerOrnament position="br" size={44} opacity={0.5} />

                                {/* Monogram */}
                                <div className="relative z-10 text-center">
                                    <div className="gold-foil-text font-serif text-5xl md:text-6xl font-bold tracking-widest select-none">
                                        R
                                        <span className="font-script text-3xl mx-1 opacity-80" style={{ verticalAlign: "middle" }}>&</span>
                                        A
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Invocation text ──────────────────────────────── */}
                        <AnimatePresence>
                            {phase === "text" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="space-y-4"
                                >
                                    {/* Thin top rule */}
                                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C6A75E]/50 to-transparent mx-auto mb-6" />

                                    <p
                                        className="font-sans text-[#C6A75E]/50 uppercase"
                                        style={{ fontSize: "0.6rem", letterSpacing: "0.4em" }}
                                    >
                                        By the Grace of God
                                    </p>
                                    <h1
                                        className="font-serif text-[#F5EDD8]"
                                        style={{
                                            fontSize: "clamp(1rem,2.5vw,1.3rem)",
                                            letterSpacing: "0.2em",
                                            fontWeight: 400,
                                            textShadow: "0 0 40px rgba(245,237,216,0.1)",
                                        }}
                                    >
                                        We Invite You
                                    </h1>

                                    {/* Divider */}
                                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent mx-auto my-6" />

                                    {/* Enter CTA */}
                                    <motion.button
                                        onClick={handleEnter}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="btn-royal mt-4"
                                        aria-label="Enter the celebration"
                                    >
                                        Enter the Celebration
                                    </motion.button>

                                    <p
                                        className="font-noto text-[#C6A75E]/30 mt-4 select-none"
                                        style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }}
                                    >
                                        百年好合
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

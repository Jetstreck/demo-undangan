"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldCornerOrnament from "@/components/ui/GoldCornerOrnament";

interface PreEntryProps {
    onEnter: () => void;
}

// More particles, distributed elegantly
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360;
    const dist = 55 + (i % 5) * 22;
    const rad = (angle * Math.PI) / 180;
    return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        delay: i * 0.04,
        size: i % 4 === 0 ? 5 : i % 4 === 1 ? 3 : i % 4 === 2 ? 2 : 1.5,
        duration: 1.4 + (i % 3) * 0.3,
    };
});

// Smooth custom easing curves
const EASE_IMPERIAL = [0.16, 1, 0.3, 1] as const;
const EASE_SILK = [0.43, 0.13, 0.23, 0.96] as const;

export default function PreEntry({ onEnter }: PreEntryProps) {
    const [phase, setPhase] = useState<"seal" | "text" | "exiting">("seal");
    const [showParticles, setShowParticles] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        const t1 = setTimeout(() => setShowParticles(true), 600);
        const t2 = setTimeout(() => setShowParticles(false), 2600);
        const t3 = setTimeout(() => setPhase("text"), 2000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    const handleEnter = () => {
        if (isExiting) return;
        setIsExiting(true);

        if (typeof window !== "undefined") {
            const w = window as unknown as Record<string, unknown>;
            if (typeof w.startAudio === "function") {
                (w.startAudio as () => void)();
            }
        }

        setTimeout(() => onEnter(), 1800);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.section
                    id="pre-entry"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1.2, ease: EASE_SILK } }}
                    exit={{
                        opacity: 0,
                        scale: 1.04,
                        filter: "blur(12px)",
                        transition: { duration: 1.8, ease: EASE_IMPERIAL },
                    }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#0D0B09" }}
                >
                    {/* ── Background: batik texture ─────────────────────── */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03, transition: { duration: 3, ease: "easeOut" } }}
                        style={{
                            backgroundImage: "url('/images/batik-pattern.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "160px",
                            color: "#C6A75E",
                        }}
                    />

                    {/* ── Ambient warmth glow ────────────────────────────── */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 2.5, ease: "easeOut", delay: 0.3 } }}
                        style={{
                            background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(90,8,8,0.22) 0%, transparent 70%)",
                        }}
                    />

                    {/* ── Edge vignette ─────────────────────────────────── */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
                        }}
                    />

                    {/* ── 囍 Watermark — slow breathe, behind everything ── */}
                    {/* Wrapper: hanya urus posisi center, TIDAK dianimasikan */}
                    <div
                        className="absolute select-none pointer-events-none"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 2,
                        }}
                    >
                        {/* motion.div: hanya urus opacity + scale, tanpa transform posisi */}
                        <motion.div
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{
                                opacity: [0, 0.18, 0.22, 0.18],
                                scale: [1.08, 1.02, 1.0, 1.02],
                                transition: {
                                    duration: 8,
                                    ease: "easeInOut",
                                    delay: 0.4,
                                    times: [0, 0.3, 0.6, 1],
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                },
                            }}
                            style={{
                                fontSize: "clamp(8rem,22vw,16rem)",
                                color: "#C6A75E",
                                fontFamily: "serif",
                                lineHeight: 1,
                                textShadow: "0 0 80px rgba(198,167,94,0.15)",
                                display: "block",
                            }}
                        >
                            囍
                        </motion.div>
                    </div>

                    {/* ── Concentric ring 1 ─────────────────────────────── */}
                    <motion.div
                        className="absolute rounded-full pointer-events-none"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 1.8, ease: EASE_IMPERIAL, delay: 0.5 } }}
                        style={{
                            width: 300, height: 300,
                            border: "1px solid rgba(198,167,94,0.18)",
                            animation: "ringExpand 7s ease-out 1s infinite",
                        }}
                    />
                    {/* ── Concentric ring 2 ─────────────────────────────── */}
                    <motion.div
                        className="absolute rounded-full pointer-events-none"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 1.8, ease: EASE_IMPERIAL, delay: 0.9 } }}
                        style={{
                            width: 300, height: 300,
                            border: "1px solid rgba(198,167,94,0.1)",
                            animation: "ringExpand 7s ease-out 3.5s infinite",
                        }}
                    />

                    {/* ── Gold Particles (Framer Motion native) ─────────── */}
                    <AnimatePresence>
                        {showParticles && PARTICLES.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full pointer-events-none"
                                initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                                animate={{
                                    x: p.x,
                                    y: p.y,
                                    opacity: 0,
                                    scale: 0.2,
                                    transition: {
                                        duration: p.duration,
                                        delay: p.delay,
                                        ease: [0.2, 0.8, 0.4, 1],
                                    },
                                }}
                                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    background: "radial-gradient(circle, #F0D98C, #C6A75E, #8A6E30)",
                                    boxShadow: "0 0 4px rgba(198,167,94,0.6)",
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* ── Central Seal ──────────────────────────────────── */}
                    <div
                        className="relative flex flex-col items-center gap-10 text-center px-6"
                        style={{ zIndex: 30, position: "relative" }}
                    >
                        {/* Seal circle + Monogram */}
                        <motion.div
                            initial={{ scale: 1.25, opacity: 0, filter: "blur(16px)" }}
                            animate={{ scale: 1.0, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 2.0, ease: EASE_IMPERIAL, delay: 0.2 }}
                            className="relative flex items-center justify-center"
                        >
                            <div
                                className="relative flex items-center justify-center"
                                style={{ width: 210, height: 210 }}
                            >
                                {/* Outer ring — fades in slowly */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 2.5, delay: 0.8 } }}
                                    style={{
                                        border: "1px solid rgba(198,167,94,0.4)",
                                        boxShadow: "0 0 40px rgba(198,167,94,0.1), inset 0 0 40px rgba(198,167,94,0.05)",
                                    }}
                                />
                                {/* Inner ring */}
                                <motion.div
                                    className="absolute rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 2.5, delay: 1.1 } }}
                                    style={{
                                        inset: 14,
                                        border: "1px solid rgba(198,167,94,0.22)",
                                    }}
                                />

                                {/* Corner ornaments stagger in */}
                                {(["tl", "tr", "bl", "br"] as const).map((pos, i) => (
                                    <motion.div
                                        key={pos}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{
                                            opacity: 1, scale: 1,
                                            transition: { duration: 0.8, delay: 1.0 + i * 0.12, ease: EASE_SILK },
                                        }}
                                    >
                                        <GoldCornerOrnament position={pos} size={44} opacity={0.55} />
                                    </motion.div>
                                ))}

                                {/* Monogram R & A */}
                                <motion.div
                                    className="relative z-10 text-center"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 1.4, delay: 0.6, ease: EASE_SILK } }}
                                >
                                    <div className="gold-foil-text font-serif text-5xl md:text-6xl font-bold tracking-widest select-none">
                                        R
                                        <span className="font-script text-3xl mx-1 opacity-80" style={{ verticalAlign: "middle" }}>&</span>
                                        A
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* ── Invocation text (phase: text) ─────────────── */}
                        <AnimatePresence>
                            {phase === "text" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4"
                                >
                                    {/* Divider line */}
                                    <motion.div
                                        className="w-16 h-px mx-auto mb-6"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{ duration: 1.0, ease: EASE_IMPERIAL, delay: 0.1 }}
                                        style={{ background: "linear-gradient(to right, transparent, rgba(198,167,94,0.6), transparent)" }}
                                    />

                                    <motion.p
                                        className="font-sans text-[#C6A75E]/50 uppercase"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.9, ease: EASE_SILK, delay: 0.25 }}
                                        style={{ fontSize: "0.6rem", letterSpacing: "0.4em" }}
                                    >
                                        By the Grace of God
                                    </motion.p>

                                    <motion.h1
                                        className="font-serif text-[#F5EDD8]"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.9, ease: EASE_SILK, delay: 0.4 }}
                                        style={{
                                            fontSize: "clamp(1rem,2.5vw,1.3rem)",
                                            letterSpacing: "0.22em",
                                            fontWeight: 400,
                                            textShadow: "0 0 40px rgba(245,237,216,0.15)",
                                        }}
                                    >
                                        We Invite You
                                    </motion.h1>

                                    {/* Second divider */}
                                    <motion.div
                                        className="w-24 h-px mx-auto my-6"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{ duration: 1.0, ease: EASE_IMPERIAL, delay: 0.55 }}
                                        style={{ background: "linear-gradient(to right, transparent, rgba(198,167,94,0.3), transparent)" }}
                                    />

                                    {/* CTA Button */}
                                    <motion.button
                                        onClick={handleEnter}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.0, ease: EASE_SILK, delay: 0.75 }}
                                        whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
                                        whileTap={{ scale: 0.97 }}
                                        className="btn-royal mt-4"
                                        aria-label="Enter the celebration"
                                    >
                                        Enter the Celebration
                                    </motion.button>

                                    {/* 百年好合 */}
                                    <motion.p
                                        className="font-noto text-[#C6A75E]/30 mt-4 select-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.4, delay: 1.0 }}
                                        style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }}
                                    >
                                        百年好合
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

/**
 * GrandGate — Imperial Gate Opening
 *
 * Cultural symbolism:
 * - Top structure: Chinese paifang (牌坊) — a ceremonial archway marking sacred space.
 *   Traditionally built at temple and palace entrances.
 * - Base pillars: Javanese Keraton gateway (Gerbang Keraton Yogyakarta) —
 *   massive candi bentar (split gateway) symbolizing the division between
 *   the profane world and sacred royal space.
 * - Light rays: In Javanese belief, golden light (cahaya emas) descends from
 *   the divine realm as a sign of blessing upon the union.
 * - Smoke/mist: Chinese ritual incense smoke — purifying the path for the couple.
 */

interface GrandGateProps {
    onOpen?: () => void;
}

export default function GrandGate({ onOpen }: GrandGateProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const raysRef = useRef<HTMLDivElement>(null);
    const smokeRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showRays, setShowRays] = useState(false);
    const [showSmoke, setShowSmoke] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        onOpen?.();

        const tl = gsap.timeline();

        // Phase 1: Camera push (simulate depth / cinematic zoom)
        tl.to(containerRef.current, {
            scale: 1.035,
            duration: 0.9,
            ease: "power1.inOut",
        });

        // Phase 2: Show volumetric light rays + smoke
        tl.call(() => { setShowRays(true); setShowSmoke(true); }, [], "-=0.3");

        // Phase 3: Heavy gate opening (minimum 2.2s per brief)
        tl.to([leftRef.current, rightRef.current], {
            xPercent: (i) => (i === 0 ? -102 : 102),
            duration: 2.4,
            ease: "power3.inOut",
        }, "-=0.1");

        // Phase 4: Fade out entire gate container
        tl.to(containerRef.current, {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power2.in",
        }, "-=0.2");

        // Phase 5: Cleanup
        tl.call(() => { setShowRays(false); setShowSmoke(false); });
    };

    // 5 volumetric light rays fanning outward from above-center
    const rays = [
        { angle: -20, width: 60, opacity: 0.4, delay: "0s" },
        { angle: -8, width: 90, opacity: 0.55, delay: "0.1s" },
        { angle: 0, width: 120, opacity: 0.65, delay: "0.15s" },
        { angle: 8, width: 90, opacity: 0.55, delay: "0.1s" },
        { angle: 20, width: 60, opacity: 0.4, delay: "0s" },
    ];

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-40 flex overflow-hidden"
            style={{ transformOrigin: "center center" }}
        >
            {/* ── Volumetric Light Rays ──────────────────────────── */}
            {showRays && (
                <div
                    ref={raysRef}
                    className="absolute inset-0 flex items-end justify-center pointer-events-none z-50"
                    style={{ bottom: 0 }}
                >
                    {rays.map((ray, i) => (
                        <div
                            key={i}
                            className="absolute bottom-0 origin-bottom"
                            style={{
                                width: ray.width,
                                height: "100%",
                                left: `calc(50% - ${ray.width / 2}px)`,
                                transform: `rotate(${ray.angle}deg)`,
                                background: `linear-gradient(to top, rgba(212,175,55,${ray.opacity}) 0%, rgba(212,175,55,0.05) 60%, transparent 100%)`,
                                animation: `raySweep 1.8s ease-out ${ray.delay} forwards`,
                                mixBlendMode: "screen",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ── Smoke / Mist (ritual incense) ─────────────────── */}
            {showSmoke && (
                <div
                    ref={smokeRef}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                >
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 200 + i * 80,
                                height: 200 + i * 80,
                                background: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.06) 0%, transparent 70%)",
                                bottom: "10%",
                                left: `calc(50% - ${(200 + i * 80) / 2}px)`,
                                animation: `smokeDrift ${2 + i * 0.5}s ease-out ${i * 0.3}s forwards`,
                                filter: "blur(20px)",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ── LEFT GATE PANEL ────────────────────────────────── */}
            <div
                ref={leftRef}
                onClick={handleOpen}
                className="relative w-1/2 h-full cursor-pointer group"
                style={{ backgroundColor: "#100C0A" }}
            >
                {/* Batik texture overlay — 2% opacity (barely visible, just texture) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/batik-pattern.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "120px",
                        opacity: 0.022,
                        color: "#C6A75E",
                    }}
                />

                {/* 3 vertical gold pillar lines on right edge (Chinese architectural detail) */}
                <div className="absolute right-0 top-0 bottom-0 flex gap-[5px] pointer-events-none" style={{ paddingRight: 0 }}>
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/25 to-transparent" />
                    <div className="w-[2.5px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/40 to-transparent" />
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/20 to-transparent" />
                </div>

                {/* Chinese palace roof curve — top right corner of left panel */}
                <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{ width: 200, height: 100 }}
                >
                    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={200} height={100}>
                        {/* Paifang arch curve */}
                        <path
                            d="M0 80 Q60 20 120 10 Q160 4 200 15"
                            stroke="rgba(198,167,94,0.4)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <path
                            d="M0 90 Q60 30 120 18 Q160 12 200 22"
                            stroke="rgba(198,167,94,0.2)"
                            strokeWidth="0.8"
                            fill="none"
                        />
                        {/* Eave tip ornament */}
                        <circle cx="200" cy="15" r="3" fill="rgba(198,167,94,0.5)" />
                    </svg>
                </div>

                {/* Gate handle / circular knob */}
                <div className="absolute inset-0 flex items-center justify-end pr-10 md:pr-20 pointer-events-none">
                    <div
                        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-700"
                        style={{
                            border: "1px solid rgba(198,167,94,0.25)",
                            background: "rgba(13,11,9,0.6)",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 0 20px rgba(0,0,0,0.4), inset 0 0 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div
                            className="rounded-full"
                            style={{
                                width: 8, height: 8,
                                background: "radial-gradient(circle at 35% 35%, #E8C97A, #8A6E2A)",
                                boxShadow: "0 0 12px rgba(198,167,94,0.6)",
                            }}
                        />
                    </div>
                </div>

                {/* Gradient shadow toward center seam */}
                <div
                    className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none"
                    style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.5))" }}
                />
            </div>

            {/* ── RIGHT GATE PANEL ───────────────────────────────── */}
            <div
                ref={rightRef}
                onClick={handleOpen}
                className="relative w-1/2 h-full cursor-pointer group"
                style={{ backgroundColor: "#100C0A" }}
            >
                {/* Batik texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/batik-pattern.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "120px",
                        opacity: 0.022,
                        color: "#C6A75E",
                        transform: "scaleX(-1)",
                    }}
                />

                {/* Pillar lines on left edge */}
                <div className="absolute left-0 top-0 bottom-0 flex gap-[5px] pointer-events-none">
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/20 to-transparent" />
                    <div className="w-[2.5px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/40 to-transparent" />
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/25 to-transparent" />
                </div>

                {/* Mirrored palace roof on top-left */}
                <div
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ width: 200, height: 100, transform: "scaleX(-1)", transformOrigin: "left top" }}
                >
                    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={200} height={100}>
                        <path d="M0 80 Q60 20 120 10 Q160 4 200 15" stroke="rgba(198,167,94,0.4)" strokeWidth="1.5" fill="none" />
                        <path d="M0 90 Q60 30 120 18 Q160 12 200 22" stroke="rgba(198,167,94,0.2)" strokeWidth="0.8" fill="none" />
                        <circle cx="200" cy="15" r="3" fill="rgba(198,167,94,0.5)" />
                    </svg>
                </div>

                {/* Gate handle */}
                <div className="absolute inset-0 flex items-center justify-start pl-10 md:pl-20 pointer-events-none">
                    <div
                        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                        style={{
                            border: "1px solid rgba(198,167,94,0.25)",
                            background: "rgba(13,11,9,0.6)",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 0 20px rgba(0,0,0,0.4), inset 0 0 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div
                            className="rounded-full"
                            style={{
                                width: 8, height: 8,
                                background: "radial-gradient(circle at 35% 35%, #E8C97A, #8A6E2A)",
                                boxShadow: "0 0 12px rgba(198,167,94,0.6)",
                            }}
                        />
                    </div>
                </div>

                {/* Shadow toward center */}
                <div
                    className="absolute top-0 left-0 bottom-0 w-32 pointer-events-none"
                    style={{ background: "linear-gradient(to left, transparent, rgba(0,0,0,0.5))" }}
                />
            </div>

            {/* ── Center tap hint (disappears on click) ─────────── */}
            {!isOpen && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                    style={{ animation: "pulse 3.5s ease-in-out infinite" }}
                >
                    <p
                        className="font-serif text-[#C6A75E]/60 uppercase"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.5em" }}
                    >
                        Tap to Open
                    </p>
                    <div
                        className="mt-3 w-px bg-gradient-to-b from-[#C6A75E]/40 to-transparent"
                        style={{ height: 48 }}
                    />
                </div>
            )}
        </div>
    );
}

"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

interface GrandGateProps {
    onOpen?: () => void;
}

export default function GrandGate({ onOpen }: GrandGateProps) {
    // Refs dipisah agar tidak ada konflik transform
    const outerRef = useRef<HTMLDivElement>(null);   // hanya autoAlpha (fade out)
    const scaleRef = useRef<HTMLDivElement>(null);   // hanya scale (zoom)
    const leftRef = useRef<HTMLDivElement>(null);   // rotateY kiri
    const rightRef = useRef<HTMLDivElement>(null);   // rotateY kanan

    const [isOpen, setIsOpen] = useState(false);
    const [showRays, setShowRays] = useState(false);
    const [showSmoke, setShowSmoke] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        const tl = gsap.timeline({
            defaults: { overwrite: "auto" },
            onComplete: () => onOpen?.(),
        });

        // Set awal — pastikan panel dalam kondisi awal
        gsap.set([leftRef.current, rightRef.current], {
            rotateY: 0,
            transformOrigin: (i) => (i === 0 ? "left center" : "right center"),
        });

        // Phase 1: zoom kamera (pada scaleRef, BUKAN outerRef)
        tl.to(scaleRef.current, {
            scale: 1.06,
            duration: 0.8,
            ease: "power2.inOut",
        });

        // Phase 2: Cahaya & asap muncul
        tl.call(() => { setShowRays(true); setShowSmoke(true); }, [], "-=0.3");

        // Phase 3: Kedua panel berputar terbuka serentak
        tl.to(leftRef.current, {
            rotateY: -105,
            duration: 2.0,
            ease: "power2.inOut",
        }, "-=0.1");

        tl.to(rightRef.current, {
            rotateY: 105,
            duration: 2.0,
            ease: "power2.inOut",
        }, "<"); // bersamaan dengan kiri

        // Phase 4: Fade out (pada outerRef)
        tl.to(outerRef.current, {
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.in",
        }, "-=0.6");

        // Cleanup
        tl.call(() => { setShowRays(false); setShowSmoke(false); });
    };

    const rays = [
        { angle: -20, width: 60, opacity: 0.35, delay: "0s" },
        { angle: -8, width: 90, opacity: 0.50, delay: "0.08s" },
        { angle: 0, width: 120, opacity: 0.60, delay: "0.14s" },
        { angle: 8, width: 90, opacity: 0.50, delay: "0.08s" },
        { angle: 20, width: 60, opacity: 0.35, delay: "0s" },
    ];

    return (
        /*
         * outerRef  → fixed, full-screen wrapper, hanya dianimasikan autoAlpha
         *             TIDAK punya overflow-hidden (akan memotong perspektif 3D)
         * scaleRef  → inner wrapper, hanya dianimasikan scale
         * Panel kiri/kanan → hanya rotateY, masing-masing punya transformOrigin sendiri
         */
        <div
            ref={outerRef}
            className="fixed inset-0 z-40"
            style={{ willChange: "opacity" }}
        >
            {/* Volumetric Light Rays */}
            {showRays && (
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-50">
                    {rays.map((ray, i) => (
                        <div
                            key={i}
                            className="absolute bottom-0 origin-bottom"
                            style={{
                                width: ray.width,
                                height: "100%",
                                left: `calc(50% - ${ray.width / 2}px)`,
                                transform: `rotate(${ray.angle}deg)`,
                                background: `linear-gradient(to top, rgba(212,175,55,${ray.opacity}) 0%, rgba(212,175,55,0.04) 55%, transparent 100%)`,
                                animation: `raySweep 2s ease-out ${ray.delay} forwards`,
                                mixBlendMode: "screen",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Ritual Smoke / Mist */}
            {showSmoke && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 200 + i * 100,
                                height: 200 + i * 100,
                                background: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.07) 0%, transparent 70%)",
                                bottom: "10%",
                                left: `calc(50% - ${(200 + i * 100) / 2}px)`,
                                animation: `smokeDrift ${2.5 + i * 0.5}s ease-out ${i * 0.25}s forwards`,
                                filter: "blur(24px)",
                            }}
                        />
                    ))}
                </div>
            )}

            {/*
             * scaleRef: hanya scale, ada perspektif untuk 3D rotasi anak-anaknya
             * overflow-hidden DI SINI agar tidak terpotong saat scale awal,
             * tapi perspektif 3D tetap bekerja karena tidak di-clip saat rotateY < 90°
             */}
            <div
                ref={scaleRef}
                className="w-full h-full flex"
                style={{
                    transformOrigin: "center center",
                    perspective: "1400px",
                    willChange: "transform",
                }}
            >
                {/* ── LEFT PANEL ─────────────────────────────────── */}
                <div
                    ref={leftRef}
                    onClick={handleOpen}
                    className="relative w-1/2 h-full cursor-pointer select-none"
                    style={{
                        backgroundColor: "#100C0A",
                        transformOrigin: "left center",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                    }}
                >
                    {/* Batik texture overlay */}
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

                    {/* Pillar lines — sisi kanan (seam) */}
                    <div className="absolute right-0 top-0 bottom-0 flex gap-[5px] pointer-events-none">
                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/25 to-transparent" />
                        <div className="w-[2.5px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/45 to-transparent" />
                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/20 to-transparent" />
                    </div>

                    {/* Palace roof top-right */}
                    <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 200, height: 100 }}>
                        <svg viewBox="0 0 200 100" fill="none" width={200} height={100}>
                            <path d="M0 80 Q60 20 120 10 Q160 4 200 15" stroke="rgba(198,167,94,0.4)" strokeWidth="1.5" fill="none" />
                            <path d="M0 90 Q60 30 120 18 Q160 12 200 22" stroke="rgba(198,167,94,0.2)" strokeWidth="0.8" fill="none" />
                            <circle cx="200" cy="15" r="3" fill="rgba(198,167,94,0.5)" />
                        </svg>
                    </div>

                    {/* Gate handle */}
                    <div className="absolute inset-0 flex items-center justify-end pr-10 md:pr-24 pointer-events-none">
                        <div
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                            style={{
                                border: "1px solid rgba(198,167,94,0.3)",
                                background: "rgba(13,11,9,0.7)",
                                boxShadow: "0 0 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(0,0,0,0.4)",
                            }}
                        >
                            <div className="rounded-full" style={{ width: 8, height: 8, background: "radial-gradient(circle at 35% 35%, #F0D98C, #8A6E2A)", boxShadow: "0 0 14px rgba(198,167,94,0.7)" }} />
                        </div>
                    </div>

                    {/* Center seam shadow */}
                    <div className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.6))" }} />
                </div>

                {/* ── RIGHT PANEL ─────────────────────────────────── */}
                <div
                    ref={rightRef}
                    onClick={handleOpen}
                    className="relative w-1/2 h-full cursor-pointer select-none"
                    style={{
                        backgroundColor: "#100C0A",
                        transformOrigin: "right center",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                    }}
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

                    {/* Pillar lines — sisi kiri (seam) */}
                    <div className="absolute left-0 top-0 bottom-0 flex gap-[5px] pointer-events-none">
                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/20 to-transparent" />
                        <div className="w-[2.5px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/45 to-transparent" />
                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A75E]/25 to-transparent" />
                    </div>

                    {/* Palace roof top-left (mirror) */}
                    <div className="absolute top-0 left-0 pointer-events-none" style={{ width: 200, height: 100, transform: "scaleX(-1)", transformOrigin: "left top" }}>
                        <svg viewBox="0 0 200 100" fill="none" width={200} height={100}>
                            <path d="M0 80 Q60 20 120 10 Q160 4 200 15" stroke="rgba(198,167,94,0.4)" strokeWidth="1.5" fill="none" />
                            <path d="M0 90 Q60 30 120 18 Q160 12 200 22" stroke="rgba(198,167,94,0.2)" strokeWidth="0.8" fill="none" />
                            <circle cx="200" cy="15" r="3" fill="rgba(198,167,94,0.5)" />
                        </svg>
                    </div>

                    {/* Gate handle */}
                    <div className="absolute inset-0 flex items-center justify-start pl-10 md:pl-24 pointer-events-none">
                        <div
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                            style={{
                                border: "1px solid rgba(198,167,94,0.3)",
                                background: "rgba(13,11,9,0.7)",
                                boxShadow: "0 0 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(0,0,0,0.4)",
                            }}
                        >
                            <div className="rounded-full" style={{ width: 8, height: 8, background: "radial-gradient(circle at 35% 35%, #F0D98C, #8A6E2A)", boxShadow: "0 0 14px rgba(198,167,94,0.7)" }} />
                        </div>
                    </div>

                    {/* Center seam shadow */}
                    <div className="absolute top-0 left-0 bottom-0 w-32 pointer-events-none" style={{ background: "linear-gradient(to left, transparent, rgba(0,0,0,0.6))" }} />
                </div>
            </div>

            {/* Tap hint */}
            {!isOpen && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                    style={{ animation: "pulse 3.5s ease-in-out infinite" }}
                >
                    <p className="font-serif text-[#C6A75E]/60 uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.5em" }}>
                        Tap to Open
                    </p>
                    <div className="mt-3 w-px bg-gradient-to-b from-[#C6A75E]/40 to-transparent" style={{ height: 48 }} />
                </div>
            )}
        </div>
    );
}

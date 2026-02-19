"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * CustomCursor — Luxury gold cursor with trailing ring
 * Desktop only (pointer: fine).
 * - Inner dot: fast, precise (framer-motion tween, 40ms)
 * - Outer ring: slow, laggy (lerp 12% per frame via RAF)
 * - On interactive hover: inner morphs to 囍 symbol
 */
export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -200, y: -200 });
    const [trail, setTrail] = useState({ x: -200, y: -200 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    // Must start as false (SSR-safe) and update on client to avoid hydration mismatch
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const desktop = window.matchMedia("(pointer: fine)").matches;
        setIsDesktop(desktop);
        if (!desktop) return;

        let rafId: number;
        let targetX = -200;
        let targetY = -200;

        const onMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
            setPos({ x: e.clientX, y: e.clientY });

            const el = e.target as HTMLElement;
            const interactive =
                !!el.closest("a, button, [role='button'], [data-cursor='pointer']") ||
                el.tagName === "BUTTON" ||
                el.style.cursor === "pointer";
            setLinkHovered(interactive);
        };

        const onDown = () => setClicked(true);
        const onUp = () => setClicked(false);

        // Smooth trailing ring — lerp 12% toward target each frame
        const tick = () => {
            setTrail(prev => ({
                x: prev.x + (targetX - prev.x) * 0.12,
                y: prev.y + (targetY - prev.y) * 0.12,
            }));
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("mouseup", onUp);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("mouseup", onUp);
        };
    }, []);

    // Don't render on touch devices or during SSR
    if (!isDesktop) return null;

    const ringSize = linkHovered ? 50 : 34;

    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            {/* ── Trailing outer ring ─────────────────────────── */}
            <div
                style={{
                    position: "absolute",
                    left: trail.x,
                    top: trail.y,
                    width: ringSize,
                    height: ringSize,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    border: "1px solid rgba(198,167,94,0.45)",
                    transition: "width 0.35s ease, height 0.35s ease, border-color 0.3s",
                    willChange: "left, top",
                }}
            />

            {/* ── Inner dot / 囍 — fast precise ──────────────── */}
            <motion.div
                aria-hidden
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: clicked ? 0.65 : 1,
                }}
                transition={{ type: "tween", duration: 0.04, ease: "linear" }}
            >
                {linkHovered ? (
                    <span
                        style={{
                            fontFamily: "serif",
                            fontSize: 14,
                            lineHeight: 1,
                            color: "rgba(198,167,94,0.8)",
                            userSelect: "none",
                            filter: "drop-shadow(0 0 5px rgba(198,167,94,0.45))",
                        }}
                    >
                        囍
                    </span>
                ) : (
                    <div
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#C6A75E",
                            mixBlendMode: "difference",
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
}

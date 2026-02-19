"use client";

import { useEffect, useState, useMemo } from "react";

/**
 * JasminePetal — Single animated falling jasmine petal
 * Cultural symbolism: Javanese melati (jasmine) is the sacred flower of purity
 * used in Keraton ceremonies, draped over bride/groom as divine blessing.
 *
 * Usage: render multiple instances with staggered delays for a rainfall effect.
 */

interface JasminePetalProps {
    left: string;        // CSS left position (e.g. "30%")
    duration: number;    // fall duration in seconds
    delay: number;       // animation delay in seconds
    size?: number;       // petal size multiplier (default 1)
    rotation?: number;   // initial rotation in degrees
}

export default function JasminePetal({
    left,
    duration,
    delay,
    size = 1,
    rotation = 0,
}: JasminePetalProps) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setActive(true), delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!active) return null;

    const w = 14 * size;
    const h = 18 * size;

    return (
        <div
            className="absolute top-0 pointer-events-none z-20"
            style={{
                left,
                width: w,
                height: h,
                animation: `petalFall ${duration}s ease-in forwards`,
                transform: `rotate(${rotation}deg)`,
            }}
        >
            {/* Jasmine petal SVG — white five-petal flower silhouette */}
            <svg viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" width={w} height={h}>
                {/* Single elongated petal — jasmine has slender petals */}
                <ellipse
                    cx="14" cy="20"
                    rx="5" ry="12"
                    fill="rgba(255,252,245,0.88)"
                    stroke="rgba(198,167,94,0.2)"
                    strokeWidth="0.4"
                />
                {/* Petal vein — delicate center line */}
                <line
                    x1="14" y1="10" x2="14" y2="30"
                    stroke="rgba(198,167,94,0.3)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                />
                {/* Side petal left */}
                <ellipse
                    cx="9" cy="22"
                    rx="3.5" ry="9"
                    transform="rotate(-25 9 22)"
                    fill="rgba(255,252,245,0.7)"
                    stroke="rgba(198,167,94,0.15)"
                    strokeWidth="0.3"
                />
                {/* Side petal right */}
                <ellipse
                    cx="19" cy="22"
                    rx="3.5" ry="9"
                    transform="rotate(25 19 22)"
                    fill="rgba(255,252,245,0.7)"
                    stroke="rgba(198,167,94,0.15)"
                    strokeWidth="0.3"
                />
                {/* Stamen dot */}
                <circle cx="14" cy="12" r="1.5" fill="rgba(232,201,122,0.6)" />
            </svg>
        </div>
    );
}

/**
 * JasminePetalShower — Renders N falling petals with varied positions & timing
 */
interface JasminePetalShowerProps {
    count?: number;
    duration?: number; // base duration
    className?: string;
}

export function JasminePetalShower({ count = 18, duration = 8, className = "" }: JasminePetalShowerProps) {
    const petals = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${5 + (i * 93 / count) % 90}%`,
            duration: duration + (i % 5) * 1.2,
            delay: (i * 0.6) % (duration * 0.7),
            size: 0.7 + (i % 4) * 0.2,
            rotation: (i * 37) % 360,
        }));
    }, [count, duration]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {petals.map((p) => (
                <JasminePetal key={p.id} {...p} />
            ))}
        </div>
    );
}

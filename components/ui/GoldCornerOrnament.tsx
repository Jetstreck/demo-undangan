"use client";

/**
 * GoldCornerOrnament — Reusable Javanese ukiran (carved ornament) corner piece
 * Cultural symbolism: Keraton Yogyakarta architectural gold leaf carvings
 * applied at four corners of royal ceremonial documents and invitation cards.
 *
 * Usage: <GoldCornerOrnament position="tl" size={80} opacity={0.7} />
 */

interface GoldCornerOrnamentProps {
    position?: "tl" | "tr" | "bl" | "br"; // top-left, top-right, bottom-left, bottom-right
    size?: number;
    opacity?: number;
    className?: string;
}

export default function GoldCornerOrnament({
    position = "tl",
    size = 80,
    opacity = 0.65,
    className = "",
}: GoldCornerOrnamentProps) {
    // CSS transform to rotate/flip for each corner position
    const transforms: Record<string, string> = {
        tl: "none",
        tr: "scaleX(-1)",
        bl: "scaleY(-1)",
        br: "scale(-1,-1)",
    };

    // Position class for absolute placement
    const positionStyles: Record<string, React.CSSProperties> = {
        tl: { top: 0, left: 0 },
        tr: { top: 0, right: 0 },
        bl: { bottom: 0, left: 0 },
        br: { bottom: 0, right: 0 },
    };

    return (
        <div
            className={`absolute pointer-events-none ${className}`}
            style={{
                ...positionStyles[position],
                width: size,
                height: size,
                opacity,
                transform: transforms[position],
                transformOrigin: position.includes("r") ? "right top" : "left top",
            }}
        >
            {/* SVG Javanese ukiran: flowing scrollwork, lotus bud, and geometric diamond */}
            <svg
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
            >
                <defs>
                    <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E8C97A" />
                        <stop offset="40%" stopColor="#C6A75E" />
                        <stop offset="100%" stopColor="#8A6E2A" />
                    </linearGradient>
                </defs>

                {/* Vertical border line */}
                <line x1="8" y1="8" x2="8" y2="72" stroke={`url(#goldGrad-${position})`} strokeWidth="0.8" strokeOpacity="0.6" />
                {/* Horizontal border line */}
                <line x1="8" y1="8" x2="72" y2="8" stroke={`url(#goldGrad-${position})`} strokeWidth="0.8" strokeOpacity="0.6" />

                {/* Inner corner dot */}
                <circle cx="8" cy="8" r="2.5" fill={`url(#goldGrad-${position})`} fillOpacity="0.9" />

                {/* Scrollwork flourish — horizontal */}
                <path
                    d="M14 8 C20 8 28 4 36 8 C42 11 46 8 52 8"
                    stroke={`url(#goldGrad-${position})`}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fillOpacity="0"
                    strokeOpacity="0.7"
                    fill="none"
                />

                {/* Scrollwork flourish — vertical */}
                <path
                    d="M8 14 C8 20 4 28 8 36 C11 42 8 46 8 52"
                    stroke={`url(#goldGrad-${position})`}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeOpacity="0.7"
                    fill="none"
                />

                {/* Central lotus diamond motif */}
                <path
                    d="M8 8 L20 16 L8 24 L-4 16 Z"
                    stroke={`url(#goldGrad-${position})`}
                    strokeWidth="0.7"
                    fill="none"
                    strokeOpacity="0.5"
                    transform="translate(2, -2)"
                />

                {/* Lotus petal tip */}
                <path
                    d="M12 12 Q18 8 24 12 Q18 16 12 12Z"
                    fill={`url(#goldGrad-${position})`}
                    fillOpacity="0.25"
                />

                {/* Small corner dot ornament */}
                <circle cx="24" cy="8" r="1.2" fill={`url(#goldGrad-${position})`} fillOpacity="0.6" />
                <circle cx="8" cy="24" r="1.2" fill={`url(#goldGrad-${position})`} fillOpacity="0.6" />
                <circle cx="16" cy="16" r="1.8" fill={`url(#goldGrad-${position})`} fillOpacity="0.4" />
            </svg>
        </div>
    );
}

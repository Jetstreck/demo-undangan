"use client";

/**
 * GoldDivider — Reusable ceremonial section separator
 * A horizontal gold rule with central diamond and flanking ornamental dots.
 * Inspired by royal document manuscript separators.
 */
interface GoldDividerProps {
    className?: string;
    width?: string;
}

export default function GoldDivider({ className = "", width = "w-64" }: GoldDividerProps) {
    return (
        <div className={`flex items-center justify-center gap-3 ${width} mx-auto ${className}`}>
            {/* Left line */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C6A75E]/70" />
            {/* Left dot */}
            <div className="w-1 h-1 rounded-full bg-[#C6A75E]/60" />
            {/* Central diamond */}
            <div
                className="w-2.5 h-2.5 bg-transparent border border-[#C6A75E]/80"
                style={{ transform: "rotate(45deg)" }}
            />
            {/* Right dot */}
            <div className="w-1 h-1 rounded-full bg-[#C6A75E]/60" />
            {/* Right line */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C6A75E]/70" />
        </div>
    );
}

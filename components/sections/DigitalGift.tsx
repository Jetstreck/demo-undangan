"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import GoldCornerOrnament from "@/components/ui/GoldCornerOrnament";

/**
 * DigitalGift — Red Envelope Opening
 *
 * Cultural symbolism:
 * - Angpao / Hóngbāo (红包): The red envelope is the most iconic gift in
 *   Chinese culture. At weddings, monetary gifts in red envelopes symbolize
 *   wealth, good fortune, and blessings for the couple's new life.
 * - 囍 seal embossed on envelope flap: Marks this as a wedding-specific
 *   envelope (double happiness) rather than a general gift.
 * - Gold shimmer frame on account details: Simulates gold-pressed print
 *   on the inside of a premium silk envelope.
 */

const BANK_ACCOUNTS = [
    { bank: "BCA", number: "1234 5678 90", name: "Alexander & Clarissa" },
    { bank: "Mandiri", number: "0987 6543 21", name: "Alexander & Clarissa" },
];

export default function DigitalGift() {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const handleCopy = (text: string, idx: number) => {
        navigator.clipboard.writeText(text.replace(/\s/g, ""));
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2200);
    };

    return (
        <section
            className="relative py-28 overflow-hidden flex flex-col items-center"
            style={{ backgroundColor: "#0D0B09" }}
        >
            {/* Background: subtle warm radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(90,5,5,0.18) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 max-w-lg w-full px-6 text-center">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="space-y-3 mb-16"
                >
                    <p
                        className="font-sans text-[#C6A75E]/35 uppercase"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                    >
                        Gift of Blessing
                    </p>
                    <h2
                        className="font-serif text-[#C6A75E]"
                        style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 400, letterSpacing: "0.1em" }}
                    >
                        Wedding Gift
                    </h2>
                    <GoldDivider width="w-40" />
                    <p
                        className="font-sans text-[#F5EDD8]/40 leading-relaxed mt-4"
                        style={{ fontSize: "0.82rem", letterSpacing: "0.04em", maxWidth: 380, margin: "1rem auto 0" }}
                    >
                        Your presence is the greatest gift. Should you wish to honour us with a digital blessing, an envelope awaits.
                    </p>
                </motion.div>

                {/* ── Envelope / Gift Content ── */}
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        /* ── Red Envelope (closed state) ── */
                        <motion.button
                            key="envelope"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                            transition={{ duration: 0.7 }}
                            onClick={() => setIsOpen(true)}
                            className="relative mx-auto block group"
                            style={{ width: 240 }}
                            aria-label="Open red envelope"
                        >
                            {/* Gold shimmer glow around envelope */}
                            <div
                                className="absolute -inset-3 rounded-lg pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                                style={{
                                    background: "radial-gradient(ellipse at center, rgba(198,167,94,0.12) 0%, transparent 70%)",
                                }}
                            />

                            {/* Envelope body */}
                            <div
                                className="relative rounded-md overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                                style={{
                                    backgroundColor: "#8B0000",
                                    border: "1px solid rgba(198,167,94,0.3)",
                                    aspectRatio: "4/3",
                                }}
                            >
                                {/* Silk sheen overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                                    }}
                                />

                                {/* Envelope flap triangle — top */}
                                <div
                                    className="absolute top-0 left-0 right-0 pointer-events-none"
                                    style={{ height: "45%" }}
                                >
                                    <svg viewBox="0 0 240 90" width="100%" height="100%" preserveAspectRatio="none">
                                        <polygon
                                            points="0,0 240,0 120,90"
                                            fill="rgba(100,0,0,0.6)"
                                        />
                                        {/* Antique gold flap border */}
                                        <polyline
                                            points="2,2 238,2 120,88"
                                            fill="none"
                                            stroke="rgba(198,167,94,0.4)"
                                            strokeWidth="1"
                                        />
                                    </svg>
                                </div>

                                {/* Center 囍 embossed seal */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center"
                                        style={{
                                            border: "1px solid rgba(198,167,94,0.5)",
                                            background: "radial-gradient(circle, rgba(140,10,10,0.8) 0%, rgba(100,0,0,1) 100%)",
                                            boxShadow: "0 0 20px rgba(198,167,94,0.15), inset 0 2px 4px rgba(255,255,255,0.05)",
                                        }}
                                    >
                                        <span
                                            className="gold-foil-text font-serif select-none"
                                            style={{ fontSize: "1.8rem", lineHeight: 1 }}
                                        >
                                            囍
                                        </span>
                                    </div>
                                </div>

                                {/* Tap hint */}
                                <p
                                    className="absolute bottom-4 left-0 right-0 text-center font-sans text-[#E8C97A]/50 uppercase"
                                    style={{ fontSize: "0.5rem", letterSpacing: "0.4em" }}
                                >
                                    Tap to Open
                                </p>
                            </div>
                        </motion.button>
                    ) : (
                        /* ── Gift content (opened state) ── */
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 30, scale: 0.93 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative overflow-hidden"
                            style={{
                                backgroundColor: "#EDE5CC",
                                border: "1px solid rgba(168,137,58,0.45)",
                                outline: "1px solid rgba(168,137,58,0.1)",
                                outlineOffset: "8px",
                            }}
                        >
                            <GoldCornerOrnament position="tl" size={56} opacity={0.5} />
                            <GoldCornerOrnament position="tr" size={56} opacity={0.5} />
                            <GoldCornerOrnament position="bl" size={56} opacity={0.5} />
                            <GoldCornerOrnament position="br" size={56} opacity={0.5} />

                            <div className="relative z-10 p-10 space-y-8">
                                {/* Gift heading */}
                                <div className="text-center space-y-2">
                                    <p
                                        className="font-noto text-[#7A0C0C]/40 select-none"
                                        style={{ fontSize: "1.4rem", letterSpacing: "0.2em" }}
                                    >
                                        囍
                                    </p>
                                    <h3
                                        className="font-serif text-[#3A2800]"
                                        style={{ fontSize: "1.4rem", fontWeight: 400, letterSpacing: "0.1em" }}
                                    >
                                        Bank Transfer
                                    </h3>
                                    <GoldDivider width="w-32" />
                                </div>

                                {/* Bank accounts */}
                                {BANK_ACCOUNTS.map((acc, idx) => (
                                    <div
                                        key={idx}
                                        className="relative overflow-hidden"
                                        style={{
                                            backgroundColor: "rgba(255,252,245,0.8)",
                                            border: "1px solid rgba(168,137,58,0.2)",
                                        }}
                                    >
                                        {/* Gold shimmer animated bar across top */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-[1px]"
                                            style={{
                                                background: "linear-gradient(90deg, transparent 0%, rgba(198,167,94,0.8) 50%, transparent 100%)",
                                                backgroundSize: "200% auto",
                                                animation: "shimmerScan 3s ease-in-out infinite",
                                            }}
                                        />

                                        <div className="p-5 flex items-center justify-between gap-4">
                                            <div className="text-left">
                                                <p
                                                    className="font-sans text-[#8A6020] uppercase"
                                                    style={{ fontSize: "0.55rem", letterSpacing: "0.3em" }}
                                                >
                                                    {acc.bank}
                                                </p>
                                                <p
                                                    className="font-serif text-[#1A1510] mt-1"
                                                    style={{ fontSize: "1.1rem", letterSpacing: "0.08em" }}
                                                >
                                                    {acc.number}
                                                </p>
                                                <p
                                                    className="font-sans text-[#3A2800]/60 mt-0.5"
                                                    style={{ fontSize: "0.72rem" }}
                                                >
                                                    a.n {acc.name}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleCopy(acc.number, idx)}
                                                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-[#A8893A]/30 transition-all duration-400 hover:bg-[#A8893A]/10 hover:border-[#A8893A]/60"
                                                aria-label="Copy account number"
                                            >
                                                {copiedIdx === idx ? (
                                                    <Check size={14} color="#A8893A" />
                                                ) : (
                                                    <Copy size={14} color="#A8893A" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <p
                                    className="font-sans text-center text-[#3A2800]/40"
                                    style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
                                >
                                    May your kindness be returned tenfold.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

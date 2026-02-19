"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";

/**
 * Gallery — Framed Paintings
 *
 * Cultural symbolism:
 * - Dark background echoes Chinese ink wash (水墨画, shuǐmòhuà) painting
 *   exhibition halls in imperial museums.
 * - Double frame treatment: outer decorative frame + inner mount —
 *   the tradition of mounting paintings on silk brocade before framing,
 *   used in both Chinese and Javanese royal courts.
 * - Roman numeral captions: nod to European colonial-era Keraton photography,
 *   a hybrid aesthetic of East-West aristocratic documentation.
 */

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const photos = [
    "https://images.unsplash.com/photo-1511285560929-97aadf5cfe58?q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-1645062cd95c?q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800",
    "https://images.unsplash.com/photo-1519225448526-72c6ef4bc016?q=80&w=800",
];

export default function Gallery() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const prev = () =>
        setSelectedId((p) => (p === null || p === 0 ? photos.length - 1 : p - 1));
    const next = () =>
        setSelectedId((p) => (p === null || p === photos.length - 1 ? 0 : p + 1));

    return (
        <section
            className="relative py-28 overflow-hidden"
            style={{ backgroundColor: "#0A0806" }}
        >
            {/* Background subtle warmth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(30,20,10,0.8) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-4 mb-16"
                >
                    <p
                        className="font-sans text-[#C6A75E]/35 uppercase"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                    >
                        Moments in Time
                    </p>
                    <h2
                        className="font-serif text-[#C6A75E]"
                        style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 400, letterSpacing: "0.1em" }}
                    >
                        Our Gallery
                    </h2>
                    <GoldDivider width="w-40" />
                </motion.div>

                {/* Gallery grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {photos.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.08 }}
                            onClick={() => setSelectedId(i)}
                            className="group relative cursor-pointer"
                        >
                            {/* Outer antique frame */}
                            <div
                                className="relative p-[1px] transition-all duration-700"
                                style={{
                                    background: "linear-gradient(135deg, rgba(198,167,94,0.4), rgba(168,137,58,0.1), rgba(198,167,94,0.35))",
                                }}
                            >
                                {/* Inner white mount (museum matting) */}
                                <div
                                    className="p-3 transition-all duration-700 group-hover:p-2"
                                    style={{ backgroundColor: "#0A0806", outline: "1px solid rgba(198,167,94,0.08)", outlineOffset: "2px" }}
                                >
                                    {/* Photo container */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <img
                                            src={src}
                                            alt={`Gallery ${ROMAN[i]}`}
                                            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                                            style={{
                                                filter: "sepia(15%) brightness(0.88) contrast(1.05)",
                                            }}
                                        />
                                        {/* Dark overlay — lifts on hover */}
                                        <div
                                            className="absolute inset-0 transition-opacity duration-700"
                                            style={{
                                                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Roman numeral caption */}
                            <p
                                className="text-center mt-3 font-serif text-[#C6A75E]/30 transition-colors duration-500 group-hover:text-[#C6A75E]/55"
                                style={{ fontSize: "0.62rem", letterSpacing: "0.4em" }}
                            >
                                {ROMAN[i]}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Lightbox ──────────────────────────────────── */}
            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        style={{ backgroundColor: "rgba(10,8,6,0.97)", backdropFilter: "blur(12px)" }}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setSelectedId(null)}
                            className="absolute top-6 right-6 text-[#C6A75E]/40 hover:text-[#C6A75E] transition-colors"
                        >
                            <X size={28} />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={prev}
                            className="absolute left-4 md:left-8 text-[#C6A75E]/40 hover:text-[#C6A75E] transition-colors"
                        >
                            <ChevronLeft size={40} />
                        </button>

                        {/* Framed photo */}
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative max-h-[85vh] w-auto max-w-[90vw]"
                            style={{
                                padding: "12px",
                                background: "linear-gradient(135deg, rgba(198,167,94,0.4), rgba(168,137,58,0.1), rgba(198,167,94,0.4))",
                                boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
                            }}
                        >
                            <div style={{ padding: "16px", backgroundColor: "#0A0806" }}>
                                <img
                                    src={photos[selectedId]}
                                    alt={`Gallery ${ROMAN[selectedId]}`}
                                    className="block max-h-[70vh] w-auto object-contain"
                                    style={{ filter: "sepia(10%) brightness(0.9)" }}
                                />
                            </div>
                            <p
                                className="text-center mt-3 font-serif text-[#C6A75E]/50"
                                style={{ fontSize: "0.6rem", letterSpacing: "0.5em" }}
                            >
                                {ROMAN[selectedId]}
                            </p>
                        </motion.div>

                        {/* Next */}
                        <button
                            onClick={next}
                            className="absolute right-4 md:right-8 text-[#C6A75E]/40 hover:text-[#C6A75E] transition-colors"
                        >
                            <ChevronRight size={40} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarPlus, Clock } from "lucide-react";
import GoldCornerOrnament from "@/components/ui/GoldCornerOrnament";
import GoldDivider from "@/components/ui/GoldDivider";

/**
 * CeremonyDetails — Royal Ceremony Documents
 *
 * Cultural symbolism:
 *
 * AKAD NIKAH (Islamic-Javanese Marriage Contract):
 * - The most sacred moment of the Javanese royal wedding. 
 *   Cream ivory background simulates aged kertas dluang (Javanese handmade paper)
 *   used for royal manuscripts (serat) since the 15th century.
 * - Batik parang border: Parang Rusak is a royal-class batik pattern, 
 *   traditionally only permitted to be worn by Keraton royalty.
 * - Gold ukiran corners: Ornamental carving motifs from Keraton Yogyakarta 
 *   doors and columns — symbolize divine protection at the four corners.
 *
 * TEA CEREMONY / SANGJIT (Chinese Engagement Ritual):
 * - Deep crimson silk background: Sangjit chambers are draped in red silk
 *   as red wards off evil spirits and attracts fortune (红运, hóng yùn).
 * - Lantern corner glows: Chinese red lanterns (红灯笼) are hung at every
 *   Chinese wedding to light the path of the newlyweds and bless them.
 * - 囍 seal: appears on Sangjit gifts, red envelopes, and ceremony decor.
 */

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function CeremonyDetails() {
    return (
        <section
            className="py-28 px-6 relative overflow-hidden"
            style={{ backgroundColor: "#0D0B09" }}
        >
            {/* Silk background texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/silk-noise.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px",
                    opacity: 0.06,
                    mixBlendMode: "overlay",
                }}
            />

            <div className="max-w-6xl mx-auto space-y-20 relative z-10">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-4"
                >
                    <p
                        className="font-sans text-[#C6A75E]/40 uppercase"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.45em" }}
                    >
                        Sacred Celebrations
                    </p>
                    <h2
                        className="font-serif text-[#C6A75E]"
                        style={{
                            fontSize: "clamp(2rem,5vw,3.5rem)",
                            fontWeight: 400,
                            letterSpacing: "0.1em",
                            textShadow: "0 0 60px rgba(198,167,94,0.12)",
                        }}
                    >
                        The Ceremony
                    </h2>
                    <GoldDivider width="w-48" />
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* ── AKAD NIKAH CARD ─────────────────────────────
              Javanese Royal Ceremony: cream silk, batik border, ukiran corners
          ── */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Double border frame — outer */}
                        <div
                            className="absolute inset-0 rounded"
                            style={{
                                border: "1px solid rgba(168,137,58,0.4)",
                                outline: "1px solid rgba(168,137,58,0.12)",
                                outlineOffset: "8px",
                            }}
                        />

                        {/* Card interior — cream silk */}
                        <div
                            className="relative overflow-hidden rounded"
                            style={{
                                backgroundColor: "#EDE5CC",
                                backgroundImage: "url('/images/paper-texture.svg'), radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.25) 0%, transparent 55%)",
                                backgroundRepeat: "repeat, no-repeat",
                                backgroundSize: "300px, 100%",
                                backgroundBlendMode: "multiply, normal",
                                minHeight: 420,
                            }}
                        >
                            {/* Gold corner ornaments — Javanese ukiran symbol */}
                            <GoldCornerOrnament position="tl" size={70} opacity={0.55} />
                            <GoldCornerOrnament position="tr" size={70} opacity={0.55} />
                            <GoldCornerOrnament position="bl" size={70} opacity={0.55} />
                            <GoldCornerOrnament position="br" size={70} opacity={0.55} />

                            {/* Batik parang strip at top — 6px royal pattern band */}
                            <div
                                className="absolute top-0 left-12 right-12 h-[4px] pointer-events-none"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(168,137,58,0.5) 20%, rgba(168,137,58,0.3) 80%, transparent)",
                                }}
                            />
                            {/* Bottom batik strip */}
                            <div
                                className="absolute bottom-0 left-12 right-12 h-[4px] pointer-events-none"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(168,137,58,0.5) 20%, rgba(168,137,58,0.3) 80%, transparent)",
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-12 lg:p-14 space-y-8">
                                {/* Section label */}
                                <div>
                                    <p
                                        className="font-sans uppercase text-[#8A6020]"
                                        style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                                    >
                                        Javanese Royal Ceremony
                                    </p>
                                    <h3
                                        className="font-serif mt-2 text-[#5C3A00]"
                                        style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 500, letterSpacing: "0.05em" }}
                                    >
                                        Akad Nikah
                                    </h3>
                                </div>

                                <div
                                    className="w-16 h-px"
                                    style={{ background: "linear-gradient(to right, rgba(168,137,58,0.8), transparent)" }}
                                />

                                {/* Details */}
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <CalendarPlus className="mt-0.5 shrink-0" size={16} color="#A8893A" />
                                        <div>
                                            <p className="font-serif text-[#3A2800]" style={{ fontSize: "1rem" }}>
                                                Sabtu, 20 Juni 2026
                                            </p>
                                            <p className="font-sans text-[#5C3A00]/60 mt-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}>
                                                Saturday, 20 June 2026
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Clock className="mt-0.5 shrink-0" size={16} color="#A8893A" />
                                        <p className="font-serif text-[#3A2800]" style={{ fontSize: "1rem" }}>
                                            08.00 – 10.00 WIB
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <MapPin className="mt-0.5 shrink-0" size={16} color="#A8893A" />
                                        <div>
                                            <p className="font-serif text-[#3A2800]" style={{ fontSize: "1rem" }}>
                                                The Trans Icon Grand Ballroom
                                            </p>
                                            <p className="font-sans text-[#5C3A00]/60 mt-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                                                Jl. Kertajaya Indah Timur No.4, Surabaya
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <a
                                        href="https://maps.app.goo.gl/TransIconSby"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-royal"
                                        style={{ color: "#5C3A00", borderColor: "rgba(168,137,58,0.5)" }}
                                    >
                                        Open Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── TEA CEREMONY CARD ───────────────────────────
              Chinese Sangjit: deep red silk, lantern corners, 囍 seal
          ── */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative"
                    >
                        {/* Antique gold double frame */}
                        <div
                            className="absolute inset-0 rounded"
                            style={{
                                border: "1px solid rgba(198,167,94,0.3)",
                                outline: "1px solid rgba(198,167,94,0.08)",
                                outlineOffset: "8px",
                            }}
                        />

                        {/* Card interior — deep red silk */}
                        <div
                            className="relative overflow-hidden rounded"
                            style={{
                                backgroundColor: "#3D0808",
                                backgroundImage: "url('/images/silk-noise.svg'), radial-gradient(ellipse at 80% 80%, rgba(100,5,5,0.4) 0%, transparent 50%)",
                                backgroundRepeat: "repeat, no-repeat",
                                backgroundSize: "180px, 100%",
                                minHeight: 420,
                            }}
                        >
                            {/* Red lantern glow — top corners (Chinese wedding lantern symbolism) */}
                            <div
                                className="absolute top-0 left-0 w-32 h-32 pointer-events-none rounded-full"
                                style={{
                                    background: "radial-gradient(circle at 20% 20%, rgba(200,30,30,0.25) 0%, transparent 70%)",
                                    filter: "blur(16px)",
                                }}
                            />
                            <div
                                className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full"
                                style={{
                                    background: "radial-gradient(circle at 80% 20%, rgba(200,30,30,0.25) 0%, transparent 70%)",
                                    filter: "blur(16px)",
                                }}
                            />

                            {/* 囍 watermark seal on red silk */}
                            <div
                                className="absolute bottom-0 right-0 select-none pointer-events-none translate-x-1/4 translate-y-1/4"
                                style={{ fontFamily: "serif", fontSize: "12rem", color: "#E8C97A", opacity: 0.035, lineHeight: 1 }}
                            >
                                囍
                            </div>

                            {/* Gold corner ornaments over red */}
                            <GoldCornerOrnament position="tl" size={60} opacity={0.45} />
                            <GoldCornerOrnament position="tr" size={60} opacity={0.45} />
                            <GoldCornerOrnament position="bl" size={60} opacity={0.45} />
                            <GoldCornerOrnament position="br" size={60} opacity={0.45} />

                            {/* Content */}
                            <div className="relative z-10 p-12 lg:p-14 space-y-8">
                                <div>
                                    <p
                                        className="font-sans uppercase text-[#E8C97A]/50"
                                        style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                                    >
                                        Chinese Royal Ceremony · 中华传统
                                    </p>
                                    <h3
                                        className="font-serif mt-2 text-[#F5EDD8]"
                                        style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 400, letterSpacing: "0.05em" }}
                                    >
                                        Tea Ceremony
                                    </h3>
                                    <p
                                        className="font-sans mt-1 text-[#E8C97A]/60 uppercase"
                                        style={{ fontSize: "0.62rem", letterSpacing: "0.25em" }}
                                    >
                                        Sangjit · 茶道
                                    </p>
                                </div>

                                <div
                                    className="w-16 h-px"
                                    style={{ background: "linear-gradient(to right, rgba(198,167,94,0.7), transparent)" }}
                                />

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <CalendarPlus className="mt-0.5 shrink-0" size={16} color="#C6A75E" />
                                        <div>
                                            <p className="font-serif text-[#F5EDD8]" style={{ fontSize: "1rem" }}>
                                                Saturday, 20 June 2026
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Clock className="mt-0.5 shrink-0" size={16} color="#C6A75E" />
                                        <p className="font-serif text-[#F5EDD8]" style={{ fontSize: "1rem" }}>
                                            19.00 – 21.00 WIB
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <MapPin className="mt-0.5 shrink-0" size={16} color="#C6A75E" />
                                        <div>
                                            <p className="font-serif text-[#F5EDD8]" style={{ fontSize: "1rem" }}>
                                                JW Marriott Surabaya — Imperial Ballroom
                                            </p>
                                            <p className="font-sans text-[#F5EDD8]/50 mt-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                                                Jl. Embong Malang No.85–89, Surabaya
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <a
                                        href="https://maps.app.goo.gl/JWMarriottSby"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-royal"
                                    >
                                        Open Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

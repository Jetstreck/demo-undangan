"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import GoldCornerOrnament from "@/components/ui/GoldCornerOrnament";
import GoldDivider from "@/components/ui/GoldDivider";
import { JasminePetalShower } from "@/components/ui/JasminePetal";
import { cn } from "@/lib/utils";

/**
 * RSVP — Silk Paper
 *
 * Cultural symbolism:
 * - Ivory background simulates kertas sutera (silk paper) used for
 *   formal Javanese royal invitations (serat undangan).
 * - Gold line inputs: writing instrument pressed lightly on delicate
 *   silk paper — the mark of proper calligraphic tradition.
 * - On success: falling jasmine petals (melati) — sacred in Javanese
 *   weddings, melati flowers are strung as garlands on the couple
 *   and symbolize purity of soul and divine blessing.
 */

export default function RSVP() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [attendanceValue, setAttendance] = useState<"accept" | "decline">("accept");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setTimeout(() => setStatus("success"), 1800);
    };

    return (
        <section
            className="relative py-28 flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#F5EDD8" }}
        >
            {/* Silk paper texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/paper-texture.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "300px",
                    mixBlendMode: "multiply",
                    opacity: 0.25,
                }}
            />
            {/* Very subtle batik overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/batik-pattern.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px",
                    opacity: 0.025,
                    color: "#7A0C0C",
                }}
            />

            <div className="relative z-10 w-full max-w-lg px-6">
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        /* ── Success state with jasmine petals ── */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative text-center"
                        >
                            {/* Jasmine petal shower */}
                            <JasminePetalShower count={16} duration={7} />

                            <div
                                className="relative p-16 overflow-hidden"
                                style={{
                                    border: "1px solid rgba(168,137,58,0.4)",
                                    outline: "1px solid rgba(168,137,58,0.1)",
                                    outlineOffset: "8px",
                                    backgroundColor: "rgba(245,237,216,0.8)",
                                }}
                            >
                                <GoldCornerOrnament position="tl" size={60} opacity={0.5} />
                                <GoldCornerOrnament position="tr" size={60} opacity={0.5} />
                                <GoldCornerOrnament position="bl" size={60} opacity={0.5} />
                                <GoldCornerOrnament position="br" size={60} opacity={0.5} />

                                {/* Gold check icon */}
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                    className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{
                                        background: "linear-gradient(135deg, #C6A75E, #A8893A)",
                                        boxShadow: "0 0 30px rgba(198,167,94,0.3)",
                                    }}
                                >
                                    <Check className="text-[#0D0B09]" size={28} />
                                </motion.div>

                                <h3
                                    className="font-serif text-[#5C3A00] mb-3"
                                    style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 400, letterSpacing: "0.08em" }}
                                >
                                    With Gratitude
                                </h3>

                                <GoldDivider width="w-32" className="my-4" />

                                <p className="font-sans text-[#3A2800]/60 leading-relaxed" style={{ fontSize: "0.88rem" }}>
                                    Dear {name || "Honoured Guest"},
                                </p>
                                <p className="font-serif italic text-[#3A2800]/70 mt-2" style={{ fontSize: "0.92rem" }}>
                                    "We look forward to celebrating this sacred union with you."
                                </p>

                                <p
                                    className="font-noto text-[#7A0C0C]/30 mt-6 select-none"
                                    style={{ fontSize: "1.2rem", letterSpacing: "0.2em" }}
                                >
                                    百年好合
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        /* ── RSVP Form ── */
                        <motion.div
                            key="form"
                            exit={{ opacity: 0, y: -16, transition: { duration: 0.5 } }}
                        >
                            {/* Section header */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-12 space-y-3"
                            >
                                <p
                                    className="font-sans text-[#7A0C0C]/40 uppercase"
                                    style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                                >
                                    Kindly Respond By 1st June, 2026
                                </p>
                                <h2
                                    className="font-serif text-[#5C3A00]"
                                    style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 400, letterSpacing: "0.12em" }}
                                >
                                    R.S.V.P
                                </h2>
                                <GoldDivider width="w-36" />
                            </motion.div>

                            {/* Form card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="relative overflow-hidden"
                                style={{
                                    backgroundColor: "rgba(245,237,216,0.85)",
                                    border: "1px solid rgba(168,137,58,0.35)",
                                    outline: "1px solid rgba(168,137,58,0.1)",
                                    outlineOffset: "8px",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <GoldCornerOrnament position="tl" size={64} opacity={0.5} />
                                <GoldCornerOrnament position="tr" size={64} opacity={0.5} />
                                <GoldCornerOrnament position="bl" size={64} opacity={0.5} />
                                <GoldCornerOrnament position="br" size={64} opacity={0.5} />

                                <form onSubmit={handleSubmit} className="relative z-10 p-10 md:p-14 space-y-10">
                                    {/* Name input */}
                                    <div className="relative pt-5">
                                        <input
                                            type="text"
                                            id="rsvp-name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Full Name"
                                            className="peer input-silk font-serif text-[#1A1510]"
                                        />
                                        <label
                                            htmlFor="rsvp-name"
                                            className="absolute left-0 text-[#8A6020] transition-all duration-300 pointer-events-none font-sans uppercase"
                                            style={{
                                                fontSize: "0.58rem",
                                                letterSpacing: "0.3em",
                                                top: 0,
                                            }}
                                        >
                                            Full Name
                                        </label>
                                    </div>

                                    {/* Attendance selection */}
                                    <div className="space-y-4">
                                        <p
                                            className="font-sans text-[#8A6020]/70 uppercase"
                                            style={{ fontSize: "0.58rem", letterSpacing: "0.3em" }}
                                        >
                                            Will you be attending?
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {[
                                                { value: "accept", label: "Joyfully Accept" },
                                                { value: "decline", label: "Regretfully Decline" },
                                            ].map((opt) => (
                                                <label
                                                    key={opt.value}
                                                    className={cn(
                                                        "flex-1 flex items-center justify-center gap-3 py-3 border cursor-pointer transition-all duration-500 font-serif",
                                                        "hover:border-[#A8893A]/60",
                                                        attendanceValue === opt.value
                                                            ? "border-[#A8893A]/70 bg-[#A8893A]/8 text-[#3A2800]"
                                                            : "border-[#A8893A]/25 text-[#5C3A00]/60"
                                                    )}
                                                    style={{ fontSize: "0.8rem", letterSpacing: "0.08em" }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="attendance"
                                                        value={opt.value}
                                                        checked={attendanceValue === opt.value}
                                                        onChange={() => setAttendance(opt.value as "accept" | "decline")}
                                                        className="sr-only"
                                                    />
                                                    {/* Custom radio dot */}
                                                    <span
                                                        className={cn(
                                                            "w-3 h-3 rounded-full border transition-all duration-300",
                                                            attendanceValue === opt.value
                                                                ? "border-[#A8893A] bg-[#A8893A]"
                                                                : "border-[#A8893A]/40 bg-transparent"
                                                        )}
                                                    />
                                                    {opt.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Guests number input */}
                                    <div className="relative pt-5">
                                        <input
                                            type="number"
                                            id="rsvp-guests"
                                            min={1}
                                            max={2}
                                            defaultValue={1}
                                            placeholder="Guests"
                                            className="peer input-silk font-serif text-[#1A1510] w-24"
                                        />
                                        <label
                                            htmlFor="rsvp-guests"
                                            className="absolute left-0 top-0 font-sans uppercase text-[#8A6020] pointer-events-none"
                                            style={{ fontSize: "0.58rem", letterSpacing: "0.3em" }}
                                        >
                                            Number of Guests
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="btn-royal w-full"
                                        style={{ color: "#5C3A00", borderColor: "rgba(168,137,58,0.55)" }}
                                    >
                                        {status === "submitting" ? "Sending..." : "Confirm Attendance"}
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

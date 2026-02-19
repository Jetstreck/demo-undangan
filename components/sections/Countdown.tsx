"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GoldDivider from "@/components/ui/GoldDivider";

/**
 * Countdown — Luxury Mechanical Clock Face
 *
 * Cultural symbolism:
 * - Circular gold clock face: inspired by both Chinese bronze sundials
 *   and European colonial pocket watches exchanged at Keraton courts.
 * - Four quadrant units displayed as compass rose: a Javanese mandala
 *   (pawukon) time system that reads time as sacred cosmic cycles.
 * - Tick marks ring: 60 marks reference the sexagesimal cycle used
 *   in both Chinese (60-year zodiac) and Javanese (60-day Wuku) calendars.
 */

const TARGET_DATE = new Date("2026-06-20T08:00:00+07:00").getTime();

function useCountdown() {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = TARGET_DATE - Date.now();
            if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
            setTime({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return time;
}

// 60 tick marks on ring
const TICKS = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const isMajor = i % 5 === 0;
    const r = 138;
    const innerR = r - (isMajor ? 10 : 5);
    return {
        x1: 150 + Math.cos(rad) * r,
        y1: 150 + Math.sin(rad) * r,
        x2: 150 + Math.cos(rad) * innerR,
        y2: 150 + Math.sin(rad) * innerR,
        isMajor,
    };
});

interface TimeUnitProps {
    value: number;
    label: string;
    max: number;
}

function TimeUnit({ value, label, max }: TimeUnitProps) {
    const pct = value / max;
    const circumference = 2 * Math.PI * 38;
    const offset = circumference * (1 - pct);

    return (
        <div className="flex flex-col items-center gap-1.5">
            {/* Mini arc behind each unit */}
            <div className="relative w-20 h-20 md:w-24 md:h-24">
                <svg viewBox="0 0 90 90" className="w-full h-full -rotate-90">
                    {/* Background arc */}
                    <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(198,167,94,0.1)" strokeWidth="2" />
                    {/* Progress arc */}
                    <circle
                        cx="45" cy="45" r="38"
                        fill="none"
                        stroke="rgba(198,167,94,0.55)"
                        strokeWidth="1.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="font-serif text-[#C6A75E]"
                        style={{ fontSize: "clamp(1.4rem,4vw,1.9rem)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                    >
                        {String(value).padStart(2, "0")}
                    </span>
                </div>
            </div>
            <span
                className="font-sans text-[#C6A75E]/40 uppercase"
                style={{ fontSize: "0.55rem", letterSpacing: "0.35em" }}
            >
                {label}
            </span>
        </div>
    );
}

export default function Countdown() {
    const { days, hours, minutes, seconds } = useCountdown();

    return (
        <section
            className="relative py-28 flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0E0C0A" }}
        >
            {/* Ambient radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,167,94,0.033) 0%, transparent 70%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0 }}
                className="relative z-10 flex flex-col items-center gap-12"
            >
                {/* Section label */}
                <div className="text-center space-y-3">
                    <p
                        className="font-sans text-[#C6A75E]/35 uppercase"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.45em" }}
                    >
                        Counting the Moment Until Forever
                    </p>
                    <h2
                        className="font-serif text-[#C6A75E]"
                        style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 400, letterSpacing: "0.1em" }}
                    >
                        The Sacred Countdown
                    </h2>
                    <GoldDivider width="w-40" />
                </div>

                {/* Main clock face */}
                <div className="relative flex items-center justify-center">
                    {/* Outer SVG clock ring with 60 tick marks */}
                    <svg
                        viewBox="0 0 300 300"
                        className="absolute"
                        style={{ width: "clamp(280px,55vw,420px)", height: "clamp(280px,55vw,420px)" }}
                    >
                        {/* Outer decorative rings */}
                        <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(198,167,94,0.12)" strokeWidth="0.5" />
                        <circle cx="150" cy="150" r="144" fill="none" stroke="rgba(198,167,94,0.06)" strokeWidth="0.5" />

                        {/* 60 tick marks */}
                        {TICKS.map((t, i) => (
                            <line
                                key={i}
                                x1={t.x1} y1={t.y1}
                                x2={t.x2} y2={t.y2}
                                stroke={t.isMajor ? "rgba(198,167,94,0.5)" : "rgba(198,167,94,0.2)"}
                                strokeWidth={t.isMajor ? 1.2 : 0.7}
                                strokeLinecap="round"
                            />
                        ))}

                        {/* Inner decorative ring */}
                        <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(198,167,94,0.08)" strokeWidth="0.5" />

                        {/* 4 diamond markers at compass points */}
                        {[0, 90, 180, 270].map((deg, i) => {
                            const r = (deg * Math.PI) / 180 - Math.PI / 2;
                            const x = 150 + Math.cos(r) * 128;
                            const y = 150 + Math.sin(r) * 128;
                            return (
                                <polygon
                                    key={i}
                                    points={`${x},${y - 4} ${x + 4},${y} ${x},${y + 4} ${x - 4},${y}`}
                                    fill="rgba(198,167,94,0.4)"
                                />
                            );
                        })}

                        {/* Center dot */}
                        <circle cx="150" cy="150" r="3" fill="rgba(198,167,94,0.5)" />
                    </svg>

                    {/* Time units in 2×2 grid inside clock */}
                    <div className="grid grid-cols-2 gap-6 md:gap-8 relative z-10">
                        <TimeUnit value={days} label="Days" max={365} />
                        <TimeUnit value={hours} label="Hours" max={24} />
                        <TimeUnit value={minutes} label="Minutes" max={60} />
                        <TimeUnit value={seconds} label="Seconds" max={60} />
                    </div>
                </div>

                {/* Target date */}
                <div className="text-center mt-2 space-y-2">
                    <GoldDivider width="w-32" />
                    <p
                        className="font-sans text-[#C6A75E]/35 uppercase"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.35em" }}
                    >
                        Saturday · 20 June 2026 · 08.00 WIB
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

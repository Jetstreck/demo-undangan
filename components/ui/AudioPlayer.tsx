"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * AudioPlayer — Luxury circular audio control
 * Positioned bottom-left, minimal footprint.
 * Shows breathing waveform bars when playing.
 * Exposes window.startAudio() for PreEntry trigger.
 */
export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/audio/background-music.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    const fadeIn = () => {
        if (!audioRef.current) return;
        const interval = setInterval(() => {
            if (audioRef.current && audioRef.current.volume < 0.38) {
                audioRef.current.volume = Math.min(0.4, audioRef.current.volume + 0.03);
            } else {
                clearInterval(interval);
            }
        }, 80);
    };

    const fadeOut = (onDone?: () => void) => {
        if (!audioRef.current) return;
        const interval = setInterval(() => {
            if (audioRef.current && audioRef.current.volume > 0.03) {
                audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.03);
            } else {
                audioRef.current?.pause();
                if (audioRef.current) audioRef.current.volume = 0;
                clearInterval(interval);
                onDone?.();
            }
        }, 80);
    };

    const toggle = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            fadeOut(() => setIsPlaying(false));
        } else {
            audioRef.current.play().catch(() => { });
            setIsPlaying(true);
            fadeIn();
        }
    };

    // Expose global trigger for PreEntry component
    useEffect(() => {
        (window as unknown as Record<string, unknown>).startAudio = () => {
            if (!isPlaying && audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    fadeIn();
                }).catch(() => { });
            }
        };
    }, [isPlaying]);

    return (
        <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className={cn(
                "fixed bottom-7 left-7 z-50 w-11 h-11 rounded-full",
                "border border-[#C6A75E]/30 bg-[#0D0B09]/60 backdrop-blur-md",
                "flex items-center justify-center gap-[3px]",
                "transition-all duration-700 group",
                "hover:border-[#C6A75E]/70 hover:bg-[#0D0B09]/80",
                "hover:shadow-[0_0_20px_rgba(198,167,94,0.2)]",
            )}
        >
            {isPlaying ? (
                /* Waveform bars — 3 bars with staggered animation */
                <>
                    <span className="w-[2px] h-4 bg-[#C6A75E]/80 rounded-full origin-bottom"
                        style={{ animation: "waveBar 1.2s ease-in-out 0s infinite alternate" }} />
                    <span className="w-[2px] h-4 bg-[#C6A75E]/80 rounded-full origin-bottom"
                        style={{ animation: "waveBar 1.2s ease-in-out 0.2s infinite alternate" }} />
                    <span className="w-[2px] h-4 bg-[#C6A75E]/80 rounded-full origin-bottom"
                        style={{ animation: "waveBar 1.2s ease-in-out 0.4s infinite alternate" }} />
                </>
            ) : (
                /* Mute icon — two horizontal bars with a diagonal slash */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6A75E" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5Z" strokeOpacity="0.6" />
                    <line x1="23" y1="9" x2="17" y2="15" strokeOpacity="0.5" />
                    <line x1="17" y1="9" x2="23" y2="15" strokeOpacity="0.5" />
                </svg>
            )}

            {/* Subtle breathing glow ring when playing */}
            {isPlaying && (
                <span
                    className="absolute inset-0 rounded-full border border-[#C6A75E]/20"
                    style={{ animation: "pulse 3s ease-in-out infinite" }}
                />
            )}
        </button>
    );
}

"use client";

import { useState } from "react";
import PreEntry from "@/components/sections/PreEntry";
import GrandGate from "@/components/sections/GrandGate";
import CoupleReveal from "@/components/sections/CoupleReveal";
import HeritagePhilosophy from "@/components/sections/HeritagePhilosophy";
import CeremonyDetails from "@/components/sections/CeremonyDetails";
import Countdown from "@/components/sections/Countdown";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import DigitalGift from "@/components/sections/DigitalGift";
import Closing from "@/components/sections/Closing";
import AudioPlayer from "@/components/ui/AudioPlayer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

/**
 * Page orchestration:
 * 1. PreEntry (fixed overlay) → user clicks "Enter" → hasEntered = true
 * 2. GrandGate (fixed overlay) slides away → isGateOpen = true
 * 3. CoupleReveal receives triggerAnimation=true, runs GSAP name entrance
 * 4. All subsequent sections scroll naturally
 */
export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: "#0D0B09" }}>
      {/* ── Custom Cursor — aktif sejak PreEntry ─────────────── */}
      <CustomCursor />

      {/* ── Phase 1: Invitation Seal ─────────────────────────── */}
      {!hasEntered && (
        <PreEntry onEnter={() => setHasEntered(true)} />
      )}

      {/* ── Phase 2+: Main Experience ────────────────────────── */}
      {hasEntered && (
        <SmoothScrollProvider>
          {/* Global UI */}
          <AudioPlayer />

          {/* ── Phase 2: Gate + Couple Reveal ── */}
          <div className="relative">
            {/* CoupleReveal sits beneath the gate as the first content screen */}
            <CoupleReveal triggerAnimation={isGateOpen} />

            {/* GrandGate is fixed on top until opened */}
            {!isGateOpen && (
              <GrandGate onOpen={() => setIsGateOpen(true)} />
            )}
          </div>

          {/* ── Phase 3: Scroll-based sections ─────────── */}
          <HeritagePhilosophy />
          <CeremonyDetails />
          <Countdown />
          <Gallery />
          <RSVP />
          <DigitalGift />
          <Closing />
        </SmoothScrollProvider>
      )}
    </main>
  );
}

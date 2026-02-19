import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Chinese Imperial Palette ──────────────────────────────
        vermillion: "#7A0C0C",   // Imperial Red — deep, not bright
        "vermillion-deep": "#5C0808", // Darker silk red for backgrounds
        "vermillion-muted": "#3D0808", // Near-black red for card bg

        // ── Javanese Keraton Palette ──────────────────────────────
        "ivory-silk": "#F5EDD8",  // Aged parchment / cream silk
        "ivory-warm": "#EDE5CC",  // Akad card background
        "ivory-faint": "#F9F4EC", // Near-white luxury

        // ── Gold System (4 shades — not yellow, never bright) ─────
        "gold-light": "#E8C97A",  // highlight tip
        "gold": "#C6A75E",  // primary antique gold
        "gold-deep": "#A8893A",  // shadow / depth
        "gold-foil": "#D4AF37",  // moving shimmer peak

        // ── Neutral & Dark ────────────────────────────────────────
        obsidian: "#0D0B09",  // True black with warmth
        "charcoal": "#1A1510",  // Warm dark for gate panels
        "charcoal-red": "#1C0D0D", // Warm dark with red undertone

        // ── Legacy aliases (keep compatibility) ───────────────────
        primary: "#7A0C0C",
        accent: "#C6A75E",
        base: "#F8F1E5",
        dark: "#0D0B09",
      },

      fontFamily: {
        serif: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-lato)", "sans-serif"],
        script: ["var(--font-pinyon)", "cursive"],
        noto: ["var(--font-noto)", "serif"], // For Mandarin/Chinese characters
      },

      fontSize: {
        // Editorial scale — generous and hierarchical
        "display-xl": ["clamp(4rem,10vw,9rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(3rem,7vw,6.5rem)", { lineHeight: "1.0", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem,4vw,3.5rem)", { lineHeight: "1.1", letterSpacing: "0.02em" }],
        "editorial": ["clamp(1rem,1.8vw,1.25rem)", { lineHeight: "1.8", letterSpacing: "0.05em" }],
        "caption": ["0.7rem", { lineHeight: "1.6", letterSpacing: "0.3em" }],
      },

      letterSpacing: {
        "ultra-wide": "0.4em",
        "ceremony": "0.25em",
        "subtitle": "0.15em",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "silk-texture": "url('/images/silk-noise.svg')",

        // Gold foil gradient — moves via CSS animation
        "gold-foil-h": "linear-gradient(105deg, transparent 20%, #E8C97A 40%, #D4AF37 50%, #E8C97A 60%, transparent 80%)",

        // Vignette overlay
        "vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(13,11,9,0.85) 100%)",
      },

      boxShadow: {
        // Emboss effect — light from top-left, dark bottom-right
        "emboss-gold": "1px 1px 0 rgba(232,201,122,0.6), -1px -1px 0 rgba(90,60,10,0.4)",
        "deboss": "inset 2px 2px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.1)",
        // Gold glow for interactive elements
        "glow-gold": "0 0 20px rgba(198,167,94,0.25), 0 0 60px rgba(198,167,94,0.08)",
        "glow-red": "0 0 30px rgba(122,12,12,0.35)",
        // Frame shadow for gallery
        "frame": "4px 4px 0 rgba(0,0,0,0.5), 8px 8px 0 rgba(0,0,0,0.2), 0 20px 60px rgba(0,0,0,0.6)",
        // Royal card
        "royal-card": "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(198,167,94,0.2)",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "pulse-slower": "pulse 7s cubic-bezier(0.4,0,0.6,1) infinite",
        "shimmer": "goldShimmer 3.5s ease-in-out infinite",
        "float-up": "floatUp 0.8s ease-out forwards",
        "petal-fall": "petalFall linear forwards",
        "ring-expand": "ringExpand 4s ease-out infinite",
        "ring-expand-2": "ringExpand 4s ease-out 2s infinite",
        "ink-press": "inkPress 1.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "particle-burst": "particleBurst 1.8s ease-out forwards",
        "ray-sweep": "raySweep 1.5s ease-out forwards",
        "wave-bar-1": "waveBar 1.2s ease-in-out 0s infinite alternate",
        "wave-bar-2": "waveBar 1.2s ease-in-out 0.2s infinite alternate",
        "wave-bar-3": "waveBar 1.2s ease-in-out 0.4s infinite alternate",
        "tick-rotate": "spin 60s linear infinite",
      },

      keyframes: {
        goldShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg) translateX(0)", opacity: "0.9" },
          "100%": { transform: "translateY(110vh) rotate(720deg) translateX(60px)", opacity: "0" },
        },
        ringExpand: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        inkPress: {
          "0%": { transform: "scale(1.15)", opacity: "0", filter: "blur(8px)" },
          "40%": { transform: "scale(0.97)", opacity: "0.9", filter: "blur(0px)" },
          "70%": { transform: "scale(1.01)" },
          "100%": { transform: "scale(1.0)", opacity: "1" },
        },
        particleBurst: {
          "0%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(var(--py)) translateX(var(--px)) scale(0)", opacity: "0" },
        },
        raySweep: {
          "0%": { transform: "scaleY(0)", opacity: "0.7", transformOrigin: "bottom" },
          "60%": { opacity: "0.5" },
          "100%": { transform: "scaleY(1)", opacity: "0", transformOrigin: "bottom" },
        },
        waveBar: {
          "0%": { transform: "scaleY(0.3)" },
          "100%": { transform: "scaleY(1.0)" },
        },
      },

      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.22, 1, 0.36, 1)",
        "gate": "cubic-bezier(0.76, 0, 0.24, 1)",
        "silk": "cubic-bezier(0.37, 0, 0.63, 1)",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

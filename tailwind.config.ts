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
        primary: "#7A0C0C", // Deep Imperial Red
        accent: "#C6A75E", // Antique Gold
        base: "#F8F1E5", // Ivory Silk
        dark: "#111111", // Onyx Black
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-lato)", "sans-serif"],
        script: ["var(--font-pinyon)", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "silk-texture": "url('/images/silk-noise.png')", 
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

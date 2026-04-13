import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        bg: {
          base: "rgb(8, 19, 39)",
          surface: "rgba(11, 23, 48, 0.96)",
          panel: "rgba(18, 32, 54, 0.92)",
          overlay: "rgba(15, 29, 53, 0.6)",
          subtle: "rgba(255, 255, 255, 0.04)",
          hover: "rgba(255, 255, 255, 0.06)",
        },
        teal: {
          DEFAULT: "rgb(45, 235, 120)",
          dim: "rgba(45, 235, 120, 0.15)",
          ring: "rgba(45, 235, 120, 0.3)",
          muted: "rgba(45, 235, 120, 0.6)",
        },
        text: {
          primary: "rgb(241, 245, 249)",
          secondary: "rgb(148, 163, 184)",
          muted: "rgb(100, 116, 139)",
        },
        success: "rgb(74, 222, 128)",
        warning: "rgb(251, 191, 36)",
        danger: "rgb(248, 113, 113)",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          subtle: "rgba(255, 255, 255, 0.04)",
          accent: "rgba(45, 235, 120, 0.3)",
        },
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(45, 235, 120, 0.15)",
        "glow-lg": "0 0 40px rgba(45, 235, 120, 0.1)",
        "glow-xl": "0 0 80px rgba(45, 235, 120, 0.08)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
        "card-lg": "0 8px 40px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-up-delay-1": "slideUp 0.6s ease-out 0.1s forwards",
        "slide-up-delay-2": "slideUp 0.6s ease-out 0.2s forwards",
        "slide-up-delay-3": "slideUp 0.6s ease-out 0.3s forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "grid-move": "gridMove 20s linear infinite",
        "orbit": "orbit 20s linear infinite",
        "orbit-reverse": "orbit 25s linear infinite reverse",
        "count-up": "countUp 2s ease-out forwards",
        "dash": "dash 2s ease-in-out forwards",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "scan-line": "scanLine 4s ease-in-out infinite",
        "data-flow": "dataFlow 3s linear infinite",
        "ticker": "ticker 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        gridMove: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dash: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scanLine: {
          "0%, 100%": { transform: "translateY(-100%)", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "50%": { transform: "translateY(100%)" },
        },
        dataFlow: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

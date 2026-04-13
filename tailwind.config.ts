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
          DEFAULT: "rgb(89, 218, 221)",
          dim: "rgba(89, 218, 221, 0.15)",
          ring: "rgba(89, 218, 221, 0.3)",
          muted: "rgba(89, 218, 221, 0.6)",
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
          accent: "rgba(89, 218, 221, 0.3)",
        },
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(89, 218, 221, 0.15)",
        "glow-lg": "0 0 40px rgba(89, 218, 221, 0.1)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
        "card-lg": "0 8px 40px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FFF0F5",
          100: "#FFD6E7",
          200: "#FFADD0",
          300: "#FF85B8",
          400: "#FF5C9F",
          500: "#E8437F",
          600: "#C42A65",
          700: "#9E154D",
          800: "#780636",
          900: "#520020",
        },
        rose: {
          50: "#FFF5F7",
          100: "#FFECF0",
          200: "#FFD0DC",
          300: "#FFADBF",
          400: "#FF7A97",
          500: "#FF4D74",
          600: "#E6264F",
          700: "#BF0E38",
        },
      },
      fontFamily: {
        sans: [
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "BIZ UDPGothic",
          "Yu Gothic",
          "Meiryo",
          "sans-serif",
        ],
        display: [
          "Hiragino Mincho ProN",
          "Yu Mincho",
          "serif",
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 16px rgba(232, 67, 127, 0.08)",
        "card-hover": "0 8px 32px rgba(232, 67, 127, 0.16)",
        cta: "0 4px 24px rgba(232, 67, 127, 0.32)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

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
        background: "#0a0a0a",
        foreground: "#ffffff",
        google: {
          "blue": "#4285f4",
          "green": "#34a853",
          "yellow": "#fbbc04",
          "red": "#ea4335",
          "blue-light": "#5cdbf6",
          "green-light": "#5cdb6d",
          "yellow-light": "#fdd427",
          "red-light": "#ff7daf",
          "blue-pastel": "#c3ecf6",
          "green-pastel": "#ccf6c5",
          "yellow-pastel": "#ffe7a5",
          "red-pastel": "#f8d8d8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      backgroundImage: {
        "gradient-google-blue":
          "linear-gradient(135deg, #4285f4 0%, #5cdbf6 100%)",
        "gradient-google-green":
          "linear-gradient(135deg, #34a853 0%, #5cdb6d 100%)",
        "gradient-google-yellow":
          "linear-gradient(135deg, #fbbc04 0%, #fdd427 100%)",
        "gradient-google-red":
          "linear-gradient(135deg, #ea4335 0%, #ff7daf 100%)",
        "gradient-champion":
          "linear-gradient(135deg, #fbbc04 0%, #fdd427 100%)",
        "gradient-silver": "linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%)",
        "gradient-bronze": "linear-gradient(135deg, #cd7f32 0%, #b8860b 100%)",
        "gradient-primary": "linear-gradient(135deg, #4285f4 0%, #5cdbf6 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 0.6s ease-in-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(66, 133, 244, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(66, 133, 244, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

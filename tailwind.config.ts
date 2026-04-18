import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0f172a", // slate-900
          light: "#1e293b", // slate-800
          dark: "#020617", // slate-950
        },
        accent: {
          DEFAULT: "#22d3ee", // cyan-400
          light: "#67e8f9", // cyan-300
          dark: "#0891b2", // cyan-600
        },
      },
      backgroundImage: {
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #22d3ee 0%, #0891b2 50%, #22d3ee 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

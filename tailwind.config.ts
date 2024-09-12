import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        salmon: "#fa8072",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": { color: "#fa8072" }, // Start and end with salmon
          "50%": { color: "#38b2ac" }, // Change to teal at 50%
        },
      },
      animation: {
        "smooth-color": "colorChange 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

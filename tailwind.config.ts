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
        background: "#F8E3EA",
        black: "#262626",
        "pink-light": "#EEBDCD",
        "pink-dark": "#DB7194",
      },
    },
  },
  plugins: [],
};
export default config;

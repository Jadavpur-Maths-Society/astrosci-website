import type { Config } from "tailwindcss";

/**
 * AstroSci design tokens — "Deep Field" palette.
 *
 * One hue family (ember / sodium-lamp orange) on near-black warm neutrals.
 * Every default Tailwind colour that used to be blue / cyan / violet / green
 * is remapped into that family, so old markup can never leak a cold accent.
 */

// Warm charcoal neutrals — replaces gray / slate / zinc / stone / neutral
const ink = {
  50: "#f7f4ef",
  100: "#ece7de",
  200: "#d9d3c8",
  300: "#b9b3a7",
  400: "#948d81",
  500: "#736d63",
  600: "#585349",
  700: "#423e37",
  800: "#2a2723",
  900: "#171614",
  950: "#0c0c0b",
};

// The single accent family
const ember = {
  50: "#fff4e9",
  100: "#ffe1c7",
  200: "#ffcea7",
  300: "#ffb173",
  400: "#ff9551",
  500: "#ff7a29",
  600: "#e2600f",
  700: "#b8430a",
  800: "#8a3208",
  900: "#5b2206",
  950: "#2d1003",
};

// Formerly "success green" — now a dusty lamp-amber that still reads distinct
const lamp = {
  50: "#fdf7e8",
  100: "#f7ebc7",
  200: "#ebd59b",
  300: "#dcb96c",
  400: "#c79e46",
  500: "#ad8431",
  600: "#8d6a22",
  700: "#6e521d",
  800: "#523d18",
  900: "#372912",
  950: "#1d1509",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // legacy token names kept so existing markup keeps compiling
        space: "#08080a",
        panel: "#0f0f11",
        border: "#26231f",
        muted: "#ece7de",
        "earth-blue": ember[500],
        "orbit-blue": ember[300],
        "atmos-green": lamp[400],
        "aurora-green": lamp[300],

        white: "#f6f2ea",
        ink,
        ember,
        lamp,

        // hard overrides: no cold hues survive
        gray: ink,
        slate: ink,
        zinc: ink,
        stone: ink,
        neutral: ink,
        blue: ember,
        sky: ember,
        cyan: ember,
        indigo: ember,
        violet: ember,
        purple: ember,
        fuchsia: ember,
        pink: ember,
        emerald: lamp,
        green: lamp,
        teal: lamp,
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica Neue", "Arial", "sans-serif"],
        heading: ["var(--font-display)", "Helvetica Neue", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        // a flatter, more editorial default
        "4xl": "2rem",
      },
      maxWidth: {
        content: "84rem",
      },
      letterSpacing: {
        kicker: "0.28em",
      },
    },
  },
  plugins: [],
};
export default config;

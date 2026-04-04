export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },

      colors: {
        // Primary
        primary: "#3C5661",
        "primary-container": "#546E7A",
        "primary-fixed": "#cbe7f5",
        "primary-fixed-dim": "#afcbd8",
        "on-primary": "#ffffff",
        "on-primary-fixed": "#021f29",
        "on-primary-container": "#d4f0fe",

        // Secondary
        secondary: "#1b6d24",
        "secondary-container": "#a0f399",
        "secondary-fixed": "#a3f69c",
        "secondary-fixed-dim": "#88d982",
        "on-secondary": "#ffffff",
        "on-secondary-fixed": "#002204",
        "on-secondary-container": "#217128",

        // Tertiary
        tertiary: "#a60b15",
        "tertiary-container": "#ca2b2a",
        "tertiary-fixed": "#ffdad6",
        "tertiary-fixed-dim": "#ffb4ac",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#410003",
        "on-tertiary-container": "#ffe6e3",

        // Surface
        surface: "#F3FAFF",
        "surface-low": "#E6F6FF",
        "surface-lowest": "#FFFFFF",
        "surface-dim": "#c3deec",
        "surface-container": "#d8f2ff",
        "surface-container-highest": "#cbe7f5",
        "surface-container-high": "#d1ecfa",
        "surface-container-low": "#e6f6ff",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#cbe7f5",

        // On Surface
        "on-surface": "#021F29",
        "on-surface-variant": "#42484b",

        // Outline
        outline: "#72787b",
        "outline-variant": "#c2c7cb",

        // Error
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",

        // Legacy
        income: "#1B6D24",
        expense: "#BA1A1A",
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },

      boxShadow: {
        soft: "0 12px 32px rgba(2,31,41,0.06)",
      },
    },
  },
  plugins: [],
}
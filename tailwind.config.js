export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3C5661",
        "primary-container": "#546E7A",

        income: "#1B6D24",
        expense: "#BA1A1A",

        surface: "#F3FAFF",
        "surface-low": "#E6F6FF",
        "surface-lowest": "#FFFFFF",

        "on-surface": "#021F29",

        "surface-container-highest": "#cbe7f5",
        "surface-container-low": "#e6f6ff",
        "surface-container-lowest": "#ffffff",

        secondary: "#1b6d24",
        "secondary-container": "#a0f399",

        tertiary: "#a60b15",
        "tertiary-fixed": "#ffdad6",
      },

      borderRadius: {
        md: "12px",
        xl: "24px",
        full: "9999px",
      },

      boxShadow: {
        soft: "0 12px 32px rgba(2,31,41,0.06)",
      },
    },
  },
  plugins: [],
}
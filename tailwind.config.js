/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B5BD6",
          light: "#EEEDFE",
          dark: "#4A49C4",
        },
        accent: {
          red: "#E8593C",
          blue: "#3B8BD4",
          green: "#1D9E75",
          amber: "#EF9F27",
          purple: "#8B7DD4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F7F6FF",
          dark: "#1A1A2E",
          darker: "#16162A",
        },
        border: "rgba(0,0,0,0.08)",
        "border-dark": "rgba(255,255,255,0.08)",
        text: {
          primary: "#1A1A2E",
          secondary: "#6B7280",
          "primary-dark": "#F3F4F6",
          "secondary-dark": "#9CA3AF",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-dark": "0 4px 12px rgba(0,0,0,0.3)",
        dropdown: "0 4px 16px rgba(0,0,0,0.12)",
        modal: "0 20px 60px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        button: "12px",
        card: "20px",
        chip: "999px",
        modal: "24px",
      },
    },
  },
  plugins: [],
};

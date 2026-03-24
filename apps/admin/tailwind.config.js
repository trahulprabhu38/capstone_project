/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#05A049",
        "primary-hover": "#048a3f",
        dark: "#00111B",
        "dark-card": "#001A2C",
        "dark-border": "#002A40",
        mint: "#B4E3C8",
        offwhite: "#FFFFFC",
      },
      fontFamily: {
        title: ["Bricolage Grotesque", "sans-serif"],
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        input: "8px",
      },
    },
  },
  plugins: [],
};

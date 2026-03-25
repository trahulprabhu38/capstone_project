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
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "gradient-x": "gradientX 6s ease infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(5, 160, 73, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(5, 160, 73, 0.35), 0 0 80px rgba(5, 160, 73, 0.1)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};

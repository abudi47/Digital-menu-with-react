/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d6db46",
        secondary: "#f0bb78",
        brown: "#543a14",
        darkBrown: "#131010",
        dimWhite: "rgba(255, 255, 255, 0.7)",
      }
    },
  },
  plugins: [],
}


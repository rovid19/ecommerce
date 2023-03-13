/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        tamna: "#222222",
        orange: "#FA6900",
        gold: "#F8E369",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
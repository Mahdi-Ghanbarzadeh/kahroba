/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "450px": "450px",
      },
    },
  },
  important: "#root",
  plugins: [],
};

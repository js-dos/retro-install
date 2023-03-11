/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./win1x.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

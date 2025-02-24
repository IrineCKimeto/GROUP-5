/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        barcode: ['"Libre Barcode 39 Extended Text"', 'cursive'],
      },
    },
  },
  plugins: [],
}


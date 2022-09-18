
/** @type {import('tailwindcss').Config} */ 
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
      }
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      yellow: colors.yellow,
      indigo: colors.indigo,
      orange: colors.orange,
      red: colors.red,
      teal: colors.teal,
      primary: '#FF432A'
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
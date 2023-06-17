const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bluish: {
          50: '#DEE6FF',
          200: '#545F86',
          400: '#157AF5',
          500: '#0A69CF',
          700: '#14244C',
          800: '#091642',
          900: '#040F2D',
        },
      },
    },
  },
  plugins: [],
}

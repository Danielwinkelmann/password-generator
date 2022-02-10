const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
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
      boxShadow: {
        'orange-shadow': ' inset 0 0 0 0.5rem #ff8800',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}

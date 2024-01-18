/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,html}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      sans: [
        "Public Sans", "sans-serif"
      ],
    },
    extend: {
      colors: {
        'primary': colors.emerald,
        'secondary' : {
          100: '#EFD6FF',
          200: '#C684FF',
          300: '#8E33FF',
          400: '#5119B7',
          500: '#27097A'      
        },
        'info' : {
          100: '#CAFDF5',
          200: '#61F3F3',
          300: '#00B8D9',
          400: '#006C9C',
          500: '#003768'
        },
        'success' : {
          100: '#D3FCD2',
          200: '#77ED8B',
          300: '#22C55E',
          400: '#118D57',
          500: '#065E49'
        },
        'warning' : {
          100: '#FFF5CC',
          200: '#FFD666',
          300: '#FFAB00',
          400: '#B76E00',
          500: '#7A4100'
        },
        'error' : {
          100: '#FFE9D5',
          200: '#FFAC82',
          300: '#FF5630',
          400: '#B71D18',
          500: '#7A0916'
        },
        'gray': {
          100: '#F9FAFB',
          200: '#F4F6F8',
          300: '#DFE3E8',
          400: '#C4CDD5',
          500: '#919EAB',
          600: '#637381',
          700: '#454F5B',
          800: '#212B36',
          900: '#161C24'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


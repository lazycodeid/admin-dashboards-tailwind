/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,html}",
  ],
  darkMode: ['class', '[theme-mode="dark"]'],
  theme: {
    fontFamily: {
      sans: [
        "Public Sans", "sans-serif"
      ],
    },
    extend: {
      colors: {
        'primary': {
          100: 'rgb(var(--lazy-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--lazy-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--lazy-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--lazy-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--lazy-color-primary-500) / <alpha-value>)'
        },
        'success' : {
          100: 'rgb(var(--lazy-color-success-100) / <alpha-value>)',
          200: 'rgb(var(--lazy-color-success-200) / <alpha-value>)',
          300: 'rgb(var(--lazy-color-success-300) / <alpha-value>)',
          400: 'rgb(var(--lazy-color-success-400) / <alpha-value>)',
          500: 'rgb(var(--lazy-color-success-500) / <alpha-value>)'
        },
        'indigo' : {
          100: 'rgb(var(--lazy-color-indigo-100) / <alpha-value>)', 
          200: 'rgb(var(--lazy-color-indigo-200) / <alpha-value>)',
          300: 'rgb(var(--lazy-color-indigo-300) / <alpha-value>)',
          400: 'rgb(var(--lazy-color-indigo-400) / <alpha-value>)',
          500: 'rgb(var(--lazy-color-indigo-500) / <alpha-value>)'
        },
        'info' : {
          100: 'rgb(var(--lazy-color-info-100) / <alpha-value>)',
          200: 'rgb(var(--lazy-color-info-200) / <alpha-value>)',
          300: 'rgb(var(--lazy-color-info-300) / <alpha-value>)',
          400: 'rgb(var(--lazy-color-info-400) / <alpha-value>)',
          500: 'rgb(var(--lazy-color-info-500) / <alpha-value>)'
        },
        'warning' : {
          100: 'rgb(var(--lazy-color-warning-100) / <alpha-value>)',
          200: 'rgb(var(--lazy-color-warning-200) / <alpha-value>)',
          300: 'rgb(var(--lazy-color-warning-300) / <alpha-value>)',
          400: 'rgb(var(--lazy-color-warning-400) / <alpha-value>)',
          500: 'rgb(var(--lazy-color-warning-500) / <alpha-value>)'
        },
        'danger' : {
          100: 'rgb(var(--lazy-color-danger-100) / <alpha-value>)',
          200: 'rgb(var(--lazy-color-danger-200) / <alpha-value>)',
          300: 'rgb(var(--lazy-color-danger-300) / <alpha-value>)',
          400: 'rgb(var(--lazy-color-danger-400) / <alpha-value>)',
          500: 'rgb(var(--lazy-color-danger-500) / <alpha-value>)'
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
    require('@tailwindcss/aspect-ratio'),
  ],
}


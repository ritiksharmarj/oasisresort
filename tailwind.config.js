/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Sono: ['Sono', 'monospace'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'backdrop-color': 'rgb(var(--backdrop-color) / <alpha-value>)',
      brand: {
        50: 'rgb(var(--color-brand-50) / <alpha-value>)',
        100: 'rgb(var(--color-brand-100) / <alpha-value>)',
        200: 'rgb(var(--color-brand-200) / <alpha-value>)',
        500: 'rgb(var(--color-brand-500) / <alpha-value>)',
        600: 'rgb(var(--color-brand-600) / <alpha-value>)',
        700: 'rgb(var(--color-brand-700) / <alpha-value>)',
        800: 'rgb(var(--color-brand-800) / <alpha-value>)',
        900: 'rgb(var(--color-brand-900) / <alpha-value>)',
      },
      gray: {
        0: 'rgb(var(--color-gray-0) / <alpha-value>)',
        50: 'rgb(var(--color-gray-50) / <alpha-value>)',
        100: 'rgb(var(--color-gray-100) / <alpha-value>)',
        200: 'rgb(var(--color-gray-200) / <alpha-value>)',
        300: 'rgb(var(--color-gray-300) / <alpha-value>)',
        400: 'rgb(var(--color-gray-400) / <alpha-value>)',
        500: 'rgb(var(--color-gray-500) / <alpha-value>)',
        600: 'rgb(var(--color-gray-600) / <alpha-value>)',
        700: 'rgb(var(--color-gray-700) / <alpha-value>)',
        800: 'rgb(var(--color-gray-800) / <alpha-value>)',
        900: 'rgb(var(--color-gray-900) / <alpha-value>)',
      },
      blue: {
        100: 'rgb(var(--color-blue-100) / <alpha-value>)',
        700: 'rgb(var(--color-blue-700) / <alpha-value>)',
      },
      green: {
        100: 'rgb(var(--color-green-100) / <alpha-value>)',
        700: 'rgb(var(--color-green-700) / <alpha-value>)',
      },
      yellow: {
        100: 'rgb(var(--color-yellow-100) / <alpha-value>)',
        700: 'rgb(var(--color-yellow-700) / <alpha-value>)',
      },
      silver: {
        100: 'rgb(var(--color-silver-100) / <alpha-value>)',
        700: 'rgb(var(--color-silver-700) / <alpha-value>)',
      },
      indigo: {
        100: 'rgb(var(--color-indigo-100) / <alpha-value>)',
        700: 'rgb(var(--color-indigo-700) / <alpha-value>)',
      },
      red: {
        100: 'rgb(var(--color-red-100) / <alpha-value>)',
        200: 'rgb(var(--color-red-200) / <alpha-value>)',
        600: 'rgb(var(--color-red-600) / <alpha-value>)',
        700: 'rgb(var(--color-red-700) / <alpha-value>)',
        800: 'rgb(var(--color-red-800) / <alpha-value>)',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};

/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'backdrop-color': 'rgba(var(--backdrop-color))',
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
      grey: {
        0: 'rgb(var(--color-grey-0) / <alpha-value>)',
        50: 'rgb(var(--color-grey-50) / <alpha-value>)',
        100: 'rgb(var(--color-grey-100) / <alpha-value>)',
        200: 'rgb(var(--color-grey-200) / <alpha-value>)',
        300: 'rgb(var(--color-grey-300) / <alpha-value>)',
        400: 'rgb(var(--color-grey-400) / <alpha-value>)',
        500: 'rgb(var(--color-grey-500) / <alpha-value>)',
        600: 'rgb(var(--color-grey-600) / <alpha-value>)',
        700: 'rgb(var(--color-grey-700) / <alpha-value>)',
        800: 'rgb(var(--color-grey-800) / <alpha-value>)',
        900: 'rgb(var(--color-grey-900) / <alpha-value>)',
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
        700: 'rgb(var(--color-red-700) / <alpha-value>)',
        800: 'rgb(var(--color-red-800) / <alpha-value>)',
      },
    },
    boxShadow: {
      sm: '0px 1px 2px rgba(0, 0, 0, 0.04)',
      md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
      lg: '0px 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
    },
    borderRadius: {
      tiny: '3px',
      sm: '5px',
      md: '7px',
      lg: '9px',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#003366',
          50:  '#e6edf5',
          100: '#b3c6dc',
          200: '#809fbf',
          300: '#4d78a6',
          400: '#1a518d',
          500: '#003366',
          600: '#002852',
          700: '#001e3d',
          800: '#001429',
          900: '#000a14',
        },
        gold: {
          DEFAULT: '#C9A227',
          50:  '#fdf6e3',
          100: '#faedc0',
          200: '#f5dc8a',
          300: '#efcb54',
          400: '#e8b82e',
          500: '#C9A227',
          600: '#a0811f',
          700: '#786117',
          800: '#50410f',
          900: '#282007',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

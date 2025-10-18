// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'light-bg': '#1E1E1E',
        'dark-border': '#333333',
        'text-primary': '#E0E0E0',
        'text-secondary': '#B3B3B3',
        'accent': {
          DEFAULT: '#00A896',
          hover: '#02C39A',
          light: 'rgba(0, 168, 150, 0.1)',
        },
      },
    },
  },
  plugins: [],
}
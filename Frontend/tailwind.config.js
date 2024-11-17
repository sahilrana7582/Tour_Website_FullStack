/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};

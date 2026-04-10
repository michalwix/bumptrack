/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8A598',
        secondary: '#A8C5A0',
        background: '#FDF6F0',
        card: '#FFF8F5',
        textDark: '#3D2C2C',
        textMedium: '#7A5C5C',
        border: '#F0DED8',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'Kanit', 'Sarabun', 'system-ui', 'sans-serif'],
      },
      colors: {
        ocean: {
          50: '#e5f6ff',
          100: '#cceeff',
          200: '#99dcff',
          300: '#66c9ff',
          400: '#33b7ff',
          500: '#0097e6',
          600: '#0078b4',
          700: '#005a83',
          800: '#003c52',
          900: '#001e21',
        },
      },
    },
  },
  plugins: [],
};

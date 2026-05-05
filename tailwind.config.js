// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#00c2ff', dark: '#0099cc', light: '#e0f7ff' },
        accent:  { DEFAULT: '#ff6b35', dark: '#e5531a' },
        dark:    { 900: '#0a0e1a', 800: '#111827', 700: '#1a1f36', 600: '#252d45' },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.4s ease forwards',
        'fade-in':   'fadeIn 0.3s ease forwards',
        'float':     'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
};
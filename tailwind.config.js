/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf6f0',
          100: '#f9e8d8',
          200: '#f2cba8',
          300: '#e8a96e',
          400: '#dc8040',
          500: '#c96a22',
          600: '#a8511a',
          700: '#8b3f17',
          800: '#703319',
          900: '#5c2b18',
        },
        maroon: {
          50:  '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d8',
          300: '#f4a9b8',
          400: '#ec7591',
          500: '#e0476a',
          600: '#cc2a52',
          700: '#ab1f42',
          800: '#8f1c3c',
          900: '#7a1c38',
          950: '#440c1e',
        },
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d4a017',
          600: '#b8860b',
        },
        ivory: '#fdfaf5',
        cream: '#f9f3e8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      }
    },
  },
  plugins: [],
}

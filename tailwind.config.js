/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lg-custom': '992px',
      },
      colors: {
        // Enchanted Forest — strict palette
        forest: '#094a2f',
        gold: '#AA8D5A',
        'gold-dark': '#8a7045',
        obsidian: '#000000',
        sage: '#CBCBC0',
        // Legacy burgundy keys map to forest theme (gradual migration)
        'burgundy': {
          cream: '#CBCBC0',
          tan: '#AA8D5A',
          wine: '#AA8D5A',
          dark: '#094a2f',
        },
        'wedding': {
          50: '#CBCBC0',
          100: '#b8b8ae',
          200: '#AA8D5A',
          300: '#8a7045',
          400: '#5c4a32',
          500: '#094a2f',
          600: '#084528',
          700: '#073d23',
          800: '#06351e',
          900: '#052d19',
        },
        'rose': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        'gold-amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'midnight-blue': {
          50: '#e6e6f5',
          100: '#cccceb',
          200: '#9999d7',
          300: '#6666c3',
          400: '#3333af',
          500: '#1a1a9b',
          600: '#191970',
          700: '#14155C',
          800: '#0F1047',
          900: '#0A0B33',
        },
        'silver': {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#C0C0C0',
          600: '#9aa0a6',
          700: '#80868b',
          800: '#5f6368',
          900: '#3c4043',
        },
        'dusty-blue': {
          50: '#e8f0f4',
          100: '#d1e1e9',
          200: '#a3c3d3',
          300: '#75a5bd',
          400: '#6B8FA3',
          500: '#5B7A85',
          600: '#4a6670',
          700: '#3a4f58',
          800: '#2a3840',
          900: '#1a2128',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
        'antsvalley': ['Great Vibes', 'cursive'], // Using Great Vibes as fallback for antsvalley
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
} 
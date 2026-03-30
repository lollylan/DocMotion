/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0f1117',
        'bg-card': '#161923',
        'bg-card-2': '#1e2433',
        'accent-green': '#4ade80',
        'accent-lime': '#a3e635',
        'accent-orange': '#fb923c',
        'accent-blue': '#60a5fa',
        'accent-red': '#f87171',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        'float-up': 'floatUp 1s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'bounce-soft': 'bounceSoft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(8deg)' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-60px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSoft: {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

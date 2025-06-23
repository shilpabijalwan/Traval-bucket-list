// tailwind.config.js
export default {
  darkMode: 'class', // enables dark mode with a 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        blob: 'blob 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}


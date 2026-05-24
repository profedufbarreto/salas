/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B'
      },
      fontSize: {
        'display-xl': '4rem',
        'display-lg': '3rem',
        'display-md': '2rem'
      }
    },
  },
  plugins: [],
}
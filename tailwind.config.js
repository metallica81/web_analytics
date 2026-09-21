/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#b70037',
        'primary-hover': '#990032',
        'primary-active': '#81002a',
        'secondary-hover': '#dd0042',
        accent: '#f5f5f5',
        dark: '#1a1a1a',
      },

      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

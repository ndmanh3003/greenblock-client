/** @type {import('tailwindcss').Config} */
// import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gb: '#21BA43'
      },
      backgroundImage: {
        blur: 'linear-gradient(343deg, #EAF6FF 0%, #F3FFE9 100%)'
      }
    }
  },
  plugins: []
}

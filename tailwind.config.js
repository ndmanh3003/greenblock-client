/** @type {import('tailwindcss').Config} */
// import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green1: '#21BA43',
        green2: '#143727'
      },
      backgroundImage: {
        linear1: 'linear-gradient(343deg, #EAF6FF 0%, #F3FFE9 100%)',
        linear2: 'linear-gradient(290deg, #5FB621 0%, #007C30 100%)',
        linear3: 'linear-gradient(290deg, #6fbd37 0%, #198944 100%)'
      }
    }
  },
  plugins: []
}

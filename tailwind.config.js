/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        Green : '#0E9A0E',
        GreenIcon : '#209302',
        GreenLight : '#DDF5C9',
        DarkGrey : '#303030',
        whiteGrey : '#F6F6F6',
        BrightBlue: '#3497F9',
        

      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
      sans:['DM Sans','sans-serif']
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px":"400px"
      },
      colors:{
        'primary':'#2e86de',
        'grey-50':'#f9fafb',
        'grey-200':'#d1d5db',
        'grey-700':'#6b7280',
        'dot':'#666666',
        'secondary':'#ff497c',
        'text-secondary':'#333',
        'background':'#fafafa',
        'primary-red':'#FF4667',
        'border':'#e9ecef'
      }
    },
  },
  plugins: [],
}

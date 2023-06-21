/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {},
    extend: {},
    extend: {
      colors: {
        'montreux-yellow':'#fffe53'
      },
    },
  },
  plugins: [],
};

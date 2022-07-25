/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        "navBar-bg-color" : "rgb(0,18,64)",
        "back_gradient" : "rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
      },
      boxShadow : {
        "5xl" : "0px 2px 6px 0px rgb(0 0 0 / 15%)",
        "6xl" : "rgb(0 0 0 / 10%) 0px 0px 8px 0px",
      }
   
    },
  },
  plugins: [],
}

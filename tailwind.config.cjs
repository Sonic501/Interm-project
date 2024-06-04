/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        fresher: "#2D3748",
        intern: "#285D9A",
        "offline-free-fresher": "#2F913F",
        "online-free-fresher": "#D55B13",
      },
      flexBasis: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};

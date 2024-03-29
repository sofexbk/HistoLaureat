/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '30%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
    screens: {
      'sm': {'max': '639px'},
      'lg': {'min': '930px'},
      'lgg': {'max': '930px'},
      
    },
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        aliceblue: {
          "100": "#eff9ff",
          "200": "#e4f5ff",
          "300": "#dbf2ff",
        },
        steelblue: {
          "100": "#017cc5",
          "200": "#00588c",
        },
        white: "#fff",
        dimgray: {
          "100": "#666",
          "200": "rgba(102, 102, 102, 0.6)",
          "300": "rgba(102, 102, 102, 0.8)",
          "400": "rgba(102, 102, 102, 0.35)",
        },
        crimson: "#ee1d52",
        gray: "#111",
        darkslategray: "#333",
        black: "#000",
        darkgray: "#adadad",
        mediumseagreen: "#1fcb8b",
        gainsboro: "#d9d9d9",
      },
      spacing: {},
      fontFamily: {
        montserrat: "Montserrat",
        poppins: "Poppins",
        avenir: "Avenir",
      },
      borderRadius: {
        "8xs": "5px",
        mini: "15px",
        xl: "20px",
        "3xs": "10px",
        "21xl": "40px",
      },
      fontSize: {
        xl: "20px",
        "21xl": "40px",
        lg: "18px",
        base: "16px",
        sm: "14px",
        smi: "13px",
        "5xl": "24px",
        xs: "12px",
        inherit: "inherit",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs"),
  require('tailwindcss'),
  require('autoprefixer'),],
  corePlugins: {
    preflight: false,
  },
};

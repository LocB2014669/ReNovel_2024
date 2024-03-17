/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: "#a138b4",
        primary: "#1565D8",
        darkest: "#25253d",
        dark: {
          light: "#5A7184",
          hard: "#0D2436",
          soft: "#183B56",
        },
      },
      fontFamily: {
        montserrat: ["'Montserrat'", "sans-serif"],
        opensans: ["'Open Sans'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"),],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light", "dark"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
};

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.js", "./src/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "60vh": "60vh",
        "40vh": "40vh",
        "30vh": "30vh",
        "50vh": "50vh",
        "70vh": "70vh"
      },
      width: {
        102: "30rem"
      },
      screens: {
        minimobile: "500px"
      },
      maxWidth: {
        "90%": "90%"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

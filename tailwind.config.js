/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#00215B",
        red: "#CA161C",
        accent: "#D4DDEE",
        textGray: "#F2F3F5",
        darkBlue: "#2C60C9",
      },
    },
  },
  plugins: [],
};

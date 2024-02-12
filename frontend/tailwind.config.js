/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"], //specify type of file in which we want to apply tailwind
  theme: {
    extend: {},
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};

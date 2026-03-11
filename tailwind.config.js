/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#f8f4ec",
          clay: "#c9a67a",
          forest: "#1f3b2f",
        },
      },
    },
  },
  plugins: [],
};

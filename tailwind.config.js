/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#fbf6f1",
          mist: "#f7efe8",
          petal: "#f3e9e5",
          blush: "#e7d4cd",
          clay: "#c79d79",
          gold: "#b48a57",
          forest: "#223127",
          sage: "#677364",
          ink: "#18211b",
        },
      },
    },
  },
  plugins: [],
};

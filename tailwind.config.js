/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        whitebrand: "#F5F5F5",
        bluebrand: "#3498DB",
        darkbluebrand: "#2C3E50",
        greenbrand: "#27AE60",
      },
    },
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      "314px": "314px",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      8: "8px",
    },
    extend: {
      colors: {
        "Light-Blue": "#EEF4FF",
        "Light-Gray": "#F9F9F9",
        "Light-Black": "#1F1F1F",
        "Darker-Blue": "#1561FD",
      },
      fontFamily: {
        Roboto: ["Prompt", "sans-serif"],
      },
      width: {
        "11/20": "45%",
      },
    },
  },
  plugins: [],
};

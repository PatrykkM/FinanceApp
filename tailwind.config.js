/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      lg: "1024px",
      xl: "1280px",
      xxxl: "1730px",
    },
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
      margin: {
        "3px": "3px",
      },
      colors: {
        "Light-Blue": "#EEF4FF",
        "Light-Gray": "#F9F9F9",
        "Light-Black": "#1F1F1F",
        "Light-Black": "#1F1F1F",
        "Darker-Black": "#0D0D0D",
        "Darker-Blue": "#1561FD",
        "Darker-White": "#F2F3F6",
      },
      fontFamily: {
        Roboto: ["Prompt", "sans-serif"],
      },
      width: {
        "11/20": "45%",
        "9/10": "90%",
        TradingPageWidth: "100%-64rem",
      },
      height: {
        160: "40rem",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
};

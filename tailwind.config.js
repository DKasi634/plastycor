/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "rgb(25, 122, 60)",
        "green-variant": "rgb(25, 140, 70)",
        "green-secondary": "rgb(25, 122, 60, 0.8)",
        "green-transparent": "rgb(25, 122, 60, 0.1)",
        blue: "rgb(36, 87, 230)",
        "blue-variant": "rgb(30, 80, 250)",
        "blue-secondary": "rgb(36, 87, 230, 0.8)",
        "blue-transparent": "rgb(36, 87, 230, 0.1)",
        yellow: "rgb(234, 247, 20)",
        "yellow-variant": "rgb(230, 240, 30)",
        "yellow-secondary": "rgb(230, 240, 30, 0.8)",
        "yellow-transparent": "rgb(234, 247, 20, 0.2)",

        light: "rgb(253, 253, 253)",
        "light-variant": "rgb(253, 253, 253, 0.8)",
        "light-transparent": "rgba(255, 255, 255, 0.1)",
        gray: "rgb(143, 143, 143)",
        "gray-transparent": "rgba(143, 143, 143, 0.2)",
        dark: "rgb(36, 36, 36)",
        "dark-variant": "rgb(52, 50, 51, 0.5)",
        "dark-transparent": "rgba(36, 36, 36, 0.2)",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};

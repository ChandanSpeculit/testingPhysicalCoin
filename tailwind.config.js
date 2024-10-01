/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "4xl": "2.25rem", // Example size, adjust as needed
        "5xl": "3rem", // Example size, adjust as needed
        "6xl": "4rem", // Example size, adjust as needed
        // Add more sizes as needed
      },

      spacing: {
        128: "32rem", // Example size, adjust as needed
        144: "36rem", // Example size, adjust as needed
        // Add more sizes as needed
      },

      borderRadius: {
        "4xl": "2rem", // Example size, adjust as needed
        // Add more sizes as needed
      },

      colors: {
        darkBlue: "#05226B",
        grey: "#f4f4f4",
        placeholderblack: "#333",
        lightGrey:"#f2f2f2",
        newDarkBlue: "#0d273e",
        newLightBlue: "#1C3446",
        newDarkGold: "#E2AD5E",
        newLightGold: "#F9D387",
      },
      fontFamily: {
        poppins: [
          '"Poppins", sans-serif',
          
        ],

        sans: [
          '"Inter var", sans-serif',
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32',
          },
        ],
      },
    },
  },
  plugins: [],
};



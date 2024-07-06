/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rlight: ["Roboto-Light", "sans-serif"],
        Rregular: ["Roboto-Regular", "sans-serif"],
        Rmedium: ["Roboto-Medium", "sans-serif"],
        Rmediumitalic: ["Roboto-MediumItalic", "sans-serif"],
        Rbold: ["Roboto-Bold", "sans-serif"],
        Rbolditalic: ["Roboto-BoldItalic", "sans-serif"],
      },

      colors: {
        primary: {
          white: '#FFFFFF',
          black: '#0A0A0A',
          red: '#FF0000',
        },
        dark: {
          black: {
            100: '#ECECEC',
            200: '#CECECE',
            300: '#9D9D9D',
            400: '#6C6C6C',
            500: '#3B3B3B',
            600: '#0F0F0F',
          },
          red: {
            100: '#CD0000',
            200: '#9A0000',
            300: '#680000',
            400: '#350000',
          }
        },
        light: {
          red: {
            100: '#FFCACA',
            200: '#FF9797',
            300: '#FF6565',
            400: '#FF3232',
          }
        }
      }
    },
  },
  plugins: [],
}


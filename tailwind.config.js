/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dim"],
          "base-100": "#111827",
          ".bg-card": {
            "background-color": "#1f2937"
          }
        }
      }
    ]
  }
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
    "./src/",
    './node_modules/tw-elements-react/dist/js/*/.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


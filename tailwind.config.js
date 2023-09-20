const config = require("./src/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
}


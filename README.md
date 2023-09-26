# Velcure UI

Take a look at our Storybook.

## Getting Started

Velcure can be easily integrated into your project through NPM. Simply run the following command:

```bash
npm install @velcure/velcure-ui framer-motion
npm --save-dev install tailwindcss
```


Update your `tailwind.config.js` file to include the following:

```js
const velcurePlugin = require("@velcure/ui/theme");

module.exports = {
  content: [
    "./node_modules/@velcure/ui/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [velcurePlugin()],
}
```

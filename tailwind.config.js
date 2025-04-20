const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'apps/**/*.{html,ts}'), // detecta en todas las apps
    join(__dirname, 'libs/**/*.{html,ts}'), // detecta en todas las libs
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

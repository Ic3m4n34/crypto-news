/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // eslint-disable-line global-require
    require('@tailwindcss/typography'), // eslint-disable-line global-require
  ],
};

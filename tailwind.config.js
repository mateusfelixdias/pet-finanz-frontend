/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1d21',
        secondary: '#212529',
        gray: {
          100: '#ced4da',
          200: '#2f343a',
        },
      },
    },
    screens: {
      sm: { min: '260px', max: '640px' },
      md: { min: '640px', max: '900px' },
      lg: { min: '900px', max: '1180px' },
    },
  },
};

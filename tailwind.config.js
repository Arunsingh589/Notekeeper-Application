/* Add to your tailwind.config.js if needed */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C6EF5', // A custom primary color
        secondary: '#FFD700', // Custom yellow for pinned notes
      },
      spacing: {
        128: '32rem', // Custom spacing for larger layout
      },
    },
  },
  plugins: [],
};

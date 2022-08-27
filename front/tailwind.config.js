/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        greenBJ: "#09783B",
      },
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/assets/fundo-game.png')",
      }),
    },
  },
  plugins: [],
};

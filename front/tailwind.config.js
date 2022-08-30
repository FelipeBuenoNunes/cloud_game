/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        greenBJ: "#09783B",
      },
      backgroundImage: {
        boardMobile: "url('assets/bg-game-mobile.png')",
        boardDesktop: "url('assets/bg-game-desktop.png')",
        baseCard: "url('assets/bg-card.png')",
        baseBackCard: "url('assets/bg-back-card.png')",
      },
    },
  },
  plugins: [],
};

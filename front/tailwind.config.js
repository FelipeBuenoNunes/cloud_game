/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        BJgreen01: "#09783B",
        BJgreen02: "#038F13",
        BJgreen03: "#288507",
        BJgreen04: "#419356",
        BJblue01: "#037785",
        BJblue02: "#038F70",
        BJbrown: "#440e0b",
        BJblack: "#222",
        BJwhite: "#eee",
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

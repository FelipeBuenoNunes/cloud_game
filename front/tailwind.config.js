/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      // fontFamily: {
      //   Poppins: ["Poppins", "sans-serif", ...defaultTheme.fontFamily.sans],
      // },
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
        NTblack: "#00010D",
        NTblue: "#739CBF",
        NTblueLight: "#BDD9F2",
        NTgreen: "#4F5902",
        NTgreenDark: "#252617",

      },
      backgroundImage: {
        boardMobile: "url('assets/bg-game-mobile.png')",
        boardDesktop: "url('assets/bg-game-desktop.png')",
        baseCard: "url('assets/bg-card.png')",
        baseBackCard: "url('assets/bg-back-card.png')",
        table02: "url('assets/table-02.png)",
        table03: "url('assets/table-03.png)",
        table04: "url('assets/table-04.png)",
        bgTop: "url('assets/bg-top.png')",
        bgMeio: "url('assets/bg-meio.png')",
        bgBig: "url('assets/bg-big.png')",
      },
    },
  },
  plugins: [],
};

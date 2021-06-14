export default {
  colors: {
    text: "#E3E3E3",
    background: "#080909",
    primary: "#FCB33D",
    secondary: "#D6E4DC",
    accent: "#FBCED3",
    gradient:
      "linear-gradient(270deg, #FBCED3 6.44%, #D6E4DC 63.07%, #FCB33D 126.63%)",
  },
  fonts: {
    body: '"Sora","system-ui, sans-serif"',
    heading: '"Sora", "Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [
    "1.4rem",
    "1.6rem",
    "2rem",
    "2.4rem",
    "2.8rem",
    "4rem",
    "4.4rem",
    "5.6rem",
  ],
  fontWeights: {
    body: 300,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 2,
    heading1: 1.1818,
    heading2: 1.2,
    heading3: 1.1428,
    heading4: 1.3333,
    heading5: 1.1418,
  },
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 160, 240],
  breakpoints: [],

  // variant group
  layout: {
    maxWidth: { maxWidth: 960, mx: `auto` },
    nav: { variant: "layout.maxWidth", p: 6 },
    hero: {},
    section: {},
  },
  grids: {
    article: {},
  },
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "bold",
    },
    navLink: {
      variant: "text.heading",
      fontWeight: 700,
      fontSize: 0,
      px: 1,
    },
  },
  links: {
    nav: {
      variant: "text.navLink",
      cursor: "pointer",
    },
  },
  buttons: {
    primary: {},
    icon: {},
    menu: {},
  },

  // styles
  useRootStyles: true,
  styles: {
    root: {
      fontSize: "62.5%",
      fontFamily: "body",
      fontWeight: "body",
    },
  },
  a: {
    cursor: "pointer",
  },
};

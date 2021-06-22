import { transparentize } from "@theme-ui/color";
const theme = {
  colors: {
    text: "#E3E3E3",
    background: "#080909",
    primary: "#FCB33D",
    secondary: "#D6E4DC",
    accent: "#FBCED3",
    gradient:
      "linear-gradient(270deg, #FBCED3 6.44%, #D6E4DC 63.07%, #FCB33D 126.63%)",
    secondaryText: "#BDBEC1",
    altText: "#777980",
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
    body: 200,
    heading: 400,
    bold: 600,
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
  breakpoints: ["600px", "960px", "1300px"],

  // variant group
  layout: {
    maxWidth: { maxWidth: 1040, mx: `auto` },
    nav: {
      variant: "layout.maxWidth",
      p: [4, 6],
    },
    hero: {
      variant: "layout.maxWidth",
      height: `calc(100vh - 106px)`,
      maxHeight: 800,
      p: [4, 6],
    },
    text: {
      maxWidth: 720,
      mx: `auto`,
      p: [4, 6],
      py: 10,
      my: [10, 12],
    },
    section: {
      variant: "layout.maxWidth",
      px: [4, 6],
      my: [10, 12],
    },
  },
  grids: {
    article: {
      gridTemplateColumns: "auto minmax(auto, 720px) auto",
    },
  },
  text: {
    caps: {
      textTransform: "uppercase",
      fontSize: 0,
      fontWeight: 400,
      lineHeight: "heading5",
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
    },
    navLink: {
      variant: "text.heading",
      fontSize: 0,
      fontWeight: 700,
      px: 1,
      color: "secondaryText",
      display: "flex",
      alignItems: "center",
    },
    body: {
      fontWeight: "body",
      lineHeight: "body",
    },
  },
  links: {
    nav: {
      variant: "text.navLink",
      cursor: "pointer",
    },
  },
  buttons: {
    primary: {
      fontWeight: "bold",
      fontSize: 2,
      lineHeight: "body",
      color: "text",
      backgroundColor: transparentize("altText", 0.9),
      p: 2,
      width: `100%`,
      borderRadius: 5,
      cursor: "pointer",
      svg: {
        verticalAlign: "-3px",
        mr: 2,
      },
    },
    icon: {},
    menu: {},
    hero: {
      variant: "text.caps",
      color: "altText",
      cursor: "pointer",
    },
  },

  // styles
  useRootStyles: true,
  styles: {
    root: {
      fontSize: "62.5%",
      fontFamily: "body",
      fontWeight: "body",
    },
    p: {
      variant: "text.body",
      fontSize: [1, 2],
      color: "secondaryText",
      my: 4,
    },
    a: {
      textDecoration: "underline",
      color: "secondaryText",
      cursor: "pointer",
    },
    img: {
      borderRadius: 15,
    },
    li: {
      variant: "text.body",
      fontSize: [1, 2],
      color: "secondaryText",
      pl: 2,
    },
    ul: {
      pl: 4,
      my: 4,
      listStyle: `url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 4 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='12' width='4' height='4' fill='%23BDBEC1'/%3E%3C/svg%3E%0A")`,
    },
    ol: {
      pl: 4,
      my: 4,
    },
    blockquote: {
      backgroundColor: transparentize("altText", 0.8),
      m: 0,
      px: 5,
      p: { fontWeight: 400, py: 3 },
      position: "relative",
      "::before": {
        content: "''",
        width: 4,
        height: `100%`,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: transparentize("primary", 0.1),
      },
    },
    em: {
      fontSize: [2, 4],
    },
    h1: {
      variant: "text.heading",
      fontSize: [4, 6],
      lineHeight: "heading1",
    },
    h2: {
      variant: "text.heading",
      fontSize: [3, 5],
      lineHeight: "heading2",
      mt: 9,
      mb: 5,
      a: { color: "text" },
    },
    h3: {
      variant: "text.heading",
      fontSize: [2, 4],
      lineHeight: "heading3",
      mt: 8,
      mb: 4,
    },
    h4: {
      variant: "text.heading",
      fontSize: 3,
      color: "altText",
      m: 0,
      mb: 8,
      ml: -16,
    },
  },
};

export default theme;

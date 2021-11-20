import { globalCss } from "../stitches.config";

export const globalStyles = globalCss({
  "@font-face": {
    fontFamily: "Sora",
    src: 'url("/fonts/Sora[wght].woff2") format("woff2")',
    fontDisplay: "block",
    fontStyle: "normal",
    fontWeight: "200 800",
  },

  html: {
    backgroundColor: "$black",
  },

  body: {
    backgroundColor: "$black",
    color: "$white",
    fontFamily: "$sans",
    fontWeight: 200,
    margin: 0,
  },

  figure: { margin: 0 },

  svg: { display: "inline-block", verticalAlign: "middle" },

  "::selection": { backgroundColor: "$black", color: "$yellow" },
});

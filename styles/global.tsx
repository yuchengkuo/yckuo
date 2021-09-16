import { globalCss } from "../stitches.config";

export const globalStyles = globalCss({
  "@import": "../public/font/font.css",

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

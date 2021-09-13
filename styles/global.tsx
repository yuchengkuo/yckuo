import { globalCss } from "../stitches.config";

export const globalStyles = globalCss({
  "@import": "../public/font/font.css",

  body: {
    backgroundColor: "$black",
    color: "$white",
    fontFamily: "$sans",
    margin: 0,
  },

  figure: { margin: 0 },

  svg: { display: "inline-block", verticalAlign: "middle" },

  "::selection": { backgroundColor: "$yellow", color: "$black" },
});

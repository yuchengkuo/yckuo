import { CSS, css } from "stitches.config";

const _text = css({
  boxSizing: "border-box",
  m: 0,
  p: 0,
  fontFamily: "$sans",

  variants: {
    size: {
      1: {
        fontSize: "12px",
        lineHeight: "12px",
      },
      2: {
        fontSize: "14px",
        lineHeight: "16px",
      },
      3: {
        fontSize: "16px",
        lineHeight: "32px",
      },
      4: {
        fontSize: "18px",
        lineHeight: "24px",
      },
      5: {
        fontSize: "20px",
        lineHeight: "40px",
      },
      6: {
        fontSize: "20px",
        lineHeight: "24px",
      },
      7: {
        fontSize: "28px",
        lineHeight: "32px",
      },
      8: {
        fontSize: "40px",
        lineHeight: "48px",
      },
      9: {
        fontSize: "44px",
        lineHeight: "52px",
      },
    },
    variant: {
      heading: {
        fontFamily: "$sans",
      },
      h1: {
        fontSize: "64px",
        lineHeight: "72px",
      },
    },
  },
});

export const text = (css: CSS) => _text({ css });

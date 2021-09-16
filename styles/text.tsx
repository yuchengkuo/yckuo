import { css } from "stitches.config";

export const text = css({
  boxSizing: "border-box",
  m: 0,
  p: 0,
  fontFamily: "$sans",

  variants: {
    variant: {
      sectionTitle: {
        fontSize: "$6",
        fontWeight: 400,
        lineHeight: 1.6,
        color: "$gray2",
        position: "relative",
        mb: "$7",
        "&:before": {
          content: "//",
          position: "absolute",
          top: 0,
          left: -24,
        },
      },
    },
    size: {
      xs: {
        fontSize: "$1",
        lineHeight: "$1",
      },
      sm: {
        fontSize: "$2",
        lineHeight: "$2",
      },
      base: {
        fontSize: "$3",
        lineHeight: "$3",
      },
      me: {
        fontSize: "$4",
        lineHeight: "$4",
      },
      lg: {
        fontSize: "$5",
        lineHeight: "$5",
      },
      xl: {
        fontSize: "$6",
        lineHeight: "$6",
      },
      "2xl": {
        fontSize: "$7",
        lineHeight: "$7",
      },
      "3xl": {
        fontSize: "$8",
        lineHeight: "$8",
      },
      "4xl": {
        fontSize: "$9",
        lineHeight: "$9",
      },
      "5xl": {
        fontSize: "$10",
        lineHeight: "$10",
      },
      "6xl": {
        fontSize: "$11",
        lineHeight: "$11",
      },
    },
    article: {
      h1: {
        fontWeight: 400,
        fontSize: "28px",
        lineHeight: 1.1818,
        "@bp1": { fontSize: "40px" },
      },
      h2: {
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: 1.2,
        "@bp1": { fontSize: "32px" },
        mt: "$10",
        mb: "$6",
      },
      h3: {
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: 1.1428,
        "@bp1": { fontSize: "28px" },
        mt: "$9",
        mb: "$5",
      },
      h4: {
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: 1.3333,
        color: "$gray3",
        mb: "$9",
      },
      p: {
        fontSize: "16px",
        lineHeight: 2,
        "@bp1": { fontSize: "20px" },
        color: "$gray1",
        my: "$5",
      },
      li: {
        fontSize: "16px",
        lineHeight: 1.6,
        "@bp1": { fontSize: "20px" },
        color: "$gray1",
        pl: "$2",
        my: "$2",
      },
    },
  },
});

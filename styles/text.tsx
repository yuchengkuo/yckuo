import { css } from "stitches.config";

export const text = css({
  boxSizing: "border-box",
  fontFamily: "$sans",
  // fontWeight: 400,
  // lineHeight: 1,
  m: 0,
  p: 0,

  variants: {
    size: {
      1: { fontSize: "$1" },
      2: { fontSize: "$2" },
      3: { fontSize: "$3" },
      4: { fontSize: "$4" },
      5: { fontSize: "$5" },
      6: { fontSize: "$6" },
      7: { fontSize: "$7" },
      8: { fontSize: "$8" },
      9: { fontSize: "$9" },
      10: { fontSize: "$10" },
      11: { fontSize: "$11" },
    },
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
          left: -20,
        },
      },
      heading: {
        fontFamily: "$heading",
        fontWeight: 500,
        fontFeatureSettings: "'ss02' on, 'ss04' on, 'ss05' on",
      },
      paragraph: {
        fontFamily: "$text",
        fontWeight: 400,
        fontFeatureSettings: "'ss02' on, 'ss03' on",
      },
    },
    mdx: {
      h1: {
        fontFamily: "$heading",
        fontSize: "$10",
        fontWeight: 500,
        lineHeight: 1.125,
        fontFeatureSettings: "'ss02' on, 'ss04' on, 'ss05' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
      },
      h2: {
        fontFamily: "$heading",
        fontSize: "$9",
        fontWeight: 500,
        lineHeight: 1.2,
        fontFeatureSettings: "'ss02' on, 'ss04' on, 'ss05' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
      },
      h3: {
        fontFamily: "$heading",
        fontSize: "$8",
        fontWeight: 500,
        lineHeight: 1.2,
        fontFeatureSettings: "'ss02' on, 'ss04' on, 'ss05' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
      },
      h4: {
        fontFamily: "$heading",
        fontSize: "$7",
        fontWeight: 500,
        lineHeight: 1.25,
        fontFeatureSettings: "'ss02' on, 'ss04' on, 'ss05' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
      },
      h5: {
        fontFamily: "$heading",
        fontSize: "$6",
        fontWeight: 500,
        lineHeight: 1.25,
        fontFeatureSettings: "'ss02' on, 'ss04' on, 'ss05' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
      },
      paragraph: {
        fontFamily: "$text",
        fontSize: "$5",
        fontWeight: 400,
        lineHeight: 2,
        fontFeatureSettings: "'ss02' on, 'ss03' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
      },
      caption: {
        fontFamily: "$text",
        fontSize: "$2",
        fontWeight: 500,
        lineHeight: "16px",
        fontFeatureSettings: "'ss02' on, 'ss03' on",
        "@tablet": { fontSize: "" },
        "@phone": { fontSize: "" },
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
        "@bp1": { fontSize: "36px" },
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
        lineHeight: 2.2,
        "@bp1": { fontSize: "20px" },
        color: "$gray1",
        my: "$5",
      },
      li: {
        fontSize: "16px",
        lineHeight: 1.8,
        "@bp1": { fontSize: "20px" },
        color: "$gray1",
        pl: "$2",
        my: "$3",
      },
    },
  },
});

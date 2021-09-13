import { css } from "../stitches.config";

export const layout = css({
  $$maxWidth: "1040px",
  $$textWidth: "720px",
  mx: "auto",
  p: "$4",
  "@bp1": {
    p: "$6",
  },
  variants: {
    variant: {
      header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "$$maxWidth",
        "@bp1": { flexDirection: "row", alignItems: "unset" },
      },
      section: {
        maxWidth: "$$maxWidth",
        my: "$10",
        "@bp1": { my: "$12" },
      },
      hero: {
        maxWidth: "$$maxWidth",
        height: "calc(100vh - 106px)",
        minHeight: 800,
        maxHeight: 960,
      },
    },
  },
});

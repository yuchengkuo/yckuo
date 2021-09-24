import { css } from "../stitches.config";

export const layout = css({
  boxSizing: "border-box",
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
      footer: {
        maxWidth: "$$maxWidth",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        mb: "$8",
        "&::before": {
          position: "absolute",
          content: "''",
          height: 1,
          width: `calc(100% - 80px)`,
          top: 0,
          left: 40,
          backgroundColor: "$gray3",
        },
      },
      section: {
        maxWidth: "$$maxWidth",
        my: "$10",
        "@bp1": { my: "$12" },
      },
      text: {
        maxWidth: "$$textWidth",
        my: "$10",
        "@bp1": { my: "$12" },
      },
      hero: {
        maxWidth: "$$maxWidth",
        height: "calc(100vh - 106px)",
        minHeight: 800,
        maxHeight: 960,
      },
      article: {
        display: "unset",
        gridTemplateColumns: "auto minmax(auto, 720px) auto",
        gap: 0,
        "@bp1": { display: "grid" },
      },
    },
  },
});

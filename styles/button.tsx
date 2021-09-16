import { css } from "stitches.config";

export const button = css({
  boxSizing: "border-box",
  display: "inline-block",
  appearance: "none",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center",

  variants: {
    variant: {
      primary: {
        fontWeight: 600,
        fontSize: "$5",
        lineHeight: 2,
        color: "$gray1000",
        p: "$2",
        width: "100%",
        borderRadius: 5,
        backgroundColor: "$gray100",
        "& svg": { verticalAlign: "-3px", mr: "$2" },
      },
      secondary: {
        fontSize: "$2",
        fontWeight: 400,
        textTransform: "uppercase",
        color: "$gray1",
        width: "100%",
        p: "$2",
        backgroundColor: "transparent",
      },
    },
  },
});

import { css } from "stitches.config";

export const link = css({
  boxSizing: "border-box",
  fontFamily: "$sans",
  textDecoration: "none",
  transition: "all 200ms ease-out",
  p: 0,
  color: "$gray1",

  "&:hover": {
    color: "$white",
  },

  "&:focus": {},

  variants: {
    variant: {
      navLink: {
        textDecoration: "none",
        fontSize: "$2",
        fontWeight: 600,
        lineHeight: "16px",
        px: "$1",
        display: "flex",
        alignItems: "center",
      },
    },
    underline: {
      true: { textDecorationLine: "underline" },
    },
    focus: {
      true: { "&:focus": { outline: "$green solid 1.6px", borderRadius: 4 } },
    },
  },
});

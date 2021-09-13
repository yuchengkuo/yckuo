import { css } from "stitches.config";

export const link = css({
  boxSizing: "border-box",
  fontFamily: "$sans",
  textDecoration: "none",
  transition: "all 200ms ease-out",
  p: 0,

  "&:hover": {
    color: "$white",
  },

  variants: {
    variant: {
      navLink: {
        fontSize: "$2",
        fontWeight: 600,
        lineHeight: "16px",
        color: "$gray1",
        px: "$1",
        display: "flex",
        alignItems: "center",
      },
    },
  },
});

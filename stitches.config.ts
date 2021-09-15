import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

export const { styled, css, globalCss, theme, config } = createStitches({
  theme: {
    colors: {
      black: "rgba(8, 9, 9, 1)",
      white: "rgba(227, 227, 227, 1)",
      yellow: "rgba(252, 179, 61, 1)",
      pink: "rgba(251, 206, 211, 1)",
      green: "rgba(214, 228, 220, 1)",
      gray1: "rgb(189, 190, 193)",
      gray2: "rgb(119, 121, 128)",
      gray3: "rgba(227, 227, 227, 0.3)",
      gray4: "rgba(227, 227, 227, 0.05)",
    },
    fonts: {
      sans: "Sora, system-ui",
      serif: "",
      mono: "",
    },
    fontSizes: {
      1: "12px",
      2: "14px",
      3: "16px",
      4: "18px",
      5: "20px",
      6: "24px",
      7: "32px",
      8: "40px",
      9: "64px",
    },
    fontWeights: {},
    lineHeights: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "40px",
      7: "48px",
      8: "56px",
      9: "64px",
      10: "72px",
      11: "80px",
      12: "160px",
      13: "240px",
    },
    sizes: {
      1: "px",
      2: "px",
      3: "px",
      4: "px",
      5: "px",
      6: "px",
      7: "px",
      8: "px",
    },
    radii: {
      1: "px",
      2: "px",
      3: "px",
      round: "999px",
    },
  },
  media: {
    bp1: "(min-width: 560px)",
    bp2: "(min-width: 760px)",
    bp3: "(min-width: 960px)",
    bp4: "(min-width: 1300px)",
  },
  utils: {
    p: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    px: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    pt: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingLeft: value,
    }),
    m: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mx: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginTop: value,
      marginBottom: value,
    }),
    mt: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginLeft: value,
    }),
  },
});

export type CSS = Stitches.CSS<typeof config>;

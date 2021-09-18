import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  theme,
  config,
  createTheme,
  getCssText,
} = createStitches({
  theme: {
    colors: {
      black: "hsl(180, 6%, 3.5%)",
      white: "hsl(0, 0%, 90%)",
      yellow: "hsl(37, 97%, 60%)",
      pink: "hsl(355, 85%, 90%)",
      green: "hsl(146, 20%, 86%)",
      gray1: "hsl(225, 3%, 75%)",
      gray2: "hsl(227, 3.6%, 48%)",
      gray3: "hsla(0, 0%, 90%, 0.3)",
      gray4: "hsla(0, 0%, 90%, 0.05)",

      gray100: "hsla(225, 5%, 10%, 1)",
      gray200: "hsla(220, 6%, 15%, 1)",
      gray300: "hsla(220, 6%, 20%, 1)",
      gray400: "hsla(220, 6%, 25%, 1)",
      gray500: "hsla(220, 6%, 40%, 1)",
      gray600: "hsla(225, 3%, 50%, 1)",
      gray700: "hsla(225, 0%, 70%, 1)",
      gray800: "hsla(225, 0%, 80%, 1)",
      gray900: "hsla(225, 0%, 85%, 1)",
      gray1000: "hsla(225, 0%, 89%, 1)",
    },
    fonts: {
      sans: "Sora, system-ui",
      heading: "Space",
      text: "Sato",
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
      9: "52px",
      10: "64px",
      11: "72px",
    },
    lineHeights: {
      1: "14px",
      2: "16px",
      3: "24px",
      4: "28px",
      5: "30px",
      6: "32px",
      7: "36px",
      8: "48px",
      10: "52px",
      11: "72px",
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
    laptop: "(max-width: 1200px)",
    tablet: "(max-width: 960px)",
    phone: "(max-width: 520px)",
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

export const lightTheme = createTheme("light", {
  colors: {
    white: "hsl(180, 6%, 3.5%)",
    black: "hsl(0, 0%, 90%)",
  },
});

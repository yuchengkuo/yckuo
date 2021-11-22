import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export const { styled, css, globalCss, theme, config, createTheme, getCssText } = createStitches({
  theme: {
    colors: {
      // theme color

      gray1: 'hsl(0 0% 98% / 1)',
      gray2: 'hsl(0 0% 95% / 1)',
      gray3: 'hsl(0 0% 92% / 1)',
      gray4: 'hsl(0 0% 90% / 1)',
      gray5: 'hsl(0 0% 80% / 1)',
      gray6: 'hsl(0 0% 65% / 1)',
      gray7: 'hsl(0 0% 50% / 1)',
      gray8: 'hsl(0 0% 35% / 1)',
      gray9: 'hsl(0 0% 20% / 1)',
      gray10: 'hsl(0 0% 17% / 1)',
      gray11: 'hsl(0 0% 13% / 1)',
      gray12: 'hsl(0 0% 10% / 1)',
      gray13: 'hsl(0, 0, 5% / 1)',

      cheese1: 'hsl(30 17% 90% / 1)',
      cheese2: 'hsl(30 58% 89% / 1)',
      cheese3: 'hsl(30 76% 84% / 1)',
      cheese4: 'hsl(30 91% 77% / 1)',
      cheese5: 'hsl(30 100% 71% / 1)',
      cheese6: 'hsl(30 72% 46% / 1)',
      cheese7: 'hsl(30 85% 32% / 1)',
      cheese8: 'hsl(30 96% 20% / 1)',
      cheese9: 'hsl(30 96% 8% / 1)',

      marine1: 'hsl(220 10% 87% / 1)',
      marine2: 'hsl(220 41% 86% / 1)',
      marine3: 'hsl(220 76% 84% / 1)',
      marine4: 'hsl(220 91% 77% / 1)',
      marine5: 'hsl(220 100% 71% / 1)',
      marine6: 'hsl(220 72% 46% / 1)',
      marine7: 'hsl(220 85% 32% / 1)',
      marine8: 'hsl(220 96% 20% / 1)',
      marine9: 'hsl(220 5% 12% / 1)',

      // segmentaic colors
      background: '$marine9',
      foreground: '$gray1',
      gray: '$gray7',
      primary: '$cheese5',
    },
    fonts: {
      sans: 'Sora, system-ui',
      heading: 'Space',
      hagrid: 'Hagrid',
      hagridText: 'HagridText',
      apfel: 'Apfel',
      freak: 'FREAK',
      text: 'Sato',
    },
    fontSizes: {
      1: '0.75rem', //12px
      2: '0.875rem', //14px
      3: '1rem', //16px
      4: '1.125rem', //18px
      5: '1.25rem', //20px
      6: '1.5rem', //24px
      7: '2rem', //32px
      8: '2.25rem', //36px
      9: '2.5rem', //40px
      10: '3.25rem', //52px
      11: '4rem', //64px
      12: '4.5rem', //72px
    },
    lineHeights: {
      1: '14px',
      2: '16px',
      3: '24px',
      4: '28px',
      5: '30px',
      6: '32px',
      7: '36px',
      8: '48px',
      10: '52px',
      11: '72px',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '56px',
      9: '64px',
      10: '72px',
      11: '80px',
      12: '160px',
      13: '240px',
    },
    sizes: {
      1: 'px',
      2: 'px',
      3: 'px',
      4: 'px',
      5: 'px',
      6: 'px',
      7: 'px',
      8: 'px',
    },
  },
  media: {
    bp1: '(min-width: 560px)',
    bp2: '(min-width: 760px)',
    bp3: '(min-width: 960px)',
    bp4: '(min-width: 1300px)',
    laptop: '(max-width: 1200px)',
    tablet: '(max-width: 960px)',
    phone: '(max-width: 520px)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingLeft: value,
    }),
    m: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginLeft: value,
    }),
  },
});

export type CSS = Stitches.CSS<typeof config>;

export const lightTheme = createTheme('light', {
  colors: {
    background: '$cheese1',
    foreground: '$gray12',

    primary: '$marine5',
  },
});

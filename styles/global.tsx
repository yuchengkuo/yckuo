import { globalCss } from '../stitches.config';

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Sora',
      src: 'url("/fonts/Sora[wght].woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'normal',
      fontWeight: '200 800',
    },
    {
      fontFamily: 'Hagrid',
      src: 'url("/fonts/Hagrid-Regular.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'normal',
      fontWeight: '400',
    },
    {
      fontFamily: 'Hagrid',
      src: 'url("/fonts/Hagrid-Italic.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'italic',
      fontWeight: '400',
    },
    {
      fontFamily: 'HagridText',
      src: 'url("/fonts/HagridText-Regular.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'normal',
      fontWeight: '400',
    },
    {
      fontFamily: 'HagridText',
      src: 'url("/fonts/HagridText-Italic.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'italic',
      fontWeight: '400',
    },
    {
      fontFamily: 'FREAK',
      src: 'url("/fonts/FREAKGrotesk-next-BOLD.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'normal',
      fontWeight: '700',
    },
    {
      fontFamily: 'Apfel',
      src: 'url("/fonts/ApfelGrotezk-Regular.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'normal',
      fontWeight: '400',
    },
    {
      fontFamily: 'Sato',
      src: 'url("/fonts/Satoshi-Variable.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'normal',
      fontWeight: '300 900',
    },
    {
      fontFamily: 'Sato',
      src: 'url("/fonts/Satoshi-VariableItalic.woff2") format("woff2")',
      fontDisplay: 'block',
      fontStyle: 'italic',
      fontWeight: '300 900',
    },
  ],

  html: {
    backgroundColor: '$background',
  },

  body: {
    backgroundColor: '$background',
    color: '$foreground',
    fontFamily: '$sans',
    fontWeight: 200,
    margin: 0,
  },

  figure: { margin: 0 },

  svg: { display: 'inline-block', verticalAlign: 'middle' },

  '::selection': { backgroundColor: '$primary', color: '$background' },
});

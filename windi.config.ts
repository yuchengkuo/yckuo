import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class',
  theme: {
    fontFamily: {
      Uncut: ['Uncut Sans', ...defaultTheme.fontFamily.sans],
      Satoshi: ['Satoshi', ...defaultTheme.fontFamily.sans],
      Spectral: ['Spectral', ...defaultTheme.fontFamily.serif],
      Azeret: ['Azeret Mono', ...defaultTheme.fontFamily.mono],
    },
    screens: {
      tablet: { max: '1020px' },
      phone: { max: '720px' },
    },
    extend: {
      colors: {
        bg: 'var(--colors-bg)',

        fg: {
          DEFAULT: 'var(--colors-fg)',
          secondary: 'var(--colors-fg-secondary)',
        },
      },
    },
  },
  plugins: [
    require('windicss/plugin/line-clamp'),
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.font-feature': {
          'font-feature-settings': "'ss02', 'ss03'",
        },
        '.font-feature-none': {
          'font-feature-settings': 'none',
        },
      })
      // addVariant('not-first', '&:not(:first-of-type)')
      // addVariant('not-last', '&:not(:last-of-type)')
      // addVariant('only-middle', '&:not(:first-of-type, :last-of-type)')
      // addVariant('hover', '@media(hover: hover) { &:hover }')
      // addVariant('active', '@media(hover: hover) { &:active }')
      // addVariant('state', '&[data-state=on]')
    }),
  ],
})

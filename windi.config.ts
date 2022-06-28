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
      width: {
        fit: 'fit-content',
      },
    },
  },
  plugins: [
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/aspect-ratio'),
    plugin(function ({ addUtilities, addVariant }) {
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
      addVariant('only-middle', ({ modifySelectors }) =>
        modifySelectors(({ className }) => `.${className}:not(:first-of-type, :last-of-type)`)
      )
    }),
  ],
})

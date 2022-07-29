import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'
import plugin from 'windicss/plugin'

function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

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
  alias: {
    grid: 'grid grid-cols-8 gap-10',
    attr: 'transition-all duration-100 underline underline-$colors-border decoration-1.6px underline-offset-1.4px hover:(underline-current decoration-2.2px) active:(text-$colors-border)',
  },
  safelist: [range(5).map((i) => `rotate-[${i}deg] rotate-[-${i}deg]`)],
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

import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'
import plugin from 'windicss/plugin'

function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

function cssPropColor(prop: `--colors-${string}`, opacity?: number) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacity !== undefined && opacityValue !== undefined && opacityVariable !== undefined)
      return `rgba(var(${prop}), ${opacity})`

    if (opacityValue !== undefined) return `rgba(var(${prop}), ${opacityValue})`

    if (opacityVariable !== undefined) return `rgba(var(${prop}), var(${opacityVariable}, 1))`

    return `rgb(var(${prop}))`
  }
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
      height: {
        fit: 'fit-content',
      },
      colors: {
        bg: cssPropColor('--colors-bg'),
        fg: {
          DEFAULT: cssPropColor('--colors-fg'),
          secondary: cssPropColor('--colors-fg-secondary'),
        },
        surface: cssPropColor('--colors-surface', 0.08),
        border: cssPropColor('--colors-border', 0.4),
      },
    },
  },
  alias: {
    grid: 'grid grid-cols-8 gap-10 tablet:(grid-cols-6) phone:(grid-cols-4 gap-4)',
    attr: 'transition-all duration-100 underline underline-border decoration-1.6px underline-offset-1.4px transform hover:(underline-current decoration-2.2px) active:(text-border scale-95)',
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
      })
      addVariant('only-middle', ({ modifySelectors }) =>
        modifySelectors(({ className }) => `.${className}:not(:first-of-type, :last-of-type)`)
      )
      addVariant('no-js', ({ modifySelectors }) =>
        modifySelectors(({ className }) => `.no-js .${className}`)
      )
    }),
  ],
})

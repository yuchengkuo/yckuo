import {
  defineConfig,
  presetUno,
  extractorSvelte,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
} from 'unocss'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  extractors: [extractorSvelte],
  presets: [presetAttributify(), presetUno()],
  theme: {
    fontFamily: {
      Uncut: ['Uncut Sans', ...defaultTheme.fontFamily.sans],
      Newsreader: ['Newsreader', ...defaultTheme.fontFamily.sans],
      Azeret: ['Azeret Mono', ...defaultTheme.fontFamily.mono],
    },
    colors: {
      bg: 'rgb(var(--colors-bg))',
      fg: { DEFAULT: 'rgb(var(--colors-fg))', secondary: 'rgb(var(--colors-fg-secondary))' },
      border: 'rgba(var(--colors-border), 0.4)',
      surface: 'rgba(var(--colors-surface), 0.08)',
    },
  },
  shortcuts: {
    attr: 'transition-all duration-100 underline underline-border decoration-1.6px underline-offset-1.4px transform hover:(underline-current decoration-2.2px) active:(text-border scale-95)',
  },
  variants: [
    {
      name: 'no-js',
      match(matcher) {
        if (!matcher.startsWith('no-js:')) return matcher
        return {
          matcher: matcher.slice(6),
          selector: (s) => `.no-js ${s}`,
        }
      },
    },
    {
      name: 'child-last',
      match(matcher) {
        if (!matcher.startsWith('child-last:')) return matcher
        return {
          matcher: matcher.slice(11),
          selector: (s) => `${s} > :last-child`,
        }
      },
    },
  ],
  rules: [['max-w-9xl', { 'max-width': '96rem' }]],
  safelist: [...range(10).flatMap((i) => `rotate-${i} -rotate-${i}`.split(' '))],
})

function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

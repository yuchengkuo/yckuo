import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
} from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import * as Radix from '@radix-ui/colors'
import type { Theme } from 'unocss/preset-mini'

const radixThemes = Object.fromEntries(Object.entries(Radix).filter(([k]) => !k.match(/Dark/)))
const radixThemesDark = Object.fromEntries(Object.entries(Radix).filter(([k]) => k.match(/Dark/)))

export default defineConfig<Theme>({
  content: {
    filesystem: ['content/config.yaml'],
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  extractors: [extractorSvelte],
  presets: [
    presetAttributify(),
    presetUno({ dark: { dark: '.dark-theme' } }),
    presetIcons({
      collections: {
        custom: {
          yck: `<svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg"><rect rx="120" /><path fill-rule="evenodd" clip-rule="evenodd" d="M151.836 234.855C151.836 233.205 151.452 231.577 150.714 230.101L120.003 168.679C116.469 161.611 121.609 153.294 129.511 153.294H188.553H247.594C255.497 153.294 260.636 161.611 257.102 168.679L181.328 320.228C179.527 323.83 175.846 326.105 171.819 326.105H129.511C121.609 326.105 116.469 317.788 120.003 310.72L150.714 249.298C151.452 247.822 151.836 246.194 151.836 244.544V234.855ZM291.402 326.105H232.361C224.458 326.105 219.318 317.788 222.852 310.72L298.627 159.171C300.428 155.569 304.109 153.294 308.135 153.294H351.223C359.051 153.294 364.194 161.468 360.807 168.525L329.089 234.604C328.374 236.093 328.016 237.729 328.044 239.381L328.206 249.079C328.233 250.731 328.646 252.354 329.41 253.819L359.012 310.557C362.705 317.634 357.57 326.105 349.587 326.105H291.402Z" fill="currentColor" /><g opacity="0.2" filter="url(#filter0_f_1138_2894)"><path d="M298.96 153.668H334.838L249.253 326.706H213.375L298.96 153.668Z" fill="#050505" /></g><defs><filter id="filter0_f_1138_2894" x="153.577" y="93.8707" width="241.058" height="292.633" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="29.8986" result="effect1_foregroundBlur_1138_2894" /></filter></defs></svg>`,
        },
      },
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
      warn: true,
    }),
  ],
  theme: {
    fontFamily: {
      Newsreader: 'Newsreader, ui-serif, Georgia, Cambria',
      Azeret: 'Azeret Mono, ui-monospace, SFMono-Regular, Menlo',
      Instrument: 'Instrument, ui-sans-serif, system-ui, -apple-system',
    },
    colors: {
      bg: {
        DEFAULT: 'oklch(var(--background))',
        muted: 'oklch(var(--background-muted))',
      },
      fg: {
        DEFAULT: 'oklch(var(--foreground))',
        muted: 'oklch(var(--foreground-muted))',
      },
      border: {
        DEFAULT: 'oklch(var(--border))',
        muted: 'oklch(var(--border-muted))',
      },
      surface: {
        DEFAULT: 'oklch(var(--surface))',
        muted: 'oklch(var(--surface-muted))',
      },
      primary: {
        DEFAULT: 'oklch(var(--primary))',
      },
      tag: 'oklch(var(--tag))',
      ontag: 'oklch(var(--ontag))',
      radix: {
        ...transformRadixColors(radixThemes),
        dark: {
          ...transformRadixColors(radixThemesDark),
        },
      },
    },
  },
  shortcuts: [
    {
      attr: 'transition-colors duration-100 underline underline-border decoration-1.4px px-px -mx-px hover:(underline-transparent bg-fg-muted text-bg-muted) active:bg-fg',
      'max-w': 'max-w-34rem mx-auto',
      'max-w-grid': 'grid gap-x-10 grid-cols-[1fr_max(34rem)_1fr] lt-lg:gap-x-4 lt-sm:block',
      'border-dash': 'border-b border-dashed border-border',
      button: 'bg-transparent hover:(bg-fg-muted text-bg-muted) duration-100 active:bg-fg',
      tag: 'w-fit text-xs leading-none font-medium p-1 rounded shadow-sm bg-tag text-ontag dark:(bg-ontag text-tag)',
    },
    [/^size-(.*)$/, ([, s]) => `w-${s} h-${s}`],
    [
      /^tag-(.*)$/,
      ([, c]) =>
        `bg-rx-${c}-5 text-fg-muted w-fit text-xs leading-none font-medium p-1 rounded shadow-sm`,
    ],
    [/^bg-rx-(.*)$/, ([, r]) => `bg-radix-${r} dark:bg-radix-dark-${r}`],
    [/^text-rx-(.*)$/, ([, r]) => `text-radix-${r} dark:text-radix-dark-${r}`],
    [/^border-rx-(.*)$/, ([, r]) => `border-radix-${r} dark:border-radix-dark-${r}`],
  ],
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
    {
      name: 'child-first',
      match(matcher) {
        if (!matcher.startsWith('child-first:')) return matcher
        return {
          matcher: matcher.slice(12),
          selector: (s) => `${s} > :first-child`,
        }
      },
    },
  ],
  rules: [['max-w-9xl', { 'max-width': '96rem' }]],
  layers: {
    default: 1,
    shortcuts: 2,
  },
})

function transformRadixColors(radixThemes = {}) {
  return Object.fromEntries(
    Object.entries(radixThemes).map(([k, v]) => {
      const match = k.match(/^(.*)Dark$/)
      if (match) return [match[1], removeRadixColorPrefix(v as object)]
      return [k, removeRadixColorPrefix(v as object)]
    })
  )
}

function removeRadixColorPrefix(radix = {}) {
  return Object.fromEntries(Object.entries(radix).map(([k, v]) => [k.match(/\d+/), v]))
}

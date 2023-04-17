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
import type { Theme } from '@unocss/preset-mini'

const radixThemes = Object.fromEntries(Object.entries(Radix).filter(([k]) => !k.match(/Dark/)))
const radixThemesDark = Object.fromEntries(Object.entries(Radix).filter(([k]) => k.match(/Dark/)))

export default defineConfig<Theme>({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  extractors: [extractorSvelte],
  presets: [
    presetAttributify(),
    presetUno({ dark: { dark: '.dark-theme' } }),
    presetIcons({
      collections: {
        custom: {
          readcv: `<svg viewBox="0 0 28 28"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.809 5.242a1.25 1.25 0 00-1.531.884L6.042 18.2a1.25 1.25 0 00.884 1.53l9.66 2.59a1.25 1.25 0 001.53-.885l3.236-12.074a1.25 1.25 0 00-.884-1.53l-9.66-2.589zm-2.98.496a2.75 2.75 0 013.368-1.945l9.66 2.588A2.75 2.75 0 0122.8 9.75l-3.236 12.074a2.75 2.75 0 01-3.368 1.945L6.538 21.18a2.75 2.75 0 01-1.944-3.368L7.829 5.738z" fill="currentColor"
          /><path fill-rule="evenodd" clip-rule="evenodd" d="M10.518 8.27a.75.75 0 01.919-.53l7.241 1.94a.75.75 0 01-.388 1.449l-7.242-1.94a.75.75 0 01-.53-.919zM9.677 11.41a.75.75 0 01.918-.531l7.242 1.94a.75.75 0 11-.388 1.45l-7.242-1.941a.75.75 0 01-.53-.919zM8.836 14.549a.75.75 0 01.918-.53l4.83 1.293a.75.75 0 11-.388 1.45l-4.83-1.295a.75.75 0 01-.53-.918z" fill="currentColor"/></svg>`,
          figma: `<svg viewBox="0 0 24 24"><path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664A3.334 3.334 0 0 0 12 18.664V8.668h3.332z" fill="currentColor"/><circle cx="15.332" cy="12" r="3.332" fill="currentColor" /></svg>`,
          arena: `<svg viewBox="0 0 150.38 88.986"><path d="M148.93 62.356l-20.847-16.384c-1.276-1-1.276-2.642 0-3.645l20.848-16.38c1.28-1.002 1.815-2.695 1.19-3.76-.626-1.062-2.374-1.44-3.88-.84l-24.79 9.874c-1.507.606-2.927-.22-3.153-1.83L114.57 2.926C114.34 1.317 113.13 0 111.877 0c-1.247 0-2.456 1.317-2.68 2.925l-3.73 26.467c-.228 1.61-1.646 2.434-3.155 1.83l-24.38-9.71c-1.512-.602-3.975-.602-5.483 0l-24.384 9.71c-1.508.604-2.928-.22-3.154-1.83L41.186 2.925C40.956 1.317 39.748 0 38.5 0c-1.252 0-2.463 1.317-2.688 2.925l-3.73 26.467c-.226 1.61-1.645 2.434-3.153 1.83L4.14 21.35c-1.507-.603-3.252-.223-3.878.838-.625 1.066-.092 2.76 1.184 3.76l20.85 16.38c1.277 1.003 1.277 2.645 0 3.646L1.446 62.356C.166 63.358-.364 65.152.26 66.34c.627 1.19 2.372 1.668 3.877 1.064l24.567-9.866c1.51-.603 2.914.218 3.125 1.828l3.544 26.696c.214 1.607 1.618 2.923 3.12 2.923 1.5 0 2.905-1.315 3.12-2.923l3.55-26.696c.21-1.61 1.62-2.43 3.122-1.828l24.164 9.698c1.506.606 3.97.606 5.477 0l24.16-9.698c1.504-.603 2.91.218 3.125 1.828l3.55 26.696c.212 1.607 1.617 2.923 3.115 2.923 1.502 0 2.907-1.315 3.12-2.923l3.55-26.696c.216-1.61 1.62-2.43 3.124-1.828l24.57 9.866c1.5.604 3.25.125 3.876-1.063.627-1.186.094-2.98-1.185-3.982zM95.89 46.18L77.53 60.315c-1.285.99-3.393.99-4.674 0L54.49 46.18c-1.284-.99-1.294-2.62-.02-3.625l18.4-14.493c1.274-1.005 3.363-1.005 4.638 0l18.4 14.493c1.277 1.004 1.267 2.634-.02 3.626z" fill="currentColor" /></svg>`,
          savee: `<svg viewBox="0 0 36 30" class="fill-fg"><path d="M3.88552,10.923 C4.04654,11.2388 4.28095,11.5121 4.5694,11.7201 C4.87163,11.9319 5.21122,12.0854 5.57051,12.1728 C5.9591,12.2718 6.35879,12.3214 6.75998,12.3204 C7.05862,12.3189 7.35676,12.2959 7.65205,12.2515 C7.96119,12.2081 8.26194,12.1185 8.54411,11.9858 C8.8141,11.8606 9.0515,11.6754 9.23794,11.4446 C9.42288,11.2152 9.51538,10.9232 9.51547,10.5688 C9.51547,10.1884 9.39322,9.88004 9.14871,9.64374 C8.90421,9.40745 8.5838,9.21065 8.18747,9.05333 C7.74894,8.88293 7.29836,8.74479 6.83941,8.64004 C6.33705,8.52194 5.82825,8.39072 5.313,8.2464 C4.7883,8.11663 4.27194,7.95563 3.76672,7.76428 C3.28357,7.58474 2.82944,7.33607 2.41872,7.02614 C2.02004,6.7219 1.6921,6.33592 1.45726,5.89449 C1.21256,5.44183 1.0903,4.89404 1.0905,4.25112 C1.0905,3.52967 1.24578,2.90316 1.55636,2.37159 C1.86103,1.84639 2.27693,1.39315 2.77533,1.04317 C3.29197,0.682217 3.86931,0.415613 4.48022,0.255879 C5.10038,0.0873253 5.74033,0.00129821 6.38331,5.59669e-05 C7.10099,-0.00246428 7.81642,0.0801413 8.51437,0.246108 C9.19491,0.410317 9.79953,0.676013 10.3283,1.0432 C10.8537,1.40723 11.285,1.8894 11.5871,2.45039 C11.8974,3.02113 12.0527,3.71324 12.0529,4.52673 L9.0397,4.52673 C9.01309,4.10696 8.92388,3.75926 8.77208,3.48362 C8.63018,3.21905 8.42189,2.99534 8.16737,2.83413 C7.90281,2.67153 7.61064,2.55813 7.30515,2.4995 C6.95581,2.43154 6.60048,2.39857 6.24451,2.40108 C5.99135,2.40139 5.73891,2.42777 5.49124,2.47982 C5.24814,2.52922 5.0163,2.62269 4.80732,2.75552 C4.60622,2.88293 4.43405,3.05052 4.30177,3.24761 C4.16953,3.44443 4.10346,3.69373 4.10354,3.9955 C4.10354,4.27105 4.15642,4.4941 4.26216,4.66465 C4.3679,4.8352 4.57605,4.99265 4.8866,5.13699 C5.19695,5.28152 5.62647,5.42585 6.17516,5.56997 C6.7234,5.7145 7.44037,5.89819 8.32605,6.12105 C8.59027,6.17365 8.95702,6.26878 9.4263,6.40643 C9.92222,6.55688 10.3931,6.77904 10.8238,7.06574 C11.2863,7.36771 11.6861,7.77114 12.0232,8.27602 C12.3603,8.78091 12.5288,9.42706 12.5287,10.2145 C12.5341,10.8314 12.4057,11.4423 12.152,12.0056 C11.8968,12.5619 11.5131,13.0508 11.032,13.4324 C10.5364,13.8328 9.9218,14.1444 9.18837,14.3673 C8.45494,14.5901 7.60583,14.7017 6.64103,14.7019 C5.87524,14.7035 5.1124,14.6076 4.37121,14.4165 C3.63774,14.2264 2.99016,13.9279 2.42847,13.5209 C1.86606,13.1137 1.40773,12.5812 1.09033,11.9661 C0.759889,11.3363 0.601299,10.5884 0.614562,9.72248 L3.62781,9.72248 C3.62781,10.1948 3.71371,10.595 3.88552,10.923 Z M20.8148,8.95492 L19.0307,3.7985 L18.991,3.7985 L17.1474,8.95492 L20.8147,8.95492 L20.8148,8.95492 Z M20.6364,0.334613 L25.9294,14.3869 L22.6981,14.3869 L21.6276,11.2576 L16.3346,11.2576 L15.2245,14.3869 L12.0925,14.3869 L17.4448,0.334613 L20.6365,0.334613 L20.6364,0.334613 Z M4.57932,29.9999 L0,15.9477 L3.19169,15.9477 L6.34365,25.8276 L6.38331,25.8276 L9.57499,15.9477 L12.7864,15.9477 L8.08816,30 L4.57932,30 L4.57932,29.9999 Z M24.1849,15.9476 L24.1849,18.5458 L16.7114,18.5458 L16.7114,21.557 L23.5703,21.557 L23.5703,23.9581 L16.7114,23.9581 L16.7114,27.4021 L24.3435,27.4021 L24.3435,30 L13.599,30 L13.599,15.9476 L24.185,15.9477 L24.1849,15.9476 Z M35.8412,15.9476 L35.8412,18.5458 L28.3677,18.5458 L28.3677,21.557 L35.2266,21.557 L35.2266,23.9581 L28.3677,23.9581 L28.3677,27.4021 L36,27.4021 L36,30 L25.2553,30 L25.2553,15.9476 L35.8413,15.9477 L35.8412,15.9476 Z" fill="currentColor" fill-rule="evenodd" /></svg>`,
          yck: `<svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg"><rect rx="120" /><path fill-rule="evenodd" clip-rule="evenodd" d="M151.836 234.855C151.836 233.205 151.452 231.577 150.714 230.101L120.003 168.679C116.469 161.611 121.609 153.294 129.511 153.294H188.553H247.594C255.497 153.294 260.636 161.611 257.102 168.679L181.328 320.228C179.527 323.83 175.846 326.105 171.819 326.105H129.511C121.609 326.105 116.469 317.788 120.003 310.72L150.714 249.298C151.452 247.822 151.836 246.194 151.836 244.544V234.855ZM291.402 326.105H232.361C224.458 326.105 219.318 317.788 222.852 310.72L298.627 159.171C300.428 155.569 304.109 153.294 308.135 153.294H351.223C359.051 153.294 364.194 161.468 360.807 168.525L329.089 234.604C328.374 236.093 328.016 237.729 328.044 239.381L328.206 249.079C328.233 250.731 328.646 252.354 329.41 253.819L359.012 310.557C362.705 317.634 357.57 326.105 349.587 326.105H291.402Z" fill="currentColor" /><g opacity="0.2" filter="url(#filter0_f_1138_2894)"><path d="M298.96 153.668H334.838L249.253 326.706H213.375L298.96 153.668Z" fill="#050505" /></g><defs><filter id="filter0_f_1138_2894" x="153.577" y="93.8707" width="241.058" height="292.633" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="29.8986" result="effect1_foregroundBlur_1138_2894" /></filter></defs></svg>`,
        },
      },
      extraProperties: { display: 'inline-block', 'vertical-align': 'sub' },
      warn: true,
    }),
  ],
  theme: {
    fontFamily: {
      Anek: 'Anek, ui-sans-serif, system-ui, -apple-system',
      Newsreader: 'Newsreader, ui-serif, Georgia, Cambria',
      Azeret: 'Azeret Mono, ui-monospace, SFMono-Regular, Menlo',
    },
    colors: {
      bg: 'hsl(var(--background))',
      fg: {
        DEFAULT: 'hsl(var(--foreground))',
        secondary: 'hsl(var(--foreground-secondary))',
      },
      border: {
        DEFAULT: 'hsl(var(--border))',
        subtle: 'hsl(var(--border-subtle))',
      },
      surface: {
        DEFAULT: 'hsl(var(--surface))',
        subtle: 'hsl(var(--surface-subtle))',
      },
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
      attr: 'transition-all duration-100 underline underline-fg-secondary/60 decoration-1.6px underline-offset-1.4px transform hover:(underline-current decoration-2.2px) active:(text-fg-secondary scale-95)',
      'max-w': 'max-w-40rem mx-auto',
      'max-w-grid': 'grid gap-x-10 grid-cols-[1fr_max(40rem)_1fr] lt-lg:gap-x-4 lt-sm:block',
      'btn-pill':
        'font-600 text-xs leading-none bg-surface b border-border p-2 rounded-full drop-shadow-sm hover:(bg-surface-subtle drop-shadow) active:(scale-90)',
    },
    [/^size-(.*)$/, ([, s]) => `w-${s} h-${s}`],
    [
      /^tag-(.*)$/,
      ([, c]) =>
        `bg-rx-${c}-5 text-fg/86 w-fit text-xs leading-none font-540 p-1 rounded shadow-sm`,
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
  rules: [
    ['max-w-9xl', { 'max-width': '96rem' }],
    [/^stretch-(.*)$/, ([, s]) => ({ 'font-stretch': s })],
  ],
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

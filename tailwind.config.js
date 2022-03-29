const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const colors = require('@radix-ui/colors')

for (const color in colors) {
  for (const name in colors[color]) {
    colors[color][name.slice(color.includes('Dark') ? color.length - 4 : color.length)] =
      colors[color][name]
    delete colors[color][name]
  }
}

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      apfel: ['Apfel', ...fontFamily.sans],
      sato: ['Sato', ...fontFamily.sans],
      spectral: ['Spectral', ...fontFamily.sans],
    },
    screens: {
      tablet: { max: '1020px' },
      phone: { max: '720px' },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      ...colors,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.body-font-settings': {
          'font-feature-settings': "'ss02', 'ss03'",
        },
      })
    }),
  ],
}

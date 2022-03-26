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
    // extend: {
    //   colors: {
    //     ...colors,
    //     yellow: {
    //       1: 'hsl(60, 54.0%, 98.5%)',
    //       2: 'hsl(52, 100%, 95.5%)',
    //       3: 'hsl(55, 100%, 90.9%)',
    //       4: 'hsl(54, 100%, 86.6%)',
    //       5: 'hsl(52, 97.9%, 82.0%)',
    //       6: 'hsl(50, 89.4%, 76.1%)',
    //       7: 'hsl(47, 80.4%, 68.0%)',
    //       8: 'hsl(48, 100%, 46.1%)',
    //       9: 'hsl(53, 92.0%, 50.0%)',
    //       10: 'hsl(50, 100%, 48.5%)',
    //       11: 'hsl(42, 100%, 29.0%)',
    //       12: 'hsl(40, 55.0%, 13.5%)',

    //       alpha: {
    //         1: 'hsla(60, 94.3%, 34.6%, 0.024)',
    //         2: 'hsla(52, 100%, 50.4%, 0.091)',
    //         3: 'hsla(55, 100%, 50.2%, 0.181)',
    //         4: 'hsla(54, 100%, 50.1%, 0.267)',
    //         5: 'hsla(52, 99.9%, 49.5%, 0.357)',
    //         6: 'hsla(50, 100%, 47.4%, 0.451)',
    //         7: 'hsla(47, 99.8%, 44.6%, 0.577)',
    //         8: 'hsla(48, 100%, 46.0%, 0.980)',
    //         9: 'hsla(53, 100%, 48.0%, 0.961)',
    //         10: 'hsla(50, 100%, 48.4%, 0.980)',
    //         11: 'hsla(42, 100%, 28.6%, 0.980)',
    //         12: 'hsla(41, 98.9%, 8.0%, 0.942)',
    //       },
    //     },

    //     indigo: {
    //       1: 'hsl(225, 60.0%, 99.4%)',
    //       2: 'hsl(223, 100%, 98.6%)',
    //       3: 'hsl(223, 98.4%, 97.1%)',
    //       4: 'hsl(223, 92.9%, 95.0%)',
    //       5: 'hsl(224, 87.1%, 92.0%)',
    //       6: 'hsl(224, 81.9%, 87.8%)',
    //       7: 'hsl(225, 77.4%, 82.1%)',
    //       8: 'hsl(226, 75.4%, 74.5%)',
    //       9: 'hsl(226, 70.0%, 55.5%)',
    //       10: 'hsl(226, 58.6%, 51.3%)',
    //       11: 'hsl(226, 55.0%, 45.0%)',
    //       12: 'hsl(226, 62.0%, 17.0%)',

    //       dark: {
    //         1: 'hsl(229, 24.0%, 10.0%)',
    //         2: 'hsl(230, 36.4%, 12.9%)',
    //         3: 'hsl(228, 43.3%, 17.5%)',
    //         4: 'hsl(227, 47.2%, 21.0%)',
    //         5: 'hsl(227, 50.0%, 24.1%)',
    //         6: 'hsl(226, 52.9%, 28.2%)',
    //         7: 'hsl(226, 56.0%, 34.5%)',
    //         8: 'hsl(226, 58.2%, 44.1%)',
    //         9: 'hsl(226, 70.0%, 55.5%)',
    //         10: 'hsl(227, 75.2%, 61.6%)',
    //         11: 'hsl(228, 100%, 75.9%)',
    //         12: 'hsl(226, 83.0%, 96.3%)',
    //       },
    //     },

    //     grey: {
    //       1: 'hsl(0, 0%, 99.0%)',
    //       2: 'hsl(0, 0%, 97.3%)',
    //       3: 'hsl(0, 0%, 95.1%)',
    //       4: 'hsl(0, 0%, 93.0%)',
    //       5: 'hsl(0, 0%, 90.9%)',
    //       6: 'hsl(0, 0%, 88.7%)',
    //       7: 'hsl(0, 0%, 85.8%)',
    //       8: 'hsl(0, 0%, 78.0%)',
    //       9: 'hsl(0, 0%, 56.1%)',
    //       10: 'hsl(0, 0%, 52.3%)',
    //       11: 'hsl(0, 0%, 43.5%)',
    //       12: 'hsl(0, 0%, 9.0%)',

    //       alpha: {
    //         1: 'hsla(0, 0%, 0%, 0.012)',
    //         2: 'hsla(0, 0%, 0%, 0.027)',
    //         3: 'hsla(0, 0%, 0%, 0.047)',
    //         4: 'hsla(0, 0%, 0%, 0.071)',
    //         5: 'hsla(0, 0%, 0%, 0.090)',
    //         6: 'hsla(0, 0%, 0%, 0.114)',
    //         7: 'hsla(0, 0%, 0%, 0.141)',
    //         8: 'hsla(0, 0%, 0%, 0.220)',
    //         9: 'hsla(0, 0%, 0%, 0.439)',
    //         10: 'hsla(0, 0%, 0%, 0.478)',
    //         11: 'hsla(0, 0%, 0%, 0.565)',
    //         12: 'hsla(0, 0%, 0%, 0.910)',
    //       },

    //       dark: {
    //         1: 'hsl(0, 0%, 8.5%)',
    //         2: 'hsl(0, 0%, 11.0%)',
    //         3: 'hsl(0, 0%, 13.6%)',
    //         4: 'hsl(0, 0%, 15.8%)',
    //         5: 'hsl(0, 0%, 17.9%)',
    //         6: 'hsl(0, 0%, 20.5%)',
    //         7: 'hsl(0, 0%, 24.3%)',
    //         8: 'hsl(0, 0%, 31.2%)',
    //         9: 'hsl(0, 0%, 43.9%)',
    //         10: 'hsl(0, 0%, 49.4%)',
    //         11: 'hsl(0, 0%, 62.8%)',
    //         12: 'hsl(0, 0%, 93.0%)',
    //       },
    //     },

    //     background: 'hsl(60 12% 90% / 1)',
    //     darkBackground: 'hsl(228 8% 12% / 1)',
    //     gray: 'hsl(0 0% 40% / 1)',
    //     darkGray: 'hsl(0 0% 60% / 1)',
    //   },
    //   textColor: {
    //     primary: 'hsla(0 0% 12% / 1)',
    //     secondary: 'hsl(0 0% 40% / 1)',
    //     teritary: '',
    //     highlight: 'hsl(220 22% 30% / 1)',
    //     darkPrimary: 'hsl(0 0% 84% / 1)',
    //     darkSecondary: 'hsl(0 0% 60% / 1)',
    //     darkTeritary: '',
    //     darkHighlight: 'hsl(54 18% 91% / 1)',
    //   },
    // },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities, matchUtitlities, theme }) {
      addUtilities({
        '.body-font-settings': {
          'font-feature-settings': "'ss02', 'ss03'",
        },
      })
    }),
  ],
}

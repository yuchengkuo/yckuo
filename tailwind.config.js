const { fontFamily } = require('tailwindcss/defaultTheme')

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
    extend: {
      colors: {
        gray1: 'hsl(0 0% 98% / 1)',
        gray2: 'hsl(0 0% 95% / 1)',
        gray3: 'hsl(0 0% 92% / 1)',
        gray4: 'hsl(0 0% 90% / 1)',
        gray5: 'hsl(0 0% 80% / 1)',
        gray6: 'hsl(0 0% 65% / 1)',
        gray7: 'hsl(0 0% 50% / 1)',
        gray8: 'hsl(0 0% 35% / 1)',
        gray9: 'hsl(0 0% 20% / 1)',
        gray10: 'hsl(0 0% 17% / 1)',
        gray11: 'hsl(0 0% 13% / 1)',
        gray12: 'hsl(0 0% 10% / 1)',
        gray13: 'hsl(0 0 5% / 1)',

        cheese1: 'hsl(30 17% 90% / 1)',
        cheese2: 'hsl(30 58% 89% / 1)',
        cheese3: 'hsl(30 76% 84% / 1)',
        cheese4: 'hsl(30 91% 77% / 1)',
        cheese5: 'hsl(30 100% 71% / 1)',
        cheese6: 'hsl(30 72% 46% / 1)',
        cheese7: 'hsl(30 85% 32% / 1)',
        cheese8: 'hsl(30 96% 20% / 1)',
        cheese9: 'hsl(30 96% 8% / 1)',

        marine1: 'hsl(220 10% 87% / 1)',
        marine2: 'hsl(220 41% 86% / 1)',
        marine3: 'hsl(220 76% 84% / 1)',
        marine4: 'hsl(220 91% 77% / 1)',
        marine5: 'hsl(220 100% 71% / 1)',
        marine6: 'hsl(220 72% 46% / 1)',
        marine7: 'hsl(220 85% 32% / 1)',
        marine8: 'hsl(220 96% 20% / 1)',
        marine9: 'hsl(220 5% 12% / 1)',

        background: 'hsl(60 12% 90% / 1)',
        darkBackground: 'hsl(228 8% 12% / 1)',
        gray: 'hsl(0 0% 40% / 1)',
        darkGray: 'hsl(0 0% 60% / 1)',
      },
      textColor: {
        primary: 'hsla(0 0% 12% / 1)',
        secondary: 'hsl(0 0% 40% / 1)',
        teritary: '',
        highlight: 'hsl(220 22% 30% / 1)',
        darkPrimary: 'hsl(0 0% 84% / 1)',
        darkSecondary: 'hsl(0 0% 60% / 1)',
        darkTeritary: '',
        darkHighlight: 'hsl(54 18% 91% / 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

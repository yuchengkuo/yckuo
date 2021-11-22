import { css } from 'stitches.config';

export const link = css({
  boxSizing: 'border-box',
  fontFamily: '$sans',
  textDecoration: 'none',
  lineHeight: 1,
  transition: 'all 200ms ease-out',
  p: 0,
  color: 'inherit',

  '&:hover': {
    color: '$white',
  },

  '&:focus': {},

  variants: {
    variant: {
      navLink: {
        fontSize: '$6',
        fontFamily: '$freak',
        fontFeatureSettings: '"ss02"',
        px: '$2',
        py: '$2',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          fontFeatureSettings: '"ss02"',
          letterSpacing: 1,
          color: '$primary',
        },
      },
    },
    underline: {
      true: { textDecorationLine: 'underline' },
    },
    focus: {
      true: { '&:focus': { outline: '$green solid 1.6px', borderRadius: 4 } },
    },
  },
});

import { css } from 'stitches.config';

export const button = css({
  boxSizing: 'border-box',
  display: 'inline-block',
  appearance: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  userSelect: 'none',
  textDecoration: 'none',
  textAlign: 'center',
  p: 0,
  m: 0,
  transition: 'all 200ms ease-out',

  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  '& svg *': { transition: 'all 200ms ease-out' },

  '&:hover': {},

  '&:focus-visible': {
    position: 'relative',
    outline: 'none',
    '&::before': {
      content: '""',
      width: 'calc(100% + 8px)',
      height: 'calc(100% + 8px)',
      position: 'absolute',
      top: -4,
      left: -4,
      zIndex: -1,
      borderRadius: 4,
      outline: '$primary solid 0.12em',
    },
  },

  variants: {
    variant: {
      primary: {
        fontWeight: 600,
        fontSize: '$5',
        lineHeight: 2,
        color: '$gray1000',
        p: '$2',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '$gray100',
        '& svg': { verticalAlign: '-3px', mr: '$2' },
        '& svg *': { transition: 'all 200ms ease-out' },
        '&:hover, &:focus': {
          backgroundColor: '$gray4',
          color: '$green',
          '& *': { stroke: '$green' },
        },
      },
      secondary: {
        fontSize: '$2',
        fontWeight: 400,
        textTransform: 'uppercase',
        color: '$gray1',
        width: '100%',
        borderRadius: 5,
        p: '$2',
        backgroundColor: 'transparent',
        '& svg *': { transition: 'all 200ms ease-out' },
        '&:hover, &:focus': {
          backgroundColor: '$gray4',
          color: '$green',
          '& *': { stroke: '$green' },
        },
      },
      icon: {},
      menu: {
        fontFamily: '$freak',
        fontWeight: 700,
        lineHeight: 1,
        fontSize: '$3',
        fontFeatureSettings: '"ss02"',
        color: '$gray',
        transition: 'all 100ms ease-out',
        '&:hover': { color: '$primary' },
      },
    },
  },
});

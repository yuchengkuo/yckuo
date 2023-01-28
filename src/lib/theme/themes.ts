import type { ThemeNames } from './useTheme'

export const themes: {
  name: ThemeNames
  label: string
  colors: { bg: string; fg: string; fg_secondary?: string }
  dark: boolean
  contrast: number
  aa: string
}[] = [
  {
    name: 'bookmark',
    label: 'Pirate',
    colors: { bg: '#C7E0DD', fg: '#0146E6', fg_secondary: '#084164' },
    dark: false,
    contrast: 5.01,
    aa: 'AA',
  },
  {
    name: 'bookmark',
    label: 'Harbor',
    colors: { bg: '#2A1E54', fg: '#E5ECC7', fg_secondary: '#BBD5E6' },
    dark: true,
    contrast: 12.14,
    aa: 'AAA',
  },
  {
    name: 'listening',
    label: 'Peach',
    colors: { bg: '#EED9D6', fg: '#0C54B2', fg_secondary: '#2D1E49' },
    dark: false,
    contrast: 5.3,
    aa: 'AA',
  },
  {
    name: 'listening',
    label: 'Dizzy',
    colors: { bg: '#562039', fg: '#E9B55C', fg_secondary: '#E2DBEE' },
    dark: true,
    contrast: 6.75,
    aa: 'AA',
  },
  {
    name: 'default',
    label: 'Grain',
    colors: { bg: '#EAE5CC', fg: '#14215c', fg_secondary: '#' },
    dark: false,
    contrast: 11.83,
    aa: 'AAA',
  },
  {
    name: 'default',
    label: 'Clay',
    colors: { bg: '#2B354D', fg: '#E8F4D4', fg_secondary: '#' },
    dark: true,
    contrast: 10.65,
    aa: 'AAA',
  },
  {
    name: 'project_id',
    label: 'Scent',
    colors: { bg: '#E4D6EA', fg: '#251F50', fg_secondary: '#' },
    dark: false,
    contrast: 10.86,
    aa: 'AAA',
  },
  {
    name: 'project_id',
    label: 'Noble',
    colors: { bg: '#503D81', fg: '#F7EAD2', fg_secondary: '#' },
    dark: true,
    contrast: 7.59,
    aa: 'AAA',
  },
  {
    name: 'project',
    label: 'Cheese',
    colors: { bg: '#F3FEF1', fg: '#0A5FAE', fg_secondary: '#352C56' },
    dark: false,
    contrast: 6.21,
    aa: 'AA',
  },
  {
    name: 'project',
    label: 'Portal',
    colors: { bg: '#326767', fg: '#F4E66B', fg_secondary: '#D4DCDB' },
    dark: true,
    contrast: 5,
    aa: 'AA',
  },
  {
    name: 'about',
    label: 'Moss',
    colors: { bg: '#C4EAC0', fg: '#38284B', fg_secondary: '#' },
    dark: false,
    contrast: 10.09,
    aa: 'AAA',
  },
  {
    name: 'about',
    label: 'Grove',
    colors: { bg: '#394649', fg: '#EFEECF', fg_secondary: '#' },
    dark: true,
    contrast: 8.29,
    aa: 'AAA',
  },
  {
    name: 'watching',
    label: 'Paw',
    colors: { bg: '#FAE4D3', fg: '#662530', fg_secondary: '#000136' },
    dark: false,
    contrast: 9.13,
    aa: 'AAA',
  },
  {
    name: 'watching',
    label: 'Crayon',
    colors: { bg: '#2E1202', fg: '#F9C679', fg_secondary: '#BEC6B8' },
    dark: true,
    contrast: 11.11,
    aa: 'AAA',
  },
  {
    name: 'note',
    label: 'Paw',
    colors: { bg: '#FAE4D3', fg: '#662530', fg_secondary: '#000136' },
    dark: false,
    contrast: 9.13,
    aa: 'AAA',
  },
  {
    name: 'note',
    label: 'Crayon',
    colors: { bg: '#2E1202', fg: '#F9C679', fg_secondary: '#BEC6B8' },
    dark: true,
    contrast: 11.11,
    aa: 'AAA',
  },
]
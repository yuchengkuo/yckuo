// @unocss-include

export const routes = [
  {
    label: 'About',
    desc: 'W/W/W/H/W',
    url: '/about',
    icon: 'i-ri-user-smile-fill',
    kbd: '1',
  },
  {
    label: 'Projects',
    desc: 'Practice and learning',
    url: '/project',
    icon: 'i-ri-folder-5-fill',
    kbd: '2',
  },
  {
    label: 'Links',
    desc: 'Links to go around the WWW',
    url: '/bookmark',
    icon: 'i-ri-bookmark-3-fill',
    kbd: '3',
  },
  {
    label: 'DDiet',
    desc: 'Consumption in digital form',
    url: '/listening',
    icon: 'i-ri-lightbulb-fill',
    kbd: '4',
  },
  {
    label: 'Notes',
    desc: 'Random notes and thoughts',
    url: '/note',
    icon: 'i-ri-booklet-fill',
    kbd: '5',
  },
  {
    label: 'Sandbox',
    desc: 'Playground and experiments',
    url: '/sandbox',
    icon: 'i-ri-flask-fill',
    kbd: '6',
  },
]

export const contact = [
  { label: 'Github', url: 'https://github.com/yuchengkuo', icon: 'i-ri-github-fill' },
  { label: 'Figma', url: 'https://figma.com/@yuchengkuo', icon: 'i-custom:figma' },
  { label: 'CV', url: 'https://read.cv/yuchengkuo', icon: 'i-custom:readcv scale-120' },
]

export const aboutLinks = [
  ...contact,
  { label: 'Are.na', url: 'https://are.na/yuchengkuo', icon: 'i-custom:arena' },
  { label: 'Savee', url: 'https://savee.it/yuchengkuo', icon: 'i-custom:savee' },
]

export const links = [
  { label: 'Bookmarks', url: '/bookmark', icon: 'i-ri-bookmark-3-fill' },
  { label: 'Blogrolls', url: '/blogroll', icon: 'i-ri-article-fill' },
]

export const diets = [
  { label: 'Listen', url: '/listening', icon: 'i-ri-album-fill' },
  { label: 'Watch', url: '/watching', icon: 'i-ri-film-fill' },
  { label: 'Read', url: '/reading', icon: 'i-ri-book-mark-fill' },
]

export const tagColors = [
  'tag-indigo',
  'tag-grass',
  'tag-plum',
  'tag-tomato',
  'tag-teal',
  'tag-violet',
  'tag-brown',
  'tag-crimson',
  'tag-cyan',
  'tag-orange',
]

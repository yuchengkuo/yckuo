export type Route = {
  group: string
  links: {
    label: string
    url: string
    wip?: boolean
  }[]
}[]

export const routes: Route = [
  {
    group: 'Pages',
    links: [
      {
        label: 'About',
        url: '/about',
      },
      {
        label: 'Now',
        url: '/now',
      },
      {
        label: 'Listening',
        url: '/listening',
      },
    ],
  },
  {
    group: 'Site',
    links: [
      {
        label: 'Colophon',
        url: '/colophon',
      },
      {
        label: 'Source',
        url: 'https://github.com/yuchengkuo/yckuo',
      },
      {
        label: 'Styleguide',
        url: '/styleguide',
      },
    ],
  },
  {
    group: 'Words',
    links: [
      {
        label: 'Posts',
        url: '/posts',
      },
      {
        label: 'Projects',
        url: '/projects',
        wip: true,
      },
    ],
  },
  {
    group: 'External',
    links: [
      // {
      //   label: 'LinkedIn',
      //   url: 'https://linkedin.com/in/yucheng-kuo',
      // },
      {
        label: 'Read.cv',
        url: 'https://read.cv/yuchengkuo',
      },
      {
        label: 'Github',
        url: 'https://github.com/yuchengkuo',
      },
      {
        label: 'Savee',
        url: 'https://savee.it/yuchengkuo',
      },
    ],
  },
]

import * as NextSEO from 'next-seo'

const url = process.env.NODE_ENV === 'production' ? 'https://yuchengkuo.com' : ''

export const defaultSEO: NextSEO.DefaultSeoProps = {
  defaultTitle: 'YuCheng Kuo → Designer, Engineer',
  titleTemplate: '%s | YuCheng Kuo → Designer, Engineer',
  description: 'Self-taught Designer, Engineer from Taiwan.',
  canonical: 'https://yuchengkuo.com/',
  openGraph: {
    type: 'website',
    url: 'https://yuchengkuo.com',
    site_name: 'YuCheng Kuo',
    title: 'YuCheng Kuo',
    description: 'Self-taught Designer, Engineer from Taiwan.',
    images: [{ url: `${url}/static/og-image.png`, alt: 'YuCheng Kuo', width: 1920, height: 960 }],
  },
}

export const defaultArticleJsonLd: NextSEO.ArticleJsonLdProps = {
  url: 'https://yuchengkuo.com/posts',
  title: 'YuCheng Kuo',
  description: '',
  authorName: 'YuCheng Kuo',
  publisherName: 'YuCheng Kuo',
  publisherLogo: `${url}/static/favicon-120x120.png`,
  datePublished: '',
  images: [],
}

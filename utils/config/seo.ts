import * as NextSEO from 'next-seo'

const url = process.env.NODE_ENV === 'production' ? 'https://yuchengkuo.com' : ''

export const defaultSEO: NextSEO.DefaultSeoProps = {
  title: 'YuCheng Kuo',
  description: 'Self-taught Designer, Engineer from Taiwan.',
  openGraph: {
    type: 'website',
    url,
    site_name: 'YuCheng Kuo',
    title: 'YuCheng Kuo',
    description: 'Self-taught Designer, Engineer from Taiwan.',
    images: [{ url: `${url}/static/og-image.png`, alt: 'YuCheng Kuo', width: 1920, height: 960 }],
  },
}

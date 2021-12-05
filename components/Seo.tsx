import { NextSeo, DefaultSeo, ArticleJsonLd } from 'next-seo'
import config from '@utils/config/config'
import { Head } from 'next/document'

export default function SEO() {
  return (
    <>
      <DefaultSeo
        title={config.title}
        defaultTitle={config.title}
        description={config.description}
        canonical={config.url}
        openGraph={{
          type: 'website',
          title: config.title,
          url: config.url,
          description: config.description,
          images: [{ url: config.image, alt: config.title, width: 1920, height: 960 }],
        }}
      />
    </>
  )
}

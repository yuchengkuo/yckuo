import { ArticleJsonLd, DefaultSeo } from 'next-seo'
import { useDarkMode } from 'usehooks-ts'
import NextHead from 'next/head'
import { defaultArticleJsonLd, defaultSEO } from '@utils/config/seo'
import { useTheme } from './ThemeSelect'

export default function Head({
  title,
  description,
  date,
  img,
}: {
  title?: string
  description?: string
  date?: string
  img?: string
}) {
  const { isDarkMode } = useDarkMode()
  return (
    <>
      <DefaultSeo {...defaultSEO} title={title} description={description} />
      <ArticleJsonLd
        {...defaultArticleJsonLd}
        title={title}
        description={description}
        datePublished={date}
      />
      <NextHead>
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/static/favicons/manifest.json" />
        <link rel="mask-icon" href="/static/favicons/pinned-tab.svg" color="#1D1E22" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-TileColor" content="#1D1E22" />
        <link rel="webmention" href="https://webmention.io/www.yuchengkuo.com/webmention" />
        <link rel="pingback" href="https://webmention.io/www.yuchengkuo.com/xmlrpc" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon.png" />

        {isDarkMode ? (
          <meta name="theme-color" content="#1C1C1C" />
        ) : (
          <meta name="theme-color" content="#F7F7F7" />
        )}
      </NextHead>
    </>
  )
}

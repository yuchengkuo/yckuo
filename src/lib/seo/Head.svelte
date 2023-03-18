<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import { dev } from '$app/environment'
  import type { SvelteSeo as SvelteSeoProps } from 'svelte-seo/types'

  type $$Props = Omit<
    SvelteSeoProps,
    'nofollow' | 'noindex' | 'nositelinkssearchbox' | 'notranslate'
  >

  const baseUrl = dev ? '' : 'https://yuchengkuo.com'

  const defaultTitle = 'YuCheng Kuo – Designer & Engingeer'
  const defaultDescription =
    'Personal website, portfolio, little corner on the internet of YuCheng Kuo, a product designer and UI developer'

  export let title = ''
  export let description = ''
  export let openGraph: SvelteSeoProps['openGraph'] = {}
  export let nofollow = false
  export let noindex = false
  export let nositelinkssearchbox = false
  export let notranslate = false

  title = title ? title + ' – ' + 'YuCheng Kuo' : defaultTitle
  description = description || defaultDescription

  const defaultOpenGraph: SvelteSeoProps['openGraph'] = {
    type: 'website',
    url: baseUrl,
    title,
    description,
    images: [
      {
        url: `${baseUrl}/og/default.png`,
        alt: 'YuCheng Kuo',
      },
    ],
  }

  openGraph = {
    ...defaultOpenGraph,
    ...openGraph,
    url: openGraph?.url ? `${baseUrl}/${openGraph.url}` : defaultOpenGraph.url,
    images:
      openGraph?.images?.map((images) => ({ url: `${baseUrl}/og/${images.url}` })) ||
      defaultOpenGraph.images,
  }
</script>

<SvelteSeo
  {title}
  {description}
  canonical="https://yuchengkuo.com/"
  {openGraph}
  {nofollow}
  {noindex}
  {nositelinkssearchbox}
  {notranslate}
  {...$$restProps}
>
  <slot />
</SvelteSeo>

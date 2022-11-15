<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import { dev } from '$app/environment'
  import type { SvelteSeoProps } from 'svelte-seo/types/SvelteSeo'

  type $$Props = SvelteSeoProps

  const baseUrl = dev ? '' : 'https://yuchengkuo.com'

  const defaultTitle = 'YuCheng Kuo – Designer & Engingeer'
  const defaultDescription =
    'Personal website, portfolio, little corner on the internet of YuCheng Kuo, a product designer and UI developer'

  export let title = ''
  export let description = ''
  export let openGraph: SvelteSeoProps['openGraph'] = {}

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

<SvelteSeo {title} {description} canonical="https://yuchengkuo.com/" {openGraph} {...$$restProps}>
  <slot />
</SvelteSeo>

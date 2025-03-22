<script lang="ts">
  import { run } from 'svelte/legacy'

  import SvelteSeo from 'svelte-seo'
  import { dev } from '$app/environment'

  import type { ComponentProps } from 'svelte'

  type SvelteSeoProps = ComponentProps<SvelteSeo>
  type $$Props = Omit<
    SvelteSeoProps,
    'nofollow' | 'noindex' | 'nositelinkssearchbox' | 'notranslate'
  >

  const baseUrl = dev ? '' : 'https://yuchengkuo.com'

  const defaultTitle = 'YuCheng Kuo'
  const defaultDescription =
    'Personal website, portfolio and the corner on the internet of YuCheng Kuo, a design engineer from Taiwan.'

  interface Props {
    title?: string
    description?: string
    openGraph?: SvelteSeoProps['openGraph']
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let {
    title = $bindable(''),
    description = '',
    openGraph = $bindable({}),
    children,
    ...rest
  }: Props = $props()

  title = title ? title + ' – ' + defaultTitle : defaultTitle

  run(() => {
    console.log(title)
  })

  const defaultOpenGraph: SvelteSeoProps['openGraph'] = {
    type: 'website',
    url: baseUrl,
    title,
    description,
    images: [
      {
        url: `${baseUrl}/og/default.png`,
        alt: 'YuCheng Kuo'
      }
    ]
  }

  openGraph = {
    ...defaultOpenGraph,
    ...openGraph,
    url: openGraph?.url ? `${baseUrl}/${openGraph.url}` : defaultOpenGraph.url,
    images:
      openGraph?.images?.map((images) => ({
        url: `${baseUrl}/og/${images.url}`
      })) || defaultOpenGraph.images
  }
</script>

<SvelteSeo
  {title}
  description={description ?? defaultDescription}
  canonical="https://yuchengkuo.com/"
  {openGraph}
  {...rest}
>
  {@render children?.()}
</SvelteSeo>

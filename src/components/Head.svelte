<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import { dev } from '$app/env'
  import type { SvelteSeoProps } from 'svelte-seo/types/SvelteSeo'

  interface $$Props extends SvelteSeoProps {}

  const baseUrl = dev ? '' : 'https://yuchengkuo.com'

  const title = 'YuCheng Kuo · Designer x Engingeer'
  const description =
    'Personal website, portfolio, little corner on the internet of YuCheng Kuo, a product designer and UI developer'
  const openGraph = {
    type: 'website',
    url: 'https://yuchengkuo.com',
    title,
    description,
    images: [
      {
        url: `${baseUrl}/og/default.png`,
        alt: 'YuCheng Kuo',
      },
    ],
  }
</script>

<SvelteSeo {title} {description} canonical="https://yuchengkuo.com/" {openGraph} {...$$props}>
  <slot />
</SvelteSeo>

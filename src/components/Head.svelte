<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  const title = 'YuCheng Kuo · Designer x Engingeer'
  const description =
    'Personal website, portfolio, little corner on the internet of YuCheng Kuo, a product designer and UI developer'
</script>

<SvelteSeo
  {title}
  {description}
  canonical="https://yuchengkuo.com/"
  openGraph={{ type: 'website', url: 'https://yuchengkuo.com', title, description }}
  {...$$props}
>
  <slot />
</SvelteSeo>

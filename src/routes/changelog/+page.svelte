<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="Changelog • YuCheng Kuo" description="History of yuchengkuo.com.">
  <script>
    document.documentElement.setAttribute('data-theme', 'sands')
  </script>
</Head>

<section class="mb-20 md:mb-40">
  <h1 class="mb-4 md:mb-8">Changelog</h1>
  <p class="text-fg-secondary ">History of yuchengkuo.com. Last updated at {data.lastUpdate}</p>
</section>

<section class="text-fg-secondary layout-center">
  <Markdoc content={data.content} {components} />
</section>

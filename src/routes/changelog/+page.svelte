<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import { format } from 'date-fns'
  import Markdoc from 'sveltejs-markdoc'
  import { components } from '$lib/markdoc/components'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="Changelog • YuCheng Kuo" description="History of yuchengkuo.com.">
  <script>
    document.documentElement.setAttribute('data-theme', 'sands')
  </script>
</Head>

<section class="text-fg-secondary mb-32">
  <h1 class="mb-8">Changelog</h1>
  <p>
    History of yuchengkuo.com. Last updated at {format(
      new Date(data.lastUpdate),
      'yyyy-MM-dd hh:mm'
    )}
  </p>
</section>

<section class="text-fg-secondary prose project">
  <Markdoc content={data.content} {components} />
</section>

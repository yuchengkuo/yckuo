<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'

  import Palette from './Palette.svelte'
  import About from './About.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="About">
  <script>
    document.documentElement.setAttribute('data-theme', 'green')
  </script>
</Head>

<section class="mt-8 text-fg-secondary">
  <h1 class="mb-8">{data.about.title}</h1>
  <Markdoc content={data.about.content} components={{ ...components, About }} />
</section>

<Palette />

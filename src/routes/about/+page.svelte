<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import Header from '../Header.svelte'
  import { components } from '$lib/content/components'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="About" openGraph={{ url: 'about' }} />

<Header title={data.about.title} class="!mb-0" />

<section class="text-fg-secondary layout-center">
  <Markdoc content={data.about.content} {components} />
</section>

<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'

  import Intro from '../Intro.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head title="About" openGraph={{ url: 'about' }} />

<Intro route={data.routes.find((r) => r.label === 'About')} />

<section class="layout-center">
  <Markdoc content={data.about.content} {components} />
</section>

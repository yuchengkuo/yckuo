<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/content/components'

  export let data: LayoutServerData

  import type { LayoutServerData } from './$types'
</script>

<section class="layout-center text-fg-secondary mt-20">
  <Markdoc content={data.work.content} {components} />
</section>

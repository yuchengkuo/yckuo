<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/content/components'

  import type { LayoutServerData } from './$types'

  export let data: LayoutServerData
</script>

<section class="layout-center loose text-fg-secondary">
  <Markdoc content={data.project.content} {components} />
</section>

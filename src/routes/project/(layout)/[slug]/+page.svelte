<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/content/components'

  import type { LayoutServerData } from './$types'

  export let data: LayoutServerData
</script>

<section class="text-fg-secondary layout-center loose">
  <Markdoc content={data.content} {components} />
</section>

<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/content/components'

  import type { LayoutServerData } from './$types'

  export let data: LayoutServerData
</script>

<section class="layout-center mt-20">
  <Markdoc content={data.work.content} {components} />
</section>

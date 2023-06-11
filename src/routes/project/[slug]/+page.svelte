<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/content/components'

  export let data: LayoutServerData

  import type { LayoutServerData } from './$types'
</script>

<section class="layout-center loose mt-40">
  <Markdoc content={data.project.content} {components} />
</section>

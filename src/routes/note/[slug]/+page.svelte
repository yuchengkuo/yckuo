<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/content/components'

  import type { PageServerData } from './$types'
  import Head from '$lib/seo/Head.svelte'

  export let data: PageServerData
</script>

<Head title={data.title} />

<div class="mb-12">
  <h1 class="text-3xl">{data.title}</h1>

  <!-- <time class="font-Azeret text-sm">{lightFormat(new Date(data.date), 'yyyy-MM-dd')}</time> -->
  {#if data.tag}
    <div class="flex mt-2 gap-2">
      {#each data.tag ?? [] as tag}
        <p class="bg-fg-secondary rounded-full py-px font-600 text-bg text-sm px-2">
          {tag}
        </p>
      {/each}
    </div>
  {/if}
</div>

<Markdoc content={data.content} {components} />

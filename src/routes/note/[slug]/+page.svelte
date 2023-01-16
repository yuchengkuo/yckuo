<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title={data.title} />

<div class="mb-12 max-w-56ch mx-auto">
  <h1>{data.title}</h1>

  <!-- <time class="font-Azeret text-sm">{lightFormat(new Date(data.date), 'yyyy-MM-dd')}</time> -->
  {#if data.tag}
    <div class="flex mt-4 gap-2">
      {#each data.tag ?? [] as tag}
        <p
          class="bg-fg-secondary/8 rounded-full py-px font-600 text-fg-secondary text-sm px-2"
          dark="bg-fg-secondary/20"
        >
          {tag}
        </p>
      {/each}
    </div>
  {/if}
</div>

<Markdoc content={data.content} {components} />

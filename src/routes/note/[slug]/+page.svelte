<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'
  import { tagColors } from '$lib/config'
  import Header from '../../Header.svelte'

  import type { PageServerData } from './$types'
  import { page } from '$app/stores'

  export let data: PageServerData
</script>

<Head title={data.note.title} />

<Header title={data.note.title} />

<div class="mb-8 max-w flex gap-2">
  <time class="text-sm font-500"
    >{new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeZone: 'Asia/Taipei',
    }).format(new Date(data.note.date))}</time
  >
  {#if data.note.tag}
    <div class="flex gap-2">
      {#each data.note.tag ?? [] as tag}
        {@const index = Object.keys(Object.fromEntries(data.tags)).indexOf(tag)}
        <p class={tagColors[index] || 'tag-gray'}>
          {tag}
        </p>
      {/each}
    </div>
  {/if}
</div>

<Markdoc content={data.note.content} {components} />

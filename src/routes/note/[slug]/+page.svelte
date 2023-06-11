<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'
  import { tagColors } from '$lib/config'
  import { formatDate } from '$lib/util'

  import Intro from '../../Intro.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head title={data.note.title} openGraph={{ url: `note/${data.note.slug}` }} />

<Intro title={data.note.title} />

<div class="mb-10 max-w flex gap-2">
  <time class="text-sm font-500">{formatDate(data.note.time)}</time>
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

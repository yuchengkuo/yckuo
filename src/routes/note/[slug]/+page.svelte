<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'
  import { page } from '$app/stores'
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
      {#each data.note.tag ?? [] as tag (tag)}
        {@const index = $page.data.tags.findIndex((t) => t[0] === tag)}
        {@const hue = (360 / $page.data.tags.length) * index + 160}
        <p style="--tag: 88% 0.035 {hue}; --ontag: 28% 0.15 {hue};" class="tag">
          {tag}
        </p>
      {/each}
    </div>
  {/if}
</div>

<Markdoc content={data.note.content} {components} />

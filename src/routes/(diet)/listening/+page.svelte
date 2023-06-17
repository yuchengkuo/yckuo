<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import Album from '../Album.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  const items = { 'Recent top': data.albums, 'Recently saved': data.saved }
</script>

<Head title="Listening" description="A collection of jam." openGraph={{ url: 'listening' }} />

{#each Object.keys(items) as key}
  <section class="max-w not-last:mb-16">
    <h2 class="text-base font-normal mb-6">{key}</h2>
    <ul>
      {#each items[key] as album (album.url)}
        <Album {album} />
      {/each}
    </ul>
  </section>
{/each}

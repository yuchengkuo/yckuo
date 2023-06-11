<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import Album from '../Album.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  const items = { 'Recent top': data.albums, 'Recently saved': data.saved }
</script>

<Head title="Listening" description="A collection of jam." openGraph={{ url: 'listening' }} />

<section class="max-w">
  {#each Object.keys(items) as key}
    <div class="mb-16">
      <p class="mb-6">{key}</p>
      <ul>
        {#each items[key] as album (album.url)}
          <Album {album} />
        {/each}
      </ul>
    </div>
  {/each}
</section>

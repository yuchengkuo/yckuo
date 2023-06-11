<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import Bookmark from '../Bookmark.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head
  title="Bookmarks"
  description="A little collection of interesting things on the internet."
  openGraph={{ url: 'bookmark' }}
/>

<section class="max-w">
  <ul>
    {#each data.bookmarks as bookmark}
      <Bookmark {bookmark} />
    {/each}
  </ul>
</section>

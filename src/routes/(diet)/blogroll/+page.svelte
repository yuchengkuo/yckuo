<script lang="ts">
  import Bookmark from '../Bookmark.svelte'

  import Head from '$lib/seo/Head.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head
  title="Blogrolls"
  description="Newsletters and blogs that I enjoy."
  openGraph={{ url: 'blogroll' }}
/>

<section class="max-w">
  <ul>
    {#each data.blogrolls as bookmark}
      <Bookmark {bookmark} />
    {/each}
  </ul>
</section>

<script lang="ts">
  import { page } from '$app/stores'
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

<section class="max-w-grid">
  <nav>
    <ul>
      <li class:selected={!$page.url.searchParams.get('category')}>
        <a
          role="tab"
          aria-selected={!$page.url.searchParams.get('category')}
          href="?category="
          data-sveltekit-noscroll>All</a
        >
      </li>
      {#each data.collections as collection}
        {@const { title } = collection}
        <li class:selected={$page.url.searchParams.get('category') === title.toLowerCase()}>
          <a
            role="tab"
            aria-selected={$page.url.searchParams.get('category') === title.toLowerCase()}
            href="?category={title.toLowerCase()}"
            data-sveltekit-noscroll>{title}</a
          >
        </li>
      {/each}
    </ul>
  </nav>

  <ul>
    {#each data.bookmarks as bookmark (bookmark.id)}
      <Bookmark {bookmark} />
    {/each}
  </ul>
</section>

<style>
  nav {
    --uno: 'flex justify-end items-start lt-sm:hidden';
  }
  nav ul {
    --uno: 'flex-col justify-end grow max-w-40 sticky top-12';
  }

  li {
    --uno: 'text-sm text-fg-muted px-3 mb-2 border-l-2 border-transparent hover:text-fg active:scale-99';
  }

  li.selected {
    --uno: 'border-primary text-fg font-medium';
  }
</style>

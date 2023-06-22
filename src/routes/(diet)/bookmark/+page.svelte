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
  <aside>
    <ul>
      <li class:selected={!$page.url.searchParams.get('category')}>
        <a
          role="tab"
          aria-selected={!$page.url.searchParams.get('category')}
          href="?category="
          data-sveltekit-noscroll
          data-sveltekit-replacestate>All</a
        >
      </li>
      {#each data.collections as collection (collection.id)}
        {@const { title } = collection}
        {@const selected = $page.url.searchParams.get('category') === title.toLowerCase()}
        <li class:selected>
          <a
            role="tab"
            aria-selected={selected}
            href="?category={title.toLowerCase()}"
            data-sveltekit-noscroll
            data-sveltekit-replacestate>{title}</a
          >
        </li>
      {/each}
    </ul>
  </aside>

  <ul>
    {#each data.bookmarks as bookmark (bookmark.id)}
      <Bookmark {bookmark} />
    {/each}
  </ul>
</section>

<style>
  aside {
    --uno: 'flex justify-end items-start lt-sm:hidden';
  }
  aside ul {
    --uno: 'flex-col justify-end grow max-w-40 sticky top-12';
  }

  li {
    --uno: 'text-sm text-fg-muted px-3 mb-2 border-l-2 border-transparent hover:text-fg active:scale-99';
  }

  li.selected {
    --uno: 'border-primary text-fg font-medium';
  }
</style>

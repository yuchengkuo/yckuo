<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { page } from '$app/stores'
  import Image from '$lib/media/Image.svelte'

  import type { Raindrop } from '$lib/api/raindrop'

  export let bookmark: Raindrop
</script>

<li>
  <a href={bookmark.link} data-splitbee-event="Open Bookmark" data-splitbee-target={bookmark.link}>
    <Image
      id={bookmark.cover}
      alt="Url cover image of {bookmark.title}"
      class="object-cover rounded shrink-0 shadow children:(size-8 shrink-0)"
      widths={[120, 240]}
      blurDataUrl={bookmark.blurDataUrl}
    />

    <main>
      <h2 class="text-base font-normal">{bookmark.title} ↗</h2>
      <p class="text-fg-muted text-sm">
        {#if bookmark.note}
          <Markdoc content={bookmark.note} />
        {:else}
          {bookmark.excerpt}
        {/if}
      </p>

      <div class="flex flex-wrap gap-2 mt-2 items-center">
        {#each bookmark.tags as tag (tag)}
          {@const index = $page.data.tags.findIndex((t) => t[0] === tag)}
          {@const hue = (360 / $page.data.tags.length) * index + 160}
          <p style="--tag: 88% 0.035 {hue}; --ontag: 28% 0.15 {hue};" class="tag">
            {tag}
          </p>
        {/each}
        <p class="text-xs">{bookmark.domain}</p>
      </div>
    </main>
  </a>
</li>

<style>
  li {
    --uno: 'px-4 -mx-4 rounded';
  }
  li:not(:first-child) a {
    --uno: 'border-t';
  }
  a {
    --uno: 'py-6 flex gap-4 items-start border-solid border-border-muted';
  }
  li:hover {
    --uno: 'bg-bg';
  }
  li:active {
    --uno: 'scale-99 bg-bg-muted';
  }
  li:hover a,
  li:hover + * a {
    --uno: 'border-transparent';
  }
</style>

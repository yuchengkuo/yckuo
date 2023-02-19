<script lang="ts">
  import { spring } from 'motion'
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'
  import { motion } from '$lib/animation/motion'
  import { tagColors } from '$lib/config'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const scrollOffset = 24
  let initialScrollTop = 0
  let downscroll = true

  const openGraph = { images: [{ url: 'bookmarks.png' }], url: 'bookmark' }
</script>

<svelte:window
  on:scroll={() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    scrollTop > initialScrollTop ? (downscroll = true) : (downscroll = false)
    initialScrollTop = scrollTop <= 0 ? 0 : scrollTop
  }}
/>

<Head
  title="Bookmarks"
  description="A little collection of interesting things on the internet."
  {openGraph}
/>

<section class="max-w">
  <ul
    class="flex flex-col gap-8 p-8 -mx-8 bg-surface drop-shadow-sm rounded-xl lt-sm:(gap-6 px-4 -mx-4)"
  >
    {#each data.bookmarks as item}
      <li
        class="relative flex gap-x-6 lt-sm:gap-x-4 items-start"
        use:motion={{
          initial: { y: downscroll ? scrollOffset : -scrollOffset },
          inView: { y: 0 },
          transition: { easing: spring({ damping: 30, stiffness: 600 }) },
          inViewOptions: { margin: '40px' },
        }}
      >
        <div class="size-10 lt-sm:size-8 bg-bg rounded-lg shrink-0">
          <Image
            id={item.cover}
            alt="Url cover image of {item.title}"
            class="object-cover children:(size-10 lt-sm:size-8)"
            widths={[120, 240]}
          />
        </div>
        <main class="grow">
          <h2 class="lev3">{item.title}</h2>
          <p text="fg-secondary">{item.excerpt}</p>

          <div class="flex flex-wrap gap-2 mt-2 justify-end lt-sm:justify-start">
            <a
              class="attr text-fg-secondary text-sm w-fit mr-auto lt-sm:w-full"
              href={item.link}
              data-splitbee-event="Open Bookmark"
              data-splitbee-target={item.link}>{item.domain}</a
            >
            {#each item.tags as tag}
              {@const index = Object.keys(Object.fromEntries(data.tags)).indexOf(tag)}
              <p class={tagColors[index] || 'tag-gray'}>
                {tag}
              </p>
            {/each}
          </div>
        </main>
      </li>
    {/each}
  </ul>
</section>

<style>
  li:not(:last-child) > main {
    --uno: pb-8 border-b border-border-subtle lt-sm:pb-6;
  }
</style>

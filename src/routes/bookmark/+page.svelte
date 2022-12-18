<script lang="ts">
  import { onMount } from 'svelte'
  import { spring } from 'motion'
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'
  import { motion } from '$lib/animation/motion'
  import Snd from 'snd-lib'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const scrollOffset = 24
  let initialScrollTop = 0
  let downscroll = true
  let snd: Snd

  const openGraph = { images: [{ url: 'bookmarks.png' }], url: 'bookmark' }

  onMount(async () => {
    snd = new Snd()
    await snd.load(Snd.KITS.SND01)
  })
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
>
  <script>
    document.documentElement.setAttribute('data-theme', 'bookmark')
  </script>
</Head>

<section class="max-w-640px mx-auto mb-20">
  <h1 class="mb-4">Bookmarks</h1>
  <p class="text-fg-secondary">A curated list of interesting things on the web.</p>
</section>

<section>
  <ul class="flex flex-col">
    {#each data.bookmarks as item}
      <li
        class="relative group items-baseline py-6 mx-none sm:mx-auto lt-xl:max-w-640px"
        sm="grid grid-cols-[2fr_1fr] gap-x-4"
        xl="grid-cols-[1fr_640px_1fr] mx-unset gap-x-10"
        on:mouseenter={() => snd.play(Snd.SOUNDS.TYPE)}
        use:motion={{
          initial: { y: downscroll ? scrollOffset : -scrollOffset },
          inView: { y: 0 },
          transition: { easing: spring({ damping: 30, stiffness: 600 }) },
        }}
      >
        <div class="hidden lt-md:order-2 group-hover:opacity-100" xl="block opacity-0">
          {#each item.tags as tag}
            <p
              class="font-Azeret font-500 tracking-tighter text-fg-secondary text-xs"
              lg="text-right not-last:mb-1"
            >
              – {tag}
            </p>
          {/each}
        </div>

        <div class="flex flex-col gap-2">
          <h2 class="lev3">{item.title}</h2>
          <a
            class="attr font-Azeret text-fg-secondary tracking-tighter text-sm w-fit"
            href={item.link}
            data-splitbee-event="Open Bookmark"
            data-splitbee-target={item.link}>{item.domain}</a
          >
          <p text="fg-secondary">{item.excerpt}</p>
        </div>

        <div
          class="mt-0 mt-2 self-start lt-xl:order-3 group-hover:opacity-100 "
          md="mt-0"
          xl="opacity-0 w-8/10 h-0 justify-self-center"
        >
          <Image
            id={item.cover}
            alt={item.title}
            aspectRatio={item.aspectRatio}
            blurDataUrl={item.blurDataUrl}
          />
        </div>
      </li>
    {/each}
  </ul>
</section>

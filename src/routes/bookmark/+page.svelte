<script lang="ts">
  import { onMount } from 'svelte'
  import { spring } from 'motion'
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'
  import { motion } from '$lib/animation/motion'
  import Snd from 'snd-lib'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const cord = { x: 0, y: 0 }
  const scrollOffset = 24
  let initialScrollTop = 0
  let downscroll = true
  let snd: Snd

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
  title="Bookmarks · YuCheng Kuo"
  description="A little collection of interesting things on the internet."
>
  <script>
    document.documentElement.setAttribute('data-theme', 'cyan')
  </script>
</Head>

<section class="mb-20 md:mb-40">
  <h1 class="mb-4 md:mb-8">Bookmarks</h1>
  <p class="text-fg-secondary">A curated list of interesting on the web</p>
</section>

<section>
  <ul class="flex flex-col gap-16">
    {#each data.bookmarks as item}
      {@const deg = Math.floor((Math.random() * 20 - 10) % 3)}
      <li
        class="relative group sm:(items-baseline grid gap-x-4 grid-cols-[2fr_1fr]) md:grid-cols-[2fr_1fr_1fr] xl:(grid-cols-[2fr_3fr_3fr] gap-x-10) "
        on:mouseenter={() => snd.play(Snd.SOUNDS.TYPE)}
        on:mousemove={(e) => {
          const offset = 56
          const left = e.currentTarget.offsetLeft
          const width = e.currentTarget.clientWidth
          const top = e.currentTarget.offsetTop
          const height = e.currentTarget.clientHeight
          const offsetX = ((e.pageX - left - width / 2) / width) * offset
          const offsetY = ((e.pageY - top - height / 2) / height) * offset
          cord.x = offsetX
          cord.y = offsetY
        }}
        on:mouseleave={() => {
          cord.x = 0
          cord.y = 0
        }}
        use:motion={{
          initial: { y: downscroll ? scrollOffset : -scrollOffset },
          inView: { y: 0 },
          transition: { easing: spring({ damping: 30, stiffness: 600 }) },
        }}
      >
        <div
          class="hidden md:(block opacity-100) xl:opacity-0 <xl:order-2 group-hover:opacity-100 "
        >
          {#each item.tags as tag}
            <p
              class="font-Azeret font-400 text-fg-secondary text-xs xl:text-right xl:not-last:mb-1"
            >
              – {tag}
            </p>
          {/each}
        </div>

        <div class="flex flex-col gap-2">
          <h3>{item.title}</h3>
          <a class="font-Azeret text-fg-secondary text-sm w-fit" href={item.link}>{item.domain}</a>
          <p class="font-475 text-fg-secondary text-lg">{item.excerpt}</p>
        </div>

        <div
          class="mt-2 self-start md:mt-0 xl:(opacity-0 w-7/10 h-0 justify-self-end) <xl:order-3 group-hover:opacity-100 "
          use:motion={{
            animate: { x: cord.x, y: cord.y },
            transition: { easing: spring({ damping: 40 }) },
          }}
        >
          <Image
            id={item.cover}
            alt={item.title}
            aspectRatio={item.aspectRatio}
            blurDataUrl={item.blurDataUrl}
            class="rotate-{deg} transform"
          />
        </div>
      </li>
    {/each}
  </ul>
</section>

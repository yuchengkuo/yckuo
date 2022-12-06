<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { spring } from 'svelte/motion'
  import { expoOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { scroll, timeline, spring as motionSpring } from 'motion'

  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'
  import { clamp } from '$lib/animation/utils'
  import { motion } from '$lib/animation/motion'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  let hoverId: number
  let cords = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.5 })
  let content: HTMLElement
  let outerWidth = 0
  let hoverCard: HTMLElement

  const openGraph = { images: [{ url: 'watching.png' }], url: 'watching' }

  onMount(() => {
    if (outerWidth > 768)
      return scroll(
        timeline([
          [
            Array.from(content.children).filter((_, index) => index % 5 === 2),
            { transform: ['none', 'translateY(-20%)'] },
            { allowWebkitAcceleration: true },
          ],
          [
            Array.from(content.children).filter((_, index) => index % 5 === 1 || index % 5 === 3),
            { transform: ['none', 'translateY(10%)'] },
            { at: '<', allowWebkitAcceleration: true },
          ],
          [
            Array.from(content.children).filter((_, index) => index % 5 === 0 || index % 5 === 4),
            { transform: ['none', 'translateY(-20%)'] },
            { at: '<', allowWebkitAcceleration: true },
          ],
        ])
      )
  })

  async function setHoverCardCords(e: MouseEvent, hard = false) {
    await tick()
    const x = clamp(
      0,
      document.documentElement.clientWidth - hoverCard.clientWidth - 20,
      e.clientX + 16
    )
    const y = e.clientY + 16
    cords.set({ x, y }, { hard })
  }
</script>

<Head title="Watching" description="A list of series and films that I find great." {openGraph}>
  <script>
    document.documentElement.setAttribute('data-theme', 'watching')
  </script>
</Head>

<svelte:window bind:outerWidth />

<section class="text-fg-secondary max-w-640px mx-auto mb-20">
  <h1
    use:motion={{
      initial: { y: '20%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.6, easing: motionSpring({ damping: 40 }) },
    }}
  >
    Watching
  </h1>
  <p
    use:motion={{
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.6, easing: motionSpring({ damping: 40 }) },
    }}
  >
    A list of series and films that I find great.
  </p>
</section>

<section>
  <ul
    class="grid gap-4 grid-cols-2 justify-items-center"
    sm="grid-cols-4"
    md="grid-cols-5"
    xl="w-fit mx-auto mb-40 gap-10"
    bind:this={content}
    use:motion={{
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 1.5, easing: motionSpring({ damping: 40 }) },
    }}
  >
    {#each data.items as item, index (item.id)}
      <li
        class="relative"
        lg="w-40"
        on:mouseenter={(e) => {
          hoverId = index
          setHoverCardCords(e, true)
        }}
        on:mouseleave={() => (hoverId = undefined)}
        on:mousemove={(e) => setHoverCardCords(e)}
      >
        <a
          class="transition overflow-hidden block filte shadow-md"
          hover="scale-101 rounded -translate-y-1 rotate-0.5 shadow-lg"
          active="scale-99"
          focus="scale-101 rounded -translate-y-1 rotate-0.5 shadow-md"
          href="https://www.themoviedb.org/{item.type}/{item.id}"
          class:contrast-85={hoverId !== undefined && hoverId !== index}
          tabindex="0"
        >
          <Image
            id={item.posterUrl}
            alt="Poster of {item.type}, {item.title}"
            widths={[240, 480]}
            aspectRatio="100/152"
            blurDataUrl={item.blurDataUrl}
          />
        </a>
      </li>
    {/each}
  </ul>
</section>

{#if data.items[hoverId]}
  {@const item = data.items[hoverId]}
  {@const rotate = (Math.random() * 10 - 5) % 3}
  <hover-card
    class="rounded-xl h-max bg-fg-secondary/75 shadow-xl text-bg p-4 w-72 block backdrop-blur-lg backdrop-filter fixed pointer-events-none will-change-auto lt-sm:hidden"
    style:left="{$cords.x}px"
    style:top="{$cords.y}px"
    style:transform="rotate({rotate}deg)"
    in:fly={{ y: 24, duration: 250, easing: expoOut }}
    bind:this={hoverCard}
  >
    {#key hoverId}
      <h1 class="font-900 text-bg text-lg">{item.title}</h1>
      <p class="my-2">{item.overview}</p>
      <div class="border-t flex border-bg/20 border-bg/30 pt-4 gap-2 items-center">
        <tag class="rounded-full bg-bg/75 font-600 text-xs text-fg-secondary w-fit px-2 block">
          {item.type}
        </tag>
        <time class="font-Azeret text-xs">{item.time.substring(0, 4)}</time>
      </div>
    {/key}
  </hover-card>
{/if}

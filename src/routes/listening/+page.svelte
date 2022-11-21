<script lang="ts">
  import { spring } from 'motion'

  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  let hover: PageData['albums'][0] | PageData['saved'][0]
</script>

<Head title="Listening" description="A collection of jam.">
  <script>
    document.documentElement.setAttribute('data-theme', 'pink')
  </script>
</Head>

<section class="my-20 text-fg-secondary md:my-60">
  <h1
    class="mx-auto font-900 mb-2 w-fit text-4xl"
    use:motion={{
      initial: { y: '20%', opacity: 0, rotateY: 3 },
      animate: { y: 0, opacity: 1, rotateY: 0 },
      transition: {
        easing: spring({ damping: 40 }),
        delay: 0.5,
      },
    }}
  >
    Listening
  </h1>
  <p
    class="mx-auto font-450 w-fit"
    use:motion={{ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.65 } }}
  >
    A collection of recent favorite music.
  </p>
</section>

<tag>Recent top albums</tag>
<section>
  <grid class="grid grid-cols-1 relative sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:-mx-20">
    {#each data.albums as album (album.name)}
      <album class="flex w-full z-10 relative aspect-square items-center">
        <a
          href={album.url}
          class="m-auto h-8/10 w-auto aspect-square"
          on:mouseenter={() => (hover = album)}
          on:mouseleave={() => (hover = undefined)}
        >
          <Image
            src={album.image}
            alt={`Album artwork of ${album.name} by ${album.artist}`}
            aspectRatio="1/1"
            class="shadow-md"
          />
        </a>
      </album>
    {/each}
  </grid>
</section>

<tag>Recently saved albums</tag>
<section>
  <grid class="grid grid-cols-1 relative sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:-mx-20">
    {#each data.saved as album (album.name)}
      <album class="flex w-full z-10 relative aspect-square items-center">
        <a
          href={album.url}
          class="m-auto h-8/10 w-auto aspect-square"
          on:mouseenter={() => (hover = album)}
          on:mouseleave={() => (hover = undefined)}
        >
          <Image
            src={album.image}
            alt={`Album artwork of ${album.name} by ${album.artist}`}
            aspectRatio="1/1"
            class="shadow-md"
          />
        </a>
      </album>
    {/each}
  </grid>
</section>

{#key hover}
  {#if hover}
    <div
      use:motion={{
        initial: { opacity: 0, transform: 'translateY(2px)' },
        animate: { opacity: 1, transform: 'rotate(0.1deg)' },
        exit: { opacity: 0, transform: 'translateY(2px)' },
        transition: { easing: spring({ damping: 10 }) },
      }}
      out:outro|local
      class="bottom-1/2 left-0 z-0 pointer-events-none mix-blend-hard-light fixed"
    >
      <div
        use:motion={{
          animate: { transform: 'translateX(-50%)' },
          transition: { duration: 80, repeat: Infinity },
        }}
        class="flex gap-16"
      >
        {#each new Array(8) as _}
          <p class="font-900 text-fg tracking-tighter text-4xl whitespace-nowrap">
            {hover.artist} — {hover.name}
          </p>
        {/each}
      </div>
    </div>
  {/if}
{/key}

<style>
  tag {
    @apply bg-surface rounded-full font-Azeret mx-auto font-800 text-xs tracking-tight w-fit py-1.5 px-3 uppercase block;
  }

  section:not(:first-child) {
    @apply mb-40;
  }
</style>

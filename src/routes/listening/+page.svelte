<script lang="ts">
  import { spring } from 'motion'

  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  let hover: PageData['albums'][0] | PageData['saved'][0]
  const openGraph = { images: [{ url: 'listening.png' }], url: 'listening' }
</script>

<Head title="Listening" description="A collection of jam." {openGraph}>
  <script>
    document.documentElement.setAttribute('data-theme', 'listening')
  </script>
</Head>

<section class="text-fg-secondary max-w-640px mx-auto mb-20">
  <h1 class="mb-4">Listening</h1>
  <p>A collection of recent favorite music.</p>
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
      class="bottom-1/2 left-0 pointer-events-none fixed"
    >
      <div
        use:motion={{
          animate: { transform: 'translateX(-50%)' },
          transition: { duration: 80, repeat: Infinity },
        }}
        class="flex gap-16"
      >
        {#each new Array(8) as _}
          <p class="font-900 text-fg tracking-tighter text-2xl whitespace-nowrap">
            {hover.artist} — {hover.name}
          </p>
        {/each}
      </div>
    </div>
  {/if}
{/key}

<p class="tag">Recent top albums</p>
<section>
  <ul>
    {#each data.albums as album (album.name)}
      <li>
        <a
          href={album.url}
          class="aspect-square w-50"
          on:mouseenter={() => (hover = album)}
          on:mouseleave={() => (hover = undefined)}
        >
          <Image
            src={album.image}
            alt="Album artwork of {album.name} by {album.artist}"
            aspectRatio="1/1"
            class="shadow-md"
          />
        </a>
      </li>
    {/each}
  </ul>
</section>

<p class="tag">Recently saved albums</p>
<section>
  <ul>
    {#each data.saved as album (album.name)}
      <li>
        <a
          href={album.url}
          class="aspect-square w-50"
          on:mouseenter={() => (hover = album)}
          on:mouseleave={() => (hover = undefined)}
        >
          <Image
            src={album.image}
            alt="Album artwork of {album.name} by {album.artist}"
            aspectRatio="1/1"
            class="shadow-md"
          />
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  ul {
    --uno: w-fit mx-auto grid grid-cols-1 relative  gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
  }

  li {
    --uno: flex w-fit relative;
  }

  a {
    --uno: active:scale-96;
  }
  .tag {
    --uno: bg-surface rounded-full font-Azeret mx-auto font-800 text-xs tracking-tight w-fit py-1.5
      px-3 mb-10 uppercase block;
  }

  section:not(:first-child) {
    --uno: mb-40;
  }
</style>

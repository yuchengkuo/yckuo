<script lang="ts">
  import { spring } from 'motion'

  import { motion } from '$lib/animation/motion'
  import Head from '$lib/seo/Head.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head title="Listening · YuCheng Kuo" description="A collection of jam.">
  <script>
    document.documentElement.setAttribute('data-theme', 'pink')
  </script>
</Head>

<section class="my-60 text-fg-secondary">
  <h1
    class="mx-auto font-900 mb-2 w-fit text-5xl"
    use:motion={{
      initial: { y: '20%', opacity: 0, rotateY: 3 },
      animate: { y: 0, opacity: 1, rotateY: 0 },
      transition: {
        easing: spring({ damping: 40 }),
        delay: 0.5,
      },
    }}
  >
    Jam
  </h1>
  <p
    class="mx-auto font-450 w-fit"
    use:motion={{ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.65 } }}
  >
    A collection of recent favorite music. WIP.
  </p>
</section>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:-mx-20">
  {#each data.albums as album}
    <album class="flex w-full aspect-square items-center">
      <a href={album.spotifyUrl} class="m-auto h-8/10 w-auto  aspect-square">
        <img
          src={album.imageUrl || album.image}
          alt={`Album artwork of ${album.title} by ${album.artist}`}
          class="shadow-md "
        />
      </a>
    </album>
  {/each}
</section>

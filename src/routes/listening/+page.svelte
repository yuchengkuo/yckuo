<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head title="Listening · YuCheng Kuo" description="A collection of jam.">
  <script>
    document.documentElement.setAttribute('data-theme', 'pink')
  </script>
</Head>

<section class="text-fg-secondary *grid gap-y-0 children:(col-start-1 col-span-3) ">
  <h1 class="mb-12">Listening</h1>
  <p>A collection of recent favorite music. This is a WIP page, will update it later.</p>
</section>

<section class="text-fg-secondary">
  <h2 class="mb-12">Top albums this week</h2>
  <div class="flex flex-wrap text-fg-secondary gap-x-40 gap-y-20">
    {#each data.albums as album}
      {@const deg = Math.floor((Math.random() * 10) % 2)}
      <div>
        <!-- <h3>{album.title}</h3>
        <p>{album.artist}</p> -->

        <div
          class="mt-4 w-fit transform-gpu transition-transform relative group rotate-[{deg}deg] hover:(-rotate-1 shadow-sm shadow-bg scale-101) active:(scale-99 rotate-1)"
        >
          <div
            class="flex shadow-sm w-fit z-10 gap-1 relative children:(outline-fg/10 outline-4 outline) "
          >
            <div class="flex bg-hex-3e3737 flex-shrink-0 w-4.5 self-stretch justify-evenly">
              <div class="bg-hex-404040 h-[80%] w-px" />
              <div class="bg-hex-404040 h-[80%] w-px" />
            </div>
            <div class="w-80">
              <a href={album.spotifyUrl}>
                <img
                  src={album.imageUrl}
                  alt={`album artwork of ${album.title} by ${album.artist}`}
                  class="aspect-square"
                />
              </a>
            </div>
          </div>
          <disc
            class="transform-gpu transition-all top-1/2 right-0 w-[90%] -rotate-30 -translate-y-1/2 duration-250 block absolute aspect-square group-hover:(-right-[40%] rotate-30) "
          >
            <svg
              width="100%"
              height="100%"
              class="bg-center bg-cover bg-no-repeat border rounded-full border-2 border-hex-848484/50"
            >
              <defs>
                <mask id="mask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <circle cx="50%" cy="50%" r="15%" fill="black" />
                </mask>
              </defs>

              <foreignObject width="100%" height="100%" mask="url(#mask)">
                <div class="bg-fg h-full w-full" />
              </foreignObject>

              <circle cx="50%" cy="50%" r="15%" class="stroke-hex-848484/50 stroke-2" fill="none" />
            </svg>
          </disc>
        </div>
        <!-- <time>{album.releaseYear}</time>
        <p>{album.trackNum}</p>
        <a href={album.sotifyUrl} class="cursor-pointer">Link ↗</a> -->
      </div>
    {/each}
  </div>
</section>

<style>
  disc > svg > foreignObject > div {
    background: conic-gradient(
      from 90deg at 50% 50%,
      #ef7d7d 0deg,
      #457ae1 52.5deg,
      #6e5ed5 86.25deg,
      #e3e3e3 116.25deg,
      #d2d2d2 168.75deg,
      #84eb88 243.75deg,
      #dedede 320.63deg,
      #ef7d7d 360deg
    );
  }

  section {
    @apply mb-40;
  }
</style>

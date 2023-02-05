<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const openGraph = { images: [{ url: 'watching.png' }], url: 'watching' }
</script>

<Head title="Watching" description="A list of series and films that I find great." {openGraph} />

<div class="bg-surface py-12 rounded-3xl lt-sm:(py-4 -mx-4)">
  <section class="max-w-grid mb-24 lt-sm:(mb-12 px-4)">
    <div class="text-right text-sm font-600 lt-lg:(col-start-2 text-left mb-4)">Recent Fav</div>
    <ul class="grid grid-cols-4 gap-4 lt-sm:grid-cols-2 col-start-2">
      {#each data.recent as item}
        <li>
          <a
            class="transition block shadow-md"
            hover="-translate-y-1 rotate-1 shadow-xl"
            active="scale-99"
            focus="-translate-y-1 rotate-1 shadow-xl"
            href={item.type === 'movie'
              ? `https://letterboxd.com/film/${item.title.toLowerCase().replaceAll(' ', '-')}`
              : `https://www.themoviedb.org/${item.type}/${item.id}`}
            tabindex="0"
          >
            <Image
              id={item.posterUrl}
              alt="Poster of {item.type}, {item.title}"
              aspectRatio="100/152"
            />
          </a>
        </li>
      {/each}
    </ul>
  </section>

  <section>
    <div class="text-sm font-600 mb-4 hidden px-4 lt-sm:block">Find More</div>
    <ul data-carousel class="flex gap-4 overflow-x-auto">
      {#each data.all as item (item.id)}
        <li class="relative shrink-0 basis-29">
          <a class="block shadow-md" href="https://www.themoviedb.org/{item.type}/{item.id}">
            <Image
              id={item.posterUrl}
              alt="Poster of {item.type}, {item.title}"
              aspectRatio="100/152"
            />
          </a>
          <div class="mt-1 text-xs font-500 line-clamp-2">
            {item.title} ({item.time.slice(0, 4)})
          </div>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  ul[data-carousel] {
    padding: 0 calc((100vw - 40rem) / 2);
    scrollbar-width: none;
    --uno: lt-sm:px-4;
  }

  ul[data-carousel]::-webkit-scrollbar {
    display: none;
  }

  ul[data-carousel] li:first-child {
    --uno: relative;
  }
  ul[data-carousel] li:first-child::before {
    content: 'Find More';
    right: calc(100% + 2.5rem);
    --uno: absolute text-sm font-600 whitespace-nowrap lt-sm:hidden;
  }
</style>

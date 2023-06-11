<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/media/Image.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head
  title="Watching"
  description="A list of series and films that I find great."
  openGraph={{ url: 'watching' }}
/>

<section class="max-w mb-16">
  <p class="mb-6">Recent Fav</p>
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
          title={item.title}
        >
          <Image
            id={item.posterUrl}
            alt="Poster of {item.type}, {item.title}"
            aspectRatio="100/152"
            widths={[160, 400]}
          />
        </a>
      </li>
    {/each}
  </ul>
</section>

<section>
  <div class="max-w mb-6">Gallery</div>
  <ul data-carousel class="flex gap-3 overflow-x-auto">
    {#each data.all as item (item.id)}
      <li class="relative shrink-0 basis-29">
        <a
          class="block shadow-md"
          active="scale-99"
          href="https://www.themoviedb.org/{item.type}/{item.id}"
          title={item.title}
        >
          <Image
            id={item.posterUrl}
            alt="Poster of {item.type}, {item.title}"
            aspectRatio="100/152"
            widths={[160, 240]}
          />
        </a>
        <div class="mt-1 text-xs font-medium line-clamp-2">
          {item.title} ({item.time.slice(0, 4)})
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  ul[data-carousel] {
    padding: 0 calc((100vw - 34rem) / 2);
    scroll-padding-inline: calc((100vw - 34rem) / 2);
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    --uno: 'lt-sm:px-4';
  }

  ul[data-carousel]::-webkit-scrollbar {
    display: none;
  }

  ul[data-carousel] li {
    scroll-snap-align: start;
  }
</style>

<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/media/Image.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const items = { 'Recent Favorite': data.recent, Gallery: data.all }
</script>

<Head
  title="Watching"
  description="A list of series and films that I find great."
  openGraph={{ url: 'watching' }}
/>

{#each Object.entries(items) as [key, value], index}
  <section class="not-last:mb-16">
    <h2 class="max-w text-base font-normal">{key}</h2>

    <ul class:carousel={index}>
      {#each value as item}
        {@const { type, title, id, posterUrl, time } = item}
        <li>
          <a
            href={type === 'movie'
              ? `https://letterboxd.com/film/${title.toLowerCase().replaceAll(' ', '-')}`
              : `https://www.themoviedb.org/${type}/${id}`}
            tabindex="0"
            title="{title} ({time.slice(0, 4)})"
          >
            <Image
              id={posterUrl}
              alt="Poster of {type}, {title}"
              aspectRatio="100/152"
              widths={[160, 240, 400]}
            />
          </a>
          {#if index === 1}<p>{title} ({time.slice(0, 4)})</p>{/if}
        </li>
      {/each}
    </ul>
  </section>
{/each}

<style>
  ul:not(.carousel) {
    --uno: 'max-w pt-6 grid grid-cols-4 gap-4 lt-sm:grid-cols-2 col-start-2';
  }
  ul.carousel {
    padding: 0 calc((100vw - 34rem) / 2);
    --uno: 'flex gap-3 overflow-x-auto pt-6 lt-sm:px-4';
    scroll-padding-inline: calc((100vw - 34rem) / 2);
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
  }

  ul.carousel::-webkit-scrollbar {
    display: none;
  }

  ul.carousel li {
    --uno: 'relative shrink-0 basis-29';
    scroll-snap-align: start;
  }

  a {
    --uno: 'transition block shadow-md hover:(-translate-y-1 rotate-1 shadow-xl) active:scale-99 focus:(-translate-y-1 rotate-1 shadow-xl)';
  }
  p {
    --uno: 'mt-1 text-xs font-medium line-clamp-2';
  }
</style>

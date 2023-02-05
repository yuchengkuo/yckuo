<script lang="ts">
  import { page } from '$app/stores'
  import { diets } from '$lib/config'
  import Header from '../Header.svelte'

  const desc = `
  My media consumption are mostly from music, films, TV shows and books, and this is a place to share them: 

  - My recent most streamed and saved albums lives in _Listen_. Stats are pulled from [Spotify](httsp://spotify.com)
  - Films and TV shows are my getaway. _Watch_ lists some of my favorites and and the data comes from [TMDB](https://themoviedb.org).
  - Getting the habit to read, can find what I am currently reading and yearly goals in _Read_. Tracking reading progress with [Literal](https://literal.club).
  `
</script>

<Header title="Digital Diet" {desc} />

<div class="max-w flex gap-6 relative" children="text-sm font-600 px-1 py-3">
  {#each diets as route}
    <a
      class="relative text-fg-secondary transition-all ease-in-out duration-100"
      class:active={$page.url.pathname === route.url}
      active="scale-96 origin-bc"
      href={route.url}
      aria-label={route.label}
      aria-selected={$page.url.pathname === route.url}
      tabindex={$page.url.pathname === route.url ? 0 : -1}
      role="tab"
      data-sveltekit-noscroll
      ><span class="{route.icon} w-3.5 h-3.5 align-sub mr-1 bg-fg-secondary" />{route.label}</a
    >
  {/each}
</div>

<slot />

<style>
    .active {
      --uno: text-fg after:(absolute block content-none bottom-0 left-1/6 w-2/3 h-3px bg-rx-grass-9);
    }
</style>

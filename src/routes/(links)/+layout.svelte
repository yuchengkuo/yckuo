<script lang="ts">
  import { page } from '$app/stores'
  import { links } from '$lib/config'
  import Header from '../Header.svelte'

  const desc = `
  I spend my spare time surfing/learning on the internet. This is where I share my bookmark list, enjoyed newsletter, and interesting things.
  
  - **Bookmarks** are the links that I find interesting on the internet, they mostly consists of portfolios, typefaces, products, tools and tech in use.
  - **Blogrolls** are newsletter and blog that I read and enjoy, including design, engineering and general inspiration. They are randomly sorted each build.
  - Working on a _Heros_ page to accodmate my [heros](https://vanschneider.com/blog/where-are-our-design-heroes/), whom I admire and look up to.
  `
</script>

<Header title="Links" {desc} />

<div class="max-w flex gap-6 relative" children="text-sm font-600 px-1 py-3">
  {#each links as link}
    <a
      class="relative text-fg-secondary transition-all ease-in-out duration-100"
      class:active={$page.url.pathname === link.url}
      active="scale-96 origin-bc"
      href={link.url}
      aria-label={link.label}
      aria-selected={$page.url.pathname === link.url}
      tabindex={$page.url.pathname === link.url ? 0 : -1}
      role="tab"
      data-sveltekit-noscroll
      ><span class="{link.icon} w-3.5 h-3.5 align-sub mr-1 bg-fg-secondary" />{link.label}</a
    >
  {/each}
</div>

<slot />

<style>
  .active {
    --uno: text-fg after:(absolute block content-none bottom-0 left-1/6 w-2/3 h-3px bg-rx-grass9);
  }
</style>

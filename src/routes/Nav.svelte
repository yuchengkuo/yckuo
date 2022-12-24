<script lang="ts">
  import { page } from '$app/stores'
  import { motion } from '$lib/animation/motion'
  import { scroll } from 'motion'
  import { onMount } from 'svelte'

  let menuVisible = true
  let currentRoute: string

  $: currentRoute = $page.url.pathname.split('/').at(1)

  const routes = [
    { route: 'Home', url: '/', icon: 'i-ri-home-line' },
    { route: 'About', url: '/about', icon: 'i-ri-account-pin-box-line' },
    { route: 'Project', url: '/project', icon: 'i-ri-briefcase-5-line' },
    { route: 'Note', url: '/note', icon: 'i-ri-booklet-line' },
    { route: 'Bookmark', url: '/bookmark', icon: 'i-ri-bookmark-3-line' },
    { route: 'Listening', url: '/listening', icon: 'i-ri-album-line' },
    { route: 'Watching', url: '/watching', icon: 'i-ri-projector-2-line' },
  ]

  onMount(() => {
    return scroll(({ y }) => {
      if (y.current > 1024) menuVisible = false
    })
  })
</script>

<nav
  data-sveltekit-preload-code
  data-sveltekit-preload-data
  class="fixed left-10 top-1/4 flex items-center gap-4 lt-lg:hidden"
  on:mouseenter={() => (menuVisible = true)}
  use:motion={{
    animate: menuVisible
      ? { transform: 'rotateX(0deg)' }
      : { transform: 'translateX(-64px) rotateY(-15deg)' },
    transition: { duration: 0.5 },
  }}
>
  <ul class="w-fit h-fit" class:after:opacity-0={menuVisible}>
    {#each routes as route}
      <li class="mb-2">
        <a href={route.url} class:active={route.route.toLowerCase() === (currentRoute || 'home')}
          >{route.route}
        </a>
      </li>
    {/each}
  </ul>

  <button
    on:click={() => (menuVisible = !menuVisible)}
    use:motion={{
      animate: menuVisible ? { transform: 'rotateY(180deg)' } : { transform: 'none' },
      transition: { duration: 0.5 },
    }}
  >
    <span
      class="i-ri-arrow-right-s-line w-4 h-4 text-fg-secondary opacity-0 transition delay-300 duration-300"
      class:opacity-100={!menuVisible}
    />
  </button>
</nav>

<nav
  data-sveltekit-preload-code
  data-sveltekit-preload-data
  class="overflow-scroll max-w-640px mx-auto mb-20"
  lg="hidden"
>
  <ul class="flex gap-1 w-fit">
    {#each routes as route}
      <li>
        <a href={route.url} class:active={route.route.toLowerCase() === (currentRoute || 'home')}
          >{route.route}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
    nav a {
      --uno: block w-fit text-xs text-fg-secondary font-Uncut uppercase font-800 bg-fg-secondary/1 backdrop-blur py-1.5 px-3.5 rounded-full hover:bg-surface;
    }
  
    nav a.active {
      --uno: bg-fg text-bg font-900;
      font-variation-settings: 'slnt' 10;
    }
  
    nav ul::after {
      --uno: content-none absolute inset-0 transition backdrop-blur-lg pointer-events-none lt-lg:hidden;
      background-image: linear-gradient(to right, rgba(var(--colors-bg), 1) 5%, transparent);
      mask: linear-gradient(to right, black, transparent);
      -webkit-mask: linear-gradient(to right, black, transparent);
    }
  
    nav:hover button span {
      --uno: opacity-100;
    }
</style>

<script lang="ts">
  import { page } from '$app/stores'

  import Intro from '../Intro.svelte'

  import type { LayoutData } from './$types'

  export let data: LayoutData

  let route = data.routes.find((r) => r.label === 'DDiet')
</script>

<Intro {route} />

<nav>
  {#each route.group as group}
    <a
      class:active={$page.url.pathname === group.url}
      href={group.url}
      aria-label={group.label}
      aria-selected={$page.url.pathname === group.url}
      tabindex={$page.url.pathname === group.url ? 0 : -1}
      role="tab"
      data-sveltekit-noscroll
      ><span class="{group.icon} size-3 mr-1 bg-fg-secondary" />{group.label}</a
    >
  {/each}
</nav>

<div class="bg-surface border-dash border-t py-10 lt-sm:(-mx-4 px-4)">
  <slot />
</div>

<style>
  nav {
    --uno: 'max-w flex gap-6 overflow-x-scroll lt-sm:(-mx-4 px-4)';
  }

  a {
    --uno: 'text-sm px-1 py-3 shrink-0 relative text-fg-muted transition-all ease-in-out duration-100 hover:text-fg active:(scale-96 origin-bc)';
  }
  .active {
    --uno: 'font-medium text-fg after:(absolute block content-empty bottom-0 z-10 left-1/6 w-2/3 h-3px bg-primary)';
  }
</style>

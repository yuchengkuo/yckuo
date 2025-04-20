<script lang="ts">
  import { page } from '$app/stores'

  let { data, children } = $props()

  let { navigation } = $derived(data)
</script>

<h1>More</h1>

<nav>
  <ul class="flex gap-4">
    {#each navigation.find((item) => item.key === 'More')?.include ?? [] as subItem}
      <li>
        <a class:current={$page.url.pathname.startsWith(subItem)} href={subItem}>
          {subItem.slice(1).charAt(0).toUpperCase() + subItem.slice(2)}
        </a>
      </li>
    {/each}
  </ul>
</nav>

{@render children?.()}

<style>
  nav {
    --uno: 'pb-4 mb-8 border-b border-neutral';
  }

  nav a {
    --uno: 'decoration-none';
  }

  nav a:not(.current) {
    --uno: 'text-fg-muted';
  }
</style>

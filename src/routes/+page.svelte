<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import Intro from './Intro.svelte'
  import Block from './Block.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head />

<Intro route={data.routes.find((r) => r.label === 'Home')} />

<nav>
  <p>Navigate</p>
  <p>Connect</p>

  <!-- Routes -->
  <ul>
    {#each data.routes.filter((r) => r.label !== 'Home') as route (route.url)}
      <li><a href={route.url}>{route.label} <span aria-hidden="true">→</span></a></li>
    {/each}
  </ul>

  <!-- Links -->
  <ul>
    {#each data.connect as link (link.url)}
      <li><a href={link.url}>{link.label} <span aria-hidden="true">↗</span></a></li>
    {/each}
  </ul>
</nav>

{#each data.blocks as block}
  <Block {block} />
{/each}

<style>
  nav {
    --uno: 'max-w mt-16 py-16 border-dash border-t grid grid-cols-2';
  }
  p {
    --uno: 'text-xs mb-6';
  }
  ul {
    --uno: 'text-sm';
  }
  li {
    --uno: 'mb-2';
  }
  a {
    --uno: 'attr underline-fg-muted/20';
  }
  span {
    --uno: 'text-0.6em align-super select-none';
  }
</style>

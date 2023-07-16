<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import tooltip from '$lib/action/tooltip/action'

  import Block from './Block.svelte'
  import Intro from './Intro.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head />

<Intro route={data.routes.find((r) => r.label === 'Home')} />

<nav>
  <small>Navigate</small>
  <small>Connect</small>

  <!-- Routes -->
  <ul>
    {#each data.routes.filter((r) => r.label !== 'Home') as route (route.url)}
      <li>
        <a href={route.url}>{route.label}</a>
        <kbd use:tooltip={{ content: `Press ${route.kbd} to navigate to ${route.label}` }}
          >{route.kbd}</kbd
        >
      </li>
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
    --uno: 'max-w mt-16 py-16 border-dash border-t grid grid-cols-2 gap-1.5';
  }
  small {
    --uno: 'text-xs mb-6';
  }
  li {
    --uno: 'mb-1.5 text-3.5';
  }
  kbd {
    --uno: 'text-0.7em ml-px px-1 py-px align-mid hover:cursor-pointer';
  }
  a {
    --uno: 'attr underline-border';
  }
  a span {
    --uno: 'text-0.7em leading-none align-super select-none';
  }
</style>

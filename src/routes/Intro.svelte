<script lang="ts">
  import { page } from '$app/stores'
  import Markdoc from 'sveltejs-markdoc'

  import type { Route } from '$contentlayer'

  let classname = ''
  export { classname as class }
  export let route: Route = undefined
  export let title: string = undefined

  let pathnames: string[]

  $: pathnames = $page.url.pathname.split('/')
</script>

<header class={classname}>
  <!-- Navigation link -->
  {#if $page.url.pathname !== '/'}<a
      href={pathnames.length > 2 ? pathnames.slice(0, -1).join('/') : '/'}
      aria-label="Go upper level"><span class="i-ri-corner-up-left-fill" /></a
    >{/if}

  <!-- Title -->
  <h1>{title ?? route.title ?? 'YuCheng Kuo'}</h1>

  {#if route}
    {@const { description, excerpt } = route}
    {#if description}
      <p>{route.description}</p>
    {/if}

    {#if excerpt}
      {@const { html: content } = excerpt}
      <div>
        <Markdoc {content} />
      </div>
    {/if}
  {/if}
</header>

<style>
  header {
    --uno: 'max-w mb-10 relative';
  }

  a {
    --uno: 'attr decoration-none inline-block mb-4 text-fg-muted select-none';
    --uno: 'after:(opacity-0 hover:opacity-100)';
  }

  a::after {
    content: ' Back';
  }

  h1 {
    --uno: 'w-fit bg-gradient-linear bg-gradient-shape-rb bg-gradient-from-fg bg-gradient-to-fg-muted bg-clip-text text-transparent';
  }

  div {
    --uno: 'prose mt-10 lt-sm:mt-4';
  }
</style>

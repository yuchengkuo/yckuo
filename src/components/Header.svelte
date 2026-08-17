<script lang="ts">
  // Island 1 of the two-island split. Markup verbatim from +layout.svelte:63-84.
  // The only addition is the `pathname` prop: SvelteKit reads `page.url.pathname`
  // from a store that has no Astro equivalent inside an island. 07 confirmed
  // `transition:persist` does not freeze it — the header tracked pathname across
  // all 20 navigations at mounts: 1.
  import { scramble } from '$lib/action/scramble/scramble.svelte'

  let { pathname }: { pathname: string } = $props()

  let homeLink: HTMLSpanElement | null = $state(null)
</script>

<header class="span-full">
  {#if pathname !== '/'}
    <a
      onmouseenter={() => homeLink?.scramble?.()}
      aria-label="Homepage"
      href="/"
      class="reset fixed text-tertiary font-mono text-sm z-99 font-medium hover:text-primary group"
      >yuchengkuo.com <span
        class="hidden group-hover:(inline) text-xs"
        bind:this={homeLink}
        use:scramble={{
          text: '[BACK ←]',
          step: '[BACK ←]'.length,
          speed: 0.15,
          scramble: 3
        }}>[BACK ←]</span
      >
    </a>
  {/if}
</header>

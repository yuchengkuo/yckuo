<script lang="ts">
  // Island 1 of the two-island split. Markup verbatim from +layout.svelte:63-84.
  // The only addition is the `pathname` prop: SvelteKit reads `page.url.pathname`
  // from a store that has no Astro equivalent inside an island. 07 confirmed
  // `transition:persist` does not freeze it — the header tracked pathname across
  // all 20 navigations at mounts: 1.

  let { pathname }: { pathname: string } = $props()
</script>

{#if pathname !== '/'}
  <header class="fixed">
    <a
      aria-label="Homepage"
      href="/"
      class="reset -translate-y-full text-secondary hover:text-primary"
      >↩ index
    </a>
  </header>
{/if}

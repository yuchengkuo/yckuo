<script lang="ts">
  // `pathname` is a prop because an island has no access to the current route.
  let { pathname }: { pathname: string } = $props()
</script>

{#if pathname !== '/'}
  <header class="fixed z-50">
    <a
      aria-label="Homepage"
      href="/"
      class="reset text-secondary hover:text-primary"
      >↩ index
    </a>
  </header>
{/if}

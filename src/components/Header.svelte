<script lang="ts">
  // Island 1 of the two-island split. `pathname` is a prop because an island has no
  // access to the current route — and `transition:persist` does not freeze it: the
  // header tracks pathname across navigations while mounting only once.

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

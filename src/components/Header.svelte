<script lang="ts">
  // Island 1 of the two-island split. `pathname` is a prop because an island has no
  // access to the current route — and `transition:persist` does not freeze it: the
  // header tracks pathname across navigations while mounting only once.
  import { fade } from 'svelte/transition'

  let { pathname }: { pathname: string } = $props()
</script>

{#if pathname !== '/'}
  <!-- The one piece of chrome allowed to move: with the rest held still by
       `transition:animate="none"`/`transition:persist`, this link popping in and out
       on every `/` <-> elsewhere navigation would undercut that stillness. Plain
       Svelte transition, not a view transition — this toggles on reactive prop
       change, not on the swap. -->
  <header class="fixed z-50" transition:fade={{ duration: 150 }}>
    <a
      aria-label="Homepage"
      href="/"
      class="reset text-secondary hover:text-primary"
      >↩ index
    </a>
  </header>
{/if}

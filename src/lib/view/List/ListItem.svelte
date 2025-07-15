<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements'
  interface Props {
    leading?: import('svelte').Snippet
    trailing?: import('svelte').Snippet
    children: import('svelte').Snippet
  }

  let { children, leading, trailing, ...rest }: HTMLLiAttributes & Props = $props()
</script>

<li {...rest}>
  {@render leading?.()}

  <div>{@render children()}</div>

  {@render trailing?.()}
</li>

<style>
  li {
    --uno: 'border-neutral py-3 flex items-center gap-2';
  }

  li div {
    --uno: 'flex-grow';
  }
</style>

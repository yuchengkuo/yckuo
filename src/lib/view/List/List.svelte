<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  interface Props {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SvelteHTMLElements['ul'] & Props = $props()
</script>

<ul {...rest}>
  {@render children?.()}
</ul>

<style>
  ul {
    --uno: 'divide-y';
  }
</style>

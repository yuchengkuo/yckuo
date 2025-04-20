<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'
  interface Props {
    leading?: import('svelte').Snippet
    trailing?: import('svelte').Snippet
    children: import('svelte').Snippet
  }

  let { children, leading, trailing, ...rest }: SvelteHTMLElements['div'] & Props = $props()
</script>

<div class="flex items-center gap-2 py-2 mb-2 border-b-2 border-neutral" {...rest}>
  {@render leading?.()}

  <div class="flex-grow">{@render children()}</div>

  {@render trailing?.()}
</div>

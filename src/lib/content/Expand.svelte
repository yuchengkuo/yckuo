<script lang="ts">
  import type { HTMLDetailsAttributes } from 'svelte/elements'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: HTMLDetailsAttributes & Props = $props()
</script>

<details {...rest}>
  <summary><span>Expand more +</span></summary>

  {@render children?.()}
</details>

<style>
  details {
    --uno: 'mt-16';
  }

  summary {
    --uno: 'hover:(bg-bg-muted underline-border)';
    --uno: 'active:(bg-surface)';
    --uno: 'w-fit cursor-pointer underline mb-4';
  }

  details[open] summary {
    --uno: 'bg-bg-muted';

    & span {
      display: none;
    }

    &::after {
      content: 'Show less –';
    }
  }

  summary::marker {
    content: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }
</style>

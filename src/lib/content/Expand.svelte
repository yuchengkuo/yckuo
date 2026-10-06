<script lang="ts">
  import type { HTMLDetailsAttributes } from 'svelte/elements'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: HTMLDetailsAttributes & Props = $props()
</script>

<details {...rest}>
  <summary class="button-secondary"><span>More ↓</span></summary>

  {@render children?.()}
</details>

<style>
  details {
    --uno: 'mt-16';
  }

  summary {
    --uno: 'w-fit';
  }

  details[open] summary {
    & span {
      display: none;
    }

    &::after {
      content: 'Less ↑';
    }
  }

  summary::marker {
    content: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }
</style>

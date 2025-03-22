<script lang="ts">
  interface Props {
    class?: string
    children?: import('svelte').Snippet
  }

  let { class: classnames = '', children }: Props = $props()
</script>

<details class={classnames}>
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

<script lang="ts">
  let classnames = ''
  export { classnames as class }
</script>

<details class={classnames}>
  <summary><span>Expand more +</span></summary>

  <slot />
</details>

<style>
  details {
    --uno: 'mt-16';
  }

  summary {
    --uno: 'w-fit cursor-pointer underline mb-4';
    --uno: 'hover:(bg-bg-muted underline-border)';
    --uno: 'active:(bg-surface)';
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

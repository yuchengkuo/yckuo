<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<div class="flex py-2 gap-2 justify-between items-center">
  {@render children?.()}
</div>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<div class="gallery">
  {@render children?.()}
</div>

<style>
  .gallery {
    --uno: 'col-span-full mt-24 lt-md:mt-8';
    --uno: 'grid grid-cols-subgrid gap-y-4';

    --uno: 'children:(col-span-3 p-8 bg-surface rounded content-center)';
  }

  :global(.gallery > figure > *) {
    --uno: 'mx-auto w-fit';
  }

  :global(.gallery img, .gallery video) {
    --uno: 'max-h-80 w-auto h-fit';
  }
</style>

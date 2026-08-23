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
    --uno: 'grid-subgrid start-2 span-10 mt-24 lt-md:mt-8';
    --uno: 'gap-y-4';
  }
  
  /* Cell sizing is the gallery's own business, not a page-level column
     concept: four-up on desktop, one-up on mobile so each image is legible. */
  :global(.gallery > *) {
    --uno: 'span-full md:col-span-3 p-8 bg-surface rounded content-center';

    &:nth-child(3n+2) {
      --uno: 'md:col-span-4';
    }
  }

  :global(.gallery > figure > *) {
    --uno: 'mx-auto w-fit';
  }

  :global(.gallery img, .gallery video) {
    --uno: 'max-h-80 w-auto h-fit';
  }
</style>

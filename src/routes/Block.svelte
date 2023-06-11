<script lang="ts">
  import type { Note, Post, Project, Work } from '$contentlayer'
  import Image from '$lib/media/Image.svelte'

  type Block = Project | Work | Note | Post

  export let block: Block
</script>

<section>
  <h2><a href="/{block.type.toLowerCase()}/{block.slug}">{block.title}</a></h2>
  <small
    ><i class="i-ri-corner-down-right-fill align-baseline mr-1" /><a
      href={block.type.toLocaleLowerCase()}>{block.type}</a
    ></small
  >

  {#if block.image}
    <Image {...block.image[0]} class="shadow" />
  {/if}

  <p>{block.excerpt}</p>
</section>

<style>
  section {
    --uno: 'max-w py-16 lt-sm:py-12 border-dash';
  }

  a {
    --uno: 'attr inline-block underline-fg-muted/20';
  }

  small {
    --uno: 'inline-block mt-1 mb-8 lt-sm:mb-6 uppercase font-medium text-2.5 leading-3.5 text-fg-muted';
  }

  p {
    --uno: 'mt-8 lt-sm:mt-6';
  }
</style>

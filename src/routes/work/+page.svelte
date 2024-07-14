<script lang="ts">
  import Image from '$lib/media/Image.svelte'
  import { formatDate } from '$lib/util'

  export let data
</script>

<h1>Work</h1>

<ul>
  {#each data.works as work}
    <li>
      <a
        href={work.slug}
        class="overflow-hidden rounded-md col-span-full mb-2 filter-drop-shadow-sm w-full"
      >
        <Image
          id={work.cover}
          transformations={{
            resize: { height: 192, type: 'fill' },
            gravity: 'auto',
          }}
        />
      </a>

      <h2 class="col-span-2 w-fit">
        <a href={work.slug}>{work.title}</a>
      </h2>
      <div class="col-span-5 lt-sm:(mt-2 mb-1)">{@html work.description}</div>
      <time datetime={work.date} class="col-span-2 text-sm text-fg-muted"
        >{formatDate(work.date || work.updated)}</time
      >
    </li>
  {/each}
</ul>

<style>
  h1 {
    --uno: 'font-serif italic text-lg col-start-1';
  }

  ul {
    --uno: 'col-end--1 grid grid-cols-subgrid';
  }

  li {
    --uno: 'md:(grid grid-cols-subgrid col-span-full mb-8) ';
    --uno: 'lt-sm:(flex flex-col)';
  }
</style>

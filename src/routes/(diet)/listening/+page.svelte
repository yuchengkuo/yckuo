<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  const items = { 'Recent top': data.albums, 'Recent saved': data.saved }
</script>

<Head title="Listening" description="A collection of jam." openGraph={{ url: 'listening' }} />

<div class="bg-surface px-6 py-12 rounded-3xl lt-sm:(p-4 -mx-4)">
  {#each Object.keys(items) as key}
    <ul class="max-w-grid not-last:(mb-24 lt-sm:mb-12)">
      <div
        class="whitespace-nowrap text-right text-sm capitalize font-600 lt-lg:(col-start-2 text-left mb-4)"
      >
        {key}
      </div>
      <div class="grid grid-cols-3 gap-8 col-start-2 lt-sm:(grid-cols-2 gap-4)">
        {#each items[key] as album (album.url)}
          <li class="flex flex-col">
            <a
              href={album.url}
              class="aspect-square shrink-0 basis-16"
              title="{album.name} by {album.artist}"
            >
              <Image
                src={album.image}
                alt="Album artwork of {album.name} by {album.artist}"
                aspectRatio="1/1"
                class="drop-shadow-md"
              />
            </a>
            <div class="mt-2 flex flex-col" children="line-clamp-1">
              <p class="font-600 text-fg">{album.name}</p>
              <p class="text-fg-secondary">{album.artist}</p>
            </div>
          </li>
        {/each}
      </div>
    </ul>
  {/each}
</div>

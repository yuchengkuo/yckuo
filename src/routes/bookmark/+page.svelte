<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head
  title="Bookmarks · YuCheng Kuo"
  description="A little collection of interesting things on the internet."
>
  <script>
    document.documentElement.setAttribute('data-theme', 'cyan')
  </script>
</Head>

<section>
  <h1 class="mb-8 phone:(mb-4)">Bookmarks</h1>
  <p class="text-fg-secondary text-lg">A curated list of interesting on the web</p>
</section>

<section>
  <ul class="flex flex-col gap-16">
    {#each data.bookmarks as item}
      {@const deg = Math.floor((Math.random() * 20 - 10) % 3)}
      <li class="*grid group items-baseline relative">
        <div
          class="flex flex-col opacity-0 gap-1 col-start-2 items-end tablet:(hidden) group-hover:opacity-100 "
        >
          {#each item.tags as tag}
            <p
              class="font-Azeret font-400 text-fg-secondary text-xs text-right w-max tablet:(w-fit)"
            >
              – {tag}
            </p>
          {/each}
        </div>

        <div class="flex flex-col gap-2 col-start-3 col-span-3 tablet:(col-span-full)">
          <h3>{item.title}</h3>
          <a class="font-Azeret text-fg-secondary text-sm w-fit" href={item.link}>{item.domain}</a>
          <p class="font-475 text-fg-secondary text-lg">{item.excerpt}</p>
        </div>

        <div
          class="opacity-0 h-0 transform col-start-7 col-span-2 rotate-[{deg}deg] group-hover:opacity-100 tablet:(opacity-100 col-span-3 h-full) phone:(col-span-full rotate-0)"
        >
          <Image
            id={item.cover}
            alt={item.title}
            aspectRatio={item.aspectRatio}
            blurDataUrl={item.blurDataUrl}
          />
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  section:not(:last-of-type) {
    @apply mb-40;
  }
</style>

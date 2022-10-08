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

<section class="mb-20 md:mb-40">
  <h1 class="mb-4 md:mb-8">Bookmarks</h1>
  <p class="text-fg-secondary">A curated list of interesting on the web</p>
</section>

<section>
  <ul class="flex flex-col gap-16">
    {#each data.bookmarks as item}
      {@const deg = Math.floor((Math.random() * 20 - 10) % 3)}
      <li
        class="relative group sm:(items-baseline grid gap-x-4 grid-cols-[2fr_1fr]) md:grid-cols-[2fr_1fr_1fr] xl:(grid-cols-[2fr_3fr_3fr] gap-x-10) "
      >
        <div
          class="flex flex-col gap-1 hidden md:(block opacity-100) xl:(justify-self-end items-end opacity-0) <xl:order-2 group-hover:opacity-100 "
        >
          {#each item.tags as tag}
            <p class="font-Azeret font-400 text-fg-secondary text-xs xl:text-right">
              – {tag}
            </p>
          {/each}
        </div>

        <div class="flex flex-col gap-2">
          <h3>{item.title}</h3>
          <a class="font-Azeret text-fg-secondary text-sm w-fit" href={item.link}>{item.domain}</a>
          <p class="font-475 text-fg-secondary text-lg">{item.excerpt}</p>
        </div>

        <div
          class="mt-2 opacity-100 md:mt-0 xl:(opacity-0 w-7/10 h-0 justify-self-end) <xl:order-3 group-hover:opacity-100 "
          style:transform="rotate({deg}deg)"
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

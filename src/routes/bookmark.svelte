<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async function ({ fetch }) {
    const res = await fetch('/api/bookmark')

    if (res.ok) {
      const { items } = await res.json()
      return {
        status: 200,
        props: { items },
        cache: { maxage: 15 * 24 * 60 * 60, private: false },
      }
    }
    return {
      status: 404,
    }
  }
</script>

<script lang="ts">
  import Head from '$components/Head.svelte'

  import Image from '$lib/image/Image.svelte'

  export let items
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
  <h1 class="mb-8">Bookmarks</h1>
  <p class="text-fg-secondary text-lg">A curated list of interesting on the web</p>
</section>

<section class="">
  <ul class="flex flex-col gap-16">
    {#each items as item}
      {@const deg = Math.floor((Math.random() * 20 - 10) % 3)}
      <li class="*grid group items-baseline">
        <div class="flex flex-col opacity-0 gap-1 col-start-2 group-hover:opacity-100">
          {#each item.tags as tag}
            <p class="font-Azeret font-400 text-fg-secondary text-xs text-right">
              – {tag}
            </p>
          {/each}
        </div>

        <div class="flex flex-col gap-2 col-start-3 col-span-3">
          <h3>{item.title}</h3>
          <a class="font-Azeret text-fg-secondary text-sm w-fit" href={item.link}>{item.domain}</a>
          <p class="font-475 text-fg-secondary text-lg">{item.excerpt}</p>
        </div>

        <div
          class="opacity-0 h-0 transform col-start-7 col-span-2 rotate-[{deg}deg] group-hover:opacity-100"
        >
          <Image id={item.cover} alt={item.title} />
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

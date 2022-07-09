<script lang="ts" context="module">
  export const load: Load = async function ({ fetch }) {
    const res = await fetch('/api/content/about?data')

    if (res.ok) {
      const { data } = await res.json()
      return {
        props: { data },
        cache: { maxage: 30 * 24 * 60 * 60 },
      }
    }
    return {
      status: 404,
    }
  }
</script>

<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { components } from '$lib/markdoc/components'

  import type { Load } from '@sveltejs/kit'

  export let data
</script>

<svelte:head>
  <title>About · YuCheng Kuo</title>
  <script>
    document.documentElement.setAttribute('data-theme', 'green')
  </script>
</svelte:head>

<section class="min-h-screen mt-8 *grid">
  <div class="col-span-3">
    <h1 class="mb-8">{data.overview.title}</h1>
    <div class="prose">
      <Markdoc content={data.overview.markdown} {components} />
    </div>
  </div>

  <div class="bg-gray-400 rounded-32px h-90 mt-8 col-start-5 col-span-2" />
  <div class="flex flex-col mt-8 gap-2 col-start-7">
    {#each data.links as link}
      <a class="font-550 text-xl" href={link.url}>{link.label}</a>
    {/each}
  </div>
</section>

<section class="*grid children:col-span-2">
  <div class="">
    <h2>{data.website.title}</h2>
    <div class="prose">
      <Markdoc content={data.website.markdown} {components} />
    </div>
  </div>

  <div class="col-start-4">
    <h2>{data.design.title}</h2>
    <div class="prose">
      <Markdoc content={data.design.markdown} {components} />
    </div>
  </div>

  <div class="col-start-7">
    <h2>{data.more.title}</h2>
    <div class="prose">
      <Markdoc content={data.more.markdown} {components} />
    </div>
  </div>
</section>

<style>
  section h2 {
    @apply mb-6;
  }
</style>

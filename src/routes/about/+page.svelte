<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/markdoc/components'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Head title="About · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'green')
  </script>
</Head>

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

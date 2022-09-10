<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'
  import { motion } from '$lib/animation/motion'

  import type { RenderableTreeNode } from '@markdoc/markdoc'
  import type { PageServerData } from './$types'
  import { spring } from 'motion'

  export let data: PageServerData

  let { content } = data as { content: Exclude<RenderableTreeNode, string> }
  $: ({ content } = data as { content: Exclude<RenderableTreeNode, string> })

  let overview = { ...content }
  overview.children = overview.children.slice(0, -1)
</script>

<Head title="About · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'green')
  </script>
</Head>

<section class="min-h-screen mt-8 *grid">
  <div class="col-span-3">
    <h1 class="mb-8">{data.title}</h1>
    <div class="prose">
      <Markdoc content={overview} {components} />
    </div>
  </div>

  <div
    use:motion={{ hover: { scale: 1.02 }, transition: { easing: spring({ damping: 8 }) } }}
    class="bg-surface rounded-32px h-90 mt-8 col-start-5 col-span-2"
  />
  <div class="flex flex-col mt-8 gap-2 col-start-7">
    {#each data.links as link}
      <a class="font-550 text-xl" href={link.url}>{link.label}</a>
    {/each}
  </div>
</section>

<section class="mt-20 prose">
  <Markdoc content={content.children[content.children.length - 1]} {components} />
</section>

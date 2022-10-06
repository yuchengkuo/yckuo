<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import { components } from '$lib/content/components'

  import Palette from './Palette.svelte'
  import Savee from './Savee.svelte'
  import Readcv from './Readcv.svelte'
  import Avatar from './Avatar.svelte'
  import Github from './Github.svelte'

  import type { RenderableTreeNode } from '@markdoc/markdoc'
  import type { PageServerData } from './$types'

  export let data: PageServerData

  let { content } = data.about as { content: Exclude<RenderableTreeNode, string> }
  $: ({ content } = data.about as { content: Exclude<RenderableTreeNode, string> })

  let overview = { ...content }
  overview.children = overview.children.slice(0, -1)
</script>

<Head title="About · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'green')
  </script>
</Head>

<section class="mt-8 *grid">
  <div class="col-span-3">
    <h1 class="mb-8">{data.about.title}</h1>
    <div class="text-fg-secondary prose">
      <Markdoc content={overview} {components} />
    </div>
  </div>

  <div class="flex flex-wrap mt-8 gap-6 col-start-5 col-span-4 justify-end">
    <div class="flex ml-auto w-full">
      <Avatar />
    </div>
    <div class="flex flex-col gap-6 items-end justify-end">
      <Github />
      <Readcv />
    </div>
    <Savee />
  </div>
</section>

<section class="mt-20 text-fg-secondary prose">
  <Markdoc content={content.children[content.children.length - 1]} {components} />
</section>

<Palette />

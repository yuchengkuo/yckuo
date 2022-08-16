<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$components/Head.svelte'

  import { components } from '$lib/markdoc/components'
  import Image from '$lib/image/Image.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  $: console.log(data)
</script>

<Head title="{data.frontmatter.title} · Project · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'violet')
  </script>
</Head>

<section class="*grid pt-16 gap-y-0 phone:block children:(col-start-3 col-span-4) ">
  <h1 class="mb-10 leading-3rem">{data.frontmatter.title}</h1>

  <div class="w-full grid place-items-center children:(col-start-1 col-span-1 row-start-1) ">
    {#each data.frontmatter.image ?? [] as id (id)}
      {@const deg = Math.floor(Math.random() * 20 - 10) % 5}
      <Image
        class="rounded-sm transform aspect-video rotate-[{deg}deg] bg-surafce phone:(h-fit) "
        {id}
        alt={`${data.frontmatter.title} project images`}
      />
    {/each}
  </div>
</section>

<section class="prose project">
  <Markdoc content={data.content} {components} />
</section>

<style>
  h1 {
    font-variation-settings: 'slnt' 4;
  }
</style>

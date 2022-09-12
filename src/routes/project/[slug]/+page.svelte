<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import { motion } from '$lib/animation/motion'

  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'
  import { components } from '$lib/content/components'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="{data.title} · Project · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'violet')
  </script>
</Head>

<section class="mt-12 *grid gap-y-0">
  <div
    use:motion={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
    class="w-full grid col-start-2 col-span-6 place-items-center children:(col-start-1 col-span-1 row-start-1) "
  >
    <Image
      class="bg-surafce rounded-2xl transform overflow-hidden aspect-video phone:(h-fit) "
      id={data.image[0].id}
      aspectRatio={data.image[0].aspectRatio}
      blurDataUrl={data.image[0].blurDataUrl}
      alt={`${data.title} project images`}
    />
  </div>

  <projectmeta class="divide-y divide-border mt-16 col-start-3 col-span-4 block">
    <h1 class="font-600 mb-4">{data.title}</h1>

    <div class="grid pt-8 gap-6 grid-cols-2 phone:block">
      <item class="col-span-full">
        <small>Description</small>
        <p class="mt-2">{data.excerpt}</p>
      </item>

      {#each data.meta ?? [] as meta, index}
        <item class:col-span-full={index === 0 && meta.title === 'Context'}>
          <small>{meta.title}</small>
          <p class="mt-2">{meta.content}</p>
        </item>
      {/each}

      <item>
        <small>Tag</small>
        <p class="mt-2">{data.tag.join(', ')}</p>
      </item>

      <div class="flex flex-wrap col-span-full pt-12 gap-6">
        {#each data.action ?? [] as link}
          <a
            href={link.url}
            class="bg-surface border-border rounded-full border-1 shadow text-center py-2 px-8 block"
            >{link.label}</a
          >
        {/each}
      </div>
    </div>
  </projectmeta>
</section>

<section class="prose project">
  <Markdoc content={data.content} {components} />
</section>

<style>
  h1 {
    font-variation-settings: 'slnt' 2;
  }

  small {
    @apply font-650 text-sm uppercase;
  }

  @screen phone {
    item:not(:first-of-type) {
      @apply mt-6 block;
    }
  }

  item p {
    @apply font-475;
  }
</style>

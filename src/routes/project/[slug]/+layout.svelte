<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import { tagColors } from '$lib/config'
  import Image from '$lib/image/Image.svelte'
  import Head from '$lib/seo/Head.svelte'
  import Header from '../../Header.svelte'

  import type { LayoutServerData } from './$types'

  export let data: LayoutServerData
</script>

<Head
  title={data.project.title}
  description={data.project.excerpt}
  openGraph={{ url: `project/${data.project.slug}` }}
/>

<Header title={data.project.title} />

<section class="max-w-grid" children="col-start-2">
  <div class="mb-10">
    <ul class="flex flex-col gap-4" children="flex gap-4 items-baseline lt-sm:block">
      <li>
        <small>Description</small>
        <p>{data.project.excerpt}</p>
      </li>

      {#each data.project.meta ?? [] as meta}
        <li>
          <small>{meta.title}</small>
          <p>{meta.content}</p>
        </li>
      {/each}

      {#if data.project.tag}
        <li>
          <small>Tag</small>
          <div class="flex flex-wrap gap-2">
            {#each data.project.tag as tag}
              {@const index = Object.keys(Object.fromEntries(data.tags)).indexOf(tag)}
              <p class={tagColors[index] || 'tag-gray'}>
                {tag}
              </p>
            {/each}
          </div>
        </li>
      {/if}

      <li class="my-4">
        <small aria-hidden role="presentation" />
        <div class="flex flex-wrap gap-4">
          {#each data.project.action ?? [] as link}
            <a
              href={link.url}
              class="block bg-fg border-border rounded-lg border text-sm font-700 text-bg text-center py-2.5 px-4.5 transition-all drop-shadow"
              hover="drop-shadow-md"
              data-splitbee-event="Open Link"
              data-splitbee-target={link.url}>{link.label}</a
            >
          {/each}
        </div>
      </li>
    </ul>
  </div>

  {#if data.project.image && !data.project.hideCover}
    {@const image = data.project.image[0]}
    <div
      use:motion={{ initial: { scale: 0.8 }, animate: { scale: 1 }, transition: { delay: 0.3 } }}
      md="w-11/10 justify-self-center"
    >
      <Image
        class="shadow-md rounded-lg"
        id={image.id}
        aspectRatio={image.aspectRatio}
        blurDataUrl={image.blurDataUrl}
        alt="{data.project.title} project cover image"
        isVideo={image.isVideo}
      />
    </div>
  {/if}
</section>

<slot />

<style>
  small {
    --uno: font-600 text-xs tracking-wide text-fg-secondary uppercase basis-24 shrink-0;
  }
</style>

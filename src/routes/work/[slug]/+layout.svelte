<script lang="ts">
  import { onMount } from 'svelte'
  import { scale } from 'svelte/transition'
  import { wrap } from 'popmotion'

  import Header from '../../Header.svelte'
  import Image from '$lib/media/Image.svelte'
  import Head from '$lib/seo/Head.svelte'

  export let data: LayoutServerData

  import type { LayoutServerData } from './$types'

  let current = -1
  onMount(() => {
    const images = data.work.image
    let interval: NodeJS.Timer

    setTimeout(() => {
      interval = setInterval(() => {
        current = wrap(-1, images.length - 1, current)
        current++
      }, 1000)
    }, 400)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<Head title={data.work.title} description={data.work.excerpt} />

<Header title={data.work.title} desc={data.work.tagline} />

<section class="max-w-grid" children="col-start-2">
  <ul class="flex gap-8 items-baseline" children="flex flex-col gap-4">
    <div>
      <li>
        <small>Brief</small>
        <p>{data.work.brief}</p>
      </li>

      {#if data.work.action}
        <li>
          <div class="flex flex-wrap gap-4">
            {#each data.work.action ?? [] as link}
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
      {/if}
    </div>

    <div class="shrink-0">
      <li>
        <small>Duration</small>
        <time class="block">{data.work.duration}</time>
      </li>
      <li>
        <small>Role</small>
        <p>{data.work.role}</p>
      </li>
      <nav class="px-3 -mx-3 py-2 border-1 border-border rounded bg-surface-subtle shadow-sm">
        {#each data.work.highlight as link}
          <a
            href={link.url}
            class="block text-sm mb-px font-500 text-fg-secondary underline"
            hover="text-fg">{link.label}</a
          >
        {/each}
      </nav>
    </div>
  </ul>

  {#if data.work.image}
    <div
      in:scale={{ start: 0.8, delay: 400 }}
      class="bg-surface grid grid-cols-1 grid-rows-1 mt-10 place-content-center"
      md="w-11/10 justify-self-center"
      children="col-start-1 col-span-1 row-start-1 row-span-1"
    >
      {#each data.work.image as image, index}
        <Image
          class="shadow-md rounded-lg {current !== index ? 'opacity-0' : ''}"
          id={image.id}
          aspectRatio={image.aspectRatio}
          blurDataUrl={image.blurDataUrl}
          alt="{data.work.title} project cover image"
          isVideo={image.isVideo}
        />
      {/each}
      <p class="row-start-2 mt-2 font-550 text-sm text-fg-secondary">
        — Some highlights of work at Oen
      </p>
    </div>
  {/if}
</section>

<slot />

<style>
  small {
    --uno: uppercase font-600 text-xs inline-block mb-1;
  }
</style>

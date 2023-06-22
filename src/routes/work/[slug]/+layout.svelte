<script lang="ts">
  import { onMount } from 'svelte'
  import { scale } from 'svelte/transition'
  import { wrap } from 'popmotion'

  import Image from '$lib/media/Image.svelte'
  import Head from '$lib/seo/Head.svelte'

  import Intro from '../../Intro.svelte'

  import type { LayoutData } from './$types'

  export let data: LayoutData

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

<Intro title={data.work.title} />

<p class="max-w mb-8">{data.work.tagline}</p>

<section class="max-w-grid" children="col-start-2">
  <ul>
    {#if data.work}
      {@const { brief, action, duration, role, highlight } = data.work}
      {@const items = [
        { brief, action },
        { duration, role, highlight },
      ]}
      {#each items as item}
        <div>
          {#each Object.entries(item) as [key, value]}
            {#if Array.isArray(value)}
              <li>
                <nav class:action={key === 'action'}>
                  {#each value ?? [] as link (link.url)}
                    <a
                      href={link.url}
                      data-splitbee-event="Open Link"
                      data-splitbee-target={link.url}>{link.label}</a
                    >
                  {/each}
                </nav>
              </li>
            {:else}
              <li>
                <small>{key}</small>
                <p>{value}</p>
              </li>
            {/if}
          {/each}
        </div>
      {/each}
    {/if}
  </ul>

  {#if data.work.image}
    <div
      in:scale={{ start: 0.8, delay: 400 }}
      class="bg-surface grid grid-cols-1 grid-rows-1 mt-10 place-content-center"
      md="w-11/10 justify-self-center"
      children="col-start-1 col-span-1 row-start-1 row-span-1"
    >
      {#each data.work.image as image, index (image.id)}
        <Image
          class="shadow-md rounded-lg {current !== index ? 'opacity-0' : ''}"
          alt="{data.work.title} project cover image"
          {...image}
        />
      {/each}
      <p class="row-start-2 mt-2 font-550 text-sm text-fg-muted">
        — Some highlights of work at {data.work.title}
      </p>
    </div>
  {/if}
</section>

<slot />

<style>
  ul {
    --uno: 'flex gap-8 items-baseline';
    --uno: 'child-last:(shrink-0) children:(flex flex-col gap-4)';
  }
  small {
    --uno: 'uppercase font-600 text-xs inline-block mb-1';
  }
  nav.action {
    --uno: 'flex flex-wrap gap-4';
  }
  nav.action a {
    --uno: 'block bg-fg border-border rounded-lg border text-sm font-700 text-bg text-center py-2.5 px-4.5 transition-all drop-shadow';
  }
  nav:not(.action) {
    --uno: 'px-3 -mx-3 py-2 border-1 border-border rounded bg-surface-muted shadow-sm';
  }
  nav:not(.action) a {
    --uno: 'block attr w-fit mt-1 text-sm text-fg-muted underline-fg-muted/40';
  }
</style>

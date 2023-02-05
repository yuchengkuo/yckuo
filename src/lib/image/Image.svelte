<script lang="ts">
  import { beforeUpdate, onMount, tick } from 'svelte'

  import { getAWebpProps, getImgProps } from './getImgProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  export let id = ''
  let externalSrc = ''
  export { externalSrc as src }
  export let alt = ''
  export let isVideo = false
  export let widths = [280, 560, 840, 1100, 1650, 2100]
  let sourceSizes = [
    '(max-width:1023px) 80vw',
    '(min-width:1024px) and (max-width:1620px) 67vw',
    '1100px',
  ]
  export { sourceSizes as sizes }
  export let transformations: TransformerOption | TransformerVideoOption = {}
  export let blurDataUrl: string = null
  export let aspectRatio: string = null
  export let showcap = false
  let className = ''
  export { className as class }

  let imgEl: HTMLImageElement
  let visible = false
  let current = false

  let src = ''
  let srcset = ''
  let sizes = sourceSizes.join(', ')

  if (!externalSrc) {
    ;({ src, srcset } = getImgProps({
      id,
      widths,
      transformations: transformations as TransformerOption,
    }))
  } else {
    src = externalSrc
    srcset = null
  }

  if (isVideo) {
    ;({ src } = getAWebpProps({
      id,
      width: 320,
      transformations: transformations as TransformerVideoOption,
    }))
    srcset = null
    sizes = null
  }

  beforeUpdate(async () => {
    if (imgEl?.complete) visible = true

    await tick()

    if (!imgEl) return
    if (imgEl.complete) return
    current = true
    imgEl.addEventListener('load', () => {
      if (!current || !imgEl) return
      setTimeout(() => (visible = true), 0)
    })
  })

  onMount(() => {
    return () => (current = false)
  })
</script>

<figure
  on:click
  class="overflow-hidden block isolate all:isolate @container-normal {className}"
  {...$$restProps}
>
  <div
    class="rounded @md:rounded-md @lg:rounded-lg relative overflow-hidden no-js:hidden"
    style="aspect-ratio: {aspectRatio}"
  >
    <div class="bg-surface-subtle inset-0 absolute select-none" class:hidden={visible} />

    {#if blurDataUrl}
      <img
        src={blurDataUrl}
        {alt}
        class:opacity-0={visible}
        class="h-full object-cover w-full inset-0 transition-opacity ease-out duration-300 absolute select-none"
      />
      <div
        class:opacity-0={visible}
        class="inset-0 transition-opacity ease-out duration-300 absolute backdrop-filter backdrop-blur-xl select-none"
      />
    {/if}

    <img
      bind:this={imgEl}
      {src}
      {alt}
      {srcset}
      {sizes}
      loading="lazy"
      class:opacity-0={!visible}
      class="bg-surface h-full object-cover object-center w-full transition-opacity ease-out duration-300"
    />
  </div>

  <noscript>
    <img
      {src}
      {alt}
      {srcset}
      {sizes}
      loading="lazy"
      class="bg-surface h-full object-cover object-center w-full transition-opacity duration-300"
    />
  </noscript>

  {#if showcap}
    <figcaption class="block w-fit h-fit mt-2 font-550 text-sm text-fg-secondary">
      — {alt}
    </figcaption>
  {/if}
</figure>

<style>
  figcaption {
    font-variation-settings: 'slnt' 10;
  }
</style>

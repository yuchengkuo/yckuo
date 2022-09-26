<script lang="ts">
  import { beforeUpdate, onMount, tick } from 'svelte'
  import { inView } from 'motion'

  import { getImgProps } from './getImgProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  export let id: string
  export let alt = ''
  export let widths = [280, 560, 840, 1100, 1650, 2500, 2100]
  export let sizes = [
    '(max-width:1023px) 80vw',
    '(min-width:1024px) and (max-width:1620px) 67vw',
    '1100px',
  ]
  export let transformations: TransformerOption | TransformerVideoOption = {}
  export let blurDataUrl: string = null
  export let aspectRatio: string = null
  export let showcap = false
  let className = ''
  export { className as class }

  let imgEl: HTMLImageElement
  let container: HTMLElement
  let visible = false
  let inview = false
  let current = false

  const { src, srcset } = getImgProps({ id, widths, transformations })

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
    inView(container, () => {
      inview = true
    })
    return () => (current = false)
  })
</script>

<figure on:click bind:this={container} class={className} style:display="block" {...$$restProps}>
  <div class="rounded-lg relative overflow-hidden no-js:hidden aspect-{aspectRatio}">
    <div class="bg-surface inset-0 absolute" class:hidden={visible} />

    {#if blurDataUrl}
      <img
        src={blurDataUrl}
        {alt}
        class="h-full object-cover w-full inset-0 transition-opacity ease-out duration-300 absolute"
        class:opacity-0={visible}
      />
      <div
        class="inset-0 transition-opacity ease-out duration-300 absolute backdrop-filter backdrop-blur-xl"
        class:opacity-0={visible}
      />
    {/if}

    {#if inview}
      <img
        bind:this={imgEl}
        {src}
        {alt}
        {srcset}
        sizes={sizes.join(', ')}
        class="bg-surface h-full object-cover object-center w-full transition-opacity ease-out duration-300"
        class:opacity-0={!visible}
      />
    {/if}

    <noscript>
      <img
        {src}
        {alt}
        {srcset}
        sizes={sizes.join(', ')}
        class="bg-surface h-full object-cover object-center w-full transition-opacity duration-300"
      />
    </noscript>
  </div>
  {#if showcap}
    <figcaption class="h-fit font-500 mt-4 text-base w-fit block">— {alt}</figcaption>
  {/if}
</figure>

<style>
  figcaption {
    font-variation-settings: 'slnt' 10;
  }
</style>

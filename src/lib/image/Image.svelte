<script lang="ts">
  import { beforeUpdate, onMount } from 'svelte'

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
  export let blurDataUrl = ''
  export let showcap = false

  let imgEl: HTMLImageElement
  let visible = false

  const { src, srcset } = getImgProps({ id, widths, transformations })

  beforeUpdate(() => {
    if (imgEl?.complete) visible = true
  })

  onMount(() => {
    if (!imgEl) return
    if (imgEl.complete) return
    let current = true
    imgEl.addEventListener('load', () => {
      if (!current || !imgEl) return
      setTimeout(() => (visible = true), 0)
    })
    return () => (current = false)
  })
</script>

<image-wrap on:click {...$$restProps} style="display: block;">
  {#if blurDataUrl}
    <img src={blurDataUrl} {alt} class="rounded object-cover object-center" />
    <div class="rounded object-cover object-center backdrop-filter backdrop-blur-lg" />
  {/if}
  <div class="bg-surface rounded h-full w-full" class:hidden={visible} />
  <img
    bind:this={imgEl}
    {src}
    {alt}
    {srcset}
    sizes={sizes.join(', ')}
    class="bg-surface rounded h-full object-cover object-center w-full transition-opacity duration-300"
    class:opacity-0={!visible}
  />
  <noscript>
    <img
      {src}
      {alt}
      {srcset}
      sizes={sizes.join(', ')}
      class="bg-surface rounded h-full object-cover object-center w-full transition-opacity duration-300"
    />
  </noscript>
  {#if showcap}
    <caption class="font-500 mt-4 text-base w-fit block">— {alt}</caption>
  {/if}
</image-wrap>

<style>
  caption {
    font-variation-settings: 'slnt' 10;
  }
</style>

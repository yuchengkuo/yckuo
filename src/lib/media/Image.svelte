<script lang="ts">
  import { beforeUpdate } from 'svelte'

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
    '(min-width:1024px) and (max-width:1620px) 80vw',
    '1100px'
  ]
  export { sourceSizes as sizes }
  export let transformations: TransformerOption | TransformerVideoOption = {}
  export let blurDataUrl: string | null = null
  export let aspectRatio: string | null = null
  export let showcap = false
  let className = ''
  export { className as class }

  let imgEl: HTMLImageElement
  let visible = true

  let src = ''
  let srcset: string | null = ''
  let sizes: string | null = sourceSizes.join(', ')

  if (!externalSrc) {
    ;({ src, srcset } = getImgProps({
      id,
      widths,
      transformations: transformations as TransformerOption
    }))
  } else {
    src = externalSrc
    srcset = null
  }

  if (isVideo) {
    ;({ src } = getAWebpProps({
      id,
      width: 1200,
      transformations: transformations as TransformerVideoOption
    }))
    srcset = null
    sizes = null
  }

  beforeUpdate(() => {
    if (imgEl?.complete) visible = true

    if (!imgEl) return
    if (imgEl.complete) return
    imgEl.addEventListener('load', () => {
      if (!imgEl) return
      setTimeout(() => (visible = true), 0)
    })
  })
</script>

<figure class={className} {...$$restProps}>
  <div style="aspect-ratio: {aspectRatio}">
    <!-- Blurred placeholder -->
    {#if blurDataUrl}
      <img
        src={blurDataUrl}
        alt=""
        class:opacity-0={visible}
        class="absolute inset-0 select-none"
      />
      <div role="presentation" class:opacity-0={visible} />
    {/if}

    <!-- Actual img element -->
    <img bind:this={imgEl} {src} {alt} {srcset} {sizes} loading="lazy" class:opacity-0={!visible} />
  </div>

  <noscript>
    <img {src} {alt} {srcset} {sizes} loading="lazy" />
  </noscript>

  {#if showcap}
    <figcaption><i class="i-ri-arrow-right-double-line" /> {alt}</figcaption>
  {/if}
</figure>

<style>
  figure {
    --uno: 'overflow-hidden block isolate all:isolate bg-surface';
  }
  /* Wrapper */
  figure > div {
    --uno: 'rounded bg-surface-muted relative overflow-hidden no-js:hidden';
  }
  /* Blurred overlay */
  div[role='presentation'] {
    --uno: 'absolute inset-0 transition-opacity ease-out duration-300 backdrop-filter backdrop-blur-xl select-none';
  }
  img {
    --uno: 'w-full h-full object-cover object-center transition-opacity ease-out duration-300';
  }
  figcaption {
    --uno: 'block w-fit h-fit mt-2 font-medium text-sm text-fg-muted';
  }
</style>

<script lang="ts">
  import { getAWebpProps, getImgProps } from './getImgProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  interface Props {
    id?: string //Cloudinary ID
    src?: string
    alt?: string
    isVideo?: boolean
    widths?: number[]
    sizes?: string[] | string | null
    transformations?: TransformerOption | TransformerVideoOption
    blurDataUrl?: string | null
    aspectRatio?: string | null
    title?: string
    description?: string
    class?: string
    loading?: 'lazy' | 'eager'
  }

  let {
    id = '',
    src = '',
    alt = '',
    isVideo = false,
    widths = [400, 840, 1100, 1650, 2100],
    sizes = ['(max-width:896px) 100vw', '(max-width:1620px) 80vw', '1920px'],
    transformations = {},
    blurDataUrl,
    aspectRatio,
    title,
    description,
    class: classname,
    loading = 'lazy',
    ...rest
  }: Props = $props()

  let imgEl: HTMLImageElement

  let visible = $state(true)

  const resolvedSizes = $derived(
    isVideo ? null : Array.isArray(sizes) ? sizes.join(', ') : sizes
  )

  const imgData = $derived.by(() => {
    if (isVideo) {
      const webpProps = getAWebpProps({
        id,
        width: 1200,
        transformations: transformations as TransformerVideoOption
      })
      return { src: webpProps.src, srcset: null }
    }
    if (!src) {
      const imgProps = getImgProps({
        id,
        widths,
        transformations: transformations as TransformerOption
      })
      return { src: imgProps.src, srcset: imgProps.srcset }
    }
    return { src, srcset: null }
  })

  $effect.pre(() => {
    if (imgEl?.complete) visible = true

    if (!imgEl) return
    if (imgEl.complete) return
    imgEl.addEventListener('load', () => {
      if (!imgEl) return
      setTimeout(() => (visible = true), 0)
    })
  })
</script>

<figure class={classname} {...rest}>
  <div style="aspect-ratio: {aspectRatio}">
    <!-- Blurred placeholder -->
    {#if blurDataUrl}
      <img
        src={blurDataUrl}
        alt=""
        class:opacity-0={visible}
        class="absolute inset-0 select-none"
      />
      <div role="presentation" class:opacity-0={visible}></div>
    {/if}

    <!-- Actual img element -->
    <img bind:this={imgEl} src={imgData.src} {alt} srcset={imgData.srcset} sizes={resolvedSizes} {loading} class:opacity-0={!visible} />
  </div>

  <noscript>
    <img src={imgData.src} {alt} srcset={imgData.srcset} sizes={resolvedSizes} {loading} />
  </noscript>

  {#if title}
    <figcaption>
      {title}
      {#if description}
        <div class="text-tertiary"><i class="i-ri-arrow-right-double-line"></i> {description}</div>
      {/if}
    </figcaption>
  {/if}
</figure>

<style>
  figure {
    --uno: 'overflow-hidden block isolate all:isolate';
  }
  /* Wrapper */
  figure > div {
    --uno: 'rounded bg-surface relative overflow-hidden no-js:hidden';
  }
  /* Blurred overlay */
  div[role='presentation'] {
    --uno: 'absolute inset-0 transition-opacity ease-out duration-300 select-none';
  }
  img {
    --uno: 'w-full h-full object-cover object-center transition-opacity ease-out duration-300';
  }
  figcaption {
    --uno: 'block w-fit h-fit mt-2 font-medium text-sm';
  }
</style>

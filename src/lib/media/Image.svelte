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
    aspectRatio,
    title,
    description,
    class: classname,
    loading = 'lazy',
    ...rest
  }: Props = $props()

  const resolvedSizes = $derived(isVideo ? null : Array.isArray(sizes) ? sizes.join(', ') : sizes)

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
</script>

<figure class={classname} {...rest}>
  <div style="aspect-ratio: {aspectRatio}">
    <img src={imgData.src} {alt} srcset={imgData.srcset} sizes={resolvedSizes} {loading} />
  </div>

  {#if title}
    <figcaption>
      {title}
      {#if description}
        <div class="text-tertiary mt-1">
          <i class="i-ri-arrow-right-double-line"></i>
          {description}
        </div>
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
    --uno: 'rounded-0.5 bg-surface overflow-hidden';
  }
  img {
    --uno: 'w-full h-full object-cover object-center';
  }
  figcaption {
    --uno: 'block w-fit h-fit mt-2 font-mono font-medium text-xs';
  }
</style>

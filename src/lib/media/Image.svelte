<script lang="ts">
  import { getAWebpProps, getImgProps } from './getImgProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  interface Props {
    id?: string // Cloudinary id
    src?: string
    alt?: string
    isVideo?: boolean
    widths?: number[]
    sizes?: string[] | string | null
    transformations?: TransformerOption | TransformerVideoOption
    /* Required, with no default — see `aspectRatio.ts`. A12 fails the build on an unsized
       box. */
    aspectRatio: string
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
      <span role="presentation" class="text-tertiary select-none w-fit">[→]</span><span
        class="start-2">{title}</span
      >{#if description}
        <span class="block text-tertiary start-2">
          {description}
        </span>
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
    --uno: 'rounded-0.5 bg-surface overflow-hidden border border-neutral';
  }
  img {
    --uno: 'w-full h-full object-cover object-center';
  }
  figcaption {
    --uno: 'grid gap-x-1.5 w-fit h-fit mt-2.5';
  }
</style>

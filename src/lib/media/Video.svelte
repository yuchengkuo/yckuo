<script lang="ts">
  import { getVideoProps } from './getVideoProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  interface Props {
    id?: string
    src?: string
    alt?: string

    transformations?: TransformerOption | TransformerVideoOption
    aspectRatio?: string
    showcap?: boolean
    class?: string

    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    playsinline?: boolean
  }

  let {
    id = '',
    src = '',
    alt = '',

    transformations = {},
    aspectRatio,
    showcap = false,
    class: classname,

    autoplay = true,
    muted = true,
    loop = true,
    playsinline = true,

    ...rest
  }: Props = $props()

  const resolvedSrc = $derived(
    src || getVideoProps({ id, transformations: transformations as TransformerOption }).src
  )
</script>

<figure class={classname} style="aspect-ratio: {aspectRatio}" {...rest}>
  <div>
    <video {autoplay} {muted} {loop} {playsinline} disablepictureinpicture={false}>
      <source src={resolvedSrc} />
    </video>
  </div>

  {#if showcap}
    <small>
      <i class="i-ri-arrow-right-double-line"></i>
      {alt}
    </small>
  {/if}
</figure>

<style>
  figure {
    --uno: 'block';
  }
  /* Wrapper */
  figure > div {
    --uno: 'overflow-hidden rounded';
  }

  video {
    --uno: 'w-full bg-surface';
  }

  small {
    --uno: 'block w-fit h-fit mt-2 font-550 text-sm text-tertiary';
  }
</style>

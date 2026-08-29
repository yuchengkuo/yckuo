<script lang="ts">
  import { getVideoProps } from './getVideoProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  interface Props {
    id?: string
    src?: string
    alt?: string

    transformations?: TransformerOption | TransformerVideoOption
    /* REQUIRED, as in `Image.svelte`, and for the same reason. */
    aspectRatio: string
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

<figure class={classname} {...rest}>
  <!-- The box goes on the WRAPPER, not the figure: the figure also holds the caption, and
       a ratio there makes the caption eat into the space reserved for the video. -->
  <div style="aspect-ratio: {aspectRatio}">
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
    --uno: 'overflow-hidden rounded-0.5 border border-neutral';
  }

  video {
    --uno: 'w-full h-full object-cover bg-surface';
  }

  small {
    --uno: 'block w-fit h-fit mt-2 font-550 text-sm text-tertiary';
  }
</style>

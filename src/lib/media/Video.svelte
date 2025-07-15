<script lang="ts">
  import { getVideoProps } from './getVideoProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  interface Props {
    id?: string
    src?: string
    alt?: string

    transformations?: TransformerOption | TransformerVideoOption
    blurDataUrl?: string
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
    blurDataUrl,
    aspectRatio,
    showcap = false,
    class: classname,

    autoplay = true,
    muted = true,
    loop = true,
    playsinline = true,

    ...rest
  }: Props = $props()

  if (!src) {
    ;({ src } = getVideoProps({
      id,
      transformations: transformations as TransformerOption
    }))
  }

  let videoEl: HTMLVideoElement
  let visible = $state(false)

  $effect(() => {
    // 0 if no media is available yet
    if (videoEl?.videoWidth) visible = true

    if (!videoEl) return
    if (videoEl.videoWidth) return
    videoEl.addEventListener('loadeddata', () => {
      if (!videoEl) return
      setTimeout(() => (visible = true), 0)
    })
  })
</script>

<figure class={classname} style="aspect-ratio: {aspectRatio}" {...rest}>
  <div>
    <video
      bind:this={videoEl}
      {autoplay}
      {muted}
      {loop}
      {playsinline}
      disablepictureinpicture={false}
      poster={blurDataUrl}
    >
      <source {src} />
    </video>
    <div role="presentation" class:opacity-0={visible}></div>
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
    --uno: 'relative overflow-hidden rounded';
  }

  video {
    --uno: 'w-full bg-surface';
  }
  div[role='presentation'] {
    --uno: 'absolute inset-0 transition-opacity ease-out duration-300 backdrop-filter backdrop-blur-xl select-none';
  }

  small {
    --uno: 'block w-fit h-fit mt-2 font-550 text-sm text-tertiary';
  }
</style>

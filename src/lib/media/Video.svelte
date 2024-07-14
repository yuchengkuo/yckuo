<script lang="ts">
  import { getVideoProps } from './getVideoProps'
  import { beforeUpdate, tick } from 'svelte'

  import type {
    TransformerOption,
    TransformerVideoOption,
  } from '@cld-apis/types'

  export let autoplay = true
  export let muted = true
  export let loop = true
  export let playsinline = true

  export let id = ''
  let externalSrc = ''
  export { externalSrc as src }
  export let alt = ''

  export let transformations: TransformerOption | TransformerVideoOption = {}
  export let blurDataUrl: string | null = null
  export let aspectRatio: string | null = null
  export let showcap = false
  let className = ''
  export { className as class }

  let src = ''
  if (!externalSrc) {
    ;({ src } = getVideoProps({
      id,
      transformations: transformations as TransformerOption,
    }))
  }

  let videoEl: HTMLVideoElement
  let visible = false

  beforeUpdate(async () => {
    // 0 if no media is available yet
    if (videoEl?.videoWidth) visible = true

    await tick()

    if (!videoEl) return
    if (videoEl.videoWidth) return
    videoEl.addEventListener('loadeddata', () => {
      if (!videoEl) return
      setTimeout(() => (visible = true), 0)
    })
  })
</script>

<videoplayer
  class={className}
  style="aspect-ratio: {aspectRatio}"
  {...$$restProps}
>
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
    <div role="presentation" class:opacity-0={visible} />
  </div>

  {#if showcap}
    <small>
      <i class="i-ri-arrow-right-double-line" />
      {alt}
    </small>
  {/if}
</videoplayer>

<style>
  videoplayer {
    --uno: 'block';
  }
  /* Wrapper */
  videoplayer > div {
    --uno: 'relative overflow-hidden rounded';
  }

  video {
    --uno: 'w-full bg-surface-muted';
  }
  div[role='presentation'] {
    --uno: 'absolute inset-0 transition-opacity ease-out duration-300 backdrop-filter backdrop-blur-xl select-none';
  }

  small {
    --uno: 'block w-fit h-fit mt-2 font-550 text-sm text-fg-muted';
  }
</style>

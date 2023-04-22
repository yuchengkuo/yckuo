<script lang="ts">
  import { getVideoProps } from './getVideoProps'
  import { beforeUpdate, onMount, tick } from 'svelte'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  export let autoplay = true
  export let muted = true
  export let loop = true
  export let playsinline = true

  export let id = ''
  let externalSrc = ''
  export { externalSrc as src }
  export let alt = ''

  export let transformations: TransformerOption | TransformerVideoOption = {}
  export let blurDataUrl: string = null
  export let aspectRatio: string = null
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
  let current = false

  beforeUpdate(async () => {
    // 0 if no media is available yet
    if (videoEl?.videoWidth) visible = true

    await tick()

    if (!videoEl) return
    if (videoEl.videoWidth) return
    current = true
    videoEl.addEventListener('loadeddata', () => {
      if (!current || !videoEl) return
      setTimeout(() => (visible = true), 0)
    })
  })

  onMount(() => {
    return () => (current = false)
  })
</script>

<videoplayer
  class="block @container-normal {className}"
  style="aspect-ratio: {aspectRatio}"
  {...$$restProps}
>
  <div class="relative overflow-hidden rounded @md:rounded-md @lg:rounded-lg">
    <video
      bind:this={videoEl}
      {autoplay}
      {muted}
      {loop}
      {playsinline}
      disablepictureinpicture={false}
      poster={blurDataUrl}
      class="w-full bg-surface-subtle"
    >
      <source {src} />
    </video>
    <div
      class:opacity-0={visible}
      class="inset-0 transition-opacity ease-out duration-300 absolute backdrop-filter backdrop-blur-xl select-none"
    />
  </div>

  {#if showcap}
    <small class="block w-fit h-fit mt-2 font-550 text-sm text-fg-secondary">
      — {alt}
    </small>
  {/if}
</videoplayer>

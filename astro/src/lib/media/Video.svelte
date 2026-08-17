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

  const resolvedSrc = $derived(
    src || getVideoProps({ id, transformations: transformations as TransformerOption }).src
  )

  let videoEl: HTMLVideoElement

  /*
   * PORT (18). `$state(true)`, aligning with `Image.svelte:41`. This is the one
   * character by which the two media components ever differed, and the difference
   * was accidental: both carry the same blurred-placeholder machinery, but Image
   * gates its overlay on `blurDataUrl` and starts visible, while Video gates its
   * overlay on nothing and starts hidden. `getBlurDataUrl.ts` was deleted by ticket
   * 10 and nothing has produced a `blurDataUrl` since, so Image's overlay renders
   * never and Video's renders always — same intent, opposite outcome.
   *
   * Starting `true` makes the $effect below inert exactly the way Image's is (it can
   * only re-set `true`), which is what lets `Img.astro` render this without a
   * `client:` directive. That matters beyond the JS: `<astro-island>` is
   * `display: contents`, so it generates no box while still matching every
   * `>`-combinator, and it was placing all 10 video figures at one subgrid track
   * instead of four (16-1). The overlay element still renders, with `opacity-0`
   * from the server, so the box tree is identical to the SvelteKit prerender.
   *
   * The cost is stated: video no longer blurs-in over 300ms on first frame. Image
   * has not done so since ticket 10 either.
   */
  let visible = $state(true)

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
      <source src={resolvedSrc} />
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

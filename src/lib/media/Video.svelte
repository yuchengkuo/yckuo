<script lang="ts">
  import { getVideoProps } from './getVideoProps'

  import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

  interface Props {
    id?: string
    src?: string
    alt?: string

    transformations?: TransformerOption | TransformerVideoOption
    /* Required — see `Image.svelte`. */
    aspectRatio: string
    title?: string
    description?: string
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
    title,
    description,
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
  <!-- The ratio goes on the wrapper, not the figure: on the figure, the caption would eat
       the video's reserved space. -->
  <div style="aspect-ratio: {aspectRatio}">
    <video
      {autoplay}
      {muted}
      {loop}
      {playsinline}
      disablepictureinpicture={false}
      aria-label={alt || undefined}
    >
      <source src={resolvedSrc} />
    </video>
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
    --uno: 'block';
  }
  /* Wrapper */
  figure > div {
    --uno: 'overflow-hidden rounded-0.5 border border-neutral';
  }

  video {
    --uno: 'w-full h-full object-cover bg-surface';
  }

  figcaption {
    --uno: 'grid gap-x-1.5 w-fit h-fit mt-2.5 lt-sm:mt-1.5';
  }
</style>

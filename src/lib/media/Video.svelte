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

  /* No poster for an explicit `src`: it names an asset Cloudinary cannot cut a still from. */
  const videoProps = $derived(
    src
      ? { src, poster: undefined }
      : getVideoProps({ id, transformations: transformations as TransformerOption })
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
      poster={videoProps.poster}
      aria-label={alt || undefined}
    >
      <source src={videoProps.src} />
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
    /* The surface tone is the placeholder, so it belongs here and not on the `video`: the
       gate takes that element to `opacity: 0`, and a tone on it would go too. */
    --uno: 'overflow-hidden rounded-0.5 bg-surface border border-neutral';
  }

  /*
   * The same gate as `Image.svelte`, opened by the script in `Base.astro` — but on the
   * poster, not on `loadeddata`. The poster paints *inside* the element, so `opacity: 0`
   * hides it too, and `loadeddata` fires at the moment the poster would stop being shown:
   * gating there would leave the box blank until video bytes arrive.
   *
   * No `color: transparent` to match: a video paints no alt string, and the label is on
   * `aria-label`.
   */
  video {
    --uno: 'w-full h-full object-cover';
    opacity: 0;
  }
  /*
   * `:global` on the attribute only, which still compiles to `video.svelte-<hash>[…]` and
   * stays scoped. Without it Svelte prunes both rules: nothing in this markup carries
   * `data-loaded`, the script adds it at runtime, and the build stays green with every
   * video invisible for good. `Image.svelte` is spared only because its own markup writes
   * the attribute.
   */
  video:global([data-loaded]) {
    opacity: 1;
    transition: opacity 200ms ease-out;
  }
  @media (prefers-reduced-motion: reduce) {
    video:global([data-loaded]) {
      transition-duration: 0s;
    }
  }

  figcaption {
    --uno: 'grid gap-x-1.5 w-fit h-fit mt-2.5 lt-sm:mt-1.5';
  }
</style>

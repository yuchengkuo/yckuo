<script lang="ts">
  import { DEFAULT_WIDTHS, getAWebpProps, getImgProps } from './getImgProps'

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
    /* Exempts this image from the reveal gate: it ships already carrying `data-loaded`, so
       it is never at `opacity: 0` and stays eligible to be the LCP. Pass it only on an
       above-the-fold image — it also fetches eagerly at high priority. */
    priority?: boolean
  }

  let {
    id = '',
    src = '',
    alt = '',
    isVideo = false,
    widths = DEFAULT_WIDTHS,
    sizes = ['(max-width:896px) 100vw', '(max-width:1620px) 80vw', '1920px'],
    transformations = {},
    aspectRatio,
    title,
    description,
    class: classname,
    loading = 'lazy',
    priority = false,
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
    <img
      src={imgData.src}
      {alt}
      srcset={imgData.srcset}
      sizes={resolvedSizes}
      loading={priority ? 'eager' : loading}
      fetchpriority={priority ? 'high' : undefined}
      data-loaded={priority ? '' : undefined}
    />
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
  /*
   * Two layers, deliberately independent. `color: transparent` hides the alt string the
   * browser paints into an imageless box, leaving the attribute itself intact for assistive
   * technology. The opacity gate hides the top-to-bottom wipe — every URL is `f_auto`, and
   * WebP has no progressive mode to paint.
   *
   * Only the gate needs the script, so a script that never runs costs the fade and keeps
   * the alt-text fix. `Base.astro` carries the opener and the no-JS override.
   */
  img {
    --uno: 'w-full h-full object-cover object-center';
    opacity: 0;
    color: transparent;
  }
  /* On the revealed state, not the hidden one: a transition is governed by its destination,
     so a duration written above would govern only a reverse that never happens. */
  img[data-loaded] {
    opacity: 1;
    color: inherit;
    transition: opacity 200ms ease-out;
  }
  @media (prefers-reduced-motion: reduce) {
    /* Collapse the duration rather than skip the reveal — the preference removes the
       animation, not the content. */
    img[data-loaded] {
      transition-duration: 0s;
    }
  }
  figcaption {
    --uno: 'grid gap-x-1.5 w-fit h-fit mt-2.5 lt-sm:mt-1.5';
  }
</style>

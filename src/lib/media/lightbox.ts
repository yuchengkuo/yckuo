/*
 * Parses the rendered markup of `Image.svelte` and `Video.svelte`. Change either one's
 * `figure > div > img|video` shape or figcaption order and the lightbox breaks with a green
 * build.
 */

/* The box A12 counts. `main` keeps the lightbox's own box, outside it, from matching. */
export const MEDIA_BOX = 'main figure > div'

interface Base {
  box: HTMLElement
  width: number
  height: number
  alt: string
  title?: string
  description?: string
}

export type LightboxItem =
  | (Base & { kind: 'image'; src: string; srcset?: string })
  | (Base & { kind: 'video'; src: string; poster?: string })

/* In document order, which puts a work's `thumbnail` first. */
export function collectMedia(root: ParentNode = document): LightboxItem[] {
  const items: LightboxItem[] = []

  for (const box of root.querySelectorAll<HTMLElement>(MEDIA_BOX)) {
    const [width, height] = box.style.aspectRatio.split('/').map(Number)
    if (!(width > 0 && height > 0)) continue

    /* `[→]`, then the caption, then the optional description. */
    const caption = box.parentElement?.querySelector(':scope > figcaption')
    const text = (el?: Element | null) => el?.textContent?.trim() || undefined
    const base = {
      box,
      width,
      height,
      title: text(caption?.children[1]),
      description: text(caption?.children[2])
    }

    const img = box.querySelector('img')
    const video = box.querySelector('video')
    if (img) {
      items.push({
        ...base,
        kind: 'image',
        alt: img.alt,
        src: img.getAttribute('src') ?? '',
        srcset: img.getAttribute('srcset') ?? undefined
      })
    } else if (video) {
      items.push({
        ...base,
        kind: 'video',
        alt: video.getAttribute('aria-label') ?? '',
        src: video.querySelector('source')?.getAttribute('src') ?? video.src,
        poster: video.getAttribute('poster') ?? undefined
      })
    }
  }

  return items
}

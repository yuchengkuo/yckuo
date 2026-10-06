/*
 * The vocabulary an author uses to hand an image's placement back to themselves:
 * `.span-N`, `.start-N`, `.end-N` in content source, or the same prefixes on a resolved
 * CSS class token. Shared between `Img.astro` (deciding whether a class list already
 * carries one, so it knows to skip a derived `data-span`) and `port-guard.mjs`'s A1
 * census (counting annotation tokens in content) — one list, so a prefix added to the
 * vocabulary can't update one and silently miss the other.
 */
export const PLACEMENT_PREFIXES = ['span', 'start', 'end'] as const

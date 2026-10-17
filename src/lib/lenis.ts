import Lenis from 'lenis'

/* Shared so the lightbox can stop it; otherwise the page scrolls under the open dialog. */
export const lenis = new Lenis({ autoRaf: true, lerp: 0.3 })

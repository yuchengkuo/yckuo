import type { ScrambleOptions } from './scramble.svelte'

type ScrambleOptionsNoText = Omit<ScrambleOptions, 'text'>

/* U+2300–U+238B, Miscellaneous Technical: ⌘, ⌥, ⇧ */
export const glitch: ScrambleOptionsNoText = {
  overflow: false,
  scramble: 3,
  speed: 0.15,
  chance: 0.1,
  range: [8960, 9099],
  seed: 5
}

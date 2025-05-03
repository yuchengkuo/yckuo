import type { ScrambleOptions } from './scramble.svelte'

type ScrambleOptionsNoText = Omit<ScrambleOptions, 'text'>

/* Glith effect with technical symbols like ⌘, ⌥, ⇧ */
export const glitch: ScrambleOptionsNoText = {
  overflow: false,
  scramble: 3,
  speed: 0.15,
  chance: 0.2,
  range: [8960, 9099],
  seed: 5
}

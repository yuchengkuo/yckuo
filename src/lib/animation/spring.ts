import { spring } from 'motion'

export function springCSSString() {
  return spring({
    keyframes: [0, 1],
    stiffness: 180,
    damping: 35,
    mass: 1
  }).toString()
}

import { animate, spring, stagger } from 'motion'
import { fadeup } from './keyframes'
import type { Config } from './index'

export default function motionline(
  element: Element,
  config: Config = {
    keyframes: fadeup,
    options: {
      easing: spring({ mass: 1, stiffness: 50 }),
      delay: stagger(0.1, { start: 0.8 }),
    },
  }
): SvelteActionReturnType {
  const children = Array.from(element.children)
  animate(children, config.keyframes, config.options)
  return {
    update(args) {
      animate(children, args.keyframes, args.options)
    },
  }
}

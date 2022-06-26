import { animate } from 'motion'
import type { MotionKeyframesDefinition, AnimationOptionsWithOverrides } from '@motionone/dom'

export type Config = {
  keyframes: MotionKeyframesDefinition
  options?: AnimationOptionsWithOverrides
}

export default function motion(element: Element, config: Config) {
  animate(element, config.keyframes, config.options)
  return {
    update(args: Config) {
      animate(element, args.keyframes, args.options)
    },
  }
}

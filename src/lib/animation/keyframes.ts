import type { Config } from './index'

export const fade: Config['keyframes'] = { opacity: [0, 1] }

export const fadeup: Config['keyframes'] = {
  y: ['20%', 0],
  opacity: [0, 1],
  rotateX: [-20, 0],
  rotateY: [5, 0],
}

export const fadedown: Config['keyframes'] = { y: ['-15%', 0], opacity: [0, 1], rotateX: [20, 0] }

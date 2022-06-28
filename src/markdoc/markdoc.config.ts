import type { ConfigType } from '@markdoc/markdoc'
import { document } from './document.markdoc'
import { heading } from './heading.markdoc'
import { image } from './image.markdoc'

export const config: ConfigType = {
  functions: {},
  nodes: {
    document,
    heading,
  },
  partials: {},
  tags: {
    image,
  },
  validation: {},
  variables: {},
}

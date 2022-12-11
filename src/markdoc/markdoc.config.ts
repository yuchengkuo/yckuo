import type { ConfigType } from '@markdoc/markdoc'
import { document } from './node/document.markdoc'
import { fence } from './node/fence.markdoc'
import { gallery } from './tag/gallery.markdoc'
import { grid } from './tag/grid.markdoc'
import { heading } from './node/heading.markdoc'
import { image } from './tag/image.markdoc'

export const config: ConfigType = {
  functions: {},
  nodes: {
    document,
    heading,
    fence,
  },
  partials: {},
  tags: {
    about: { render: 'About' },
    gallery,
    grid,
    image,
    kbd: { render: 'kbd' },
    shortcut: { render: 'Shortcut' },
  },
  validation: {},
  variables: {},
}

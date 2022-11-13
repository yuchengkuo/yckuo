import type { ConfigType } from '@markdoc/markdoc'
import { column } from './columns.markdoc'
import { document } from './document.markdoc'
import { fence } from './fence.markdoc'
import { gallery } from './gallery.markdoc'
import { grid } from './grid.markdoc'
import { heading } from './heading.markdoc'
import { image } from './image.markdoc'

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
    column,
    gallery,
    grid,
    image,
    kbd: { render: 'kbd' },
    shortcut: { render: 'Shortcut' },
  },
  validation: {},
  variables: {},
}

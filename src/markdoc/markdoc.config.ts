import type { ConfigType } from '@markdoc/markdoc'
import { document } from './node/document.markdoc'
import { fence } from './node/fence.markdoc'
import { gallery } from './tag/gallery.markdoc'
import { grid } from './tag/grid.markdoc'
import { heading } from './node/heading.markdoc'
import { image } from './tag/image.markdoc'
import { widget } from './tag/widget.markdoc'
import { carousel } from './tag/carousel.markdoc'
import { video } from './tag/video.markdoc'
import { code } from './node/code.markdoc'

export const config: ConfigType = {
  functions: {},
  nodes: {
    code,
    document,
    heading,
    fence,
  },
  partials: {},
  tags: {
    about: { render: 'About' },
    carousel,
    gallery,
    grid,
    image,
    kbd: { render: 'kbd' },
    shortcut: { render: 'Shortcut' },
    video,
    widget,
  },
  validation: {},
  variables: {},
}

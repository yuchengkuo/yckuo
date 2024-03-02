import type { ConfigType, MaybePromise } from 'npm:@markdoc/markdoc'

import { document } from './node/document.markdoc.ts'
import { fence } from './node/fence.markdoc.ts'
import { heading } from './node/heading.markdoc.ts'
import { code } from './node/code.markdoc.ts'

import { gallery } from './tag/gallery.markdoc.ts'
import { grid } from './tag/grid.markdoc.ts'
import { image } from './tag/image.markdoc.ts'
import { widget } from './tag/widget.markdoc.ts'
import { carousel } from './tag/carousel.markdoc.ts'
import { video } from './tag/video.markdoc.ts'

const markdocConfig: ConfigType = {
  functions: {},
  nodes: {
    document,
    heading,
    fence: await fence(),
  },
  tags: {
    kbd: { render: 'kbd' },
  },
  partials: {},
  validation: {},
  variables: {},
}

export default markdocConfig

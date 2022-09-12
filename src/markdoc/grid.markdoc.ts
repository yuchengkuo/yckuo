import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'
import { sectionize, visit } from './utils'

export const grid: Schema = {
  render: 'grid',
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = await node.transformChildren(config)

    //sectionize content inside this tag
    for (let depth = 6; depth > 0; depth--) {
      visit(
        children,
        (node) => node.name.match(/h\d/) && node.attributes.level === depth,
        sectionize
      )
    }

    return new Tag(this.render, attributes, children)
  },
}

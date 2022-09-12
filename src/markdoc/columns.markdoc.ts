import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'
import { sectionize, visit } from './utils'

export const column: Schema = {
  render: 'column',
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = await node.transformChildren(config)

    // sectionize content inside this tag
    for (let depth = 6; depth > 0; depth--) {
      visit(
        children,
        (node) => node.name.match(/h\d/) && node.attributes.level === depth,
        sectionize
      )
    }

    const classnames = '*grid children:(col-span-2) second-child:col-start-4 last-child:col-start-7'

    return new Tag(this.render, { ...attributes, class: classnames }, children)
  },
}

import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema, Tag as TagType } from '@markdoc/markdoc'
import { sectionize } from './utils'

export const column: Schema = {
  render: 'column',
  attributes: { class: { type: String }, n: { type: Number, default: 3, matches: /2|3/ } },
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = await node.transformChildren(config)

    // if no heading appear 1 level down, wrap all in `section`
    if (!children.some((node) => (node as TagType).name.match(/h\d/))) {
      sectionize(
        children[0] as TagType,
        children as TagType[],
        (node) => children.indexOf(node) === children.length - 1
      )
    }

    const passClass = attributes['class']
    const classnames = `grid grid-cols-${attributes.n} gap-40`

    return new Tag(
      this.render,
      { ...attributes, class: [classnames, passClass].join(' ') },
      children
    )
  },
}

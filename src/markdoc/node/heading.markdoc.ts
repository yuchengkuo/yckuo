import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { RenderableTreeNode, Schema } from '@markdoc/markdoc'

export const heading: Schema = {
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    link: { type: Boolean, default: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const id = generateID(children, attributes)

    return new Tag(`h${node.attributes['level']}`, { ...attributes, id }, [
      ...children,
      attributes['link'] &&
        new Tag('a', { href: `#${id}`, 'aria-hidden': '', tabIndex: '-1' }, ['#']),
    ])
  },
}

function generateID(children: Array<RenderableTreeNode>, attributes: Record<string, unknown>) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

import pkg from 'npm:@markdoc/markdoc'
const { Tag } = pkg
import { type Schema, type Tag as TagType } from 'npm:@markdoc/markdoc'
import { sectionize, visit, isScalar } from '../utils.ts'

export const document: Schema = {
  render: 'article',
  attributes: {
    frontmatter: { default: {}, render: false },
    class: { type: String, default: '' },
  },
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = await node.transformChildren(config)

    if (children.length === 0) {
      return new Tag(this.render, attributes, children)
    }

    // if no heading appear 1 level down, wrap all in `<section>`
    if (!children.some((node) => (node as TagType).name.match(/h\d/))) {
      sectionize(
        children[0] as TagType,
        children as TagType[],
        (node) => children.indexOf(node) === children.length
      )
    }
    // if there're content before first heading, wrap them in `<section>`
    else if (!(children[0] as TagType).name.match(/h\d/)) {
      sectionize(
        children[0] as TagType,
        children as TagType[],
        (node) => !isScalar(node) && Boolean(node.name.match(/h\d/))
      )
    }

    // wrap only h2 and following content by `<section>` for layout
    for (let depth = 3; depth > 1; depth--) {
      visit(
        children,
        (node) =>
          Boolean(node.name.match(/h\d/)) && node.attributes.level === depth,
        sectionize
      )
    }

    return new Tag(
      this.render,
      { ...attributes, class: ['prose', attributes.class].join(' ') },
      children
    )
  },
}

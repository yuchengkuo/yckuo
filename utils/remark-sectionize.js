/**
 * @typedef {import('mdast').Root} Root
 */

import { findAfter } from 'unist-util-find-after'
import { visitParents } from 'unist-util-visit-parents'

const MAX_HEADING_DEPTH = 2

/**
 * Plugin to add sectionize paragraph and add id to it.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */

export default function plugin() {
  return (tree) => {
    for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
      visitParents(
        tree,
        (node) => node.type === 'heading' && node.depth === depth,
        (node, ancestors) => {
          const start = node
          const depth = start.depth
          const parent = ancestors[ancestors.length - 1]
          const id = node.data.id

          const isEnd = (node) =>
            (node.type === 'heading' && node.depth <= depth) || node.type === 'export'
          const end = findAfter(parent, start, isEnd)

          const startIndex = parent.children.indexOf(start)
          const endIndex = parent.children.indexOf(end)

          const between = parent.children.slice(startIndex, endIndex > 0 ? endIndex : undefined)

          const section =
            depth === 2
              ? {
                  type: 'section',
                  depth: depth,
                  children: between,
                  data: {
                    hName: 'section',
                    hProperties: {
                      id: `${id}-section`,
                    },
                  },
                }
              : {
                  type: 'element',
                  depth: depth,
                  children: between,
                  data: {
                    hName: 'div',
                  },
                }

          parent.children.splice(startIndex, section.children.length, section)
        }
      )
    }
  }
}

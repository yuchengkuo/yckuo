/**
 * @typedef {import('mdast').Root} Root
 */

import { Processor } from 'unified'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'

export default function (this: Processor) {
  return function (tree: Node) {
    visit(
      tree,
      (node) =>
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective',
      (node) => console.log(node)
    )
  }
}

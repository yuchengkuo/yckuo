---
title: Sectionize Markdoc document
date: 2022-07-22
tag:
  - Markdoc
  - Snippet
---

Visit the [Markdoc](https://markdoc.dev) document and wrap each headings and the content following it in a `<section>` tag.

```ts
// document.markdoc.ts
import { Tag, type Schema } from '@markdoc/markdoc'
import { sectionize, visit } from './utils'

export const document: Schema = {
  render: 'article',
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

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
```

```ts
// utils.ts
import { Tag, type RenderableTreeNode, type Scalar } from '@markdoc/markdoc'

/**
 * Visit Markdoc RenderableTree
 */
export function visit(
  tree: RenderableTreeNode[],
  test: (node: Tag) => boolean,
  callback: (node: Tag, parent: Tag[]) => void
) {
  const parent = tree
  tree.forEach((node) => {
    if (isScalar(node)) return

    if (Boolean(test.call(this, node))) {
      callback.call(this, node, parent)
    }

    if (node.children) {
      visit(node.children, test, callback)
    }
  })
}

/**
 * Check whether node is Scalar
 */
function isScalar(node: RenderableTreeNode): node is Scalar {
  if (typeof node === 'boolean' || typeof node === 'number' || typeof node === 'string') {
    return true
  } else {
    return false
  }
}

/**
 * Wrap nodes betwerrn start node to the next higher-level heading node with section element
 */
export function sectionize(node: Tag, parent: Tag[]) {
  const start = node
  const depth = node.attributes.level

  const startIndex = parent.indexOf(start)

  let end: Tag

  //look for next heading from start node
  let index = startIndex
  while (++index < parent.length) {
    if (parent[index].name.match(/h\d/) && parent[index].attributes.level <= depth) {
      end = parent[index]
      break
    }
  }

  const endIndex = parent.indexOf(end)

  const between = parent.slice(startIndex, endIndex > 0 ? endIndex : undefined)

  const section = new Tag('section', { id: `${start.attributes.id}-section` }, between)

  parent.splice(startIndex, between.length, section)
}
```

## Reference

- Markdoc [Tag](https://markdoc.dev/docs/tags) Documentation
- [`remark-sectionize`](https://github.com/jake-low/remark-sectionize), remark plugin of sectionize.
- [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit), unist utility visit.

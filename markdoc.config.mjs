/*
 * Two rules for the whole file:
 *
 *   1. Every transform is synchronous. One `async transform` anywhere makes
 *      `getHeadings()` return `[]` for every document. A2 asserts it.
 *
 *   2. `component()` markers are collected only from a `render:` field. A transform that
 *      calls `component()` dies partway through the build on a misleading
 *      `NoMatchingRenderer`, so transforms read the markers back from `config.nodes`.
 *
 * `port-guard.mjs` imports this file directly: anything that can throw here takes the gate
 * down with it.
 */
import Markdoc from '@markdoc/markdoc'
import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'
import { highlight } from './src/lib/highlighter.ts'

export default defineMarkdocConfig({
  nodes: {
    // --- heading -------------------------------------------------------------------
    // No `__collectHeading` or `level` attribute, despite Astro's own heading extension:
    // Astro adds them only for non-string renders, and on a string tag they ship as HTML
    // attributes. `collectHeadings` finds string `h1`–`h6` tags without them.
    //
    // The anchor has no `#` text child; `prose.css` draws it from `data-anchor` — A7.
    heading: {
      children: ['inline'],
      attributes: {
        id: { type: String },
        level: { type: Number, required: true, default: 1 },
        link: { type: Boolean, default: true }
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config)
        const children = node.transformChildren(config)
        const level = node.attributes.level
        const id = generateID(children, attributes)

        return new Markdoc.Tag(
          `h${level}`,
          { ...attributes, id },
          [
            ...children,
            attributes.link &&
              new Markdoc.Tag(
                'a',
                { href: `#${id}`, 'aria-hidden': '', tabIndex: '-1', 'data-anchor': '' },
                []
              )
          ].filter(Boolean)
        )
      }
    },

    // --- image ---------------------------------------------------------------------
    // The default schema is spread back in: without its `src`/`alt`/`title`, the
    // paragraph transform silently drops every caption.
    image: {
      ...Markdoc.nodes.image,
      render: component('./src/components/Img.astro')
    },

    // --- fence ---------------------------------------------------------------------
    fence: {
      render: component('./src/components/CodeBlock.astro'),
      children: ['inline', 'text'],
      attributes: {
        content: { type: String, render: false },
        language: { type: String },
        process: { type: Boolean, render: false },
        highlight: { type: Array }
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config)
        const children = node.transformChildren(config)
        const lang = attributes.language || 'text'
        const code = (typeof children[0] === 'string' && children[0]) || node.attributes.content
        return new Markdoc.Tag(
          config.nodes.fence.render,
          { ...attributes, code: highlight(code, lang) },
          []
        )
      }
    },

    // --- paragraph -----------------------------------------------------------------
    // Turns an image-only paragraph into a figure.
    //
    // A leading `/` marks a Cloudinary id, not a root-relative URL; `slashify.mjs` says
    // why it is there. A bare id is still accepted.
    //
    // No ratio here: `Img.astro` resolves it, where a throw cannot take down the gate.
    paragraph: {
      attributes: {
        image_title: { type: String },
        image_description: { type: String },
        image_isvideo: { type: Boolean }
      },
      transform(node, config) {
        const img = node.children[0]?.children[0]
        if (img?.type === 'image') {
          img.attributes = { ...img.attributes, ...node.attributes }

          let description = ''

          const src = img.attributes.src ?? ''
          if (src.startsWith('/')) {
            img.attributes.id = src.slice(1)
            delete img.attributes.src
          } else if (!src.startsWith('http')) {
            img.attributes.id = src
            delete img.attributes.src
          }

          if (img.attributes.image_description) description = img.attributes.image_description

          /* `image_isvideo` is forwarded explicitly: outside the image schema,
             `transformAttributes()` drops it, and every video becomes a broken <img>. */
          return new Markdoc.Tag(
            config.nodes.image.render,
            {
              ...img.transformAttributes(config),
              description,
              image_isvideo: Boolean(img.attributes.image_isvideo)
            },
            img.transformChildren(config)
          )
        }

        return new Markdoc.Tag(
          'p',
          node.transformAttributes(config),
          node.transformChildren(config)
        )
      }
    }
  },

  tags: {
    // --- deflist -------------------------------------------------------------------
    deflist: {
      render: 'dl',
      children: ['paragraph', 'list'],
      transform(node, config) {
        const children = []
        for (const child of node.children) {
          /* Term */
          if (child.type === 'paragraph')
            children.push(new Markdoc.Tag('dt', {}, child.transformChildren(config)))
          /* Definitions — list > item > inline > [what we want] */
          if (child.type === 'list')
            for (const dd of child.children.map((item) => item.transformChildren(config)))
              children.push(new Markdoc.Tag('dd', {}, [...dd]))
        }
        return new Markdoc.Tag('dl', node.transformAttributes(config), children)
      }
    },

    // --- grid ----------------------------------------------------------------------
    // Members are markdown images, so they arrive as paragraphs. No `gallery` alias —
    // `docs/adr/0004-derived-grid-spans.md` records why.
    grid: {
      render: component('./src/components/Grid.astro'),
      children: ['paragraph']
    },

    expand: {
      render: component('./src/components/Expand.astro'),
      attributes: { title: { type: String } }
    },

    // No attributes schema: the `.class` shorthand yields a Class object, not a string,
    // and `class` is a Markdoc global attribute anyway.
    span: { render: 'span' }
  }
})

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === 'string') return attributes.id
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

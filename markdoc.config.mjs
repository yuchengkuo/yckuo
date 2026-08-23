/*
 * The Markdoc layer. TWO HARD RULES run through the whole file:
 *
 *   1. EVERY TRANSFORM IS SYNCHRONOUS. One `async transform` anywhere makes
 *      `getHeadings()` return `[]` for every document site-wide, not just near the async
 *      node. Nothing consumes headings today, which is exactly why A2 asserts it rather
 *      than trusting a reading.
 *
 *   2. `component()` MARKERS ARE ONLY COLLECTED FROM A `render:` FIELD, never from
 *      inside a transform. A transform that calls `component()` builds ~22 pages and
 *      then dies on a misleading `NoMatchingRenderer`. So the markers are declared on
 *      `render:` and the transforms read them back out of the resolved config.
 *
 * The image syntax this config is written against:
 *   ![alt](/cloudinary-id 'caption') {% .span-N %}
 * — markdown image syntax, one LEADING `/` per id. `emitOptimizedImages` rejects
 * relative ids, which is what the slash is for.
 */
import Markdoc from '@markdoc/markdoc'
import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'
import { highlight } from './src/lib/highlighter.ts'

export default defineMarkdocConfig({
  nodes: {
    // --- heading -------------------------------------------------------------------
    // The attributes are `{ ...attributes, id }` and NOTHING MORE.
    //
    // Do not add `__collectHeading: true` or `level` here, however much Astro's own
    // heading extension looks like a model. **They do not belong on a STRING render, and
    // Astro says so** — its code adds the pair only when `typeof render !== 'string'`,
    // commented *"Avoid accidentally rendering `level` as an HTML attribute otherwise!"*.
    // A string tag's attributes pass straight through to HTML, so carrying them ships
    // `<h2 level="2" link="true" id="…" __collectHeading="true">` on every heading. They
    // also buy nothing: `collectHeadings` matches `node.name === 'h' + level` for string
    // tags, which is this branch.
    //
    // The anchor has NO `'#'` text child — the glyph is drawn in CSS by `prose.css`'s
    // `a[data-anchor]::after`, which is what `data-anchor` below exists for. A real text
    // child lands in `getHeadings().text`, putting a stray '#' in every TOC entry. A7
    // asserts the CSS half, so dropping one without the other is caught.
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
    // Carries the ONLY component() marker the paragraph transform can use.
    //
    // The default schema is spread back in: the paragraph transform below leans on the
    // default `src`/`alt`/`title` attributes surviving transformAttributes(), and
    // redeclaring the node without them would silently drop every caption.
    image: {
      ...Markdoc.nodes.image,
      render: component('./src/components/Img.astro')
    },

    // --- fence ---------------------------------------------------------------------
    // Synchronous Shiki. `config.nodes.fence.render` reads the marker declared above it
    // rather than calling component() here — see rule 2 at the top of the file.
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
    // This is what turns an image-only paragraph into a figure, which is why markdown
    // image syntax works at all.
    //
    // A LEADING '/' MEANS "Cloudinary id" — strip it and treat the rest as the id. That
    // is the inverse of the intuitive reading, where '/' would mean "a real URL, leave
    // it alone". The `!startsWith('http')` fallback below keeps a bare id rendering, so
    // an unslashed hand-authored file is a rendering bug rather than a broken build.
    //
    // It must stay SYNCHRONOUS — see rule 1 at the top of the file.
    paragraph: {
      attributes: {
        image_title: { type: String },
        image_description: { type: String },
        image_isvideo: { type: Boolean }
      },
      transform(node, config) {
        /* Unwrap image from paragraph, transform image nodes */
        const img = node.children[0]?.children[0]
        if (img?.type === 'image') {
          /* Merge attributes */
          img.attributes = { ...img.attributes, ...node.attributes }

          let description = '',
            aspectRatio = ''

          const src = img.attributes.src ?? ''
          if (src.startsWith('/')) {
            img.attributes.id = src.slice(1)
            delete img.attributes.src
          } else if (!src.startsWith('http')) {
            img.attributes.id = src
            delete img.attributes.src
          }

          if (img.attributes.image_description) description = img.attributes.image_description

          /* Video. The branch lives in `Img.astro`, not here, so the flag is forwarded
             EXPLICITLY. It would not survive transformAttributes() on its own — it is
             neither a Markdoc global attribute nor part of the image node's schema, and
             losing it turns every video into a broken <img> with a green build. */
          return new Markdoc.Tag(
            config.nodes.image.render,
            {
              ...img.transformAttributes(config),
              description,
              aspectRatio,
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
    // 5 in the corpus.
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

    // --- gallery -------------------------------------------------------------------
    // `children: ['paragraph']` and not `['paragraph','tag']`: gallery members are
    // written as markdown images, so they arrive as paragraphs.
    gallery: {
      render: component('./src/components/Gallery.astro'),
      children: ['paragraph']
    },

    expand: {
      render: component('./src/components/Expand.astro'),
      attributes: { title: { type: String } }
    },

    // No attributes schema, deliberately: the `.text-secondary` shorthand yields a Class
    // OBJECT rather than a string, and `class` is a Markdoc global attribute anyway.
    // 45 in the corpus, all of them carrying exactly that shorthand.
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

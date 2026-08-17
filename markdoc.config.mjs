/*
 * The Markdoc layer. A port of the SvelteKit `markdoc.config.ts` that Velite drove,
 * carrying every correction tickets 02, 03, 04 and 07 made to it.
 *
 * Two hard rules run through the whole file:
 *
 *   02 — EVERY TRANSFORM IS SYNCHRONOUS. One `async transform` anywhere makes
 *        `getHeadings()` return `[]` for every document site-wide, not just near the
 *        async node. Nothing consumes headings today, which is exactly why
 *        port-guard.mjs A2 asserts it rather than trusting a reading.
 *
 *   03 — `component()` MARKERS ONLY GET COLLECTED FROM A `render:` FIELD, never from
 *        inside a transform. A transform that calls `component()` builds ~22 pages and
 *        then dies on a misleading `NoMatchingRenderer`. So the markers are declared on
 *        `render:` and the transforms read them back out of the resolved config.
 *
 * The syntax this config is written against is ticket 04's ruling, and it is permanent:
 *   ![alt](/cloudinary-id 'caption') {% .span-N %}
 * — markdown image syntax, one leading `/` per id. `emitOptimizedImages` rejects
 * RELATIVE ids, not markdown image syntax, so the tag rewrite the map once assumed was
 * forced never was.
 */
import Markdoc from '@markdoc/markdoc'
import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'
import { highlight } from './src/lib/highlighter.ts'

export default defineMarkdocConfig({
  nodes: {
    // --- heading -------------------------------------------------------------------
    // The attributes are `{ ...attributes, id }` and nothing more, which is byte-for-byte
    // what the SvelteKit config emitted.
    //
    // 03's port carried `__collectHeading: true` and `level` as well, copied from
    // Astro's own heading extension. **They do not belong on a STRING render, and Astro
    // says so at `heading-ids.js:31`** — its own code adds the pair only when
    // `typeof render !== 'string'`, commented *"Avoid accidentally rendering `level` as
    // an HTML attribute otherwise!"*. A string tag's attributes pass straight through to
    // HTML, so carrying them shipped `<h2 level="2" link="true" id="…"
    // __collectHeading="true">` on every heading on the site. They also buy nothing:
    // `collectHeadings` matches `node.name === 'h' + level` for string tags, which is
    // this branch. (`level` and `link` still appear — they are in `transformAttributes`
    // and the SvelteKit build emits them too, so removing them would be a parity change
    // rather than a fix. `__collectHeading` was ours alone.)
    //
    // Two edits against the SvelteKit version, both from 03:
    //   - the anchor's child `'#'` is dropped. It was the glyph in `getHeadings().text`,
    //     which put a stray '#' in every TOC entry. The glyph is restored in CSS by
    //     `prose.css`'s `a[data-anchor]::after` — which is visible today, so dropping the
    //     text child without the CSS silently deletes it (ladder A7 asserts the rule).
    //   - hence the `data-anchor` attribute, which is what that CSS selects on.
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
    // Carries the ONLY component() marker the paragraph transform can use (07-1).
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
    // rather than calling component() here — see rule 03 at the top of the file.
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
    // KEPT, not deleted (04). The map's phase sketch had conversion move this transform's
    // job into the content; 04's ruling keeps markdown image syntax, so the transform
    // keeps its job. Two edits against the SvelteKit version:
    //
    //   1. `async transform` -> `transform`. 09 verified the keyword was vestigial: it
    //      awaited nothing, having been left behind by an aspect-ratio fetch that no
    //      longer exists. Only `fence` genuinely awaited, and Shiki now runs sync.
    //   2. the src branch inverts. Was `if (!startsWith('http') && !startsWith('/'))` —
    //      i.e. a leading '/' meant "this is a real URL, leave it alone". Every call site
    //      now carries the leading '/' Astro demands, so '/' is the Cloudinary-id branch:
    //      STRIP AND TREAT AS ID. The `!startsWith('http')` fallback below keeps a
    //      bare id working, so a hand-authored file is a rendering bug rather than a
    //      broken build — sync-content.mjs's G-gates are what keep the corpus slashed.
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

          /* Video. SvelteKit branched to a DIFFERENT component here (`new Tag('vid')`);
             under Astro the branch has to move into the wrapper (07-1), so the flag is
             forwarded EXPLICITLY. It would not survive transformAttributes() on its own —
             it is neither a Markdoc global attribute nor part of the image node's schema,
             and losing it turns all 16 videos into broken <img>s with a green build. */
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
    // Verbatim port — already synchronous. 5 in the corpus.
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
    // `children: ['paragraph']` UNCHANGED. 03 had to widen this to ['paragraph','tag']
    // only because its throwaway converter turned gallery members into {% img %} tags;
    // under 04's ruling they stay paragraphs, so the declaration ports byte-for-byte.
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

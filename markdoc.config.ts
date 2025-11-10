import Markdoc, { type ConfigType, type RenderableTreeNode } from '@markdoc/markdoc'
import { getSingletonHighlighter } from 'shiki'
import { transformerNotationHighlight } from '@shikijs/transformers'

import grammar from './src/lib/markdoc.tmLanguage.json'

/*
 * Markdoc configuration pass into velite
 */
const markdocConfig: ConfigType = {
  nodes: {
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

        const id = generateID(children, attributes)

        return new Markdoc.Tag(`h${node.attributes['level']}`, { ...attributes, id }, [
          ...children,
          attributes['link'] &&
            new Markdoc.Tag('a', { href: `#${id}`, 'aria-hidden': '', tabIndex: '-1' }, ['#'])
        ])
      }
    },
    paragraph: {
      attributes: {
        /* Attributes for Image */
        image_title: { type: String },
        image_description: { type: String },
        image_isvideo: { type: Boolean }
      },
      async transform(node, config) {
        /* Unwrap image from paragraph, transform image nodes */
        const img = node.children[0].children[0]
        if (img.type === 'image') {
          /* Merge atrributes */
          img.attributes = { ...img.attributes, ...node.attributes }

          let description = '',
            aspectRatio = ''

          /* If src isn't a link, make it Cld id */
          if (!img.attributes.src.startsWith('http') && !img.attributes.src.startsWith('/')) {
            img.attributes.id = img.attributes.src
            delete img.attributes.src
          }

          /* Passing the props */

          if (img.attributes.image_description) description = img.attributes.image_description

          /* Video */
          if (img.attributes.image_isvideo)
            return new Markdoc.Tag(
              'vid',
              img.transformAttributes(config),
              img.transformChildren(config)
            )

          return new Markdoc.Tag(
            'img',
            { ...img.transformAttributes(config), description, aspectRatio },
            img.transformChildren(config)
          )
        }

        return new Markdoc.Tag(
          'p',
          node.transformAttributes(config),
          node.transformChildren(config)
        )
      }
    },
    /* Code Block */
    fence: {
      children: ['inline', 'text'],
      attributes: {
        content: { type: String, render: false },
        language: { type: String },
        process: { type: Boolean, render: false },
        highlight: { type: Array }
      },
      async transform(node, config) {
        const attributes = node.transformAttributes(config)
        const children = node.transformChildren(config)

        const markdoc = {
          id: 'Markdoc',
          scopeName: 'text.html.markdoc',
          grammar,
          aliases: ['markdoc']
        }

        const lang = attributes.language || 'text'
        const code = (typeof children[0] === 'string' && children[0]) || node.attributes.content

        const highlighter = await getSingletonHighlighter({
          themes: [],
          langs: [lang, markdoc]
        })

        const shikiCode = highlighter.codeToHtml(code, {
          lang,
          themes: {
            light: await import('./src/lib/tmr.json'),
            dark: await import('./src/lib/tmr-night.json')
          },
          transformers: [transformerNotationHighlight()]
        })

        return new Markdoc.Tag('CodeBlock', { ...attributes, code: shikiCode }, [])
      }
    }
  },
  tags: {
    /* Definition List */
    deflist: {
      render: 'dl',
      children: ['paragraph', 'list'],
      transform(node, config) {
        const children: RenderableTreeNode[] = []

        for (const child of node.children) {
          /* Term */
          if (child.type === 'paragraph') {
            children.push(new Markdoc.Tag('dt', {}, child.transformChildren(config)))
          }

          /* Definitions */
          if (child.type === 'list') {
            /* list > item > inline > [what we want] */
            const defs = child.children.map((item) => item.transformChildren(config))
            for (const dd of defs) {
              children.push(new Markdoc.Tag('dd', {}, [...dd]))
            }
          }
        }
        return new Markdoc.Tag('dl', node.transformAttributes(config), children)
      }
    },
    /* Gallery */
    gallery: {
      render: 'Gallery',
      children: ['paragraph']
    },
    /* Content Accordion  */
    expand: { render: 'Expand' },
    /* Span */
    span: { render: 'span' }
  }
}

export default markdocConfig

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

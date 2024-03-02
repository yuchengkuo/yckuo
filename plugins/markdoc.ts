/**
 * Not in use, experimenting using Markdoc as tempalate engine.
 */

import loader from 'lume/core/loaders/text.ts'
import { merge } from 'lume/core/utils.ts'
import { log } from 'lume/core/utils.ts'

import type { Data, Engine, Site } from 'lume/core.ts'

import Markdoc, { type Config } from 'npm:@markdoc/markdoc'

export interface Options {
  /** List of extensions this plugin applies to */
  extensions: string[]
  /** Markdoc Config */
  config?: Config
}

// Default options
export const defaults: Options = {
  extensions: ['.mdoc'],
  config: {},
}

export class MarkdocEngine implements Engine {
  options: Options

  constructor(options: Options) {
    this.options = options
  }

  parse(content: string): Markdoc.Node {
    return Markdoc.parse(content)
  }

  validate(node: Markdoc.Node, config: Config) {
    const errors = Markdoc.validate(node, config)
    if (errors.length)
      log(
        `\n[Markdoc] ${errors.length} Validation error in:\n\n${errors.map(
          (e) => ['Type: ' + e.type, 'Message: ' + e.error.message].join('\n')
        )}\n`
      )
  }

  transform(node: Markdoc.Node, config: Config): Markdoc.RenderableTreeNode {
    this.validate(node, config)
    return Markdoc.transform(node, config)
  }

  async transformAsync(
    node: Markdoc.Node,
    config: Config
  ): Promise<Markdoc.RenderableTreeNode> {
    this.validate(node, config)
    // Async transform for markdoc
    return await Markdoc.transform(node, config)
  }

  deleteCache() {}

  async render(
    content: string,
    data?: Data,
    _filename?: string
  ): Promise<string> {
    return Markdoc.renderers.html(
      await this.transformAsync(this.parse(content), {
        ...this.options.config,
        variables: {
          ...data,
          ...(this.options.config?.variables ?? {}),
        },
      })
    )
  }

  renderSync(content: string, data?: Data, _filename?: string): string {
    return Markdoc.renderers.html(
      this.transform(this.parse(content), {
        ...this.options.config,
        variables: {
          ...data,
          ...(this.options.config?.variables ?? {}),
        },
      })
    )
  }

  addHelper() {}
}

export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions)

  return (site: Site) => {
    const markdocEngine = new MarkdocEngine(options)
    site.loadPages(options.extensions, loader, markdocEngine)
  }
}

/**
 * Not in use, experimenting using Svelte as template engine.
 */

import { encodeBase64 } from 'https://deno.land/std@0.208.0/encoding/base64.ts'

import { Data, Engine, PageData, Site, Loader } from 'lume/core.ts'
import { log, merge, read } from 'lume/core/utils.ts'

import { compile } from 'npm:svelte/compiler'
import type { SvelteComponent } from 'npm:svelte'

export interface Options {
  /** The list of extensions this plugin applies to */
  extensions?: string[]

  /** Optional sub-extension for page files */
  pageSubExtension?: string

  /**
   * Custom includes path
   * @default `site.options.includes`
   */
  includes?: string
}

// Default options
export const defaults: Options = {
  extensions: ['.svelte'],
}

export const svelteLoader: Loader = async function (path: string) {
  const file = await read(path, false)

  try {
    const { js, warnings } = compile(file, {
      errorMode: 'warn',
      generate: 'ssr',
      sveltePath: 'npm:svelte',
      immutable: true,
    })

    if (warnings.length) log(warnings.map((w) => w.message).join('\n'))

    /** Import the parsed Svelte string as module */
    const mod = await import(
      `data:application/javascript;base64,${encodeBase64(js.code)}`
    )

    const { default: content, ...rest } = mod

    return { content, ...rest }
  } catch (_) {
    throw new Error(`Error compiling svelte file: ${path}`)
  }
}

export class SvelteEngine implements Engine {
  basePath: string
  includes: string

  constructor(basePath: string, includes: string) {
    this.basePath = basePath
    this.includes = includes
  }

  deleteCache() {}

  // render template
  render(
    content: SvelteComponent,
    data?: Data<PageData> | undefined,
    _filename?: string | undefined
  ) {
    return this.renderSync(content, data)
  }

  // reder component
  renderSync(
    content: SvelteComponent,
    data?: Data<PageData> | undefined,
    _filename?: string | undefined
  ): string {
    /** Render the Svelte file */
    const { head, html, css } = content.render(data)
    // console.log(head, html, css, data)
    return html
  }

  addHelper(): void {}
}

/** Register the plugin to support Svelte files */
export default function (userOptions?: Options) {
  return (site: Site) => {
    const options = merge(
      {
        ...defaults,
        extensions: defaults.extensions as string[],
        includes: site.options.includes,
      },
      userOptions
    )

    const engine = new SvelteEngine(site.src(), options.includes)

    // Ignore includes folder
    if (options.includes) {
      site.ignore(options.includes)
    }

    // Load the pages and register the engine
    site.loadPages(options.extensions, svelteLoader, engine)
    site.loadComponents(options.extensions, svelteLoader, engine)
  }
}

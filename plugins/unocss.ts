/**
 * Taken and modified from https://github.com/lumeland/lume/blob/898673c67108b8222c911fd13ddebbb5d48a3c5b/plugins/unocss.ts before Lume v2
 */

import { merge, read } from 'lume/core/utils.ts'
import { Page } from 'lume/core/filesystem.ts'

import {
  createGenerator,
  type SourceCodeTransformer,
  type UserConfig,
  type UnocssPluginContext,
} from 'npm:@unocss/core'
import transformerDirectives from 'npm:@unocss/transformer-directives'
import transformerVariantGroup from 'npm:@unocss/transformer-variant-group'
import { presetUno } from 'npm:@unocss/preset-uno'
import MagicString from 'npm:magic-string'

import type { Site } from 'lume/core.ts'

export interface Options {
  /**
   * Configurations for UnoCSS.
   * @see {@link https://unocss.dev/guide/config-file}
   */
  config?: UserConfig
  /**
   * Set the css filename for all generated styles,
   * Set to `false` to insert a <style> tag per page.
   * @defaultValue `false`
   */
  cssFile?: false | string
  /** The list of extensions this plugin applies to */
  cssFileExtensions?: string[]
  /**
   * Process CSS files using UnoCSS transformers.
   * @defaultValue `[transformerVariantGroup(), transformerDirectives()]`
   */
  cssFileTransformers?: SourceCodeTransformer[]
  /**
   * Supported CSS reset options.
   * @see {@link https://github.com/unocss/unocss/tree/main/packages/reset}
   * @defaultValue `tailwind`
   */
  reset?: false | 'tailwind' | 'tailwind-compat' | 'eric-meyer'
}

export const defaults: Options = {
  config: {
    presets: [presetUno()],
  },
  cssFile: false,
  cssFileExtensions: ['.css'],
  //@ts-ignore https://github.com/denoland/deno/issues/19096
  cssFileTransformers: [transformerVariantGroup(), transformerDirectives()],
  reset: 'tailwind',
}

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions)

  return (site: Site) => {
    const uno = createGenerator(options.config)

    // Trasform css with transformers
    if (options.cssFileTransformers!.length > 0) {
      site.loadAssets(options.cssFileExtensions as string[])
      site.process(options.cssFileExtensions as string[], async (file) => {
        if (file.content) {
          const code = new MagicString(file.content.toString())
          for await (const { transform } of options.cssFileTransformers!) {
            await transform(code, file.src.path, {
              uno,
            } as unknown as UnocssPluginContext)
          }
          file.content = code.toString()
        }
      })
    }

    // Insert a <style> tag for each page
    if (options.cssFile === false) {
      site.processAll(['.html'], async (pages) => {
        const reset = await getResetCss(options)

        Promise.all(
          pages.map(async (page) => {
            const document = page.document!
            const result = await uno.generate(
              document.documentElement?.innerHTML ?? ''
            )
            const css = reset ? `${reset}\n${result.css}` : result.css

            if (css) {
              const style = document.createElement('style')
              style.innerText = css
              page.document?.head?.appendChild(style)
            }
          })
        )
      })
      return
    }

    // Generate the stylesheets for all pages and stylesheets
    site.processAll(['.html'], async (pages) => {
      const classes = new Set<string>()

      await Promise.all(
        pages.map(
          async (page) =>
            await uno
              .generate(page.document?.documentElement?.innerHTML ?? '')
              .then((res) => res.matched)
              .then((matched) => matched.forEach((match) => classes.add(match)))
        )
      )

      // Create & merge stylesheets for all pages
      const reset = await getResetCss(options)
      const result = await uno.generate(classes)
      const css = reset ? `${reset}\n${result.css}` : result.css

      // Output the CSS file
      const exists = site.pages.find(
        (page) => page.data.url === options.cssFile
      )

      if (exists) {
        exists.content += `\n${css}`
      } else {
        site.pages.push(Page.create(options.cssFile as string, css))
      }
    })
  }
}

async function getResetCss(options: Options) {
  return options.reset === false
    ? ''
    : await read(`https://unpkg.com/@unocss/reset/${options.reset}.css`, false)
}

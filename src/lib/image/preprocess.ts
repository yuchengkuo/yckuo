/**
 * Preprocess blurDataUrl, aspectRatio for <Image /> component, not yet implemented
 *
 * Mainly modified from Svimg
 * https://github.com/xiphux/svimg
 *
 */

import replaceAsync from 'string-replace-async'
import { parse } from 'node-html-parser'

import type { PreprocessorGroup, Processed } from 'svelte/types/compiler/preprocess'
import { getAspectRatio } from './getAspectRatio'
import { getBlurDataUrl } from './getBlurDataUrl'

export function imagePreprocessor(): PreprocessorGroup {
  return {
    async markup({ content }): Promise<Processed> {
      return {
        code: await replaceAsync(content, /<Image[^>]+>/g, (element) =>
          processImageElement(element)
        ),
      }
    },
  }
}

async function processImageElement(element: string) {
  if (!element) {
    return element
  }

  const attrs = parseAttributes(element)
  const id = attrs['id']
  if (!id) {
    return element
  }

  const aspectRatio = await getAspectRatio(id)
  const blurDataUrl = await getBlurDataUrl(id)

  const newAttrs = { ...attrs, aspectRatio, blurDataUrl }

  const attrString = Object.entries(newAttrs)
    .map(([attr, val]) => formatAttribute(attr, val))
    .join(' ')

  return element.substring(0, 6) + ' ' + attrString + element.substring(6)
}

function parseAttributes(element: string): Record<string, string> {
  if (!element) {
    return {}
  }

  const root = parse(element.replace(/[\r\n]+/g, ' '))
  if (!root?.firstChild) {
    return {}
  }
  //@ts-expect-error expect
  const node = root.firstChild as HTMLElement
  if (!node?.attributes) {
    return {}
  }

  return Object.entries(node.attributes).reduce<Record<string, string>>((rv, [attr, val]) => {
    //@ts-expect-error so empty value attributes can be truthy
    rv[attr] = val === '' ? attr : val
    return rv
  }, {})
}

function formatAttribute(attribute: string, value: string | boolean) {
  if (!attribute || !value) {
    return ''
  }

  return value === true ? attribute : `${attribute}="${value}"`
}

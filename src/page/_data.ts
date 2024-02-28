import { Page } from 'lume/core.ts'

export function url(page: Page) {
  return `/${page.src.slug}/`
}

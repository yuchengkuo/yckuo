import { getContentBySlug } from '$lib/markdoc/utils'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Changelog } from '$contentlayer'

export const load: PageServerLoad = async function ({ setHeaders }) {
  const changelog = getContentBySlug<Changelog>('changelog')

  setHeaders({ 'cache-control': 'public, max-age=259200' })
  if (changelog) return changelog

  throw error(404)
}

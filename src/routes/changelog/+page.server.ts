import { getContentBySlug } from '$lib/content/utils'
import type { PageServerLoad } from './$types'
import type { Changelog } from '$contentlayer'

export const load: PageServerLoad = async function ({ setHeaders }) {
  const changelog = await getContentBySlug<Changelog>('changelog')

  setHeaders({ 'cache-control': 'public, max-age=259200' })
  return changelog
}

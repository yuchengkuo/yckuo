import { getContentBySlug } from '$lib/content/utils'

import type { About } from '$contentlayer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ setHeaders }) {
  const about = getContentBySlug<About>('about')

  setHeaders({ 'cache-control': 'public, max-age=259200' })
  return about
}

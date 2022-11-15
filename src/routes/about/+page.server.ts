import { getContentBySlug } from '$lib/content/utils'

import type { About } from '$contentlayer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=259200, stale-while-revalidate=86400' })

  const about = getContentBySlug<About>('about')

  return { about }
}

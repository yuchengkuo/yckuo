import { getAllContentMeta } from '$lib/content/utils'
// import { compareDesc } from 'date-fns'

import type { LayoutServerLoad } from './$types'
import type { Work } from '$contentlayer'

export const load: LayoutServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=86400, stale-while-revalidate=43200' })
  const allWork = await getAllContentMeta<Work>('work')
  //   allWork.sort((a, b) => compareDesc(new Date(a.time), new Date(b.time))

  return { allWork }
}

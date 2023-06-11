import { getBookmarks } from '$lib/api/raindrop'
import { error } from '@sveltejs/kit'
import countBy from 'lodash/countBy'

import type { PageServerLoad } from './$types'

export const prerender = false

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })

  try {
    const bookmarks = await getBookmarks({ collection: '20734001' })

    const tags = Object.entries(countBy(bookmarks.flatMap((b) => b.tags))).sort(
      (a, b) => b[1] - a[1]
    )

    return { bookmarks, tags }
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting bookmarks')
  }
}

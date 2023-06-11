import { getBookmarks } from '$lib/api/raindrop'
import { error } from '@sveltejs/kit'
import random from 'lodash/random'
import countBy from 'lodash/countBy'

import type { PageServerLoad } from './$types'

export const prerender = false

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })

  try {
    const blogrolls = (await getBookmarks({ collection: '20734000' })).sort(() => random(-5, 5))
    const tags = Object.entries(countBy(blogrolls.flatMap((b) => b.tags))).sort(
      (a, b) => b[1] - a[1]
    )

    return { blogrolls, tags }
  } catch (err) {
    console.error('Error: ', err)
    throw error(404, 'Error while getting bookmarks')
  }
}

import { error } from '@sveltejs/kit'
import { compareDesc } from 'date-fns'
import countBy from 'lodash/countBy'

import { getBookmarks, getChildCollections, type Raindrop } from '$lib/api/raindrop'

import type { PageServerLoad } from './$types'

export const prerender = false

const collection = '20734001'

export const load: PageServerLoad = async function ({ setHeaders, url }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })

  try {
    let bookmarks: Raindrop[]

    const collections = await getChildCollections(collection)

    const category = collections.find(
      (c) => c.title.toLowerCase() === url.searchParams.get('category')
    )

    if (category) {
      bookmarks = await getBookmarks({ collection: category.id.toString(), sort: '-created' })
    } else {
      const bookmarksInParent = await getBookmarks({ collection, sort: '-created' })

      bookmarks = (
        await Promise.all(
          collections.map(
            async (c) => await getBookmarks({ collection: c.id.toString(), sort: '-created' })
          )
        )
      )
        .flat()
        .concat(bookmarksInParent)
        .sort((a, b) => compareDesc(new Date(a.created_at), new Date(b.created_at)))
    }

    const tags = Object.entries(countBy(bookmarks.flatMap((b) => b.tags))).sort(
      (a, b) => b[1] - a[1]
    )

    return { bookmarks, tags, collections }
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting bookmarks')
  }
}

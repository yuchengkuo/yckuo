import { getBookmarks } from '$lib/api/raindrop'
import { getAspectRatio } from '$lib/image/getAspectRatio'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

type Bookmark = {
  title: string
  tags: string[]
  excerpt: string
  link: string
  domain: string
  cover: string
  blurDataUrl: string
  aspectRatio: string
}

export const prerender = false

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })
  try {
    const res = await getBookmarks('20734001')

    const { items } = await res.json()

    const bookmarks = (await Promise.all(
      items.map(async (item) => ({
        title: item.title,
        tags: item.tags,
        excerpt: item.excerpt,
        link: item.link,
        domain: item.domain,
        cover: item.cover,
        blurDataUrl: await getBlurDataUrl(item.cover),
        aspectRatio: await getAspectRatio(item.cover),
      }))
    )) as Bookmark[]

    return { bookmarks }
  } catch (err) {
    console.error('Error: ', err)
    throw error(404, 'Error while getting bookmarks')
  }
}

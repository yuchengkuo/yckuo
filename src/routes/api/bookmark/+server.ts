import { error, json } from '@sveltejs/kit'
import { getBookmarks } from '$lib/api/raindrop'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { getAspectRatio } from '$lib/image/getAspectRatio'

import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const res = await getBookmarks('20734001')

  if (!res.ok) return error(404, 'Not Found')

  const { items } = await res.json()

  const bookmarks = await Promise.all(
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
  )

  return json(bookmarks, {
    headers: { 'cache-control': 'public, s-maxage=1080000, stale-while-revalidate=43200' },
  })
}

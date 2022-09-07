import { error, json } from '@sveltejs/kit'
import { getBookmarks } from '$lib/api/raindrop'

import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const res = await getBookmarks('20734001')

  if (!res.ok) return error(404, 'Not Found')

  const { items } = await res.json()

  return json(items, {
    headers: { 'cache-control': 'public, s-maxage=1080000, stale-while-revalidate=43200' },
  })
}

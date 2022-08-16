import { json } from '@sveltejs/kit'
import { getBookmarks } from '$lib/api/raindrop'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const res = await getBookmarks('20734001')

  if (!res.ok) return new Response(undefined, { status: 404 })

  const { items } = await res.json()

  if (items) {
    return json(items, {
      headers: {
        'cache-control': 'public, s-maxage=1080000, stale-while-revalidate=43200',
      },
    })
  }
  return new Response(undefined, { status: 404 })
}

import { getBookmarks } from '$lib/api/raindrop'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async function ({}) {
  const res = await getBookmarks('20734001')

  if (!res.ok)
    return {
      status: 404,
    }

  const { items } = await res.json()

  if (items) {
    return {
      status: 200,
      body: JSON.stringify({ items }),
      headers: {
        'Cache-Control': 'public, s-maxage=1080000, stale-while-revalidate=43200',
      },
    }
  }
  return {
    status: 404,
  }
}

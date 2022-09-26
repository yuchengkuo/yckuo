import { getTopArtists } from '$lib/api/spotify'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ url }) {
  const response = await getTopArtists()

  if (!response.ok) throw error(404)

  const limit = Number(url.searchParams.get('limit') ?? 4)

  const { items } = await response.json()
  const artists = items.slice(0, limit).map((item) => ({
    name: item.name,
    genres: item.genres
      .slice(0, 2)
      .join(', ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    external_urls: item.external_urls.spotify,
  }))

  return json(artists, {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, stale-while-revalidate=43200, max-age=129600',
    },
  })
}
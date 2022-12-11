import { getSavedAlbums } from '$lib/api/spotify'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ url }) {
  try {
    const res = await getSavedAlbums(url.searchParams.get('limit') || '12')

    const { items } = await res.json()

    const albums = await Promise.all(
      items.map(async ({ album }) => ({
        type: album.album_type,
        total_tracks: album.total_tracks,
        url: album.external_urls['spotify'],
        id: album.id,
        image: album.images[1].url,
        name: album.name,
        release_date: album.release_date,
        artist: album.artists.map((a) => a.name).join(', '),
        genres: album.genres,
      }))
    )

    return json(albums, {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=2592000, stale-while-revalidate=1296000',
      },
    })
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting saved albums')
  }
}

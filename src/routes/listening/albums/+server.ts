import { getSavedAlbums } from '$lib/api/spotify'
import { pick } from 'lodash'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  try {
    const res = await getSavedAlbums()

    const { items } = await res.json()
    const albums = items.map((item) => {
      const albums = pick(item.album, [
        'album_type',
        'total_tracks',
        'external_urls',
        'id',
        'images',
        'name',
        'release_date',
        'artists',
        'tracks',
        'genres',
      ])
      return albums
    })

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

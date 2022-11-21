import { getTopTracks } from '$lib/api/spotify'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ url }) {
  try {
    const res = await getTopTracks('40')

    const { items } = await res.json()

    const albums = []
    items.forEach((item) => {
      if (albums.length >= (Number(url.searchParams.get('limit')) || 12)) return
      if (!albums.map((album) => album.name).includes(item.album.name))
        albums.push({
          type: item.album.album_type,
          total_tracks: item.album.total_tracks,
          url: item.album.external_urls['spotify'],
          id: item.album.id,
          image: item.album.images[1].url,
          name: item.album.name,
          release_date: item.album.release_date,
          artist: item.album.artists.map((a) => a.name).join(', '),
          tracks: item.album.total_tracks,
        })
    })

    return json(albums, {
      headers: {
        'content-type': 'application/json;',
        'cache-control': 'public, s-maxage=864000, stale-while-revalidate=432000',
      },
    })
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting top albums')
  }
}

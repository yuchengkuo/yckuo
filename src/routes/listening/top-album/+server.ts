import { getTopAlbums } from '$lib/api/lastfm'
import { getAlbumSearchResult } from '$lib/api/spotify'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ url }) {
  const res = await getTopAlbums()

  if (!res.ok) throw error(404)

  const limit = Number(url.searchParams.get('limit') ?? 8)

  const { topalbums } = await res.json()
  const albums = topalbums.album.slice(0, limit).map((album) => ({
    title: album.name,
    artist: album.artist.name,
    playcount: album.playcount,
    image: album.image[2]['#text'],
  }))

  for (const album of albums) {
    const search = await (await getAlbumSearchResult(album.title, album.artist)).json()

    if (!search.albums.total) {
      album.spotifyUrl = ''
      album.imageUrl = album.image
      album.trackNum = 0
      album.releaseYear = '--'
    } else {
      album.spotifyUrl = search.albums.items[0].external_urls.spotify
      album.imageUrl = search.albums.items[0].images[0].url
      album.trackNum = search.albums.items[0].total_tracks
      album.releaseYear = search.albums.items[0].release_date.slice(0, 4)
    }
  }

  return json(albums, {
    headers: {
      'content-type': 'application/json;',
      'cache-control': 'public, stale-while-revalidate=86400',
    },
  })
}

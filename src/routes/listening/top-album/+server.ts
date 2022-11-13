import { getTopAlbums } from '$lib/api/lastfm'
import { getAlbumSearchResult } from '$lib/api/spotify'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  try {
    const res = await getTopAlbums()

    const { topalbums } = await res.json()

    const albums = await Promise.all(
      topalbums.album.map(async (album) => {
        const title = album.name
        const artist = album.artist.name
        const result = await (await getAlbumSearchResult(title, artist)).json()

        const shared = {
          title,
          artist,
          playcount: album.playcount,
          image: album.image[3]['#text'],
        }

        const item = result.albums.items[0]
        if (!item) return shared
        return {
          ...shared,
          spotifyUrl: item.external_urls.spotify,
          imageUrl: item.images[0].url,
          blurDataUrl: await getBlurDataUrl(item.images[0].url, false, false),
          trackNum: item.total_tracks,
          releaseYear: item.release_date.slice(0, 4),
        }
      })
    )

    return json(albums, {
      headers: {
        'content-type': 'application/json;',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    })
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting top albums')
  }
}

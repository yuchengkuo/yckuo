import { getNowPlaying } from '$lib/api/spotify'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return json({ isPlaying: false })
  }

  const playback = await response.json()

  if (playback.item === null) {
    return json({ isPlaying: false })
  }

  const isPlaying = playback.is_playing
  const title = playback.item.name
  const url = playback.item.external_urls.spotify

  const artist = playback.item.artists?.map((_artist) => _artist.name).join(', ')
  const album = playback.item.album?.name
  const albumImageUrl = playback.item.album?.images[0].url

  const show = playback.item.show?.name
  const showImageUrl = playback.item.show?.images[0].url

  return json(
    {
      isPlaying,
      playback: { title, url, artist, album, albumImageUrl, show, showImageUrl },
    },
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    }
  )
}

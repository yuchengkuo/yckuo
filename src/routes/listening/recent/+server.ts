import { getRecentTracks } from '$lib/api/lastfm'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const res = await getRecentTracks()

  if (!res.ok) throw error(404)

  const limit = 20

  const { recenttracks } = await res.json()

  recenttracks.track = recenttracks.track.slice(0, limit).map((track) => ({
    artist: track.artist['#text'],
    title: track.name,
    album: track.album['#text'],
    imageSrc: track.image[3]['#text'].replace('300x300', '960x960'),
    nowplaying: track['@attr']?.nowplaying ?? undefined,
    time: track.date?.uts ?? undefined,
  }))

  const nowplaying = recenttracks.track[0]?.nowplaying ? recenttracks.track[0] : undefined

  return json(
    { recenttracks, nowplaying },
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, stale-while-revalidate=43200, max-age=129600',
      },
    }
  )
}

import { getWeeklyAlbums, getWeeklyArtists, getWeeklyTracks } from '@utils/api/lastfm'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tracks = await (await getWeeklyTracks()).json()
  const albums = await (await getWeeklyAlbums()).json()
  const artists = await (await getWeeklyArtists()).json()

  const stats = {
    tracks: tracks.weeklytrackchart.track.length,
    albums: albums.weeklyalbumchart.album.length,
    artists: artists.weeklyartistchart.artist.length,
  }
  return res.status(200).json(stats)
}

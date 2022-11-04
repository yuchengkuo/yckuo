import type { PageLoad } from './$types'

type Album = {
  title: string
  artist: string
  playcount: number
  image: string
  spotifyUrl: string
  imageUrl: string
  trackNum: number
  releaseYear: number
}

type Playback = {
  isPlaying: boolean
  playback?: PlaybackTrack
}

type PlaybackTrack = {
  title: string
  url: string
  artist: string
  album: string
  albumImageUrl: string
  show: string
  showImageUrl: string
}

export const prerender = false

export const load: PageLoad = async function ({ fetch, setHeaders }) {
  const albums = (await (await fetch('/listening/top-album')).json()) as Album[]
  const playback = (await (await fetch('/listening/now')).json()) as Playback

  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })

  return { ...playback, albums }
}

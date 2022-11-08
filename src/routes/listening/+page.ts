import type { PageLoad } from './$types'

type Album = {
  title: string
  artist: string
  playcount: number
  image: string
  blurDataUrl: string
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

type Saved = {
  type: string
  total_tracks: string
  url: string
  id: string
  image: string
  blurDataUrl: string
  name: string
  release_date: string
  artist: string
  tracks: string
  genres: string
}

export const prerender = false

export const load: PageLoad = async function ({ fetch }) {
  const albums = (await (await fetch('/listening/top-album')).json()) as Album[]
  const playback = (await (await fetch('/listening/now')).json()) as Playback
  const saved = (await (await fetch('/listening/albums')).json()) as Saved[]

  return { ...playback, albums, saved }
}

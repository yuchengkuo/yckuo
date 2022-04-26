export type Frontmatter = {
  type: string
  title: string
  subtitle: string
  published: boolean
  info: {
    title: string
    content: string[]
  }[]
  slug: string
  readingTime?: { text: string; minutes: number; time: number; words: number }
  ids: { id: string; title: string }[]
}

export type NowPlayingTrack = {
  isPlaying: boolean
  title: string
  url: string
  artist: string
  album: string
  show: string
}

export type Album = {
  title: string
  artist: string
  playcount: number
  spotifyUrl: string
  imageUrl: string
  trackNum: number
  releaseYear: string
}

export type Track = {
  title: string
  artists: string
  songUrl: string
}

export type Artist = {
  name: string
  genres: string
  external_urls: string
}

export type Stats = {
  tracks: number
  albums: number
  artists: number
}

export type Bookmark = {
  excerpt: string
  type: string
  _id: string
  title: string
  link: string
  domain: string
  tags: string[]
}

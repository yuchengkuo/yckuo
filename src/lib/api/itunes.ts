import { getFullUrl } from './util'

const SEARCH_ENDPOINT = 'https://itunes.apple.com/search'

export async function getItunesAlbum(title: string, artist: string) {
  const query = new URLSearchParams({
    term: `${title} ${artist}`,
    media: 'music',
    entity: 'album',
    attribute: 'albumTerm',
    limit: '5',
  })

  const url = new URL(SEARCH_ENDPOINT)

  return fetch(getFullUrl(url, query))
}

export async function getItunesTrack(title: string, artist: string) {
  const query = new URLSearchParams({
    term: `${title} ${artist}`,
    media: 'music',
    entity: 'musicTrack',
    limit: '5',
  })

  const url = new URL(SEARCH_ENDPOINT)

  return fetch(getFullUrl(url, query))
}

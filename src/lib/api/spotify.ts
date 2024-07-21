import { getFullUrl } from './util'

import { SPOTIFY_CLIENT_ID as client_id } from '$env/static/private'
import { SPOTIFY_CLIENT_SECRET as client_secret } from '$env/static/private'
import { SPOTIFY_REFRESH_TOKEN as refresh_token } from '$env/static/private'

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=short_term`
const SAVED_ALBUMS_ENDPOINT = `https://api.spotify.com/v1/me/albums`
const PLAYLIST_ENPOINT = `https://api.spotify.com/v1/playlists`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`

export type Album = {
  type: string
  total_tracks: string
  url: string
  id: string
  image: string
  name: string
  release_date: string
  artist: string
}

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    }).toString()
  })

  return response.json()
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export async function getTopTracks(limit = '30', offset = '0') {
  const { access_token } = await getAccessToken()

  const url = new URL(TOP_TRACKS_ENDPOINT)
  url.searchParams.append('time_range', 'short_term')
  url.searchParams.append('limit', limit)
  url.searchParams.append('offset', offset)

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export async function getSavedAlbums(limit = '30', page = '1') {
  const { access_token } = await getAccessToken()

  const url = new URL(SAVED_ALBUMS_ENDPOINT)
  url.searchParams.append('limit', limit)
  url.searchParams.append('page', page)

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export async function getTopArtists() {
  const { access_token } = await getAccessToken()

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export async function getPlaylist(id: string) {
  const { access_token } = await getAccessToken()

  return fetch(PLAYLIST_ENPOINT + '/' + id, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export async function getAlbumSearchResult(title: string, artist: string) {
  const { access_token } = await getAccessToken()

  const query = new URLSearchParams({
    q: `${title} artist:${artist} album:${title}`,
    type: 'album'
  })

  const url = new URL(SEARCH_ENDPOINT)

  return fetch(getFullUrl(url, query), {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

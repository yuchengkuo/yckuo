import { getFullUrl } from './util'

import { SPOTIFY_CLIENT_ID as client_id } from '$env/static/private'
import { SPOTIFY_CLIENT_SECRET as client_secret } from '$env/static/private'
import { SPOTIFY_REFRESH_TOKEN as refresh_token } from '$env/static/private'

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=short_term`
const SAVED_ALBUMS_ENDPOINT = `https://api.spotify.com/v1/me/albums`
const PLAYLIST_ENPOINT = `https://api.spotify.com/v1/playlists`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }).toString(),
  })

  return response.json()
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getSavedAlbums(limit = 30, page = 1) {
  const { access_token } = await getAccessToken()

  const url = new URL(SAVED_ALBUMS_ENDPOINT)
  url.searchParams.append('limit', limit.toString())
  url.searchParams.append('page', page.toString())

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getTopArtists() {
  const { access_token } = await getAccessToken()

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getPlaylist(id: string) {
  const { access_token } = await getAccessToken()

  return fetch(PLAYLIST_ENPOINT + '/' + id, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getAlbumSearchResult(title: string, artist: string) {
  const { access_token } = await getAccessToken()

  const query = new URLSearchParams({
    q: `${title} artist:${artist} album:${title}`,
    type: 'album',
  })

  const url = new URL(SEARCH_ENDPOINT)

  return fetch(getFullUrl(url, query), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

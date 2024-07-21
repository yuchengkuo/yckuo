import { getUnixTime, previousSunday } from 'date-fns'

import { LASTFM_API_KEY as api_key } from '$env/static/private'
import { LASTFM_USERNAME as user } from '$env/static/private'
import { getFullUrl } from './util'

const LASTFM_ENDPOINT = `http://ws.audioscrobbler.com/2.0/`
const sharedParams = { api_key, user, format: 'json' }

export async function getTopAlbums(limit = '12') {
  const method = `user.gettopalbums`
  const period = `7day` // overall | 7day | 1month | 3month | 6month | 12month
  const query = new URLSearchParams({
    method,
    period,
    limit,
    ...sharedParams
  })
  const url = new URL(LASTFM_ENDPOINT)
  return fetch(getFullUrl(url, query))
}

export async function getRecentTracks() {
  const method = `user.getRecentTracks`
  const query = new URLSearchParams({
    method,
    ...sharedParams
  })
  const url = new URL(LASTFM_ENDPOINT)
  return fetch(getFullUrl(url, query))
}

export async function getWeeklyTracks() {
  const from = getUnixTime(previousSunday(Date.now())).toString()
  const method = `user.getrecenttracks`
  const query = new URLSearchParams({
    method,
    from,
    ...sharedParams
  })
  const url = new URL(LASTFM_ENDPOINT)
  return fetch(getFullUrl(url, query))
}

export async function getWeeklyArtists() {
  const from = getUnixTime(previousSunday(Date.now())).toString()
  const method = 'user.getweeklyartistchart'
  const query = new URLSearchParams({
    method,
    from,
    ...sharedParams
  })
  const url = new URL(LASTFM_ENDPOINT)
  return fetch(getFullUrl(url, query))
}

export async function getWeeklyAlbums() {
  const from = getUnixTime(previousSunday(Date.now())).toString()
  const method = 'user.getweeklyalbumchart'
  const query = new URLSearchParams({
    method,
    from,
    ...sharedParams
  })
  const url = new URL(LASTFM_ENDPOINT)
  return fetch(getFullUrl(url, query))
}

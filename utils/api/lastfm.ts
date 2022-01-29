import { getUnixTime, previousSunday } from 'date-fns'

const api_key = process.env.LASTFM_API_KEY
const user = process.env.LASTFM_USERNAME

const LASTFM_ENDPOINT = `http://ws.audioscrobbler.com/2.0/`
const sharedParams = { api_key, user, format: 'json' }

export const getTopAlbums = async () => {
  const method = `user.gettopalbums`
  const period = `7day` // overall | 7day | 1month | 3month | 6month | 12month
  const query = new URLSearchParams({
    method,
    period,
    ...sharedParams,
  }).toString()
  const ENDPOINT = `${LASTFM_ENDPOINT}?${query}`
  return fetch(ENDPOINT)
}

export const getWeeklyTracks = async () => {
  const from = getUnixTime(previousSunday(Date.now()))
  const method = `user.getweeklytrackchart`
  const query = new URLSearchParams({
    method,
    from: `${from}`,
    ...sharedParams,
  }).toString()
  return fetch(`${LASTFM_ENDPOINT}?${query}`)
}

export const getWeeklyArtists = async () => {
  const from = getUnixTime(previousSunday(Date.now()))
  const method = 'user.getweeklyartistchart'
  const query = new URLSearchParams({
    method,
    from: `${from}`,
    ...sharedParams,
  }).toString()
  return fetch(`${LASTFM_ENDPOINT}?${query}`)
}
export const getWeeklyAlbums = async () => {
  const from = getUnixTime(previousSunday(Date.now()))
  const method = 'user.getweeklyalbumchart'
  const query = new URLSearchParams({
    method,
    from: `${from}`,
    ...sharedParams,
  }).toString()
  return fetch(`${LASTFM_ENDPOINT}?${query}`)
}

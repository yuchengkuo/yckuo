const api_key = process.env.LASTFM_API_KEY
const user = process.env.LASTFM_USERNAME

const TOP_ALBUMS_ENDPOINT = `http://ws.audioscrobbler.com/2.0/`

export const getTopAlbums = async () => {
  const method = `user.gettopalbums`
  const period = `7day` // overall | 7day | 1month | 3month | 6month | 12month
  const query = new URLSearchParams({
    method,
    user,
    period,
    api_key,
    format: 'json',
  }).toString()
  const ENDPOINT = `${TOP_ALBUMS_ENDPOINT}?${query}`
  return fetch(ENDPOINT)
}

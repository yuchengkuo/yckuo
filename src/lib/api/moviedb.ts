import { join } from 'path'

import { TMDB_API_KEY as api_key } from '$env/static/private'
import { TMDB_ACCESS_TOKEN as access_token } from '$env/static/private'
import { TMDB_USERID as user_id } from '$env/static/private'

const BASE_ENDPOINT = 'https://api.themoviedb.org'
const CONFIG_ENDPOINT = '3/configuration'
const FAVTV_ENDPOINT = `4/account/${user_id}/tv/favorites`
const TV_ENPOINT = '3/tv'

export async function getFavoriteTV(page = 1) {
  const url = new URL(FAVTV_ENDPOINT, BASE_ENDPOINT)
  const query = new URLSearchParams({
    page: page.toString(),
  })
  query.forEach((value, key) => url.searchParams.append(key, value))

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getPosterUrl(file_path: string) {
  const url = new URL(CONFIG_ENDPOINT, BASE_ENDPOINT)
  url.searchParams.append('api_key', api_key)

  try {
    const res = await fetch(url.toString())

    const { images } = await res.json()
    const { secure_base_url, poster_sizes } = images
    return secure_base_url + poster_sizes[5] + file_path
  } catch (e) {
    console.error('Error while getting poster URL', e)
    return ''
  }
}

export async function getShowDetail(id: number) {
  const url = new URL(join(TV_ENPOINT, String(id)), BASE_ENDPOINT)
  url.searchParams.append('api_key', api_key)

  try {
    const res = await fetch(url.toString())

    const {
      genres,
      status,
      last_air_date: lastAir,
      number_of_episodes: episodes,
      number_of_seasons: seasons,
    } = await res.json()
    return { genres, status, episodes, seasons, lastAir }
  } catch (e) {
    console.log('Error while getting show detail', e)
    return {}
  }
}

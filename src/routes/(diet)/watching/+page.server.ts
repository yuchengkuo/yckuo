import { getTMDBList } from '$lib/api/moviedb'
import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

type Item = {
  type: 'tv' | 'movie'
  title: string
  posterUrl: string
  time: string
  id: string
}

export const prerender = false

export const load: PageServerLoad = async function ({ setHeaders, url }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })
  const page = url.searchParams.get('page')
  try {
    const { results: toRecent } = await (await getTMDBList({ list_id: 8238723 })).json()
    const recent = toRecent.map(mapItems) as Item[]

    const res = await getTMDBList({ page })
    const { results, total_pages } = await res.json()

    let cur = 1
    while (cur++ < total_pages) {
      const res = await getTMDBList({ page: cur.toString() })
      const { results: next } = await res.json()
      results.push(...next)
    }
    const all = results.map(mapItems) as Item[]

    return { recent, all }
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting watching items')
  }
}

function mapItems(item) {
  return {
    type: item.media_type,
    title: item.media_type === 'tv' ? item.name : item.title,
    posterUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    time: item.media_type === 'tv' ? item.first_air_date : item.release_date,
    id: item.id,
  }
}

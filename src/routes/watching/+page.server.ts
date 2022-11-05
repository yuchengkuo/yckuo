import { getPosterUrl, getTMDBList } from '$lib/api/moviedb'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

type Item = {
  type: 'tv' | 'movie'
  title: string
  posterUrl: string
  blurDataUrl: string
  time: string
  overview: string
  vote: string
  id: string
}

export const prerender = false

export const load: PageServerLoad = async function ({ setHeaders, url }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })
  const page = url.searchParams.get('page')
  try {
    const res = await getTMDBList(page)

    const { results, total_pages } = await res.json()

    let cur = 1
    while (cur++ < total_pages) {
      const res = await getTMDBList(cur.toString())
      const { results: next } = await res.json()
      results.push(...next)
    }

    const items = (await Promise.all(
      results.map(async (item) => {
        const posterUrl = await getPosterUrl(item.poster_path)
        const blurDataUrl = await getBlurDataUrl(posterUrl)
        return {
          type: item.media_type,
          title: item.media_type === 'tv' ? item.name : item.title,
          posterUrl,
          blurDataUrl,
          time: item.media_type === 'tv' ? item.first_air_date : item.release_date,
          overview: item.overview,
          vote: item.vote_average,
          id: item.id,
          genre_ids: item.genre_ids,
        }
      })
    )) as Item[]

    return { items }
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting list items')
  }
}

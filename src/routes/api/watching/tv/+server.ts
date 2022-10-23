import { error, json } from '@sveltejs/kit'
import { getFavoriteTV, getPosterUrl, getShowDetail } from '$lib/api/moviedb'
import { compareDesc } from 'date-fns'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'

import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const res = await getFavoriteTV()

  if (!res.ok) throw error(404, 'Error getting shows')

  const { results, total_pages } = await res.json()

  if (total_pages > 1) {
    let pages = total_pages
    do {
      try {
        const { results: more } = await (await getFavoriteTV(pages)).json()
        results.push(...more)
      } catch (e) {
        console.log('Error while getting more shows', e)
      }
    } while (--pages > 1)
  }

  const shows = (
    await Promise.all(
      results.map(async (show) => {
        const posterUrl = await getPosterUrl(show.poster_path)
        const blurDataUrl = await getBlurDataUrl(posterUrl)
        const showDetail = await getShowDetail(show.id)
        return {
          title: show.name,
          posterUrl,
          blurDataUrl,
          time: show.first_air_date,
          overview: show.overview,
          vote: show.vote_average,
          id: show.id,
          ...showDetail,
        }
      })
    )
  ).sort((a, b) => compareDesc(new Date(a.lastAir), new Date(b.lastAir)))

  return json(shows, {
    headers: { 'cache-control': 'public, s-maxage=1080000, stale-while-revalidate=43200' },
  })
}

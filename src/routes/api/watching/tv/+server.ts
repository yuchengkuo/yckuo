import { json } from '@sveltejs/kit'
import { getFavoriteTV, getPosterUrl, getShowDetail } from '$lib/api/moviedb'
import type { RequestHandler } from '@sveltejs/kit'
import { compareDesc } from 'date-fns'

export const GET: RequestHandler = async function () {
  const res = await getFavoriteTV()

  if (!res.ok) {
    return new Response(undefined, { status: 404 })
  }

  const { results, total_pages } = await res.json()

  if (total_pages > 1) {
    let pages = total_pages
    do {
      const { results: more } = await (await getFavoriteTV(pages)).json()
      results.push(...more)
    } while (--pages > 1)
  }

  return json(
    {
      results: (
        await Promise.all(
          results.map(async (show) => ({
            title: show.name,
            posterUrl: await getPosterUrl(show.poster_path),
            time: show.first_air_date,
            overview: show.overview,
            vote: show.vote_average,
            id: show.id,
            ...(await getShowDetail(show.id)),
          }))
        )
      ).sort((a, b) => compareDesc(new Date(a.lastAir), new Date(b.lastAir))),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=1080000, stale-while-revalidate=43200',
      },
    }
  )
}

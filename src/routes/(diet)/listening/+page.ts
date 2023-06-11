import type { Album } from '$lib/api/spotify'
import type { PageLoad } from './$types'

export const prerender = false

export const load: PageLoad = async function ({ fetch, setHeaders }) {
  const albums = (await fetch('/listening/top-album?limit=6').then((r) => r.json())) as Album[]
  const saved = (await fetch('/listening/albums?limit=6').then((r) => r.json())) as Album[]

  setHeaders({ 'cache-control': 'public, s-maxage=864000, stale-while-revalidate=432000' })

  return { albums, saved }
}

import type { PageLoad } from './$types'

type Album = {
  type: string
  total_tracks: string
  url: string
  id: string
  image: string
  name: string
  release_date: string
  artist: string
}

export const prerender = false

export const load: PageLoad = async function ({ fetch, setHeaders }) {
  const albums = (await (await fetch('/listening/top-album?limit=6')).json()) as Album[]
  const saved = (await (await fetch('/listening/albums?limit=6')).json()) as Album[]

  setHeaders({ 'cache-control': 'public, s-maxage=864000, stale-while-revalidate=432000' })

  return { albums, saved }
}

import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ fetch, setHeaders }) {
  const res = await fetch('/api/bookmark')

  if (res.ok) {
    setHeaders({ 'cache-control': 'public, s-maxage=1080000, stale-while-revalidate=43200' })
    const items = await res.json()
    return { items }
  }
  throw error(404)
}

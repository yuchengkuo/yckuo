import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ fetch, setHeaders }) {
  const res = await fetch('/api/watching/tv')

  if (res.ok) {
    setHeaders({ 'cache-control': 'public, max-age=86400' })
    return { shows: (await res.json()).results }
  }
  throw error(404)
}

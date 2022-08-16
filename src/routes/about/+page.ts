import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ fetch, setHeaders }) {
  const res = await fetch('/api/content/about?data')

  if (res.ok) {
    const { data } = await res.json()
    setHeaders({ 'cache-control': 'public, maxage=196000' })
    return data
  }

  throw error(404)
}

import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async function ({ fetch, setHeaders }) {
  const res = await fetch('/api/content/home?data')

  if (res.ok) {
    const { data } = await res.json()

    setHeaders({
      'cache-control': 'public, max-age=30 * 24 * 60 * 60',
    })
    return data
  }
  throw error(404)
}

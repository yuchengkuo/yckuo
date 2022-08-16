import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ fetch }) {
  const res = await fetch('/api/bookmark')

  if (res.ok) {
    const items = await res.json()
    return items
  }
  throw error(404)
}

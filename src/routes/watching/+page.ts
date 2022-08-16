import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ fetch }) {
  const res = await fetch('/api/watching/tv')

  if (res.ok) {
    return (await res.json()).results
  }
  throw error(404)
}

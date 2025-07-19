export const prerender = true

import type { Work } from '$content'

export async function load({ fetch }) {
  const works = (await fetch('/api/content/collection/works/published:desc').then((res) =>
    res.json()
  )) as Work[]

  return { works }
}

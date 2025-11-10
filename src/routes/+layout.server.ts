export const prerender = true

import type { Navigation } from '$content'

export async function load({ fetch }) {
  const { navigation, contact } = (await fetch('/api/content/entry/navigation').then((res) =>
    res.json()
  )) as Navigation

  return { navigation, contact }
}

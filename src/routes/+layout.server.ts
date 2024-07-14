import type { Navigation } from '$content'

export async function load({ fetch }) {
  const { navigation } = (await fetch('/api/content/entry/navigation').then(
    (res) => res.json()
  )) as Navigation

  return { navigation }
}

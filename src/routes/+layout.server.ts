export const prerender = true

import type { Navigation } from '$content'
import type { Weather } from './api/weather/+server.js'

export async function load({ fetch }) {
  const { navigation } = (await fetch('/api/content/entry/navigation').then((res) =>
    res.json()
  )) as Navigation

  const weather: Weather = await fetch('/api/weather').then((res) => res.json())

  return { navigation, weather }
}

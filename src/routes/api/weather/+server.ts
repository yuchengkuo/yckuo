import { getCurrentWeather } from '$lib/api/weather'
import { json } from '@sveltejs/kit'

export const prerender = false

const cache = new Map()
const CACHE_KEY = 'kaohsiung_weather'
const CACHE_DURATION = 24 * 60 * 60 * 1000 //24hr

export type Weather = {
  temp: number
  condition: string
  cached: boolean
  timestamp: string
}

const isCacheValid = (cacheEntry: Weather) => {
  if (!cacheEntry) return false
  return Date.now() - new Date(cacheEntry.timestamp).getTime() < CACHE_DURATION
}

export async function GET({ setHeaders }) {
  const cachedData: Weather = cache.get(CACHE_KEY)

  if (isCacheValid(cachedData)) {
    setHeaders({
      'Cache-Control': `public, max-age=${Math.floor((CACHE_DURATION - (Date.now() - new Date(cachedData.timestamp).getTime())) / 1000)}`,
      'X-Cache': 'HIT',
      'X-Cache-Timestamp': cachedData.timestamp
    })

    return json({
      ...cachedData,
      cached: true
    })
  }

  const weather = await getCurrentWeather()
  const data: Weather = {
    ...weather,
    cached: false,
    timestamp: new Date().toISOString()
  }

  cache.set(CACHE_KEY, {
    ...data,
    timestamp: Date.now()
  })

  setHeaders({
    'Cache-Control': `public, max-age=${CACHE_DURATION / 1000}`,
    'X-Cache': 'MISS',
    'X-Cache-Timestamp': new Date().toISOString()
  })

  return json(data)
}

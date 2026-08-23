import { error } from '@sveltejs/kit'
import { getFullUrl } from './util'

// URL
const OPEN_METEO_ENDPOINT = 'https://api.open-meteo.com/v1/forecast'
// KHH, TW
const LAT = '22.7167'
const LONG = '120.3414'

export async function getCurrentWeather(): Promise<{ temp: number; condition: string }> {
  const url = new URL(OPEN_METEO_ENDPOINT)
  const query = new URLSearchParams({
    latitude: LAT,
    longitude: LONG,
    current: 'temperature_2m,weather_code',
    teimzone: 'Asia/Taipei'
  })

  const res = await fetch(getFullUrl(url, query))

  if (res.ok) {
    const data = await res.json()

    const temp = Math.round(data.current.temperature_2m)
    const code = data.current.weather_code

    let condition = 'Sunny'
    if (code >= 51 && code <= 82) condition = 'Rainy'
    else if (code === 1) condition = 'Mostly Clear'
    else if (code === 2) condition = 'Partly Cloudy'
    else if (code === 3) condition = 'Cloudy'
    else if (code >= 95) condition = 'Stormy'

    return {
      temp,
      condition
    }
  }

  error(404, `Weather API responded with status: ${res.status}`)
}

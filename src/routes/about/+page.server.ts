import { getContentBySlug } from '$lib/content/utils'

import type { About } from '$contentlayer'
import type { PageServerLoad } from './$types'
import { getItems } from '$lib/api/savee'

export type Savee = {
  _id: string
  url: string
  name: string
  pageURL: string
  asset: {
    _id: string
    image: {
      thumbnail: string
      width: number
      ratio: number
    }
  }
}

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=259200, stale-while-revalidate=86400' })

  const about = getContentBySlug<About>('about')

  try {
    const res = await getItems()
    if (!res.ok) return { about }
    const savee = await res.json()
    const {
      data: {
        userByUsername: {
          items: { items },
        },
      },
    } = savee
    return { about, items: items as Savee[] }
  } catch (e) {
    console.error(e)
    return { about }
  }
}

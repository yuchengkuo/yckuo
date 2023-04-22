import { RAINDROP_ACCESS_TOKEN as access_token } from '$env/static/private'
import { getAspectRatio } from '$lib/media/getAspectRatio'
import { getBlurDataUrl } from '$lib/media/getBlurDataUrl'
import { getFullUrl } from './util'

const RAINDROPS_ENDPOINT = `https://api.raindrop.io/rest/v1/raindrops/`

// "-" means descending
type SortParam =
  | '-created'
  | 'created'
  | 'score'
  | '-sort'
  | 'title'
  | '-title'
  | 'domain'
  | '-domain'
type GetBookmarkParam = {
  collection: string
  search?: string
  sort?: SortParam
  page?: number
  perpage?: number
  ids?: Array<number>
}

export type Raindrop = {
  title: string
  tags: string[]
  excerpt: string
  link: string
  domain: string
  cover: string
  blurDataUrl: string
  aspectRatio: string
}

export async function getBookmarks(param: GetBookmarkParam): Promise<Raindrop[]> {
  const { collection, search, sort, page, perpage = 50 } = param
  const url = new URL(RAINDROPS_ENDPOINT + collection)
  const query = new URLSearchParams()
  if (search) query.set('search', search)
  if (sort) query.set('sort', sort)
  if (perpage) query.set('perpage', perpage.toString())
  if (page) query.set('page', page.toString())

  const res = await fetch(getFullUrl(url, query), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  const { items } = await res.json()

  return await Promise.all(
    items.map(async (item) => ({
      title: item.title,
      tags: item.tags,
      excerpt: item.excerpt,
      link: item.link,
      domain: item.domain,
      cover: item.cover,
      blurDataUrl: await getBlurDataUrl(item.cover),
      aspectRatio: await getAspectRatio(item.cover),
    }))
  )
}

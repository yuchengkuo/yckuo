import { RAINDROP_ACCESS_TOKEN as access_token } from '$env/static/private'
import { getAspectRatio } from '$lib/media/getAspectRatio'
import { getBlurDataUrl } from '$lib/media/getBlurDataUrl'
import { parseContent } from '$lib/content/utils'
import { getFullUrl } from './util'

import type { RenderableTreeNode } from '@markdoc/markdoc'

const RAINDROPS_ENDPOINT = `https://api.raindrop.io/rest/v1/raindrops/`
const COLLECTION_ENDPOINT = `https://api.raindrop.io/rest/v1/collections`

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
  id: number
  title: string
  tags: string[]
  note?: RenderableTreeNode | undefined
  excerpt: string
  link: string
  domain: string
  cover: string
  blurDataUrl: string
  aspectRatio: string
  collectionId: number
  created_at: string
}

export type Collection = {
  title: string
  description: string
  id: number
  udpated_at: string
  count: number
}

export async function getBookmarks(param: GetBookmarkParam): Promise<Raindrop[]> {
  const { collection, search, sort, page, perpage = 50 } = param
  const url = new URL(RAINDROPS_ENDPOINT + collection)
  const query = new URLSearchParams()
  if (search) query.set('search', search)
  if (sort) query.set('sort', sort)
  if (perpage) query.set('perpage', perpage.toString())
  if (page) query.set('page', page.toString())

  const { items } = await fetch(getFullUrl(url, query), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json())

  return await Promise.all(
    items.map(async (item) => ({
      id: item._id,
      title: item.title,
      tags: item.tags,
      note: item.note.length ? (await parseContent(item.note)).content : undefined,
      excerpt: item.excerpt,
      link: item.link,
      domain: item.domain,
      cover: item.cover,
      blurDataUrl: await getBlurDataUrl(item.cover),
      aspectRatio: await getAspectRatio(item.cover),
      collectionId: item.collectionId,
      created_at: item.created,
    }))
  )
}

export async function getChildCollections(collection: string): Promise<Collection[]> {
  const url = new URL(COLLECTION_ENDPOINT + '/childrens')

  const { items } = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json())

  return items
    .filter((i) => Number(collection) === Number(i.parent.$id))
    .map((i) => ({
      id: i._id,
      title: i.title,
      description: i.description,
      updated_at: i.lastAction,
      count: i.count,
    }))
}

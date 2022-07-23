import { getContentBySlug, getDataBySlug } from '$lib/markdoc/utils'
import type { RequestHandler } from '@sveltejs/kit'
import type { JSONValue } from '@sveltejs/kit/types/private'

export const GET: RequestHandler = async function ({ params, url }) {
  const { slug } = params

  if (url.searchParams.has('data')) {
    const data = getDataBySlug(slug)

    if (data) {
      return {
        status: 200,
        body: { data } as JSONValue,
      }
    }
    return {
      status: 404,
    }
  }

  const { content, frontmatter } = getContentBySlug(slug)

  if (content) {
    return {
      status: 200,
      body: { content, frontmatter } as JSONValue,
    }
  }
  return {
    status: 404,
  }
}

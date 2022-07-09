import { getContentBySlug, getDataBySlug } from '$lib/markdoc/utils'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async function ({ params, url }) {
  const { slug } = params

  if (url.searchParams.has('data')) {
    const data = getDataBySlug(slug)

    if (data) {
      return {
        status: 200,
        body: JSON.stringify({ data }),
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
      body: JSON.stringify({ content, frontmatter }),
    }
  }
  return {
    status: 404,
  }
}

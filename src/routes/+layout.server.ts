import { getSiteRepo } from '$lib/api/github'
import { parseMarkdown } from '$lib/content/utils'

import { config as configSource } from '$contentlayer'

import type { LayoutServerLoad } from './$types'

export const load = async function () {
  const { updated_at = null } = await getSiteRepo()
  const { routes, connect } = configSource

  await parseMarkdown(routes)

  return { routes, connect, updated_at }
} satisfies LayoutServerLoad

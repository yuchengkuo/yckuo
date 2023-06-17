import { getSiteLastCommit, getSiteRepo } from '$lib/api/github'
import { parseMarkdown } from '$lib/content/utils'

import { config as configSource } from '$contentlayer'

import type { LayoutServerLoad } from './$types'

export const load = async function () {
  const { pushed_at = null } = await getSiteRepo()
  const { sha } = await getSiteLastCommit()
  const { routes, connect } = configSource

  await parseMarkdown(routes)

  return { routes, connect, updated_at: pushed_at, commit_sha: sha }
} satisfies LayoutServerLoad

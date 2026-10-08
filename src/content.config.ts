/*
 * Every collection shares one base, the submodule itself, so `entry.id` carries the
 * directory and `/${entry.id}` is the URL with no per-collection rule. The routes depend on
 * it. A9 catches a mistyped base.
 *
 * `pages` stays root-only (`*.mdoc` does not cross `/`), which keeps `docs/CONTEXT.md` out.
 *
 * Unknown frontmatter keys are stripped, never rejected with `.strict()`: a schema must
 * never be able to demand a content edit. Some files do carry undeclared keys. The gate
 * doesn't assert on them either — an unknown key is inert.
 */
import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/*
 * `description` is plain text, not markdown: it only renders into a meta `content="…"`.
 *
 * `z.coerce.date()` because YAML hands `2022-10-08` over as a Date but `2019-08` as a
 * string.
 */
const shared = {
  title: z.string(),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  date: z.coerce.date().optional(),
  published: z.coerce.date().optional(),
  updated: z.coerce.date(),
  draft: z.boolean().default(false)
}

const pages = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './content' }),
  schema: z.object({ ...shared })
})

/* Not routed, so ids drop the directory to match what `org:` writes (`oen`). */
const teams = defineCollection({
  loader: glob({
    pattern: 'work/team/*.yml',
    base: './content',
    generateId: ({ entry }) => entry.replace(/^work\/team\//, '').replace(/\.yml$/, '')
  }),
  schema: z.object({ ...shared })
})

const works = defineCollection({
  loader: glob({ pattern: 'work/*.mdoc', base: './content' }),
  schema: z.object({
    ...shared,
    featured: z.boolean().default(false),
    thumbnail: z.string().optional(),
    /* Required, though no route renders it. */
    org: reference('teams'),
    category: z.array(z.string().max(15)),
    emoji: z.string().emoji(),
    meta: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
    /* Declared identically in `works` and `projects` on purpose — see CONTEXT.md's
       field vocabulary — so the work page and the homepage card render the same
       sentences. */
    summary: z.string()
  })
})

const projects = defineCollection({
  loader: glob({ pattern: 'project/**/*.mdoc', base: './content' }),
  schema: z.object({
    ...shared,
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.array(z.string().max(15)),
    summary: z.string(),
    featured: z.boolean().default(false),
    link: z.url().optional()
  })
})

const notes = defineCollection({
  loader: glob({ pattern: 'note/**/*.mdoc', base: './content' }),
  schema: z.object({
    ...shared,
    tags: z.array(z.string()).optional()
  })
})

/*
 * `glob()`, not `file()`: `file()` makes each top-level key its own entry, while `glob()`
 * gives one entry keyed by filename.
 *
 * `title` and `updated` are read by nothing, but declared so the strip rule doesn't
 * silently apply to this file.
 */
const navigation = defineCollection({
  loader: glob({ pattern: 'navigation.yml', base: './content' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    navigation: z.array(
      z.object({
        key: z.string(),
        label: z.string(),
        url: z.string()
      })
    ),
    contact: z.array(z.object({ key: z.string(), label: z.string(), url: z.url() }))
  })
})

export const collections = { pages, teams, works, projects, notes, navigation }

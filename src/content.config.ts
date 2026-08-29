/*
 * The collection schemas.
 *
 * FIVE collections plus `teams`. `entry.id` IS the slug, and every collection uses ONE
 * base — `'./content'`, the private submodule itself — rather than its own subdirectory,
 * so the glob loader's id carries the directory: `about`, `work/checkout-revamp`,
 * `project/pages`, `note/windicss`. That is not cosmetic: under this scheme
 * `/${entry.id}` is the URL for all four content collections with no per-collection
 * rule, and the routes depend on it.
 *
 * A9 in `port-guard.mjs` is what catches a mistyped base — it fails when any declared
 * glob resolves to nothing, which is exactly what a base pointed at a bad checkout does.
 *
 * `pages` stays root-only (`*.mdoc` does not cross `/`), which is what keeps
 * `docs/CONTEXT.md` out of every collection.
 *
 * ---------------------------------------------------------------------------------
 * RULING: unknown frontmatter keys are STRIPPED, never rejected.
 *
 * Astro's schemas could reject them with `.strict()`. They must not, because **a schema
 * must never be able to demand a content edit** — content is the fixed point. Two files
 * carry keys no schema declares: `index.mdoc` has a stale `sidenote`, and
 * `project/formula-student` an `info:` block of authored prose. Rejecting would fail
 * both, and deciding what to do about them is a content question, not a schema one.
 *
 * They stay in the files, stay invisible, and stay recorded here. The gate deliberately
 * does not assert on them: an unknown key is inert, not silently damaging, which is the
 * shape an assertion exists for.
 * ---------------------------------------------------------------------------------
 */
import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/*
 * The fields every collection shares.
 *
 * `description` is a PLAIN STRING, not markdown — it is only ever rendered into a
 * `content="…"` meta attribute, where a `<p>` wrapper would arrive escaped.
 *
 * `z.coerce.date()` is what lets both `published: 2022-10-08` (which the YAML parser
 * hands over as a Date) and `published: 2019-08` (which it does not, being an incomplete
 * timestamp) land as Dates.
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

/*
 * Team data for `works` to reference. `generateId` strips the `work/team/` directory that
 * `glob()` would otherwise bake into the id — `teams` is reference data, not a routed
 * collection, so its ids should match what `org:` frontmatter naturally writes (`oen`), not
 * the directory-carrying scheme `pages`/`works`/`projects`/`notes` use for their URLs.
 */
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
    /* Required, though no route renders it. All ten work files carry it. */
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
 * ONE entry, not many — and `glob()` is what gives that, counter-intuitively.
 * `file()` splits a single file into MANY entries (it wants an array, or an object whose
 * keys are ids), so pointed at `navigation.yml` it would yield four entries called
 * `title`, `updated`, `navigation` and `contact`. `glob()` treats a data file as one
 * entry keyed by its filename: `getEntry('navigation', 'navigation')`.
 *
 * `title` and `updated` are in the file and read by nothing. They are declared anyway so
 * the strip rule above does not quietly apply to a file whose whole content is two lists.
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
        url: z.string(),
        include: z.array(z.string()).optional()
      })
    ),
    contact: z.array(z.object({ key: z.string(), label: z.string(), url: z.url() }))
  })
})

export const collections = { pages, teams, works, projects, notes, navigation }

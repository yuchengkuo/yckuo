/*
 * The collection schemas — Velite's `velite.config.ts` ported to Astro.
 *
 * FIVE collections, not seven (09's correction, re-verified here against the corpus):
 *   - `posts` is NOT ported. `content/post/` does not exist, so `s.metadata()` and
 *     `s.excerpt()` — the only two velite helpers with no zod equivalent — die with it.
 *   - `orgs` is NOT ported. Zero consumers: nothing reads `work/org/*.yml`, and the
 *     `org` field on `works` that referenced it is rendered by no route. The field is
 *     kept below (it is authored data, present on all ten work files); the collection
 *     it pointed at is not.
 *
 * `entry.id` IS velite's `slug`. Every collection uses `base: './src/content'` rather
 * than its own subdirectory, so the glob loader's id carries the directory exactly as
 * `s.path()` did: `about`, `work/checkout-revamp`, `project/pages`, `note/windicss`.
 * That is not cosmetic — `+page.svelte` uses `href={work.slug}` and
 * `href="/{nextProject.slug}"` directly, so under this scheme `/${entry.id}` is the URL
 * for all four collections with no per-collection rule. Tickets 14 and 15 depend on it.
 *
 * The patterns are velite's, with `.md` -> `.mdoc`. `pages` stays root-only (`*.mdoc`
 * does not cross `/`), which is what keeps `docs/CONTEXT.md` out of every collection —
 * 03's ruling, reproduced by the glob rather than restated as a rule.
 *
 * ---------------------------------------------------------------------------------
 * RULING: unknown frontmatter keys are STRIPPED, exactly as today.
 *
 * The ticket asked for a decision on `content/index.mdoc`'s stale `sidenote: Kaohsiung,
 * Taiwan` — 06 dropped the field from `sharedSchema` and velite's zod object has been
 * silently stripping it since. Astro's schemas could reject it instead
 * (`.strict()`). They do not, for three reasons:
 *
 *   1. P3 is pre-authorised in the other direction: "never edit content to satisfy a
 *      schema. Content is the fixed point." Rejecting unknown keys is that rule
 *      inverted — it makes a schema able to demand a content edit.
 *   2. `sidenote` is not alone, which the ticket did not know. `project/formula-student`
 *      carries an `info:` block (year / role / context / collaborators) that velite's
 *      `projects` schema never declared either. Rejecting would fail two files and one
 *      of them holds real authored prose, so "reject and clean the key" is a content
 *      decision on someone's writing, not a tidy-up.
 *   3. Redesign is Out of scope, and deleting authored frontmatter is a content change
 *      riding a port.
 *
 * Both keys stay in the files, stay invisible, and stay recorded here. Making them
 * visible is a post-migration content question. `port-guard.mjs` does not assert on
 * them: an unknown key is inert, not silently damaging, which is the shape ladder
 * assertions exist for.
 * ---------------------------------------------------------------------------------
 */
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/*
 * velite's `sharedSchema`, minus `slug` (which is `entry.id`, above) and minus
 * `description: s.markdown()` — 04 verified that field is rendered nowhere, so the
 * markdown transform on it was dead. It ports as a plain string.
 *
 * `s.isodate()` -> `z.coerce.date()`. Both `published: 2022-10-08` (which the YAML
 * parser hands over as a Date) and `published: 2019-08` (which it does not, being an
 * incomplete timestamp) land as Dates through coercion.
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

/* velite: pattern '*.md', root-only */
const pages = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content' }),
  schema: z.object({ ...shared })
})

/* velite: pattern 'work/*.md' */
const works = defineCollection({
  loader: glob({ pattern: 'work/*.mdoc', base: './src/content' }),
  schema: z.object({
    ...shared,
    featured: z.boolean().default(false),
    thumbnail: z.string().optional(),
    /* Kept required, as velite had it, though the `orgs` collection it referenced is
       not ported and no route renders it. All ten work files carry it. */
    org: z.string(),
    category: z.array(z.string().max(15)),
    emoji: z.string().emoji(),
    /* velite's union had a third member, `s.string().url()`, which every `s.string()`
       already accepts. Dropped rather than ported. */
    meta: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
    tagline: z.string().optional(),
    summary: z.array(z.string()).optional()
  })
})

// velite: pattern 'project/**/*.md'
const projects = defineCollection({
  loader: glob({ pattern: 'project/**/*.mdoc', base: './src/content' }),
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

// velite: pattern 'note/**/*.md'
const notes = defineCollection({
  loader: glob({ pattern: 'note/**/*.mdoc', base: './src/content' }),
  schema: z.object({
    ...shared,
    tags: z.array(z.string()).optional()
  })
})

/*
 * velite's `single: true` collection.
 *
 * `glob()` rather than `file()`, which is the counter-intuitive choice of the two.
 * `file()` splits one file into MANY entries — it wants an array, or an object whose
 * keys are ids — so pointed at `navigation.yml` it would yield four entries called
 * `title`, `updated`, `navigation` and `contact`. `glob()` treats a data file as ONE
 * entry keyed by its filename, which is velite's `single: true` exactly:
 * `getEntry('navigation', 'navigation')`.
 *
 * `title` and `updated` are in the file (velite merged `sharedSchema` in) and are read
 * by nothing; they are declared so the strip rule above does not quietly apply to a
 * file whose whole content is two lists.
 */
const navigation = defineCollection({
  loader: glob({ pattern: 'navigation.yml', base: './src/content' }),
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

export const collections = { pages, works, projects, notes, navigation }

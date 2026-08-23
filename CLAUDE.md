# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` — Astro dev server
- `pnpm build` — `astro build && node scripts/port-guard.mjs` (the build gate; see below)
- `pnpm guard` — the gate alone, against an existing `dist/`. `--strict` promotes census drift and
  skipped rungs to errors
- `pnpm preview` — serve the built `dist/`
- `pnpm selftest` — the fixture proofs: `scripts/converter-selftest.mjs` behind `slashify()`, and
  `scripts/getinfo-selftest.mjs` behind `ratioFromGetInfo()`. Both run with no network and no
  content checkout
- `pnpm ratios` — record the true dimensions of any Cloudinary id the ratio manifest lacks.
  `--dry` reports what it would fetch. Runs automatically on `pnpm dev`, never on a build
- `pnpm format` — Prettier

There is **no type-check script**. `astro check` was evaluated and backed out:
`@astrojs/language-server` asserts the TypeScript _programmatic_ API, which TypeScript 7's native
compiler dropped. Taking it means pinning `typescript@^6` — a decision, not a chore.

### Deployment

`vercel.json` sets `installCommand` to `bash scripts/vercel-install.sh`, which authenticates with
`GITHUB_TOKEN`, clones the private `content/` submodule, then runs `pnpm install`. There is no
npm-script alias — the shell script is the only entry point. `outputDirectory` is `dist`.

## The build gate — `scripts/port-guard.mjs`

Nine assertions that deliberately fail the build where the framework would otherwise **succeed
quietly**: grid utilities missing from the generated CSS, `getHeadings()` silently zeroed by an async
transform, an unlisted Shiki fence language, a missing UnoCSS entry, two `prose.css` rules, an
`<astro-island>` inside `<main>`, a font family declared twice so the dev cascade picks the loser,
and a collection glob that resolves to nothing. Every one of them was proven to bite by injection.
It needs **Node ≥ 22.18** — it imports `markdoc.config.mjs` and the TypeScript
`src/lib/highlighter.ts` directly, so it relies on Node's type stripping.

**Structure is hard, provenance warns.** Assertions are revision-independent and always hard — each
derives its expectation from whatever corpus is present. The pinned corpus figures are _provenance_:
reported every run, warning on drift, naming the revision they were measured at. `--strict` promotes
drift and skips to errors.

**Adding a `client:` directive is a layout change.** `<astro-island>` is `display: contents`, which
generates no box but still sits in the DOM — and the corpus is placed almost entirely by
`>`-combinators (`main > article`, `> figure`, `.gallery > *`), so one island severs the subgrid
chain while leaving the HTML, the classes and the text correct. **A10 is where a new directive finds
out.** No island renders inside `<main>`.

## Comments

Comments here are a decision log, not narration. Write for **an agent reading the file cold** —
`CLAUDE.md` and the file, nothing else. Two tests, both must pass:

1. Would a reader who never saw this repo's history **edit the code differently** because of this
   sentence?
2. Does it **stay true when the code around it changes**?

Keep, most durable first — **external constraints** (upstream bugs, CSS and browser semantics,
framework behaviour), **invariants a gate assertion backs**, then **rationale for a non-obvious
choice**. Drop narration of the code below it: the code already says that, and it rots on every
refactor.

Prefer the asserted class. Where a comment states an invariant `port-guard.mjs` already checks,
**name the assertion** (`A7`, `A10`) — a comment the build can falsify cannot rot silently. An
invariant nothing asserts is either not load-bearing or wants a rung.

- **No project archaeology.** No ticket numbers, no finding ids, no comparisons to the deleted
  SvelteKit tree. Those citations point at `.scratch/`, which is gitignored — dangling for every
  reader but the author, on the machine that wrote them. State the conclusion, drop the provenance.
- **Cross-references are file-level only.** Naming a file survives most edits; "the comment at
  `X.svelte`'s `$state`" is a link with no checker. Never reference a path under `.scratch/`.
  Assertion names are the exception — `port-guard.mjs` is tracked and they are stable identifiers.
- **Section labels are not comments.** `/* Heading */` in a stylesheet is structure. It stays.
- **Say it is wrong when it is wrong.** A comment whose only honest form records an inconsistency
  should record it, not be tidied into sounding deliberate.

## Project Architecture

Astro 7 + Markdoc, prerendered, deployed on Vercel. Svelte 5 is present for the few components that
need interactivity — it is not the rendering path.

### Content

`content/` is a **private git submodule** of `.mdoc` files, read directly by
`src/content.config.ts`. A clone without access to it cannot build, and that is deliberate:
clone-and-run is not a goal.

Five collections, all sharing one `base: './content'` so that `entry.id` carries the directory and
`/${entry.id}` is the URL with no per-collection rule:

- `pages` — `*.mdoc`, root-only (which is what keeps `docs/CONTEXT.md` out of every collection)
- `works` — `work/*.mdoc`
- `projects` — `project/**/*.mdoc`
- `notes` — `note/**/*.mdoc`
- `navigation` — `navigation.yml`, one entry via `glob()` (not `file()` — see the note there)

Unknown frontmatter keys are **stripped, not rejected** — a schema must never be able to demand a
content edit. The reasoning is recorded in `src/content.config.ts`.

### Content markup

Images are `![alt](/cloudinary-id 'caption') {% .start-1 .span-8 %}`. **The leading `/` is
required** — Astro reads a bare id as a local file and the build fails. Grid annotations
(`{% .span-N %}`) live only inside content, which is why `mdoc` must stay in both
`astro.config.mjs`'s `pipeline.include` and `uno.config.ts`'s extractor regex: either one alone
kills all 68 of them with a green build and no warning. A1 asserts it.

Custom tags: `{% gallery %}`, `{% expand %}`, `{% deflist %}`, `{% span %}`. Full authoring rules
live in `content/docs/CONTEXT.md`.

### Media boxes

Every media box is sized before its bytes arrive, from `aspect-ratios.json` at the root of the
content submodule: Cloudinary id -> literal CSS ratio, one per line, sorted. The ratio is a
**discovered fact about the asset, never an authored decision** — `scripts/aspect-ratios.mjs`
fetches it once via Cloudinary's unauthenticated `fl_getinfo` flag and commits it. Generation is
local (`pnpm dev`, `pnpm ratios`); a production build makes no network call, because the deploy
filesystem is ephemeral and could never persist one back. `docs/adr/0001-committed-ratio-manifest.md`
records that.

**There is no default ratio and no fallback.** `aspectRatio()` in `src/lib/media/aspectRatio.ts`
throws on an id the manifest lacks, and it is the single lookup for both body media (`Img.astro`)
and frontmatter media (`work/[slug].astro`). A default would reserve the wrong box, still shift the
page, and look deliberate.

The declaration goes on the **wrapper inside the figure**, never on the figure — the figure also
holds the caption, and a ratio there makes the caption eat the media's space. `aspectRatio` is a
required prop on both media components. It was once declared and never assigned, and 124 boxes
shipped `aspect-ratio: ` through two frameworks with a green build every time. A12 is what makes
that unshippable now.

`@markdoc/markdoc` is **patched** (`patches/`) for an unreported upstream bug: `.trim()` should be
`.trimEnd()` in the block-tag rule, which otherwise mis-claims an inline tag as a block tag once the
frontmatter is long enough. Without it, 3 of 26 files fail to parse.

### Styling

UnoCSS with a custom Radix UI color integration. Semantic shortcuts (`bg-screen`, `text-primary`),
custom variants (`child-first`, `child-last`), font stack on CSS variables (`--sans`,
`--serif`, `--mono`). The `rx-` prefix expands to a light/dark pair — a bare `radix-` token is
single-theme and should be assumed deliberate only where a comment says so.

### Content Editing Rules

- When editing any content file (`content/**/*.mdoc`), always update the `updated` field in its
  frontmatter to today's date (`YYYY-MM-DD` format).
- **Read `content/docs/CONTEXT.md` first.** It defines the audience, the field vocabulary
  (`tagline` vs `description` vs `summary`), the case study shape, the markup, and the voice rules.

### The converter

`scripts/slashify.mjs` inserts the leading `/` a Cloudinary image id needs
(`![alt](work/x)` -> `![alt](/work/x)`). It is a library with no CLI; the corpus is already
converted, so nothing runs it in anger — but it is the record of a one-character edit to authored
prose, and `pnpm selftest` (`scripts/converter-selftest.mjs`) is the proof that the edit is a pure
insertion: same call sites, byte-identical once the slashes are normalised away, tag balance
unchanged, idempotent. Fixture-driven, so it needs no content checkout.

`scripts/fences.mjs` is the one fenced-code scanner, shared with the build gate. Two copies of that
rule once disagreed, which is why there is now one.

## Agent skills

### Issue tracker

Issues live as markdown files under `.scratch/<feature-slug>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `content/docs/CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

`CONTEXT.md` lives inside the private `content` submodule, not at the repo root, so it isn't
published with the public site repo. It sits under `content/docs/` rather than the content root
because the `pages` collection pattern (`*.mdoc`) would otherwise pick it up as a page.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Content Development
- `pnpm dev` - Start development server with parallel content and Svelte compilation
- `pnpm dev:content` - Watch and rebuild content with Velite only
- `pnpm dev:svelte` - Start Vite dev server only

### Build Process
- `pnpm build` - Full production build (runs content build then Svelte build)
- `pnpm build:content` - Build content collections with Velite
- `pnpm build:svelte` - Build Svelte application with Vite

### Code Quality
- `pnpm format` - Format code with Prettier
- `pnpm check` - Type check with svelte-check
- `pnpm check:watch` - Continuous type checking

### Deployment
- `vercel.json` sets `installCommand` to `bash scripts/vercel-install.sh`, which authenticates with
  `GITHUB_TOKEN`, clones the private `content/` submodule, then runs `pnpm install`. There is no
  npm-script alias — the shell script is the only entry point.

## Two packages during the Astro migration

`astro/` is a **second, independent package** with its own `package.json`, lockfile and
`node_modules` — Astro 7 needs Vite 8 and SvelteKit 2.57 is on Vite 5, so one manifest cannot hold
both, and both must stay buildable at once for the parity run. Run its commands from inside
`astro/` (`pnpm install`, `pnpm dev`, `pnpm build`); the root scripts above are SvelteKit's and are
untouched by it. `astro/src/content/` is a **gitignored mirror** of the private submodule, not a
source directory. The plan, the tickets and every ruling live in `.scratch/astro-migration/map.md`
— **read it before touching `astro/`**. The root SvelteKit tree is still what production serves.

## Project Architecture

### Content Management System
This is a content-driven SvelteKit application using **Velite** as the content layer:

- **Content Collections**: Defined in `velite.config.ts` with strict schemas
  - `pages` - Static pages (*.md files)
  - `works` - Portfolio work items (work/*.md)
  - `projects` - Personal projects (project/**/*.md)
  - `notes` - Blog-style notes (note/**/*.md)
  - `posts` - Long-form posts (post/**/*.md)
  - `orgs` - Organization data (work/org/*.yml)
  - `navigation` - Site navigation (navigation.yml)

- **Content Processing**: Uses Markdoc for rich content transformation
  - Custom nodes for headings with auto-generated IDs and anchor links
  - Image processing with Cloudinary integration (supports videos via `image_isvideo` attribute)
  - Code syntax highlighting with Shiki using custom TMR themes
  - Custom tags: `{% gallery %}`, `{% expand %}`, `{% deflist %}`, `{% span %}`

### Styling System
- **UnoCSS** with custom Radix UI color system integration
- **Design tokens**: Semantic color shortcuts (bg-screen, text-primary, etc.)
- **Custom variants**: no-js, child-first, child-last
- **Typography**: Custom font stack with CSS variables (--sans, --serif, --mono)

### SvelteKit Configuration
- **Aliases**: `$content` → `.velite` (generated content)
- **Prerendering**: Enabled with concurrency of 3

### Routing Structure
- **Route groups**: `(more)` group for secondary pages
- **Dynamic routes**: 
  - `[...page]` - Catch-all for content pages
  - `work/[page]` - Individual work pages
  - `note/[page]` - Individual note pages
- **API routes**: Content API at `/api/content/` for collections and entries

### Key Dependencies
- **Core**: SvelteKit 2.x, Svelte 5.x
- **Content**: Velite, Markdoc, Shiki for syntax highlighting
- **Styling**: UnoCSS, Radix UI colors
- **Package Manager**: pnpm 9.15.3

### Content Rendering Pipeline
Content flows through: Markdown files → Velite (with Markdoc transforms in `markdoc.config.ts`) → JSON AST in `.velite/` → `Content.svelte` renders AST via `sveltejs-markdoc` with component mapping:
- `img` → `$lib/media/Image.svelte` (Cloudinary integration)
- `vid` → `$lib/media/Video.svelte`
- `CodeBlock` → `$lib/content/CodeBlock.svelte` (Shiki-highlighted at build time)
- `Expand` → `$lib/content/Expand.svelte`
- `Gallery` → `$lib/content/Gallery.svelte`

Additional components can be passed to `Content.svelte` via the `components` prop.

### Content API
Routes fetch content from the generated `.velite` collections at runtime:
- `GET /api/content/entry/[slug]` — Single entry by slug (matches across all collections)
- `GET /api/content/collection/[key]/[[sort]]` — Full collection, optional sort like `updated:desc` or `published:asc`
- Drafts are filtered out in production, visible in dev

### Content Editing Rules
- When editing any content file (`content/**/*.md`), always update the `updated` field in its frontmatter to today's date (`YYYY-MM-DD` format).

### Development Notes
- The `content/` directory is a **private git submodule** — `scripts/vercel-install.sh` handles
  submodule auth for deployment. A clone without access to it cannot build, and that is deliberate:
  clone-and-run is not a goal (see `.scratch/codebase-coherence/issues/06-public-repo-private-content.md`)
- Content is generated into `.velite` directory (aliased as `$content`)
- The build process requires content compilation before Svelte compilation (`run-s build:*` ensures order)
- No test suite is configured; use `pnpm check` for type checking
- UnoCSS config includes custom Radix color transformations and semantic shortcuts

## Agent skills

### Issue tracker

Issues live as markdown files under `.scratch/<feature-slug>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `content/docs/CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

`CONTEXT.md` lives inside the private `content` submodule, not at the repo root, so it isn't
published with the public site repo. It sits under `content/docs/` rather than the content root
because the `pages` collection pattern (`*.md`) would otherwise pick it up as a page.

**Read `content/docs/CONTEXT.md` before writing or editing any content file.** It defines the
audience, the field vocabulary (`tagline` vs `description` vs `summary`), the case study shape,
and the voice rules.
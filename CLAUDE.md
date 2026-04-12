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
- `pnpm vercel-install` - Custom install script for Vercel deployment (handles submodule authentication)

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
- **Aliases**: 
  - `$components` → `src/components`
  - `$utils` → `src/utils`
  - `$content` → `.velite` (generated content)
- **Prerendering**: Enabled with concurrency of 3
- **File extensions**: Supports both .svelte and .md files

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
- **Animations**: Motion (motion-dom)
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
- The `content/` directory is a **git submodule** — `pnpm vercel-install` handles submodule auth for deployment
- Content is generated into `.velite` directory (aliased as `$content`)
- The build process requires content compilation before Svelte compilation (`run-s build:*` ensures order)
- No test suite is configured; use `pnpm check` for type checking
- UnoCSS config includes custom Radix color transformations and semantic shortcuts
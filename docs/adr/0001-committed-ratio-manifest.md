# 0001 — Image ratios come from a committed manifest, not a per-build fetch

Status: accepted
Date: 2026-08-23

## Context

Every image and video on the site needs its true dimensions known before the bytes arrive, or the
box cannot be reserved and the page shifts under the reader. The dimensions are a fact about the
asset, held by Cloudinary, and the site has 116 of them.

Cloudinary will state them for free. The `fl_getinfo` delivery flag turns an ordinary delivery URL
into a JSON description of the asset and needs **no authentication**, which matters because this
project's API credentials were deliberately revoked and are not coming back. So the question is not
_can we ask_ — it is _when_.

## Decision

Ask once, locally, and commit the answer. `aspect-ratios.json` lives at the root of the private
`content` submodule and is read at build time. `scripts/aspect-ratios.mjs` fetches only the ids the
manifest lacks, and its Astro hook runs on the `dev` command only.

## Why not fetch during the build

**The deploy filesystem is ephemeral.** This is the constraint that decides it, and it is invisible
from the code. Vercel runs the build in a container that is discarded afterwards; nothing written
there survives, and nothing can be pushed back to a repository from inside it. A manifest generated
in CI would therefore be regenerated in full on every single deploy — 116 requests, every time, for
data that changes only when an asset does.

Two more follow from the same place:

- **A deploy would depend on Cloudinary being reachable.** Box reservation is a layout fix; it has
  no business turning a third party's availability into a failed deploy.
- **The build would stop being a function of the repository.** Two builds of the same commit could
  differ, and the difference would be invisible in review.

## Why the manifest lives inside the content submodule

It is derived from the corpus and useless without it. Putting it there means a clone with no content
access has neither the images nor their ratios, so the fail-loud-on-missing-id rule is **vacuous
rather than a special case** — there is nothing to render and nothing to look up. It also means the
ratio for a new image lands in the same commit as the content edit that introduced it, which is the
only arrangement under which an image and its dimensions cannot be committed apart.

## Consequences

- Adding an image costs one network call, on the author's machine, at `pnpm dev` or `pnpm ratios`.
- The manifest is a generated file under version control. Regeneration is an insertion, not a
  reflow: keys are sorted and one per line.
- A production build makes no network call and writes nothing.
- An asset whose ratio was never recorded **fails the build by name**. There is no default ratio —
  a default looks deliberate and is wrong, and reserving the wrong box still shifts the page.

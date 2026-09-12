# 0004 — Column spans inside `{% grid %}` are derived from the ratio manifest, not authored

Status: accepted — width superseded by [0005](0005-grid-widened-to-ten-columns.md)
Date: 2026-09-01

## Context

`{% gallery %}` wrapped 55 images across six files and placed none of them from their content: the
wrapper hard-coded `md:col-span-3` with a `nth-child(3n+2)` bump to 4, so every set got the same
positional rhythm whatever it held, and a `.span-*` annotation written inside the wrapper was inert.
Everywhere else in the corpus, placement is per-image and authored — 56 images outside a gallery
carry `{% .span-N %}`.

The manifest that [0001](0001-committed-ratio-manifest.md) commits already knows the true shape of
every asset at build time, with no network and no client JS. Nothing was reading it for layout.

Measured against the six gallery files: 58% of the images are wide landscape screenshots between
1.45 and 2.2, 9 of 55 are portrait, and 6 of those are below 0.5 — one at 0.24 (a 1440×5992
full-page capture). A layout that ignores that distribution produces either one rhythm forever or a
row three times taller than its neighbours.

## Decision

`{% grid %}` replaces `{% gallery %}`. It occupies page columns 3–10 — eight columns, symmetrically
inset — as a subgrid, with `align-items: start`.

Each image's span is a pure function of **its own** aspect ratio:

| ratio | span (of 8) |
| --- | --- |
| ≥ 0.8 | 4 |
| 0.5 – 0.8 | 3 |
| 0.25 – 0.5 | 2 |
| < 0.25 | 1 |

`Img.astro` resolves the ratio already, so it emits `data-span="N"` on the figure and `Grid`'s
stylesheet matches on it. Any `.span-*`, `.start-*` or `.end-*` annotation on an image suppresses
the derived span entirely — the author has placed it, and the table stops guessing.

Rows are filled by CSS grid's own auto-placement. When the next image does not fit, it wraps and
the remainder of the row is left empty.

## Considered options

**Filling every row** — give the row's leftover columns to its widest image, or choose the split
that equalises heights. Rejected twice over. It needs one image to know about its siblings, which
means a build-time packer and a channel from the tag transform down to a component, where the
derived-span rule needs nothing but the image itself. And it makes the rendered page no longer
predictable from the file, which is the same reason authoring order is never reordered.

**Equal-height justified rows** (widths exactly proportional to ratio, Flickr-style). Nothing is
cropped and every row ends flush, so it is the strongest option on paper. Rejected because of the
extremes: at a shared row height the 0.24 image becomes an unreadable vertical sliver.

**Cropping to a uniform cell.** Rejected. The ratio mechanism exists so that a box is the true shape
of its asset; a crop to tidy up a row inverts that, and the assets are UI screenshots where a crop
hides interface.

**Reordering to pack tighter.** Rejected. `shots.mdoc` and `oen-custom-websites.mdoc` are curated
sequences.

**Deleting the annotation vocabulary entirely**, so every image is placed by the table. Rejected —
the six sub-0.5 images cannot be made legible at any grid size, and the override is the only tool
that handles them.

The span table was tuned against the real corpus rather than chosen. At eight columns it wastes
12.1% of available cells, fills 17 of 29 rows exactly, and holds the tallest row to 6.2
column-units. The same table at ten columns wastes 21.5% — `4+4` never reaches 10, so a two-column
strip goes dead on 14 of 26 rows. The `< 0.25` bucket exists for one image and earns its place by
dropping the tallest row from 8.3 to 6.2.

## Consequences

- **A ragged right edge is the accepted cost**, at 12.1% of cells. It is not a defect to be fixed
  later by tuning the table; the alternative is the packer above.
- **Spans mean different things inside and outside a grid.** Inside, they count the grid's eight
  columns; outside, the page's twelve. `.span-full` inside is 8. This is the price of keeping the
  inset, and it is the one thing about the feature a reader will get wrong. A gate rung rejects a
  span above 8 inside a grid rather than letting it clamp in silence.
- **`markdoc.config.mjs` still knows nothing about ratios**, and no island renders inside `<main>`.
  Both invariants survive because the derived span depends on one image, so it resolves in
  `Img.astro` — already downstream of the gate's imports and already the one place a ratio is looked
  up.
- **A new rung pairs `Img.astro`'s table with `Grid`'s stylesheet.** They are two lists of span
  numbers that must agree; a value emitted with no matching rule falls to span 1 with correct HTML,
  correct classes and a green build.
- **A1 stays load-bearing.** Annotations remain the vocabulary for composition, so the `.mdoc`
  extractor still has grid utilities to find.
- **`{% gallery %}` is deleted rather than aliased**, and all six files convert in the same commit.
  An alias would mean documenting two names for one thing.

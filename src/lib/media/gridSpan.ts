/*
 * Buckets an aspect ratio (width / height, as a plain number) into a `{% grid %}` column
 * span of 1-4 out of the grid's own ten columns. The table is tuned against the real
 * corpus, not derived from first principles — `docs/adr/0004-derived-grid-spans.md` records
 * the measurements (12.1% of cells wasted at eight columns, 21.5% at ten, 17 of 29 rows
 * filled exactly, tallest row held to 6.2 column-units) that fixed these four thresholds:
 *
 *   ratio        span
 *   >= 0.8       4
 *   0.5 - 0.8    3
 *   0.25 - 0.5   2
 *   < 0.25       1
 *
 * Boundaries are inclusive at the lower end, so a ratio of exactly 0.8 or 0.5 or 0.25 takes
 * the wider bucket.
 */

export type GridSpan = 1 | 2 | 3 | 4

/**
 * THROWS on zero, negative, or non-finite input rather than bucketing it — there is no
 * fallback span, for the same reason `aspectRatio()` has no fallback ratio: a wrong box
 * that renders would look deliberate.
 */
export function spanFromRatio(ratio: number): GridSpan {
  if (!Number.isFinite(ratio) || ratio <= 0)
    throw new Error(`spanFromRatio: ratio must be a positive finite number, got ${ratio}`)

  if (ratio >= 0.8) return 4
  if (ratio >= 0.5) return 3
  if (ratio >= 0.25) return 2
  return 1
}

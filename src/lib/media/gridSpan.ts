/*
 * Spans are out of `{% grid %}`'s ten columns. The thresholds are tuned against the corpus,
 * not derived — `docs/adr/0004-derived-grid-spans.md` has the measurements.
 */

export type GridSpan = 1 | 2 | 3 | 4

/**
 * `ratio` is width / height. Throws on zero, negative, or non-finite input: there is no
 * fallback span, for the same reason `aspectRatio()` has no fallback ratio.
 */
export function spanFromRatio(ratio: number): GridSpan {
  if (!Number.isFinite(ratio) || ratio <= 0)
    throw new Error(`spanFromRatio: ratio must be a positive finite number, got ${ratio}`)

  if (ratio >= 0.8) return 4
  if (ratio >= 0.5) return 3
  if (ratio >= 0.25) return 2
  return 1
}

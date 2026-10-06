# 0005 — `{% grid %}` widens from eight columns to ten

Status: accepted
Date: 2026-09-12

## Context

[0004](0004-derived-grid-spans.md) inset `{% grid %}` two tracks on each side of the page's twelve
(`start-3 span-8`) and, in the same pass, measured the alternative: the same 1-4 span table at ten
columns wastes 21.5% of cells instead of 12.1%, because `4+4` never reaches 10 and a two-column strip
goes dead on 14 of 26 rows. 0004 accepted the narrower grid on that basis.

That tradeoff is reconsidered here, not re-measured — the waste figures stand as 0004 recorded them.

## Decision

`{% grid %}` moves to `start-2 span-10`: lines 2 to 12, leaving tracks 1 and 12 clear (one on each
side, not two). The per-image span table in `gridSpan.ts` is unchanged — still 1-4, still a pure
function of the image's own ratio — so the only things that move are the container's own
`start`/`span` and everything that names the grid's width as a literal 8.

## Consequences

- **The accepted waste is now 21.5%, not 12.1%.** 0004's own measurement; this decision spends it
  knowingly rather than re-deriving it.
- **`Grid.astro`'s `.media-grid` rule and its comment** move to `md:start-2 md:span-10`.
- **`port-guard.mjs` A14's overrun check moves from 8 to 10** — `.span-11` and `.span-12` are now the
  invalid values on a grid child, not `.span-9` through `.span-12`. The assertion name and its
  messages are updated to match; the check itself (a `.span-*` above the grid's own width silently
  clamps instead of erroring) is unchanged.
- **`gridSpan.ts`'s docstring names ten columns**, not eight; the bucket thresholds themselves are not
  revisited by this decision.
- **`content/docs/CONTEXT.md` and this file are the width's only authoritative statements** an author
  or agent should read literally — `.span-11` and `.span-12` are what's newly invalid inside a grid,
  not `.span-9`/`.span-10`.

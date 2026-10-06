# 0003 — Client-side routing is removed again, and the page-arrive transition with it

Status: accepted
Date: 2026-08-29

## Context

[0002](0002-client-routing-restored.md) restored `ClientRouter` for a fade/scale/blur page-arrive
transition on `<main>`. Diagnosing a scroll-to-top artifact during that transition root-caused a
structural problem: `<main>` is a plain in-flow block, not a scroll container — `<html>` is — so the
View Transitions API's snapshot of it captures the FULL document height at whatever `scrollY` the page
was at, never just the viewport slice. Every navigation therefore bakes some form of jump/slide-to-top
into the old snapshot, regardless of CSS overrides on `::view-transition-group()`. This was confirmed
independent of lenis: disabling it entirely reproduced an identical capture-geometry curve.

A CSS fix (`::view-transition-group(*) { animation: none }`) converts the browser's default ~250ms
*sliding* resize into an instant top-crop-then-fade — cheaper, but not a fix. The old snapshot still
shows its own top, not wherever the user had scrolled to, the instant the transition starts, because
that's simply what the capture contains. The only complete fix is making `<main>` itself the scroll
container (`position: fixed`, viewport-sized, its own internal scroll) instead of `<html>` scrolling —
rewiring lenis to a new scroll target and revisiting the grid/sticky-footer layout that assumes
document-level scroll.

A light research pass surveyed non-View-Transition alternatives — Astro's own `fallback="animate"`
engine (already wired in via `<ClientRouter fallback="animate" />`, but dormant: it only runs when
`document.startViewTransition` is absent, and Chrome/Safari 18+ always take the native path regardless),
Swup.js, Barba.js+GSAP, and a hand-rolled fixed-overlay curtain. None sidesteps the problem for free:
each either reintroduces the same defect if it opts into native View Transitions, or pushes
scroll/viewport-clip correctness onto hand-written integration code with no built-in geometry tween in
return.

## Decision

Remove the page-arrive transition and `ClientRouter` entirely. Every navigation goes back to a full
document load. The homepage's own intro stagger (`index.astro`) is untouched — it is plain CSS
`animation` on `<main>`'s children, triggered by page load, with no dependency on routing or view
transitions of any kind.

## Why

A visible jump/crop artifact on every navigation reads as broken, not as design intent — no corner of
the slide-vs-instant-crop tradeoff looks like a finished feature. The actual fix costs a real
architecture change (`<main>` becomes the scroll container) that the transition, as it stood, did not
justify paying for.

## Consequences

- **The two-island split is gone.** Header and Footer drop `transition:persist` and are ordinary
  `client:load` Svelte islands again — they remount on every real navigation like anything else on a
  full-document-load site. No functional loss: Header's pathname-conditional link and Footer's scramble
  interval each work the same mounting fresh per page as they did surviving a swap; they just cost a
  normal page-load's worth of hydration instead of one hydration for the whole session.
- **Scroll is native again.** No swap-driven resync between lenis and a router. lenis keeps doing
  in-page smooth scrolling — that is a separate concern from page transitions and was not removed —
  but the `astro:before-swap`/`astro:after-swap` listeners it needed to survive a swap are gone, because
  the events themselves no longer fire.
- **`prose.css`'s dev-only stylesheet-order hazard is dead again.** It only diverged between
  "reached by a link" and "reached by reload"; both are now the same code path, so the split it
  documented no longer applies. Still worth the comment, since it happened once before and reverted
  once before it.
- **`port-guard.mjs`'s A13 (the router-goes-missing tripwire, added in 0002) is deleted**, not left to
  fail forever — it existed to catch an accidental, silent loss of the router; there is no router to
  lose now.
- **A future transition attempt needs the scroll-container rearchitecture decided first**, or should
  target something narrower than `<main>`'s full document-height box.

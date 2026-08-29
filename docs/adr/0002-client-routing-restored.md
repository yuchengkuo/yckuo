# 0002 — Client-side routing is restored, and the zero-JavaScript navigation path is given up

Status: accepted
Date: 2026-08-29

## Context

The base layout was written for a `ClientRouter` that is not there. `transition:persist` on the
Header, the Footer and the decorative layer; an `astro:after-swap` listener re-stamping lenis's
classes; a deliberate note that the analytics element is _not_ persisted because the router
constructs it once per navigation — all of it inert, because every navigation is a full document
load. The absence was silent. Nothing in the build could see it, and it surfaced only when an
unrelated feature tried to rely on a class surviving a navigation.

That left a binary call: restore the router, or strip the directives and the four comment blocks
that describe them.

## Decision

Restore it. `ClientRouter` goes in the base layout's head with the default `fallback="animate"`, and
every navigation animates.

## Why

The site is a portfolio whose whole subject is how things are made, and a navigation that cuts
between documents is the one place it read as a set of files rather than as one place. That is a
design reason, and it is the actual one — the transition is the feature; the router is what it costs.

The cost is real and is the thing being traded away: **the rendering path stops being
zero-JavaScript.** Astro prerenders every page and, until now, shipped a router-free document that
worked with scripting disabled and needed no hydration to navigate. That property is gone. In
exchange, three pieces of machinery already written for a router become true rather than decorative,
and one constraint that shaped an earlier decision is lifted — a class stamped on `<html>` now
survives a navigation, which is what the homepage intro stagger needed and could not have.

Stripping was the cheaper change and would have been the wrong one. It would have removed the
two-island split, which exists for no other reason, and left the site with no path to a transition
short of adding all of it back.

## Consequences

- **The outgoing DOM is destroyed, and only a snapshot animates.** Nothing in the departing page
  stays interactive or keeps playing mid-flight. Any future shared-element or continuous-media
  transition has to be designed around that, not against it.
- **Scroll becomes the router's business, and lenis holds its own scroll value.** The two have to be
  reconciled on every swap. Before this, a full document load did it for free.
- **`prose.css`'s dev-only stylesheet-order split is live again.** The code fix is already in, so the
  hazard is defended against — but the comment now describes something that can actually happen.
- **A13 guards the router's presence.** The regression that produced this decision was silent; the
  build gate now fails if `dist/` stops shipping the router. It asserts nothing about the animation.

---
title: Parent data in SvelteKit load function
description: In SvelteKit application, you can fetch data inside `+page.js` file, and you can also obtain parent data inside the load function.
date: 2023-01-27
tags:
  - SvelteKit
---

Inside `+page.ts` and `+layout.ts` [SvelteKit](https://kit.svelte.dev) provides `parent` function to access the data returned from a parent `load` function, a couple of things to notice when using the `parent` function.

## `Load` function

SvelteKit handles data loading for page component (`+page.svelte`) inside `+page.ts` (or `+page.js`) file, exporting a `load` function in which and the returned value will be available through `data` prop inside page:

```ts
// src/routes/note/[slug]/+page.ts
import type { PageLoad } from './$types'

export const load: PageLoad = function(({ params }) {
  return {
    note: {
      title: `Title for ${params.slug} goes here`,
      content: `Content for ${params.slug} goes here`
    }
  }
})
```

```svelte
<!-- src/routes/note/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageLoad } from './$types'

  export let data: PageLoad
</script>

<h1>{data.note.title}</h1><div>{@html data.note.content}</div>
```

## Using `Parent` data

Sometimes it might be useful for a `load` function to use data from a parent `load` function. For example, a parent `/project/+page.ts` routes return a list of tags and their amount to the project list page. Inside each project `/project/[slug]/+page.ts` we might also need to access this same information, this is where `parent` function is useful:

```ts
// src/routes/+layout.ts
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = function () {
  return { a: 1 }
}
```

```ts
///src/routes/abc/+layout.ts
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async function ({ parent }) {
  const { a } = await parent()
  return { b: a + 1 }
}
```

```ts
//src/routes/abc/+page.ts
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ parent }) {
  const { a, b } = await parent()
  return { c: a + b }
}
```

### Things to notice

1. The `load` funciton inside `+page.ts` will receive the merged data from _both_ parent `+page.ts` and `+layout.ts` and the sibling `+layout.ts`, not just the parent.
2. The `load` function inside `+layout.ts` will receive the merged data from its parent `load` in `+page.ts` and `+layout.ts`.
3. A missing `+layout.ts` is treated as `({ data }) => data`.
4. The `load` funciton inside `+page.server.ts` and `+layout.server.ts` will receive data from _only_ parent _`+layout.server.ts`_

## Refereneces

- [SvelteKit Docs](https://kit.svelte.dev/docs/load#using-parent-data)

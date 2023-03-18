---
title: UnoCSS Scanning
date: 2023-01-26
tag:
  - UnoCSS
---

## UnoCSS utilities scanning

UnoCSS works **at build time**, which means that only **statically presented** utilities will be generated. Utilities that are used dynamically or generated from exteral source might not be applied.

By default, UnoCSS will extract the utilities from files with `.jsx`, `.tsx`, `.vue`, `.html`, `.svelte`, `.md` and `.astro`. `.js` and `.ts` files are _not_ included by default, add `@unocss-include` to include the file or `@unocss-exclude` to exclude it from the transforming pipeline.

```ts
// somethere/config.ts

// @unocss-include
const tagClasses = [
  'tag-gray',
  'tag-indigo',
  'tag-tomato',
  'tag-brown',
  'tag-crimson',
  'tag-violet',
]
```

## Refereneces

- [UnoCSS Docs](https://github.com/unocss/unocss#scanning)
---
title: WindiCSS features
description: Some features that I like from WindiCSS.
published: 2022-11-11
tags:
  - Windicss
  - css
updated: 2024-02-03
---

A couple of features that I like from [WindiCSS](https://windicss.org).

## Variant Groups

Variants in utility classes are often used multiple times each time, being able to group them together, plus syntax highlighting reduces the time to understand what styles being applied.

```html
<!-- without variant groups -->
<button class="bg-black text-white hover:bg-white hover:rounded hover:text-black">
  Next Step ->
</button>

<!-- with variant groups -->
<button class="bg-black text-white hover:(bg-white rounded text-black)">Next Step -></button>
```

## Value Auto-infer

Value auto-info is useful when in need of one-time-use styles. In WindiCSS it's both supported with or without the `[]`, but personally I think it's much cleaner without it.

```tsx
<section class="bg-$colors-bg mt-8rem mb-12px max-w-56ch text-hex-121212">
  <Content />
</section>
```

## Attributify Mode

Attributify mode is the most interesting one, it enables us to write utility class in html attributes. This could be useful to separate utilities in different breakpoints.

```svelte
<button
  bg="dark-500 dark:light-500 hover:dark-400 dark:hover:light-400"
  text="sm white dark:black"
  font="normal light"
  border="rounded-full 1 gray-500"
>
  Click
</button>
```

## Discover further

- [Windicss](https://windicss.org)
- [Unocss](https://uno.antfu.me/)

<script lang="ts">
  import pkg from '@markdoc/markdoc'
  const { parse, transform } = pkg
  import Markdoc from 'sveltejs-markdoc'
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'

  export let title = 'YuCheng Kuo'
  export let desc = ''
  let classname = ''
  export { classname as class }

  let pathnames: string[]
  let content = {}
  let notify = false

  $: pathnames = $page.url.pathname.split('/')

  if (desc) {
    // TODO: don't include parse and transform in bundle
    content = transform(parse(desc), {
      nodes: {
        document: {
          render: 'div',
          attributes: {
            class: { default: 'prose mt-6 lt-sm:mt-4 text-fg-secondary !all:leading-6' },
          },
        },
      },
    })
  }
</script>

<header class="max-w mb-6 relative {classname}">
  {#if notify && $page.url.pathname !== '/'}<div
      class="absolute text-sm font-600 text-fg-secondary right-full top-2 pr-6 whitespace-nowrap"
      in:fly={{ x: 8 }}
      out:fly={{ x: -8 }}
    >
      ← Back
    </div>{/if}
  <h1>
    <a
      href={pathnames.length > 2 ? pathnames.slice(0, -1).join('/') : '/'}
      aria-label="Go upper level"
      on:mouseenter={() => (notify = true)}
      on:mouseleave={() => (notify = false)}>{title}</a
    >
  </h1>
  {#if desc}<Markdoc {content} />{/if}
</header>

<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import { formatDate } from '$lib/util.js'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title} — YuCheng Kuo</title>
</svelte:head>

<h1>{data.title}</h1>

<Content content={data.content} />

<p class="text-sm text-fg-subtle mt-4">
  Updated on <time datetime={data.updated}>{formatDate(data.updated)}</time>
</p>

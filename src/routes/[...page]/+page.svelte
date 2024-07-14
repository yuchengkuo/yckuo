<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import { formatDate } from '$lib/util.js'

  export let data
</script>

<svelte:head>
  <title>{data.title} — YuCheng Kuo</title>
</svelte:head>

<h1>{data.title}</h1>

<Content content={data.content} />

<p class="text-sm text-fg-subtle mt-4">
  <time datetime={data.updated}>Updated on {formatDate(data.updated)}</time>
</p>

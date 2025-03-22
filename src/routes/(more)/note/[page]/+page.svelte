<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import { formatDate } from '$lib/util.js'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title} — YuCheng Kuo</title>
</svelte:head>

<header>
  <h2>{data.title}</h2>
  <p>
    Updated on <time datetime={data.updated}>{formatDate(data.updated)}</time>
  </p>
</header>

<Content content={data.content} />

<style>
  header {
    --uno: 'mb-6';
  }

  header p {
    --uno: 'text-sm text-fg-subtle mt-2';
  }
</style>

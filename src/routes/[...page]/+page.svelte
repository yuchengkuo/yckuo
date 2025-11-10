<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import { formatDate } from '$lib/util.js'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title} — YuCheng Kuo</title>
</svelte:head>

<div class="mt-8 mb-16">
  <h1 class="text-8 leading-9 font-bold">{data.title}</h1>
  <p class="text-secondary">{data.subtitle}</p>
</div>

<Content content={data.content} />

<p class="mt-6 text-tertiary">
  Updated at <time datetime={data.updated}>{formatDate(data.updated)}</time>
</p>

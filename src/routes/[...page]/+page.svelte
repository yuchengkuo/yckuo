<script lang="ts">
  import Content from '$lib/content/Content.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title} — YuCheng Kuo</title>
</svelte:head>

<Content content={data.content} />

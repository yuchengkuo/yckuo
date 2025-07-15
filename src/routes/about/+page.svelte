<script lang="ts">
  import Content from '$lib/content/Content.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>Info — YuCheng Kuo</title>
</svelte:head>

<div class="prose">
  <Content content={data.content} />
</div>

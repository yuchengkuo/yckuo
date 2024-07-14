<script lang="ts">
  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>{$page.data.title ?? 'Work'} — YuCheng Kuo</title>
  <meta name="description" content={$page.data.description} />

  <meta property="og:type" content="article" />
</svelte:head>

<slot />

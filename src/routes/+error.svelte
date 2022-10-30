<script lang="ts">
  import { page } from '$app/stores'

  import Head from '$lib/seo/Head.svelte'

  console.error($page.error.message)
</script>

<Head title="{$page.status} · YuCheng Kuo" />

<h1 class="mb-4">{$page.status}</h1>

<p>Couldn't find <code>{$page.url.pathname}</code></p>

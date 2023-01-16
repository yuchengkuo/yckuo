<script lang="ts">
  import { page } from '$app/stores'

  import Head from '$lib/seo/Head.svelte'

  console.error($page.error.message)
</script>

<Head title={$page.status.toString()} />

<div class="max-w-56ch mx-auto">
  <h1 class="mb-4">{$page.status}</h1>

  <p>Failed accessing <code>{$page.url.pathname}</code></p>
</div>

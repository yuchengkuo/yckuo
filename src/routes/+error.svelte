<script lang="ts">
  import { page } from '$app/stores'

  import Head from '$components/Head.svelte'

  console.log($page.error.message)
</script>

<Head title="404 · YuCheng Kuo" />

<h1 class="mb-4">404</h1>

<p>Couldn't find <code>{$page.url.pathname}</code>, try again later?</p>

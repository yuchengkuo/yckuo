<script lang="ts">
  import { page } from '$app/stores'

  import Head from '$lib/seo/Head.svelte'

  import Intro from './Intro.svelte'

  console.error($page.error.message)
</script>

<Head title={$page.status.toString()} />

<Intro title={$page.status.toString()} />

<p class="max-w">
  Failed accessing <code>{$page.url.pathname}</code>, page might not exists!
</p>

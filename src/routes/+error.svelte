<script lang="ts">
  import { page } from '$app/stores'

  import Head from '$lib/seo/Head.svelte'
  import Header from './Header.svelte'

  console.error($page.error.message)

  const desc = `Failed accessing \`${$page.url.pathname}\`, try again later!`
</script>

<Head title={$page.status.toString()} />

<Header title={$page.status.toString()} {desc} />

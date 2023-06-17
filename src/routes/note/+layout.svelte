<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import { fly } from 'svelte/transition'
</script>

<Head
  title="Notes"
  description="Notes, thoughts, journals, snippets, etc."
  openGraph={{ url: 'note' }}
/>

<div class="layout-center" in:fly={{ y: 8, opacity: 0, duration: 600 }}>
  <slot />
</div>

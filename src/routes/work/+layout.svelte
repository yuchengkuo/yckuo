<script lang="ts">
  import { page } from '$app/state'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<svelte:head>
  <title>{page.data.title ?? 'Work'} — YuCheng Kuo</title>
  <meta name="description" content={page.data.description} />

  <meta property="og:type" content="article" />
</svelte:head>

{@render children?.()}

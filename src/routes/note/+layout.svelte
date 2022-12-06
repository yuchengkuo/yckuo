<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import Head from '$lib/seo/Head.svelte'

  import type { Options } from 'motion'
  import type { LayoutServerData } from './$types'

  const openGraph = { images: [{ url: 'notes.png' }], url: 'note' }
  const fadeupConfig: Options = {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, easing: 'ease-out' },
  }
</script>

<Head title="Notes" description="Notes, thoughts, journals, snippets, etc." {openGraph}>
  <script>
    document.documentElement.setAttribute('data-theme', 'note')
  </script>
</Head>

<main class="text-fg-secondary max-w-640px mx-auto" use:motion={fadeupConfig}>
  <slot />
</main>

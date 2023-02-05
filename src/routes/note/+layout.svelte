<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import Head from '$lib/seo/Head.svelte'

  import type { Options } from 'motion'

  const openGraph = { images: [{ url: 'notes.png' }], url: 'note' }
  const fadeupConfig: Options = {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, easing: 'ease-out' },
  }
</script>

<Head title="Notes" description="Notes, thoughts, journals, snippets, etc." {openGraph} />

<div class="text-fg-secondary layout-center" use:motion={fadeupConfig}>
  <slot />
</div>

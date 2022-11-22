<script lang="ts">
  import { page } from '$app/stores'
  import { motion } from '$lib/animation/motion'
  import Head from '$lib/seo/Head.svelte'

  import type { Options } from 'motion'
  import type { LayoutServerData } from './$types'

  export let data: LayoutServerData

  const openGraph = { images: [{ url: 'notes.png' }], url: 'note' }
  const fadeupConfig: Options = {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, easing: 'ease-out' },
  }
</script>

<Head title="Notes" description="Notes, thoughts, journals, snippets, etc." {openGraph}>
  <script>
    document.documentElement.setAttribute('data-theme', 'geyser')
  </script>
</Head>

<!-- Desktop layout -->
<section class="flex items-baseline lt-sm:hidden">
  <aside
    class="border-r border-fg/8 flex-shrink-0 pr-8 pb-4 top-16 w-1/3 overflow-y-auto sticky"
    style:height="calc(100vh - 64px)"
  >
    <h1 class="mb-4">Notes</h1>
    <p class="text-fg-secondary mb-8">Notes, thoughts, journals, snippets, etc.</p>
    <nav class="rounded-lg relative">
      {#each data.notes as note, index}
        {@const active = $page.url.pathname === '/note/' + note.slug}
        <a
          href="/note/{note.slug}"
          class="rounded font-500 text-fg-secondary mb-1 py-2.5 px-3.5 !transform-none block underline-transparent hover:bg-surface"
          class:text-fg={active}
          class:bg-surface={active}
          class:font-600={active}
        >
          {note.title}
        </a>
      {/each}
    </nav>
  </aside>
  <main class="text-fg-secondary w-full max-w-60ch pl-8 overflow-hidden" use:motion={fadeupConfig}>
    <slot />
  </main>
</section>

<!-- Mobile layout -->
<main class="text-fg-secondary md:hidden" use:motion={fadeupConfig}>
  <slot />
</main>

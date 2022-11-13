<script lang="ts">
  import { page } from '$app/stores'
  import { motion } from '$lib/animation/motion'
  import { inview } from 'svelte-inview'

  let border = false
  let pathnames: string[]

  $: pathnames = $page.url.pathname.split('/')

  const fadeInConfig = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.4 },
  }
</script>

{#if $page.url.pathname !== '/'}
  <header
    class="flex font-Azeret bg-bg/60 border-b-border/10 font-450 -mt-2 mt-12 text-sm text-fg-secondary mb-6 py-2 px-4 transition-colors top-0 ease-out z-40 gap-2 duration-500 delay-25 sticky backdrop-blur backdrop-filter md:px-8 lg:px-20"
    class:border-b={border}
    data-sveltekit-prefetch
    use:motion={fadeInConfig}
    use:inview={{ threshold: 0, rootMargin: '0px 0px -100% 0px' }}
    on:change={(e) => {
      const { inView } = e.detail
      inView ? (border = true) : (border = false)
    }}
  >
    {#each pathnames as path, index}
      <a href={index === 0 ? '/' : pathnames.slice(0, index + 1).join('/')}>
        {index === 0 ? 'index' : path}
      </a>
      {#if pathnames.length !== index + 1}
        <span class="opacity-50">/</span>
      {/if}
    {/each}
  </header>
{/if}

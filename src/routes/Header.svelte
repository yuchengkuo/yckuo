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
    class:border-b={border}
    border="b-fg/10"
    bg="bg/60"
    z="40"
    p="y-2 x-4 md:x-8 lg:x-20"
    m="-t-2 t-12 b-6"
    transition="duration-500 delay-25 ease-out colors"
    flex="~"
    font="Azeret 450"
    text="sm fg-secondary"
    gap="2"
    pos="sticky top-0"
    backdrop="~ blur"
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
        <span opacity="50">/</span>
      {/if}
    {/each}
  </header>
{/if}

<script lang="ts">
  import 'virtual:windi.css'
  import 'virtual:windi-devtools'
  import '../styles/app.css'

  import NProgress from 'nprogress'

  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { dev } from '$app/environment'
  import { motion } from '$lib/animation/motion'

  import Header from './Header.svelte'
  import Footer from './Footer.svelte'

  beforeNavigate(() => NProgress.start())
  afterNavigate(() => NProgress.done())

  let transition = true
  const fadeInConfig = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.4 },
  }
  const noTransitionRoutes = ['/note/']
  $: transition = noTransitionRoutes.every((r) => !$page.url.pathname.includes(r))
</script>

<svelte:head>
  {#if !dev}
    <script data-no-cookie async data-api="/_hive" src="/bee.js"></script>
  {/if}
  <script>
    document.documentElement.classList.remove('no-js')
  </script>
</svelte:head>

<Header />

{#key $page.url.pathname}
  <main
    class:pt-12={$page.url.pathname === '/'}
    class:md:pt-20={$page.url.pathname === '/'}
    class="mb-auto opacity-0 px-4 pb-12 no-js:opacity-100 md:(px-8 pb-20) lg:px-20 "
    data-sveltekit-prefetch
    class:opacity-100={!transition}
    use:motion={transition ? fadeInConfig : {}}
  >
    <slot />
  </main>
{/key}

<Footer />


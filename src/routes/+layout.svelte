<script lang="ts">
  import '@unocss/reset/tailwind.css'
  import 'uno.css'
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

  let withTransition = true
  const fadeInConfig = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.4 },
  }
  const noTransitionRoutes = ['/note/']
  $: withTransition = noTransitionRoutes.every((r) => !$page.url.pathname.includes(r))
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
    class="mb-auto px-4 pb-12 no-js:opacity-100 md:(px-8 pb-20) lg:px-20"
    class:opacity-0={withTransition}
    class:opacity-100={!withTransition}
    data-sveltekit-prefetch
    use:motion={withTransition ? fadeInConfig : {}}
  >
    <slot />
  </main>
{/key}

<Footer />


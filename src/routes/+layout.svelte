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
  import Layer from './Layer.svelte'

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
    class="pb-20 no-js:opacity-100"
    class:pt-20={$page.url.pathname === '/'}
    class:opacity-0={withTransition}
    class:opacity-100={!withTransition}
    data-sveltekit-preload
    use:motion={withTransition ? fadeInConfig : {}}
  >
    <slot />
  </main>
{/key}

<nav
  data-sveltekit-preload
  class="max-w-640px mx-auto flex flex-wrap gap-4 font-Azeret font-550 text-sm tracking-tighter"
>
  <a href="/about">About</a>
  <a href="/project">Project</a>
  <a href="/bookmark">Bookmark</a>
  <a href="/listening">Listening</a>
  <a href="/watching">Watching</a>
  <a href="/note">Note</a>
</nav>

<Footer />
<Layer />

<style>
  a {
    --uno: attr;
  }
</style>

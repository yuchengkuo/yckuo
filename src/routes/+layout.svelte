<script lang="ts">
  import '@unocss/reset/tailwind.css'
  import 'uno.css'
  import '../styles/app.css'

  import NProgress from 'nprogress'

  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { dev } from '$app/environment'
  import { motion } from '$lib/animation/motion'
  import Head from '$lib/seo/Head.svelte'
  import useTheme from '$lib/theme/useTheme'

  import Layer from './Layer.svelte'

  import type { Options } from 'motion'

  beforeNavigate(() => NProgress.start())
  afterNavigate(() => NProgress.done())

  let withTransition = true
  const { dark, toggleMode } = useTheme()
  const fadeInConfig: Options = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.4 },
  }
  const noTransitionRoutes = [
    '/note/',
    '/bookmark',
    '/blogroll',
    '/hero',
    '/listening',
    '/watching',
    '/reading',
  ]
  $: withTransition = noTransitionRoutes.every((r) => !$page.url.pathname.includes(r))
</script>

<Head>
  {#if !dev}
    <script data-no-cookie async data-api="/_hive" src="/bee.js"></script>
  {/if}
  <script>
    document.documentElement.classList.remove('no-js')
  </script>
</Head>

<div
  use:motion={{
    initial: { transform: 'matrix(1, 0, 0, 1, 0, 16)' },
    animate: { transform: 'none' },
    transition: { delay: 0.3 },
  }}
>
  {#key $page.url.pathname}
    <main
      class="py-40 no-js:opacity-100 lt-sm:py-10"
      class:opacity-0={withTransition}
      class:opacity-100={!withTransition}
      data-sveltekit-preload-data
      data-sveltekit-preload-code
      use:motion={withTransition ? fadeInConfig : {}}
    >
      <slot />

      <footer class="max-w mt-20 flex justify-between items-baseline">
        <p class="text-xs font-600">YuCheng Kuo</p>
        <button
          on:click={() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
          class="btn-pill text-0.75em">↑ Top</button
        >
        <p class="text-2.5 text-fg-secondary font-500">v3 ©2019–2023</p>
      </footer>
    </main>
  {/key}
</div>

<Layer />

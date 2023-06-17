<script lang="ts">
  import '@unocss/reset/tailwind-compat.css'
  import 'uno.css'
  import '../styles/app.css'

  import NProgress from 'nprogress'

  import { afterNavigate, beforeNavigate, goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { dev } from '$app/environment'
  import { motion } from '$lib/animation/motion'
  import Head from '$lib/seo/Head.svelte'
  import { formatDate } from '$lib/util'
  import useTheme from '$lib/theme/useTheme'

  import Layer from './Layer.svelte'

  import type { Options } from 'motion'
  import type { PageData } from './$types'

  export let data: PageData

  beforeNavigate(({ from, to }) => {
    if (from.url.pathname !== to.url.pathname) NProgress.start()
  })
  afterNavigate(() => NProgress.done())

  function navigate(e: KeyboardEvent) {
    data.routes.forEach(({ kbd, url, group }) => {
      if (e.key === kbd.toString()) goto(url)
      if (group) {
        group.forEach(({ kbd, url }) => {
          if (e.key === kbd.toString()) goto(url, { noScroll: true })
        })
      }
    })
  }

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

<svelte:window on:keydown={navigate} />

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
      class:opacity-0={withTransition}
      class:opacity-100={!withTransition}
      data-sveltekit-preload-data
      data-sveltekit-preload-code
      use:motion={withTransition ? fadeInConfig : {}}
    >
      <slot />

      <footer>
        <p class="font-medium">YuCheng Kuo</p>
        <p class="text-fg-muted">©2019–{new Date(Date.now()).getFullYear()}</p>
        <p class="text-fg-muted mr-auto">
          Upd. <a href="https://github.com/yuchengkuo/yckuo/commit/{data.commit_sha}"
            >{formatDate(data.updated_at)}</a
          >
        </p>
        <button
          on:click={() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
          aria-label="Go to top">Top ↑</button
        >
        <button on:click={toggleMode} aria-label="Toggle theme mode"
          >{#if $dark}On <i class="i-ri-lightbulb-line" />{:else}Off <i
              class="i-ri-lightbulb-fill"
            />{/if}</button
        >
      </footer>
    </main>
  {/key}
</div>

<Layer />

<style>
  main {
    --uno: 'py-40 no-js:opacity-100 lt-sm:py-10';
  }
  footer {
    --uno: 'max-w mt-20 flex gap-2 items-baseline text-xs';
  }
  button,
  a {
    --uno: 'button';
  }
  a::after {
    --uno: 'text-2 align-super';
    content: ' ↗';
  }
  i {
    vertical-align: -1px;
  }
</style>

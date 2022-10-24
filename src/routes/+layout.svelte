<script lang="ts">
  import 'virtual:windi.css'
  import 'virtual:windi-devtools'
  import '../styles/app.css'

  import NProgress from 'nprogress'
  import { Confetti } from 'svelte-confetti'
  import { onMount, setContext } from 'svelte'
  import { inview } from 'svelte-inview'
  import { format } from 'date-fns'
  import zhTW from 'date-fns/locale/zh-TW'
  import Snd from 'snd-lib'

  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { dev } from '$app/environment'
  import { motion } from '$lib/animation/motion'

  beforeNavigate(() => NProgress.start())
  afterNavigate(() => NProgress.done())

  let colorize: boolean
  let theme: 'darken' | 'lighten'
  let showConfetti = false
  let pathnames: string[]
  let border = false
  let present = 'present'

  $: pathnames = $page.url.pathname.split('/')

  const fadeInConfig = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.4 },
  }
  const snd = new Snd()
  setContext('snd', snd)

  onMount(() => {
    colorize = document.documentElement.classList.contains('decolorize')
    theme = document.documentElement.classList.contains('dark') ? 'lighten' : 'darken'

    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    matchMedia.addEventListener('change', (e) => {
      if (localStorage.getItem('theme')) return
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      theme = document.documentElement.classList.contains('dark') ? 'lighten' : 'darken'
    })

    const interval = setInterval(() => {
      present = format(new Date(), 'yyyy 🇹🇼 hh:mm:ss a', { locale: zhTW })
    }, 500)
    return () => clearInterval(interval)
  })

  onMount(async () => {
    await snd.load(Snd.KITS.SND02)
  })

  async function toggleColor() {
    document.documentElement.classList.toggle('decolorize')
    if (colorize) {
      localStorage.removeItem('decolorize')
      snd.play(Snd.SOUNDS.TRANSITION_UP)
    } else {
      localStorage.setItem('decolorize', 'true')
      snd.play(Snd.SOUNDS.TOGGLE_OFF)
    }
    showConfetti = colorize ? true : false
    colorize = !colorize
  }

  async function toggleTheme() {
    if (theme === 'darken') {
      document.documentElement.classList.add('dark')
      snd.play(Snd.SOUNDS.TAP)
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.removeItem('theme')
      } else {
        localStorage.setItem('theme', 'dark')
      }
      theme = 'lighten'
      return
    }
    if (theme === 'lighten') {
      document.documentElement.classList.remove('dark')
      snd.play(Snd.SOUNDS.TYPE)
      if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.removeItem('theme')
      } else {
        localStorage.setItem('theme', 'light')
      }
      theme = 'darken'
      return
    }
  }
</script>

<svelte:head>
  {#if !dev}
    <script data-no-cookie async data-api="/_hive" src="/bee.js"></script>
  {/if}
  <script>
    document.documentElement.classList.remove('no-js')
  </script>
</svelte:head>

{#key $page.url.pathname}
  {#if $page.url.pathname !== '/'}
    <header
      class="flex font-Azeret bg-bg/60 border-b-border/10 font-450 -mt-2 mt-12 text-sm text-fg-secondary mb-6 py-2 px-4 transition-colors top-0 ease-out z-40 gap-2 duration-500 delay-25 sticky backdrop-blur backdrop-filter md:px-8 lg:px-20"
      class:border-b={border}
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
  <main
    class:pt-12={$page.url.pathname === '/'}
    class:md:pt-20={$page.url.pathname === '/'}
    class="mb-auto opacity-0 px-4 pb-12 no-js:opacity-100 md:(px-8 pb-20) lg:px-20 "
    data-sveltekit-prefetch
    use:motion={fadeInConfig}
  >
    <slot />
  </main>
{/key}

<footer
  class="flex flex-wrap font-Azeret mt-40 text-xs text-fg-secondary px-6 pb-4 gap-3 items-baseline justify-between sm:gap-6"
>
  <h4 class="mr-auto font-600 text-base tracking-tight">YuCheng Kuo</h4>
  <button class="text-xs uppercase *attr no-js:hidden" on:click={toggleTheme}>{theme}</button>
  <button class="font-475 uppercase relative *attr no-js:hidden" on:click={toggleColor}
    >{colorize ? 'Colorize' : 'Decolorize'}
    {#if showConfetti}
      <div class="top-1/2 left-1/2 absolute">
        <Confetti
          colorArray={[`rgb(var(--colors-fg))`, `rgb(var(--colors-fg-secondary))`]}
          duration="1500"
        />
      </div>
    {/if}
  </button>
  <p class="font-normal w-full slashed-zero sm:w-auto">v3 (C)2019-{present}</p>
</footer>

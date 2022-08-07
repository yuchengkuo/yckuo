<script lang="ts">
  import 'virtual:windi.css'
  import 'virtual:windi-devtools'
  import '../styles/app.css'

  import NProgress from 'nprogress'
  import { Confetti } from 'svelte-confetti'
  import { onMount } from 'svelte'
  import { inview } from 'svelte-inview'

  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'

  import { fade } from '$lib/animation/keyframes'
  import motion from '$lib/animation'

  beforeNavigate(() => NProgress.start())
  afterNavigate(() => NProgress.done())

  let colorize: boolean
  let theme: 'darken' | 'lighten'
  let showConfetti = false
  let pathnames: string[]
  let border = false

  $: pathnames = $page.url.pathname.split('/')

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
  })

  async function toggleColor() {
    document.documentElement.classList.toggle('decolorize')
    if (colorize) {
      localStorage.removeItem('decolorize')
    } else {
      localStorage.setItem('decolorize', 'true')
    }
    showConfetti = colorize ? true : false
    colorize = !colorize
  }

  async function toggleTheme() {
    if (theme === 'darken') {
      document.documentElement.classList.add('dark')
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

{#key $page}
  <main
    use:motion={{ keyframes: fade, options: { duration: 0.4, delay: 0.4 } }}
    class="h-full mb-auto p-20 phone:(p-6)"
  >
    {#if $page.url.pathname !== '/'}
      <nav
        class="flex font-Azeret bg-bg/80 border-b-border/10 font-450 text-sm text-fg-secondary mb-6 pb-2 top-0 z-40 gap-2 sticky backdrop-blur backdrop-filter"
        class:border-b={border}
        class:pt-2={border}
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
      </nav>
    {/if}

    <slot />
  </main>
{/key}

<footer class="flex mt-40 text-fg-secondary px-6 pb-4 justify-between items-baseline">
  <h3 class="font-600 text-base text-fg-secondary tracking-tight">YuCheng Kuo</h3>
  <div class="flex font-Azeret text-xs gap-6">
    <p class="slashed-zero">(C)2019-present</p>
    <button class="text-xs uppercase *attr" on:click={toggleTheme}>{theme}</button>
    <button class="font-475 uppercase relative *attr" on:click={toggleColor}
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
    <a href="/" class="uppercase">Changelog</a>
  </div>
</footer>

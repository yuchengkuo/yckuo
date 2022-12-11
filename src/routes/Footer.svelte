<script lang="ts">
  import Snd from 'snd-lib'
  import { onMount } from 'svelte'
  import { Confetti } from 'svelte-confetti'

  import tooltip from '$lib/tooltip/tooltip'

  let colorize: boolean
  let theme: 'darken' | 'lighten'
  let showConfetti = false
  let snd: Snd

  /** onMount init */
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

  onMount(async () => {
    snd = new Snd()
    await snd.load(Snd.KITS.SND02)
  })

  /** Toggle color scheme */
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

  /** Toggle light/dark mode */
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

<footer
  class="max-w-640px mx-auto flex flex-wrap items-baseline justify-between border-t border-border"
  text="xs fg-secondary"
  gap="3 sm:6"
  p="t-20 b-20 md:b-40"
  m="t-20"
>
  <p class="font-675 text-base tracking-tight flex-grow">YuCheng Kuo</p>
  <button
    class="text-xs uppercase attr no-js:hidden"
    on:click={toggleTheme}
    use:tooltip={{ content: theme === 'lighten' ? 'Toggle light theme' : 'Toggle dark theme' }}
    data-splitbee-event="Toogle Theme">{theme}</button
  >
  <button
    class="font-475 uppercase relative attr no-js:hidden"
    on:click={toggleColor}
    use:tooltip={{ content: colorize ? 'Tune up the colors' : 'Tune down the colors' }}
    data-splitbee-event="Toggle Color"
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
  <p class="font-Azeret font-475 tracking-tighter slashed-zero">v3 (C)2019-2022</p>
</footer>

<style>
  button {
    --uno: font-Azeret;
  }
  p ~ p {
    font-feature-settings: 'calt' on;
  }
</style>

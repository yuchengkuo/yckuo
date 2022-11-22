<script lang="ts">
  import { intlFormat } from 'date-fns'
  import Snd from 'snd-lib'
  import { onMount } from 'svelte'
  import { Confetti } from 'svelte-confetti'

  import tooltip from '$lib/tooltip/tooltip'

  let colorize: boolean
  let theme: 'darken' | 'lighten'
  let showConfetti = false
  let present = 'present'
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

    const interval = setInterval(() => {
      present = intlFormat(new Date(), {
        year: 'numeric',
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Asia/Taipei',
      })
    }, 500)
    return () => clearInterval(interval)
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
  class="flex flex-wrap items-baseline justify-between"
  font="Azeret"
  text="xs fg-secondary"
  gap="3 sm:6"
  p="x-6 b-4"
  m="t-20 md:t-40"
>
  <p class="font-Uncut mr-auto font-650 text-base tracking-tight">YuCheng Kuo</p>
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
  <p class="font-normal w-full slashed-zero sm:w-auto">v3 (C)2019-{present}</p>
</footer>

import Snd from 'snd-lib'
import { onMount } from 'svelte'
import { get, writable } from 'svelte/store'

export type ThemeNames =
  | 'default'
  | 'about'
  | 'project'
  | 'project_id'
  | 'note'
  | 'bookmark'
  | 'listening'
  | 'watching'

const colorized = writable<boolean>()
const dark = writable<boolean>()
const theme = writable<ThemeNames>()
let snd: Snd

export default function useTheme() {
  /** onMount init */
  onMount(() => {
    colorized.set(!document.documentElement.classList.contains('decolorize'))
    dark.set(document.documentElement.classList.contains('dark'))
    theme.set((document.documentElement.getAttribute('data-theme') as ThemeNames) || 'default')

    /** Listener for prefer-color-scheme change */
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    const mediaCallback = function (e: MediaQueryListEvent) {
      /** If preference found, return */
      if (localStorage.getItem('theme')) return
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      dark.set(document.documentElement.classList.contains('dark'))
    }
    matchMedia.addEventListener('change', mediaCallback)

    /** todo: Listener for localstorage change */
    const storageCallback = function (e: StorageEvent) {
      console.log(e)
    }
    window.addEventListener('storage', storageCallback)

    /** Observer for data-theme change */
    const mutationCallback: MutationCallback = function (list) {
      for (const mutation of list) {
        if (mutation.attributeName === 'data-theme')
          theme.set(document.documentElement.getAttribute('data-theme') as ThemeNames)
      }
    }
    const observer = new MutationObserver(mutationCallback)
    observer.observe(document.documentElement, {
      attributeFilter: ['data-theme'],
    })

    return () => {
      window.removeEventListener('storage', storageCallback)
      matchMedia.removeEventListener('change', mediaCallback)
      observer.disconnect()
    }
  })

  onMount(async () => {
    snd = new Snd()
    await snd.load(Snd.KITS.SND02)
  })

  return {
    theme,
    colorized,
    dark,
    toggleColor,
    toggleMode,
    setTheme,
  }
}

/** Toggle theme color */
async function toggleColor() {
  document.documentElement.classList.toggle('decolorize')

  const tuneDown = get(colorized)
  if (tuneDown) {
    localStorage.setItem('decolorize', 'true')
    snd.play(Snd.SOUNDS.TRANSITION_UP)
  } else {
    localStorage.removeItem('decolorize')
    snd.play(Snd.SOUNDS.TOGGLE_OFF)
  }
  colorized.update((prev) => !prev)
}

/** Toggle light/dark mode */
async function toggleMode() {
  /** If it currently is in Dark Mode */
  const lightOn = get(dark)
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

  if (lightOn) {
    document.documentElement.classList.remove('dark')

    /** If the destined mode aligns with system, make it default  */
    if (!matchMedia.matches) localStorage.removeItem('theme')
    else localStorage.setItem('theme', 'light')

    snd.play(Snd.SOUNDS.TYPE)
  } else {
    document.documentElement.classList.add('dark')

    /** If the destined mode aligns with system mode, make it default  */
    if (matchMedia.matches) localStorage.removeItem('theme')
    else localStorage.setItem('theme', 'dark')

    snd.play(Snd.SOUNDS.TAP)
  }

  dark.update((prev) => !prev)
}

/** Set color theme */
function setTheme(theme: ThemeNames) {
  document.documentElement.setAttribute('data-theme', theme)
}

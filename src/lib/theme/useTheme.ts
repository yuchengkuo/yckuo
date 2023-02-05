import Snd from 'snd-lib'
import { onMount } from 'svelte'
import { get, writable } from 'svelte/store'

const dark = writable<boolean>()
let snd: Snd

export default function useTheme() {
  /** onMount init */
  onMount(() => {
    dark.set(document.documentElement.classList.contains('dark-theme'))

    /** Listener for prefer-color-scheme change */
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    const mediaCallback = function (e: MediaQueryListEvent) {
      /** If preference found, return */
      if (localStorage.getItem('theme')) return
      if (e.matches) {
        document.documentElement.classList.add('dark-theme')
      } else {
        document.documentElement.classList.remove('dark-theme')
      }
      dark.set(document.documentElement.classList.contains('dark-theme'))
    }
    matchMedia.addEventListener('change', mediaCallback)

    /** todo: Listener for localstorage change */
    const storageCallback = function (e: StorageEvent) {
      console.log(e)
    }
    window.addEventListener('storage', storageCallback)

    return () => {
      window.removeEventListener('storage', storageCallback)
      matchMedia.removeEventListener('change', mediaCallback)
    }
  })

  onMount(async () => {
    snd = new Snd()
    await snd.load(Snd.KITS.SND02)
  })

  return {
    dark,
    toggleMode,
  }
}

/** Toggle light/dark mode */
async function toggleMode() {
  /** If it currently is in Dark Mode */
  const lightOn = get(dark)
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

  if (lightOn) {
    document.documentElement.classList.remove('dark-theme')

    /** If the destined mode aligns with system, make it default  */
    if (!matchMedia.matches) localStorage.removeItem('theme')
    else localStorage.setItem('theme', 'light')

    snd.play(Snd.SOUNDS.TYPE)
  } else {
    document.documentElement.classList.add('dark-theme')

    /** If the destined mode aligns with system mode, make it default  */
    if (matchMedia.matches) localStorage.removeItem('theme')
    else localStorage.setItem('theme', 'dark')

    snd.play(Snd.SOUNDS.TAP)
  }

  dark.update((prev) => !prev)
}

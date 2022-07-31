<script lang="ts">
  import 'virtual:windi.css'
  import '../styles/app.css'

  import NProgress from 'nprogress'
  import { onMount } from 'svelte'

  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'

  import { fade } from '$lib/animation/keyframes'
  import motion from '$lib/animation'

  beforeNavigate(() => NProgress.start())
  afterNavigate(() => NProgress.done())

  let colorize: boolean
  onMount(() => {
    colorize = document.documentElement.classList.contains('decolorize')
  })

  function toogleColor() {
    document.documentElement.classList.toggle('decolorize')
    if (colorize) {
      localStorage.removeItem('decolorize')
    } else {
      localStorage.setItem('decolorize', 'true')
    }
    colorize = !colorize
  }
</script>

{#key $page}
  <main
    use:motion={{ keyframes: fade, options: { duration: 0.4, delay: 0.4 } }}
    class="h-full mb-auto p-20"
  >
    {#if $page.url.pathname !== '/'}
      <button
        class="font-Azeret font-450 text-sm text-fg-secondary mb-8 *attr"
        on:click={() => window.history.back()}
      >
        ←·Back
      </button>
    {/if}

    <slot />
  </main>
{/key}

<footer class="flex mt-40 text-fg-secondary px-6 pb-4 justify-between items-baseline">
  <h3 class="font-600 text-base text-fg-secondary tracking-tight">YuCheng Kuo</h3>
  <div class="flex font-Azeret text-xs gap-6">
    <p class="slashed-zero">(C)2019-present</p>
    <button class="font-475 uppercase *attr" on:click={toogleColor}
      >{colorize ? 'Colorize' : 'Decolorize'}</button
    >
    <a href="/" class="uppercase">Changelog</a>
  </div>
</footer>

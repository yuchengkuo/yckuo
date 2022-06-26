<script lang="ts">
  import 'virtual:windi.css'
  import '../styles/app.css'

  import NProgress from 'nprogress'

  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'

  import { fade } from '$lib/animation/keyframes'
  import motion from '$lib/animation'

  beforeNavigate(() => NProgress.start())
  afterNavigate(() => NProgress.done())
</script>

{#key $page}
  <main use:motion={{ keyframes: fade, options: { duration: 0.4 } }} class="h-full mb-auto p-20">
    {#if $page.url.pathname !== '/'}
      <a class="mb-10" href="/">← Go back</a>
    {/if}

    <slot />
  </main>
{/key}

<footer class="flex px-20 pb-10 justify-between items-baseline">
  <div>
    <h3 class="font-650">YuCheng Kuo</h3>
    <p class="font-Azeret mt-1 text-xs">(C)2022</p>
  </div>
  <nav class="flex gap-12" />
</footer>

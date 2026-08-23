<script lang="ts">
  // Island 2 of the two-island split, and the island motion criterion (ii) lives in:
  // the scramble interval must survive navigation. Markup and $effect verbatim from
  // +layout.svelte:26-34, 89-131; the link data arrives as props instead of from
  // +layout.server.ts. 07 measured 20 navigations -> 1 mount, 1 setup, 0 cleanups.
  import Time from '$lib/view/Current/Time.svelte'
  import Year from '$lib/view/Current/Year.svelte'
  import { scramble } from '$lib/action/scramble/scramble.svelte'
  import { glitch } from '$lib/action/scramble/param'
  import type { NavLink } from '$lib/navigation'

  let { navigation, contact }: { navigation: NavLink[]; contact: NavLink[] } = $props()

  let footerName: HTMLSpanElement | null = $state(null)

  $effect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        footerName?.scramble?.()
      }, Math.random() * 3000)
    }, 3000)

    return () => clearInterval(timer)
  })
</script>

<footer class="layout-content mt-30 grid-subgrid font-sans text-sm">
  <hr class="border-dash span-full" />

  <ul class="span-full md:span-3 flex flex-col gap-1.5 lt-md:gap-1">
    {#each navigation as nav}
      <li><a href={nav.url}>{nav.label}</a></li>
    {/each}

    <li class="my-8">
      <a href="/resume">Resume</a>
      <span class="text-tertiary font-mono text-xs">[.pdf] [48kb]</span>
    </li>
  </ul>

  <ul class="span-full md:span-3 flex flex-col gap-1.5 mb-8 lt-md:gap-1">
    {#each contact as c}
      <li>
        <a href={c.url}>{c.label}</a>
        <span class="text-tertiary font-mono text-xs ml-1">{c.key}</span>
      </li>
    {/each}
  </ul>

  <div class="span-full">
    <p class="font-medium">
      <span class="i-custom-logo size-3 align--2%" role="presentation"></span>
      <span
        bind:this={footerName}
        use:scramble={{
          text: 'YuCheng Kuo',
          step: 'YuCheng Kuo'.length,
          ...glitch
        }}>YuCheng Kuo</span
      >
    </p>
    <div class="flex justify-between font-mono text-xs mt-1">
      <p class="text-tertiary">©<Year /></p>
      <p class="text-right">GMT+8 <Time /></p>
    </div>
  </div>
</footer>

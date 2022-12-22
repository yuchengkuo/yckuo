<script lang="ts">
  import clickOutside from '$lib/action/clickoutside'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import portal from '$lib/action/portal/action'

  let menu = false

  const list = [
    { label: 'Duplicate', icon: 'i-bxs-duplicate' },
    { label: 'Rename', icon: 'i-bxs-rename' },
    { label: 'Delete', icon: 'i-bxs-trash' },
  ]
</script>

<div data-portal-root class="relative">
  <button
    class="pl-4 pr-3 py-1 bg-surface rounded-lg transition"
    hover="bg-fg-secondary/10"
    on:click={() => (menu = true)}
  >
    More<svg class="i-ri-arrow-down-s-fill align-mid" />
  </button>

  {#if menu}
    <div
      class="absolute rounded-lg p-1 shadow-xl bg-surface top-120% right-0 min-w-40 flex flex-col"
      children="px-2 py-2.5 text-sm text-left whitespace-nowrap leading-none"
      out:outro
      use:portal={document.querySelector('data-portal-root')}
      use:clickOutside={() => (menu = false)}
      use:motion={{
        initial: { y: -16, scale: 0.9, opacity: 0 },
        animate: { y: 0, scale: 1, opacity: 1 },
        exit: { y: -16, scale: 0.9, opacity: 0 },
      }}
    >
      {#each list as item}
        <button class="transition" hover="bg-fg/8 rounded-md"
          ><span class="{item.icon} align-top mr-2 text-fg-secondary" />{item.label}</button
        >
      {/each}
    </div>
  {/if}
</div>

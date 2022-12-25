<script lang="ts">
  import clickOutside from '$lib/action/clickoutside'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import portal from '$lib/action/portal/action'
  import placePopover from '$lib/action/placePopover'

  let menuOpen = false
  let focusIndex = -1

  let trigger: HTMLElement

  const items = [
    { label: 'Duplicate', icon: 'i-bxs-duplicate' },
    { label: 'Rename', icon: 'i-bxs-rename' },
    { label: 'Delete', icon: 'i-bxs-trash' },
  ]

  function onClose(e: Event) {
    if (!trigger.contains(e.target as HTMLElement)) menuOpen = false
  }
</script>

<button
  class="pl-4 pr-3 py-1 bg-surface rounded-lg transition"
  hover="bg-fg-secondary/10"
  focus="bg-fg-secondary/10 ring-1 ring-border"
  aria-haspopup="menu"
  aria-expanded={menuOpen}
  bind:this={trigger}
  on:click={() => (menuOpen = !menuOpen)}
>
  More<span class="i-ri-arrow-down-s-fill align-mid" />
</button>

{#if menuOpen}
  <div
    class="flex flex-col rounded-lg p-1 shadow-xl bg-surface min-w-40"
    children="px-2 py-2.5 text-sm text-left whitespace-nowrap leading-none"
    role="menu"
    out:outro|local
    use:portal
    use:placePopover={{ trigger, alignment: 'end' }}
    use:clickOutside={onClose}
    use:motion={{
      initial: { y: -16, scale: 0.9, opacity: 0 },
      animate: { y: 0, scale: 1, opacity: 1 },
      exit: { y: -16, scale: 0.9, opacity: 0 },
    }}
  >
    {#each items as item}
      <button class="transition" hover="bg-fg/8 rounded-md"
        ><span class="{item.icon} align-top mr-2 text-fg-secondary" />{item.label}</button
      >
    {/each}
  </div>
{/if}

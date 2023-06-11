<script context="module">
  export const meta = {
    title: 'Simple Dropdown Menu',
    date: '2022/12/11',
  }
</script>

<script lang="ts">
  import { tick } from 'svelte'
  import { clamp } from 'popmotion'

  import clickOutside from '$lib/action/clickoutside'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import portal from '$lib/action/portal/action'
  import placePopover from '$lib/action/placePopover'

  let menuOpen = false
  let highlighted = -1

  let trigger: HTMLElement

  const items = [
    { label: 'Duplicate', icon: 'i-bxs-duplicate', destructive: false },
    { label: 'Rename', icon: 'i-bxs-rename', destructive: false },
    { label: 'Delete', icon: 'i-bxs-trash', destructive: true },
  ]

  function onClose(e: Event) {
    if (!trigger.contains(e.target as HTMLElement)) {
      menuOpen = false
      highlighted = -1
    }
  }

  async function onSelect() {
    menuOpen = false
    highlighted = -1
    await tick()
    trigger.focus()
  }

  async function onKeydown(e: KeyboardEvent) {
    if (document.activeElement === trigger && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      e.preventDefault()
      if (!menuOpen) menuOpen = true
    }
    await tick()

    if (menuOpen) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          highlighted++
          break

        case 'ArrowUp':
          e.preventDefault()
          highlighted--
          break

        case 'Escape':
          onSelect()
          break
      }

      highlighted = clamp(0, items.length - 1, highlighted)
      await tick()
      ;(document.querySelector('[role="menu"] [data-highlighted]') as HTMLElement)?.focus()
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

<button
  aria-haspopup="menu"
  aria-expanded={menuOpen}
  bind:this={trigger}
  on:click={() => (menuOpen = !menuOpen)}
>
  More<span class="i-ri-arrow-down-s-fill" />
</button>

{#if menuOpen}
  <div
    role="menu"
    out:outro
    use:portal
    use:placePopover={{ trigger, alignment: 'end' }}
    use:clickOutside={onClose}
    use:motion={{
      initial: { transform: 'translateY(-8px) scale(0.95)', opacity: 0 },
      animate: { transform: 'none', opacity: 1 },
      exit: { transform: 'translateY(-8px) scale(0.95)', opacity: 0 },
      transition: { duration: 0.3, allowWebkitAcceleration: true },
    }}
  >
    {#each items as item, index}
      <button
        role="menuitem"
        class:destructive={item.destructive}
        data-highlighted={highlighted === index ? '' : null}
        tabindex={highlighted === index ? 0 : -1}
        on:click={onSelect}
        on:mouseenter={() => (highlighted = index)}
        ><span class="{item.icon} mr-2 transition text-fg-muted" />{item.label}</button
      >
    {/each}
  </div>
{/if}

<style>
  button[aria-haspopup='menu'] {
    --uno: 'my-24 pl-4 pr-3 py-1 bg-rx-gray-3 rounded-lg transition outline-none focus-visible:bg-rx-gray-5';
    --uno: 'hover:bg-rx-gray-5';
  }

  div[role='menu'] {
    --uno: 'flex flex-col rounded-lg p-1 shadow-xl bg-rx-gray-2 min-w-40';
  }

  button[role='menuitem'] {
    --uno: 'px-2 py-2.5 text-sm text-left whitespace-nowrap leading-none';
    --uno: 'transition outline-none rounded-md font-500';
  }

  [data-highlighted] {
    --uno: 'bg-rx-gray-5 rounded-md';
  }

  [data-highlighted].destructive {
    --uno: 'text-rx-red-9 children:text-rx-red-9 focus-visible:(text-rx-red-9 children:text-rx-red-9)';
  }
</style>

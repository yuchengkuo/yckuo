<script lang="ts">
  import clickOutside from '$lib/action/clickoutside'
  import placePopover from '$lib/action/placePopover'
  import portal from '$lib/action/portal/action'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import { clamp } from 'popmotion'
  import { tick } from 'svelte'

  let menuOpen = false
  let trigger: HTMLElement
  let left = 0
  let top = 0
  let highlighted = -1

  const items = [
    { label: 'Back' },
    { label: 'Forward' },
    { label: 'Reload' },
    { label: 'Reorder' },
    { label: 'Exit' },
  ]

  async function onClose(e: Event) {
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
    await tick()

    if (menuOpen) {
      if (e.key === 'Enter') return

      e.preventDefault()
      if (e.key === 'ArrowDown') highlighted++
      if (e.key === 'ArrowUp') highlighted--
      if (e.key === 'Escape') onSelect()

      highlighted = clamp(0, items.length - 1, highlighted)
      await tick()
      ;(document.querySelector('[role="menu"] [data-highlighted]') as HTMLElement)?.focus()
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div
  class="w-1/2 h-1/3 bg-surface text-fg-secondary text-xs border-2 border-border border-dashed rounded-xl grid place-items-center"
  aria-haspopup="menu"
  aria-expanded={menuOpen}
  bind:this={trigger}
  on:contextmenu|preventDefault={() => {}}
  on:pointerdown={(e) => {
    if (e.buttons === 2 || (e.button === 0 && e.ctrlKey === true)) {
      ;({ clientX: left, clientY: top } = e)
      menuOpen = true
    }
  }}
>
  Right click.
</div>

{#if menuOpen}
  <div
    class="min-w-48 min-h-20 bg-surface backdrop-blur-lg border-1 border-fg-secondary/10 rounded-lg shadow-lg p-1"
    role="menu"
    use:placePopover={{ left, top }}
    use:portal
    use:clickOutside={onClose}
    out:outro
    use:motion={{
      initial: { transform: 'translateY(2px)', opacity: 0 },
      animate: { transform: 'none', opacity: 1 },
      exit: { transform: 'translateY(2px)', opacity: 0 },
    }}
  >
    <ul>
      {#each items as item, index}
        <li>
          <button
            class="px-4 py-1 w-full text-left rounded-md text-sm"
            hover="bg-fg text-bg"
            focus="outline-none"
            data-highlighted={highlighted === index ? '' : null}
            tabindex={highlighted === index ? 0 : -1}
            on:click={onSelect}>{item.label}</button
          >
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  [data-highlighted] {
    --uno: bg-fg text-bg;
  }
</style>

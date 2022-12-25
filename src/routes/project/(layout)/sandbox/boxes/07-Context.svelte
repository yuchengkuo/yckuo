<script lang="ts">
  import clickOutside from '$lib/action/clickoutside'
  import placePopover from '$lib/action/placePopover'
  import portal from '$lib/action/portal/action'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'

  let menuOpen = false
  let trigger: HTMLElement
  let left = 0
  let top = 0

  async function onClose(e: Event) {
    if (!trigger.contains(e.target as HTMLElement)) menuOpen = false
  }

  const items = [
    { label: 'Back' },
    { label: 'Forward' },
    { label: 'Reload' },
    { label: 'Reorder' },
    { label: 'Exit' },
  ]
</script>

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
      {#each items as item}
        <li>
          <button class="px-4 py-1 w-full text-left rounded-md text-sm" hover="bg-fg text-bg"
            >{item.label}</button
          >
        </li>
      {/each}
    </ul>
  </div>
{/if}

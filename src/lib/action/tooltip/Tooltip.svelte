<svelte:options accessors={true} />

<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import { afterUpdate } from 'svelte'

  export let content: string
  export let trigger: HTMLElement
  export let offset = 12
  export let direction: 'top' | 'bottom' = 'top'

  let tooltip: HTMLElement

  let windowWidth: number
  let windowHeight: number

  let left: number
  let top: number

  afterUpdate(() => {
    if (tooltip) {
      const triggerRect = trigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      const outputLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      const maxLeft = window.innerWidth - tooltipRect.width - 2
      const placeTop = direction === 'top'

      left = Math.min(Math.max(2, outputLeft), maxLeft) + window.scrollX
      top = placeTop
        ? triggerRect.top - tooltipRect.height - offset + window.scrollY
        : triggerRect.bottom + offset + window.scrollY
    }
  })
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#key content}
  {#if content}
    <tooltip
      bind:this={tooltip}
      use:motion={{
        initial: {
          transform: 'translateY(2px) rotateX(1deg)',
          filter: 'blur(1px)',
          opacity: 0,
        },
        animate: { transform: 'none', opacity: 1, filter: 'none' },
        transition: { delay: 0.05, duration: 0.3, allowWebkitAcceleration: true },
      }}
      class="block rounded font-Uncut text-xs font-700 leading-none bg-fg-secondary/90 text-bg shadow-lg w-max h-fit py-2 px-2.5 absolute z-99 pointer-events-none backdrop-blur border-1 border-fg-secondary/50"
      style="left: {left}px; top: {top}px;"
    >
      {content}
    </tooltip>
  {/if}
{/key}

<style>
  tooltip {
    text-transform: none;
  }
</style>

<svelte:options accessors={true} />

<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import { afterUpdate } from 'svelte'

  export let content: string
  export let trigger: HTMLElement

  let tooltip: HTMLElement

  let windowWidth: number
  let windowHeight: number

  let left: number
  let top: number

  afterUpdate(() => {
    const triggerRect = trigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()
    const outputLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
    const maxLeft = window.innerWidth - tooltipRect.width - 2
    left = Math.min(Math.max(2, outputLeft), maxLeft) + window.scrollX
    top = triggerRect.top - tooltipRect.height - 12 + window.scrollY
  })
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#key content}
  <tooltip
    bind:this={tooltip}
    use:motion={{
      initial: {
        transform: 'translateY(4px) rotateX(2deg)',
        opacity: 0,
      },
      animate: { transform: 'none', opacity: 1 },
      transition: { delay: 0.1, duration: 0.4, allowWebkitAcceleration: true },
    }}
    class="block rounded font-Uncut text-xs font-700 leading-none bg-fg-secondary/90 text-bg shadow-lg w-max h-fit py-2 px-2.5 absolute z-99 pointer-events-none backdrop-blur"
    style="left: {left}px; top: {top}px;"
  >
    {content}
  </tooltip>
{/key}

<style>
  tooltip {
    text-transform: none;
  }
</style>

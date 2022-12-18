<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import { spring } from 'motion'

  const tabs = [
    { label: 'Overview', active: true },
    { label: 'Profile', active: false },
    { label: 'Setting', active: false },
  ]
  const widths: number[] = []

  let activeIndex = 0
  let leftOffset = 0

  $: {
    activeIndex = tabs.findIndex((t) => t.active)
    leftOffset = widths.slice(0, activeIndex).reduce((prev, curr) => prev + curr, 0)
  }
</script>

<div>
  <div
    class="py-1.5 flex rounded relative"
    children="font-500 px-2.5 py-1 rounded hover:bg-surface transition duration-300"
  >
    {#each tabs as tab, index}
      <button
        bind:clientWidth={widths[index]}
        on:click={() => {
          tabs.find((t) => t.active).active = false
          tabs[index].active = true
        }}
        class:font-575={index === activeIndex}
        class:text-fg-secondary={index !== activeIndex}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div role="presentation" class="bg-gray-300 h-0.5 w-full rounded relative" dark="bg-gray-600">
    <div
      class="absolute bg-orange-600 h-full rounded"
      dark="bg-blue"
      use:motion={{
        animate: { width: `${widths[activeIndex]}px`, left: `${leftOffset}px` },
        transition: { easing: spring({ damping: 40, stiffness: 600 }) },
      }}
    />
  </div>
</div>

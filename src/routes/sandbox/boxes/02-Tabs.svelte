<script context="module">
  export const meta = {
    title: 'Simple Tabs',
    date: '2022/11/27',
  }
</script>

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

<nav class="my-40">
  <ul>
    {#each tabs as tab, index}
      <button
        bind:clientWidth={widths[index]}
        on:click={() => {
          tabs.find((t) => t.active).active = false
          tabs[index].active = true
        }}
        class:active={index === activeIndex}
        role="tab"
        aria-label={tab.label}
        aria-selected={index === activeIndex}
        tabIndex={index === activeIndex ? 0 : -1}
      >
        {tab.label}
      </button>
    {/each}
  </ul>
  <div role="presentation">
    <div
      data-indicator
      use:motion={{
        animate: { width: `${widths[activeIndex]}px`, left: `${leftOffset}px` },
        transition: { easing: spring({ damping: 40, stiffness: 600 }) },
      }}
    />
  </div>
</nav>

<style>
  ul {
    --uno: 'py-1.5 flex rounded relative';
  }
  button {
    --uno: 'text-fg-muted block font-medium px-2.5 py-1 rounded transition duration-300';
    --uno: 'hover:bg-rx-gray3 active:bg-rx-gray2';
  }
  button.active {
    --uno: 'font-semibold text-fg';
  }

  div[role='presentation'] {
    --uno: 'bg-rx-gray-6 h-0.5 w-full rounded relative';
  }
  div[data-indicator] {
    --uno: 'absolute bg-rx-orange-9 h-full rounded';
  }
</style>

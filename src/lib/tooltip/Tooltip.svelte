<svelte:options accessors={true} />

<script lang="ts">
  import { motion } from '$lib/animation/motion'

  export let content: string

  let tooltip: HTMLElement
</script>

{#key content}
  <tooltip
    bind:this={tooltip}
    use:motion={{
      initial: {
        transform: 'translateX(-50%) translateY(4px) rotateZ(-1deg) rotateX(20deg)',
        opacity: 0,
        bottom: '140%',
      },
      animate: { transform: `translateX(-50%)`, opacity: 1, bottom: '140%' },
      transition: { delay: 0.1 },
    }}
    class="rounded font-Azeret bg-fg-secondary/90 font-600 shadow-lg text-bg tracking-tight w-max py-2 px-3 left-1/2 text-0.7rem leading-3 z-99 backdrop-filter block absolute pointer-events-none backdrop-blur"
  >
    {content}
  </tooltip>
{/key}

<style>
  tooltip {
    text-transform: none;
  }
</style>

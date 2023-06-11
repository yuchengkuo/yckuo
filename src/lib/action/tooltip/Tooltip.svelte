<svelte:options accessors={true} />

<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import placePopover from '../placePopover'

  export let content: string
  export let trigger: HTMLElement
  export let offset = 12
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top'
  export let alignment: 'start' | 'end' | 'center' = 'center'

  let tooltip: HTMLElement
</script>

{#key content}
  {#if content}
    <tooltip
      class="z-99 pointer-events-none"
      bind:this={tooltip}
      use:placePopover={{ trigger, offset, placement, alignment }}
    >
      <span
        class="block relative rounded font-Uncut text-xs font-700 leading-none bg-surface/30 shadow-lg w-max h-fit py-2 px-2.5 backdrop-blur border border-border-muted"
        use:motion={{
          initial: { transform: 'translateY(2px) rotateX(1deg)', filter: 'blur(1px)', opacity: 0 },
          animate: { transform: 'none', opacity: 1, filter: 'none' },
          transition: { delay: 0.05, duration: 0.3, allowWebkitAcceleration: true },
        }}>{content}</span
      >
    </tooltip>
  {/if}
{/key}

<style>
  tooltip {
    text-transform: none;
  }
</style>

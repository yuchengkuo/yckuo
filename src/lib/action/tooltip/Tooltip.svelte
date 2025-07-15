<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import placePopover from '../placePopover'

  interface Props {
    content: string
    trigger: HTMLElement
    offset?: number
    placement?: 'top' | 'bottom' | 'left' | 'right'
    alignment?: 'start' | 'end' | 'center'
  }

  let { content, trigger, offset = 12, placement = 'top', alignment = 'center' }: Props = $props()

  let tooltip: HTMLElement | undefined = $state()

  export { content, trigger, offset, placement, alignment }
</script>

{#key content}
  {#if content}
    <tooltip bind:this={tooltip} use:placePopover={{ trigger, offset, placement, alignment }}>
      <div
        use:motion={{
          initial: { transform: 'translateY(2px) rotateX(1deg)', filter: 'blur(1px)', opacity: 0 },
          animate: { transform: 'none', opacity: 1, filter: 'none' },
          transition: { delay: 0.05, duration: 0.3, allowWebkitAcceleration: true }
        }}
      >
        {content}
      </div>
    </tooltip>
  {/if}
{/key}

<style>
  tooltip {
    --uno: 'z-99 pointer-events-none';
    text-transform: none;
  }
  div {
    --uno: 'block rounded text-xs font-700 leading-none bg-surface/50 shadow-lg w-max h-fit py-2 px-2.5 backdrop-blur-lg border border-border-muted';
  }
</style>

<script context="module">
  export const meta = {
    title: 'Reactions',
    date: '2022/12/25',
  }
</script>

<script lang="ts">
  import clickOutside from '$lib/action/clickoutside'
  import placePopover from '$lib/action/placePopover'
  import portal from '$lib/action/portal/action'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'

  let popoverOpen = false
  let trigger: HTMLElement
  let reacted = false

  $: reacted = reactions.some((r) => r.count)

  function onClose(e: Event) {
    if (!trigger.contains(e.target as HTMLElement)) popoverOpen = false
  }

  const reactions = [
    { emoji: '👍', count: 0 },
    { emoji: '👀', count: 0 },
    { emoji: '✅', count: 0 },
    { emoji: '🙌', count: 0 },
    { emoji: '🙏', count: 0 },
  ]
</script>

<div>
  <button
    aria-haspopup="menu"
    aria-expanded={popoverOpen}
    bind:this={trigger}
    on:click={() => (popoverOpen = !popoverOpen)}><span class="i-ri-emotion-line size-5" /></button
  >

  {#if reacted}
    {@const filtered = reactions.filter((r) => r.count)}
    {#each filtered as reaction}
      <button data-reaction on:click={() => reaction.count--}
        >{reaction.emoji}<span class="inline-block ml-1.5 leading-none text-sm"
          >{reaction.count}</span
        ></button
      >
    {/each}
  {/if}
</div>

{#if popoverOpen}
  <div
    role="menu"
    out:outro|local
    use:portal
    use:placePopover={{ trigger, placement: 'top' }}
    use:clickOutside={onClose}
    use:motion={{
      initial: { opacity: 0, transform: 'scale(0.94) translateY(2px)' },
      animate: { opacity: 1, transform: 'none' },
      exit: { opacity: 0, transform: 'scale(0.94)' },
      transition: { duration: 0.2 },
    }}
  >
    {#each reactions as reaction}
      <button
        role="menuitem"
        on:click={() => {
          popoverOpen = false
          reaction.count++
        }}>{reaction.emoji}</button
      >
    {/each}
  </div>
{/if}

<style>
  div:not([role='menu']) {
    --uno: 'my-16 flex gap-1 items-center';
  }
  button[aria-haspopup='menu'],
  button[data-reaction] {
    --uno: 'bg-rx-gray-1 leading-0 rounded-full text-fg-muted border-1 border-rx-gray-6 hover:bg-rx-gray-4';
  }
  button[aria-haspopup='menu'] {
    --uno: 'p-1';
  }
  button[data-reaction] {
    --uno: 'h-7.5 px-2.5';
  }
  div[role='menu'] {
    --uno: 'p-1 bg-rx-gray-2 border-1 border-rx-gray-5 rounded-md shadow-md';
  }
  button[role='menuitem'] {
    --uno: 'inline-block w-8 h-8 rounded hover:bg-rx-gray-5';
  }
</style>

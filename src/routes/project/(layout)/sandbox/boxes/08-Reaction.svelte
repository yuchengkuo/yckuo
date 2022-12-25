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

<div class="flex gap-1 items-center">
  <button
    class="p-1"
    aria-haspopup="menu"
    aria-expanded={popoverOpen}
    bind:this={trigger}
    on:click={() => (popoverOpen = !popoverOpen)}><span class="i-ri-emotion-line w-5 h-5" /></button
  >

  {#if reacted}
    {@const filtered = reactions.filter((r) => r.count)}
    {#each filtered as reaction}
      <button class="h-7.5 px-2.5" on:click={() => reaction.count--}
        >{reaction.emoji}<span class="inline-block ml-1.5 leading-none text-sm"
          >{reaction.count}</span
        ></button
      >
    {/each}
  {/if}
</div>

{#if popoverOpen}
  <div
    class="p-1 bg-light-300 border-1 border-light-800 rounded-md shadow-md"
    dark="bg-dark-300 border-dark-800"
    children="inline-block w-8 h-8 rounded hover:bg-light-800 dark:hover:bg-dark-100"
    role="menu"
    out:outro|local
    use:portal
    use:placePopover={{ trigger, placement: 'top' }}
    use:clickOutside={onClose}
    use:motion={{
      initial: { opacity: 0, transform: 'scale(0.94)' },
      animate: { opacity: 1, transform: 'none' },
      exit: { opacity: 0, transform: 'scale(0.94)' },
      transition: { duration: 0.2 },
    }}
  >
    {#each reactions as reaction}
      <button
        on:click={() => {
          popoverOpen = false
          reaction.count++
        }}>{reaction.emoji}</button
      >
    {/each}
  </div>
{/if}

<style>
  div:not([role='menu']) button {
    --uno: bg-surface leading-0 rounded-full text-fg-secondary border-1 border-fg/14 hover:bg-fg/10;
  }
</style>
